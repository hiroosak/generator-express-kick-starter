# <%= appname %>

express でサービスを実装するのに使うライブラリ。

# quick start

```
# 設定してないなら入れる
PATH=node_module/.bin/:$PATH
grunt serve
```

**`ToDo`** yeoman-generator を最後に作る

# ディレクトリ構成

**`ToDo`** あとで

# Grunt Task

## コマンド一覧

**`ToDo`** あとで

## test runnner

* [grunt-mocha](https://github.com/kmiyashiro/grunt-mocha) -- クライアント用mocha runnner
* [grunt-mocha-test](https://github.com/pghalliday/grunt-mocha-test) -- サーバーサイド用 mocha runner
* [grunt-istanble](https://github.com/taichi/grunt-istanbul) -- カバレッジ生成

# 各ライブラリ

## core

* [express](http://expressjs.com/) -- ウェブフレームワーク
* [jade](http://jade-lang.com/) -- Nodeテンプレートエンジン
* [sass](http://sass-lang.com/) -- CSS
* [compass](http://compass-style.org/) -- SASS, SCSSをCSSに変換。環境に`gem install compass`が必須

## session

* [connect-redis](https://github.com/visionmedia/connect-redis) -- redisによるセッション管理

## Authentication

* [passport](http://passportjs.org/) -- Authentication汎用ライブラリ
* [passport-facebook](https://github.com/jaredhanson/passport-facebook) -- facebook用 passport strategy
* [passport-twitter](https://github.com/jaredhanson/passport-twitter) -- twitter用 passport strategy

### Token-Based Application

* [express-jwt](https://github.com/auth0/express-jwt)

APIの認証に **Token-Based Authentication** を利用する時に利用。
中では `app/controllers/api/authenticate.js` などで利用。
(後でライブラリ化する)

詳しくは [Cookies vs Tokens. Getting auth right with Angular.JS](https://auth0.com/blog/2014/01/07/angularjs-authentication-with-cookies-vs-token/)参照

## cache

* [redis](https://github.com/mranney/node_redis) -- redisクライアント

## mongodb client

* [mongoose]()

## 外部APIアクセス

* **`ToDo`** facebook client
* **`ToDo`** twitter client

## Cluster, Process monitoring

* [pm2](http://signup.pm2.io/) -- nodeのクラスタリングマネージャ。モニタリングとか死活監視もしてくれる。
    *  `pm2 start processes.json` で起動。
    * global にインストールしないと使えないので, package.jsonに入っていない

## config

* [node-config](https://github.com/lorenwest/node-config) -- configをyamlやjsonで管理

```
config
├── default.yaml     # 共通
├── development.yaml # dev環境
├── production.yaml  # 本番環境
├── runtime.json     # configが変更されると、ここに値が入る
├── staging.yaml     # ステージング環境
└── test.yaml        # テスト環境
```

## Front JavaScript Framework

* **`ToDo`** [AngularJS](https://angularjs.org/)

どっちをサポートするかは決めてない
 
## 静的ファイルサーバー用

* [st](https://github.com/isaacs/st) -- A module for serving static files. Does etags, caching, etc.

## テスト

### サーバーサイド

* [mocha](http://visionmedia.github.io/mocha/) -- テストフレームワーク
* [expect.js](https://github.com/LearnBoost/expect.js) -- expectスタイルのアサーション

## クライアントサイド

* [mocha](http://visionmedia.github.io/mocha/)
* **`ToDo`** karma
  * Backbone使うなら,別のものも検討

## Logger

* [log4js-node](https://github.com/nomiddlename/log4js-node)

## Utility

* [lodash](http://lodash.com/) -- 関数型系なutilityライブラリ
* [async](https://github.com/caolan/async) -- 非同期処理にまつわるutilityライブラリ
* **`ToDo`** user-agent判定の何かを作るか、探す
* [require-directory](https://github.com/troygoode/node-require-directory) -- ディレクトリ内のファイルを一括でrequireするライブラリ
* [express-validator](https://github.com/ctavan/express-validator) -- リクエストパラメータのバリデーションチェック

## ドキュメント

* [swagger-express](https://github.com/fliptoo/swagger-express) -- express用swaggerプラグイン。コードのコメントからAPIドキュメント生成が可能。

## 開発環境

* [nodemon](https://github.com/remy/nodemon) -- 開発環境動作用
* [node-inspector](https://github.com/node-inspector/node-inspector) -- Node.js のデバッグ用

# Bower

* bootstrap

