import fs from 'fs';
export const getResult = () => {
	setTimeout(async ()=>{
		let data = await fs.promises.readFile('./upper/upUserName.txt','utf-8');
		return data;
	},1000);
}
