slack-anonymizer
=================

Japanese README is [here](./README.ja.md). Sometimes, Japanese README is more detailed and correct than English version. Sorry for any inconvinience.

Acknowledgment
-----------------

Conncept was taken by [SlackAnonymousChannel](https://github.com/saitota/SlackAnonymousChannel) by [saitotak](https://github.com/saitota).
I would like to say thank you to @saitotak and the residents of mohikanz#anonymous !

What is this?
--------------

SlackAnonymousChannel's Node.js implementation running on GCP CloudFunctions.

Settings
--------

Create `.env.yaml` file on the root directory of this project and set the Slack tokens and channel id which will be annonymized on `.env.yaml`.

```
SLACK_OAUTH_ACCESS_TOKEN: xoxp-000000000000-000000000000-000000000000-0x0x0x0x0x0x0x0x0x0x0x0x0x0x0x0x
SLACK_BOT_USER_OAUTH_ACCESS_TOKEN: xoxb-000000000000-0x0x0x0x0x0x0x
HOOK_CHANNEL: Cxxxxxxxx
```

About Slack settings, please refer [SlackAnonymousChannel](https://github.com/saitota/SlackAnonymousChannel)'s README, however you have to set `chat:write:user` in addition. 

How to deploy
--------------

* Create project on GCP
* `$ gcloud beta functions deploy anonymizer --trigger-http --runtime nodejs10 --project {YOUR_PROJECT_NAME} --region asia-northeast1`
  * When deploying to GCP first time, you have to set envinronment variables. To set env vars, you have to hit the command like below.
  * `$ gcloud beta functions deploy anonymizer --env-vars-file .env.yaml --trigger-http --runtime nodejs10 --project ${YOUR_PROJECT_NAME} --region asia-northeast1`

