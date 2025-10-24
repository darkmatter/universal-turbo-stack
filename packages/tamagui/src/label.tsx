"use client";

import React from "react";
import { GetProps, styled } from "@tamagui/core";
import { Text } from "tamagui";

// Base Label styled component (removing size variants to match shadcn)
const LabelBase = styled(Text, {
  name: "ShadcnLabel",

  // Exact shadcn styling: text-sm font-medium leading-none
  fontSize: "$3", // text-sm
  fontWeight: "500", // font-medium
  lineHeight: 1, // leading-none

  userSelect: "none",
  color: "$foreground",

  // Peer-disabled styles (simulated since we don't have Radix primitives)
  variants: {
    disabled: {
      true: {
        cursor: "not-allowed",
        opacity: 0.7,
      },
    },
  } as const,
});

// Main Label component with proper types (no size variants to match shadcn)
interface ShadcnLabelProps extends GetProps<typeof Text> {
  htmlFor?: string;
  disabled?: boolean;
}

export const Label = React.forwardRef<
  React.ElementRef<typeof Text>,
  ShadcnLabelProps
>(({ disabled, ...props }, ref) => {
  return <LabelBase ref={ref} disabled={disabled} {...props} />;
});

Label.displayName = "Label";

export type LabelProps = ShadcnLabelProps;
