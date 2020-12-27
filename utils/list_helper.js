const dummy = (blogs) => {
  return blogs ? 1: '';
};

const totalLikes = (blogs) => {
  if(blogs.length) {
    return blogs.reduce((sum,item) => {
      return sum+item.likes;
    },0);
  }
  else {
    return 0;
  }
};

const favouriteBlog = (blogs) => {
  if(blogs.length) {
    return blogs.reduce((max,item) => {
      return max.likes > item.likes ? max: item;
    },{ likes:0 });
  }
};

const mostBlogs = (blogs) => {
  const blogsGroupedByAuthor = {};
  if(blogs.length) {
    blogs.forEach((item) => {
      blogsGroupedByAuthor[item.author] = (blogsGroupedByAuthor[item.author] || 0) + 1;
    });
    let max = { author:'',blogs:0 };
    for(let key in blogsGroupedByAuthor) {
      max = max.blogs > blogsGroupedByAuthor[key] ? max: { author: key,blogs: blogsGroupedByAuthor[key] };
    }
    console.log(max);
    return max;
  }
};

const mostLiked  = (blogs) => {
  const blogsGroupedByAuthor = {};
  if(blogs.length) {
    blogs.forEach((item) => {
      blogsGroupedByAuthor[item.author] = (blogsGroupedByAuthor[item.author] || 0) + item.likes;
    });
    let max = { author:'',totalLikes:0 };
    for(let key in blogsGroupedByAuthor) {
      max = max.totalLikes > blogsGroupedByAuthor[key] ? max: { author: key,totalLikes: blogsGroupedByAuthor[key] };
    }
    console.log(max);
    return max;
  }
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLiked
};
