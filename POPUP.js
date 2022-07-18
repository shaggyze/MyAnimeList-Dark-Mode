document.body.onload = function() {
    chrome.storage.sync.get("newWidth", function(items) {
        if (!chrome.runtime.error) {
            console.log(items);
            document.getElementById("newWidth").value = items.newWidth;
            document.getElementById("slider").value = items.newWidth;
        }
    });
    chrome.storage.sync.get("colorChanger", function(items) {
        if (!chrome.runtime.error) {
            console.log(items);
            document.getElementById("colorChanger").value = items.colorChanger;
        }
    });
}

document.onchange = function() {
    var newWidth = document.getElementById("newWidth").value;
    var colorChanger = document.getElementById("colorChanger").value;
    chrome.storage.sync.set({
        "newWidth": newWidth,
        "colorChanger": colorChanger,
    }, function() {
        if (chrome.runtime.error) {
            console.log("Runtime error.");
        }
    });
}

$(document).ready(function() {
    $(".reset").click(function() {
        chrome.tabs.query({
            currentWindow: true,
            active: true
        }, function(tabs) {
            var activeTab = tabs[0];
            chrome.scripting.removeCSS({
                target: {
                    tabId: activeTab.id
                },
                files: ["MAIN.css"],
            });
        });
    });

    $(".format").click(function() {
        chrome.tabs.query({
            currentWindow: true,
            active: true
        }, function(tabs) {
            var activeTab = tabs[0];
            chrome.scripting.insertCSS({
                target: {
                    tabId: activeTab.id,
                    allFrames: true
                },
                files: ["MAIN.css"],
            });
        });
    });
});

$(function() {
    // colorChanger listener
    $('#colorChanger').on('input', function() {
        const colorChanger = $(this).val();
        chrome.tabs.query({
            currentWindow: true,
            active: true
        }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                todo: "colorChanger",
                colorChanger: colorChanger
            });
        });
    });
    // text input listener
    $("#newWidth").on("change paste keyup", function() {
        const newWidth = $(this).val();
        // update slider
        $("#slider").val(newWidth);
        chrome.tabs.query({
            currentWindow: true,
            active: true
        }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                todo: "newWidth",
                newWidth: newWidth
            });
        });
    });
    // listener for slider changes
    $("#slider").on("input", function() {
        const newWidth = $("#slider").val();
        // update text box
        $("#newWidth").val(newWidth);
        chrome.tabs.query({
            currentWindow: true,
            active: true
        }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                todo: "newWidth",
                newWidth: newWidth
            });
        });
    });
});