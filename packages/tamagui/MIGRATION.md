# Migration from @acme/ui (react-native-reusables) to @acme/tamagui

This guide outlines a safe path to gradually adopt Tamagui-based components and a shared design system.

## Goals
- Keep Tailwind/web and NativeWind/native workflows.
- Adopt a shared design system (tokens, colors, radius) used by both Tailwind and Tamagui.
- Introduce cross-platform components only where useful, built with Tamagui.

## Steps

1. Install and configure Tamagui
   - Add `@acme/tamagui` to your app dependencies
   - For Next.js, add `@acme/tamagui` to `transpilePackages` and wrap with `NextTamaguiProvider`
   - For Expo, enable `@tamagui/babel-plugin` and wrap with `TamaguiProvider`

2. Keep Tailwind as the primary styling API
   - Continue using `@acme/tailwind-config` for CSS variables
   - The `packages/tamagui/src/design-system.ts` mirrors Tailwind variables and can generate CSS if needed

3. Start replacing select components
   - Replace `@acme/ui` components with `@acme/tamagui` versions where drop-in parity exists (e.g., `Button`, `Card`, `Input`, `Label`)
   - Add new cross-platform components in `@acme/tamagui`

4. Deprecate `@acme/ui` gradually
   - Add deprecation notices in `@acme/ui` README and exports
   - Keep it working during transition; remove as usage reaches zero

## Notes
- `@acme/tamagui` exports a minimal surface area; expand as needs arise
- Use `apps/nextjs/src/app/tamagui-test` and `apps/expo/src/app/tamagui-test` to validate look and feel
