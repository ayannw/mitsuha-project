/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const alexa = require("alexa-bot-api");
const ai = new alexa();

exports.chatbot = async (text) => {
  let reply;

  try {
    reply = await ai.getReply(text);
  } catch (err) {
    reply = "An unexpected error popped up. ```js\n" + err + "```";
  }

  return await reply;
};
