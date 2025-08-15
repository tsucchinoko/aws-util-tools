import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";

/**
 * {@link CognitoIdentityProviderClient} を生成する。
 */
export function createCognitoClient(): CognitoIdentityProviderClient {
  return new CognitoIdentityProviderClient({
    region: Deno.env.get("AWS_REGION") || "ap-northeast-1",
    credentials: {
      accessKeyId: Deno.env.get("AWS_ACCESS_KEY_ID") || "",
      secretAccessKey: Deno.env.get("AWS_SECRET_ACCESS_KEY") || "",
      sessionToken: Deno.env.get("AWS_SESSION_TOKEN") || "",
    },
  });
}
