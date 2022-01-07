# Photobook Editor

## Development

### Environment

Install:

* [Node.js](https://nodejs.org/en/download/)
* [Yarn](https://classic.yarnpkg.com/en/docs/install)

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

### Comands

See [./package.json](package.json).

```sh
# Run less compiler to build styles:
yarn build-styles
# Run Typescript compiler to build the server
yarn build-server
# Run Typescript compiler to build the client
yarn build-app
# Cleanup packaging output
yarn clean-dist
# Build AppImage package to dist
yarn pack
# Build AppImage and Snap packages
yarn dist
```
