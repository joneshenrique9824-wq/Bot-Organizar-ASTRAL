const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
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

const canais = {
  cardapio: "1509165293245562971",
  combos: "1509873045504921651",
  filmes: "1509165277286502521",
  divulgarCombos: "1509165292293455965",
  divulgarFilmes: "1509165277286502521"
};

const cargoEntrada = "1509165244339978390";
const cargoRestrito = "1509165252376531104";

const canaisPermitidosRestrito = [
  "1509699102114320586",
  "1509165261729828895"
];

const cargosPermitidos = [
  "👑 Dono Astral",
  "🍿 Dono Restaurante",
  "🥤 Gerente Restaurante",
  "🎬 Dono Cinema",
  "🎥 Gerente Cinema",
  "🍿 Dono Snacks",
  "🥤 Gerente Snacks"
];

let comidas = [
  "🍔 Hambúrguer Astral — R$ 134",
  "🍟 Batata Sombria — R$ 134",
  "🍕 Pizza da Noite — R$ 134"
];

let bebidas = [
  "🥤 Refrigerante — R$ 133",
  "🧃 Suco Natural — R$ 133",
  "⚡ Energético Astral — R$ 132"
];

let combos = [
`🌑 COMBO SOMBRIO — R$ 800
• 3x Hambúrguer Astral
• 3x Refrigerante`,

`🩸 COMBO VAMPIRO — R$ 800
• 3x Batata Sombria
• 3x Suco Natural`,

`⚡ COMBO NOTURNO — R$ 800
• 3x Pizza da Noite
• 3x Energético Astral`,

`🌕 COMBO LUA CHEIA — R$ 800
• 3x Hambúrguer Astral
• 3x Suco Natural`,

`☠️ COMBO APOCALIPSE — R$ 800
• 3x Pizza da Noite
• 3x Refrigerante`,

`🔥 COMBO ASTRAL SUPREMO — R$ 800
• 3x Combo Vampiro
• 3x Energético Astral`
];

let filmes = [
  "🎞️ Noite dos Vampiros — 20:00",
  "🌑 Ritual da Meia-Noite — 21:00",
  "🩸 Lua Sangrenta — 22:00",
  "☠️ Apocalipse Astral — 23:00"
];

const efeitos = [
  {
    nome: "🌕 LUA SANGRENTA",
    etapas: [
      "🌕 A lua começou a ficar vermelha...",
      "🩸 A Lua Sangrenta surgiu sobre a Astral...",
      "🧛 Criaturas da noite estão despertando...",
      "☠️ A cidade sente uma energia sombria no ar..."
    ]
  },
  {
    nome: "🧛 APARIÇÃO DE VAMPIRO",
    etapas: [
      "🩸 Um cheiro de sangue tomou conta do ambiente...",
      "🧛 Uma sombra apareceu entre as cadeiras...",
      "👁️ Olhos vermelhos observam todos em silêncio...",
      "🌑 O vampiro desapareceu na escuridão..."
    ]
  },
  {
    nome: "👻 ESPÍRITO PERDIDO",
    etapas: [
      "👻 Um sussurro estranho ecoou pelo corredor...",
      "🕯️ As luzes começaram a piscar...",
      "💀 Uma presença fria passou pelo ambiente...",
      "🌫️ O espírito desapareceu lentamente..."
    ]
  }
];

const invocacoes = [
  {
    nome: "🔮 INVOCAÇÃO ARCANA",
    etapas: [
      "🔮 O círculo arcano começou a brilhar...",
      "🕯️ As velas acenderam sozinhas...",
      "📜 Palavras antigas ecoaram pelo local...",
      "⚡ Uma entidade respondeu ao chamado..."
    ]
  },
  {
    nome: "☠️ INVOCAÇÃO SOMBRIA",
    etapas: [
      "☠️ O ar ficou pesado...",
      "🌑 As sombras começaram a se mover...",
      "👁️ Algo observou do outro lado do véu...",
      "🩸 A invocação foi concluída..."
    ]
  },
  {
    nome: "👻 CHAMADO DOS ESPÍRITOS",
    etapas: [
      "👻 Vozes surgiram no silêncio...",
      "🌫️ Uma névoa tomou conta do ambiente...",
      "🕯️ Os espíritos se aproximaram...",
      "🔮 O portal espiritual foi aberto..."
    ]
  }
];

client.once("clientReady", () => {
  console.log(`✅ Bot online: ${client.user.tag}`);
});

client.on("guildMemberAdd", async (member) => {
  try {
    const cargo = await member.guild.roles.fetch(cargoEntrada);
    if (!cargo) return console.log("❌ Cargo de entrada não encontrado.");

    await member.roles.add(cargo);
    console.log(`✅ Cargo dado para ${member.user.tag}`);
  } catch (err) {
    console.log("❌ Erro ao dar cargo:", err.message);
  }
});

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.guild) return;

  const msg = message.content.trim();

  if (msg === "!cardapio") {
    await enviarCanal(message, canais.cardapio, embedCardapio());
    return message.reply("✅ Cardápio enviado.");
  }

  if (msg === "!combos") {
    await enviarCanal(message, canais.combos, embedCombos());
    return message.reply("✅ Combos enviados.");
  }

  if (msg === "!filmes") {
    await enviarCanal(message, canais.filmes, embedFilmes());
    return message.reply("✅ Filmes enviados.");
  }

  if (msg === "!divulgarcombos") {
    await enviarCanal(message, canais.divulgarCombos, embedDivulgarCombos());
    return message.reply("✅ Divulgação de combos enviada.");
  }

  if (msg === "!divulgarfilmes") {
    await enviarCanal(message, canais.divulgarFilmes, embedDivulgarFilmes());
    return message.reply("✅ Divulgação de filmes enviada.");
  }

  if (msg === "!efeito") {
    return iniciarAnimacao(message, efeitos, "🌑");
  }

  if (msg === "!invocar") {
    return iniciarAnimacao(message, invocacoes, "🔮");
  }

  if (msg === "!configurarrestrito") {
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return message.reply("❌ Apenas administrador pode usar.");
    }

    const cargo = await message.guild.roles.fetch(cargoRestrito);
    if (!cargo) return message.reply("❌ Cargo restrito não encontrado.");

    await message.reply("⏳ Trancando salas para o cargo restrito...");

    let ok = 0;
    let erro = 0;

    for (const canal of message.guild.channels.cache.values()) {
      try {
        const liberar = canaisPermitidosRestrito.includes(canal.id);

        await canal.permissionOverwrites.edit(cargo, {
          ViewChannel: liberar,
          SendMessages: liberar
        });

        ok++;
      } catch (e) {
        erro++;
        console.log(`❌ Erro no canal ${canal.name}:`, e.message);
      }
    }

    return message.channel.send(`✅ Finalizado.\nCanais alterados: ${ok}\nErros: ${erro}`);
  }

  if (msg === "!painel") {
    return message.channel.send(`
📌 **PAINEL ASTRAL**

!cardapio
!combos
!filmes
!divulgarcombos
!divulgarfilmes
!efeito
!invocar
!configurarrestrito
`);
  }
});

function embedCardapio() {
  return new EmbedBuilder()
    .setTitle("🍔 ASTRAL CINEMA & SNACKS 🍿")
    .setColor("#ff9900")
    .setDescription(`
🍔 **COMIDAS**
${comidas.join("\n")}

🥤 **BEBIDAS**
${bebidas.join("\n")}

🍿 **COMBOS ASTRAL**
${combos.join("\n\n")}

💰 **Todos os combos: R$ 800**
`);
}

function embedCombos() {
  return new EmbedBuilder()
    .setTitle("🍔 COMBOS ASTRAL 🍔")
    .setColor("#ff6600")
    .setDescription(combos.join("\n\n"));
}

function embedFilmes() {
  return new EmbedBuilder()
    .setTitle("🎬 CINEMA ASTRAL")
    .setColor("#3366ff")
    .setDescription(filmes.join("\n"));
}

function embedDivulgarCombos() {
  return new EmbedBuilder()
    .setTitle("🍔 PROMOÇÃO DOS COMBOS ASTRAL 🍔")
    .setColor("#ff9900")
    .setDescription(`
🔥 **Hoje tem combo por apenas R$ 800!**

${combos.join("\n\n")}

📍 Chame a equipe do restaurante e garanta o seu pedido!
`);
}

function embedDivulgarFilmes() {
  return new EmbedBuilder()
    .setTitle("🎬 PROGRAMAÇÃO DO CINEMA ASTRAL")
    .setColor("#3366ff")
    .setDescription(`
🍿 **Sessões disponíveis hoje:**

${filmes.join("\n")}

🎟️ Chame a equipe do cinema e venha assistir!
`);
}

async function enviarCanal(message, canalId, embed) {
  const canal = await message.guild.channels.fetch(canalId).catch(() => null);
  if (!canal) return message.reply("❌ Canal não encontrado.");

  await canal.send({ embeds: [embed] });
}

async function iniciarAnimacao(message, lista, emoji) {
  const item = lista[Math.floor(Math.random() * lista.length)];

  const m = await message.channel.send(`${emoji} **${item.nome}**\n\n${item.etapas[0]}`);

  for (let i = 1; i < item.etapas.length; i++) {
    setTimeout(() => {
      m.edit(`${emoji} **${item.nome}**\n\n${item.etapas[i]}`).catch(() => {});
    }, i * 2500);
  }
}

client.login(process.env.TOKEN);
