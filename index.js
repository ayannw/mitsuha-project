require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
const os = require('os')
const h = require('humanize')
const c = require('ansi-colors')
const moment = require('moment')
const { prefix , owner_id } = require('./config.json')
const token = process.env.token
const server = require('./server')
const logger = require('./logger')

setInterval(() => {
    time = c.gray(moment().format('HH:mm:ss:SSS '))
})

logger.warn('starting..')
console.log(c.blue(`
┏━
┃	┏┳┓╻╺┳╸┏━┓╻ ╻╻ ╻┏━┓   ┏━┓┏━┓┏━┓ ┏┓┏━╸┏━╸╺┳╸
	┃┃┃┃ ┃ ┗━┓┃ ┃┣━┫┣━┫╺━╸┣━┛┣┳┛┃ ┃  ┃┣╸ ┃   ┃
	╹ ╹╹ ╹ ┗━┛┗━┛╹ ╹╹ ╹   ╹  ╹┗╸┗━┛┗━┛┗━╸┗━╸ ╹  ┃
 						   ━┛
`))

client.commands = new Discord.Collection()
client.events = new Discord.Collection()
client.owner = owner_id
client.stats = {}
client.stats.memory = {}
client.stats.memory.used = {}
client.stats.memory.total = h.filesize(os.totalmem())
setInterval(() => {
	client.stats.memory.used.str = h.filesize(process.memoryUsage().heapUsed)
	client.stats.memory.used.percent = String(process.memoryUsage().heapUsed*100/os.totalmem()).substring(0, 4) + '%'
}, 10000)


fs.readdir('./commands/', (err, files) => {
    if (err) return console.log(err)
    logger.warn(c.bgCyanBright('loading commands ...'))
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`)
        logger.success(c.bgBlue('loaded ' + 'commands/' + file))
        let commandName = file.split(".")[0]
        client.commands.set(commandName, props)
    })
})
fs.readdir('./events/', (err, files) => {
    if (err) console.log(err)
    logger.warn(c.bgCyanBright('loading events ...'))
    files.forEach(file => {
    	let eventFunc = require(`./events/${file}`)
        logger.success(c.bgBlue('loaded ' + 'events/' + file))
		let eventName = file.split(".")[0]
        client.on(eventName, (...args) => eventFunc.run(client, ...args))
    })
})
client.on('ready', () => {
	logger.warn(c.bgGreen('starting ...'))
	server.run()
	logger.success(c.bold('server started, port: ' + server.port))
	logger.success(c.bold('logged in as ' + client.user.tag))
	setInterval(() => {
			client.user.setActivity(
				client.users.cache.size 
				+ ' users', {
				type: 'WATCHING'
				}
			)}, 420000)
})
client.on('message', (msg) => {
	logger.log(c.bgCyan(`${msg.channel.name}>${msg.author.tag}`) + '>' + msg.content)
})

client.login(token)

