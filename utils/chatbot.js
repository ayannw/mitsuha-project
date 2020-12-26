const chatbot = require('reconlx').chatBot

module.exports = (message) => {
  if(!messsage.guild){
    return chatbot(message, message.content)
  } else {
    return
  }
}
