const botconfig = require("./brain/botconfig.json");
const whitelist = require("./brain/whitelist.json");
const Discord = require("discord.js");
const fetch = require('node-fetch');
const fs = require('fs');
const buffer = require('buffer');
var r = require('request');

console.log("\x1b[31m              ____________            __             __\n   ________  / / __/ ____/___  ____  / /__________  / /\n  / ___/ _ \\/ / /_/ /   / __ \\/ __ \\/ __/ ___/ __ \\/ / \n (__  )  __/ / __/ /___/ /_/ / / / / /_/ /  / /_/ / /  \n/____/\\___/_/_/  \\____/\\____/_/ /_/\\__/_/   \\____/_/\nCreated by: \x1b[37mciph0n\n\x1b[31mGithub: \x1b[37mhttps://github.com/ciph0n\n\x1b[31mTwitter: \x1b[37mhttps://twitter.com/ciph0n_\n")

fs.writeFileSync('./brain/live.txt', new Date().toUTCString().toString(), {
  flag: 'w'
}, function (err) {
  console.log(err);
});

const commandLog = new console.Console(fs.createWriteStream('./logs/commandLog.log', {
  flags: 'a'
}));

const client = new Discord.Client({
  autoReconnect: true,
  disableEveryone: false
});

client.on("ready", async () => {
  console.log(`\x1b[31m${client.user.username} \x1b[37mhas just connected to \x1b[31mDiscord's API\x1b[37m at \x1b[31m` + new Date().toUTCString().toString() + `\x1b[37m!`);
  if (`${botconfig["nitro-sniper-enabled"]}` == "false") {
    console.log("\x1b[31m[#] \x1b[37mNitro Sniping \x1b[31mis \x1b[37mnot enabled \x1b[31min the config.")
  } else if (`${botconfig["nitro-sniper-enabled"]}` == "true") {
    console.log("\x1b[31m[#] \x1b[37mNitro Sniping \x1b[31mis \x1b[37menabled \x1b[31min the config.")
  }
})

client.on("message", async message => {
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if (`${botconfig["nitro-sniper-enabled"]}`.toLowerCase() == "true") {
    let nC0de = message.content.match(/(discord.gift\/................)/gi);

    if (nC0de) {
      if (nC0de.length < 1) {

      } else {
        r.post(
          'https://discordapp.com/api/v6/entitlements/gift-codes/' + nC0de[0].split('/')[1] + '/redeem', {
            json: {
              "channel_id": message.channel.id
            },
            headers: {
              authorization: `${botconfig.token}`
            }
          },
          function (error, response, body) {
            if (!error && response.statusCode == 200) {
              console.log(body);
            }
          }
        );
        if ("This gift has been redeemed already." == r) {
          console.log("\x1b[33mThis code has already been redeemed.")
        } else if ("Unknown Gift Code" == r) {
          console.log("\x1b[31mInvalid Nitro Code")
        } else if ("Nitro" == r || "Nitro Classic" == r) {
          console.log("\x1b[32mNitro Code Claimed")
        } else {
          console.log("\x1b[31mInvalid Nitro Code")
        }

      }
    }
  }

  fs.readFile('./brain/whitelist.json', (err, data) => {
    if (!err) {
      var whitelist = JSON.parse(data);
      if (whitelist.indexOf(message.author.id) > -1 || message.author.id === botconfig.OwnerID) {
        if (cmd === `${botconfig["silent-prefix"]}help`) {
          let embed = new Discord.RichEmbed()
            .setColor("#000000")
            .setTitle("Help Menu")
            .addField("`" + `${botconfig["silent-prefix"]}` + "support`", `Encoding/Decoding support`, true)
            .addField("`" + `${botconfig["silent-prefix"]}` + "encode [md5|b64] [word] [word]`", `Encodes the word into hash!`, true)
            .addField("`" + `${botconfig["silent-prefix"]}` + "decode [md5|b64] [word] [hash]`", `Cracks the word for you.`, true)
            .addField("`" + `${botconfig["silent-prefix"]}` + "pass [#]`", `Generates a password for you.`, true)
            .addField("`" + `${botconfig["silent-prefix"]}` + "person`", `Generates a person for you.`, true)
            .addField("`" + `${botconfig["silent-prefix"]}` + "iplookup [ip]`", `Looks the IP up.`, true)
            .addField("`" + `${botconfig["silent-prefix"]}` + "check`", `Verifys whitelist`, true)
            .setTimestamp()
            .setFooter("Developed by ciph0n")

          // Logging Files

          numbCount()
          commandLog.log(message.author.tag + ` <@` + message.author.id + `> used the command ${botconfig["silent-prefix"]}help`);
          console.log("\x1b[37m" + new Date().toUTCString() + " \x1b[31m" + message.author.tag + ` \x1b[37m<@\x1b[31m` + message.author.id + `\x1b[37m> used the command \x1b[31m${botconfig["silent-prefix"]}help`);

          message.channel.send(embed)
        }

        if (cmd === `${botconfig["silent-prefix"]}support`) {
          let embed = new Discord.RichEmbed()
            .setColor("#000000")
            .setTitle("Information Menu")
            .addField("`Follow my Github`", `https://github.com/ciph0n`, false)
            .addField("`Follow my Twitter`", `https://twitter.com/ciph0n_`, false)
            .addField("`Visit my Website`", `https://ciph0n.dev`, false)
            .setTimestamp()
            .setFooter("Developed by ciph0n")

          // Logging Files

          numbCount()
          commandLog.log(message.author.tag + ` <@` + message.author.id + `> used the command ${botconfig["silent-prefix"]}support`);
          console.log("\x1b[37m" + new Date().toUTCString() + " \x1b[31m" + message.author.tag + ` \x1b[37m<@\x1b[31m` + message.author.id + `\x1b[37m> used the command \x1b[31m${botconfig["silent-prefix"]}support`);

          message.channel.send(embed)
        }

        if (cmd === `${botconfig["silent-prefix"]}check`) {
          message.react("✅")

          // Logging Files

          numbCount()
          commandLog.log(message.author.tag + ` <@` + message.author.id + `> used the command ${botconfig["silent-prefix"]}check`);
          console.log("\x1b[37m" + new Date().toUTCString() + " \x1b[31m" + message.author.tag + ` \x1b[37m<@\x1b[31m` + message.author.id + `\x1b[37m> used the command \x1b[31m${botconfig["silent-prefix"]}check`);
        }

        if (cmd === `${botconfig["silent-prefix"]}iplookup`) {
          iplookup()
        }

        if (cmd === `${botconfig["silent-prefix"]}pass`) {
          passGen()
        }

        if (cmd === `${botconfig["silent-prefix"]}person`) {
          personGen()
        }

        if (cmd === `${botconfig["silent-prefix"]}decode`) {
          deCode()
        }

        if (cmd === `${botconfig["silent-prefix"]}encode`) {
          enCode()
        }

        if (cmd === `${botconfig["silent-prefix"]}stats`) {
          statsCheck()
        }
      }
    }
  })

  async function iplookup() {

    let prefix = args[0];
    if (!args[0]) return message.reply("What am I looking up?")

    const {
      query,
      proxy,
      country,
      regionName,
      city,
      lat,
      lon
    } = await fetch(`http://ip-api.com/json/${prefix}?fields=query,proxy,isp,country,regionName,city,lat,lon,zip`).then(response => response.json());

    let embed = new Discord.RichEmbed()
      .setColor("#4343AD")
      .setTitle("IP Lookup")
      .setThumbnail("https://ciph0n.dev/images/Discord-Bots/iplookup.png")
      .addField('**Country:**', "```" + `${country}` + "```", true)
      .addField('**Region:**', "```" + `${regionName}` + "```", true)
      .addField('**City:**', "```" + `${city}` + "```", true)
      .addField('**Proxy:**', "```" + `${proxy}` + "```", true)
      .addField('**Latitude:**', "```" + `${lat}` + "```", true)
      .addField('**Longitude:**', "```" + `${lon}` + "```", true)
      .setTimestamp()
      .setFooter(`${query} | Developed by ciph0n`)

    // Logging Files

    numbCount()
    commandLog.log(message.author.tag + ` <@` + message.author.id + `> used the command ${botconfig["silent-prefix"]}iplookup ` + prefix);
    console.log("\x1b[37m" + new Date().toUTCString() + " \x1b[31m" + message.author.tag + ` \x1b[37m<@\x1b[31m` + message.author.id + `\x1b[37m> used the command \x1b[31m${botconfig["silent-prefix"]}iplookup ` + prefix);

    if (regionName == undefined) {
      return message.channel.send("> *You must send correct information!*")
    } else {
      message.channel.send(embed)
    }
  }

  async function passGen() {
    let length = args[0];
    if (!args[0]) return message.reply("How long of a password we talkin?")

    const {
      output
    } = await fetch(`https://api.c99.nl/passwordgenerator?key=${botconfig["c99-key"]}&length=${length}&include=numbers,letters,chars,symbols,capitals&json`).then(response => response.json());

    if (output == undefined) {
      message.reply("Too big! You gotta lower the numbers a little..")
    }

    if (length > 1015) {
      message.reply("Woah there buddy! Way too big..")
    } else {
      let embed = new Discord.RichEmbed()
        .setColor("#4343AD")
        .setTitle("New Password:")
        .addField('*Here\'s your new password.*', "```" + `${output}` + "```", true)
        .setTimestamp()
        .setFooter("Developed by ciph0n")
      message.channel.send(embed)
    }

    // Logging Files

    numbCount()
    commandLog.log(message.author.tag + ` <@` + message.author.id + `> used the command ${botconfig["silent-prefix"]}pass`);
    console.log("\x1b[37m" + new Date().toUTCString() + " \x1b[31m" + message.author.tag + ` \x1b[37m<@\x1b[31m` + message.author.id + `\x1b[37m> used the command \x1b[31m${botconfig["silent-prefix"]}pass`);
  }

  async function personGen() {
    const {
      results
    } = await fetch(`https://randomuser.me/api/?format=json`).then(response => response.json());

    const [randomUser] = results;

    let embed = new Discord.RichEmbed()
      .setColor("#4343AD")
      .setTitle("Person Generator")
      .setThumbnail(randomUser.picture.large)
      .addField('**Name:**', "```" + `${randomUser.name.first} ${randomUser.name.last}` + "```", true)
      .addField('**Gender:**', "```" + `${randomUser.gender}` + "```", true)
      .addField('**BDay:**', "```" + `${randomUser.dob.date}` + "```", true)

      .addField('**Age:**', "```" + `${randomUser.dob.age}` + "```", true)
      .addField('**Country:**', "```" + `${randomUser.location.country}` + "```", true)
      .addField('**State:**', "```" + `${randomUser.location.state}` + "```", true)

      .addField('**City:**', "```" + `${randomUser.location.city}` + "```", true)
      .addField('**Address:**', "```" + `${randomUser.location.street.number} ${randomUser.location.street.name}` + "```", true)
      .addField('**Zipcode:**', "```" + `${randomUser.location.postcode}` + "```", true)

      .addField('**Home Phone:**', "```" + `${randomUser.phone}` + "```", true)
      .addField('**Cell Phone:**', "```" + `${randomUser.cell}` + "```", true)
      .addField('**Username:**', "```" + `${randomUser.login.username}` + "```", true)
      .setTimestamp()
      .setFooter("Developed by ciph0n")
    message.channel.send(embed)

    // Logging Files

    numbCount()
    commandLog.log(message.author.tag + ` <@` + message.author.id + `> used the command ${botconfig["silent-prefix"]}person`);
    console.log("\x1b[37m" + new Date().toUTCString() + " \x1b[31m" + message.author.tag + ` \x1b[37m<@\x1b[31m` + message.author.id + `\x1b[37m> used the command \x1b[31m${botconfig["silent-prefix"]}person`);
  }

  async function deCode() {
    let type = args[0];
    let word = args[1];
    if (!args[0]) return message.reply("What type of decoding?")
    if (!args[1]) return message.reply("What word is being decoded?")

    if (type == "md5".toString()) {
      const {
        fetchResult
      } = await fetch(`https://md5decrypt.net/en/Api/api.php?hash=${word}&hash_type=md5&email=${botconfig["md5-email"]}&code=${botconfig["md5-secret"]}`)
        .then(fetchResult => fetchResult.text())
        .then(body => message.channel.send("**Decoded:**" + "\n```" + body + "```"))
    }

    if (type == "b64".toString() || type == "base64".toString()) {
      let content = Buffer.from(word, 'base64').toString('binary')
      message.reply("**Decoded:**\n```" + content + "```")
    }

    // Logging Files

    numbCount()
    commandLog.log(message.author.tag + ` <@` + message.author.id + `> used the command ${botconfig["silent-prefix"]}decode ` + type);
    console.log("\x1b[37m" + new Date().toUTCString() + " \x1b[31m" + message.author.tag + ` \x1b[37m<@\x1b[31m` + message.author.id + `\x1b[37m> used the command \x1b[31m${botconfig["silent-prefix"]}decode ` + type);
  }

  async function enCode() {
    let type = args[0];
    let word = args[1];
    if (!args[0]) return message.reply("What type of encoding?")
    if (!args[1]) return message.reply("What word is being encoded?")

    if (type == "md5".toString()) {
      const {
        fetchResult
      } = await fetch(`https://md5decrypt.net/en/Api/api.php?word=${word}&hash_type=md5&email=${botconfig["md5-email"]}&code=${botconfig["md5-secret"]}`)
        .then(fetchResult => fetchResult.text())
        .then(body => message.channel.send("**Encoded:**" + "\n```" + body + "```"));
    }

    if (type == "b64".toString() || type == "base64".toString()) {
      let content = Buffer.from(word, 'binary').toString('base64')
      if (content == "=" < 1) {
        message.reply("**Encoded:**\n```" + content + "=" + "```")
      }
      if (content != "==") {
        message.reply("**Encoded:**\n```" + content + "==" + "```")
      }
      if (content == "==") {
        message.reply("**Encoded:**\n```" + content + "```")
      }
    }

    // Logging Files

    numbCount()
    commandLog.log(message.author.tag + ` <@` + message.author.id + `> used the command ${botconfig["silent-prefix"]}encode ` + type);
    console.log("\x1b[37m" + new Date().toUTCString() + " \x1b[31m" + message.author.tag + ` \x1b[37m<@\x1b[31m` + message.author.id + `\x1b[37m> used the command \x1b[31m${botconfig["silent-prefix"]}encode ` + type);

  }

  async function statsCheck() {
    fs.readFile('./brain/command-usage.txt', (err, data) => {
      fs.readFile('./brain/live.txt', (err, live) => {

        let embed = new Discord.RichEmbed()
          .setColor("#000000")
          .setTitle("Statistics Menu")
          .addField("```Command Usage:```", data, true)
          .addField("```Start Time:```", live, true)
          .setTimestamp()
          .setFooter("Developed by ciph0n")

        return message.channel.send(embed)

      })
    })
  }

  function numbCount() {
    fs.readFile('./brain/command-usage.txt', (err, data) => {
      fs.writeFileSync('./brain/command-usage.txt', parseInt(data) + parseInt(1), {
        flags: 'a'
      });
    })
  }

});


client.login(botconfig.token);
