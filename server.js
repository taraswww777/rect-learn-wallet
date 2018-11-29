import config from './server-config';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

const app = express();

const categories = require('./server/categories');
const accounts = require('./server/accounts');
const records = require('./server/records');

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

// Category
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

//  Account
app.get('/api/accountGetList', (req, response) => {
	response.json(accounts.getListAll());
	response.end();
});

app.post('/api/accountAdd', (req, response) => {
	response.json(accounts.addAccount(req.body));
	response.end();
});

app.post('/api/accountSaveById/:id', (req, response) => {
	response.json(accounts.saveById(req.params.id, req.body));
	response.end();
});

app.get('/api/accountGetById/:id', (req, response) => {
	response.json(accounts.getById(req.params.id));
	response.end();
});

app.get('/api/accountDelById/:id', (req, response) => {
	response.json(accounts.delById(req.params.id));
	response.end();
});

// records
app.get('/api/recordsGetList', (req, response) => {
	response.json(records.getListAll());
	response.end();
});

app.post('/api/recordsAdd', (req, response) => {
	response.json(records.addRecord(req.body));
	response.end();
});

app.post('/api/recordsUpdateById/:id', (req, response) => {
	response.json(records.updateById(req.params.id, req.body));
	response.end();
});

app.get('/api/recordsGetById/:id', (req, response) => {
	response.json(records.getById(req.params.id));
	response.end();
});

app.get('/api/recordsDelById/:id', (req, response) => {
	response.json(records.delById(req.params.id));
	response.end();
});

// any
app.get('/*', (req, response) => {
	console.log('404 req.params: ', req.params);
	response.send('404');
	response.end();
});

app.listen(config.PORT, () => {
	console.log('server run PORT:', config.PORT, ' host: http://localhost:' + config.PORT);
});
