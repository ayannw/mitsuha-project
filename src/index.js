const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
const os = require('os')
const h = require('humanize')
const c = require('ansi-colors')
const moment = require('moment')
const fetch = require('node-fetch')
const { prefix, token } = require('./config.json')
const server = require('./server')
let time
let res_time, res_start, res_end
setInterval(() => {
	time = c.gray(moment().format('HH:mm:ss:SSS '))
})

client.commands = new Discord.Collection()
client.events = new Discord.Collection()

fs.readdir('./commands/', (err, files) => {
    if (err) return console.log(err)
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`)
        console.log(time + 'loaded ' + c.bgBlue('commands/' + file))
        let commandName = file.split(".")[0]
        client.commands.set(commandName, props)
    })
})
fs.readdir('./events/', (err, files) => {
    if (err) console.log(err)
        files.forEach(file => {
            let eventFunc = require(`./events/${file}`)
            console.log(time + 'loaded ' + c.bgBlue('events/' + file))
            let eventName = file.split(".")[0];
            client.on(eventName, (...args) => eventFunc.run(client, ...args))
    })
})

client.on('ready', () => {
	server.run()
	console.log(time + 'server started, port: ' + server.port)
	console.log(time + 'logged in as ' + client.user.tag)
	console.log(time + 'memory: ' + client.stats.memory.used.str + '(' + client.stats.memory.used.percent + ')')
})

client.login(token)
