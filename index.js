const {
  Client,
  GatewayIntentBits,
  ChannelType,
  PermissionsBitField
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

client.once("ready", async () => {
  console.log(`✅ Bot online: ${client.user.tag}`);

  const guild = await client.guilds.fetch(process.env.GUILD_ID);
  const everyone = guild.roles.everyone;

  const donoAstral = await criarCargo(guild, "👑 Dono Astral");
  const fundador = await criarCargo(guild, "🌑 Fundador");
  const admin = await criarCargo(guild, "⚜️ Administração");
  const staff = await criarCargo(guild, "🛡️ Staff");
  const moderador = await criarCargo(guild, "🔨 Moderador");
  const suporte = await criarCargo(guild, "🛠️ Suporte");
  const atendimento = await criarCargo(guild, "🎫 Atendimento");
  const eventos = await criarCargo(guild, "📋 Organizador de Eventos");

  const vampiro = await criarCargo(guild, "🧛 Vampiro");
  const cacador = await criarCargo(guild, "👻 Caçador");
  const bruxo = await criarCargo(guild, "🔮 Bruxo");
  const sobrevivente = await criarCargo(guild, "☠️ Sobrevivente");
  const morador = await criarCargo(guild, "🌑 Morador Astral");
  const fotografo = await criarCargo(guild, "📸 Fotógrafo Oficial");
  const streamer = await criarCargo(guild, "🎥 Streamer Oficial");

  const vip = await criarCargo(guild, "🌟 VIP");
  const booster = await criarCargo(guild, "💎 Booster");
  const player = await criarCargo(guild, "🎮 Player");
  const visitante = await criarCargo(guild, "👤 Visitante");

  const donoCinema = await criarCargo(guild, "🎬 Dono Cinema");
  const gerenteCinema = await criarCargo(guild, "🎥 Gerente Cinema");
  const equipeCinema = await criarCargo(guild, "🍿 Equipe Cinema");
  const operadorFilmes = await criarCargo(guild, "📽️ Operador de Filmes");
  const organizadorSessao = await criarCargo(guild, "🎟️ Organizador de Sessões");

  const donoSnacks = await criarCargo(guild, "🍿 Dono Snacks");
  const gerenteSnacks = await criarCargo(guild, "🥤 Gerente Snacks");
  const atendenteSnacks = await criarCargo(guild, "🍫 Atendente Snacks");
  const deliverySnacks = await criarCargo(guild, "🚚 Delivery Snacks");
  const caixaSnacks = await criarCargo(guild, "💰 Caixa Snacks");

  const geral = await criarCategoria(guild, "🌙 ASTRAL GERAL", [
    { id: everyone.id, allow: [PermissionsBitField.Flags.ViewChannel] },
    { id: admin.id, allow: permissoesAdmin() },
    { id: staff.id, allow: permissoesMod() },
    { id: moderador.id, allow: permissoesMod() },
    { id: suporte.id, allow: permissoesMod() }
  ]);

  await criarTexto(guild, "👋┃bem-vindos", geral);
  await criarTexto(guild, "📢┃avisos", geral);
  await criarTexto(guild, "📜┃regras", geral);
  await criarTexto(guild, "💬┃chat-geral", geral);
  await criarTexto(guild, "📸┃fotos-gerais", geral);
  await criarTexto(guild, "🎭┃rp-chat", geral);
  await criarTexto(guild, "🔮┃mistérios", geral);
  await criarVoz(guild, "🔊┃call-geral", geral);
  await criarVoz(guild, "🎙️┃reunião", geral);

  const cinema = await criarCategoria(guild, "🎬 CINEMA ASTRAL ROLEPLAY", [
    { id: everyone.id, allow: [PermissionsBitField.Flags.ViewChannel] },
    { id: donoCinema.id, allow: permissoesAdmin() },
    { id: gerenteCinema.id, allow: permissoesMod() },
    { id: equipeCinema.id, allow: permissoesBasicas() },
    { id: operadorFilmes.id, allow: permissoesBasicas() },
    { id: organizadorSessao.id, allow: permissoesBasicas() }
  ]);

  await criarTexto(guild, "📢┃informações-cinema", cinema);
  await criarTexto(guild, "📜┃regras-cinema", cinema);
  await criarTexto(guild, "🎬┃programação", cinema);
  await criarTexto(guild, "🎞️┃filmes-da-semana", cinema);
  await criarTexto(guild, "🎟️┃reservas-vip", cinema);
  await criarTexto(guild, "📸┃fotos-eventos", cinema);
  await criarTexto(guild, "💬┃chat-cinema", cinema);
  await criarVoz(guild, "🎥┃sala-cinema", cinema);
  await criarVoz(guild, "🎤┃reunião-cinema", cinema);
  await criarVoz(guild, "🍿┃sessão-vip", cinema);

  const snacks = await criarCategoria(guild, "🍿 ASTRAL SNACKS", [
    { id: everyone.id, allow: [PermissionsBitField.Flags.ViewChannel] },
    { id: donoSnacks.id, allow: permissoesAdmin() },
    { id: gerenteSnacks.id, allow: permissoesMod() },
    { id: atendenteSnacks.id, allow: permissoesBasicas() },
    { id: deliverySnacks.id, allow: permissoesBasicas() },
    { id: caixaSnacks.id, allow: permissoesBasicas() }
  ]);

  await criarTexto(guild, "📢┃informações-snacks", snacks);
  await criarTexto(guild, "🍿┃cardápio", snacks);
  await criarTexto(guild, "🥤┃pedidos", snacks);
  await criarTexto(guild, "💰┃combos-vip", snacks);
  await criarTexto(guild, "📦┃entregas", snacks);
  await criarTexto(guild, "💬┃chat-snacks", snacks);
  await criarVoz(guild, "🍿┃call-snacks", snacks);

  const eventosCat = await criarCategoria(guild, "👻 EVENTOS SOBRENATURAIS", [
    { id: everyone.id, allow: [PermissionsBitField.Flags.ViewChannel] },
    { id: admin.id, allow: permissoesAdmin() },
    { id: eventos.id, allow: permissoesMod() },
    { id: staff.id, allow: permissoesMod() }
  ]);

  await criarTexto(guild, "🌕┃lua-sangrenta", eventosCat);
  await criarTexto(guild, "🧛┃noite-dos-vampiros", eventosCat);
  await criarTexto(guild, "👻┃sexta-do-terror", eventosCat);
  await criarTexto(guild, "🔮┃ritual-da-meia-noite", eventosCat);
  await criarTexto(guild, "☠️┃apocalipse-astral", eventosCat);
  await criarTexto(guild, "🌑┃eclipse-sombrio", eventosCat);
  await criarVoz(guild, "🕯️┃call-eventos", eventosCat);

  console.log("✅ Servidor Astral Sobrenatural criado com sucesso!");
});

client.on("guildMemberAdd", async (member) => {
  const canal = member.guild.channels.cache.find(
    c => c.name === "👋┃bem-vindos"
  );

  if (!canal) return;

  canal.send(`🌙 Seja bem-vindo(a), ${member}! 🩸

Você entrou na **Astral Roleplay**, onde a noite nunca dorme.

🎬 Cinema Astral
🍿 Astral Snacks
👻 Eventos sobrenaturais
🧛 RP de vampiros, mistérios e caos

📜 Leia as regras e aproveite sua estadia na cidade!`);
});

function permissoesAdmin() {
  return [
    PermissionsBitField.Flags.ViewChannel,
    PermissionsBitField.Flags.SendMessages,
    PermissionsBitField.Flags.ManageChannels,
    PermissionsBitField.Flags.ManageMessages,
    PermissionsBitField.Flags.Connect,
    PermissionsBitField.Flags.Speak
  ];
}

function permissoesMod() {
  return [
    PermissionsBitField.Flags.ViewChannel,
    PermissionsBitField.Flags.SendMessages,
    PermissionsBitField.Flags.ManageMessages,
    PermissionsBitField.Flags.Connect,
    PermissionsBitField.Flags.Speak
  ];
}

function permissoesBasicas() {
  return [
    PermissionsBitField.Flags.ViewChannel,
    PermissionsBitField.Flags.SendMessages,
    PermissionsBitField.Flags.Connect,
    PermissionsBitField.Flags.Speak
  ];
}

async function criarCargo(guild, nome) {
  let cargo = guild.roles.cache.find(r => r.name === nome);

  if (!cargo) {
    cargo = await guild.roles.create({
      name: nome,
      reason: "Sistema Astral Sobrenatural"
    });
  }

  return cargo;
}

async function criarCategoria(guild, nome, permissoes) {
  let categoria = guild.channels.cache.find(
    c => c.name === nome && c.type === ChannelType.GuildCategory
  );

  if (!categoria) {
    categoria = await guild.channels.create({
      name: nome,
      type: ChannelType.GuildCategory,
      permissionOverwrites: permissoes
    });
  }

  return categoria;
}

async function criarTexto(guild, nome, categoria) {
  if (guild.channels.cache.find(c => c.name === nome)) return;

  await guild.channels.create({
    name: nome,
    type: ChannelType.GuildText,
    parent: categoria.id
  });
}

async function criarVoz(guild, nome, categoria) {
  if (guild.channels.cache.find(c => c.name === nome)) return;

  await guild.channels.create({
    name: nome,
    type: ChannelType.GuildVoice,
    parent: categoria.id
  });
}

client.login(process.env.TOKEN);
