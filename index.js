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

const canais = {
  cardapio: "1509165293245562971",
  combos: "1509873045504921651",
  filmes: "1509165277286502521",
  reservas: "1509165277286502521",
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
  "🧇 Waffles — R$ 133",
  "🍕 Calzone — R$ 133",
  "🍨 Sorvete — R$ 133",
  "🍭 Pirulito — R$ 133"
];

let bebidas = [
  "🥤 Refrigerante — R$ 133"
];

let ingressos = [
  "🎟️ Ingresso Cinema — R$ 200"
];

let combos = [
`👻 COMBO ALÉM DO VÉU — R$ 800
• 3x Waffles
• 3x Refrigerante`,

`🐬 COMBO OCEANO ENCANTADO — R$ 800
• 3x Sorvete
• 3x Refrigerante`,

`🧛 COMBO CLÃ IMORTAL — R$ 800
• 3x Calzone
• 3x Refrigerante`,

`🍭 COMBO DOCE ENCANTADO — R$ 800
• 3x Pirulito
• 3x Refrigerante`,

`🌑 COMBO SOMBRAS DA NOITE — R$ 800
• 2x Sorvete
• 1x Calzone
• 3x Refrigerante`,

`🔮 COMBO ECLIPSE ASTRAL — R$ 800
• 2x Waffles
• 1x Calzone
• 3x Refrigerante`
];

let comboIngressos = [
`🎬 COMBO SESSÃO ASTRAL — R$ 1.000
• 🎟️ 1x Ingresso Cinema
• 🍿 1x Combo Sobrenatural`,

`💑 COMBO CASAL ASTRAL — R$ 2.000
• 🎟️ 2x Ingressos Cinema
• 🍿 2x Combos Sobrenaturais`
];

let filmes = [
`🎬 01 • Sobrenatural (2010)
📅 Sexta-feira
🕗 Horário: 20:00
🍿 Combo: Além do Véu`,

`🎬 02 • Uma Garota, Golfinhos e um Dom Secreto
📅 Sábado
🕗 Horário: 20:00
🍿 Combo: Oceano Encantado`,

`🎬 03 • Anjos da Noite: Underworld
📅 Domingo
🕕 Horário: 18:00
🍿 Combo: Clã Imortal`
];

let reservas = [
`🎟️ RESERVA 01
🎬 Sobrenatural (2010)
📅 Sexta-feira
🕗 20:00
🍿 Combo: Além do Véu
📍 Lugares disponíveis`,

`🎟️ RESERVA 02
🎬 Uma Garota, Golfinhos e um Dom Secreto
📅 Sábado
🕗 20:00
🍿 Combo: Oceano Encantado
📍 Lugares disponíveis`,

`🎟️ RESERVA 03
🎬 Anjos da Noite: Underworld
📅 Domingo
🕕 18:00
🍿 Combo: Clã Imortal
📍 Lugares disponíveis`
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

  if (msg === "!comboingresso") {
    await enviarCanal(message, canais.combos, embedComboIngressos());
    return message.reply("✅ Combo com ingresso enviado.");
  }

  if (msg === "!filmes") {
    await enviarCanal(message, canais.filmes, embedFilmes());
    return message.reply("✅ Filmes enviados.");
  }

  if (msg === "!reservas") {
    await enviarCanal(message, canais.reservas, embedReservas());
    return message.reply("✅ Reservas enviadas.");
  }

  if (msg === "!ingressos") {
    await enviarCanal(message, canais.filmes, embedIngressos());
    return message.reply("✅ Ingressos enviados.");
  }

  if (msg === "!divulgarcombos") {
    await enviarCanal(message, canais.divulgarCombos, embedDivulgarCombos());
    return message.reply("✅ Divulgação enviada.");
  }

  if (msg === "!divulgarfilmes") {
    await enviarCanal(message, canais.divulgarFilmes, embedDivulgarFilmes());
    return message.reply("✅ Filmes divulgados.");
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

🍿 **COMIDAS**
${listar(comidas)}

🥤 **BEBIDAS**
${listar(bebidas)}

🎟️ **INGRESSOS**
${listar(ingressos)}

🌑 **COMBOS**
${listar(combos)}

🎬 **COMBO + INGRESSO**
${listar(comboIngressos)}

🎬 **FILMES**
${listar(filmes)}

🎟️ **RESERVAS**
${listar(reservas)}
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

  if (msg.startsWith("!addingresso ")) {
    ingressos.push(msg.replace("!addingresso ", ""));
    return message.reply("✅ Ingresso adicionado.");
  }

  if (msg.startsWith("!remingresso ")) {
    return removerItem(message, ingressos, "!remingresso ", "Ingresso");
  }

  if (msg.startsWith("!addcombo ")) {
    combos.push(msg.replace("!addcombo ", ""));
    return message.reply("✅ Combo adicionado.");
  }

  if (msg.startsWith("!remcombo ")) {
    return removerItem(message, combos, "!remcombo ", "Combo");
  }

  if (msg.startsWith("!addcomboingresso ")) {
    comboIngressos.push(msg.replace("!addcomboingresso ", ""));
    return message.reply("✅ Combo com ingresso adicionado.");
  }

  if (msg.startsWith("!remcomboingresso ")) {
    return removerItem(message, comboIngressos, "!remcomboingresso ", "Combo com ingresso");
  }

  if (msg.startsWith("!addfilme ")) {
    filmes.push(msg.replace("!addfilme ", ""));
    return message.reply("✅ Filme adicionado.");
  }

  if (msg.startsWith("!remfilme ")) {
    return removerItem(message, filmes, "!remfilme ", "Filme");
  }

  if (msg.startsWith("!addreserva ")) {
    reservas.push(msg.replace("!addreserva ", ""));
    return message.reply("✅ Reserva adicionada.");
  }

  if (msg.startsWith("!remreserva ")) {
    return removerItem(message, reservas, "!remreserva ", "Reserva");
  }

  if (msg === "!configuraracessos") {
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return message.reply("❌ Apenas administrador pode usar.");
    }

    const rolePlayer = await message.guild.roles.fetch(cargoPlayer);
    const roleMorador = await message.guild.roles.fetch(cargoMorador);

    if (!rolePlayer) return message.reply("❌ Cargo Player não encontrado.");
    if (!roleMorador) return message.reply("❌ Cargo Morador não encontrado.");

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
      } catch {
        erro++;
      }
    }

    return message.channel.send(`✅ Acessos configurados.\nCanais alterados: ${ok}\nErros: ${erro}`);
  }

  if (msg === "!painel") {
    return message.channel.send(`
📌 **PAINEL ASTRAL**

📢 **CARDÁPIO**
!cardapio
!combos
!comboingresso
!filmes
!reservas
!ingressos
!divulgarcombos
!divulgarfilmes

🌑 **EFEITOS**
!efeito
!invocar

📋 **GERENCIAR**
!listar

🍿 **Comidas**
!addcomida Nome — R$ valor
!remcomida número

🥤 **Bebidas**
!addbebida Nome — R$ valor
!rembebida número

🎟️ **Ingressos**
!addingresso Nome — R$ valor
!remingresso número

🌑 **Combos**
!addcombo Nome do combo
!remcombo número

🎬 **Combo + Ingresso**
!addcomboingresso Nome do pacote
!remcomboingresso número

🎬 **Filmes**
!addfilme Nome do filme — dia — horário
!remfilme número

🎟️ **Reservas**
!addreserva Nome da reserva
!remreserva número

🔒 **Permissões**
!configuraracessos
`);
  }
});

function embedCardapio() {
  return new EmbedBuilder()
    .setTitle("🍔 ASTRAL CINEMA & SNACKS 🍿")
    .setColor("#ff9900")
    .setDescription(`
🍿 **COMIDAS**
${comidas.join("\n")}

🥤 **BEBIDAS**
${bebidas.join("\n")}

🎟️ **INGRESSOS**
${ingressos.join("\n")}

🌑 **COMBOS TEMÁTICOS**
${combos.join("\n\n")}

🎬 **COMBO + INGRESSO**
${comboIngressos.join("\n\n")}

💰 **Combo normal: R$ 800**
🎟️ **Ingresso Cinema: R$ 200**
💑 **Combo Casal: R$ 2.000**
`);
}

function embedCombos() {
  return new EmbedBuilder()
    .setTitle("🌑 COMBOS TEMÁTICOS DO CINEMA 🌑")
    .setColor("#5b006e")
    .setDescription(`
🍿 **Combos da semana**

${combos.join("\n\n")}
`);
}

function embedComboIngressos() {
  return new EmbedBuilder()
    .setTitle("🎬 COMBO + INGRESSO ASTRAL 🎟️")
    .setColor("#8b0000")
    .setDescription(`
🍿 **Pacotes completos para assistir no Cinema Astral**

${comboIngressos.join("\n\n")}

🌑 Garanta seu combo e sua entrada na sessão!
`);
}

function embedFilmes() {
  return new EmbedBuilder()
    .setTitle("🎬🍿 ASTRAL CINEMA & SNACKS 🍿🎬")
    .setColor("#8b0000")
    .setDescription(`
🌙━━━━━━━━━━━━━━━━━━━━━━🌙
        🎥 CARTAZ OFICIAL 🎥
🌙━━━━━━━━━━━━━━━━━━━━━━🌙

⚠️ As luzes se apagam...
🍿 O cinema abre suas portas...
👁️ E uma nova história começa...

━━━━━━━━━━━━━━━━━━━━━━

🎬 **SOBRENATURAL (2010)**
📅 Sexta-feira
🕗 Horário: 20:00

👻 Uma das franquias de terror mais famosas do mundo.
⚠️ Espíritos, mistérios e acontecimentos sobrenaturais esperam por você.

🍿 Combo Temático: **ALÉM DO VÉU**

━━━━━━━━━━━━━━━━━━━━━━

🎬 **UMA GAROTA, GOLFINHOS E UM DOM SECRETO**
📅 Sábado
🕗 Horário: 20:00

🐬 Emoção, aventura e amizade.

🍿 Combo Temático: **OCEANO ENCANTADO**

━━━━━━━━━━━━━━━━━━━━━━

🎬 **ANJOS DA NOITE: UNDERWORLD**
📅 Domingo
🕕 Horário: 18:00

🧛 Vampiros vs Lobisomens.
⚔️ Uma guerra que atravessa séculos.

🍿 Combo Temático: **CLÃ IMORTAL**

━━━━━━━━━━━━━━━━━━━━━━

🎟️ Ingresso Cinema — R$ 200
🍿 Combo Individual — R$ 800
🎬 Combo + Ingresso — R$ 1.000
💑 Combo Casal Astral — R$ 2.000

━━━━━━━━━━━━━━━━━━━━━━

⚠️ As luzes vão se apagar...
🍿 A sessão vai começar...
👁️ Você está preparado?

📍 ASTRAL CINEMA & SNACKS
🌙 Reserve seu lugar antes do início da sessão!
`);
}

function embedReservas() {
  return new EmbedBuilder()
    .setTitle("🎟️ RESERVAS DE SESSÕES")
    .setColor("#00cc99")
    .setDescription(`
📽️ **Reserve sua vaga antecipadamente**

${reservas.join("\n\n━━━━━━━━━━━━━━━━━━━━━━\n\n")}

🍿 Combos disponíveis
🎟️ Ingresso Cinema — R$ 200

📍 Cinema Astral RP
`);
}

function embedIngressos() {
  return new EmbedBuilder()
    .setTitle("🎟️ INGRESSOS DO CINEMA ASTRAL")
    .setColor("#3366ff")
    .setDescription(`
🎬 **Ingressos disponíveis**

${ingressos.join("\n")}

🍿 Garanta sua entrada no Astral Cinema!
`);
}

function embedDivulgarCombos() {
  return new EmbedBuilder()
    .setTitle("🌑 COMBOS E INGRESSOS EM PROMOÇÃO 🌑")
    .setColor("#5b006e")
    .setDescription(`
🔥 **Combos temáticos disponíveis hoje!**

${combos.join("\n\n")}

🎬 **Combo + Ingresso**
${comboIngressos.join("\n\n")}

🎟️ Garanta sua sessão no Cinema Astral!
`);
}

function embedDivulgarFilmes() {
  return embedFilmes();
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
    .setDescription(item.etapas[0]);

  const m = await canal.send({ embeds: [embed] });

  for (let i = 1; i < item.etapas.length; i++) {
    setTimeout(() => {
      const novoEmbed = new EmbedBuilder()
        .setTitle(`${emoji} ${item.nome}`)
        .setColor(item.cor || "#5b006e")
        .setDescription(item.etapas[i]);

      m.edit({ embeds: [novoEmbed] }).catch(() => {});
    }, i * 3000);
  }

  const tempoApagar = (item.etapas.length - 1) * 3000 + 8000;

  setTimeout(() => {
    m.delete().catch(() => {});
  }, tempoApagar);

  return message.reply("✅ Efeito enviado e vai sumir sozinho.");
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
