var FS = require('fs');
var Path = require('path');
function makeDirectoryRecursive(directoryPath, mode) {
    if (mode === void 0) { mode = null; }
    try {
        FS.mkdirSync(directoryPath, mode);
    }
    catch (error) {
        if (error && error.errno === 34) {
            makeDirectoryRecursive(Path.dirname(directoryPath), mode);
            makeDirectoryRecursive(directoryPath, mode);
        }
    }
}
module.exports = makeDirectoryRecursive;
