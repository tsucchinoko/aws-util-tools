# AWS Util Tools!

AWS の IAM グループの作成や IAM ユーザーの作成などを行うツールです。

## コマンドのインストール

### Denoを使用しない場合

1. リリースノートから、自身のPCのアーキテクチャのバイナリをダウンロードしてください。

例) Apple Siliconの場合: `aws-util-tools-darwin-arm64`

2. ダウンロードしたバイナリを`/usr/local/bin`に配置

```
# 任意のコマンド名で配置
cp aws-util-tools-darwin-arm64 /usr/local/bin/<your-command-name>
```

### Denoを使用する場合

1. [Deno](https://docs.deno.com/runtime/) のインストール

```bash
brew install deno
```

もしくは

```bash
curl -fsSL https://deno.land/install.sh | sh
```

2. CLIツールとしてインストール

`--name`で指定した名前でコマンドを実行できるようになります。

```bash
deno install --global --force --name <your-command-name> --import-map deno.json ./main.ts
```

3. `~/.zshrc` に以下のパスを追加

```bash
export PATH="$HOME/.deno/bin:$PATH"
```

```bash
source ~/.zshrc
```

## コマンドの実行

```bash
aws-vault exec <your-profile> -- <your-command-name> --help
```

実行結果

```bash
<your-command-name> -h

  Usage: aws-util-tools
  Version: 1.0.0

  Description:

    AWS ユーティリティツール

  Options:

    -h, --help     - Show this help.
    -V, --version  - Show the version number for this program.

  Commands:

    create-group         - IAM グループを作成
    create-user          - IAM ユーザーを作成
    create-cognito-user  - Cognito ユーザーを作成
```

## その他開発者向け環境構築

[Lefthook](https://lefthook.dev) のインストール(開発者向け)

1. lefthookのインストール

```bash
brew install lefthook
```

2. lefthook の初期化

```bash
lefthook install
```

3. 実行

```bash
lefthook run pre-push
```

## Usage

### Cognito ユーザーの作成

1. 設定ファイルの作成

`samples/create-cognito-user-sample.yaml` を参考に、`yaml`
ファイルを作成してください。

```yaml
# ユーザープールID
pool:
  userPoolId: ap-northeast-1_1234567890
# 作成するユーザー
user:
  username: <your-username>
  email: <your-email>
  emailVerified: true
  password: <your-password>
```

2. ユーザーを作成する

```bash
aws-vault exec <your-profile> -- <your-command-name> create-cognito-user -f <path-to-your-config-file>
```
