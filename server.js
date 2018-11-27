'use strict';

const express = require('express');
// const path = require('path');
const bodyParser = require('body-parser');
const config = require('./server-config');
const app = express();
const morgan = require('morgan');

const categories = require('./server/categories');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('tiny')); // combined/tiny

// для отдачи статичных файлов
app.use(express.static(config.ROOT_BUILD));

// для ответов на запросы с других ресурсов
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});


app.get('/', (req, response) => {
	response.writeHead(200, {'Content-Type': 'text/html'});
	response.sendFile(path.join(config.ROOT_BUILD + '/index.html'));
});

app.get('/api/getCategoriesList', (req, response) => {
	response.json(categories.getListAll());
	response.end();
});

app.get('/api/getCategoriesTree', (req, response) => {
	response.json(categories.getTreeAll());
	response.end();
});

app.post('/api/saveCategoryById/:id', (req, response) => {
	response.json(categories.saveById(req.params.id, req.body));
	response.end();
});

app.post('/api/addCategory', (req, response) => {
	response.json(categories.addCategory(req.body));
	response.end();
});

app.get('/api/getCategoryById/:id', (req, response) => {
	response.json(categories.getById(req.params.id));
	response.end();
});

app.get('/api/delCategoryById/:id', (req, response) => {
	response.json(categories.delById(req.params.id));
	response.end();
});

app.get('/*', (req, response) => {
	console.log('404 req.params: ', req.params);
	response.send('404');
	response.end();
});

app.listen(config.PORT, () => {
	console.log('server run PORT:', config.PORT, ' host: http://localhost:' + config.PORT);
});
