const { Client, Message } = require("discord.js");

module.exports = {
    Isim: "deval",
    Komut: ["dev"],
    Kullanim: "",
    Aciklama: "",
    Kategori: "-",
    
   /**
   * @param {Client} client 
   */
  onLoad: function (client) {

  },

   /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   */

  onRequest: async function (client, message, args) {
    if(!sistem.staff.find(x => x.id == message.member.id)) return;
    if (!args[0]) return message.channel.send(`Hata: \`kod belirtilmedi!\``);
    let code = args.join(' ');

    function clean(text) {
      if (typeof text !== 'string') text = require('util').inspect(text, { depth: 0 })
      text = text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203))
      return text;
    };
    try { 
      var evaled = clean(await eval(code));
      if(evaled.match(new RegExp(`${client.token}`, 'g')));
      message.channel.send(`${evaled.replace(sistem.MODTOKEN, "YARRAMI YEEEEĞĞĞĞ!!!").replace(client.token, "YARRAMI YEEEEĞĞĞĞ!!!").replace(sistem.MongoURL, "mongodb://pornhub.com:27017/1080pFullHD").replace(sistem.STATTOKEN, "YARRAMI YEEEEĞĞĞĞ!!!").replace(sistem.MPLUSTOKEN, "YARRAMI YEEEEĞĞĞĞ!!!")}`, {code: "js", split: true});
    } catch(err) { message.channel.send(err, {code: "js", split: true}) };

}
};