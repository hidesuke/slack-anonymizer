slack-anonymizer
=================

English README is [here](./README.md)

謝辞
----

元ネタは[saitotak](https://github.com/saitota)さんの[SlackAnonymousChannel](https://github.com/saitota/SlackAnonymousChannel) です。

@saitotakさんとmohikanzのanonymousチャンネルの皆様ありがとうございます！

これはなに?
--------------

SlackAnonymousChannel の Node.js 実装です。GCP の CloudFunctionsで動くことを前提にかかれています。

設定
--------

Slackのtokenと匿名化したいチャンネルのIDを`.env.yaml`ファイルを作ってそこに書いてください。

```
SLACK_OAUTH_ACCESS_TOKEN: xoxp-000000000000-000000000000-000000000000-0x0x0x0x0x0x0x0x0x0x0x0x0x0x0x0x
SLACK_BOT_USER_OAUTH_ACCESS_TOKEN: xoxb-000000000000-0x0x0x0x0x0x0x
HOOK_CHANNEL: Cxxxxxxxx
```

Slackの設定については[SlackAnonymousChannel](https://github.com/saitota/SlackAnonymousChannel)のREADMEを参照してください。ただし、前述のREADMEに書いてあるscopeに加えて `chat:write:user` をscopeとして追加する必要があります。


デプロイ方法
--------------

* GCPに新規でプロジェクトをつくりましょう
* `$ gcloud beta functions deploy anonymizer --trigger-http --runtime nodejs10 --project {作ったプロジェクトの名前} --region asia-northeast1`
  * 初回デプロイ時に `.env.yaml` の内容をGCPに登録する必要があります。 `--env-vars-file .env.yaml` をつければいいです。コマンドは以下のようになります。
  * `$ gcloud beta functions deploy anonymizer --env-vars-file .env.yaml --trigger-http --runtime nodejs10 --project {つくったプロジェクトの名前} --region asia-northeast1`