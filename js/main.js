// Globals
var $noteBody        = $("#note-body"),
    $charCount      = $("#char-count");

function alertPageClose(evt) {
    if ($noteBody.text()) { // Only show popup message if the noteBody is not empty
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
        return $noteBody.text().length;
    });
}

// Simple hack to download note as a txt file
function downloadNote() {
    if ($noteBody.text()) { // Only download if there is text present
        var tempLink = document.createElement('a');
        tempLink.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent($noteBody.text()));
        tempLink.setAttribute('download', "Untitled.txt");

        document.body.appendChild(tempLink); // For FF
        tempLink.click();

        document.body.removeChild(tempLink);
    }
}

$(document).ready(function () {
    $(window).on("load", function () { 
        $noteBody.focus();
    });
    $(window).on("beforeunload", alertPageClose);
    $noteBody.on("keyup", updateCharacterCount);
});