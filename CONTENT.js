$(document).ready(function () {
  // listen for messages sent to the tab the content script is running in
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // check to see if the message received is something that needs to be acted on
    if (request.todo === "changeWidth") {
      // pull the width data from the message
      const newWidth = request.newWidth;
      // set the style attribute of :root to override the MAIN.css value for --ptwidth
      document.documentElement.style.setProperty("--ptwidth", newWidth + "px");
	  // send a response to avoid errors in popup.js
      sendResponse("Width updated");
    } else if (request.todo === "changeColor") {
      // pull the width data from the message
      const newColor = request.newColor;
      // set the style attribute of :root to override the MAIN.css value for --ptwidth
      document.documentElement.style.setProperty("--page", newColor);
	  // send a response to avoid errors in popup.js
    sendResponse("Color updated");
    }
  });
});