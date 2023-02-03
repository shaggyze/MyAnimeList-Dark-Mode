document.body.onload = function() {
    chrome.storage.sync.get("newWidth", function(items) {
        if (!chrome.runtime.error) {
            console.log(items);
            document.documentElement.style.setProperty("--piwidth", items.newWidth + "px");
        }
    });
    chrome.storage.sync.get("colorChanger", function(items) {
        if (!chrome.runtime.error) {
            console.log(items);
            document.documentElement.style.setProperty("--bg", items.colorChanger);
        }
    });
}

$(document).ready(function() {
    // listen for messages sent to the tab the content script is running in
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        // check to see if the message received is something that needs to be acted on
        if (request.todo === "newWidth") {
            // pull the width data from the message
            const newWidth = request.newWidth;
            // set the style attribute of :root to override the MAIN.css value for --piwidth
            document.documentElement.style.setProperty("--piwidth", newWidth + "px");
            // send a response to avoid errors in popup.js
            sendResponse("newWidth");
        } else if (request.todo === "colorChanger") {
            // pull the colorChanger data from the message
            const colorChanger = request.colorChanger;
            // set the style attribute of :root to override the MAIN.css value for --page
            document.documentElement.style.setProperty("--bg", colorChanger);
            // send a response to avoid errors in popup.js
            sendResponse("colorChanger");
        }
    });
});