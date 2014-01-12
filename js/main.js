$(function() {

    // Elements
    var $noteBody       = $("#note-body"),
        $noteTitle      = $("#note-title"),
        $wordCount      = $("#word-count"),
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
        $noteBody.on("keyup", updateNoteStats);
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

    function updateNoteStats() {
        $wordCount.text(function () {
            // Using $noteBody.text() doesn't translate returns (<br>'s) into spaces
            var words = $noteBody.html()
                                .replace(/<br>|<div>|<\/div>/g, " ")
                                .split(/\s+/g);
            var count = words.indexOf("") === -1 ? words.length : words.length - 1;
            var text = count === 1 ? count + " word" : count + " words"; // Singular vs plural
            return text;
        });

        $charCount.text(function () {
            var count = $noteBody.text().length;
            var text = count === 1 ? count + " character" : count + " characters"; // Singular vs plural
            return text;
        });
    }

    function emailNote() {
        var subject = $noteTitle.text();
        var body = $noteBody.html()
                            .replace(/<br>|<div>/g, "\n")
                            .replace(/<\/div>|&nbsp;/g, "");
        var uri = "mailto:?subject=" + subject + "&body=" + encodeURIComponent(body);
        window.open(uri);
    }

    function downloadNote() {
        if ($noteBody.text()) {
            // Only supports plain txt files for now
            var body = $noteBody.html()
                                .replace(/<br>|<div>/g, "\n")
                                .replace(/<\/div>|&nbsp;/g, "");
            var fileName = $noteTitle.text() ? $noteTitle.text() + ".txt" : "Untitled.txt";
            saveAs(new Blob([body], {type: "text/plain;charset=" + document.characterSet}), fileName); 
        }
    }

    init();

});