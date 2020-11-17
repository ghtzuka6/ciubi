const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "pay",
  noalias: [""],
  category: "economy",
  description: "Pay to Somebody",
  usage: "[mention | ID] <amount>",
  accessableby: "everyone",

  run: async (bot, message, args) => {
    try {
      let user2 = message.author;
      if (!args[0]) return message.channel.send("Please Enter A User");
      let user =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]) ||
        message.guild.members.cache.find(
          r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()
        ) ||
        message.guild.members.cache.find(
          r => r.displayName.toLowerCase() === args[0].toLocaleLowerCase()
        );
      if (!user) return message.channel.send("Enter A Valid User");

      let member = db.fetch(`money_${user2.id}`);

      let embed1 = new MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`<:bombacross:764545831285817374> you need to Mention someone to pay`);

      if (!args[0]) {
        return message.channel.send(embed1);
      }
      let embed2 = new MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`<:bombacross:764545831285817374> bruhhh! Dont pay yourself`);

      if (user.user.id === message.author.id) {
        return message.channel.send(embed2);
      }

      let embed3 = new MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`<:bombacross:764545831285817374> Please Specify an amount to pay`);

      if (!args[1]) {
        return message.channel.send(embed3);
      }
      let embed4 = new MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`<:bombacross:764545831285817374> Enter A Valid Amount!`);

      if (isNaN(args[1])) {
        return message.channel.send(embed4);
      }
      let embed5 = new MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`<:bombacross:764545831285817374> You don't have that much money in your bank`);

      if (member < args[1]) {
        return message.channel.send(embed5);
      }

      let embed6 = new MessageEmbed()
        .setColor("RANDOM")
        .setDescription(
          `<:checkedbomba:777869968121135124> You have payed ${user.displayName} ${
            args[1]
          } Dollar <:checkdollarbomba:777868122685833287>`
        );

      message.channel.send(embed6);
      db.add(`money_${user.id}`, args[1]);
      db.subtract(`money_${user2.id}`, args[1]);
    } catch {}
  }
};