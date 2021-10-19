const express = require('express');
const bp = require('body-parser');
const { port } = require('./config.json');
const { createEntries, readEntries, updateEntries } = require('./utils/crud');

const app = express();

app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());

app.get('/example', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.json({ message: 'Hi, from the server' })
});

app.post('/jobs', createEntries, (req, res) => {})

app.get('/jobs', readEntries, (req, res) => {})

app.put('/jobs/:id', updateEntries, (req, res) => {})

app.listen(port, () => console.log(`server is listening on: ${port}`));