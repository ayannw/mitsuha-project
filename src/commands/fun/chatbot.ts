/* eslint-disable no-extra-boolean-cast */
import { chatbot } from "../../tools/chatbot";
import { Message, Client } from 'discord.js';
import { Command } from '../../types/Command';

async function chat(message: Message): Promise<void> {
  const reply: string = await chatbot(message.content);

  await message.channel.send(reply);
}

export const cmd: Command = {
  name: 'chatbot',
  run: (client: Client, message: Message): void => {
    message.channel.send('Ready. Type `stop` to exit.').then(() => {
      const user = message.author.id;
      const channel = message.channel.id;

      client.on('message', (m): Promise<Message> | Promise<void> => {
        if(m.channel.id == channel && m.author.id == user) {
          let canceled = false;

          if(m.content.toLowerCase() === 'stop') {
            m.channel.stopTyping();
            canceled = true;
            return m.channel.send('Cancelling.');
          }
          if(Boolean(canceled)) return;
          
          if(!Boolean(canceled))
            m.channel.startTyping();
            m.channel.stopTyping();
            return chat(m);
        }
      })
    });
  },
  aliases: ['chat', 'cb'],
  help: 'Chat with me !',
  usage: 'm.chatbot'
}