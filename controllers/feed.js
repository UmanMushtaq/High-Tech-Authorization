const Post = require('../models/Post');
const Comment = require('../models/Comments');
exports.addPost = (req, res, next) => {
  const { content } = req.body;
  const userid = req.user;
  console.log(userid);
  const post = new Post({
    content: content,
    author: userid,
  });

  post
    .save()
    .then((result) => {
      return res.status(400).json({ msg: 'success', result });
    })
    .catch((error) => {
      return res.status(500).json({ msg: 'failed', error });
    });
};
exports.postaddComment = (req, res, next) => {
  const { postid } = req.params;
  const { content } = req.body;
  const comment = new Comment({
    content: content,
    postid: postid,
    userid: req.user,
  });
  comment
    .save()
    .then((result) => {
      res.status(400).json({ msg: 'commented', result });
    })
    .catch((error) => {
      res.status(500).json({ msg: 'Failed to post comment', error });
    });
};
exports.getPost = (req, res, next) => {
  const { postid } = req.params;
  Post.findById(postid)
    .then((posts) => {
      res.status(200).json({ posts });
    })
    .catch((error) => {
      res.status(500).json({ msg: 'Failed to get post', error });
    });
};
exports.editPost = (req, res, next) => {
  const { postid } = req.params;
  const userid = req.user;
  console.log(userid);
  const { content } = req.body;
  Post.findById({ _id: postid, author: userid })
    .then((posts) => {
      posts.content = content;
      return posts
        .save()
        .then((result) => {
          return res.status(200).json({ msg: 'Post updated', result });
        })
        .cactch((error) => {
          return res.status(500).json({ msg: 'Post not updated', error });
        });
    })
    .catch((error) => {
      return res.status(500).json({ msg: 'User and post not found', error });
    });
};
exports.deletePost = async (req, res, next) => {
  const { postid } = req.params;

  var post = Post.findByIdAndDelete({ _id: postid }).exec();
  var comment = Comment.deleteMany({ postid: postid }).exec();
  let result = await Promise.all([post, comment]);
  if (result) {
    return res.status(200).json({ msg: 'Done' });
  } else {
    return res.status(500).json({ msg: 'Post not delete', error });
  }
  //   console.log(result);
  //   Promise.all([
  //     Post.findByIdAndDelete({ _id: postid }).exec(),
  //     Comment.deleteMany({ postid: postid }).exec(),
  //   ])
  //     .then((result) => {
  //       return res.status(200).json({ msg: 'Post delete', result });
  //     })
  //     .catch((error) => {
  //       return res.status(500).json({ msg: 'Post not delete', error });
  //     });
};
exports.getaddPost = (req, res, next) => {};
