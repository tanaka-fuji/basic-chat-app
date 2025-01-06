var db = require('../sequelize/models/');
var { check } = require('express-validator');

module.exports = {
  topicIdValidator: [
    check('id').isInt().withMessage('トピックIDが不正な値です。')
  ],
  topicValidator: [
    check('name').trim().isLength({min: 1, max: 10}).withMessage('トピック名は1文字以上10文字以内で入力してください。'),
    check('description').isLength({min: 0, max: 100}).withMessage('トピック説明文は100文字以内で入力してください。')
  ],
  messageValidator: [
    check('username').trim().isLength({min: 1, max: 10}).withMessage('ニックネームは、1文字以上10文字以内で入力してください。'),
    check('text').trim().isLength({min: 1, max: 100}).withMessage('メッセージ本文は、1文字以上100文字以内で入力してください。')
  ]
}