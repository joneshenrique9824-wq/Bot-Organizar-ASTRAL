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

  // APAGAR CANAIS
  for (const channel of guild.channels.cache.values()) {
    try {
      await channel.delete("Reset Astral");
    } catch {}
  }

  // APAGAR CARGOS
  for (const role of guild.roles.cache.values()) {
    if (role.name !== "@everyone" && !role.managed && role.editable) {
      try {
        await role.delete("Reset Astral");
      } catch {}
    }
  }

  await esperar(5000);

  // CARGOS
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

  // GERAL
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

  // CINEMA
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

  // RESTAURANTE
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

  // EVENTOS
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

  // CRIADORES
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

  // STAFF
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

  await esperar(3000);

  // MENSAGENS
  await enviarMsg(guild, "╰┈➤👋・bem-vindos", `🌑 **BEM-VINDO À ASTRAL ROLEPLAY**

Seja bem-vindo(a) à cidade sobrenatural.

📜 Leia as regras
💬 Respeite todos
🎭 Faça um RP de qualidade
🧛 Entre no clima da Astral

Boa estadia! 🩸`);

  await enviarMsg(guild, "╰┈➤📢・avisos", `📢 **AVISOS OFICIAIS**

Todos os comunicados importantes da Astral Roleplay serão enviados aqui.

Fique atento às novidades, eventos e mudanças da cidade.`);

  await enviarMsg(guild, "╰┈➤📜・regras", `📜 **REGRAS DA ASTRAL ROLEPLAY**

• Respeite todos os jogadores
• Proibido toxicidade
• Proibido metagaming
• Proibido power gaming
• Faça RP sério e organizado
• Siga as orientações da staff

Quem quebrar regras poderá receber punição.`);

  await enviarMsg(guild, "╰┈➤💬・chat-geral", `💬 **CHAT GERAL**

Converse com a comunidade, tire dúvidas e interaja com respeito.

Evite spam, brigas e assuntos tóxicos.`);

  await enviarMsg(guild, "╰┈➤🎭・rp-chat", `🎭 **CHAT RP**

Use este canal para combinar cenas, histórias e interações dentro do RP.

Mantenha o clima imersivo da Astral.`);

  await enviarMsg(guild, "╰┈➤📸・midias", `📸 **MÍDIAS**

Envie prints, fotos, edits e momentos marcantes da cidade.

Capriche nas imagens da Astral! 🌑`);

  await enviarMsg(guild, "╰┈➤😂・memes", `😂 **MEMES**

Canal liberado para memes e zoeiras saudáveis.

Sem ofensas, sem brigas e sem conteúdo pesado.`);

  await enviarMsg(guild, "╰┈➤❓・duvidas", `❓ **DÚVIDAS**

Tem alguma dúvida sobre a cidade, regras ou sistemas?

Mande aqui e aguarde alguém da equipe responder.`);

  await enviarMsg(guild, "╰┈➤📢・info-cinema", `🎬 **CINEMA ASTRAL**

Aqui ficam as informações oficiais do Cinema Astral.

Sessões, horários, eventos e novidades serão postados neste espaço.`);

  await enviarMsg(guild, "╰┈➤🎬・programacao", `🎬 **PROGRAMAÇÃO DO CINEMA**

Confira aqui os filmes, sessões e eventos programados.

Fique atento aos horários!`);

  await enviarMsg(guild, "╰┈➤🎞️・filmes-semana", `🎞️ **FILMES DA SEMANA**

Os filmes escolhidos para a semana serão divulgados aqui.

Prepare a pipoca! 🍿`);

  await enviarMsg(guild, "╰┈➤🎟️・reservas", `🎟️ **RESERVAS**

Use este canal para reservar lugar nas sessões.

Modelo:

• Nome:
• ID:
• Sessão:
• Quantidade de pessoas:`);

  await enviarMsg(guild, "╰┈➤📸・fotos-eventos", `📸 **FOTOS DOS EVENTOS**

Envie aqui fotos e registros dos eventos do cinema.`);

  await enviarMsg(guild, "╰┈➤💬・chat-cinema", `💬 **CHAT CINEMA**

Converse sobre filmes, sessões e ideias para eventos.`);

  await enviarMsg(guild, "╰┈➤📢・info-restaurante", `🍿 **RESTAURANTE ASTRAL**

Aqui ficam informações oficiais do restaurante.

Cardápio, pedidos, combos e entregas serão organizados nos canais abaixo.`);

  await enviarMsg(guild, "╰┈➤🍔・cardapio", `🍔 **CARDÁPIO**

Confira aqui os produtos disponíveis no restaurante.

Aguarde atualizações da equipe.`);

  await enviarMsg(guild, "╰┈➤🥤・pedidos", `🥤 **PEDIDOS**

Faça seu pedido usando o modelo:

• Nome:
• ID:
• Pedido:
• Forma de pagamento:
• Retirada ou entrega:`);

  await enviarMsg(guild, "╰┈➤💰・combos", `💰 **COMBOS**

Promoções e combos especiais serão postados aqui.

Fique atento às ofertas!`);

  await enviarMsg(guild, "╰┈➤📦・entregas", `📦 **ENTREGAS**

Canal destinado para organizar entregas do restaurante.

Aguarde um entregador responder.`);

  await enviarMsg(guild, "╰┈➤💬・chat-restaurante", `💬 **CHAT RESTAURANTE**

Converse com a equipe do restaurante e tire dúvidas sobre pedidos.`);

  await enviarMsg(guild, "╰┈➤🌕・lua-sangrenta", `🌕 **EVENTO LUA SANGRENTA**

Canal dedicado aos eventos de Lua Sangrenta da Astral.

Prepare-se para o sobrenatural.`);

  await enviarMsg(guild, "╰┈➤🧛・noite-vampiros", `🧛 **NOITE DOS VAMPIROS**

Eventos, histórias e encontros vampíricos serão organizados aqui.`);

  await enviarMsg(guild, "╰┈➤👻・sexta-terror", `👻 **SEXTA DO TERROR**

Prepare-se para eventos sombrios, mistério e muito RP pesado.`);

  await enviarMsg(guild, "╰┈➤🔮・ritual-meia-noite", `🔮 **RITUAL DA MEIA-NOITE**

Canal para eventos místicos, rituais e cenas sobrenaturais.`);

  await enviarMsg(guild, "╰┈➤☠️・apocalipse-astral", `☠️ **APOCALIPSE ASTRAL**

Eventos extremos, caos e sobrevivência serão anunciados aqui.`);

  await enviarMsg(guild, "╰┈➤📢・divulgacoes", `📢 **DIVULGAÇÕES**

Divulgue conteúdos relacionados à Astral Roleplay.

Lives, vídeos, cortes e posts são bem-vindos.`);

  await enviarMsg(guild, "╰┈➤🎬・clips", `🎬 **CLIPS**

Envie aqui seus melhores cortes e momentos da cidade.`);

  await enviarMsg(guild, "╰┈➤📸・screenshots", `📸 **SCREENSHOTS**

Poste prints bonitos, cenas de RP e registros da Astral.`);

  await enviarMsg(guild, "╰┈➤🔥・lives", `🔥 **LIVES**

Divulgue sua live aqui.

Modelo:

• Nome:
• Plataforma:
• Link:
• Conteúdo:`);

  await enviarMsg(guild, "╰┈➤📌・painel-staff", `📌 **PAINEL STAFF**

Canal interno para organização da equipe.

Use com responsabilidade.`);

  await enviarMsg(guild, "╰┈➤📋・relatorios", `📋 **RELATÓRIOS**

Envie relatórios de atendimentos, ocorrências e situações importantes.`);

  await enviarMsg(guild, "╰┈➤⚠️・advertencias", `⚠️ **ADVERTÊNCIAS**

Modelo:

• Nome:
• ID:
• Discord:
• Tipo de advertência:
• Motivo:
• Responsável:`);

  await enviarMsg(guild, "╰┈➤🎫・tickets-staff", `🎫 **TICKETS STAFF**

Canal para controle e acompanhamento de tickets importantes.`);

  await enviarMsg(guild, "╰┈➤📂・logs", `📂 **LOGS**

Canal destinado para registros e informações internas da staff.`);

  console.log("✅ Servidor Astral criado, configurado e mensagens enviadas!");
  process.exit(0);
});

// BOAS-VINDAS NOVOS MEMBROS
client.on("guildMemberAdd", async (member) => {
  const canal = member.guild.channels.cache.find(
    c => c.name === "╰┈➤👋・bem-vindos"
  );

  if (!canal) return;

  canal.send(`🌑 Seja bem-vindo(a), ${member}!

Você entrou na **Astral Roleplay** 🩸

📜 Leia as regras
🎭 Faça um bom RP
🧛 Entre no clima sobrenatural

Boa estadia!`);
});

// FUNÇÕES

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

async function enviarMsg(guild, nomeCanal, mensagem) {
  const canal = guild.channels.cache.find(c => c.name === nomeCanal);

  if (!canal) {
    console.log(`⚠️ Canal não encontrado: ${nomeCanal}`);
    return;
  }

  try {
    await canal.send(mensagem);
    console.log(`✅ Mensagem enviada em: ${nomeCanal}`);
  } catch {
    console.log(`❌ Erro ao enviar mensagem em: ${nomeCanal}`);
  }
}

function esperar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

client.login(process.env.TOKEN);
