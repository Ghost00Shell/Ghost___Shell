from flask import Flask, request, jsonify
import requests, ssl, OpenSSL, time
from socket import setdefaulttimeout

app = Flask(__name__)

THROTTLE = 1  # Delay between requests
TIMEOUT = 2  # Request timeout

def get_certificate_san(x509cert):
    """Extract SAN (Subject Alternative Names) from certificate"""
    san = ''
    ext_count = x509cert.get_extension_count()
    for i in range(ext_count):
        ext = x509cert.get_extension(i)
        if 'subjectAltName' in str(ext.get_short_name()):
            san = ext.__str__()
    return san

def check_site(ip, host):
    """Check site status"""
    try:
        r = requests.get(f"https://{host}", verify=False, timeout=TIMEOUT)
        return {"ip": ip, "host": host, "status": r.status_code, "headers": dict(r.headers)}
    except:
        return {"ip": ip, "host": host, "status": "Error", "headers": {}}

@app.route("/scan", methods=["POST"])
def scan_ips():
    data = request.json
    ip_prefixes = data.get("ips", [])
    results = []

    for prefix in ip_prefixes:
        for i in range(1, 6):  # Scanning only first 5 for demo
            ip = f"{prefix}{i}"
            print(f"Scanning: {ip}")
            time.sleep(THROTTLE)

            try:
                setdefaulttimeout(TIMEOUT)
                cert = ssl.get_server_certificate((ip, 443))
                x509 = OpenSSL.crypto.load_certificate(OpenSSL.crypto.FILETYPE_PEM, cert)

                # Main host
                host = x509.get_subject().CN
                results.append(check_site(ip, host))

                # Alternative names
                san_list = get_certificate_san(x509).split(',')
                for san in san_list:
                    if "DNS:" in san:
                        results.append(check_site(ip, san.split('DNS:')[1]))

            except Exception as e:
                print(f"Error scanning {ip}: {e}")
    
    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True)
