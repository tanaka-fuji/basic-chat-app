var db = require('../sequelize/models/');
var express = require('express');
var router = express.Router();

// 全トピック取得API
router.get('/', function(req, res, next) {
  db.Topics.findAndCountAll({
    order: [
      ['last_sent_at', 'DESC']
    ]
  })
  .then(result => {
    res.status(200).json(result);
  })
  .catch(error => {
    res.status(500).json(error);
  });
});

// id指定トピック取得API
router.get('/:id', function(req, res, next) {
  db.Topics.findOne({
    where: {id: req.params.id}
  })
  .then(topic => {
    if (topic === null) {
      return res.status(404).json({'error': 'Not Found'});
    }
    res.status(200).json(topic);
  })
  .catch(error => {
    res.status(500).json(error);
  });
});

// トピック作成API
router.post('/', function(req, res, next) {
  if (req.body.name == null || req.body.description == null) {
    return res.status(400).json({'error': 'Bad Request'});
  }
  db.Topics.create({
    name: req.body.name,
    description: req.body.description
  })
  .then(topic => {
    res.status(201).json(topic);
  })
  .catch(error => {
    res.status(500).json(error);
  })
});

// トピック編集API
router.put('/:id', function(req, res, next) {
  if (req.body.name == null || req.body.description == null) {
    return res.status(400).json({'error': 'Bad Request'});
  }
  db.Topics.findOne({
    where: {id: req.params.id}
  })
  .then(topic => {
    if (topic === null) {
      return res.status(404).json({'error': 'Not Found'});
    }
    topic.name = req.body.name;
    topic.description = req.body.description;
    topic.save();
    res.status(200).json(topic);
  })
  .catch(error => {
    res.status(500).json(error);
  });
});

// 全トピック削除API
router.delete('/', function(req, res, next) {
  db.Topics.destroy({
    where: {},
  })
  .then(result => {
    res.status(204).json();
  })
  .catch(error => {
    res.status(500).json(error);
  });
});

// id指定トピック削除API
router.delete('/:id', function(req, res, next) {
  db.Topics.findOne({
    where: {id: req.params.id}
  })
  .then(topic => {
    if (topic === null) {
      return res.status(404).json({'error': 'Not Found'});
    }
    topic.destroy();
    res.status(204).json();
  })
  .catch(error => {
    res.status(500).json(error);
  });
});

module.exports = router;
