const express = require('express');
const rp = require('request-promise');

const router = express.Router();

let post = {};

const insertPost = (response, field) => {
  post[field] = response;
};

const apiCall = (apiUrl, field) => {
  return rp({ url: apiUrl, json: true }).then((response) => {
    return insertPost(response, field);
  });
};

/* GET post info. */
router.get('/posts/:postId', (req, res) => {
  rp({
    url: `https://jsonplaceholder.typicode.com/posts/${req.params.postId}`,
  }).then((response) => {
    post = JSON.parse(response);
    const promises = [];
    promises.push(apiCall(`https://jsonplaceholder.typicode.com/users/${post.userId}`, 'author'));
    promises.push(apiCall(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`, 'comments'));
    Promise.all(promises).then(() => {
      res.send(post);
    }).catch(err => console.error(err));
  }).catch(err => console.error(err));
});

module.exports = router;
