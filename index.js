// Note:
// For reference, consult Section 6 of 
// the Udemy course "Advanced React and Redux" by Stephen Grider
// https://www.udemy.com/react-redux-tutorial/learn/v4/overview

// Main starting point of application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

// DB Setup
mongoose.connect(process.env.MONGODB_URI);

// App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' })); // all requests will be parsed as json
router(app);

// Server Setup
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);

