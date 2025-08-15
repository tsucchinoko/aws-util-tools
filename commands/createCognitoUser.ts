import type { Command } from "@cliffy/command";
import { parse as parseYaml } from "@std/yaml";
import { createCognitoUser } from "../cognito/createUser.ts";
import { validateCognitoUserConfig } from "../cognito/validate.ts";

/**
 * Cognito ユーザーを作成するコマンドを登録する
 */
export function registerCreateCognitoUserCommand(parentCommand: Command): void {
  parentCommand
    .command("create-cognito-user", "Cognito ユーザーを作成")
    .option("-f, --file <file:string>", "YAML configuration file path", {
      required: true,
    })
    .action(async (options) => {
      const config = await Deno.readTextFile(options.file);
      const yamlConfig = parseYaml(config);
      validateCognitoUserConfig(yamlConfig);

      await createCognitoUser(yamlConfig);
    });
}
