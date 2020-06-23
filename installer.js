const fs = require('fs');

var fbrain = './brain';
if (!fs.existsSync(fbrain)) {
    fs.mkdirSync(fbrain);
}

var flogs = './logs';
if (!fs.existsSync(flogs)) {
    fs.mkdirSync(flogs);
}

fs.writeFile('./brain/botconfig.json', '{\n   "silent-prefix": "PREFIX_HERE",\n   "OwnerID": "OWNER_ID_HERE",\n   "md5-secret": "SECRET_KEY_HERE",\n   "md5-email": "EMAIL_HERE",\n   "c99-key": "YOUR_PERSONAL_C99_KEY",\n  "nitro-sniper-enabled": "true|false",\n  "token": "DISCORD_CLIENT_TOKEN"\n }', { flag: 'wx' }, function (err) {
    console.log(err);
}); 

fs.writeFile('./brain/whitelist.json', '["", "", ""]', { flag: 'wx' }, function (err) {
    console.log(err);
});

fs.writeFile('./brain/live.txt', '', { flag: 'wx' }, function (err) {
    console.log(err);
});

fs.writeFile('./brain/command-usage.txt', '0', { flag: 'wx' }, function (err) {
    console.log(err);
});

fs.writeFile('./logs/commandLog.log', '', { flag: 'wx' }, function (err) {
    console.log(err);
});

fs.writeFile('readme.txt', '[+] [+] [-] [+] [+] Discord Bot : selfControl by ciph0n [+] [+] [-] [+] [+]\nThank you for downloading my Discord bot! It means a lot to me. So let me\nstart off with the description and how to setup and use.\n\n[+] [+] [-] [+] [+] Inside of the whitelist.json brains [+] [+] [-] [+] [+]\nThe whitelist.json contains the "accepted users" of the bot that will grant\n\nthem permission to use the commands. Without putting them on the whitelist,\nthe user will not be able to use the bot.\n\n[+] [+] [-] [+] [+] Inside of the botconfig.json brains [+] [+] [-] [+] [+]\n"silent-prefix" is what you want to address for the bot commands. The\n"OwnerID" would be your user id for the bot to know you\'re the owner of it.\n"md5-email" would be the account you would create from md5decrypt.net on\nthe api tab. Your "md5-secret" would come from this as well. If you really\nbelieve that purchasing an API key from api.c99.nl/dashboard/shop would be\nworth it, you can go ahead and purchase that and put your key in. Otherwise\ndo not use the command. "nitro-sniper-enabled": "true|false" is the next new\nfeature of the bot. The values can only be \'true\' or \'false\' lowercase. This\nwill be a nitro sniper client. :) The last item on the array would be your\n"token" which would be your client token that you can collect from the local\nstorage tab.\n\nPlease be sure to follow my github + twitter.\nhttps://github.com/ciph0n\nhttps://twitter.com/ciph0n_', { flag: 'wx' }, function (err) {
    console.log(err);
});
