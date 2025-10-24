"use client";

import React from "react";
import { XStack, YStack } from "tamagui";

import { Button } from "./button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Input } from "./input";
import { Label } from "./label";

// Test component that showcases all our shadcn-style components
export function TestShadcnComponents() {
  return (
    <YStack space="$4" padding="$4" maxWidth={600}>
      {/* Button variants test */}
      <Card>
        <CardHeader>
          <CardTitle>Button Variants</CardTitle>
          <CardDescription>
            All shadcn button variants ported to Tamagui
          </CardDescription>
        </CardHeader>
        <CardContent>
          <YStack space="$3">
            <XStack space="$2" flexWrap="wrap">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
            </XStack>
            <XStack space="$2" flexWrap="wrap">
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </XStack>
            <XStack space="$2" flexWrap="wrap">
              <Button size="sm">Small</Button>
              <Button>Default Size</Button>
              <Button size="lg">Large</Button>
            </XStack>
          </YStack>
        </CardContent>
      </Card>

      {/* Form components test */}
      <Card>
        <CardHeader>
          <CardTitle>Form Components</CardTitle>
          <CardDescription>
            Input and Label components with shadcn styling
          </CardDescription>
        </CardHeader>
        <CardContent>
          <YStack space="$3">
            <YStack space="$2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Enter your email" />
            </YStack>
            <YStack space="$2">
              <Label htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                placeholder="Enter your password"
                secureTextEntry
              />
            </YStack>
            <YStack space="$2">
              <Label htmlFor="message">
                Message
              </Label>
              <Input
                id="message"
                placeholder="Enter your message"
                multiline
                numberOfLines={3}
              />
            </YStack>
          </YStack>
        </CardContent>
        <CardFooter>
          <XStack space="$2" flex={1} justifyContent="flex-end">
            <Button variant="outline">Cancel</Button>
            <Button>Submit</Button>
          </XStack>
        </CardFooter>
      </Card>

      {/* Card variants test */}
      <XStack space="$4" flexWrap="wrap">
        <Card flex={1} minWidth={200}>
          <CardHeader>
            <CardTitle>Simple Card</CardTitle>
            <CardDescription>A basic card example</CardDescription>
          </CardHeader>
          <CardContent>
            <YStack space="$2">
              <Label>Status</Label>
              <Button variant="secondary" size="sm">
                Active
              </Button>
            </YStack>
          </CardContent>
        </Card>

        <Card flex={1} minWidth={200}>
          <CardHeader>
            <CardTitle>Another Card</CardTitle>
            <CardDescription>With different content</CardDescription>
          </CardHeader>
          <CardContent>
            <YStack space="$3">
              <Input placeholder="Quick input" />
              <Button variant="ghost" size="sm">
                Ghost Button
              </Button>
            </YStack>
          </CardContent>
        </Card>
      </XStack>

      {/* Disabled states test */}
      <Card>
        <CardHeader>
          <CardTitle>Disabled States</CardTitle>
          <CardDescription>
            Testing disabled states for components
          </CardDescription>
        </CardHeader>
        <CardContent>
          <YStack space="$3">
            <XStack space="$2" flexWrap="wrap">
              <Button disabled>Disabled Default</Button>
              <Button variant="outline" disabled>
                Disabled Outline
              </Button>
              <Button variant="secondary" disabled>
                Disabled Secondary
              </Button>
            </XStack>
            <YStack space="$2">
              <Label htmlFor="disabled-input">Disabled Input</Label>
              <Input
                id="disabled-input"
                placeholder="This input is disabled"
                disabled
              />
            </YStack>
          </YStack>
        </CardContent>
      </Card>
    </YStack>
  );
}

// Individual component demos for easier testing
export function ButtonDemo() {
  return (
    <YStack space="$4" padding="$4">
      <XStack space="$2" flexWrap="wrap">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </XStack>
    </YStack>
  );
}

export function CardDemo() {
  return (
    <YStack padding="$4">
      <Card maxWidth={400}>
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>
            Enter your details below to create your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <YStack space="$3">
            <YStack space="$2">
              <Label htmlFor="create-email">Email</Label>
              <Input id="create-email" placeholder="m@example.com" />
            </YStack>
            <YStack space="$2">
              <Label htmlFor="create-password">Password</Label>
              <Input id="create-password" secureTextEntry />
            </YStack>
          </YStack>
        </CardContent>
        <CardFooter>
          <Button flex={1}>Create account</Button>
        </CardFooter>
      </Card>
    </YStack>
  );
}

export function InputDemo() {
  return (
    <YStack space="$4" padding="$4" maxWidth={400}>
      <YStack space="$2">
        <Label>Default Input</Label>
        <Input placeholder="Type something..." />
      </YStack>
      <YStack space="$2">
        <Label>Email Input</Label>
        <Input placeholder="Enter email" />
      </YStack>
      <YStack space="$2">
        <Label>Password Input</Label>
        <Input placeholder="Enter password" secureTextEntry />
      </YStack>
      <YStack space="$2">
        <Label>Multiline Input</Label>
        <Input placeholder="Enter message" multiline numberOfLines={3} />
      </YStack>
      <YStack space="$2">
        <Label>Disabled Input</Label>
        <Input placeholder="Disabled" disabled />
      </YStack>
    </YStack>
  );
}
