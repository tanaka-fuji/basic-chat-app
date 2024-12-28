var db = require('../sequelize/models/');
var express = require('express');
var router = express.Router();
var { validationResult } = require('express-validator');
var { topicIdValidator, messageValidator } = require('../middleware/validator');

// 全メッセージ取得API
router.get('/:id/messages', topicIdValidator, async function(req, res, next) {
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
    const messages = await db.Messages.findAndCountAll({
      where: {
        topic_id: topic.dataValues.id,
      },
      order: [
        ['createdAt', 'ASC']
      ]
    });
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// メッセージ作成API
router.post('/:id/messages',topicIdValidator, messageValidator, async function(req, res, next) {
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
    const message = await db.Messages.create({
      topic_id: topic.dataValues.id,
      text: req.body.text,
      username: req.body.username
    });
    topic.last_sent_at = message.dataValues.createdAt;
    topic.save();
    res.status(201).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;