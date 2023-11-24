require("dotenv").config();

const {
  Client,
  GatewayIntentBits,
  Events,
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

client.on(Events.ClientReady, (bot) => {
  console.log(`${bot.user.tag} is ready!`);
  client.user.setActivity("Test bot v14");

  const ping = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("This is a ping command!");

  const hello = new SlashCommandBuilder()
    .setName("hello")
    .setDescription("This is a hello command!")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to say hi")
        .setRequired(false)
    );

  const add = new SlashCommandBuilder()
    .setName("add")
    .setDescription("Allow you to add two numbers")
    .addNumberOption((option) =>
      option
        .setName("first_number")
        .setDescription("Enter your first number")
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("second_number")
        .setDescription("Enter your second number")
        .setRequired(true)
    );

  client.application.commands.create(ping, "1177260204929335407");
  client.application.commands.create(hello);
  client.application.commands.create(add);
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    interaction.reply("Pong!");
  }

  if (interaction.commandName === "hello") {
    const userOption = interaction.options.getUser("user");

    if (userOption) {
      interaction.reply(`Hi ${userOption.toString()}, how are you?`);
    } else {
      interaction.reply("Hi, how are you?");
    }
  }

  if (interaction.commandName === "add") {
    const firstNum = interaction.options.getNumber("first_number");
    const secondNum = interaction.options.getNumber("second_number");

    if (isNaN(firstNum) || isNaN(secondNum)) {
      interaction.reply("Please enter a valid number!");
    } else {
      const result = firstNum + secondNum;
      interaction.reply(`${firstNum} + ${secondNum} = ${result}`);
    }
  }
});

client.login(process.env.TOKEN);
