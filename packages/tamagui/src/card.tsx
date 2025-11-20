"use client";

import React from "react";
import { GetProps, styled } from "@tamagui/core";
import { Text, XStack, YStack } from "tamagui";

// Base Card container
export const Card = styled(YStack, {
  name: "Card",

  backgroundColor: "$card",
  borderColor: "$border",
  borderWidth: 1,
  borderRadius: "$4", // rounded-lg

  // No default padding - let child components handle it
  padding: 0,

  // Simple shadow-sm equivalent
  shadowColor: "$shadowColor",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.05,
  shadowRadius: 2,

  // For web - simple shadow-sm
  boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
});

// Card Header
export const CardHeader = styled(YStack, {
  name: "CardHeader",

  flexDirection: "column",
  gap: "$1.5", // space-y-1.5
  padding: "$6", // p-6
});

// Card Title
export const CardTitle = styled(Text, {
  name: "CardTitle",

  fontSize: "$7", // text-2xl (24px)
  fontWeight: "600", // font-semibold
  lineHeight: 1, // leading-none
  color: "$cardForeground",
  letterSpacing: -0.025, // tracking-tight
});

// Card Description
export const CardDescription = styled(Text, {
  name: "CardDescription",

  fontSize: "$3", // text-sm
  color: "$mutedForeground",
  lineHeight: 1.5,
});

// Card Content
export const CardContent = styled(YStack, {
  name: "CardContent",

  padding: "$6", // p-6
  paddingTop: 0, // pt-0
});

// Card Footer
export const CardFooter = styled(XStack, {
  name: "CardFooter",

  alignItems: "center",
  padding: "$6", // p-6
  paddingTop: 0, // pt-0
});

export type CardProps = GetProps<typeof Card>;
export type CardHeaderProps = GetProps<typeof CardHeader>;
export type CardTitleProps = GetProps<typeof CardTitle>;
export type CardDescriptionProps = GetProps<typeof CardDescription>;
export type CardContentProps = GetProps<typeof CardContent>;
export type CardFooterProps = GetProps<typeof CardFooter>;

// Enhanced Card components with forwardRef for better React compatibility
export const ShadcnCard = React.forwardRef<
  React.ElementRef<typeof Card>,
  CardProps
>((props, ref) => {
  return <Card ref={ref} {...props} />;
});

export const ShadcnCardHeader = React.forwardRef<
  React.ElementRef<typeof CardHeader>,
  CardHeaderProps
>((props, ref) => {
  return <CardHeader ref={ref} {...props} />;
});

export const ShadcnCardTitle = React.forwardRef<
  React.ElementRef<typeof CardTitle>,
  CardTitleProps
>((props, ref) => {
  return <CardTitle ref={ref} {...props} />;
});

export const ShadcnCardDescription = React.forwardRef<
  React.ElementRef<typeof CardDescription>,
  CardDescriptionProps
>((props, ref) => {
  return <CardDescription ref={ref} {...props} />;
});

export const ShadcnCardContent = React.forwardRef<
  React.ElementRef<typeof CardContent>,
  CardContentProps
>((props, ref) => {
  return <CardContent ref={ref} {...props} />;
});

export const ShadcnCardFooter = React.forwardRef<
  React.ElementRef<typeof CardFooter>,
  CardFooterProps
>((props, ref) => {
  return <CardFooter ref={ref} {...props} />;
});

ShadcnCard.displayName = "ShadcnCard";
ShadcnCardHeader.displayName = "ShadcnCardHeader";
ShadcnCardTitle.displayName = "ShadcnCardTitle";
ShadcnCardDescription.displayName = "ShadcnCardDescription";
ShadcnCardContent.displayName = "ShadcnCardContent";
ShadcnCardFooter.displayName = "ShadcnCardFooter";
