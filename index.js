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
  await guild.channels.fetch();
  await guild.roles.fetch();

  const everyone = guild.roles.everyone;

  console.log("🗑️ Apagando canais antigos...");

  for (const channel of guild.channels.cache.values()) {
    try {
      await channel.delete("Reset Astral Roleplay");
      console.log(`❌ Canal apagado: ${channel.name}`);
    } catch (err) {
      console.log(`⚠️ Não consegui apagar canal: ${channel.name}`);
    }
  }

  console.log("🧹 Apagando cargos antigos...");

  for (const role of guild.roles.cache.values()) {
    if (
      role.name !== "@everyone" &&
      !role.managed &&
      role.editable
    ) {
      try {
        await role.delete("Reset Astral Roleplay");
        console.log(`❌ Cargo apagado: ${role.name}`);
      } catch (err) {
        console.log(`⚠️ Não consegui apagar cargo: ${role.name}`);
      }
    }
  }

  await esperar(5000);

  // =========================
  // 👑 CARGOS
  // =========================

  const dono = await criarCargo(guild, "👑 Dono Astral");
  const admin = await criarCargo(guild, "⚜️ Administração");
  const staff = await criarCargo(guild, "🛡️ Staff");
  const moderador = await criarCargo(guild, "🔨 Moderador");
  const suporte = await criarCargo(guild, "🛠️ Suporte");

  const donoCinema = await criarCargo(guild, "🎬 Dono Cinema");
  const gerenteCinema = await criarCargo(guild, "🎥 Gerente Cinema");
  const equipeCinema = await criarCargo(guild, "🍿 Equipe Cinema");

  const donoRestaurante = await criarCargo(guild, "🍿 Dono Restaurante");
  const gerenteRestaurante = await criarCargo(guild, "🥤 Gerente Restaurante");
  const atendenteRestaurante = await criarCargo(guild, "🍔 Atendente Restaurante");
  const deliveryRestaurante = await criarCargo(guild, "🚚 Delivery Restaurante");

  const organizadorEventos = await criarCargo(guild, "📋 Organizador de Eventos");

  await criarCargo(guild, "🧛 Vampiro");
  await criarCargo(guild, "👻 Caçador");
  await criarCargo(guild, "🔮 Bruxo");
  await criarCargo(guild, "☠️ Sobrevivente");
  await criarCargo(guild, "🌑 Morador Astral");
  await criarCargo(guild, "📸 Fotógrafo Oficial");
  await criarCargo(guild, "🎥 Streamer Oficial");
  await criarCargo(guild, "📱 Influencer");
  await criarCargo(guild, "🌟 VIP");
  await criarCargo(guild, "💎 Booster");
  await criarCargo(guild, "🎮 Player");

  // =========================
  // 🌍 GERAL
  // =========================

  const geral = await criarCategoria(guild, "﹌﹌﹌﹌﹌﹌﹌ 🌍 GERAL ﹌﹌﹌﹌﹌﹌﹌", [
    { id: everyone.id, allow: [PermissionsBitField.Flags.ViewChannel] },
    { id: dono.id, allow: permissoesAdmin() },
    { id: admin.id, allow: permissoesAdmin() },
    { id: staff.id, allow: permissoesMod() },
    { id: moderador.id, allow: permissoesMod() },
    { id: suporte.id, allow: permissoesMod() }
  ]);

  await criarTexto(guild, "╰┈➤👋・bem-vindos", geral);
  await criarTexto(guild, "╰┈➤📢・avisos", geral);
  await criarTexto(guild, "╰┈➤📜・regras", geral);
  await criarTexto(guild, "╰┈➤💬・chat-geral", geral);
  await criarTexto(guild, "╰┈➤🎭・rp-chat", geral);
  await criarTexto(guild, "╰┈➤📸・midias", geral);
  await criarTexto(guild, "╰┈➤😂・memes", geral);
  await criarTexto(guild, "╰┈➤❓・duvidas", geral);

  await criarVoz(guild, "╰┈➤🔊・call-geral", geral);
  await criarVoz(guild, "╰┈➤🎙️・bate-papo", geral);

  // =========================
  // 🎬 CINEMA
  // =========================

  const cinema = await criarCategoria(guild, "﹌﹌﹌﹌﹌﹌﹌ 🎬 CINEMA ASTRAL ﹌﹌﹌﹌﹌﹌﹌", [
    { id: everyone.id, allow: [PermissionsBitField.Flags.ViewChannel] },
    { id: dono.id, allow: permissoesAdmin() },
    { id: admin.id, allow: permissoesAdmin() },
    { id: donoCinema.id, allow: permissoesAdmin() },
    { id: gerenteCinema.id, allow: permissoesMod() },
    { id: equipeCinema.id, allow: permissoesBasicas() }
  ]);

  await criarTexto(guild, "╰┈➤📢・info-cinema", cinema);
  await criarTexto(guild, "╰┈➤🎬・programacao", cinema);
  await criarTexto(guild, "╰┈➤🎞️・filmes-semana", cinema);
  await criarTexto(guild, "╰┈➤🎟️・reservas", cinema);
  await criarTexto(guild, "╰┈➤📸・fotos-eventos", cinema);
  await criarTexto(guild, "╰┈➤💬・chat-cinema", cinema);

  await criarVoz(guild, "╰┈➤🎥・sala-cinema", cinema);
  await criarVoz(guild, "╰┈➤🍿・sessao-vip", cinema);
  await criarVoz(guild, "╰┈➤🎤・reuniao-cinema", cinema);

  // =========================
  // 🍿 RESTAURANTE
  // =========================

  const restaurante = await criarCategoria(guild, "﹌﹌﹌﹌﹌﹌﹌ 🍿 RESTAURANTE ﹌﹌﹌﹌﹌﹌﹌", [
    { id: everyone.id, allow: [PermissionsBitField.Flags.ViewChannel] },
    { id: dono.id, allow: permissoesAdmin() },
    { id: admin.id, allow: permissoesAdmin() },
    { id: donoRestaurante.id, allow: permissoesAdmin() },
    { id: gerenteRestaurante.id, allow: permissoesMod() },
    { id: atendenteRestaurante.id, allow: permissoesBasicas() },
    { id: deliveryRestaurante.id, allow: permissoesBasicas() }
  ]);

  await criarTexto(guild, "╰┈➤📢・info-restaurante", restaurante);
  await criarTexto(guild, "╰┈➤🍔・cardapio", restaurante);
  await criarTexto(guild, "╰┈➤🥤・pedidos", restaurante);
  await criarTexto(guild, "╰┈➤💰・combos", restaurante);
  await criarTexto(guild, "╰┈➤📦・entregas", restaurante);
  await criarTexto(guild, "╰┈➤💬・chat-restaurante", restaurante);

  await criarVoz(guild, "╰┈➤🍿・call-restaurante", restaurante);

  // =========================
  // 👻 EVENTOS
  // =========================

  const eventos = await criarCategoria(guild, "﹌﹌﹌﹌﹌﹌﹌ 👻 EVENTOS SOBRENATURAIS ﹌﹌﹌﹌﹌﹌﹌", [
    { id: everyone.id, allow: [PermissionsBitField.Flags.ViewChannel] },
    { id: dono.id, allow: permissoesAdmin() },
    { id: admin.id, allow: permissoesAdmin() },
    { id: staff.id, allow: permissoesMod() },
    { id: organizadorEventos.id, allow: permissoesMod() }
  ]);

  await criarTexto(guild, "╰┈➤🌕・lua-sangrenta", eventos);
  await criarTexto(guild, "╰┈➤🧛・noite-vampiros", eventos);
  await criarTexto(guild, "╰┈➤👻・sexta-terror", eventos);
  await criarTexto(guild, "╰┈➤🔮・ritual-meia-noite", eventos);
  await criarTexto(guild, "╰┈➤☠️・apocalipse-astral", eventos);

  await criarVoz(guild, "╰┈➤🕯️・call-eventos", eventos);

  // =========================
  // 🎥 CRIADORES
  // =========================

  const criadores = await criarCategoria(guild, "﹌﹌﹌﹌﹌﹌﹌ 🎥 CRIADORES ﹌﹌﹌﹌﹌﹌﹌", [
    { id: everyone.id, allow: [PermissionsBitField.Flags.ViewChannel] },
    { id: dono.id, allow: permissoesAdmin() },
    { id: admin.id, allow: permissoesAdmin() },
    { id: staff.id, allow: permissoesMod() }
  ]);

  await criarTexto(guild, "╰┈➤📢・divulgacoes", criadores);
  await criarTexto(guild, "╰┈➤🎬・clips", criadores);
  await criarTexto(guild, "╰┈➤📸・screenshots", criadores);
  await criarTexto(guild, "╰┈➤🔥・lives", criadores);

  await criarVoz(guild, "╰┈➤🎙️・podcast", criadores);
  await criarVoz(guild, "╰┈➤📡・live-room", criadores);

  // =========================
  // 🔐 STAFF
  // =========================

  const staffCat = await criarCategoria(guild, "﹌﹌﹌﹌﹌﹌﹌ 🔐 STAFF ﹌﹌﹌﹌﹌﹌﹌", [
    { id: everyone.id, deny: [PermissionsBitField.Flags.ViewChannel] },
    { id: dono.id, allow: permissoesAdmin() },
    { id: admin.id, allow: permissoesAdmin() },
    { id: staff.id, allow: permissoesMod() },
    { id: moderador.id, allow: permissoesMod() },
    { id: suporte.id, allow: permissoesMod() }
  ]);

  await criarTexto(guild, "╰┈➤📌・painel-staff", staffCat);
  await criarTexto(guild, "╰┈➤📋・relatorios", staffCat);
  await criarTexto(guild, "╰┈➤⚠️・advertencias", staffCat);
  await criarTexto(guild, "╰┈➤🎫・tickets-staff", staffCat);
  await criarTexto(guild, "╰┈➤📂・logs", staffCat);

  await criarVoz(guild, "╰┈➤🔐・call-staff", staffCat);

  console.log("✅ Servidor Astral criado e configurado com sucesso!");
  process.exit(0);
});

// =========================
// 🎉 BOAS-VINDAS
// =========================

client.on("guildMemberAdd", async (member) => {
  const canal = member.guild.channels.cache.find(
    c => c.name === "╰┈➤👋・bem-vindos"
  );

  if (!canal) return;

  canal.send(`
🌑 Seja bem-vindo(a), ${member}!

Você entrou na **Astral Roleplay** 🩸

🎬 Cinema Astral
🍿 Restaurante
👻 Eventos sobrenaturais
🎥 Criadores de conteúdo
🧛 Vampiros, mistérios e RP pesado

📜 Leia as regras e aproveite sua estadia!
  `);
});

// =========================
// 🔧 PERMISSÕES
// =========================

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

// =========================
// 🔧 CRIAÇÃO
// =========================

async function criarCargo(guild, nome) {
  return await guild.roles.create({
    name: nome,
    reason: "Sistema Astral Roleplay"
  });
}

async function criarCategoria(guild, nome, permissoes) {
  return await guild.channels.create({
    name: nome,
    type: ChannelType.GuildCategory,
    permissionOverwrites: permissoes
  });
}

async function criarTexto(guild, nome, categoria) {
  return await guild.channels.create({
    name: nome,
    type: ChannelType.GuildText,
    parent: categoria.id
  });
}

async function criarVoz(guild, nome, categoria) {
  return await guild.channels.create({
    name: nome,
    type: ChannelType.GuildVoice,
    parent: categoria.id
  });
}

function esperar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

client.login(process.env.TOKEN);
