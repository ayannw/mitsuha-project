exports.name = 'ping'
exports.aliases = ['pong', 'latency']
exports.run = (client, message, args) => {
  message.channel.send('Calculating ...').then(m => {
    ping = m.createdTimestamp -  message.createdTimestamp
    m.edit('> Pong! Latency ' + ping + 'ms, heartbeat ' + client.ws.ping + 'ms')
  })
}
