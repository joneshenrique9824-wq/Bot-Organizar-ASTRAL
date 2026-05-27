// 🌑 ASTRAL ROLEPLAY ULTRA SETUP
// APAGA TODOS OS CANAIS ANTIGOS E CRIA O SERVIDOR NOVO ORGANIZADO

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
  console.log(`🌙 Bot online: ${client.user.tag}`);

  const guild = await client.guilds.fetch(process.env.GUILD_ID);

  // ==================================================
  // 🗑️ APAGAR TODOS OS CANAIS
  // ==================================================

  console.log("🗑️ Apagando canais antigos...");

  for (const channel of guild.channels.cache.values()) {
    try {
      await channel.delete();
      console.log(`❌ Canal apagado: ${channel.name}`);
    } catch (err) {
      console.log(`Erro ao apagar ${channel.name}`);
    }
  }

  // ==================================================
  // 🗑️ APAGAR CARGOS ANTIGOS
  // ==================================================

  console.log("🗑️ Apagando cargos antigos...");

  for (const role of guild.roles.cache.values()) {

    if (
      role.name !== "@everyone" &&
      role.editable
    ) {
      try {
        await role.delete();
        console.log(`❌ Cargo apagado: ${role.name}`);
      } catch (err) {
        console.log(`Erro ao apagar cargo ${role.name}`);
      }
    }
  }

  const everyone = guild.roles.everyone;

  // ==================================================
  // 👑 CARGOS STAFF
  // ==================================================

  const dono = await criarCargo(guild, "👑 Dono Astral");
  const fundador = await criarCargo(guild, "🌑 Fundador");
  const admin = await criarCargo(guild, "⚜️ Administração");
  const staff = await criarCargo(guild, "🛡️ Staff");
  const moderador = await criarCargo(guild, "🔨 Moderador");
  const suporte = await criarCargo(guild, "🛠️ Suporte");
  const atendimento = await criarCargo(guild, "🎫 Atendimento");

  // ==================================================
  // 🌙 CARGOS RP
  // ==================================================

  await criarCargo(guild, "🧛 Vampiro");
  await criarCargo(guild, "👻 Caçador");
  await criarCargo(guild, "🔮 Bruxo");
  await criarCargo(guild, "☠️ Sobrevivente");
  await criarCargo(guild, "🌑 Morador Astral");

  // ==================================================
  // 🎥 MIDIA
  // ==================================================

  await criarCargo(guild, "📸 Fotógrafo Oficial");
  await criarCargo(guild, "🎥 Streamer Oficial");
  await criarCargo(guild, "📱 Influencer");

  // ==================================================
  // 💎 EXTRAS
  // ==================================================

  await criarCargo(guild, "🌟 VIP");
  await criarCargo(guild, "💎 Booster");
  await criarCargo(guild, "🎮 Player");

  // ==================================================
  // 🌍 CATEGORIA GERAL
  // ==================================================

  const geral = await criarCategoria(guild, "🌍┃GERAL", [
    {
      id: everyone.id,
      allow: [PermissionsBitField.Flags.ViewChannel]
    }
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

  // ==================================================
  // 🎬 CINEMA
  // ==================================================

  const cinema = await criarCategoria(guild, "🎬┃CINEMA", [
    {
      id: everyone.id,
      allow: [PermissionsBitField.Flags.ViewChannel]
    }
  ]);

  await criarTexto(guild, "📢┃info-cinema", cinema);
  await criarTexto(guild, "🎞️┃filmes-semana", cinema);
  await criarTexto(guild, "🎟️┃reservas", cinema);
  await criarTexto(guild, "💬┃chat-cinema", cinema);

  await criarVoz(guild, "🎥┃Sala Cinema", cinema);
  await criarVoz(guild, "🍿┃Sessão VIP", cinema);

  // ==================================================
  // 🍿 SNACKS
  // ==================================================

  const snacks = await criarCategoria(guild, "🍿┃SNACKS", [
    {
      id: everyone.id,
      allow: [PermissionsBitField.Flags.ViewChannel]
    }
  ]);

  await criarTexto(guild, "🍔┃cardapio", snacks);
  await criarTexto(guild, "🥤┃pedidos", snacks);
  await criarTexto(guild, "💰┃combos", snacks);

  await criarVoz(guild, "🍿┃Call Snacks", snacks);

  // ==================================================
  // 👻 EVENTOS
  // ==================================================

  const eventos = await criarCategoria(
    guild,
    "👻┃EVENTOS",
    [
      {
        id: everyone.id,
        allow: [PermissionsBitField.Flags.ViewChannel]
      }
    ]
  );

  await criarTexto(guild, "🌕┃lua-sangrenta", eventos);
  await criarTexto(guild, "🧛┃noite-vampiros", eventos);
  await criarTexto(guild, "🔮┃rituais", eventos);

  await criarVoz(guild, "🕯️┃Call Eventos", eventos);

  // ==================================================
  // 🎥 CRIADORES
  // ==================================================

  const creators = await criarCategoria(
    guild,
    "🎥┃CRIADORES",
    [
      {
        id: everyone.id,
        allow: [PermissionsBitField.Flags.ViewChannel]
      }
    ]
  );

  await criarTexto(guild, "📢┃divulgacoes", creators);
  await criarTexto(guild, "🎬┃clips", creators);
  await criarTexto(guild, "📸┃screenshots", creators);

  await criarVoz(guild, "🎙️┃Podcast", creators);

  console.log("✅ SERVIDOR ASTRAL FINALIZADO!");
});

// ==================================================
// 🎉 ENTRADA
// ==================================================

client.on("guildMemberAdd", async (member) => {

  const canal = member.guild.channels.cache.find(
    c => c.name === "👋┃bem-vindos"
  );

  if (!canal) return;

  canal.send(`
🌑 Bem-vindo(a), ${member}

🩸 ASTRAL ROLEPLAY 🩸

🎬 Cinema
🍿 Snacks
👻 Eventos sobrenaturais
🎥 Criadores
🧛 Vampiros & mistérios

📜 Leia as regras!
  `);
});

// ==================================================
// 🔧 FUNÇÕES
// ==================================================

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
