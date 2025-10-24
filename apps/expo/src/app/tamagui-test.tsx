import React from "react";
import { ScrollView } from "react-native";

import { TestShadcnComponents, validateThemes, YStack } from "@acme/tamagui";
import { TamaguiProvider } from "tamagui";
import { config } from "../../tamagui.config";

export default function TamaguiTestScreen() {
  React.useEffect(() => {
    // Run validation on component mount
    validateThemes();
  }, []);

  return (
    <TamaguiProvider config={config} themeClassNameOnRoot>
      <ScrollView style={{ flex: 1 }}>
        <YStack padding="$4" space="$4">
          <TestShadcnComponents />
        </YStack>
      </ScrollView>
    </TamaguiProvider>
  );
}
