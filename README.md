# Universal Turbo <!-- omit in toc -->

Opinionated starter for cross-platform React (Native).

This starter is built on top of [Turborepo](https://turborepo.org) and [Nix](https://nixos.org)
for managing environments. Notable parts of the stack consist of the following:

- [Next.js](https://nextjs.org) for web development.
- [Expo](https://expo.dev) for mobile development.
- [tRPC](https://trpc.io) for typesafe API calls.
- [Drizzle](https://orm.drizzle.team) for typesafe database calls.
- [Better-Auth](https://better-auth.com) for authentication.
- [NativeWind](https://www.nativewind.dev) for Tailwind CSS in React Native.
- [React Native Web](https://reactnative.dev) for web support in the Expo app.
- [React Native Reusables](https://github.com/mrzachnugent/react-native-reusables) in a
  ready-to-use `ui` package for cross-platform UI components.
- [Storybook](https://storybook.js.org) for both Expo and Next.js apps.
- [docker-compose](https://docs.docker.com/compose/) pre-configured with Postgres and Redis.
- [fly.io](https://fly.io) for deploying the Next.js app with Postgres and Redis.
- Pre-configured CI with GitHub Actions which will create preview deployments for every PR.


## 1. Getting Started

<details open>

<summary>Quick Start</summary>

### 1.1. 🚀 Quick Start

This repo uses a [Nix](https://nixos.org) flake-based development environment.
Bootstrap everything by running `./install.sh`:

```sh
$ ./install.sh
[installer] kernel=darwin machine=arm64 shell=./install.sh
[installer] nix: nix (Determinate Nix 3.11.3) 2.31.2
✅ Dependencies installed via nix flake dev shell
✅ install.sh completed
```

The installer automatically realises the Nix development environment configured
for this repo. Anything installed in the dev shell does not affect your system
shell. The development shell contains a prepared environment, so you can simply
run `nix develop` (or rely on `direnv`, see below).

</details>

<details open>

<summary>Automatic Activation</summary>

### 1.2. 💎 Automatic Activation

The installer also installed `direnv` - A hook that runs whenever you change
directory `cd` in your terminal. It looks for a file called `.envrc` and
automatically runs it, assuming you allowed permission for that path.

Together with Nix, this enables zero command onboarding and setup, so long as
they are properly configured. They both respect subdirectories as well as layering,
so a base config can live at the repo root, and we can have two apps with different
toolchains that configure themselves when we `cd` into them.

> **Note**
> To have VS Code respect development environments, simply make sure that you
> start VS Code by `cd`'ing into the proper directory, then running the `code`
> command to open the project. This way, you can have multiple VS Code windows
> each with their respective environments activated.


</details>

<details open>

<summary>Directory Structure</summary>

## 2. Directory Structure

This repo uses [Turborepo](https://turborepo.org) and contains:

```
.github
└─ workflows
      └─ CI with pnpm cache setup
.vscode
└─ Recommended extensions and settings for VSCode users
apps
├─ expo
│   ├─ Expo SDK 53
│   ├─ React Native using React 19
│   ├─ Navigation using Expo Router
│   ├─ Tailwind using NativeWind
│   └─ Typesafe API calls using tRPC
└─ next.js
      ├─ Next.js 15
      ├─ React 19
      ├─ Tailwind CSS
      └─ E2E Typesafe API Server & Client
packages
├─ api
│   └─ tRPC v11 router definition
├─ auth
│   └─ Authentication using better-auth.
├─ db
|   └─ Typesafe db calls using Drizzle & Postgres
└─ ui
      └─ Cross-platform UI components using React Native Reusables
tooling
├─ tailwind
│   └─ shared tailwind configuration
└─ typescript
      └─ shared tsconfig you can extend from
```


</details>


<details open>

<summary>

## 3. Environment Variables

</summary>


This repository uses [SOPS](https://getsops.io/) to manage secrets, which supports multiple authentication methods. The included example is configured with [Age](https://github.com/FiloSottile/age). If working in a team environment, I'd recommend combining KMS and Age, so collaborators can use either one. If your team is already using AWS, KMS is nice because no one needs to attain an extra file - they can authenticate with their existing AWS credentials to decrypt.

### 3.1. Configuration

There are 2 locations relevant to environment variables:

1. `packages/env`: Custom package for environment variables which your apps can import as `@acme/env`
2. `secrets/<env>`: Encrypted environment variables that can be safely checked in and shared with collaborators.

To configure encryption, Edit `.sops.yaml` and follow the instructions in the file. Here is the private key for the template (DO NOT REUSE):

```
# created: 2025-10-13T15:53:05-07:00
# public key: age16ltkjsvg29kchlrp3n3sq7wzul0gxh8ydxe5v3lupmnevwuu7v8qdc7v34
AGE-SECRET-KEY-196AXMVQEELVYRTZLWVCHQU75D98E3K98P23LXJWJFS6RFYLZX4XQJ56SAL
```

If you add this to `~/.config/sops/age/keys.txt`, you should be able to decrypt the secrets in this template and run the apps.

### 3.2. VS Code Integration


Once you have a good typechecking setup, the most common source of runtime errors are misconfigured or missing environment variables. To address this, your code should define the schema of expected environment variables in the `@acme/env` package, and the values in `secrets/<env>/<app>.yaml`.

A custom script is included to validate that all required variables are defined, which can be run with `pnpm env:check`. This check is integrated with VS Code's problem matcher. To enable it, Open the command prompt in VS Code and use the 'Run Task' command. You'll see a task named "Env Check (watch)".

When running the task, the included script will automatically run and surface missing environment variables in VS Code's problem matcher. You can include this as a pre-push hook or add it to your CI to prevent any runtime errors due to missing environment variables.



To set environment variables, run `s

To update an envrionment variable, run `sops edit secrets/<env>/<file>`. A static checker is included to surface issues in VS Code's problem matcher if you forget to define any required environment variables.

### 3.3. About SOPS

SOPS is an open-source tool for managing secrets which solves many of the shortcomings that
have existed in similar solutions. Because of this, SOPS is well integrated into
lots of applications, and has become the De Facto solution for both Docker-based
deployments and Kubernetes-based deployments alike.


The following are some of the key features of SOPS that are relevant to this repository:

- **Tight Integration with AWS KMS** - The combination of SOPS and KMS allows you
  to securely run apps from a fresh clone with zero setup, so long as AWS CLI
  is configured already. AWS serves so many companies that most developers
  already have it configured.
- **Portability** - With SOPS, secrets are checked into source control, but encrypted.
  Previous solutions typically required a single shared secret or stored
  metadata separately from the secrets. With SOPS, the file itself contains
  all the metadata needed to decrypt it, and you can use KMS to control
  who has access to the secrets by controlling who has access to the KMS keys.
- **Editor Integration** - SOPS has plugins for many popular editors including
  native Github support. This means that you can view diffs of secrets
  directly in Github, and you can edit secrets in-place directly in your editor
  of choice. No more downloading secrets, editing them, then re-uploading
  them.
- **Multiple Backends** - SOPS supports multiple encryption backends including
  AWS KMS, GCP KMS, Azure Key Vault, PGP, and age. In this repo, we include a
  backup Age key as a recipient in case decryption with KMS is not possible.
- **FIFO Operation** - Sometimes you need a plaintext .env file due to
  limitations of the program you are using. One example is the 'env' field in a
  Docker Compose file. SOPS supports a special mode called exec-file which does
  not expose the plaintext file on disk, yet to the child process, it
  appears as a normal file. This is done by using a FIFO (named pipe) to
  pass the plaintext to the child process. This way, the plaintext is never
  written to disk, and the child process can only read the plaintext once.


</details>


## 4. Auth

### 4.1. Configure Expo dev-script

#### 4.1.1. Use iOS Simulator

1. Make sure you have XCode and XCommand Line Tools installed [as shown on expo docs](https://docs.expo.dev/workflow/ios-simulator).

   > **Note**
   > If you just installed XCode, or if you have updated it, you need to open the simulator manually once. Run `npx expo start` from `apps/expo`, and then enter `I` to launch Expo Go. After the manual launch, you can run `pnpm dev` in the root directory.

   ```diff
   +  "dev": "expo start --ios",
   ```

#### 4.1.2. Use Android Emulator

1. Install Android Studio tools [as shown on expo docs](https://docs.expo.dev/workflow/android-studio-emulator).

2. Change the `dev` script at `apps/expo/package.json` to open the Android emulator.

   ```diff
   +  "dev": "expo start --android",
   ```

3. Run `pnpm dev` at the project root folder.

### 4.2. Run the apps

Run `pnpm dev` at the project root folder. This will start Next.js and Expo in development mode.

#### 4.2.1. Storybook

Storybook is configured to run on both Expo and Next.js.

For Expo, storybook is already configured to run on the iOS simulator. Use the dev menu
to switch to the Storybook UI.

For Next.js, you can run Storybook by running the following command:

```bash
cd apps/nextjs
pnpm storybook
```

### 4.3. Configuring Better-Auth to work with Expo

In order to get Better-Auth to work with Expo, you must either:

#### 4.3.1. Deploy the Auth Proxy (RECOMMENDED)

Better-auth comes with an [auth proxy plugin](https://www.better-auth.com/docs/plugins/oauth-proxy). By deploying the Next.js app, you can get OAuth working in preview deployments and development for Expo apps.

By using the proxy plugin, the Next.js apps will forward any auth requests to the proxy server, which will handle the OAuth flow and then redirect back to the Next.js app. This makes it easy to get OAuth working since you'll have a stable URL that is publicly accessible and doesn't change for every deployment and doesn't rely on what port the app is running on. So if port 3000 is taken and your Next.js app starts at port 3001 instead, your auth should still work without having to reconfigure the OAuth provider.

#### 4.3.2. Add your local IP to your OAuth provider

You can alternatively add your local IP (e.g. `192.168.x.y:$PORT`) to your OAuth provider. This may not be as reliable as your local IP may change when you change networks. Some OAuth providers may also only support a single callback URL for each app making this approach unviable for some providers (e.g. GitHub).

### 4.4. When it's time to add a new package

To add a new package, simply run `pnpm turbo gen init` in the monorepo root. This will prompt you for a package name as well as if you want to install any dependencies to the new package (of course you can also do this yourself later).

The generator sets up the `package.json`, `tsconfig.json` and a `index.ts`, as well as configures all the necessary configurations for tooling around your package such as formatting, linting and typechecking. When the package is created, you're ready to go build out the package.

## 5. FAQ

### 5.1. Does the starter include Solito?

No. Solito will not be included in this repo. It is a great tool if you want to share code between your Next.js and Expo app. However, the main purpose of this repo is not the integration between Next.js and Expo — it's the code splitting of your T3 App into a monorepo. The Expo app is just a bonus example of how you can utilize the monorepo with multiple apps but can just as well be any app such as Vite, Electron, etc.

Integrating Solito into this repo isn't hard, and there are a few [official templates](https://github.com/nandorojo/solito/tree/master/example-monorepos) by the creators of Solito that you can use as a reference.

### 5.2. Does this pattern leak backend code to my client applications?

No, it does not. The `api` package should only be a production dependency in the Next.js application where it's served. The Expo app, and all other apps you may add in the future, should only add the `api` package as a dev dependency. This lets you have full typesafety in your client applications, while keeping your backend code safe.

If you need to share runtime code between the client and server, such as input validation schemas, you can create a separate `shared` package for this and import it on both sides.

## 6. Deployment

### 6.1. Next.js

#### 6.1.1. Prerequisites

> **Note**
> Please note that the Next.js application with tRPC must be deployed in order for the Expo app to communicate with the server in a production environment.

#### 6.1.2. Deploy to Vercel

Let's deploy the Next.js application to [Vercel](https://vercel.com). If you've never deployed a Turborepo app there, don't worry, the steps are quite straightforward. You can also read the [official Turborepo guide](https://vercel.com/docs/concepts/monorepos/turborepo) on deploying to Vercel.

1. Create a new project on Vercel, select the `apps/nextjs` folder as the root directory. Vercel's zero-config system should handle all configurations for you.

2. Add your `POSTGRES_URL` environment variable.

3. Done! Your app should successfully deploy. Assign your domain and use that instead of `localhost` for the `url` in the Expo app so that your Expo app can communicate with your backend when you are not in development.

### 6.2. Auth Proxy

The auth proxy comes as a better-auth plugin. This is required for the Next.js app to be able to authenticate users in preview deployments. The auth proxy is not used for OAuth request in production deployments. The easiest way to get it running is to deploy the Next.js app to vercel.

### 6.3. Expo

Deploying your Expo application works slightly differently compared to Next.js on the web. Instead of "deploying" your app online, you need to submit production builds of your app to app stores, like [Apple App Store](https://www.apple.com/app-store) and [Google Play](https://play.google.com/store/apps). You can read the full [guide to distributing your app](https://docs.expo.dev/distribution/introduction), including best practices, in the Expo docs.

1. Make sure to modify the `getBaseUrl` function to point to your backend's production URL:

   https://github.com/t3-oss/create-t3-turbo/blob/656965aff7db271e5e080242c4a3ce4dad5d25f8/apps/expo/src/utils/api.tsx#L20-L37

2. Let's start by setting up [EAS Build](https://docs.expo.dev/build/introduction), which is short for Expo Application Services. The build service helps you create builds of your app, without requiring a full native development setup. The commands below are a summary of [Creating your first build](https://docs.expo.dev/build/setup).

   ```bash
   # Install the EAS CLI
   pnpm add -g eas-cli

   # Log in with your Expo account
   eas login

   # Configure your Expo app
   cd apps/expo
   eas build:configure
   ```

3. After the initial setup, you can create your first build. You can build for Android and iOS platforms and use different [eas.json build profiles](https://docs.expo.dev/build-reference/eas-json) to create production builds or development, or test builds. Let's make a production build for iOS.

   ```bash
   eas build --platform ios --profile production
   ```

   > **Note**
   > If you don't specify the `--profile` flag, EAS uses the `production` profile by default.

4. Now that you have your first production build, you can submit this to the stores. [EAS Submit](https://docs.expo.dev/submit/introduction) can help you send the build to the stores.

   ```bash
   eas submit --platform ios --latest
   ```

   > **Note**
   > You can also combine build and submit in a single command, using `eas build ... --auto-submit`.

5. Before you can get your app in the hands of your users, you'll have to provide additional information to the app stores. This includes screenshots, app information, privacy policies, etc. *While still in preview*, [EAS Metadata](https://docs.expo.dev/eas/metadata) can help you with most of this information.

6. Once everything is approved, your users can finally enjoy your app. Let's say you spotted a small typo; you'll have to create a new build, submit it to the stores, and wait for approval before you can resolve this issue. In these cases, you can use EAS Update to quickly send a small bugfix to your users without going through this long process. Let's start by setting up EAS Update.

   The steps below summarize the [Getting started with EAS Update](https://docs.expo.dev/eas-update/getting-started/#configure-your-project) guide.

   ```bash
   # Add the `expo-updates` library to your Expo app
   cd apps/expo
   pnpm expo install expo-updates

   # Configure EAS Update
   eas update:configure
   ```

7. Before we can send out updates to your app, you have to create a new build and submit it to the app stores. For every change that includes native APIs, you have to rebuild the app and submit the update to the app stores. See steps 2 and 3.

8. Now that everything is ready for updates, let's create a new update for `production` builds. With the `--auto` flag, EAS Update uses your current git branch name and commit message for this update. See [How EAS Update works](https://docs.expo.dev/eas-update/how-eas-update-works/#publishing-an-update) for more information.

   ```bash
   cd apps/expo
   eas update --auto
   ```

   > **Note**
   > Your OTA (Over The Air) updates must always follow the app store's rules. You can't change your app's primary functionality without getting app store approval. But this is a fast way to update your app for minor changes and bug fixes.

9. Done! Now that you have created your production build, submitted it to the stores, and installed EAS Update, you are ready for anything!

## 7. Background

Initially a fork of [T3 Turbo](https://github.com/t3-oss/create-t3-turbo). It aims to be more batteries-included
with a focus on production-readiness. At this point it is very diverged - some notable differences include:

- The UI package is native-first and cross-compatible: Upstream uses shadcn, so only works in nextjs. This package uses Nativewind + a port of shadcn adapted for Nativewind.
- Anything with lock-in potential is removed, such as defaulting to supabase + vercel + neon pg. It's still compatible, though.
- Avoids using `drizzle push` - this tends to cause migration issues across teams since it directly modifies the db. Instead, uses `generate` + `migrate`.
- Includes storybook for both expo and nextjs
- Includes unit testing frameworks: `vitest` on web, `detox` for expo.
- Pre-configured to use [SOPS](https://github.com/getsops/sops) for managing secrets.
- Includes docker / docker-compose configuration.
