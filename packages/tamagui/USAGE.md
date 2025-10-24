# Shadcn to Tamagui Port - Usage Guide

This package provides a complete port of shadcn/ui components to Tamagui, ensuring compatibility with both React Native (Expo) and web (Next.js) applications.

## Installation

In your workspace, the package is already available as `@acme/tamagui`. You can install it in external projects via:

```bash
pnpm add @acme/tamagui @tamagui/core @tamagui/font-inter
```

## Basic Setup

### 1. Configure Tamagui

Create or update your `tamagui.config.ts`:

```typescript
import { config } from "@acme/tamagui/tamagui.config";

export default config;
```

### 2. Provider Setup

#### Next.js (app/layout.tsx)

```tsx
import { TamaguiProvider } from "@acme/tamagui";

import { config } from "../tamagui.config";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TamaguiProvider config={config} defaultTheme="light">
          {children}
        </TamaguiProvider>
      </body>
    </html>
  );
}
```

#### Expo (App.tsx)

```tsx
import { TamaguiProvider } from "@acme/tamagui";

import { config } from "./tamagui.config";

export default function App() {
  return (
    <TamaguiProvider config={config} defaultTheme="light">
      <YourAppContent />
    </TamaguiProvider>
  );
}
```

## Available Components

### Button

```tsx
import { Button } from "@acme/tamagui";

function ButtonExample() {
  return (
    <>
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>

      {/* Size variants */}
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">🚀</Button>
    </>
  );
}
```

### Card

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@acme/tamagui";

function CardExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  );
}
```

### Input & Label

```tsx
import { Input, Label } from "@acme/tamagui";

function FormExample() {
  return (
    <YStack space="$3">
      <YStack space="$2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" placeholder="Enter your email" />
      </YStack>

      <YStack space="$2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          placeholder="Enter your password"
          secureTextEntry // React Native prop
        />
      </YStack>

      {/* Size variants */}
      <Input size="sm" placeholder="Small input" />
      <Input size="lg" placeholder="Large input" />
    </YStack>
  );
}
```

## Theme Variants

The package includes all major shadcn theme variants:

```tsx
// Available themes
const themes = [
  "light",
  "dark", // Default neutral
  "light_stone",
  "dark_stone", // Stone variant
  "light_zinc",
  "dark_zinc", // Zinc variant
  "light_gray",
  "dark_gray", // Gray variant
  "light_slate",
  "dark_slate", // Slate variant
];

// Switch themes
<TamaguiProvider config={config} defaultTheme="light_zinc">
  <App />
</TamaguiProvider>;
```

## Complete Example

```tsx
import React from "react";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  XStack,
  YStack,
} from "@acme/tamagui";

export function LoginForm() {
  return (
    <YStack padding="$4" space="$4" maxWidth={400} marginHorizontal="auto">
      <Card>
        <CardHeader>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <YStack space="$4">
            <YStack space="$2">
              <Label htmlFor="login-email">Email</Label>
              <Input id="login-email" placeholder="name@example.com" />
            </YStack>

            <YStack space="$2">
              <Label htmlFor="login-password">Password</Label>
              <Input
                id="login-password"
                placeholder="Enter your password"
                secureTextEntry
              />
            </YStack>
          </YStack>
        </CardContent>

        <CardFooter>
          <XStack space="$2" flex={1}>
            <Button variant="outline" flex={1}>
              Cancel
            </Button>
            <Button flex={1}>Sign In</Button>
          </XStack>
        </CardFooter>
      </Card>

      <XStack space="$2" justifyContent="center">
        <Button variant="link" size="sm">
          Forgot password?
        </Button>
      </XStack>
    </YStack>
  );
}
```

## Testing Components

The package includes test components to verify the implementation:

```tsx
import {
  TestShadcnComponents,
  ButtonDemo,
  CardDemo,
  InputDemo
} from "@acme/tamagui";

// Full component showcase
<TestShadcnComponents />

// Individual component demos
<ButtonDemo />
<CardDemo />
<InputDemo />
```

## Platform-Specific Notes

### Web (Next.js)

- All components work with standard HTML props
- Focus styles use CSS `outline` properties
- Supports `boxShadow` for cards

### Mobile (React Native/Expo)

- Uses React Native-specific props like `secureTextEntry`
- Focus styles use border color changes
- Shadows use React Native `shadowColor`, `shadowOffset`, etc.

## Theming

The themes are built to match shadcn's CSS variables exactly:

```typescript
// These match shadcn's CSS custom properties
background: 'hsl(var(--background))'         → '$background'
foreground: 'hsl(var(--foreground))'         → '$foreground'
primary: 'hsl(var(--primary))'               → '$primary'
'primary-foreground': 'hsl(var(--primary-foreground))' → '$primaryForeground'
// ... and so on
```

This ensures that designs created with shadcn/ui will look identical when using this Tamagui port.

## Extending Components

You can extend the components using Tamagui's styling system:

```tsx
import { styled } from "@tamagui/core";

import { Button as BaseButton } from "@acme/tamagui";

const CustomButton = styled(BaseButton, {
  backgroundColor: "$purple8",
  borderRadius: "$round",

  variants: {
    gradient: {
      true: {
        background: "linear-gradient(45deg, $purple8, $pink8)",
      },
    },
  },
});
```

## Package Structure

- `src/themes.ts` - All shadcn theme variants
- `src/button.tsx` - Button component with all variants
- `src/card.tsx` - Card component family
- `src/input.tsx` - Input component with size variants
- `src/label.tsx` - Label component
- `src/test-components.tsx` - Demo and test components
- `tamagui.config.ts` - Complete Tamagui configuration
