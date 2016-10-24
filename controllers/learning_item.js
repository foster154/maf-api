const LearningItem = require('../models/learning_item').LearningItem;

exports.createItem = function(req, res, next) {
  var learningItem = new LearningItem(req.body);
  learningItem.save(function(err, item){
    if (err) return next(err);
    res.status(201);
    res.json(item);
  });
}

exports.listItems = function(req, res, next) {
  LearningItem.find({}).sort({date: 'descending'})
        .exec(function(err, items){
          if(err) return next(err);
          res.json(items);
        });
}

// This is a paramenter handler that preloads the invoice document if ID is present
exports.itemIdParam = function(req, res, next, id) {
    LearningItem.findById(id, function(err, doc){
      if (err) return next(err);
      if (!doc) {
        err = new Error("Not Found");
        err.status = 404;
        return next(err);
      }
      // add it to the request so it can be used by other middleware and route handlers.
      req.learningItem = doc;
      return next();
    });
}

// exports.getProject = function(req, res, next) {
//   res.json(req.project);
// }

exports.updateItem = function(req, res, next) {
  req.learningItem.update(req.body, function(err, result) {
    if(err) return next(err);
    res.json(result);
  });
}

exports.deleteItem = function(req, res, next) {
  req.learningItem.remove(function(err, item){
    if(err) return next(err);
    res.json(item);
  });
}