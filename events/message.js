const { prefix } = require('../config.json')
const { error } = require('../logger')

exports.run = async(client, message) => {
	if (message.author.bot) return;

	main = String(message.content.split(' ')[0]).toLowerCase()
	cmd = main.split(prefix)[1]
	args = message.content.split(main)[1]
	commandfile = client.commands.get(cmd) 
    			|| client.aliases.get(cmd)
	if(!commandfile) return
	try {
		commandfile.run(client, message, args)
	} catch(err){
		error(err)
	}
}
