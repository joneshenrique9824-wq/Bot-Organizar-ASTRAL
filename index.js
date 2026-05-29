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

// ===============================
// IDS DOS CANAIS
// ===============================
const canais = {
  cardapio: "1509165293245562971",
  combos: "1509873045504921651",
  filmes: "1509165277286502521",
  divulgarCombos: "1509165292293455965",
  divulgarFilmes: "1509165277286502521"
};

// ===============================
// CARGOS
// ===============================
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

// ===============================
// LISTAS
// ===============================
let comidas = [
  "🍔 Hambúrguer Astral",
  "🍟 Batata Sombria",
  "🍕 Pizza da Noite"
];

let bebidas = [
  "🥤 Refrigerante",
  "🧃 Suco Natural",
  "⚡ Energético Astral"
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

// ===============================
// EFEITOS
// ===============================
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

// ===============================
// BOT ONLINE
// ===============================
client.once("clientReady", () => {
  console.log(`✅ Bot online: ${client.user.tag}`);
});

// ===============================
// DAR CARGO AO ENTRAR
// ===============================
client.on("guildMemberAdd", async (member) => {
  const cargo = member.guild.roles.cache.get(cargoEntrada);

  if (!cargo) {
    return console.log("❌ Cargo de entrada não encontrado.");
  }

  await member.roles.add(cargo).catch(console.error);
});

// ===============================
// COMANDOS
// ===============================
client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.guild) return;

  const msg = message.content;

  if (msg === "!cardapio") {
    await enviarCanal(message, canais.cardapio, embedCardapio());
    return message.reply("✅ Cardápio enviado no canal correto.");
  }

  if (msg === "!combos") {
    await enviarCanal(message, canais.combos, embedCombos());
    return message.reply("✅ Combos enviados no canal correto.");
  }

  if (msg === "!filmes") {
    await enviarCanal(message, canais.filmes, embedFilmes());
    return message.reply("✅ Filmes enviados no canal correto.");
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

    const cargo = message.guild.roles.cache.get(cargoRestrito);

    if (!cargo) {
      return message.reply("❌ Cargo restrito não encontrado.");
    }

    await message.reply("⏳ Configurando permissões do cargo restrito...");

    for (const canal of message.guild.channels.cache.values()) {
      const podeVer = canaisPermitidosRestrito.includes(canal.id);

      await canal.permissionOverwrites.edit(cargo, {
        ViewChannel: podeVer,
        SendMessages: podeVer
      }).catch(() => {});
    }

    return message.channel.send("✅ Pronto! O cargo restrito agora só vê os 2 canais liberados.");
  }

  if (msg === "!painel") {
    if (!temPermissao(message.member)) {
      return message.reply("❌ Sem permissão.");
    }

    return message.channel.send(`
📌 **PAINEL GERÊNCIA**

📢 **ENVIAR PARA CANAIS FIXOS**
!cardapio
!combos
!filmes
!divulgarcombos
!divulgarfilmes

🌑 **EFEITOS SOBRENATURAIS**
!efeito
!invocar

🔒 **PERMISSÕES**
!configurarrestrito

🍔 **COMIDAS**
!addcomida Nome da comida
!remcomida número

🥤 **BEBIDAS**
!addbebida Nome da bebida
!rembebida número

🍔 **COMBOS**
!addcombo Nome do combo
!remcombo número

🎬 **FILMES**
!addfilme Nome do filme — horário
!remfilme número

📋 **LISTA**
!listar
`);
  }

  if (msg === "!listar") {
    if (!temPermissao(message.member)) {
      return message.reply("❌ Sem permissão.");
    }

    return message.channel.send(`
📋 **LISTA DE ITENS**

🍔 **COMIDAS**
${listar(comidas)}

🥤 **BEBIDAS**
${listar(bebidas)}

🍔 **COMBOS**
${listar(combos)}

🎬 **FILMES**
${listar(filmes)}
`);
  }

  if (msg.startsWith("!addcomida ")) {
    if (!temPermissao(message.member)) return message.reply("❌ Sem permissão.");
    comidas.push(msg.replace("!addcomida ", ""));
    return message.reply("✅ Comida adicionada.");
  }

  if (msg.startsWith("!remcomida ")) {
    return removerItem(message, comidas, "!remcomida ", "Comida");
  }

  if (msg.startsWith("!addbebida ")) {
    if (!temPermissao(message.member)) return message.reply("❌ Sem permissão.");
    bebidas.push(msg.replace("!addbebida ", ""));
    return message.reply("✅ Bebida adicionada.");
  }

  if (msg.startsWith("!rembebida ")) {
    return removerItem(message, bebidas, "!rembebida ", "Bebida");
  }

  if (msg.startsWith("!addcombo ")) {
    if (!temPermissao(message.member)) return message.reply("❌ Sem permissão.");
    combos.push(msg.replace("!addcombo ", ""));
    return message.reply("✅ Combo adicionado.");
  }

  if (msg.startsWith("!remcombo ")) {
    return removerItem(message, combos, "!remcombo ", "Combo");
  }

  if (msg.startsWith("!addfilme ")) {
    if (!temPermissao(message.member)) return message.reply("❌ Sem permissão.");
    filmes.push(msg.replace("!addfilme ", ""));
    return message.reply("✅ Filme adicionado.");
  }

  if (msg.startsWith("!remfilme ")) {
    return removerItem(message, filmes, "!remfilme ", "Filme");
  }
});

// ===============================
// FUNÇÕES
// ===============================
function embedCardapio() {
  return new EmbedBuilder()
    .setTitle("🍔 CARDÁPIO RESTAURANTE ASTRAL")
    .setColor("#ff9900")
    .setDescription(`
🍔 **COMIDAS**
${comidas.join("\n")}

🥤 **BEBIDAS**
${bebidas.join("\n")}

🍔 **COMBOS ASTRAL 🍔**
${combos.join("\n\n")}
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

  if (!canal) {
    return message.reply("❌ Canal não encontrado. Confira o ID.");
  }

  await canal.send({ embeds: [embed] });
}

async function iniciarAnimacao(message, lista, emoji) {
  const item = lista[Math.floor(Math.random() * lista.length)];

  const m = await message.channel.send(`${emoji} **${item.nome}**\n\n${item.etapas[0]}`);

  for (let i = 1; i < item.etapas.length; i++) {
    setTimeout(() => {
      m.edit(`${emoji} **${item.nome}**\n\n${item.etapas[i]}`);
    }, i * 2500);
  }
}

function listar(lista) {
  return lista.map((item, i) => `${i + 1}. ${item}`).join("\n") || "Nenhum item.";
}

function temPermissao(member) {
  return cargosPermitidos.some(cargo =>
    member.roles.cache.some(role => role.name === cargo)
  );
}

function removerItem(message, lista, comando, nome) {
  if (!temPermissao(message.member)) {
    return message.reply("❌ Sem permissão.");
  }

  const numero = parseInt(message.content.replace(comando, ""));

  if (isNaN(numero)) {
    return message.reply("❌ Use um número.");
  }

  if (!lista[numero - 1]) {
    return message.reply(`❌ ${nome} não encontrado.`);
  }

  lista.splice(numero - 1, 1);
  return message.reply(`✅ ${nome} removido.`);
}

client.login(process.env.TOKEN);
