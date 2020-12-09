require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
const os = require('os')
const h = require('humanize')
const c = require('ansi-colors')
const moment = require('moment')
const { prefix } = require('./config.json')
const token = process.env.token
const server = require('./server')

setInterval(() => {
    time = c.gray(moment().format('HH:mm:ss:SSS '))
})

console.log(c.blue(`
┏━
┃	┏┳┓╻╺┳╸┏━┓╻ ╻╻ ╻┏━┓   ┏━┓┏━┓┏━┓ ┏┓┏━╸┏━╸╺┳╸
	┃┃┃┃ ┃ ┗━┓┃ ┃┣━┫┣━┫╺━╸┣━┛┣┳┛┃ ┃  ┃┣╸ ┃   ┃
	╹ ╹╹ ╹ ┗━┛┗━┛╹ ╹╹ ╹   ╹  ╹┗╸┗━┛┗━┛┗━╸┗━╸ ╹  ┃
 						   ━┛
`))

client.commands = new Discord.Collection()
client.events = new Discord.Collection()
client.stats = {}
client.stats.memory = {}
client.stats.memory.used = {}
client.stats.memory.total = h.filesize(os.totalmem())
setInterval(() => {
	client.stats.memory.used.str = h.filesize(process.memoryUsage().heapUsed)
	client.stats.memory.used.percent = String(process.memoryUsage().heapUsed*100/os.totalmem()).substring(0, 4) + '%'
}, 1000)


fs.readdir('./commands/', (err, files) => {
    if (err) return console.log(err)
    console.log(time + c.bgCyanBright('loading commands ...'))
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`)
        console.log(time + c.bgBlue('loaded ' + 'commands/' + file))
        let commandName = file.split(".")[0]
        client.commands.set(commandName, props)
    })
})
fs.readdir('./events/', (err, files) => {
    if (err) console.log(err)
    console.log(time + c.bgCyanBright('loading events ...'))
    files.forEach(file => {
    	let eventFunc = require(`./events/${file}`)
        console.log(time + c.bgBlue('loaded ' + 'events/' + file))
		let eventName = file.split(".")[0]
        client.on(eventName, (...args) => eventFunc.run(client, ...args))
    })
})
client.on('ready', () => {
	console.log(time + c.bgGreen('starting ...'))
	server.run()
	console.log(time + c.bold('server started, port: ' + server.port))
	console.log(time + c.bold('logged in as ' + client.user.tag))
	console.log(time + c.bold('memory: ' + client.stats.memory.used.str + '(' + client.stats.memory.used.percent + ')'))
})
client.on('message', (msg) => {
	console.log(time + c.bgCyan(msg.author.tag) + ' ' + msg.content)
})

client.login(token)
