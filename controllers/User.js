const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/User');

usersRouter.post('/', async (request, response) => {
  const body = request.body;
  if(body.username && body.password) {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    });

    const savedUser = await user.save();

    response.json(savedUser);
  }
  else {
    response.status(400).end();
  }
});

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs',{ title: 1,author: 1,likes: 1 });
  response.json(users);
});

module.exports = usersRouter;