# Photobook viewer

Experimental Electron/React based app to view photobook JSON files.

![Photobook viewer screenshot](./docs/photobook-viewer.jpg)


## Development

### Environment

Install:

* [Node.js](https://nodejs.org/en/download/)
* [Yarn](https://classic.yarnpkg.com/en/docs/install)


### Install dependencies

```sh
cd photobook-viewer
yarn install
```


### Start the application

```sh
yarn start
```

It's necessary to save a code file to trigger a rebuild once the applications launched to load it properly.

Use "Open" to open a json-photobook file. The import will take some time.
When you change code files, the app will reload and the last opened file will automatically be loaded (be patient ;-) ).
