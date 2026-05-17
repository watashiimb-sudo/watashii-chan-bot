const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
  ],
});

client.once('clientReady', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('guildMemberAdd', async (member) => {
  const guild = member.guild;

  const welcomeChannelId = process.env.WELCOME_CHANNEL_ID;
  const roleId = process.env.ROLE_ID;

  const results = await Promise.allSettled([
    (async () => {
      if (!welcomeChannelId) {
        throw new Error('WELCOME_CHANNEL_ID is not set');
      }

      const welcomeChannel = await guild.channels.fetch(welcomeChannelId);
      if (!welcomeChannel) {
        throw new Error(`Channel ${welcomeChannelId} not found in guild: ${guild.name}`);
      }

      const memberCount = guild.memberCount;
      const avatarURL = member.user.displayAvatarURL({ dynamic: true, size: 256 });

      const embed = new EmbedBuilder()
        .setColor(0x5865f2)
        .setTitle('Welcome to the server!')
        .setDescription(`Hey <@${member.user.id}>, welcome to **${guild.name}**! We're glad to have you here.`)
        .setThumbnail(avatarURL)
        .addFields(
          { name: 'Username', value: member.user.tag, inline: true },
          { name: 'Member #', value: `#${memberCount}`, inline: true },
        )
        .setFooter({ text: `${guild.name}`, iconURL: guild.iconURL({ dynamic: true }) ?? undefined })
        .setTimestamp();

      await welcomeChannel.send({ embeds: [embed] });
      console.log(`Welcome message sent for ${member.user.tag} (member #${memberCount})`);
    })(),

    (async () => {
      if (!roleId) {
        throw new Error('ROLE_ID is not set');
      }

      const role = await guild.roles.fetch(roleId);
      if (!role) {
        throw new Error(`Role ${roleId} not found in guild: ${guild.name}`);
      }

      await member.roles.add(role);
      console.log(`Assigned role "${role.name}" to ${member.user.tag}`);
    })(),
  ]);

  for (const result of results) {
    if (result.status === 'rejected') {
      console.error(`Error: ${result.reason?.message ?? result.reason}`);
    }
  }
});

const token = process.env.TOKEN;
if (!token) {
  console.error('ERROR: TOKEN environment variable is not set.');
  process.exit(1);
}

client.login(token);
