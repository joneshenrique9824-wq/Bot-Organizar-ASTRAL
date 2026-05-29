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

// =====================
// CARGOS
// =====================
const cargoMorador = "1509165244339978390";
const cargoPlayer = "1509165252376531104";
const cargoBloqueadoTotal = "1509139169979662427";

// =====================
// CANAIS FIXOS DO BOT
// =====================
const canais = {
  cardapio: "1509165293245562971",
  combos: "1509873045504921651",
  filmes: "1509165277286502521",
  divulgarCombos: "1509165292293455965",
  divulgarFilmes: "1509165277286502521"
};

// Player vê só divulgações
const canaisPlayer = [
  "1509165292293455965",
  "1509165277286502521"
];

// Morador vê áreas públicas + eventos
const canaisMorador = [
  "1509165293245562971",
  "1509873045504921651",
  "1509165277286502521",
  "1509165292293455965",
  "1509699102114320586",
  "1509165261729828895"
];

// =====================
// CARDÁPIO
// =====================
let comidas = [
  "🥟 Coxinha — R$ 134",
  "🥪 Sanduíche Atom — R$ 134",
  "🍞 Torrada — R$ 134"
];

let bebidas = [
  "🥤 Refrigerante — R$ 133",
  "🥤 Refrigerante 2 — R$ 133",
  "🍉 Suco de Melancia — R$ 132",
  "🍊 Suco de Laranja — R$ 133",
  "🍨 Super Milkshake — R$ 132"
];

let combos = [
`🌑 COMBO VÉU DAS SOMBRAS — R$ 800
• 3x Coxinha
• 3x Refrigerante`,

`🩸 COMBO LUA SANGRENTA — R$ 800
• 3x Sanduíche Atom
• 3x Refrigerante 2`,

`👻 COMBO ESPÍRITO ERRANTE — R$ 800
• 3x Torrada
• 3x Suco de Laranja`,

`🔮 COMBO RITUAL ARCANO — R$ 800
• 3x Coxinha
• 3x Suco de Melancia`,

`☠️ COMBO ECLIPSE SOMBRIO — R$ 800
• 3x Sanduíche Atom
• 3x Super Milkshake`
];

let filmes = [
  "🎬 A Maldição da Astral City — 20:00",
  "🩸 Vampiros da Lua Sangrenta — 21:00",
  "👻 O Chamado dos Espíritos — 22:00",
  "🔮 O Ritual Proibido — 23:00",
  "☠️ A Noite do Apocalipse — 00:00"
];

// =====================
// EFEITOS
// =====================
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
    nome: "👻 ESPÍRITO PERDIDO",
    etapas: [
      "👻 Um sussurro ecoou pelo corredor...",
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
      "📜 Palavras antigas ecoaram...",
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
  }
];

// =====================
// ONLINE
// =====================
client.once("clientReady", () => {
  console.log(`✅ Bot online: ${client.user.tag}`);
});

// Dá cargo Morador ao entrar
client.on("guildMemberAdd", async (member) => {
  try {
    const cargo = await member.guild.roles.fetch(cargoMorador);
    if (!cargo) return console.log("❌ Cargo Morador não encontrado.");

    await member.roles.add(cargo);
    console.log(`✅ Cargo Morador dado para ${member.user.tag}`);
  } catch (err) {
    console.log("❌ Erro ao dar cargo:", err.message);
  }
});

// =====================
// COMANDOS
// =====================
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

  if (msg === "!efeito") return iniciarAnimacao(message, efeitos, "🌑");

  if (msg === "!invocar") return iniciarAnimacao(message, invocacoes, "🔮");

  if (msg === "!configuraracessos") {
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return message.reply("❌ Apenas administrador pode usar.");
    }

    const rolePlayer = await message.guild.roles.fetch(cargoPlayer);
    const roleMorador = await message.guild.roles.fetch(cargoMorador);

    if (!rolePlayer) return message.reply("❌ Cargo Player não encontrado.");
    if (!roleMorador) return message.reply("❌ Cargo Morador não encontrado.");

    await message.reply("⏳ Configurando acessos...");

    let ok = 0;
    let erro = 0;

    for (const canal of message.guild.channels.cache.values()) {
      try {
        const liberarPlayer = canaisPlayer.includes(canal.id);
        const liberarMorador = canaisMorador.includes(canal.id);

        await canal.permissionOverwrites.edit(rolePlayer, {
          ViewChannel: liberarPlayer,
          SendMessages: liberarPlayer,
          Connect: liberarPlayer,
          Speak: liberarPlayer
        });

        await canal.permissionOverwrites.edit(roleMorador, {
          ViewChannel: liberarMorador,
          SendMessages: liberarMorador,
          Connect: liberarMorador,
          Speak: liberarMorador
        });

        ok++;
      } catch (err) {
        erro++;
        console.log(`❌ Erro no canal ${canal.name}:`, err.message);
      }
    }

    return message.channel.send(`✅ Acessos configurados.\nCanais alterados: ${ok}\nErros: ${erro}`);
  }

  if (msg === "!bloqueartudo") {
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return message.reply("❌ Apenas administrador pode usar.");
    }

    const cargo = await message.guild.roles.fetch(cargoBloqueadoTotal);
    if (!cargo) return message.reply("❌ Cargo bloqueado não encontrado.");

    await message.reply("⏳ Bloqueando cargo totalmente...");

    let ok = 0;
    let erro = 0;

    for (const canal of message.guild.channels.cache.values()) {
      try {
        await canal.permissionOverwrites.edit(cargo, {
          ViewChannel: false,
          SendMessages: false,
          AddReactions: false,
          AttachFiles: false,
          EmbedLinks: false,
          UseApplicationCommands: false,
          Connect: false,
          Speak: false,
          Stream: false
        });

        ok++;
      } catch (err) {
        erro++;
      }
    }

    return message.channel.send(`✅ Cargo bloqueado.\nCanais alterados: ${ok}\nErros: ${erro}`);
  }

  if (msg === "!painel") {
    return message.channel.send(`
📌 **PAINEL ASTRAL**

!cardapio
!combos
!filmes
!divulgarcombos
!divulgarfilmes

🌑 **Efeitos**
!efeito
!invocar

🔒 **Permissões**
!configuraracessos
!bloqueartudo
`);
  }
});

// =====================
// EMBEDS
// =====================
function embedCardapio() {
  return new EmbedBuilder()
    .setTitle("🍔 ASTRAL CINEMA & SNACKS 🍿")
    .setColor("#ff9900")
    .setDescription(`
🥟 **COMIDAS**
${comidas.join("\n")}

🥤 **BEBIDAS**
${bebidas.join("\n")}

🌑 **COMBOS SOBRENATURAIS**
${combos.join("\n\n")}

💰 **Todos os combos: R$ 800**
`);
}

function embedCombos() {
  return new EmbedBuilder()
    .setTitle("🌑 COMBOS SOBRENATURAIS 🌑")
    .setColor("#5b006e")
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
    .setTitle("🌑 COMBOS SOBRENATURAIS EM PROMOÇÃO 🌑")
    .setColor("#5b006e")
    .setDescription(`
🔥 **Hoje todos os combos estão por apenas R$ 800!**

${combos.join("\n\n")}
`);
}

function embedDivulgarFilmes() {
  return new EmbedBuilder()
    .setTitle("🎬 PROGRAMAÇÃO DO CINEMA ASTRAL")
    .setColor("#3366ff")
    .setDescription(`
🍿 **Sessões disponíveis hoje:**

${filmes.join("\n")}

🎟️ Venha assistir no Astral Cinema!
`);
}

// =====================
// FUNÇÕES
// =====================
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
