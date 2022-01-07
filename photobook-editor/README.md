# Photobook

"Photobook Editor" is an HTML5 Application to create a photobook using the printer function of the browser.


![Main Screen](./docs/mainScreen.jpg)

![Drag & Drop](./docs/dragAndDrop.jpg)

![Position and crop images](./docs/imagePositioning.jpg)

![Main Screen](./docs/mainScreen2.jpg)

![Page controls](./docs/pageControls.jpg)

![Titles](./docs/pageTitles.jpg)



## Install the application

See section Development


## Usage

### Print

// TODO review

In the print dialog:

1. Enter tab `Page Setup`.
2. Open `Paper Size` menu.
3. Scroll down to `Manage Custom Sizes`.
4. Create a new `Photobook` custom size of size of A4 and border 1cm. (The print layout will remove the white border of the pages so the pdf printer can add it)
5. Close the dialog
6. Select Paper Size `Photobook` and Orientation `Landscape`
7. If the options exist, uncheck "Ignore Size and shrink...", allow printing background images and remove all headers and titles. 
8. Print

![Print](./docs/print1.jpg)
![Print](./docs/print2.jpg)
![Print](./docs/print3.jpg)


## Development

### Environment

Install:

* [Node.js](https://nodejs.org/en/download/)
* [Yarn](https://classic.yarnpkg.com/en/docs/install)
* ImageMagick: `sudo apt install imagemagick`


### Install dependencies

```sh
cd photobook-editor
yarn install
```

### Build

```sh
yarn build
```


### Start the application

```sh
yarn start
```

Open [localhost:8080/index.html](http://localhost:8080/index.html)` in your webbrowser.


### Compile styles by hand

```sh
lessc ./Resources/Styles/styles.less ./Resources/Styles/styles.css
```


### Compile TypeScript by hand

```sh
tsc --target ES5 ./Main.ts --module AMD --out ./Main.js
```


## Version history

Version | 			| Dependencies							| Features
---		|---		|---									|---
0.1		| Alpha 1	| &bull; node: 10.25<br />&bull; tsc: 1.0<br />&bull; lessc: 2.2		| &bull; insert images & titles<br />&bull; save & load files
0.2 	| Alpha 2	| &bull; node: 10.25<br />&bull; tsc: 1.0<br />&bull; lessc: 2.2		| &bull; add parts for better performance<br />&bull; refactor code
0.3 	| Alpha 3	| &bull; node: 10.25<br />&bull; tsc: 1.0<br />&bull; lessc: 2.2		| &bull; add title page before parts<br />&bull; refactor code
0.4 	| Alpha 4	| &bull; node: 10.25<br />&bull; tsc: 1.0<br />&bull; lessc: 2.2		| &bull; add image thumbnail api<br />&bull; material design<br />&bull; image controls sidebar<br />&bull; title controls sidebar
