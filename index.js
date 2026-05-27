const {
  Client,
  GatewayIntentBits,
  ChannelType,
  PermissionsBitField
} = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once("ready", async () => {
  console.log(`✅ Bot online: ${client.user.tag}`);

  const guild = await client.guilds.fetch(process.env.GUILD_ID);

  // ===== CARGOS GERAIS =====
  const donoAstral = await criarCargo(guild, "🌙 Dono Astral");
  const diretorGeral = await criarCargo(guild, "👑 Diretor Geral");
  const admin = await criarCargo(guild, "⚜️ Administração");
  const moderador = await criarCargo(guild, "🔨 Moderador");
  const suporte = await criarCargo(guild, "🛠️ Suporte");
  const atendimento = await criarCargo(guild, "🎫 Atendimento");
  const eventos = await criarCargo(guild, "📋 Organizador de Eventos");
  const vip = await criarCargo(guild, "🌟 VIP");
  const booster = await criarCargo(guild, "💎 Booster");
  const player = await criarCargo(guild, "🎮 Player");
  const visitante = guild.roles.everyone;

  // ===== CARGOS CINEMA =====
  const donoCinema = await criarCargo(guild, "🎬 Dono Cinema");
  const gerenteCinema = await criarCargo(guild, "🎥 Gerente Cinema");
  const equipeCinema = await criarCargo(guild, "🍿 Equipe Cinema");
  const operadorFilmes = await criarCargo(guild, "📽️ Operador de Filmes");

  // ===== CARGOS SNACKS =====
  const donoSnacks = await criarCargo(guild, "🍿 Dono Snacks");
  const gerenteSnacks = await criarCargo(guild, "🥤 Gerente Snacks");
  const atendenteSnacks = await criarCargo(guild, "🍫 Atendente Snacks");
  const deliverySnacks = await criarCargo(guild, "🚚 Delivery Snacks");
  const caixaSnacks = await criarCargo(guild, "💰 Caixa Snacks");

  // ===== CATEGORIA GERAL =====
  const catGeral = await criarCategoria(guild, "🌙 ASTRAL GERAL", [
    { id: visitante.id, allow: [PermissionsBitField.Flags.ViewChannel] },
    { id: admin.id, allow: permissoesAdmin() },
    { id: moderador.id, allow: permissoesMod() },
    { id: suporte.id, allow: permissoesMod() }
  ]);

  await criarTexto(guild, "📢┃avisos", catGeral);
  await criarTexto(guild, "📜┃regras", catGeral);
  await criarTexto(guild, "🎫┃suporte", catGeral);
  await criarTexto(guild, "💬┃chat-geral", catGeral);
  await criarTexto(guild, "📸┃fotos-gerais", catGeral);
  await criarVoz(guild, "🔊┃call-geral", catGeral);
  await criarVoz(guild, "🎙️┃reunião-geral", catGeral);

  // ===== CATEGORIA CINEMA =====
  const catCinema = await criarCategoria(guild, "🎬 CINEMA ASTRAL ROLEPLAY", [
    { id: visitante.id, allow: [PermissionsBitField.Flags.ViewChannel] },
    { id: donoCinema.id, allow: permissoesAdmin() },
    { id: gerenteCinema.id, allow: permissoesMod() },
    { id: equipeCinema.id, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] },
    { id: operadorFilmes.id, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] }
  ]);

  await criarTexto(guild, "📢┃informações-cinema", catCinema);
  await criarTexto(guild, "📜┃regras-cinema", catCinema);
  await criarTexto(guild, "🎬┃programação", catCinema);
  await criarTexto(guild, "🎟️┃reservas-vip", catCinema);
  await criarTexto(guild, "📸┃fotos-eventos", catCinema);
  await criarTexto(guild, "💬┃chat-cinema", catCinema);
  await criarVoz(guild, "🎥┃sala-cinema", catCinema);
  await criarVoz(guild, "🎤┃reunião-cinema", catCinema);

  // ===== CATEGORIA SNACKS =====
  const catSnacks = await criarCategoria(guild, "🍿 ASTRAL SNACKS", [
    { id: visitante.id, allow: [PermissionsBitField.Flags.ViewChannel] },
    { id: donoSnacks.id, allow: permissoesAdmin() },
    { id: gerenteSnacks.id, allow: permissoesMod() },
    { id: atendenteSnacks.id, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] },
    { id: deliverySnacks.id, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] },
    { id: caixaSnacks.id, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] }
  ]);

  await criarTexto(guild, "📢┃informações-snacks", catSnacks);
  await criarTexto(guild, "🍿┃cardápio", catSnacks);
  await criarTexto(guild, "🥤┃pedidos", catSnacks);
  await criarTexto(guild, "💰┃combos-vip", catSnacks);
  await criarTexto(guild, "📦┃entregas", catSnacks);
  await criarTexto(guild, "💬┃chat-snacks", catSnacks);
  await criarVoz(guild, "🍿┃call-snacks", catSnacks);

  console.log("✅ Cargos e salas criados com sucesso!");
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

async function criarCargo(guild, nome) {
  let cargo = guild.roles.cache.find(r => r.name === nome);
  if (!cargo) {
    cargo = await guild.roles.create({
      name: nome,
      reason: "Sistema Astral Cinema/Snacks"
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
