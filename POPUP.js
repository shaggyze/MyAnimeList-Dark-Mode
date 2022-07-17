// Unchanged
$(document).ready(function () {
  $(".reset").click(function () {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      var activeTab = tabs[0];
      chrome.scripting.removeCSS({
        target: { tabId: activeTab.id },
        files: ["MAIN.css"],
      });
    });
  });

  $(".format").click(function () {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      var activeTab = tabs[0];
      chrome.scripting.insertCSS({
        target: { tabId: activeTab.id, allFrames: true },
        files: ["MAIN.css"],
      });
      /*chrome.tabs.sendMessage(activeTab.id, {"buttonclicked": "wider"});*/
    });
  });
});

// Changed
$(function () {
  // color picker listener
  $('#color-changer').on('input', function() {
	const color = $(this).val();
	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { todo: "changeColor", newColor: color });
    });
  });
  // text input listener
  $("#newWidth").on("change paste keyup", function () {
    const width = $(this).val();
    // update slider
    $("#slider").val(width);
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { todo: "changeWidth", newWidth: width });
    });
  });
  // listener for change button press
  // button might not be needed anymore because of the text input listener above
  $("#btnChange").click(function () {
    const width = $("#newWidth").val();
    // update slider
    $("#slider").val(width);
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { todo: "changeWidth", newWidth: width });
    });
  });
  // listener for slider changes
  $("#slider").on("input", function () {
    const width = $("#slider").val();
    // update text box
    $("#newWidth").val(width);
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { todo: "changeWidth", newWidth: width });
    });
  });
});