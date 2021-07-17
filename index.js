const { Client, Intents, MessageAttachment } = require("discord.js");
const client = new Client({
	ws: { intents: Intents.ALL },
});
const { CanvasSenpai } = require("canvas-senpai");
const canva = new CanvasSenpai();
const config = require("./config.json");
client.once("ready", () => {
	console.log("Ready!");
});
client.login(process.env.TOKEN);
client.on("guildMemberAdd", async (member) => {
	const channel = member.guild.channels.cache.find(
		(ch) => ch.id === config.welcome
	);
	if (!channel) return;
	let data = await canva.welcome(member, { gradiant: "aqua" });
	const attachment = new MessageAttachment(data, "welcome-image.png");
	channel.send(
		`Welcome to the server, <@${member.user.id}>! We have ${member.guild.memberCount} members now! 🥳 Please read <#835574679787929631> and get some <#864149447935918141>`,
		attachment
	);
	const roles = await member.guild.members.cache.get(member.user.id).roles;
	await roles.add("864536033034764298");
	await roles.add("864535733637087252");
	await roles.add("864518581240594432");
	await roles.add("864534593108181123");
	roles.add("864587356534734878");
});

client.on("guildMemberRemove", async (member) => {
	const channel = member.guild.channels.cache.find(
		(ch) => ch.id === config.bye
	);
	if (!channel) return;
	let data = await canva.welcome(member, { gradiant: "aqua" });
	const attachment = new MessageAttachment(data, "welcome-image.png");
	channel.send(
		`We're sad to see ${member.user.tag} go.. Down to ${member.guild.memberCount}`,
		attachment
	);
});
