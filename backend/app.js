const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { unAuthRoutes, authRoutes } = require('./routes');
const { mongoServer } = require('./utils');
const auth = require('./middleware/auth');
const centralErrorHandler = require('./middleware/errorHandler');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect(mongoServer);

app.use(bodyParser.json());

app.use(unAuthRoutes);
app.use(auth);
app.use(authRoutes);

app.use(centralErrorHandler);

app.listen(PORT, () => {
  console.log(`'App listening at port ${PORT}'`);
});
