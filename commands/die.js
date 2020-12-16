
module.exports = {
	name: 'die',
	run: (client, message, args) => {
		if(message.author.id != client.owner) return
		return client.destroy()
	},
	help: 'Destroys me, owner only.'
}
