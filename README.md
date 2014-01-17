# fastnotes

Fastnotes is a simple web app for taking down quick notes. These notes are meant to be disposable. The site can be viewed and bookmarked at [fastnot.es](http://www.fastnot.es). You can find more information [here](http://www.davbai.com/2014/01/16/fastnotes.html) about why it was created.

## Features
1. Autofocuses on note body on load for quick writing.
2. Saves the most recent note (whatever note is present when page closes is the one saved).
3. Ability to email the note (title is defaulted the subject and the note is the body of the email).
4. Ability to download the note as a .txt file ([title].txt is the filename else Untitled.txt is the default if no title is present).
5. Word/character count.

## Tech

Everything is written in JavaScript/HTML/CSS. Saved notes are saved locally in the browser using HTML5 localStorage. JQuery is used for some minor DOM manipulation and I make use of [FileSaver.js](https://github.com/eligrey/FileSaver.js/) for saving notes as a .txt file. The site is hosted on [Heroku](https://www.heroku.com).


## License
MIT License 

