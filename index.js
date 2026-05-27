require("dotenv").config();

const {
  Client,
  GatewayIntentBits,
  EmbedBuilder
} = require("discord.js");

// CRIA O BOT
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

// BOT ONLINE
client.once("ready", () => {
  console.log(`✅ Bot online: ${client.user.tag}`);
});

// MENSAGENS
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  // =========================
  // 🥤 RESTAURANTE
  // =========================

  if (message.channel.name === "╰┈➤🥤・pedidos") {
    const texto = message.content;

    if (
      texto.includes("Nome:") &&
      texto.includes("ID:") &&
      texto.includes("Pedido:")
    ) {

      const cargo =
        message.guild.roles.cache.find(r => r.name === "🍿 Dono Restaurante") ||
        message.guild.roles.cache.find(r => r.name === "🥤 Gerente Restaurante") ||
        message.guild.roles.cache.find(r => r.name === "🍔 Atendente Restaurante");

      await message.delete().catch(() => {});

      const embed = new EmbedBuilder()
        .setTitle("🥤 NOVO PEDIDO")
        .setDescription(`
👤 Cliente: ${message.author}

${texto}
        `)
        .setColor("#ff9900")
        .setTimestamp();

      await message.channel.send({
        content: `${cargo ? cargo : ""} 📦 Novo pedido recebido!`,
        embeds: [embed]
      });
    }
  }

  // =========================
  // 🎬 CINEMA
  // =========================

  if (message.channel.name === "╰┈➤🎟️・reservas") {
    const texto = message.content;

    if (
      texto.includes("Nome:") &&
      texto.includes("ID:") &&
      texto.includes("Sessão:")
    ) {

      const cargo =
        message.guild.roles.cache.find(r => r.name === "🎬 Dono Cinema") ||
        message.guild.roles.cache.find(r => r.name === "🎥 Gerente Cinema") ||
        message.guild.roles.cache.find(r => r.name === "🍿 Equipe Cinema");

      await message.delete().catch(() => {});

      const embed = new EmbedBuilder()
        .setTitle("🎬 NOVA RESERVA")
        .setDescription(`
👤 Cliente: ${message.author}

${texto}
        `)
        .setColor("#3366ff")
        .setTimestamp();

      await message.channel.send({
        content: `${cargo ? cargo : ""} 🎟️ Nova reserva recebida!`,
        embeds: [embed]
      });
    }
  }
});

// LOGIN
client.login(process.env.TOKEN);
