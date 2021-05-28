import fs from 'fs';
import {Transform} from 'stream';
export const operations = () => {
	const readName = fs.createReadStream('./files/username.txt');
	const writeUpUserName = fs.createWriteStream('./upper/upUserName.txt');
	readName.setEncoding('utf8');
	const filterName = new Transform({
		writableObjectMode:true,
		transform(data,encode,callback){
			this.push(data.toString().toUpperCase());
			callback();
		},
		final(callback){
			callback();
		}
	});
	readName.pipe(filterName).pipe(writeUpUserName);
}
