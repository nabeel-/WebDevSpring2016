module.exports = function(app, userModel) {

  app.post("/api/assignment/user", function(req, res){
    var new_user = userModel.createUser(req.body);
    res.json(new_user);
  });

  app.get("/api/assignment/user", function(req, res){
    if(req.query.username) {
      req.query.password ? authUser(req, res) : getUser(req, res);
    } else {
      var users = userModel.getAllUsers();
      res.json(users);
    }
  });

  function authUser(req, res) {
    var creds = {username: req.query.username, password: req.query.password};
    res.json(userModel.findUserByCredentials(creds));
  }

  function getUser(req, res) {
    var username = req.query.username;
    res.json(userModel.findUserByUsername(username));
  }

  app.get("/api/assignment/user/:id", function(req, res){
    var user = userModel.findUserById(req.params.id);
    res.json(user);
  });

  app.put("/api/assignment/user/:id", function(req, res){
    var updated_user = userModel.updateUserById(req.params.id, req.body);
    res.json(updated_user);
  });

  app.delete("/api/assignment/user/:id", function(req, res){
    var users = userModel.deleteUserById(req.params.id);
    res.json(users);
  });

};