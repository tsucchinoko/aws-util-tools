import {
  AdminCreateUserCommand,
  AdminSetUserPasswordCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { createCognitoClient } from "./client.ts";
import type { CognitoUserConfig } from "./zod.ts";

/**
 * Cognitoのユーザープールに、`CONFIRMED`なユーザーを作成
 */
export async function createCognitoUser(config: CognitoUserConfig) {
  try {
    const client = createCognitoClient();

    // ユーザーを作成
    const createUserCmd = new AdminCreateUserCommand({
      UserPoolId: config.pool.userPoolId,
      Username: config.user.username,
      UserAttributes: [
        {
          Name: "email",
          Value: config.user.email,
        },
        {
          Name: "email_verified",
          Value: config.user.emailVerified ? "true" : "false",
        },
      ],
      TemporaryPassword: config.user.password,
    });
    await client.send(createUserCmd);

    // ステータスをCONFIRMEDに変更
    const setPasswordCmd = new AdminSetUserPasswordCommand({
      UserPoolId: config.pool.userPoolId,
      Username: config.user.username,
      Password: config.user.password,
      Permanent: true,
    });
    await client.send(setPasswordCmd);

    console.log("✅ User creation process completed successfully!");
  } catch (error) {
    console.error("❌ Error creating user:", error);
    Deno.exit(1);
  }
}
