/**
 * Archive - Ad Request Enhancer - Coding challenge from an interview in 2018
 * Author: Chadi Cortbaoui
 */
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
require('./config/config');
const app = express();
const router = express.Router();
const port = process.env.PORT;

app.use(require('express-status-monitor')());// monitor health and performance. Open localhost:3000/status
app.use(helmet());
app.use(router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Load route(s) as their own modules
app.use('/ad', [require('./middleware').validateAdRequest, require('./routes/ads')]);
app.use('/plugins', require('./routes/plugins-monitor'));

app.listen(port, () => {
    console.log(`API is running on port ${port}`);
});

module.exports = { app }