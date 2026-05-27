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

  // =========================
  // 🗑️ APAGAR TODOS OS CANAIS
  // =========================

  console.log("🗑️ Apagando canais antigos...");

  for (const channel of guild.channels.cache.values()) {
    try {
      await channel.delete();
      console.log(`❌ Canal apagado: ${channel.name}`);
    } catch (err) {
      console.log(`⚠️ Não consegui apagar: ${channel.name}`);
    }
  }

  // =========================
  // 🧹 APAGAR CARGOS ANTIGOS
  // =========================

  console.log("🧹 Limpando cargos antigos...");

  for (const role of guild.roles.cache.values()) {
    if (
      role.name !== "@everyone" &&
      !role.managed &&
      role.editable
    ) {
      try {
        await role.delete();
        console.log(`❌ Cargo apagado: ${role.name}`);
      } catch (err) {
        console.log(`⚠️ Não consegui apagar cargo: ${role.name}`);
      }
    }
  }

  // Espera evitar bug
  await new Promise(r => setTimeout(r, 5000));

  // =========================
  // 👑 CARGOS
  // =========================

  const dono = await criarCargo(guild, "👑 Dono Astral");
  const admin = await criarCargo(guild, "⚜️ Administração");
  const staff = await criarCargo(guild, "🛡️ Staff");
  const moderador = await criarCargo(guild, "🔨 Moderador");
  const suporte = await criarCargo(guild, "🛠️ Suporte");

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

  const geral = await criarCategoria(guild, "🌍┃GERAL", [
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
  await criarTexto(guild, "🎭┃rp-chat", geral);
  await criarTexto(guild, "📸┃midias", geral);
  await criarTexto(guild, "😂┃memes", geral);
  await criarTexto(guild, "❓┃duvidas", geral);

  await criarVoz(guild, "🔊┃Call Geral", geral);
  await criarVoz(guild, "🎙️┃Bate Papo", geral);

  // =========================
  // 🎬 CINEMA
  // =========================

  const donoCinema = await criarCargo(guild, "🎬 Dono Cinema");
  const gerenteCinema = await criarCargo(guild, "🎥 Gerente Cinema");
  const equipeCinema = await criarCargo(guild, "🍿 Equipe Cinema");

  const cinema = await criarCategoria(guild, "🎬┃CINEMA ASTRAL", [
    { id: everyone.id, allow: [PermissionsBitField.Flags.ViewChannel] },
    { id: donoCinema.id, allow: permissoesAdmin() },
    { id: gerenteCinema.id, allow: permissoesMod() },
    { id: equipeCinema.id, allow: permissoesBasicas() }
  ]);

  await criarTexto(guild, "📢┃info-cinema", cinema);
  await criarTexto(guild, "🎬┃programacao", cinema);
  await criarTexto(guild, "🎞️┃filmes-semana", cinema);
  await criarTexto(guild, "🎟️┃reservas", cinema);
  await criarTexto(guild, "📸┃fotos-eventos", cinema);
  await criarTexto(guild, "💬┃chat-cinema", cinema);

  await criarVoz(guild, "🎥┃Sala Cinema", cinema);
  await criarVoz(guild, "🍿┃Sessão VIP", cinema);

  // =========================
  // 🍿 RESTAURANTE
  // =========================

  const donoSnacks = await criarCargo(guild, "🍿 Dono Snacks");
  const gerenteSnacks = await criarCargo(guild, "🥤 Gerente Snacks");

  const snacks = await criarCategoria(guild, "🍿┃RESTAURANTE", [
    { id: everyone.id, allow: [PermissionsBitField.Flags.ViewChannel] },
    { id: donoSnacks.id, allow: permissoesAdmin() },
    { id: gerenteSnacks.id, allow: permissoesMod() }
  ]);

  await criarTexto(guild, "📢┃info-restaurante", snacks);
  await criarTexto(guild, "🍔┃cardapio", snacks);
  await criarTexto(guild, "🥤┃pedidos", snacks);
  await criarTexto(guild, "💬┃chat-restaurante", snacks);

  await criarVoz(guild, "🍿┃Call Restaurante", snacks);

  // =========================
  // 🔐 STAFF
  // =========================

  const staffCat = await criarCategoria(guild, "🔐┃STAFF", [
    { id: everyone.id, deny: [PermissionsBitField.Flags.ViewChannel] },
    { id: admin.id, allow: permissoesAdmin() },
    { id: staff.id, allow: permissoesMod() },
    { id: moderador.id, allow: permissoesMod() },
    { id: suporte.id, allow: permissoesMod() }
  ]);

  await criarTexto(guild, "📌┃painel-staff", staffCat);
  await criarTexto(guild, "📋┃relatorios", staffCat);
  await criarTexto(guild, "⚠️┃advertencias", staffCat);
  await criarTexto(guild, "📂┃logs", staffCat);

  await criarVoz(guild, "🔐┃Call Staff", staffCat);

  console.log("✅ Astral configurado com sucesso!");

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
    reason: "Sistema Astral"
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

client.login(process.env.TOKEN);
