'use strict';

var _ = require('lodash');
var Name = require('./name.model');




// Get name from Image with Alchamy
exports.getNameFromImageURL = function(req, res) {

  // Call alchamy API with req.body.URL
  // Return json from alchamy...

  // function image(req, res, output) {
  //   alchemyapi.image('url', demo_url, {}, function(response) {
  //     output['image'] = { url:demo_url, response:JSON.stringify(response,null,4), results:response };
  //     image_keywords(req, res, output);
  //   });
  // }

  return res.json(201, {name:"ben"});
};



///////////////////////////////////////////////////////////// Generated stuff

// Get list of names
exports.index = function(req, res) {
  Name.find(function (err, names) {
    if(err) { return handleError(res, err); }
    return res.json(200, names);
  });
};

// Get a single name
exports.show = function(req, res) {
  Name.findById(req.params.id, function (err, name) {
    if(err) { return handleError(res, err); }
    if(!name) { return res.send(404); }
    return res.json(name);
  });
};

// Creates a new name in the DB.
exports.create = function(req, res) {
  Name.create(req.body, function(err, name) {
    if(err) { return handleError(res, err); }
    return res.json(201, name);
  });
};

// Updates an existing name in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Name.findById(req.params.id, function (err, name) {
    if (err) { return handleError(res, err); }
    if(!name) { return res.send(404); }
    var updated = _.merge(name, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, name);
    });
  });
};

// Deletes a name from the DB.
exports.destroy = function(req, res) {
  Name.findById(req.params.id, function (err, name) {
    if(err) { return handleError(res, err); }
    if(!name) { return res.send(404); }
    name.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
