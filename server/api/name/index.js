'use strict';

var express = require('express');
var controller = require('./name.controller');

var router = express.Router();

 router.get('/:pageNumber', controller.newYorkTimesApiCall);
// router.get('/:id', controller.show);
// router.post('/', controller.create);
// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);
router.post('/', controller.getAlchamyKeywordsFromURL);


module.exports = router;
