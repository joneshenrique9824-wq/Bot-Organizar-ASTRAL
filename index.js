const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// IDS DOS CANAIS
const canais = {
  cardapio: "1509165293245562971",
  combos: "1509873045504921651",
  filmes: "1509165277286502521",
  divulgarCombos: "1509165292293455965",
  divulgarFilmes: "1509165277286502521"
};

// CARGOS COM PERMISSÃO
const cargosPermitidos = [
  "👑 Dono Astral",
  "🍿 Dono Restaurante",
  "🥤 Gerente Restaurante",
  "🎬 Dono Cinema",
  "🎥 Gerente Cinema",
  "🍿 Dono Snacks",
  "🥤 Gerente Snacks"
];

// COMIDAS
let comidas = [
  "🍔 Hambúrguer Astral",
  "🍟 Batata Sombria",
  "🍕 Pizza da Noite"
];

// BEBIDAS
let bebidas = [
  "🥤 Refrigerante",
  "🧃 Suco Natural",
  "⚡ Energético Astral"
];

// COMBOS
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

// FILMES
let filmes = [
  "🎞️ Noite dos Vampiros — 20:00",
  "🌑 Ritual da Meia-Noite — 21:00",
  "🩸 Lua Sangrenta — 22:00",
  "☠️ Apocalipse Astral — 23:00"
];

client.once("clientReady", () => {
  console.log(`✅ Bot online: ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.guild) return;

  const msg = message.content;

  if (msg === "!cardapio") {
    const embed = embedCardapio();
    await enviarCanal(message, canais.cardapio, embed);
    return message.reply("✅ Cardápio enviado no canal correto.");
  }

  if (msg === "!combos") {
    const embed = embedCombos();
    await enviarCanal(message, canais.combos, embed);
    return message.reply("✅ Combos enviados no canal correto.");
  }

  if (msg === "!filmes") {
    const embed = embedFilmes();
    await enviarCanal(message, canais.filmes, embed);
    return message.reply("✅ Filmes enviados no canal correto.");
  }

  if (msg === "!divulgarcombos") {
    const embed = embedDivulgarCombos();
    await enviarCanal(message, canais.divulgarCombos, embed);
    return message.reply("✅ Divulgação de combos enviada.");
  }

  if (msg === "!divulgarfilmes") {
    const embed = embedDivulgarFilmes();
    await enviarCanal(message, canais.divulgarFilmes, embed);
    return message.reply("✅ Divulgação de filmes enviada.");
  }

  if (msg === "!listar") {
    if (!temPermissao(message.member)) return message.reply("❌ Sem permissão.");

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

  if (msg === "!painel") {
    if (!temPermissao(message.member)) return message.reply("❌ Sem permissão.");

    return message.channel.send(`
📌 **PAINEL GERÊNCIA**

📢 **ENVIAR PARA CANAIS FIXOS**
!cardapio
!combos
!filmes
!divulgarcombos
!divulgarfilmes

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
    return message.reply("❌ Canal não encontrado. Confira o ID do canal.");
  }

  await canal.send({ embeds: [embed] });
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
  if (!temPermissao(message.member)) return message.reply("❌ Sem permissão.");

  const numero = parseInt(message.content.replace(comando, ""));

  if (isNaN(numero)) return message.reply("❌ Use um número.");
  if (!lista[numero - 1]) return message.reply(`❌ ${nome} não encontrado.`);

  lista.splice(numero - 1, 1);
  return message.reply(`✅ ${nome} removido.`);
}

client.login(process.env.TOKEN);
