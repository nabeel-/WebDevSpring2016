module.exports = function(app, userModel) {

  app.post('/api/project/user', function(req, res){
    var new_user = userModel.createUser(req.body);
    res.json(new_user);
  });

  app.delete('/api/project/user/:id', function(req, res){
    var users = userModel.deleteUserById(req.params.id);
    res.json(users);
  });

  app.get('/api/project/user', function(req, res){
    if(req.query.username) {
      req.query.password ? authUser(req, res) : getUser(req, res);
    } else {
      var users = userModel.getAllUsers();
      res.json(users);
    }
  });

  function authUser(req, res) {
    var creds = {username: req.query.username, password: req.query.password},
        resp  = userModel.findUserByCredentials(creds);

    resp = resp ? resp : error('Invalid credentials used.');

    res.json(resp);
  }

  function getUser(req, res) {
    var username = req.query.username,
        resp     = userModel.findUserByUsername(username);

    resp = resp ? resp : error('User with username: ' + username + ' not found.');

    res.json(resp);
  }

  app.get('/api/project/user/:id', function(req, res){
    var user = userModel.findUserById(req.params.id),
        resp = user ? user : error('User with ID: ' + req.params.id + ' not found.');

    res.json(resp);
  });

  app.put('/api/project/user/:id', function(req, res){
    var updated_user = userModel.updateUserById(req.params.id, req.body),
        resp         = updated_user ? updated_user : error('User with ID: ' + req.params.id + ' not found.');

    res.json(resp);
  });

  function error(msg) {
    return { errors: [ { status: 400, detail: msg} ]};
  }

};