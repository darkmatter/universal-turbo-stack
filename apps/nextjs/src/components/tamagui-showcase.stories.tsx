import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { Button, Card, H2, Text, XStack, YStack } from "@acme/tamagui";

// Tamagui Button Demo Component
const TamaguiShowcase = () => {
  return (
    <YStack space="$4" padding="$4" maxWidth={600}>
      <H2>Tamagui Components</H2>

      <Card padding="$4" backgroundColor="$background" borderRadius="$4">
        <YStack space="$3">
          <Text fontSize="$6" fontWeight="bold">
            Button Variants
          </Text>

          <XStack space="$3" flexWrap="wrap">
            <Button>Default Button</Button>
            <Button theme="active">Active Button</Button>
            <Button variant="outlined">Outlined</Button>
          </XStack>

          <XStack space="$3" flexWrap="wrap">
            <Button size="$2">Small</Button>
            <Button size="$3">Medium</Button>
            <Button size="$4">Large</Button>
          </XStack>

          <XStack space="$3" flexWrap="wrap">
            <Button
              backgroundColor="$blue9"
              pressStyle={{ backgroundColor: "$blue10" }}
            >
              Custom Blue
            </Button>
            <Button
              backgroundColor="$red9"
              pressStyle={{ backgroundColor: "$red10" }}
            >
              Custom Red
            </Button>
            <Button
              backgroundColor="$green9"
              pressStyle={{ backgroundColor: "$green10" }}
            >
              Custom Green
            </Button>
          </XStack>
        </YStack>
      </Card>

      <Card padding="$4" backgroundColor="$background" borderRadius="$4">
        <YStack space="$3">
          <Text fontSize="$6" fontWeight="bold">
            Interactive States
          </Text>
          <XStack space="$3" flexWrap="wrap">
            <Button disabled opacity={0.5}>
              Disabled
            </Button>
            <Button
              hoverStyle={{ backgroundColor: "$blue8" }}
              pressStyle={{ backgroundColor: "$blue10" }}
            >
              Hover & Press
            </Button>
          </XStack>
        </YStack>
      </Card>
    </YStack>
  );
};

const meta: Meta<typeof TamaguiShowcase> = {
  title: "Tamagui/Showcase",
  component: TamaguiShowcase,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
# Tamagui Component Showcase

This showcase demonstrates Tamagui components with proper styling and theming support:

- **Core Components**: Button, Text, YStack, XStack, Card
- **Theme Support**: Light and dark mode compatibility
- **Interactive States**: Hover, press, and disabled states
- **Responsive Design**: Flexible layout with proper spacing
- **Custom Styling**: Examples of custom colors and variants

## Features

- ✅ **Tamagui Provider**: Properly configured with theme support
- ✅ **CSS Variables**: Using Tamagui design tokens
- ✅ **Cross-Platform**: Components work on web and native
- ✅ **Type Safety**: Full TypeScript support
- ✅ **Performance**: Optimized styling system

Try the dark mode toggle in the toolbar to see theme switching in action!
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InMobileViewport: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile",
    },
  },
};

export const InTabletViewport: Story = {
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
  },
};
