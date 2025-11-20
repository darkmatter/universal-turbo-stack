"use client";

import React from "react";

import { TestShadcnComponents, validateThemes, YStack } from "@acme/tamagui";
import { NextTamaguiProvider } from "@/components/NextTamaguiProvider";

export default function TamaguiTestPage() {
  React.useEffect(() => {
    // Run validation on component mount
    validateThemes();
  }, []);

  return (
    <NextTamaguiProvider>
      <YStack padding="$4" space="$4">
        <TestShadcnComponents />
      </YStack>
    </NextTamaguiProvider>
  );
}
