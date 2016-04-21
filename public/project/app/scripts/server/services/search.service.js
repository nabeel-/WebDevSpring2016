var request = require('request');

module.exports = function(app) {

  app.get('/api/project/search', search);
  app.get('/api/project/search/course/:id', getCourseDetails);

  function search(req, res) {
    var options = {
      url: 'https://www.udemy.com/api-2.0/courses/?search=' + req.query.search,
      headers: {
        'Authorization': process.env.UDEMY_API_AUTH
      }
    };

    request(options, function(err, resp, body) {
      if (!err && resp.statusCode == 200) {
        res.send(body);
      }
    });
  }

  function getCourseDetails(req, res) {
    var options = {
      url: 'https://www.udemy.com/api-2.0/courses/' + req.params.id + '?fields[course]=@all',
      headers: {
        'Authorization': process.env.UDEMY_API_AUTH
      }
    };

    request(options, function(err, resp, body) {
      if (!err && resp.statusCode == 200) {
        res.send(body);
      }
    });
  }

};