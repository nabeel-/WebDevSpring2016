module.exports = function(app, userModel) {
  var passport      = require('passport');
  var auth = authorized;
  app.post  ('/api/project/login', passport.authenticate('local'), login);
  app.post  ('/api/project/logout',         logout);
  app.post  ('/api/project/user',           register);
  app.get   ('/api/project/loggedin',       loggedin);
  app.put   ('/api/project/user/:id', auth, updateUserById);
  app.delete('/api/project/user/:id', auth, deleteUserById);

  app.get("/api/project/user/:id", findUserById);
      
  function authorized (req, res, next) {
      if (!req.isAuthenticated()) {
          res.send(401);
      } else {
          next();
      }
  };
  var LocalStrategy = require('passport-local').Strategy;
  passport.use('local', new LocalStrategy(localStrategy));
  function localStrategy(username, password, done) {
      userModel
          .findUserByCredentials({username: username, password: password})
          .then(
              function(user) {
                  if (!user) { return done(null, false); }
                  return done(null, user);
              },
              function(err) {
                  if (err) { return done(err); }
              }
          );
  }

  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);

  function serializeUser(user, done) {
      done(null, user);
  }

  function deserializeUser(user, done) {
      userModel
          .findUserById(user._id)
          .then(
              function(user){
                  done(null, user);
              },
              function(err){
                  done(err, null);
              }
          );
  }

  function login(req, res) {
      var user = req.user;
      res.json(user);
  }

  function logout(req, res) {
      req.logOut();
      res.send(200);
  }

  function loggedin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
  }

  function register(req, res) {
    var resp = userModel.createUser(req.body);

    resp.then(function(user) {
      req.login(user, function(err) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.json(user);
        }
      });
    }, function(err) {
      res.status(400).send(err);
    }); 
  };

  function deleteUserById(req, res){
    var users = userModel.deleteUserById(req.params.id);

    resp.then(function(user) {
      res.send(user);
    }, function(err) {
      res.status(400).send(err);
    });
  };

  function findUserByUsername(req, res) {
    var username = req.query.username,
        resp     = userModel.findUserByUsername(username);

    resp.then(function(user) {
      res.send(user);
    }, function(err) {
      res.status(400).send(err);
    });
  }

  function findUserById(req, res){
    var resp = userModel.findUserById(req.params.id);

    resp.then(function(user) {
      res.send(user);
    }, function(err) {
      res.status(400).send(err);
    });
  };

  function updateUserById(req, res){
    var resp = userModel.updateUserById(req.params.id, req.body);

    resp.then(function(user) {
      res.send(user);
    }, function(err) {
      res.status(400).send(err);
    });
  };

};