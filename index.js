require("dotenv").config();

const {
  Client,
  GatewayIntentBits,
  EmbedBuilder
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

client.once("ready", () => {
  console.log(`✅ Bot online: ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  // 🥤 RESTAURANTE
  if (message.channel.name === "╰┈➤🥤・pedidos") {
    const texto = message.content;

    if (
      texto.includes("Nome:") &&
      texto.includes("ID:") &&
      texto.includes("Pedido:")
    ) {
      const cargos = [
        "🍿 Dono Restaurante",
        "🥤 Gerente Restaurante",
        "🍔 Atendente Restaurante",
        "🚚 Delivery Restaurante"
      ];

      const mencoes = cargos
        .map(nome => message.guild.roles.cache.find(r => r.name === nome))
        .filter(Boolean)
        .map(role => `${role}`)
        .join(" ");

      const embed = new EmbedBuilder()
        .setTitle("🥤 NOVO PEDIDO DO RESTAURANTE")
        .setDescription(`
👤 **Cliente:** ${message.author}

${texto}
        `)
        .setColor("#ff9900")
        .setTimestamp();

      await message.reply({
        content: `✅ ${message.author}, seu pedido foi enviado para a equipe!\n${mencoes}`,
        embeds: [embed]
      });
    }
  }

  // 🎬 CINEMA
  if (message.channel.name === "╰┈➤🎟️・reservas") {
    const texto = message.content;

    if (
      texto.includes("Nome:") &&
      texto.includes("ID:") &&
      texto.includes("Sessão:")
    ) {
      const cargos = [
        "🎬 Dono Cinema",
        "🎥 Gerente Cinema",
        "🍿 Equipe Cinema"
      ];

      const mencoes = cargos
        .map(nome => message.guild.roles.cache.find(r => r.name === nome))
        .filter(Boolean)
        .map(role => `${role}`)
        .join(" ");

      const embed = new EmbedBuilder()
        .setTitle("🎬 NOVA RESERVA DO CINEMA")
        .setDescription(`
👤 **Cliente:** ${message.author}

${texto}
        `)
        .setColor("#3366ff")
        .setTimestamp();

      await message.reply({
        content: `✅ ${message.author}, sua reserva foi enviada para a equipe!\n${mencoes}`,
        embeds: [embed]
      });
    }
  }
});

client.login(process.env.TOKEN);
