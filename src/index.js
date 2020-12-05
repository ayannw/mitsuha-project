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

client.on('ready', () => {
	server.run()
	
	setInterval(() => {
		res_start = Date.now()
		fetch('http://0.0.0.0:6969')
		res_end = Date.now()
		res_time = res_end - res_start + 'ms'
	}, 1000)
	console.log(time + 'server started, port: ' + server.port)
	console.log(time + 'logged in as ' + client.user.tag)
	setInterval(() => {
		console.log(time + 'memory: ' + client.stats.memory.used.str + '(' + client.stats.memory.used.percent + ') Response time: ' + res_time)
	}, 1000)
	setInterval(() => {
		console.log(time + c.cyan('heartbeat: ' + client.ws.ping))
	}, 6000000)
})

client.login(token)
