import FS = require('fs');
import Path = require('path');


function makeDirectoryRecursive(directoryPath: string, mode: any = null):void {
	try {
		FS.mkdirSync(directoryPath, mode);
	} catch(error) {
	// create all parents if not exists
		if (error && error.errno === 34) {
			makeDirectoryRecursive(Path.dirname(directoryPath), mode);
			makeDirectoryRecursive(directoryPath, mode);
		}
	}
}
export = makeDirectoryRecursive;
