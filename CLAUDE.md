# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 開発コマンド

このプロジェクトはDenoをランタイムおよびビルドシステムとして使用しています。主要なコマンドは`deno.json`で定義されています：

### CLIの実行
```bash
deno run --allow-read --allow-net --allow-sys --allow-env --allow-run main.ts create-cognito-user
```

または定義済みタスクを使用：
```bash
deno task create-cognito-user
```

### ビルド
```bash
# Mac Intel用ビルド
deno task build:mac-intel

# Mac ARM用ビルド
deno task build:mac-arm

# 全プラットフォーム用ビルド
deno task build:all
```

### コード品質チェック
```bash
# コードフォーマット
deno fmt

# リント
deno lint --fix

# 型チェック
deno check **/*.ts

# ロックファイル整合性チェック
deno task check-lock
```

### Gitフック
プロジェクトはGitフック用にLefthookを使用しています。pre-pushフックで以下を実行：
- `deno task check-lock`
- `deno fmt`
- `deno lint --fix`
- `deno check **/*.ts`

## アーキテクチャ

AWS CognitoユーザーマネジメントにフォーカスしたAWSユーティリティツールを提供するDeno製TypeScript CLIアプリケーションです。

### コア構造
- `main.ts` - @cliffy/commandを使用したCLIのエントリーポイント
- `commands/` - コマンド実装（現在は`createCognitoUser.ts`のみ）
- `cognito/` - Cognito固有の機能モジュール

### 主要コンポーネント

**コマンド登録パターン**
各コマンドは`commands/`の独立したモジュールとして実装され、以下のパターンの登録関数をエクスポート：
```typescript
export function registerXxxCommand(parentCommand: Command): void
```

**AWSクライアント管理**
- `cognito/client.ts` - 環境変数ベースの認証情報でAWS Cognitoクライアントを作成
- 標準のAWS環境変数を使用（`AWS_REGION`, `AWS_ACCESS_KEY_ID`など）

**設定ファイル検証**
- `cognito/zod.ts` - 設定検証用のZodスキーマ定義
- `cognito/validate.ts` - スキーマを使用した検証関数
- 設定ファイルはYAMLベース（`samples/create-cognito-user.yaml`参照）

**ビジネスロジック**
- `cognito/createUser.ts` - Cognitoユーザー作成のコアロジック
- 一時パスワードで作成後、永続パスワードを設定してCONFIRMED状態でユーザーを作成

### 依存関係
- `@cliffy/command` - CLIフレームワーク
- `@aws-sdk/client-cognito-identity-provider` - AWS Cognito SDK
- `@std/yaml` - YAML解析
- `zod` - スキーマ検証

### 設定ファイル
ユーザーは以下の構造のYAML設定ファイルを提供：
```yaml
pool:
  userPoolId: "ap-northeast-1_xxxxxxxxx"
user:
  username: "username"
  email: "email@example.com"
  emailVerified: true
  password: "password"
```