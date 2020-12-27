const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
];

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422a851b54a676234d17f9',
    title: 'React pa111tterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 4,
    __v: 0
  },
];

describe('total likes', () => {

  test('of empty list is zero', () => {
    const blogs = [];
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(0);
  });

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(16);
  });
});

describe('favourite blogs', () => {
  const blog = {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  };
  test('fetch favourite blog', () => {
    const result = listHelper.favouriteBlog(blogs);
    expect(result).toEqual(blog);
  });
});

describe('Most blogs', () => {
  const mostWroteBlog = {
    author: 'Michael Chan',
    blogs: 2
  };
  test('fetch most blogs', () => {
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual(mostWroteBlog);
  });
});

describe('Most blogs', () => {
  const mostWroteBlog = {
    author: 'Michael Chan',
    totalLikes: 11
  };
  test('fetch most blogs', () => {
    const result = listHelper.mostLiked(blogs);
    expect(result).toEqual(mostWroteBlog);
  });
});