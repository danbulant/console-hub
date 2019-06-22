# console-hub
Hub application to be controlled with controller (gamepad) through gamepad HTML5 API

## Installation
Installation can be done both with electron and on normal websites.

### Electron
If you have installed node.js and electron, you can build the app yourself.
For packaging, I personally use (and prefer) [electron-packager](https://github.com/electron-userland/electron-packager).
Use all files in the repository (`electron-packager .`)

### Website
If you want this console to be available online, please keep in mind that it is **NOT** the intended way to use. There are several known bugs (not working settings, some modules undefined). 
To install, just upload all files onto your hosting and access /html/ (index.html in root redirects there).

## Add missing files
Because of legal issues (Copyright, cannot upload publicly), fonts and styles are missing. To fix that, you must do following steps:

* **download open sans**: Because of legal issues, I cannot place here direct link. One that I use is [font-squirrel](https://www.fontsquirrel.com/fonts/open-sans). Put all the files in /html/opensans/. Styles.css will automatically include them.

If you did everything correctly, Console hub now have all required files to run.
