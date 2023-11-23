require("dotenv").config();

const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  PermissionsBitField,
  SlashCommandBuilder,
  Permissions,
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", (bot) => {
  console.log(`${bot.user.tag} is ready!`);
  client.user.setActivity("Test bot v14");

  const ping = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("This is a ping command!");

  const hello = new SlashCommandBuilder()
    .setName("hello")
    .setDescription("This is a hello command!");

  client.application.commands.create(ping, '1177260204929335407');
  client.application.commands.create(hello);
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === "ping") {
    interaction.reply("Pong!");
  }
  if (interaction.commandName === "hello") {
    interaction.reply("Hi, how are you?");
  }
});

client.login(process.env.TOKEN);
