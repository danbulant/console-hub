# console-hub [![Build Status](https://travis-ci.org/danbulant/console-hub.svg?branch=master)](https://travis-ci.org/danbulant/console-hub)
Hub application to be controlled with controller (gamepad) through gamepad HTML5 API

# DEVELOPMENT

Console hub is currently under heavy rewrite, so it might not be working. Do not report bugs directly - contact me at discord (http://go-dan.tk/discord) instead.

## Installation
Installation can be done both with electron and on normal websites.

### Electron
#### Requirements
To run electron version, you must have the following:

* Java 8 runtime
* Node (10+)
* Other will be installed automatically via project.json

If you have installed node.js and electron, you can build the app yourself.
For packaging, I personally use (and prefer) [electron-packager](https://github.com/electron-userland/electron-packager).
Use all files in the repository (`electron-packager .`)

### Website
If you want this console to be available online, please keep in mind that it is **NOT** the intended way to use. There are several known bugs (not working settings, some modules undefined). 
To install, just upload all files onto your hosting and access /html/ (index.html in root redirects there).

## Add missing files for offline work
Because of legal issues (Copyright, cannot upload publicly), fonts and styles are missing. To fix that, you must do following steps:

* **download open sans**: Because of legal issues, I cannot place here direct link. One that I use is [font-squirrel](https://www.fontsquirrel.com/fonts/open-sans). Put all the files in /html/opensans/. Styles.css will automatically include them.
* **download Material icons**: You must download material icons in order to show them offline. To do so, see [material.io](https://material.io/icons/).
If you did everything correctly, Console hub now have all required files to run offline.

## Demo
**No demo is available, as new rewrite uses node's require**
### ~~GitHub
A github demo is accesible on [GitHub.io](https://console.danbulant.eu/console-hub/html/index.html), where is available latest development.~~

## Features
For feature/bugs that are currently worked on, please see our (kanban table)[https://trello.com/b/DlwuRuwZ/console-hub]
