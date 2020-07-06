'use strict';

/** MODULE IMPORTS */
const express = require('express');
const bodyParser = require('body-parser');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

require('log-timestamp');

const morgan = require('morgan');
const constants = require('./config/constants');
const routes = require('./routes/api');
require('./db/controller/connect');

const cors = require('cors');
const app = express();

if (cluster.isMaster) {
	console.log(`Master ${process.pid} is running`);

	// Fork workers.
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	//Check if work id is died
	cluster.on('exit', (worker) => {
		console.log(`worker ${worker.process.pid} died`);
	});

} else {
	// This is Workers can share any TCP connection
	// It will be initialized using express
	console.log(`Worker ${process.pid} started`);
	app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

	const CORS_OPTIONS = require('./cors');

	//enable cors
	app.use(cors(CORS_OPTIONS));

	// enable options response
	app.options('*', cors());

	//add parser
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: true
	}));

	//add routes
	app.use('/', routes.router);

	//Server Listening
	app.listen(constants.PORT, () => {
		console.info(`${constants.APP.LISTEN} ${constants.PORT}`);
	});
}