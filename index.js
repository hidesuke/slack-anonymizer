const { WebClient } = require('@slack/web-api');

const challenge = (payload, res) => res.status(200).json({ 'challenge': payload.challenge });

const IGNORE_SUBTYPES = ['bot_message', 'channel_join', 'channel_leave', 'channel_topic', 'channel_purpose', 'file_share', 'pinned_item', 'message_deleted', 'message_changed'];

const deleteMessage = async (payload) => {
  const client = new WebClient(process.env.SLACK_OAUTH_ACCESS_TOKEN);
  await client.chat.delete({
    channel: payload.event.channel,
    ts: payload.event.ts,
    as_user: true,
  });
};

const postMessage = async (payload) => {
  const client = new WebClient(process.env.SLACK_BOT_USER_OAUTH_ACCESS_TOKEN);
  const options = {
    channel: payload.event.channel,
    text: payload.event.text,
    icon_emoji: ':popuko:',
    username: 'anonymous',
  };
  if (payload.event.thread_ts) options.thread_ts = payload.event.thread_ts;
  if (payload.event.subtype && payload.event.subtype === 'thread_broadcast') options.reply_broadcast = true;
  await client.chat.postMessage(options);
};

const anonymize = async (payload, res) => {
  if (payload.event.channel !== process.env.HOOK_CHANNEL) return res.status(200).send('OK');
  try {
    await deleteMessage(payload);
    await postMessage(payload);
  } catch (e) {
    console.log(JSON.stringify(e));
  }
  return res.status(200).send('OK');
};

const onRequest = async (req, res) => {
  const payload = req.body;
  if (payload.type === 'url_verification') return challenge(payload, res);
  if (payload.event.channel !== process.env.HOOK_CHANNEL) return res.status(200).send('OK');
  if (payload.event.subtype && IGNORE_SUBTYPES.indexOf(payload.event.subtype) > -1) return res.status(200).send('OK');
  if (payload.event.bot_id) return res.status(200).send('OK');
  console.log(JSON.stringify(payload));
  return await anonymize(payload, res);
};

exports.anonymizer = onRequest;