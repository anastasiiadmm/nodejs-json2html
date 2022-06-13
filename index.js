const express = require('express');
const data = require('./app/data');
const app = express();
app.use(express.json());

const port = 8000;

app.use('/data', data);

app.listen(port, () => {
  console.log(`Server started on ${port} port!`);
});