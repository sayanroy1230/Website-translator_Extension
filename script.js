chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message === "changeText") {
        translateToHindi();
    }
});

function translateToHindi() {
    const englishText = document.querySelectorAll('body *:not(script)');
    englishText.forEach(item => {
        if (item.childNodes.length === 1 && item.childNodes[0].nodeType === Node.TEXT_NODE) {
            const content = item.textContent;
            // console.log(content)
            // const hindiRegex = /[\u0900-\u097F\u1CD0-\u1CFF\uA8E0-\uA8FF]/; // Range of Unicode characters for Hindi
            const englishRegex = /[A-Za-z]/; // English alphabet characters
            if (englishRegex.test(content)) {
                fetchTranslation(content, item);
            }
        }
    })
}

function fetchTranslation(content, item) {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=hi&dt=t&q=${encodeURI(content)}`;
    fetch(url)
        .then((response) => response.json())
        .then(json => {
            item.textContent = json[0].map(item => item[0]).join("");
            // console.log(item.textContent)
        }).catch(error => {
            console.error('Error fetching data:', error);
          });
}