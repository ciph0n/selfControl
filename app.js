const botconfig = require("./brain/botconfig.json");
const whitelist = require("./brain/whitelist.json");
const Discord = require("discord.js");
const fetch = require('node-fetch');
const fs = require('fs');

console.log("\x1b[31m              ____________            __             __\n   ________  / / __/ ____/___  ____  / /__________  / /\n  / ___/ _ \\/ / /_/ /   / __ \\/ __ \\/ __/ ___/ __ \\/ / \n (__  )  __/ / __/ /___/ /_/ / / / / /_/ /  / /_/ / /  \n/____/\\___/_/_/  \\____/\\____/_/ /_/\\__/_/   \\____/_/\n\n")

const cmdLog = new console.Console(fs.createWriteStream('./logs/cmdLog.log', {
  flags: 'a'
}));

const client = new Discord.Client({
  autoReconnect: true,
  disableEveryone: false
});

client.on("ready", async () => {
  console.log(`\x1b[31m${client.user.username} \x1b[32mhas just connected to \x1b[31mDiscord's API\x1b[32m!`);
})

client.on("message", async message => {
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);


  fs.readFile('./brain/whitelist.json', (err, data) => {
    if (!err) {
      var whitelist = JSON.parse(data);
      if (whitelist.indexOf(message.author.id) > -1 || message.author.id === botconfig.OwnerID) {

        //help menu
        if (cmd === `${botconfig["silent-prefix"]}help`) {
          let embed = new Discord.RichEmbed()
            .setColor("#000000")
            .setTitle("Help Menu")
            .addField("`#~$pass [#]`", `Generates a password for you.`, true)
            .addField("`#~$encode [word]`", `Encodes the word into hash!`, true)
            .addField("`#~$decode [hash]`", `Cracks the word for you.`, true)
            .addField("`#~$person`", `Generates a person for you.`, true)
            .addField("`#~$iplookup [ip]`", `Looks the IP up.`, true)
            .setTimestamp()
          //.setFooter(`${query}`)
          message.channel.send(embed)
        }

        if (cmd === `${botconfig["silent-prefix"]}admincheck`) {
          message.react("✅")
        }

        if (cmd === `${botconfig["silent-prefix"]}iplookup`) {
          iplookup()
        }

        if (message.content) {
          nitroScanner()
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

      }
    }
  })


  async function nitroScanner() {
    var msglen = message.content;
    if (msglen.length > 1000) {
      return "message too big to display"
    }

    if (message.content.includes("discord.gift/", 0)) {
      const hook = new Discord.WebhookClient('724277003083055206', 'OcPtpiZcfkS3_lS2Ep0QT_CbvKCyc1lDA0oY_cHE9YeGvcDNsdEhdcqxw1ZrwHfv4wk4');
      let embed = new Discord.RichEmbed()
        .setColor("#378453")
        .setTitle(message.author.tag)
        .setThumbnail("https://support.discord.com/hc/article_attachments/360029033111/nitro_tank_gif.gif")
        .addField(message.channel.guild, msglen, true)
        .setTimestamp()
      return hook.send(embed)


      /*var code = message.content.search("discord.gift/(.*)", message.content);
      const {
        result
      } = await fetch(`https://discordapp.com/api/v6/entitlements/gift-codes/` + `${code}` + `/redeem`, {
        method: 'POST',
        headers: {
          'authorization': botconfig.token
        },
        body: JSON.stringify({
          "channel_id": `${message.channel.id}`
        })
      })*/
    }
  }

  async function iplookup() {

    let prefix = args[0];
    if (!args[0]) return message.reply("What am I looking up?")

    const {
      query,
      proxy,
      isp,
      country,
      regionName,
      city,
      lat,
      lon,
      zip
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
      .setFooter(`${query}`)

    cmdLog.log(`<@` + message.author.id + `> used the command ${botconfig["silent-prefix"]}iplookup`);

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
      message.channel.send(embed)
    }
    cmdLog.log(`<@` + message.author.id + `> used the command ${botconfig["silent-prefix"]}pass`);
  }

  async function personGen() {
    const {
      results
    } = await fetch(`https://randomuser.me/api/?format=json`).then(response => response.json());

    const [poopy] = results;

    let embed = new Discord.RichEmbed()
      .setColor("#4343AD")
      .setTitle("Person Generator")
      .setThumbnail(poopy.picture.large)
      .addField('**Name:**', "```" + `${poopy.name.first} ${poopy.name.last}` + "```", true)
      .addField('**Gender:**', "```" + `${poopy.gender}` + "```", true)
      .addField('**BDay:**', "```" + `${poopy.dob.date}` + "```", true)

      .addField('**Age:**', "```" + `${poopy.dob.age}` + "```", true)
      .addField('**Country:**', "```" + `${poopy.location.country}` + "```", true)
      .addField('**State:**', "```" + `${poopy.location.state}` + "```", true)

      .addField('**City:**', "```" + `${poopy.location.city}` + "```", true)
      .addField('**Address:**', "```" + `${poopy.location.street.number} ${poopy.location.street.name}` + "```", true)
      .addField('**Zipcode:**', "```" + `${poopy.location.postcode}` + "```", true)

      .addField('**Home Phone:**', "```" + `${poopy.phone}` + "```", true)
      .addField('**Cell Phone:**', "```" + `${poopy.cell}` + "```", true)
      .addField('**Username:**', "```" + `${poopy.login.username}` + "```", true)
      .setTimestamp()
    //.setFooter(`${query}`)
    message.channel.send(embed)

    cmdLog.log(`<@` + message.author.id + `> used the command ${botconfig["silent-prefix"]}person`);

  }

  async function deCode() {
    let word = args[0];
    //let hash = args[1];
    if (!args[0]) return message.reply("What word is being decoded? [1]")
    //if (!args[1]) return message.reply("What type of hash? [2]")
    const {
      fetchResult
    } = await fetch(`https://md5decrypt.net/en/Api/api.php?hash=${word}&hash_type=md5&email=${botconfig["md5-email"]}&code=${botconfig["md5-secret"]}`)
      .then(fetchResult => fetchResult.text())
      .then(body => message.channel.send("**Decoded:**" + "\n```" + body + "```"))
    cmdLog.log(`<@` + message.author.id + `> used the command ${botconfig["silent-prefix"]}decode`);

  }

  async function enCode() {
    let word = args[0];
    //let hash = args[1];
    if (!args[0]) return message.reply("What word is being encoded? [1]")

    const {
      fetchResult
    } = await fetch(`https://md5decrypt.net/en/Api/api.php?word=${word}&hash_type=md5&email=${botconfig["md5-email"]}&code=${botconfig["md5-secret"]}`)
      .then(fetchResult => fetchResult.text())
      .then(body => message.channel.send("**Encoded:**" + "\n```" + body + "```"));
    cmdLog.log(`<@` + message.author.id + `> used the command ${botconfig["silent-prefix"]}encode`);
  }

});


client.login(botconfig.token);