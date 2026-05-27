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
      const cargo =
        message.guild.roles.cache.find(r => r.name === "🍿 Dono Restaurante") ||
        message.guild.roles.cache.find(r => r.name === "🥤 Gerente Restaurante") ||
        message.guild.roles.cache.find(r => r.name === "🍔 Atendente Restaurante");

      await message.delete().catch(() => {});

      await message.channel.send({
        content: `${cargo ? cargo : ""} 📦 **NOVO PEDIDO RECEBIDO!**`,
        embeds: [{
          title: "🥤 Pedido do Restaurante",
          description: `
👤 **Cliente:** ${message.author}

${texto}
          `,
          color: 0xff9900,
          footer: {
            text: `Sistema Astral Restaurante`
          },
          timestamp: new Date()
        }]
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
      texto.includes("Sessão:")
    ) {
      const cargo =
        message.guild.roles.cache.find(r => r.name === "🎬 Dono Cinema") ||
        message.guild.roles.cache.find(r => r.name === "🎥 Gerente Cinema") ||
        message.guild.roles.cache.find(r => r.name === "🍿 Equipe Cinema");

      await message.delete().catch(() => {});

      await message.channel.send({
        content: `${cargo ? cargo : ""} 🎬 **NOVA RESERVA RECEBIDA!**`,
        embeds: [{
          title: "🎟️ Reserva do Cinema",
          description: `
👤 **Cliente:** ${message.author}

${texto}
          `,
          color: 0x3366ff,
          footer: {
            text: `Sistema Astral Cinema`
          },
          timestamp: new Date()
        }]
      });
    }
  }
});
