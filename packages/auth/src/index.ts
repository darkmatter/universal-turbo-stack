import { db } from "@acme/db/client";
import { expo } from "@better-auth/expo";
import type { BetterAuthPlugin } from "better-auth";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { oAuthProxy } from "better-auth/plugins";
import { passkey } from "better-auth/plugins/passkey";
import type { SocialProviders } from "better-auth/social-providers";
import { initEmailOTProvider, sendEmail } from "./email";

export type AuthInstance = ReturnType<typeof betterAuth>;

export function initAuth<
  TExtraPlugins extends BetterAuthPlugin[] = [],
>(options: {
  baseUrl: string;
  productionUrl: string;
  secret: string | undefined;
  // Required for email
  sendgridApiKey?: string;
  emailFrom?: string;
  // Social providers
  // These are optional, so you can use the auth without them
  googleClientId?: string;
  googleClientSecret?: string;
  discordClientId?: string;
  discordClientSecret?: string;
  extraPlugins?: TExtraPlugins;
  githubClientId?: string;
  githubClientSecret?: string;
  appleClientId?: string;
  appleClientSecret?: string;
  // Debug mode
  debug?: boolean;
}): AuthInstance {
  const canSendEmail = options.sendgridApiKey && options.emailFrom;

  return betterAuth({
    database: drizzleAdapter(db, {
      provider: "pg",
    }),
    appName: "create-expo-turbo-next",
    baseURL: options.baseUrl,
    secret: options.secret,
    plugins: [
      passkey({}),
      ...(options.sendgridApiKey && options.emailFrom
        ? [
            initEmailOTProvider({
              sendgridApiKey: options.sendgridApiKey,
              emailFrom: options.emailFrom,
              baseUrl: options.baseUrl,
              debug: options.debug,
            }),
          ]
        : []), // Email OTP provider
      // oAuthProxy({
      //   /**
      //    * Auto-inference blocked by https://github.com/better-auth/better-auth/pull/2891
      //    */
      //   currentURL: options.baseUrl,
      //   productionURL: options.productionUrl,
      // }),
      nextCookies(), // "supposed" to be last
      oAuthProxy({
        productionURL: options.productionUrl,
      }),
      expo(),
      ...(options.extraPlugins ?? []),
    ],
    socialProviders: buildSocialProviders(options),
    trustedOrigins: ["expo://"],
    session: {
      expiresIn: 60 * 60 * 24 * 30, // 30 days
      updateAge: 60 * 60 * 24, // 1 day
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60, // 5 minutes
      },
    },
    emailAndPassword: {
      enabled: true,
      autoSignIn: true,
      requireEmailVerification: false,
    },
    emailVerification: {
      sendVerificationEmail: canSendEmail
        ? (data, request) =>
            sendEmail({
              type: "link",
              data: {
                email: data.user.email,
                link: data.url,
              },
              request,
              baseUrl: options.baseUrl,
              sendgridApiKey: options.sendgridApiKey || "",
              emailFrom: options.emailFrom || "",
            })
        : undefined,
    },
    // advanced: {
    //   disableCSRFCheck: true, // Disable CSRF check for better compatibility with Expo
    // }
  }) satisfies AuthInstance;
}

function buildSocialProviders(
  options: Parameters<typeof initAuth>[0],
): SocialProviders {
  // Buid oAuth social providers
  const socialProviders: SocialProviders = {};
  // Google
  if (options.googleClientId && options.googleClientSecret) {
    socialProviders.google = {
      clientId: options.googleClientId,
      clientSecret: options.googleClientSecret,
      redirectURI: `${options.baseUrl}/api/auth/callback/google`,
    };
  }
  if (options.githubClientId && options.githubClientSecret) {
    // GitHub
    socialProviders.github = {
      clientId: options.githubClientId,
      clientSecret: options.githubClientSecret,
      redirectURI: `${options.baseUrl}/api/auth/callback/github`,
    };
  }
  // Discord
  if (options.discordClientId && options.discordClientSecret) {
    socialProviders.discord = {
      clientId: options.discordClientId,
      clientSecret: options.discordClientSecret,
      redirectURI: `${options.baseUrl}/api/auth/callback/discord`,
    };
  }
  // Apple
  if (options.appleClientId && options.appleClientSecret) {
    socialProviders.apple = {
      clientId: options.appleClientId,
      clientSecret: options.appleClientSecret,
      redirectURI: `${options.baseUrl}/api/auth/callback/apple`,
    };
  }
  return socialProviders;
}

// export type Auth = typeof auth;
// export type Session = typeof auth.$Infer.Session;
export type Auth = ReturnType<typeof initAuth>;
export type Session = Auth["$Infer"]["Session"];
