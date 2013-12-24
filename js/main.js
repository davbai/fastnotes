// Globals
var	$textBox 	= $("#textbox"),
	$charCount 	= $("#charcount");

function alertPageClose(evt) {
	// Only show popup message if the textbox is not empty
	if ($textBox.text()) {
		var msg = "If you leave this page, your notes will be lost.";
		evt = evt || window.event;
		if(evt)
				evt.returnValue = msg;
		return msg;
	}
};	

function updateCharacterCount() {
	$charCount.text(function () {
		return $textBox.text().length;
	});
};

$(document).ready(function () {
	$(window).on("load", function () { 
		$textBox.focus();
	});
	$(window).on("beforeunload", alertPageClose);
	$textBox.on("keyup", updateCharacterCount);
});