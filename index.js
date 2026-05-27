const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  ChannelType,
  PermissionsBitField
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
  if (message.author.bot || !message.guild) return;

  if (message.content === "!menu-restaurante") {
    if (!temCargo(message.member, ["🍿 Dono Restaurante", "🥤 Gerente Restaurante"])) {
      return message.reply("❌ Só gerente ou dono do restaurante pode usar.");
    }

    return message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setTitle("🍿 MENU DO RESTAURANTE ASTRAL")
          .setColor("#ff9900")
          .setDescription(`
🍔 **COMIDAS**
• Hambúrguer Astral — R$ 500
• Batata Sombria — R$ 300
• Pizza da Noite — R$ 700
• Combo Vampiro — R$ 1.000

🥤 **BEBIDAS**
• Refrigerante — R$ 200
• Suco Natural — R$ 250
• Energético Astral — R$ 400

📦 **Para pedir, envie no canal de pedidos:**
Nome:
ID:
Pedido:
          `)
      ]
    });
  }

  if (message.content === "!menu-cinema") {
    if (!temCargo(message.member, ["🎬 Dono Cinema", "🎥 Gerente Cinema", "🍿 Equipe Cinema"])) {
      return message.reply("❌ Só equipe do cinema pode usar.");
    }

    return message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setTitle("🎬 PROGRAMAÇÃO DO CINEMA ASTRAL")
          .setColor("#3366ff")
          .setDescription(`
🎞️ **FILMES**
• Noite dos Vampiros — 20:00
• Ritual da Meia-Noite — 21:00
• Lua Sangrenta — 22:00
• Apocalipse Astral — 23:00

🎟️ **Para reservar, envie no canal de reservas:**
Nome:
ID:
Sessão:
Quantidade:
          `)
      ]
    });
  }

  if (message.channel.name === "╰┈➤🥤・pedidos") {
    const texto = message.content;

    if (texto.includes("Nome:") && texto.includes("ID:") && texto.includes("Pedido:")) {
      return criarCanalPrivado({
        message,
        nomeCanal: `pedido-${message.author.username}`,
        titulo: "🥤 NOVO PEDIDO DO RESTAURANTE",
        cor: "#ff9900",
        texto,
        cargosPermitidos: [
          "🍿 Dono Restaurante",
          "🥤 Gerente Restaurante",
          "🍔 Atendente Restaurante",
          "🚚 Delivery Restaurante",
          "👑 Dono Astral",
          "⚜️ Administração",
          "🛡️ Staff"
        ]
      });
    }
  }

  if (message.channel.name === "╰┈➤🎟️・reservas") {
    const texto = message.content;

    if (texto.includes("Nome:") && texto.includes("ID:") && texto.includes("Sessão:")) {
      return criarCanalPrivado({
        message,
        nomeCanal: `reserva-${message.author.username}`,
        titulo: "🎬 NOVA RESERVA DO CINEMA",
        cor: "#3366ff",
        texto,
        cargosPermitidos: [
          "🎬 Dono Cinema",
          "🎥 Gerente Cinema",
          "🍿 Equipe Cinema",
          "👑 Dono Astral",
          "⚜️ Administração",
          "🛡️ Staff"
        ]
      });
    }
  }
});

async function criarCanalPrivado({
  message,
  nomeCanal,
  titulo,
  cor,
  texto,
  cargosPermitidos
}) {
  try {
    const guild = message.guild;
    const categoria = message.channel.parent;

    const roles = cargosPermitidos
      .map(nome => guild.roles.cache.find(role => role.name === nome))
      .filter(Boolean);

    const canal = await guild.channels.create({
      name: limparNomeCanal(nomeCanal),
      type: ChannelType.GuildText,
      parent: categoria ? categoria.id : null,
      permissionOverwrites: [
        {
          id: guild.roles.everyone.id,
          deny: [PermissionsBitField.Flags.ViewChannel]
        },
        {
          id: message.author.id,
          allow: [
            PermissionsBitField.Flags.ViewChannel,
            PermissionsBitField.Flags.SendMessages,
            PermissionsBitField.Flags.ReadMessageHistory
          ]
        },
        {
          id: client.user.id,
          allow: [
            PermissionsBitField.Flags.ViewChannel,
            PermissionsBitField.Flags.SendMessages,
            PermissionsBitField.Flags.ManageChannels,
            PermissionsBitField.Flags.ManageMessages,
            PermissionsBitField.Flags.ReadMessageHistory
          ]
        },
        ...roles.map(role => ({
          id: role.id,
          allow: [
            PermissionsBitField.Flags.ViewChannel,
            PermissionsBitField.Flags.SendMessages,
            PermissionsBitField.Flags.ReadMessageHistory,
            PermissionsBitField.Flags.ManageMessages
          ]
        }))
      ]
    });

    const embed = new EmbedBuilder()
      .setTitle(titulo)
      .setColor(cor)
      .setDescription(`
👤 **Cliente:** ${message.author}

${texto}
      `)
      .setTimestamp();

    const mencoes = roles.map(role => `${role}`).join(" ");

    await canal.send({
      content: `${message.author} ${mencoes}`,
      embeds: [embed]
    });

    await message.reply(`✅ ${message.author}, seu atendimento foi criado em ${canal}.`);
    await message.delete().catch(() => {});

  } catch (erro) {
    console.log("Erro ao criar canal:", erro);
    return message.reply("❌ Erro ao criar o canal privado. Veja se o bot tem permissão de **Gerenciar Canais**.");
  }
}

function temCargo(member, cargosPermitidos) {
  return cargosPermitidos.some(nome =>
    member.roles.cache.some(role => role.name === nome)
  );
}

function limparNomeCanal(nome) {
  return nome
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 90);
}

client.login(process.env.TOKEN);
