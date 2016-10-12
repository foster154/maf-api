const Project = require('../models/project').Project;

exports.createProject = function(req, res, next) {
  var project = new Project(req.body);
  project.save(function(err, project){
    if (err) return next(err);
    res.status(201);
    res.json(project);
  });
}

exports.listProjects = function(req, res, next) {
  Project.find({}, 'date title slug coverImage summary')
        .exec(function(err, projects){
          if(err) return next(err);
          res.json(projects);
        });
}

// This is a paramenter handler that preloads the document if ID is present
exports.projectSlugParam = function(req, res, next, slug) {
    Project.findOne({ slug: slug }, function(err, doc){
      if (err) return next(err);
      if (!doc) {
        err = new Error("Not Found");
        err.status = 404;
        return next(err);
      }
      // add it to the request so it can be used by other middleware and route handlers.
      req.project = doc;
      return next();
    });
}

exports.getProject = function(req, res, next) {
  res.json(req.project);
}

exports.updateProject = function(req, res, next) {
  req.project.update(req.body, function(err, result) {
    if(err) return next(err);
    res.json(result);
  });
}

exports.deleteProject = function(req, res, next) {
  req.project.remove(function(err, project){
    if(err) return next(err);
    res.json(project);
  });
}