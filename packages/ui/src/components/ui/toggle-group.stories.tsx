import type { Meta, StoryObj } from "@storybook/react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Underline,
} from "lucide-react-native";
import * as React from "react";
import { View } from "react-native";

import { Text } from "./text";
import { ToggleGroup, ToggleGroupIcon, ToggleGroupItem } from "./toggle-group";

const meta: Meta<typeof ToggleGroup> = {
  title: "UI/ToggleGroup",
  component: ToggleGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["single", "multiple"],
    },
    variant: {
      control: { type: "select" },
      options: ["default", "outline"],
    },
    size: {
      control: { type: "select" },
      options: ["default", "sm", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {} as never,
  render: () => {
    const [value, setValue] = React.useState<string[]>([]);
    return (
      <ToggleGroup type="multiple" value={value} onValueChange={setValue}>
        <ToggleGroupItem value="bold">
          <ToggleGroupIcon as={Bold} size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic">
          <ToggleGroupIcon as={Italic} size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline">
          <ToggleGroupIcon as={Underline} size={16} />
        </ToggleGroupItem>
      </ToggleGroup>
    );
  },
};

export const Single: Story = {
  args: {} as never,
  render: () => {
    const [value, setValue] = React.useState("center");
    return (
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={(val) => setValue(val || "")}
      >
        <ToggleGroupItem value="left">
          <ToggleGroupIcon as={AlignLeft} size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem value="center">
          <ToggleGroupIcon as={AlignCenter} size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem value="right">
          <ToggleGroupIcon as={AlignRight} size={16} />
        </ToggleGroupItem>
      </ToggleGroup>
    );
  },
};

export const Outline: Story = {
  args: {} as never,
  render: () => {
    const [value, setValue] = React.useState<string[]>([]);
    return (
      <ToggleGroup
        type="multiple"
        variant="outline"
        value={value}
        onValueChange={setValue}
      >
        <ToggleGroupItem value="bold">
          <ToggleGroupIcon as={Bold} size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic">
          <ToggleGroupIcon as={Italic} size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline">
          <ToggleGroupIcon as={Underline} size={16} />
        </ToggleGroupItem>
      </ToggleGroup>
    );
  },
};

export const WithText: Story = {
  args: {} as never,
  render: () => {
    const [value, setValue] = React.useState("");
    return (
      <ToggleGroup
        type="single"
        variant="outline"
        value={value}
        onValueChange={(val) => setValue(val || "")}
      >
        <ToggleGroupItem value="left">
          <ToggleGroupIcon as={AlignLeft} size={16} />
          <Text className="ml-2">Left</Text>
        </ToggleGroupItem>
        <ToggleGroupItem value="center">
          <ToggleGroupIcon as={AlignCenter} size={16} />
          <Text className="ml-2">Center</Text>
        </ToggleGroupItem>
        <ToggleGroupItem value="right">
          <ToggleGroupIcon as={AlignRight} size={16} />
          <Text className="ml-2">Right</Text>
        </ToggleGroupItem>
      </ToggleGroup>
    );
  },
};

export const Sizes: Story = {
  args: {} as never,
  render: () => (
    <View className="space-y-4">
      <ToggleGroup
        type="multiple"
        size="sm"
        value={[]}
        onValueChange={() => {}}
      >
        <ToggleGroupItem value="bold">
          <ToggleGroupIcon as={Bold} size={14} />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic">
          <ToggleGroupIcon as={Italic} size={14} />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline">
          <ToggleGroupIcon as={Underline} size={14} />
        </ToggleGroupItem>
      </ToggleGroup>

      <ToggleGroup
        type="multiple"
        size="default"
        value={[]}
        onValueChange={() => {}}
      >
        <ToggleGroupItem value="bold">
          <ToggleGroupIcon as={Bold} size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic">
          <ToggleGroupIcon as={Italic} size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline">
          <ToggleGroupIcon as={Underline} size={16} />
        </ToggleGroupItem>
      </ToggleGroup>

      <ToggleGroup
        type="multiple"
        size="lg"
        value={[]}
        onValueChange={() => {}}
      >
        <ToggleGroupItem value="bold">
          <ToggleGroupIcon as={Bold} size={18} />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic">
          <ToggleGroupIcon as={Italic} size={18} />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline">
          <ToggleGroupIcon as={Underline} size={18} />
        </ToggleGroupItem>
      </ToggleGroup>
    </View>
  ),
};

export const Disabled: Story = {
  args: {} as never,
  render: () => {
    const [value, setValue] = React.useState<string[]>([]);
    return (
      <ToggleGroup type="multiple" value={value} onValueChange={setValue}>
        <ToggleGroupItem value="bold">
          <ToggleGroupIcon as={Bold} size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" disabled>
          <ToggleGroupIcon as={Italic} size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline">
          <ToggleGroupIcon as={Underline} size={16} />
        </ToggleGroupItem>
      </ToggleGroup>
    );
  },
};
