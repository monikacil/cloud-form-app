var express = require('express');
var router = express.Router();

const elementService = require('../element-service');

router.get('/elements', function(req, res, next) {
  elementService.get(req, res)
});

router.put('/element', function(req, res, next) {
  elementService.create(req, res)
});

router.post('/element', function(req, res, next) {
  elementService.update(req, res)
});

module.exports = router;
