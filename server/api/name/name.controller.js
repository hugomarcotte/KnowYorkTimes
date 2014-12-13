'use strict';
var request = require('request');

var _ = require('lodash');
var Name = require('./name.model');
var AlchemyAPI = require('../../alchemyapi.js');
var https = require('https');
var alchemyapi = new AlchemyAPI();
var https = require('https');


// Get name from Image with Alchamy
exports.getNameFromImageURL = function(req, res) {

  // Call alchamy API with req.body.URL
  // Return json from alchamy...

  //console.log(alchemyapi);
  //
  // alchemyapi.analyze('url', 'http://www.nytimes.com/2014/12/11/us/politics/obama-effectiveness-cia-torture.html?ref=politics', {}, function(response) {
  //   console.log(response);
  //   // output['image'] = { url:demo_url, response:JSON.stringify(response,null,4), results:response };
  //   // image_keywords(req, res, output);
  // });
  //
  // http://access.alchemyapi.com/calls/url/URLGetRankedImageFaceTags

  return res.json(201, {name:"ben"});
};


var resultsPageNumber = 0;
exports.newYorkTimesApiCall = function(req, res) {


var NYTapiKey = "bdcebec4874a5076dbaaa7f2a5f0db3b:3:70140904";

  console.log("made it here");;

  var url = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=source:("The New York Times") AND type_of_material:("News") AND news_desk:("Sports" "Science")' + '&begin_date=20141211&end_date=20141211' + '&page=' + resultsPageNumber + '&api-key=' + NYTapiKey;
  request(url, function(err,responce,body) {
    /////////// do everything with data

    ////////////////
    console.log(responce);
    resultsPageNumber++;
    return res.json(200, responce);
  });



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
