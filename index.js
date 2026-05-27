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

// ===============================
// CONFIGURAÇÕES
// ===============================

const cargosPermitidos = [
  "👑 Dono Astral",
  "🍿 Dono Restaurante",
  "🥤 Gerente Restaurante",
  "🎬 Dono Cinema",
  "🎥 Gerente Cinema"
];

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

// ===============================
// BOT ONLINE
// ===============================

client.once("clientReady", () => {
  console.log(`✅ Bot online: ${client.user.tag}`);
});

// ===============================
// COMANDOS
// ===============================

client.on("messageCreate", async (message) => {

  if (message.author.bot || !message.guild) return;

  // ===============================
  // CARDÁPIO
  // ===============================

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

  // ===============================
  // FILMES
  // ===============================

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

  // ===============================
  // ADICIONAR COMIDA
  // ===============================

  if (message.content.startsWith("!addcomida ")) {

    if (!temPermissao(message.member)) {
      return message.reply("❌ Sem permissão.");
    }

    const nova = message.content.replace("!addcomida ", "");

    comidas.push(nova);

    return message.reply("✅ Comida adicionada.");
  }

  // ===============================
  // REMOVER COMIDA
  // ===============================

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

    comidas.splice(numero - 1, 1);

    return message.reply("✅ Comida removida.");
  }

  // ===============================
  // ADICIONAR BEBIDA
  // ===============================

  if (message.content.startsWith("!addbebida ")) {

    if (!temPermissao(message.member)) {
      return message.reply("❌ Sem permissão.");
    }

    const nova = message.content.replace("!addbebida ", "");

    bebidas.push(nova);

    return message.reply("✅ Bebida adicionada.");
  }

  // ===============================
  // REMOVER BEBIDA
  // ===============================

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

    bebidas.splice(numero - 1, 1);

    return message.reply("✅ Bebida removida.");
  }

  // ===============================
  // ADICIONAR FILME
  // ===============================

  if (message.content.startsWith("!addfilme ")) {

    if (!temPermissao(message.member)) {
      return message.reply("❌ Sem permissão.");
    }

    const novo = message.content.replace("!addfilme ", "");

    filmes.push(novo);

    return message.reply("✅ Filme adicionado.");
  }

  // ===============================
  // REMOVER FILME
  // ===============================

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

    filmes.splice(numero - 1, 1);

    return message.reply("✅ Filme removido.");
  }

  // ===============================
  // AJUDA
  // ===============================

  if (message.content === "!painel") {

    if (!temPermissao(message.member)) {
      return message.reply("❌ Sem permissão.");
    }

    return message.channel.send(`
📌 COMANDOS ADMIN

🍔 RESTAURANTE

!addcomida NOME — PREÇO
!remcomida NUMERO

!addbebida NOME — PREÇO
!rembebida NUMERO

🎬 CINEMA

!addfilme FILME — HORARIO
!remfilme NUMERO

👀 COMANDOS PÚBLICOS

!cardapio
!filmes
`);
  }

});

// ===============================
// PERMISSÃO
// ===============================

function temPermissao(member) {

  return cargosPermitidos.some(cargo =>
    member.roles.cache.some(role =>
      role.name === cargo
    )
  );
}

// ===============================
// LOGIN
// ===============================

client.login(process.env.TOKEN);
