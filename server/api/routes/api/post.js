import post from '../../controller/post'
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', post.getAll);
router.get('/:id', post.getPost);
router.post('/', post.createPost);
router.put('/:id', post.updatePost);
router.delete('/:id', post.deletePost);

module.exports = router;
