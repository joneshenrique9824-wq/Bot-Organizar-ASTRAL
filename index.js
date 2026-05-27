const {
  Client,
  GatewayIntentBits,
  EmbedBuilder
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// =====================================
// CARGOS COM PERMISSÃO
// =====================================

const cargosPermitidos = [
  "👑 Dono Astral",
  "🍿 Dono Restaurante",
  "🥤 Gerente Restaurante",
  "🎬 Dono Cinema",
  "🎥 Gerente Cinema"
];

// =====================================
// LISTAS
// =====================================

let comidas = [
  "🍔 Hambúrguer Astral — R$ 500",
  "🍟 Batata Sombria — R$ 300",
  "🍕 Pizza da Noite — R$ 700",
  "🩸 Combo Vampiro — R$ 1.000"
];

let bebidas = [
  "🥤 Refrigerante — R$ 200",
  "🧃 Suco Natural — R$ 250",
  "⚡ Energético Astral — R$ 400"
];

let filmes = [
  "🎞️ Noite dos Vampiros — 20:00",
  "🌑 Ritual da Meia-Noite — 21:00",
  "🩸 Lua Sangrenta — 22:00",
  "☠️ Apocalipse Astral — 23:00"
];

// =====================================
// BOT ONLINE
// =====================================

client.once("clientReady", () => {
  console.log(`✅ Bot online: ${client.user.tag}`);
});

// =====================================
// COMANDOS
// =====================================

client.on("messageCreate", async (message) => {

  if (message.author.bot || !message.guild) return;

  // =====================================
  // CARDÁPIO
  // =====================================

  if (message.content === "!cardapio") {

    const embed = new EmbedBuilder()
      .setTitle("🍔 CARDÁPIO RESTAURANTE ASTRAL")
      .setColor("#ff9900")
      .setDescription(`
${comidas.join("\n")}

${bebidas.join("\n")}
`);

    return message.channel.send({
      embeds: [embed]
    });
  }

  // =====================================
  // FILMES
  // =====================================

  if (message.content === "!filmes") {

    const embed = new EmbedBuilder()
      .setTitle("🎬 CINEMA ASTRAL")
      .setColor("#3366ff")
      .setDescription(`
${filmes.join("\n")}
`);

    return message.channel.send({
      embeds: [embed]
    });
  }

  // =====================================
  // LISTAR ITENS
  // =====================================

  if (message.content === "!listar") {

    if (!temPermissao(message.member)) {
      return message.reply("❌ Sem permissão.");
    }

    const listaComidas = comidas
      .map((item, i) => `${i + 1}. ${item}`)
      .join("\n");

    const listaBebidas = bebidas
      .map((item, i) => `${i + 1}. ${item}`)
      .join("\n");

    const listaFilmes = filmes
      .map((item, i) => `${i + 1}. ${item}`)
      .join("\n");

    return message.channel.send(`
📋 LISTA DE ITENS

🍔 COMIDAS
${listaComidas || "Nenhuma comida"}

🥤 BEBIDAS
${listaBebidas || "Nenhuma bebida"}

🎬 FILMES
${listaFilmes || "Nenhum filme"}
`);
  }

  // =====================================
  // ADD COMIDA
  // =====================================

  if (message.content.startsWith("!addcomida ")) {

    if (!temPermissao(message.member)) {
      return message.reply("❌ Sem permissão.");
    }

    const nova = message.content.replace("!addcomida ", "");

    comidas.push(nova);

    return message.reply("✅ Comida adicionada.");
  }

  // =====================================
  // REMOVER COMIDA
  // =====================================

  if (message.content.startsWith("!remcomida ")) {

    if (!temPermissao(message.member)) {
      return message.reply("❌ Sem permissão.");
    }

    const numero = parseInt(
      message.content.replace("!remcomida ", "")
    );

    if (isNaN(numero)) {
      return message.reply("❌ Use um número.");
    }

    if (!comidas[numero - 1]) {
      return message.reply("❌ Comida não encontrada.");
    }

    comidas.splice(numero - 1, 1);

    return message.reply("✅ Comida removida.");
  }

  // =====================================
  // ADD BEBIDA
  // =====================================

  if (message.content.startsWith("!addbebida ")) {

    if (!temPermissao(message.member)) {
      return message.reply("❌ Sem permissão.");
    }

    const nova = message.content.replace("!addbebida ", "");

    bebidas.push(nova);

    return message.reply("✅ Bebida adicionada.");
  }

  // =====================================
  // REMOVER BEBIDA
  // =====================================

  if (message.content.startsWith("!rembebida ")) {

    if (!temPermissao(message.member)) {
      return message.reply("❌ Sem permissão.");
    }

    const numero = parseInt(
      message.content.replace("!rembebida ", "")
    );

    if (isNaN(numero)) {
      return message.reply("❌ Use um número.");
    }

    if (!bebidas[numero - 1]) {
      return message.reply("❌ Bebida não encontrada.");
    }

    bebidas.splice(numero - 1, 1);

    return message.reply("✅ Bebida removida.");
  }

  // =====================================
  // ADD FILME
  // =====================================

  if (message.content.startsWith("!addfilme ")) {

    if (!temPermissao(message.member)) {
      return message.reply("❌ Sem permissão.");
    }

    const novo = message.content.replace("!addfilme ", "");

    filmes.push(novo);

    return message.reply("✅ Filme adicionado.");
  }

  // =====================================
  // REMOVER FILME
  // =====================================

  if (message.content.startsWith("!remfilme ")) {

    if (!temPermissao(message.member)) {
      return message.reply("❌ Sem permissão.");
    }

    const numero = parseInt(
      message.content.replace("!remfilme ", "")
    );

    if (isNaN(numero)) {
      return message.reply("❌ Use um número.");
    }

    if (!filmes[numero - 1]) {
      return message.reply("❌ Filme não encontrado.");
    }

    filmes.splice(numero - 1, 1);

    return message.reply("✅ Filme removido.");
  }

  // =====================================
  // PAINEL
  // =====================================

  if (message.content === "!painel") {

    if (!temPermissao(message.member)) {
      return message.reply("❌ Sem permissão.");
    }

    return message.channel.send(`
📌 COMANDOS

🍔 RESTAURANTE

!addcomida ITEM
!remcomida NUMERO

!addbebida ITEM
!rembebida NUMERO

🎬 CINEMA

!addfilme FILME
!remfilme NUMERO

📋 OUTROS

!listar
!cardapio
!filmes
`);
  }

});

// =====================================
// VERIFICAR PERMISSÃO
// =====================================

function temPermissao(member) {

  return cargosPermitidos.some(cargo =>
    member.roles.cache.some(role =>
      role.name === cargo
    )
  );
}

// =====================================
// LOGIN
// =====================================

client.login(process.env.TOKEN);
