const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const Post = require('./controllers/post');
const Project = require('./controllers/project');

// see passport.js => JWT strategy
const requireAuth = passport.authenticate('jwt', { session: false });

// see passport.js => local strategy
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  
  // Auth
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
  
  // Posts
  app.post('/posts', requireAuth, Post.createPost);
  app.get('/posts', Post.listPosts);
  app.param('postSlug', Post.postSlugParam);
  app.get('/posts/:postSlug', Post.getPost);
  app.put('/posts/:postSlug', requireAuth, Post.updatePost);
  app.delete('/posts/:postSlug', requireAuth, Post.deletePost);
  
  // Projects
  app.post('/projects', requireAuth, Project.createProject);
  app.get('/projects', Project.listProjects);
  app.param('projectSlug', Project.projectSlugParam);
  app.get('/projects/:projectSlug', Project.getProject);
  app.put('/projects/:projectSlug', requireAuth, Project.updateProject);
  app.delete('/projects/:projectSlug', requireAuth, Project.deleteProject);
}