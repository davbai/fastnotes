$(function() {

    // Elements
    var $noteBody       = $("#note-body"),
        $noteTitle      = $("#note-title"),
        $charCount      = $("#char-count"),
        $emailBtn       = $("#email-btn"),
        $downloadBtn    = $("#download-btn");

    function init() {
        bindEvents();
        bindElements();
    }

    function bindEvents() {
        $(window).on("load", function () { 
            $noteBody.focus();
        });
        $(window).on("beforeunload", alertPageClose);
    }

    function bindElements() {
        $noteBody.on("keyup", updateCharacterCount);
        $emailBtn.on("click", emailNote);
        $downloadBtn.on("click", downloadNote);
    }

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

    function emailNote() {
        var subject = $noteTitle.text();
        var body = $noteBody.html().replace(/<br>/g, "\n").replace(/<div>/g, "\n").replace(/<\/div>/g, "");
        var uri = "mailto:?subject=" + subject + "&body=" + encodeURIComponent(body);
        window.open(uri);
    }

    function downloadNote() {
        if ($noteBody.text()) {
            // Only supports plain txt files for now
            var formattedText = $noteBody.html().replace(/<br>/g, "\n").replace(/<div>/g, "\n").replace(/<\/div>/g, "");
            var fileName = $noteTitle.text() ? $noteTitle.text() + ".txt" : "Untitled.txt";
            saveAs(new Blob([formattedText], {type: "text/plain;charset=" + document.characterSet}), fileName); 
        }
    }

    init();

});