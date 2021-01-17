const { prefix } = require('../config.json')
const chatbot = require('reconlx').chatBot
exports.run = async(client, message) => {
    if (message.author.bot) return
    if (message.content.startsWith(prefix)) {
    	let messageArray = message.content.split(' '),
    	cmd = messageArray[0],
	    args = messageArray.slice(1),
    	commandfile = client.commands.get(cmd.slice(prefix.length))
		if(!commandfile) return;
    	return commandfile.run(client, message, args)
  	} else {
      if(!message.guild){
        message.channel.startTyping()
        chatbot(message, message.content)
        message.channel.stopTyping()
      } else {
        return
      }
    }
}
