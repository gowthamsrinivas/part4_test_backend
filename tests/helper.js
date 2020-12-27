const Blog = require('../models/Blog');
const User = require('../models/User');

const initialNotes = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
];

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon', date: new Date() });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const notesInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map(u => u.toJSON());
};

module.exports = {
  initialNotes, nonExistingId, notesInDb,usersInDb
};