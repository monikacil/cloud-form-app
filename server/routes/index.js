var express = require('express');
var router = express.Router();

const elementService = require('../element-service');

router.get('/element/:email', function(req, res, next) {
  elementService.get(req, res)
});

router.put('/element', function(req, res, next) {
  elementService.create(req, res)
});

router.post('/element', function(req, res, next) {
  elementService.update(req, res)
});

router.delete('/element/:url', (req, res) => {
  elementService.remove(req, res);
});

module.exports = router;
