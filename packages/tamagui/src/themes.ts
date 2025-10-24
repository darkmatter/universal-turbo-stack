import { createTamaguiThemesFrom, designSystem } from "./design-system";

// Build Tamagui themes directly from our shared design system
export const themes = createTamaguiThemesFrom(designSystem);
