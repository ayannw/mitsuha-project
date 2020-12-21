const express = require('express')
const app = express()
const port = 6969

exports.run = () => {
	app.get('/', (req, res) => {
		res.send('Online')
	})
	app.listen(port)
}
exports.port = port
