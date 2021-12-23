const express = require('express');
const authValidate = require('../middleware/authmiddleware');
const router = express.Router();
const feedController = require('../controllers/feed');

router.post('/addpost', authValidate.IsAuth, feedController.addPost);
router.get('/addpost', authValidate.IsAuth, feedController.getaddPost);
router.post(
  '/comments/:postid',
  authValidate.IsAuth,
  feedController.postaddComment
);
router.get('/post/:postid', authValidate.IsAuth, feedController.getPost);
router.put('/editpost/:postid', authValidate.IsAuth, feedController.editPost);
router.delete(
  '/deletetpost/:postid',
  authValidate.IsAuth,
  feedController.deletePost
);
module.exports = router;
