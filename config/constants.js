'use strict';
const dotenv = require('dotenv');

module.exports = {
	PORT: 3001,
	DB: {
		HOST: "localhost",
		USER: "root",
		PASSWORD: "squashapps123!",
		DB_NAME: "challenge_chat",
		dialect: "mysql", // here mySQL is used
		pool: {
		  max: 5,
		  min: 0,
		  acquire: 30000,
		  idle: 10000
		},
		DROP_AND_RESYNC : false,
		CONNECTED: 'DATABASE CONNECTED SUCCESSFULLY'
	},
	HTTP_STATUS: {
		OK: 200,
		ERROR: 500,
		NOT_FOUND: 404,
		CREATED: 201,
		BAD_REQUEST: 400,
		UN_AUTHORIZED: 401
	},
	APP: {
		'LISTEN': 'AUTH SERVICE IS LISTENING TO THE PORT: '
	},
	JWT: {
		SECRET_KEY: process.env.JWT_SECRET_KEY || 'thechatapp',
		EXPIRES_IN : 86400 // expires in 24 hours
	},
	PASSWORD_PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_/+|-])[A-Za-z\d!@#$%^&*(),.?":{}|<>_/+|-]{8,}$/,
	EMAIL_PATTERN: /\S+@\S+\.\S+/,
	'DEPLOYMENT': {
		'ENVIRONMENT': process.env.NODE_ENV,
	},
	'CORS': {
		'DEV_ENVIRONMENT': 'dev',
		'QA_ENVIRONMENT': 'qa',
		'ALLOWED_DEV_DOMAINS': ['http://localhost:4200'],
		'ALLOWED_QA_DOMAINS': ['http://localhost:4200'],
		'INTERCEPT_METHOD': 'options',
		'CORS_ALLOW_METHODS': 'GET,PUT,POST,DELETE,OPTIONS',
		'CREDIENTIAL_STATUS': true,
		'HEADERS': 'Content-Type, Authorization, Content-Length, X-Requested-With',
	},
	MESSAGE: {
		USER_BAD_REQUEST : "The property 'email', 'firstName' and 'lastName' are mandatory",
		INTERNAL_SERVER_ERROR : "Something went wrong!",
		TOKEN_FAILED_TO_CREATE : "Failed to create token!",
		TOKEN_INVALID : "Invalid token!"
	}
};
