exports.name = 'ping'
exports.run = (client, message, args) => {
  message.channel.send('?').then(m => {
    ping = m.createdTimestamp -  message.createdTimestamp
    return m.edit('<:online:735517961602727957> Pong! Latency ' + ping + 'ms, heartbeat ' + client.ws.ping + 'ms <a:heartbeat:785064044322488330>')
  })
}
