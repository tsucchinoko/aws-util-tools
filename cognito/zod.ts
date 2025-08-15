import { z } from "zod";

export const CognitoUserConfigSchema = z.object({
  pool: z.object({
    userPoolId: z.string(),
  }),
  user: z.object({
    username: z.string(),
    email: z.string(),
    emailVerified: z.boolean(),
    password: z.string(),
  }),
});

export type CognitoUserConfig = z.infer<typeof CognitoUserConfigSchema>;
