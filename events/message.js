const { prefix } = require('../config.json')
const { error, warn } = require('../logger')

exports.run = async(client, message) => {
	if (message.author.bot) return
	try {
		main = String(message.content.split(' ')[0]).toLowerCase()
		cmd = main.split(prefix)[1]
		args = message.content.split(main)[1]
		//commandfile = client.commands.get(cmd)
		client.commands.forEach(c => {
			if(cmd === c.name || cmd === c.alias){
				try {
					c.run(client, message, args)
				} catch(err){
					error(err)
				}
			}
		})
	} catch {
		warn('new message does not start with prefix')
	}
}
