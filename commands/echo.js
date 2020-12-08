const { owner_id } = require('../config.json')
exports.run = (client, message, args) => {
	if(message.author.id != owner_id) return
	args = args.join(' ')
	message.channel.send(args)
	message.delete()
}
