const { owner_id } = require('../config.json')
module.exports = {
  name: 'echo',
  run: (client, message, args) => {
	  if(message.author.id != owner_id) return
  	args = args.join(' ')
  	message.channel.send(args)
  	message.delete()
  },
  help: 'Repeats text, owner-only'
}
