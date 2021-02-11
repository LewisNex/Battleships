import 'dotenv/config'

import express from 'express';
import path from 'path';
import open from 'open';

import apiRouter from './Api';

const app = express();

const port = process.env.PORT ?? 8080;
const staticPath = path.join(__dirname, '../../build/Client');
console.log(`Running on: http://localhost:${port}/`);


app.use(express.static(staticPath));

app.use('/api', apiRouter);

app.listen(port, () => {
	if (process.env.OPEN_BROWSER_ON_LOAD === 'true'){
		open(`http://localhost:${port}`);
	}
});

app.get('/index', (_req, res) => 
	res.sendFile(path.join(staticPath, 'index.html')));
