module.exports = function(app, userModel) {

  var passport      = require('passport');
  var LocalStrategy = require('passport-local').Strategy;
  var auth = authorized;
  var auth_ad = authorized_admin;
  passport.use('assignment', new LocalStrategy(localStrategy));
  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);

  app.post  ('/api/assignment/login', passport.authenticate('assignment'), login);
  app.post  ('/api/assignment/logout',         logout);
  app.post  ('/api/assignment/register',       register);
  app.post  ('/api/assignment/user',     auth, register);
  app.get   ('/api/assignment/loggedin',       loggedin);
  app.get   ('/api/assignment/user/:id',       findUserById);
  app.put   ('/api/assignment/user/:id', auth, updateUserById);
  app.delete('/api/assignment/user/:id', auth, deleteUserById);

  // Admin API calls
  app.get   ('/api/assignment/admin/user',     auth_ad, findAllUsers);
  app.get   ('/api/assignment/admin/user/:id', auth_ad, findUserById); 
  app.post  ('/api/assignment/admin/user',     auth_ad, register);
  app.put   ('/api/assignment/admin/user/:id', auth_ad, updateUserById);
  app.delete('/api/assignment/admin/user/:id', auth_ad, deleteUserById);

  function authorized (req, res, next) {
    if (!req.isAuthenticated()) {
      res.send(401);
    } else {
      next();
    }
  };

  function authorized_admin(req, res, next) {
    if(req.isAuthenticated && isAdmin(req.user)) {
      next();
    } else {
      res.send(403);
    }
  }

  
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

//////////////

function register(req, res) {
  var resp = userModel.createUser(req.body);

  resp.then(function(user) {
    res.send(user);
  }, function(err) {
    res.status(400).send(err);
  }); 
};

function deleteUserById(req, res){
  var resp = userModel.deleteUserById(req.params.id);

  resp.then(function(user) {
    res.send(user);
  }, function(err) {
    res.status(400).send(err);
  });
};

function findAllUsers(req, res) {
  var resp = userModel.getAllUsers();

  resp.then(function(users) {
    res.send(users);
  }, function(err) {
    res.status(400).send(err);
  });

}


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


function isAdmin(user) {
  return user.roles.indexOf('admin') != -1;
}

};