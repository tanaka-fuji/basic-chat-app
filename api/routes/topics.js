var db = require('../sequelize/models/');
var express = require('express');
var router = express.Router();
var { validationResult } = require('express-validator');
var { topicIdValidator, topicValidator } = require('../middleware/validator');

// 全トピック取得API
router.get('/', async function(req, res, next) {
  try {
    const result = await db.Topics.findAndCountAll({
      order: [
        ['last_sent_at', 'DESC']
      ]
    });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json();
  }
});

// id指定トピック取得API
router.get('/:id', topicIdValidator, async function(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({'errors': errors.array()});
  }
  try {
    const topic = await db.Topics.findOne({
      where: {id: req.params.id}
    });
    if (topic === null) {
      return res.status(404).json({'error': 'Not Found'});
    }
    res.status(200).json(topic);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// トピック作成API
router.post('/', topicValidator, async function(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({'error': errors.array()});
  }
  try {
    const topic = await db.Topics.create({
      name: req.body.name,
      description: req.body.description,
      last_sent_at: new Date()
    });
    req.app.get('io').sockets.emit('addTopicEvent', topic);
    res.status(201).json(topic);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// トピック編集API
router.put('/:id', topicIdValidator, topicValidator, async function(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({'error': errors.array()});
  }
  try {
    const topic = await db.Topics.findOne({
      where: {id: req.params.id}
    });
    if (topic === null) {
      return res.status(404).json({'error': 'Not Found'});
    }
    topic.name = req.body.name;
    topic.description = req.body.description;
    topic.save();
    res.status(200).json(topic);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// 全トピック削除API
router.delete('/', async function(req, res, next) {
  try {
    await db.Topics.destroy({
      where: {},
    });
    res.status(204).json();
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// id指定トピック削除API
router.delete('/:id', topicIdValidator, async function(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({'errors': errors.array()});
  }
  try {
    const topic = await db.Topics.findOne({
      where: {id: req.params.id}
    });
    if (topic === null) {
      return res.status(404).json({'error': 'Not Found'});
    }
    topic.destroy();
    res.status(204).json();
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;