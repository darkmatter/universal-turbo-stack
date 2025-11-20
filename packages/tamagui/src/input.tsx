"use client";

import React from "react";
import { GetProps, styled } from "@tamagui/core";
import { Input as TamaguiInput } from "tamagui";

// Base Input styled component (removing size variants to match shadcn)
const InputBase = styled(TamaguiInput, {
  name: "ShadcnInput",

  // Base styling to match shadcn exactly
  backgroundColor: "$background",
  borderColor: "$input",
  borderWidth: 1,
  borderRadius: "$2", // rounded-md

  paddingHorizontal: "$3", // px-3
  paddingVertical: "$2", // py-2
  height: "$10", // h-10
  width: "100%", // w-full

  fontSize: "$4", // text-base (responsive will be handled separately)
  color: "$foreground",
  placeholderTextColor: "$mutedForeground",

  // Focus ring matching shadcn's focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
  focusStyle: {
    shadowColor: "$ring",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    borderColor: "$ring",
    borderWidth: 2,
    outlineWidth: 0,
  },

  disabledStyle: {
    cursor: "not-allowed",
    opacity: 0.5,
  },
});

// Main Input component with proper types (no size variants to match shadcn)
interface ShadcnInputProps extends GetProps<typeof TamaguiInput> {
  // Add web-specific props
  type?: string;
}

export const Input = React.forwardRef<
  React.ElementRef<typeof TamaguiInput>,
  ShadcnInputProps
>((props, ref) => {
  return <InputBase ref={ref} {...props} />;
});

Input.displayName = "Input";

export type InputProps = ShadcnInputProps;
