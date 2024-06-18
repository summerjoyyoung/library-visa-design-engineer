const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

app.get('/name', (_req: any, res: { send: (arg0: { name: string; }) => void; }) => {
  res.send({name: 'Summer'});
});

module.exports = app;