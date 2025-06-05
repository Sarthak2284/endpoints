const express = require('express');
const ingestRoute = require('./routes/ingest');
const statusRoute = require('./routes/status');

const app = express();
app.use(express.json());

app.use('/ingest', ingestRoute);
app.use('/status', statusRoute);

module.exports = app;
