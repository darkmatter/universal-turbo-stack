"use client";

import React from "react";
import { GetProps, styled } from "@tamagui/core";
import { Stack, Text } from "tamagui";

// Define the variant types
type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";
type ButtonSize = "default" | "sm" | "lg" | "icon";

// Custom Button component based on Stack
const ButtonBase = styled(Stack, {
  name: "ShadcnButton",

  // Default styling - matches shadcn exactly
  backgroundColor: "$background",
  borderColor: "$input",
  borderWidth: 1,
  borderRadius: "$2", // rounded-md

  paddingHorizontal: "$4",
  paddingVertical: "$2",
  height: "$10", // h-10
  minWidth: "$10",

  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
  gap: "$2", // gap-2 for icon spacing

  cursor: "pointer",

  // Focus ring similar to shadcn's focus-visible:ring-2
  focusStyle: {
    shadowColor: "$ring",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
    borderColor: "$ring",
    borderWidth: 2,
  },

  disabledStyle: {
    opacity: 0.5,
    cursor: "not-allowed",
    pointerEvents: "none",
  },

  variants: {
    variant: {
      default: {
        backgroundColor: "$primary",
        borderColor: "$primary",
        hoverStyle: {
          backgroundColor: "$primaryHover", // primary/90 equivalent
        },
        pressStyle: {
          backgroundColor: "$primaryHover",
        },
      },
      destructive: {
        backgroundColor: "$destructive",
        borderColor: "$destructive",
        hoverStyle: {
          backgroundColor: "$destructiveHover", // destructive/90 equivalent
        },
        pressStyle: {
          backgroundColor: "$destructiveHover",
        },
      },
      outline: {
        backgroundColor: "$background",
        borderColor: "$input",
        borderWidth: 1,
        hoverStyle: {
          backgroundColor: "$accent",
        },
        pressStyle: {
          backgroundColor: "$accent",
        },
      },
      secondary: {
        backgroundColor: "$secondary",
        borderColor: "$secondary",
        hoverStyle: {
          backgroundColor: "$secondaryHover", // secondary/80 equivalent
        },
        pressStyle: {
          backgroundColor: "$secondaryHover",
        },
      },
      ghost: {
        backgroundColor: "transparent",
        borderColor: "transparent",
        hoverStyle: {
          backgroundColor: "$accent",
        },
        pressStyle: {
          backgroundColor: "$accent",
        },
      },
      link: {
        backgroundColor: "transparent",
        borderColor: "transparent",
        paddingHorizontal: 0,
        height: "auto",
        hoverStyle: {
          backgroundColor: "transparent",
        },
        pressStyle: {
          backgroundColor: "transparent",
        },
      },
    },
    size: {
      default: {
        height: "$10", // h-10
        paddingHorizontal: "$4", // px-4
        paddingVertical: "$2", // py-2
        borderRadius: "$2", // rounded-md
      },
      sm: {
        height: "$9", // h-9
        paddingHorizontal: "$3", // px-3
        borderRadius: "$2", // rounded-md
      },
      lg: {
        height: "$11", // h-11
        paddingHorizontal: "$8", // px-8
        borderRadius: "$2", // rounded-md
      },
      icon: {
        height: "$10", // h-10
        width: "$10", // w-10
        paddingHorizontal: 0,
        paddingVertical: 0,
      },
    },
  } as const,

  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

// Button text component
const ButtonText = styled(Text, {
  name: "ButtonText",
  fontWeight: "500", // font-medium
  textAlign: "center",
  fontSize: "$3", // text-sm base
  color: "$color",
  userSelect: "none",
  whiteSpace: "nowrap",

  variants: {
    variant: {
      default: {
        color: "$primaryForeground",
      },
      destructive: {
        color: "$destructiveForeground",
      },
      outline: {
        color: "$foreground",
      },
      secondary: {
        color: "$secondaryForeground",
      },
      ghost: {
        color: "$foreground",
      },
      link: {
        color: "$primary",
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textUnderlineOffset: "$1", // underline-offset-4 equivalent
      },
    },
    size: {
      default: {
        fontSize: "$3", // text-sm
      },
      sm: {
        fontSize: "$3", // text-sm
      },
      lg: {
        fontSize: "$3", // text-sm
      },
      icon: {
        fontSize: "$3", // text-sm
      },
    },
  } as const,

  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

// Main Button component with proper types
interface ShadcnButtonProps extends GetProps<typeof ButtonBase> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: React.ReactNode;
  disabled?: boolean;
  onPress?: () => void;
}

export const Button = React.forwardRef<
  React.ElementRef<typeof ButtonBase>,
  ShadcnButtonProps
>(
  (
    {
      variant = "default",
      size = "default",
      children,
      disabled,
      onPress,
      ...props
    },
    ref,
  ) => {
    return (
      <ButtonBase
        ref={ref}
        variant={variant}
        size={size}
        disabled={disabled}
        onPress={disabled ? undefined : onPress}
        {...props}
      >
        <ButtonText variant={variant} size={size}>
          {children}
        </ButtonText>
      </ButtonBase>
    );
  },
);

Button.displayName = "Button";

export type ButtonProps = ShadcnButtonProps;
