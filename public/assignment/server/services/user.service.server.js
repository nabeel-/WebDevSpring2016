module.exports = function(app, userModel) {

  app.post("/api/assignment/user", register);
  app.get("/api/assignment/user", delegate);
  app.get("/api/assignment/user/:id", findUserById);
  app.put("/api/assignment/user/:id", updateUserById);
  app.delete("/api/assignment/user/:id", deleteUserById);

  function register(req, res) {
    var resp = userModel.createUser(req.body);

    resp.then(function(user) {
      res.send(user);
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

  function delegate(req, res){
    if(req.query.username) {
      req.query.password ? authUser(req, res) : findUserByUsername(req, res);
    } else {
      var resp = userModel.getAllUsers();

      resp.then(function(users) {
        res.send(users);
      }, function(err) {
        res.status(400).send(err);
      });
    }
  };

  function authUser(req, res) {
    var creds = {username: req.query.username, password: req.query.password},
        resp  = userModel.findUserByCredentials(creds);

    resp.then(function(user) {
      res.send(user);
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

  function error(msg) {
    return { errors: [ { status: 400, detail: msg} ]};
  }

};