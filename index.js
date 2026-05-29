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

const cargoMorador = "1509165244339978390";
const cargoPlayer = "1509165252376531104";
const cargoBloqueadoTotal = "1509139169979662427";

const canais = {
  cardapio: "1509165293245562971",
  combos: "1509873045504921651",
  filmes: "1509165277286502521",
  divulgarCombos: "1509165292293455965",
  divulgarFilmes: "1509165277286502521"
};

const canaisAtencao = [
  "1509165277286502521",
  "1509165292293455965",
  "1509873045504921651",
  "1509165293245562971"
];

const canaisPlayer = [
  "1509165292293455965",
  "1509165277286502521"
];

const canaisMorador = [
  "1509165293245562971",
  "1509873045504921651",
  "1509165277286502521",
  "1509165292293455965",
  "1509699102114320586",
  "1509165261729828895"
];

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

const efeitos = [
  {
    nome: "🌕 LUA SANGRENTA",
    cor: "#8b0000",
    etapas: [
`🚨━━━━━━━━━━━━━━━━━━━━🚨
🌕 **ANOMALIA DETECTADA**
🚨━━━━━━━━━━━━━━━━━━━━🚨

O céu da Astral começou a mudar...`,

`🩸 **O céu ficou vermelho...**

⚠️ Algo antigo despertou na cidade.
🌑 O véu entre os mundos está instável.`,

`🌕 **LUA SANGRENTA ATIVA**

🧛 Criaturas da noite sentem sua força crescer.
👻 Espíritos caminham entre os vivos.`,

`☠️ **ENTIDADE DETECTADA**

👁️ Presenças observam das sombras...
⚡ A energia sobrenatural tomou conta do local.`,

`🌑 **A Lua Sangrenta desapareceu...**

💨 O silêncio voltou.
Mas algo ficou para trás...`
    ]
  },
  {
    nome: "👻 ESPÍRITO PERDIDO",
    cor: "#4b0082",
    etapas: [
`👻━━━━━━━━━━━━━━━━━━━━👻
**PRESENÇA ESPIRITUAL DETECTADA**
👻━━━━━━━━━━━━━━━━━━━━👻

Um sussurro ecoou no corredor...`,

`🕯️ **As luzes começaram a piscar...**

🌫️ Uma névoa fria se espalhou.
👁️ Alguém está observando.`,

`💀 **O espírito se aproximou...**

📜 Uma mensagem apareceu nas sombras.
⚠️ Ninguém sabe quem chamou por ele.`,

`🌑 **A presença ficou mais forte...**

👻 Vozes antigas foram ouvidas.
🩸 O ar ficou pesado.`,

`💨 **O espírito desapareceu...**

Só restou uma marca invisível no ambiente...`
    ]
  }
];

const invocacoes = [
  {
    nome: "🔮 INVOCAÇÃO ARCANA",
    cor: "#5b006e",
    etapas: [
`🕯️━━━━━━━━━━━━━━━━━━━━🕯️
🔮 **RITUAL ARCANO INICIADO**
🕯️━━━━━━━━━━━━━━━━━━━━🕯️

O círculo arcano começou a brilhar...`,

`📜 **Runas antigas surgiram no chão...**

🌫️ Uma névoa cobre o local.
🕯️ As velas acenderam sozinhas.`,

`👁️ **Algo respondeu ao chamado...**

⚠️ Não olhe para trás.
🌑 O véu começou a se abrir.`,

`☠️ **PORTAL ABERTO**

🔮 A energia atravessou a Astral.
🩸 Uma entidade sentiu sua presença.`,

`💨 **O portal foi fechado...**

O ritual acabou.
Mas a entidade ainda observa em silêncio...`
    ]
  }
];

client.once("clientReady", () => {
  console.log(`✅ Bot online: ${client.user.tag}`);
});

client.on("guildMemberAdd", async (member) => {
  try {
    const cargo = await member.guild.roles.fetch(cargoMorador);
    if (cargo) await member.roles.add(cargo);
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
    return iniciarAnimacaoEmCanal(message, canaisAtencao, efeitos, "🌑");
  }

  if (msg === "!invocar") {
    return iniciarAnimacaoEmCanal(message, canaisAtencao, invocacoes, "🔮");
  }

  if (msg === "!listar") {
    return message.channel.send(`
📋 **LISTA DE ITENS**

🥟 **COMIDAS**
${listar(comidas)}

🥤 **BEBIDAS**
${listar(bebidas)}

🌑 **COMBOS**
${listar(combos)}

🎬 **FILMES**
${listar(filmes)}
`);
  }

  if (msg.startsWith("!addcomida ")) {
    comidas.push(msg.replace("!addcomida ", ""));
    return message.reply("✅ Comida adicionada.");
  }

  if (msg.startsWith("!remcomida ")) {
    return removerItem(message, comidas, "!remcomida ", "Comida");
  }

  if (msg.startsWith("!addbebida ")) {
    bebidas.push(msg.replace("!addbebida ", ""));
    return message.reply("✅ Bebida adicionada.");
  }

  if (msg.startsWith("!rembebida ")) {
    return removerItem(message, bebidas, "!rembebida ", "Bebida");
  }

  if (msg.startsWith("!addcombo ")) {
    combos.push(msg.replace("!addcombo ", ""));
    return message.reply("✅ Combo adicionado.");
  }

  if (msg.startsWith("!remcombo ")) {
    return removerItem(message, combos, "!remcombo ", "Combo");
  }

  if (msg.startsWith("!addfilme ")) {
    filmes.push(msg.replace("!addfilme ", ""));
    return message.reply("✅ Filme adicionado.");
  }

  if (msg.startsWith("!remfilme ")) {
    return removerItem(message, filmes, "!remfilme ", "Filme");
  }

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

📢 **CARDÁPIO**
!cardapio
!combos
!filmes
!divulgarcombos
!divulgarfilmes

🌑 **EFEITOS**
!efeito
!invocar

📋 **GERENCIAR**
!listar
!addcomida Nome — R$ valor
!remcomida número
!addbebida Nome — R$ valor
!rembebida número
!addcombo Nome do combo
!remcombo número
!addfilme Nome do filme — horário
!remfilme número

🔒 **PERMISSÕES**
!configuraracessos
!bloqueartudo
`);
  }
});

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

async function enviarCanal(message, canalId, embed) {
  const canal = await message.guild.channels.fetch(canalId).catch(() => null);
  if (!canal) return message.reply("❌ Canal não encontrado.");

  await canal.send({ embeds: [embed] });
}

async function iniciarAnimacaoEmCanal(message, canaisIds, lista, emoji) {
  const canalId = canaisIds[Math.floor(Math.random() * canaisIds.length)];
  const canal = await message.guild.channels.fetch(canalId).catch(() => null);

  if (!canal) return message.reply("❌ Canal de atenção não encontrado.");

  const item = lista[Math.floor(Math.random() * lista.length)];

  const embed = new EmbedBuilder()
    .setTitle(`${emoji} ${item.nome}`)
    .setColor(item.cor || "#5b006e")
    .setDescription(item.etapas[0])
    .setFooter({ text: "Astral Cinema & Snacks • O evento desaparecerá sozinho..." });

  const m = await canal.send({ embeds: [embed] });

  for (let i = 1; i < item.etapas.length; i++) {
    setTimeout(() => {
      const novoEmbed = new EmbedBuilder()
        .setTitle(`${emoji} ${item.nome}`)
        .setColor(item.cor || "#5b006e")
        .setDescription(item.etapas[i])
        .setFooter({ text: "Astral Cinema & Snacks • Algo está acontecendo..." });

      m.edit({ embeds: [novoEmbed] }).catch(() => {});
    }, i * 3000);
  }

  const tempoApagar = (item.etapas.length - 1) * 3000 + 8000;

  setTimeout(async () => {
    const misterio = new EmbedBuilder()
      .setTitle("🌫️ O RASTRO SUMIU...")
      .setColor("#111111")
      .setDescription(`
💨 A energia desapareceu lentamente...

👁️ Mas alguém ainda sente que está sendo observado.
`)
      .setFooter({ text: "Astral Cinema & Snacks • Nada foi deixado para trás..." });

    await m.edit({ embeds: [misterio] }).catch(() => {});

    setTimeout(() => {
      m.delete().catch(() => {});
    }, 4000);
  }, tempoApagar);

  return message.reply("✅ Efeito enviado. Ele vai sumir sozinho com mistério...");
}

function listar(lista) {
  return lista.map((item, i) => `${i + 1}. ${item}`).join("\n") || "Nenhum item.";
}

function removerItem(message, lista, comando, nome) {
  const numero = parseInt(message.content.replace(comando, ""));

  if (isNaN(numero)) return message.reply("❌ Use um número.");
  if (!lista[numero - 1]) return message.reply(`❌ ${nome} não encontrado.`);

  lista.splice(numero - 1, 1);
  return message.reply(`✅ ${nome} removido.`);
}

client.login(process.env.TOKEN);
