import { type CognitoUserConfig, CognitoUserConfigSchema } from "./zod.ts";

/**
 * 設定ファイルのバリデーション。
 * 設定内容が正しい場合は {@link CognitoUserConfig}に型推論される。
 * 設定内容が正しくない場合は {@link Error} が throw される。
 *
 * @param config - 設定ファイルの内容
 * @throws {Error} - バリデーションエラー
 */
export function validateCognitoUserConfig(
  config: unknown,
): asserts config is CognitoUserConfig {
  const result = CognitoUserConfigSchema.safeParse(config);
  if (!result.success) {
    throw new Error(result.error.message);
  }
}
