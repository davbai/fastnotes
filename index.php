<!-- for now using index.php for Heroku deployment -->
<!doctype html>
<html>
    <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>fastnotes</title>
        <link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="style.css">
    </head>

    <body lang="en">
        <div id="metabar">
            <button id="previous-btn" class="metabar-item metabar-btn" title="Previous Note"><i class="fa fa-angle-left fa-2x"></i></button>
            <button id="current-btn" class="metabar-item metabar-btn" title="Current Note"><i class="fa fa-angle-right fa-2x"></i></button>
            <button id="stats-btn" class="metabar-item metabar-btn" title="Note Stats"><i class="fa fa-bar-chart-o fa-2x"></i></button>
            <div class="stats-drop-down">
                <span class="tail"><i class="fa fa-caret-up fa-2x"></i></span>
                <div id="word-count">0 words</div>
                <div id="char-count">0 characters</div>
            </div>
            <button id="email-btn" class="metabar-item metabar-btn" title="Email Note"><i class="fa fa-envelope-o fa-2x"></i></button>
            <button id="download-btn" class="metabar-item metabar-btn" title="Download Note"><i class="fa fa-cloud-download fa-2x"></i></button>
        </div>
        <div id="note-container">
            <div id="note-title" contenteditable="true" data-default-value="Untitled"></div>
            <div id="note-body" contenteditable="true" data-default-value="Write your note.."></div>
        </div>

        <script type="text/javascript" src="js/libs/jquery-2.0.3.min.js"></script>
        <script type="text/javascript" src="js/libs/FileSaver.js"></script>
        <script type="text/javascript" src="js/main.js"></script>
    </body>
</html>
