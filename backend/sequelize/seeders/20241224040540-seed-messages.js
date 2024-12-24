'use strict';

/** @type {import('sequelize-cli').Migration} */
const seed_topics = [
  {
    id: 1,
    name: 'トピック1',
    description: 'トピック1の説明をここに記述します。',
    last_sent_at: new Date(2024, 4, 1),
    createdAt: new Date(2024, 4, 1),
    updatedAt: new Date(2024, 4, 1)
  },
  {
    id: 2,
    name: 'トピック2',
    description: 'トピック2の説明をここに記述します。',
    last_sent_at: new Date(2024, 5, 1),
    createdAt: new Date(2024, 5, 1),
    updatedAt: new Date(2024, 5, 1)
  },
];

const seed_messages = [
  {
    id: 1,
    topic_id: seed_topics[0].id,
    text: 'テキスト1',
    username: '太郎',
    createdAt: new Date(2024, 4, 2, 10),
    updatedAt: new Date(2024, 4, 2, 10)
  },
  {
    id: 2,
    topic_id: seed_topics[0].id,
    text: 'テキスト2',
    username: '太郎',
    createdAt: new Date(2024, 4, 3, 11),
    updatedAt: new Date(2024, 4, 3, 11)
  },
  {
    id: 3,
    topic_id: seed_topics[0].id,
    text: 'テキスト3',
    username: '花子',
    createdAt: new Date(2024, 4, 4, 12),
    updatedAt: new Date(2024, 4, 4, 12)
  },
  {
    id: 4,
    topic_id: seed_topics[1].id,
    text: 'テキスト4',
    username: '花子',
    createdAt: new Date(2024, 5, 2, 10),
    updatedAt: new Date(2024, 5, 2, 10)
  },
  {
    id: 5,
    topic_id: seed_topics[1].id,
    text: 'テキスト5',
    username: '三郎',
    createdAt: new Date(2024, 5, 3, 11),
    updatedAt: new Date(2024, 5, 3, 11)
  },
  {
    id: 6,
    topic_id: seed_topics[1].id,
    text: 'テキスト6',
    username: '三郎',
    createdAt: new Date(2024, 5, 4, 12),
    updatedAt: new Date(2024, 5, 4, 12)
  },
]

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Topics', seed_topics, {})
    await queryInterface.bulkInsert('Messages', seed_messages, {})
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Topics', null, {});
    await queryInterface.bulkDelete('Messages', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};