// Globals
var $textBox        = $("#textbox"),
    $charCount      = $("#charcount");
    $downloadBtn    = $("#")

function alertPageClose(evt) {
    if ($textBox.text()) { // Only show popup message if the textbox is not empty
        var msg = "If you leave this page, your notes will be lost.";
        evt = evt || window.event;
        if (evt) {
            evt.returnValue = msg;
        }
        return msg;
    }
}

function updateCharacterCount() {
    $charCount.text(function () {
        return $textBox.text().length;
    });
}

// Simple hack to download note as a txt file
function downloadNote() {
    if ($textBox.text()) { // Only download if there is text present
        var tempLink = document.createElement('a');
        tempLink.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent($textBox.text()));
        tempLink.setAttribute('download', "Untitled.txt");

        document.body.appendChild(tempLink); // For FF
        tempLink.click();

        document.body.removeChild(tempLink);
    }
}

$(document).ready(function () {
    $(window).on("load", function () { 
        $textBox.focus();
    });
    $(window).on("beforeunload", alertPageClose);
    $textBox.on("keyup", updateCharacterCount);
});