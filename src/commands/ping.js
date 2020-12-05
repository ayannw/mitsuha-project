exports.name = 'ping'
exports.aliases = ['pong', 'latency']
exports.run = (client, message, args) => {
  message.channel.send('?').then(m => {
    ping = m.createdTimestamp -  message.createdTimestamp
    return m.edit('Pong! Latency ' + ping + 'ms, heartbeat ' + client.ws.ping + 'ms 💚')
  })
}
