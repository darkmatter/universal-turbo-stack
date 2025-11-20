import type { Meta, StoryObj } from "@storybook/react";
import { Bold, Italic, Underline } from "lucide-react-native";
import * as React from "react";
import { View } from "react-native";

import { Text } from "./text";
import { Toggle, ToggleIcon } from "./toggle";

const meta: Meta<typeof Toggle> = {
  title: "UI/Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "outline"],
    },
    size: {
      control: { type: "select" },
      options: ["default", "sm", "lg"],
    },
    pressed: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [pressed, setPressed] = React.useState(false);
    return (
      <Toggle pressed={pressed} onPressedChange={setPressed}>
        <Text>Toggle</Text>
      </Toggle>
    );
  },
};

export const Outline: Story = {
  render: () => {
    const [pressed, setPressed] = React.useState(false);
    return (
      <Toggle variant="outline" pressed={pressed} onPressedChange={setPressed}>
        <Text>Toggle</Text>
      </Toggle>
    );
  },
};

export const Pressed: Story = {
  render: () => {
    const [pressed, setPressed] = React.useState(true);
    return (
      <Toggle pressed={pressed} onPressedChange={setPressed}>
        <Text>Pressed</Text>
      </Toggle>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [pressed, setPressed] = React.useState(false);
    return (
      <Toggle pressed={pressed} onPressedChange={setPressed} disabled>
        <Text>Disabled</Text>
      </Toggle>
    );
  },
};

export const WithIcon: Story = {
  render: () => {
    const [pressed, setPressed] = React.useState(false);
    return (
      <Toggle pressed={pressed} onPressedChange={setPressed}>
        <ToggleIcon as={Bold} size={16} />
      </Toggle>
    );
  },
};

export const WithIconAndText: Story = {
  render: () => {
    const [pressed, setPressed] = React.useState(false);
    return (
      <Toggle pressed={pressed} onPressedChange={setPressed}>
        <ToggleIcon as={Bold} size={16} />
        <Text className="ml-2">Bold</Text>
      </Toggle>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <View className="flex items-center space-x-2">
      <Toggle size="sm" pressed={false} onPressedChange={() => {}}>
        <Text>Small</Text>
      </Toggle>
      <Toggle size="default" pressed={false} onPressedChange={() => {}}>
        <Text>Default</Text>
      </Toggle>
      <Toggle size="lg" pressed={false} onPressedChange={() => {}}>
        <Text>Large</Text>
      </Toggle>
    </View>
  ),
};

export const IconGroup: Story = {
  render: () => (
    <View className="flex items-center space-x-1">
      <Toggle variant="outline" pressed={false} onPressedChange={() => {}}>
        <ToggleIcon as={Bold} size={16} />
      </Toggle>
      <Toggle variant="outline" pressed={false} onPressedChange={() => {}}>
        <ToggleIcon as={Italic} size={16} />
      </Toggle>
      <Toggle variant="outline" pressed={false} onPressedChange={() => {}}>
        <ToggleIcon as={Underline} size={16} />
      </Toggle>
    </View>
  ),
};
