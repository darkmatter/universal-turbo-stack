import { createTamagui } from "@tamagui/core";

import { config as baseConfig } from "@acme/tamagui/config";

export const config = createTamagui({
  ...baseConfig,
});

type OurConfig = typeof config;

declare module "tamagui" {
  interface TamaguiCustomConfig extends OurConfig {}
}
