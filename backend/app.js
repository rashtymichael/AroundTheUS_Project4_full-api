const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { unAuthRoutes, authRoutes } = require('./routes');
const { mongoServer } = require('./utils');
const auth = require('./middleware/auth');
const centralErrorHandler = require('./middleware/errorHandler');
const { requestLogger, errorLogger } = require('./middleware/Logger');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect(mongoServer);

app.use(bodyParser.json());

app.use(requestLogger);

app.use(unAuthRoutes);
app.use(auth);
app.use(authRoutes);

app.use(errorLogger);

app.use(errors());
app.use(centralErrorHandler);

app.listen(PORT, () => {
  console.log(`'App listening at port ${PORT}'`);
});
