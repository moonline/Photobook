Photobook
=========

"Photobook" is an HTML5 Application to create a photobook using the printer function of the browser.

Imagemagick needs to be installed:

`$sudo apt-get install imagemagick`

![Main Screen](Documentation/mainScreen.jpg)

![Drag & Drop](Documentation/dragAndDrop.jpg)

![Position and crop images](Documentation/imagePositioning.jpg)

![Main Screen](Documentation/mainScreen2.jpg)

![Page controls](Documentation/pageControls.jpg)

![Titles](Documentation/pageTitles.jpg)


Run the application
-------------------

1. Install imagemagick
2. Install node
3. Download source
4. run `npm install` to install the dependencies
5. run `build.sh` to compile the application
6. run `npm start` to start the application
7. open `http://localhost:8080/index.html` in your browser

Print with Firefox
------------------

1. about:config -> margin. Set margin_left, margin_right, margin_bottom, margin_top to 0.
2. "Firefox Menu"->"Print"->"Page Setup"->"Custom Size".
3. Create a Page with Size of A4 and Border 1cm. The print layout will remove the white border so the pdf printer can add it.
4. Print with "Print to file". Uncheck "Ignore Size and shrink...", allow printing background images and remove all headers and titles. Use a landscape paper of the type you created above.

![Print](Documentation/print1.jpg)
![Print](Documentation/print2.jpg)
![Print](Documentation/print3.jpg)


Compile from source
-------------------

run build.sh to compile code and styles using tsc and lessc of node.js.


### Compile styles by hand

	lessc ./Resources/Styles/styles.less ./Resources/Styles/styles.css


### Compile TypeScript by hand

	tsc --target ES5 ./Main.ts --module AMD --out ./Main.js


Run the experimental react app in development mode
--------------------------------------------------

cd `book-renderer`
`npm start`


Version history
---------------

Version | 			| Dependencies							| Features
---		|---		|---									|---
0.1		| Alpha 1	| &bull; node: 10.25<br />&bull; tsc: 1.0<br />&bull; lessc: 2.2		| &bull; insert images & titles<br />&bull; save & load files
0.2 	| Alpha 2	| &bull; node: 10.25<br />&bull; tsc: 1.0<br />&bull; lessc: 2.2		| &bull; add parts for better performance<br />&bull; refactor code
0.3 	| Alpha 3	| &bull; node: 10.25<br />&bull; tsc: 1.0<br />&bull; lessc: 2.2		| &bull; add title page before parts<br />&bull; refactor code
0.4 	| Alpha 4	| &bull; node: 10.25<br />&bull; tsc: 1.0<br />&bull; lessc: 2.2		| &bull; add image thumbnail api<br />&bull; material design<br />&bull; image controls sidebar<br />&bull; title controls sidebar
