const fetch = require('node-fetch')

module.exports = (message) => {
  fetch(`https://pepee.ga/chat?message=${message.content}`)
    .then(res => res.json())
    .then(async json => {
      return message.reply(json.response)
  })
}