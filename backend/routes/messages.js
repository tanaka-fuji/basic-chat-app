var db = require('../sequelize/models/');
var express = require('express');
var router = express.Router();

// 全メッセージ取得API
router.get('/:id/messages', function(req, res, next) {
  db.Topics.findOne({
    where: {id: req.params.id}
  })
  .then(topic => {
    if (topic === null) {
      return res.status(404).json({'error': 'Not Found'});
    }
    db.Messages.findAndCountAll({
      where: {
        topic_id: req.params.id
      },
      order: [
        ['createdAt', 'ASC']
      ]
    })
    .then(messages => {
      res.status(200).json(messages);
    })
    .catch(error => {
      res.status(500).json(error);
    });
  })
  .catch(error => {
    res.status(500).json(error);
  });
});

// メッセージ作成API
router.post('/:id/messages', function(req, res, next) {
  if (req.body.text == null || req.body.username == null) {
    return res.status(400).json({'error': 'Bad Request'});
  }
  db.Topics.findOne({
    where: {id: req.params.id}
  })
  .then(topic => {
    if (topic === null) {
      return res.status(404).json({'error': 'Not Found'});
    }
    db.Messages.create({
      topic_id: topic.dataValues.id,
      text: req.body.text,
      username: req.body.username
    })
    .then(message => {
      topic.last_sent_at = message.dataValues.createdAt;
      topic.save();
      res.status(201).json(message);
    })
    .catch(error => {
      res.status(500).json(error);
    });
  })
  .catch(error => {
    res.status(500).json(error);
  });
});

module.exports = router;