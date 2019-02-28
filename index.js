const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

//Express.js file for setting up the backend, REST API calls and DB connection.
// Importing required packages
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var app = express();
// Implementing type in request body as json.
app.use(bodyParser.json());
app.use(cors());

var accountName = [
	{
		username : 'mohak', 
		locked : 0
	},
	{
		username : 'mohak123',
		locked : 1
	},
	{
		username : '123456789',
		locked : 1
	}
];

// REST API service for adding new user.
app.post('/unlockAccount', (request, response) => {
	var username = request.queryResult.parameters.username;
	var returnString = '';
	for (var arr in accountName) {
    	if (arr.username === username && arr.locked === 1) {
    		arr.locked = 0;
    		returnString = 'Got it. Username has been unlocked.';
    	} else if (arr.username === username && arr.locked === 0) {
    		returnString = 'Username is already unlocked.';
    	} else {
    		returnString = 'Username is invalid. Please try again with a valid username.';
    	}
	}
	response.fulfillmentText = returnString;
	return res.send();
});