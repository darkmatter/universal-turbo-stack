import { fileURLToPath } from "node:url";

export type SecretsEnvironment = "dev" | "staging" | "prod" | "test";
export type SecretsService = "nextjs" | "auth" | "db";

const root = new URL(".", import.meta.url);

export const getSecretsPath = (
  environment: SecretsEnvironment,
  service: SecretsService,
) => fileURLToPath(new URL(`./${environment}/${service}.yaml`, root));

