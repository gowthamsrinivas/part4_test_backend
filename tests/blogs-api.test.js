const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./helper.js');
const api = supertest(app);
const Blog = require('../models/Blog');

beforeEach(async () => {
  await Blog.deleteMany({});

  let noteObject = new Blog(helper.initialNotes[0]);
  await noteObject.save();

  noteObject = new Blog(helper.initialNotes[1]);
  await noteObject.save();
});

test('blogs default length', async () => {
  let response = await helper.notesInDb();
  expect(response).toHaveLength(helper.initialNotes.length);
});

test('blogs unique identifier is id', async () => {
  let response = await helper.notesInDb();
  expect(response[0].id).toBeDefined();
});

test('create blog and check if its save',async () => {
  const blog = {
    title: 'dsvhidvshidsvhi',
    author: 'vnkfdnkjnfb',
    url: 'fhiihfhiihfb',
    likes: 12
  };
  await api.post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await helper.notesInDb();
  expect(response).toHaveLength(helper.initialNotes.length+1);
});

test('create blog with likes missed and check if it gets filled',async () => {
  const blog = {
    title: 'dsvhidvshidsvhi',
    author: 'vnkfdnkjnfb',
    url: 'fhiihfhiihfb'
  };
  const postResponse = await api.post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/);
  console.log(postResponse.body);
  expect(postResponse.body.likes).toBe(0);

  const response = await helper.notesInDb();
  expect(response).toHaveLength(helper.initialNotes.length+1);
});

test('send request blog without title and author and check the response',async () => {
  const blog = {
    url: 'fhiihfhiihfb'
  };
  await api.post('/api/blogs')
    .send(blog)
    .expect(400);

  const notesAtEnd = await helper.notesInDb();

  expect(notesAtEnd).toHaveLength(helper.initialNotes.length);
});


afterAll(() => {
  mongoose.connection.close();
});