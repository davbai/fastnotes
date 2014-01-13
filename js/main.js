$(function() {

    // Elements
    var $noteBody       = $("#note-body"),
        $noteTitle      = $("#note-title"),
        $wordCount      = $("#word-count"),
        $charCount      = $("#char-count"),
        $previousBtn    = $("#previous-btn"),
        $currentBtn     = $("#current-btn"),
        $emailBtn       = $("#email-btn"),
        $downloadBtn    = $("#download-btn");

    var currentTitle, currentBody;

    function init() {
        // By default always load a blank note, so new button is hidden
        $currentBtn.css({display: "none"});

        if (!supportHtmlStorage) {
            $previousBtn.css({display: "none"});
        }

        bindEvents();
        bindElements();
    }

    function bindEvents() {
        $(window).on("load", function () { 
            $noteBody.focus();
        });

        if (!supportHtmlStorage) {
            // Alerts that note is lost on page close if localStorage is not supported
            $(window).on("beforeunload", alertPageClose);
        } else {
            $(window).on("beforeunload", saveNote);
        }
    }

    function bindElements() {
        $noteBody.on("keyup", updateNoteStats);
        $previousBtn.on("click", loadPreviousNote);
        $currentBtn.on("click", loadCurrentNote);
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

    function saveNote() {
        // At any given time, fastnotes only keeps track of one previous note at a time
        if ($noteBody.text()) { // Only save note if the noteBody is not empty
            localStorage["fnTitle"] = $noteTitle.text();
            localStorage["fnBody"] = $noteBody.html();
        }
    }

    function loadPreviousNote() {
        $currentBtn.css({display: "inline-block"});
        $previousBtn.css({display: "none"});

        // Store whatever has been written so far in new session in case we want to go back to the current note
        currentTitle = $noteTitle.text();
        currentBody = $noteBody.html();

        $noteTitle.text(localStorage["fnTitle"]);
        $noteBody.html(localStorage["fnBody"]);

        updateNoteStats();
    }

    function loadCurrentNote() {
        $currentBtn.css({display: "none"});
        $previousBtn.css({display: "inline-block"});

        // Save anything that has been changed in the previous note (the one currently in localStorage)
        localStorage["fnTitle"] = $noteTitle.text();
        localStorage["fnBody"] = $noteBody.html();

        $noteTitle.text(currentTitle);
        $noteBody.html(currentBody);

        updateNoteStats();
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

    function supportHtmlStorage() {
        try {
            return "localStorage" in window && window["localStorage"] !== null;
        } catch(e) {
            return false;
        }
    }

    init();

});