const express = require('express');
const { port } = require('./config.json');
const db = require('./DummyData')

const app = express();

app.get('/example', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.json({ message: 'Hi, from the server' })
});

console.log(db);

app.listen(port, () => console.log(`server is listening on: ${port}`));