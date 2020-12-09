try { 
	express = require('/data/data/com.termux/files/home/node_modules/express')
} catch {
	express = require('express')
}
const app = express()
const port = 6969

exports.run = () => {
	app.get('/', (req, res) => {
		res.send('Online')
	})
	app.listen(port)
}
exports.port = port
