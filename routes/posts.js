const express = require('express');
const request = require('request');

const router = express.Router();

/* GET posts listing. */
router.get('/', (req, res) => {
  request({
    url: 'https://jsonplaceholder.typicode.com/posts',
    json: true,
  }, (error, response, body) => {
    const posts = body;
    // iterate over the posts to add each author/user to its post
    for (let i = 0; i < posts.length; i += 1) {
      request({
        url: `https://jsonplaceholder.typicode.com/users/${posts[i].userId}`,
        json: true,
      }, (e, r, b) => {
        posts[i].author = b.name;
      });
      // get all comments from a post and add a comment item (list) on json
      request({
        url: `https://jsonplaceholder.typicode.com/comments?postId=${posts[i].id}`,
        json: true,
      }, (e, r, b) => {
        posts[i].comments = b;
      });
    }
    res.send(posts);
  });
});

module.exports = router;
