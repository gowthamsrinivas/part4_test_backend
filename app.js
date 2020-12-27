const config = require('./utils/config');
const express = require('express');
const cors = require('cors');
const loginRouter = require('./controllers/login');
const blogsRouter = require('./controllers/Blog');
const usersRouter = require('./controllers/User');
const logger = require('./utils/logger');
const mongoose = require('mongoose');
const app = express();
const url = config.MONGODB_URI;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    logger.info(`Connected to MongoDB ${result}`);
  })
  .catch(error => {
    logger.error(`error connecting to mongoDB ${error.message}`);
  });

app.use(cors());
app.use(express.json());
app.use('/api/blogs',blogsRouter);
app.use('/api/users',usersRouter);
app.use('/api/login',loginRouter);

module.exports = app;
