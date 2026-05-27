require("dotenv").config();

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
  if (message.author.bot) return;

  // MENU RESTAURANTE
  if (message.content === "!menu-restaurante") {
    if (!temCargo(message.member, ["🍿 Dono Restaurante", "🥤 Gerente Restaurante"])) {
      return message.reply("❌ Só gerente ou dono do restaurante pode usar.");
    }

    return message.channel.send(`
🍿 **MENU DO RESTAURANTE ASTRAL**

🍔 **COMIDAS**
• Hambúrguer Astral — R$ 500
• Batata Sombria — R$ 300
• Pizza da Noite — R$ 700
• Combo Vampiro — R$ 1.000

🥤 **BEBIDAS**
• Refrigerante — R$ 200
• Suco Natural — R$ 250
• Energético Astral — R$ 400

📦 **Para pedir, use:**
• Nome:
• ID:
• Pedido:
`);
  }

  // MENU CINEMA
  if (message.content === "!menu-cinema") {
    if (!temCargo(message.member, ["🎬 Dono Cinema", "🎥 Gerente Cinema", "🍿 Equipe Cinema"])) {
      return message.reply("❌ Só equipe do cinema pode usar.");
    }

    return message.channel.send(`
🎬 **PROGRAMAÇÃO DO CINEMA ASTRAL**

🎞️ **FILMES**
• Noite dos Vampiros — 20:00
• Ritual da Meia-Noite — 21:00
• Lua Sangrenta — 22:00
• Apocalipse Astral — 23:00

🎟️ **Para reservar, use:**
• Nome:
• ID:
• Sessão:
• Quantidade de pessoas:
`);
  }

  // PEDIDO RESTAURANTE
  if (message.channel.name === "╰┈➤🥤・pedidos") {
    const texto = message.content;

    if (texto.includes("Nome:") && texto.includes("ID:") && texto.includes("Pedido:")) {
      return criarPedidoPrivado({
        message,
        tipo: "restaurante",
        nomeCanal: `pedido-${message.author.username}`,
        titulo: "🥤 NOVO PEDIDO DO RESTAURANTE",
        cor: "#ff9900",
        cargosPermitidos: [
          "🍿 Dono Restaurante",
          "🥤 Gerente Restaurante",
          "🍔 Atendente Restaurante",
          "🚚 Delivery Restaurante",
          "👑 Dono Astral",
          "⚜️ Administração",
          "🛡️ Staff"
        ],
        texto
      });
    }
  }

  // RESERVA CINEMA
  if (message.channel.name === "╰┈➤🎟️・reservas") {
    const texto = message.content;

    if (texto.includes("Nome:") && texto.includes("ID:") && texto.includes("Sessão:")) {
      return criarPedidoPrivado({
        message,
        tipo: "cinema",
        nomeCanal: `reserva-${message.author.username}`,
        titulo: "🎬 NOVA RESERVA DO CINEMA",
        cor: "#3366ff",
        cargosPermitidos: [
          "🎬 Dono Cinema",
          "🎥 Gerente Cinema",
          "🍿 Equipe Cinema",
          "👑 Dono Astral",
          "⚜️ Administração",
          "🛡️ Staff"
        ],
        texto
      });
    }
  }
});

async function criarPedidoPrivado({
  message,
  tipo,
  nomeCanal,
  titulo,
  cor,
  cargosPermitidos,
  texto
}) {
  const guild = message.guild;
  const categoria = message.channel.parent;

  const roles = cargosPermitidos
    .map(nome => guild.roles.cache.find(r => r.name === nome))
    .filter(Boolean);

  const canalPrivado = await guild.channels.create({
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

  const mencoes = roles.map(role => `${role}`).join(" ");

  const embed = new EmbedBuilder()
    .setTitle(titulo)
    .setDescription(`
👤 **Cliente:** ${message.author}

${texto}
`)
    .setColor(cor)
    .setTimestamp();

  await canalPrivado.send({
    content: `${message.author} ${mencoes}`,
    embeds: [embed]
  });

  await message.reply(`✅ ${message.author}, seu pedido foi criado em ${canalPrivado}.`);
  await message.delete().catch(() => {});
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
