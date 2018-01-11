const express = require('express');
const rp = require('request-promise');

const router = express.Router();

let posts = [];

const insertPosts = (response, position, field) => {
  posts[position][field] = response;
};

const apiCall = (apiUrl, position, field) => {
  return rp({ url: apiUrl, json: true }).then((response) => {
    return insertPosts(response, position, field);
  });
};

/* GET posts listing. */
router.get('/posts', (req, res) => {
  rp({
    url: 'https://jsonplaceholder.typicode.com/posts',
    json: true,
  }).then((response) => {
    posts = response;
    const promises = [];
    for (let i = 0; i < posts.length; i += 1) {
      // add each author/user to its post
      promises.push(apiCall(`https://jsonplaceholder.typicode.com/users/${posts[i].userId}`, i, 'author'));
      // get all comments from a post and add a comment item (list) on json
      promises.push(apiCall(`https://jsonplaceholder.typicode.com/comments?postId=${posts[i].id}`, i, 'comments'));
    }
    Promise.all(promises).then(() => {
      res.send(posts);
    }).catch((err) => {
      console.error(err);
    });
  }).catch((err) => {
    console.error(err);
  });
});

module.exports = router;
