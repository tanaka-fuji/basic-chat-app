module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('接続されました');
  })
}