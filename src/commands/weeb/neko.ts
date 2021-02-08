import * as Neko from 'nekos.life';
import { Client, Message, MessageEmbed } from "discord.js";
import { Command } from '../../types/Command';

const sTime = new Date().getTime();
const neko = new Neko();

export const cmd: Command = {
  name: 'neko',
  run: async (client: Client, message: Message): Promise<void> => {
    const img = await neko.sfw.neko();
    const eTime = new Date().getTime();
    const embed: MessageEmbed = new MessageEmbed()
      .setTitle('Nekos OwO')
      .setColor('RANDOM')
      .setImage(img.url)
      .setFooter('Nekos.life | ' + String(eTime-sTime) + ' ms',
        'https://avatars.githubusercontent.com/u/34457007?s=200&v=4')
      
    try {
      message.channel.send(embed);
    } catch (err) {
      message.channel.send('An unexpected error popped up: ```\njs' + err + '```');
    }
  },
  help: 'Loads a random neko image from nekos.life',
  aliases: ['nekos', 'catgirl', 'catgirls'],
  usage: 'm.neko',
  catg: 'weeb'
}