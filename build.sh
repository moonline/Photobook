#!/bin/bash

# compile less
lessc ./Resources/Styles/styles.less ./Resources/Styles/styles.css --verbose

# compile TypeScript
tsc --target ES5 ./Main.ts --module AMD && echo "tsc: compiled Main.ts"