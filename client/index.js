var add = true

let Eris = require('eris')
const pms = require("pretty-ms")
let Discord = require('discord.js')
var users1 = []
let lang_messages = require('../lang.json')

const mongoose = require("mongoose")
const fs = require('fs')
let client = Eris('MTAyNDY3NDMxMzEwNzk0NzUzMA.GJ-Gii.j8Grw6qj1myonMVL7CAObuxhjnCqjhcxX2VAhw', {restMode: true, defaultImageSize: 2048})
let db = require('../db');
let database = db.init();

/*
mongoose.connect("mongodb+srv://yousuf:41371755aa@cluster0.gu4me.mongodb.net/rhyno" , {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 500,
      poolSize: 5,
      connectTimeoutMS: 10000,
      family: 4
    });


const collection = mongoose.model("guildSetting", new mongoose.Schema({
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
            "id": { type: String } ,
            "messages": { type: Array, default: []  } ,
            "autorole": { type: String, default: "[none]"  } ,
            "prefix": { type: String, default: "$" },
            "lang": { type: String, default: "en" },

}));

const db = mongoose.model("daily", new mongoose.Schema({
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
            "id": { type: String } ,
            "time": { type: Number },
            "claim": { type: Number },

}));
const db1 = mongoose.model("ban", new mongoose.Schema({
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
            "id": { type: String } ,
            "time": { type: Number },
            "guild": { type: String },

}));

const db2 = mongoose.model("mute", new mongoose.Schema({
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
            "id": { type: String } ,
            "time": { type: Number },
            "guild": { type: String } ,
            "roleID": { type: String } ,

}));
const db3 = mongoose.model("rep", new mongoose.Schema({
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
            "id": { type: String } ,
            "time": { type: Number },
            "user": { type: String } ,

}));
const giveaway = mongoose.model("giveaways", new mongoose.Schema({
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
            "messageid": { type: String } ,
            "guild": { type: String } ,
            "time": { type: Number } ,
            "reason": { type: String } ,
            "winer": { type: Number } ,
            "channel": { type: String } ,
            "emoji": { type: String } , 
            "author": { type: String } ,
            "end": { type: Boolean } ,

}));
const xp_voice = mongoose.model("xps", new mongoose.Schema({
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
            "id": { type: String } ,
            "guild": { type: String } ,
            "xp": { type: Number } ,
            "totlxp": { type: Number, default: 0 } ,

}));
const note = mongoose.model("note", new mongoose.Schema({
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
            "id": { type: String } ,
            "note": { type: String } ,

}));
const captcha = mongoose.model("captcha", new mongoose.Schema({
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
            "id": { type: String } ,
            "captcha": { type: String } ,

}));
const warns = mongoose.model("warns", new mongoose.Schema({
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
            "guild": { type: String } ,
            "warns": { type: Array } ,

}));
const temprooms = mongoose.model("temprooms", new mongoose.Schema({
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
            "guild": { type: String } ,
            "rooms": { type: Array } ,
            "data": { type: Object } ,
      

}));
const userData = mongoose.model("userSetting", new mongoose.Schema({
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
            "id": { type: String } ,
            "coins": { type: Number } , 
            "daily": { type: Object } , // {time: 0, lastdaily: 0}
            "like": { type: Object } , // {time: 0, likes: 0}
            "xps": { type: Object } ,// { data_guild: [{guildID: "123", xp: 0}], allxp: 0 }
            "note": { type: String } , // "I Hate You"
}));*/
/*client.on('voiceChannelJoin', async (member, channel) =>{

if(member.bot) return;
console.log("go")
let data = await temprooms.find({guild: channel.guild.id})
if(data.length < 1) return;
console.log(data)
if(data[0].data.status === false || data[0].data.id !== channel.id) return;

let room = channel.guild.channels.get(data[0].data.id)
if(!room) return;

 let find = data[0].rooms.find(d => d.by === member.id && channel.guild.channels.get(d.id))
 if(find) return member.edit({channelID: find.id})
 
  
let new_channel = await client.createChannel(channel.guild.id, member.username, 2, {parentID: room.parentID}).catch(err =>{})
if(!new_channel) return;
  client.editChannelPermission(new_channel.id, member.id, 16, 0, "member").catch(err =>{})


  
  
await temprooms.updateOne({guild: channel.guild.id}, {$push: {rooms: {id: new_channel.id, lastjoin: Date.now() + 10000, by: member.id}}})
member.edit({channelID: new_channel.id})
})*/

/*
setInterval(async () => {
let all_data = await temprooms.find({"data.status": true})
all_data.forEach(async data =>{
let guild = client.guilds.get(data.guild)
if(!guild) return;

data.rooms.forEach(async data_room =>{
let channel = guild.channels.get(data_room.id)
if(!channel) return;
let voiceMembers = channel.voiceMembers
let users = []
voiceMembers.forEach(user =>{
if(!user.bot) users.unshift(user.id)
})
console.log(data_room.lastjoin - Date.now())
if(users.length < 1 && data_room.lastjoin - Date.now() < 1){
client.deleteChannel(data_room.id).catch(err =>{})
await temprooms.updateOne({guild: guild.id}, {$pull: {rooms: data_room}})

}
if(users.length > 0){
console.log('hgi')
await temprooms.updateOne({guild: guild.id}, {$pull: {rooms: data_room}})
await temprooms.updateOne({guild: guild.id}, {$push: {rooms: {id: data_room.id, lastjoin: Date.now() + 10000, by: data_room.by}}})
}


})

})

}, 6000)*/
var users = []
let express = require('express')
let app = express()
        const requests = fs.readdirSync(`./api_requests/`).filter(file => file.endsWith(".js"));


    fs.readdirSync("./api_requests/").forEach(dir => {
        const requests = fs.readdirSync(`./api_requests/${dir}/`).filter(file => file.endsWith(".js"));

        for (let file of requests) {
            let request = require(`../api_requests/${dir}/${file}`);
if(request.method && request.path){
app[request.method](request.path , (req , res) =>{

return request.run(req , res, client)
})
}} 

})
app.listen(3000)

client.commands = new Eris.Collection()
let cooldowns = new Eris.Collection()

    fs.readdirSync(__dirname + "/commands/").forEach(dir => {
        const commands = fs.readdirSync(__dirname + `/commands/${dir}/`).filter(file => file.endsWith(".js"));
        for (let file of commands) {
            let command = require(`./commands/${dir}/${file}`);
            if (command.name) {
                client.commands.set(command.name, command);
            }
        }
    })


client.util = require("./utils")

let users_guild = require('../db/guild_user')


client.on('messageCreate', async (message) => {//con["blacklist"].includes(message.author.id)

if(message.content.length < 3) return;
const commanddata = client.commands.find(d => `${message.content}`.includes(d.name))
	if (!commanddata) return;
	if (message.author.bot || !message.channel.guild) return;
let row = await guilds.find({id: message.channel.guild.id})
if(row.length < 1){
row = [await new guilds({id: message.channel.guild.id}).save()];
}
let prefix = row[0] ? row[0].prefix : "$"
let lang = row[0] ? row[0].lang : "en"




let commandNames = message.content.split(" ")[0].toLowerCase()


	let args = message.content.slice(prefix.length).trim().split(/ +/);

	let commandName = args.shift().toLowerCase();








if(!message.content.startsWith(prefix)) return;

const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName)) || client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;




   var three = Math.floor(Math.random() * 30) + 1;
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Eris.Collection());
	}
	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		let expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
	//timestamps.set(message.author.id, now + 6000);
		return client.createMessage(message.channel.id, {
  "embed":     {
      "description": lang_messages[0].cool_down_message[lang].replace('[timeleft]', timeLeft.toFixed(1)).replace('[commandname]', command.name),
      "color": 14226597
    }
  
}).then(m =>{setTimeout((c)=>{

m.delete()

      }, 3 * 1000)
}, 3 * 1000)
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(client , message, args, row);
	} catch (error) {
 		console.error(error);
		client.createMessage(message.channel.id, 'there was an error trying to execute this command!');
	}

});
client.connect();
