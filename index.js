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

  // =========================
  // 🥤 PEDIDOS RESTAURANTE
  // =========================

  if (message.channel.name === "╰┈➤🥤・pedidos") {
    const texto = message.content;

    if (
      texto.includes("Nome:") &&
      texto.includes("ID:") &&
      texto.includes("Pedido:")
    ) {
      const cargoRestaurante =
        message.guild.roles.cache.find(r => r.name === "🍿 Dono Restaurante") ||
        message.guild.roles.cache.find(r => r.name === "🥤 Gerente Restaurante") ||
        message.guild.roles.cache.find(r => r.name === "🍔 Atendente Restaurante");

      const embed = new EmbedBuilder()
        .setTitle("🥤 NOVO PEDIDO DO RESTAURANTE")
        .setDescription(texto)
        .setColor("#ff9900")
        .setFooter({ text: `Pedido feito por ${message.author.tag}` })
        .setTimestamp();

      await message.reply({
        content: cargoRestaurante
          ? `${cargoRestaurante} 📦 Novo pedido recebido!`
          : "📦 Novo pedido recebido!",
        embeds: [embed]
      });
    }
  }

  // =========================
  // 🎟️ RESERVAS CINEMA
  // =========================

  if (message.channel.name === "╰┈➤🎟️・reservas") {
    const texto = message.content;

    if (
      texto.includes("Nome:") &&
      texto.includes("ID:") &&
      texto.includes("Sessão:") &&
      texto.includes("Quantidade")
    ) {
      const cargoCinema =
        message.guild.roles.cache.find(r => r.name === "🎬 Dono Cinema") ||
        message.guild.roles.cache.find(r => r.name === "🎥 Gerente Cinema") ||
        message.guild.roles.cache.find(r => r.name === "🍿 Equipe Cinema");

      const embed = new EmbedBuilder()
        .setTitle("🎟️ NOVA RESERVA DO CINEMA")
        .setDescription(texto)
        .setColor("#3366ff")
        .setFooter({ text: `Reserva feita por ${message.author.tag}` })
        .setTimestamp();

      await message.reply({
        content: cargoCinema
          ? `${cargoCinema} 🎬 Nova reserva recebida!`
          : "🎬 Nova reserva recebida!",
        embeds: [embed]
      });
    }
  }
});

client.login(process.env.TOKEN);
