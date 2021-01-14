const { MessageEmbed } = require('discord.js')
const weather = require('weather-js')
let embed
module.exports = {
  name: 'weather',
  run: (client, message, args) => {
    args = args.join(' ')
    weather.find({search: args, degreeType: 'C'}, function(err, result) {
      if(err) console.log(err)
      console.log(result[0])
      result = result[0]

      embed = new MessageEmbed()
        .setDescription()
    })
  },
  help: 'weather'
}
