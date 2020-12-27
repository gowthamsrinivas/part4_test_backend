const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const getTokenFrom = request => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

blogsRouter.get('/',async (request, response) => {
  let blogs = await Blog.find({}).populate('user',{ username: 1,name: 1 });
  response.json(blogs);
});

blogsRouter.post('/',async (request, response) => {
  const body = request.body;
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);
  if(body.title && body.author) {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id
    });
    const blogAdded = await blog.save();
    user.blogs = user.blogs.concat(blogAdded._id);
    await user.save();
    response.status(201).json(blogAdded);
  }
  else {
    response.status(400).end();
  }
});

blogsRouter.put('/:id',async (request, response) => {
  const body = request.body;

  const blog = {
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
  response.json(updatedBlog);
});

blogsRouter.delete('/:id',async (request, response) => {
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);
  const blog = await Blog.findById(request.params.id);

  if ( blog.user.id.toString() === user.id.toString()) {
    const deletedBlog = await Blog.findByIdAndRemove(request.params.id);
    response.status(204).json(deletedBlog);
  }
});

module.exports = blogsRouter;