import { Command } from "@cliffy/command";
import { registerCreateCognitoUserCommand } from "./commands/createCognitoUser.ts";

const mainCommand = new Command()
  .name("aws-util-tools")
  .version("1.0.0")
  .description("AWS ユーティリティツール");

// 各コマンドを登録
registerCreateCognitoUserCommand(mainCommand);

// コマンドを実行
await mainCommand.parse(Deno.args);
