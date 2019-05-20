const { WebClient } = require('@slack/web-api');

const challenge = (payload, res) => res.status(200).json({ 'challenge': payload.challenge });

const anonymize = async (payload, res) => {
  if (payload.event.channel !== process.env.HOOK_CHANNEL) return res.status(200).send('OK');
  try {
    const deleteClient = new WebClient(process.env.SLACK_OAUTH_ACCESS_TOKEN);
    await deleteClient.chat.delete({
      channel: payload.event.channel,
      ts: payload.event.ts,
      as_user: true,
    });
    const postClient = new WebClient(process.env.SLACK_BOT_USER_OAUTH_ACCESS_TOKEN);
    await postClient.chat.postMessage({
      channel: payload.event.channel,
      text: payload.event.text,
      icon_emoji: ':popuko:',
      username: 'anonymous',
    });
  } catch (e) {
    console.log(JSON.stringify(e));
  }
  return res.status(200).send('OK');
};

const onRequest = async (req, res) => {
  const payload = req.body;
  if (payload.type === 'url_verification') return challenge(payload, res);
  if (payload.event.channel !== process.env.HOOK_CHANNEL) return res.status(200).send('OK');
  if (payload.event.subtype && payload.event.subtype === 'bot_message') return res.status(200).send('OK');
  return await anonymize(payload, res);
};

exports.anonymizer = onRequest;