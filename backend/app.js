const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { routes } = require('./routes');
const { mongoServer } = require('./utils');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect(mongoServer);

app.use(bodyParser.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`'App listening at port ${PORT}'`);
});
