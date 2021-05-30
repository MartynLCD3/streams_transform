import http from 'http';
import fs from 'fs';
import {operations} from './operations/transform.js';

const server = http.createServer( async (req,res) => {
	let {url, method} = req;

    	if(method == 'GET') {
        	if(url == '/') {
			try {
				let index = './public/index.html';
				let page = await fs.promises.readFile(index);
				res.writeHead(200,{'content-type':'text/html'});
				res.end(page);
			}catch(error){
				res.writeHead(404, {'content-type':'text/html'});
                		res.end(`<h2 style="color:red;">ERROR 404: recurso <span style="color:orange;">${index}</span> no encontrado</h2>`);
			}
		}else{
			res.writeHead(404, {'content-type':'text/html'});
                        res.end(`<h2 style="color:red;">ERROR 404: recurso  no encontrado</h2>`);
		}
	}

	if(method == 'POST'){
		if(url == '/'){
		let body = '';		
		req.on('data', chunk =>	{
			body+= chunk;
			let data = body.split('&');
			let getFirstElement = data[0];
			let getSecondElement = data[1];
			let repetitions = data[2];
			let name = getFirstElement.replace('name=','');
			let lastName = getSecondElement.replace('lastname=','');
			let rep = repetitions.replace('repetitions=','');
			const writeUserName = fs.createWriteStream('./files/username.txt');
			let userName = `<b>${name} ${lastName}</b><br>`;
			for(let n=0; n<rep; n++) writeUserName.write(userName);
			operations();
		});
		req.on('end', async () => {
				let data = await fs.promises.readFile('./upper/upUserName.txt','utf-8');
				res.writeHead(200, {'Content-Type':'text/html'});
            			res.end(data);
        		});
		}
	}
});

const port = process.env.PORT || 5005;
server.listen(port, () => console.log(`Running: ${port}`));
