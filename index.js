const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const cargosPermitidos = [
  "👑 Dono Astral",
  "🍿 Dono Restaurante",
  "🥤 Gerente Restaurante",
  "🎬 Dono Cinema",
  "🎥 Gerente Cinema"
];

let comidas = [
  "🍔 Hambúrguer Astral",
  "🍟 Batata Sombria",
  "🍕 Pizza da Noite",
  "🩸 Combo Vampiro"
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

client.once("clientReady", () => {
  console.log(`✅ Bot online: ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.guild) return;

  if (message.content === "!cardapio") {
    const embed = new EmbedBuilder()
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

    return message.channel.send({ embeds: [embed] });
  }

  if (message.content === "!filmes") {
    const embed = new EmbedBuilder()
      .setTitle("🎬 CINEMA ASTRAL")
      .setColor("#3366ff")
      .setDescription(filmes.join("\n"));

    return message.channel.send({ embeds: [embed] });
  }

  if (message.content === "!listar") {
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

  if (message.content === "!painel") {
    if (!temPermissao(message.member)) return message.reply("❌ Sem permissão.");

    return message.channel.send(`
📌 **PAINEL GERÊNCIA**

🍔 **COMIDAS**
!addcomida Nome da comida
!remcomida número

🥤 **BEBIDAS**
!addbebida Nome da bebida
!rembebida número

🍔 **COMBOS**
!addcombo Nome do combo
!remcombo número

🎬 **CINEMA**
!addfilme Nome do filme — horário
!remfilme número

📋 **OUTROS**
!listar
!cardapio
!filmes
`);
  }

  if (message.content.startsWith("!addcomida ")) {
    if (!temPermissao(message.member)) return message.reply("❌ Sem permissão.");
    comidas.push(message.content.replace("!addcomida ", ""));
    return message.reply("✅ Comida adicionada.");
  }

  if (message.content.startsWith("!remcomida ")) {
    return removerItem(message, comidas, "!remcomida ", "Comida");
  }

  if (message.content.startsWith("!addbebida ")) {
    if (!temPermissao(message.member)) return message.reply("❌ Sem permissão.");
    bebidas.push(message.content.replace("!addbebida ", ""));
    return message.reply("✅ Bebida adicionada.");
  }

  if (message.content.startsWith("!rembebida ")) {
    return removerItem(message, bebidas, "!rembebida ", "Bebida");
  }

  if (message.content.startsWith("!addcombo ")) {
    if (!temPermissao(message.member)) return message.reply("❌ Sem permissão.");
    combos.push(message.content.replace("!addcombo ", ""));
    return message.reply("✅ Combo adicionado.");
  }

  if (message.content.startsWith("!remcombo ")) {
    return removerItem(message, combos, "!remcombo ", "Combo");
  }

  if (message.content.startsWith("!addfilme ")) {
    if (!temPermissao(message.member)) return message.reply("❌ Sem permissão.");
    filmes.push(message.content.replace("!addfilme ", ""));
    return message.reply("✅ Filme adicionado.");
  }

  if (message.content.startsWith("!remfilme ")) {
    return removerItem(message, filmes, "!remfilme ", "Filme");
  }
});

function listar(lista) {
  return lista.map((item, i) => `${i + 1}. ${item}`).join("\n") || "Nenhum item";
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
