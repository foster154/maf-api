const Post = require('../models/post').Post;



exports.createPost = function(req, res, next) {
  var post = new Post(req.body);
  post.save(function(err, post){
    if (err) return next(err);
    res.status(201);
    res.json(post);
  });
}

exports.listPosts = function(req, res, next) {
  Post.find({}, 'date title slug coverImage summary')
        .exec(function(err, posts){
          if(err) return next(err);
          res.json(posts);
        });
}

// // This is a paramenter handler that preloads the invoice document if ID is present
// exports.postIdParam = function(req, res, next, id) {
//     Post.findById(id, function(err, doc){
//       if (err) return next(err);
//       if (!doc) {
//         err = new Error("Not Found");
//         err.status = 404;
//         return next(err);
//       }
//       // add it to the request so it can be used by other middleware and route handlers.
//       req.post = doc;
//       return next();
//     });
// }

// This is a paramenter handler that preloads the invoice document if ID is present
exports.postSlugParam = function(req, res, next, slug) {
    Post.find({ slug: slug }, function(err, doc){
      if (err) return next(err);
      if (!doc) {
        err = new Error("Not Found");
        err.status = 404;
        return next(err);
      }
      // add it to the request so it can be used by other middleware and route handlers.
      req.post = doc;
      return next();
    });
}

exports.getPost = function(req, res, next) {
  res.json(req.post);
}

exports.updatePost = function(req, res, next) {
  req.post.update(req.body, function(err, result) {
    if(err) return next(err);
    res.json(result);
  });
}

exports.deletePost = function(req, res, next) {
  req.post.remove(function(err, post){
    if(err) return next(err);
    res.json(post);
  });
}