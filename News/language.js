var userLanguage = navigator.language || navigator.userLanguage;
var detectedLanguage = userLanguage.substring(0, 2);
if (detectedLanguage === "en") {
    window.location.href = "en/index.html";
} else if (detectedLanguage === "ru") {
    window.location.href = "ru/index.html";
} else {
    window.location.href = "en/index.html";
}
