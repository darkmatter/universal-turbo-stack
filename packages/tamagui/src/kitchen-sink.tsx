"use client";

import React, { useState } from "react";
import { ScrollView, Text, XStack, YStack } from "tamagui";

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

// Comprehensive Kitchen Sink Demo showcasing all components
export function KitchenSink() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  return (
    <ScrollView>
      <YStack space="$6" padding="$4" maxWidth={1200}>
        {/* Header */}
        <YStack space="$2" alignItems="center">
          <Text fontSize="$8" fontWeight="bold" color="$foreground">
            Tamagui Kitchen Sink
          </Text>
          <Text fontSize="$4" color="$mutedForeground" textAlign="center">
            A comprehensive showcase of all shadcn/ui components ported to Tamagui
          </Text>
        </YStack>

        {/* Button Showcase */}
        <Card>
          <CardHeader>
            <CardTitle>Button Component</CardTitle>
            <CardDescription>
              All button variants with hover states, focus rings, and proper spacing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <YStack space="$4">
              {/* Primary variants */}
              <YStack space="$2">
                <Label>Primary Variants</Label>
                <XStack space="$2" flexWrap="wrap">
                  <Button>Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="destructive">Destructive</Button>
                </XStack>
              </YStack>

              {/* Outline variants */}
              <YStack space="$2">
                <Label>Outline & Ghost Variants</Label>
                <XStack space="$2" flexWrap="wrap">
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link Button</Button>
                </XStack>
              </YStack>

              {/* Sizes */}
              <YStack space="$2">
                <Label>Button Sizes</Label>
                <XStack space="$2" flexWrap="wrap" alignItems="center">
                  <Button size="sm">Small</Button>
                  <Button>Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="icon">⚙</Button>
                </XStack>
              </YStack>

              {/* Disabled states */}
              <YStack space="$2">
                <Label>Disabled States</Label>
                <XStack space="$2" flexWrap="wrap">
                  <Button disabled>Disabled</Button>
                  <Button variant="outline" disabled>Disabled Outline</Button>
                  <Button variant="destructive" disabled>Disabled Destructive</Button>
                </XStack>
              </YStack>
            </YStack>
          </CardContent>
        </Card>

        {/* Card Showcase */}
        <Card>
          <CardHeader>
            <CardTitle>Card Component</CardTitle>
            <CardDescription>
              Flexible card layouts with proper spacing and typography
            </CardDescription>
          </CardHeader>
          <CardContent>
            <XStack space="$4" flexWrap="wrap">
              {/* Simple card */}
              <Card flex={1} minWidth={250}>
                <CardHeader>
                  <CardTitle>Simple Card</CardTitle>
                  <CardDescription>
                    A basic card with header and content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <YStack space="$2">
                    <Text>This is some content inside a card.</Text>
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                  </YStack>
                </CardContent>
              </Card>

              {/* Card with footer */}
              <Card flex={1} minWidth={250}>
                <CardHeader>
                  <CardTitle>Card with Footer</CardTitle>
                  <CardDescription>
                    This card includes a footer section
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Text>Content goes here with proper spacing and typography.</Text>
                </CardContent>
                <CardFooter>
                  <XStack space="$2" flex={1} justifyContent="flex-end">
                    <Button variant="outline">Cancel</Button>
                    <Button>Confirm</Button>
                  </XStack>
                </CardFooter>
              </Card>
            </XStack>
          </CardContent>
        </Card>

        {/* Form Components Showcase */}
        <Card>
          <CardHeader>
            <CardTitle>Form Components</CardTitle>
            <CardDescription>
              Input fields with labels, proper focus states, and validation styling
            </CardDescription>
          </CardHeader>
          <CardContent>
            <YStack space="$4">
              {/* Basic form */}
              <YStack space="$2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                />
              </YStack>

              <YStack space="$2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="Enter your password"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </YStack>

              <YStack space="$2">
                <Label htmlFor="message">Message</Label>
                <Input
                  id="message"
                  placeholder="Enter your message"
                  multiline
                  numberOfLines={4}
                  value={message}
                  onChangeText={setMessage}
                />
              </YStack>

              <YStack space="$2">
                <Label htmlFor="disabled-input">Disabled Input</Label>
                <Input
                  id="disabled-input"
                  placeholder="This input is disabled"
                  disabled
                />
              </YStack>

              <YStack space="$2">
                <Label htmlFor="file-input">File Input</Label>
                <Input
                  id="file-input"
                  placeholder="Choose a file"
                />
              </YStack>

              <XStack space="$2" justifyContent="flex-end">
                <Button variant="outline">Reset</Button>
                <Button>Submit Form</Button>
              </XStack>
            </YStack>
          </CardContent>
        </Card>

        {/* Interactive Examples */}
        <Card>
          <CardHeader>
            <CardTitle>Interactive Examples</CardTitle>
            <CardDescription>
              Real-world usage examples combining multiple components
            </CardDescription>
          </CardHeader>
          <CardContent>
            <YStack space="$4">
              {/* Login form example */}
              <Card>
                <CardHeader>
                  <CardTitle>Login Form</CardTitle>
                  <CardDescription>
                    Complete login form with validation styling
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <YStack space="$3">
                    <YStack space="$2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input
                        id="login-email"
                        placeholder="m@example.com"
                      />
                    </YStack>
                    <YStack space="$2">
                      <Label htmlFor="login-password">Password</Label>
                      <Input
                        id="login-password"
                        placeholder="Password"
                        secureTextEntry
                      />
                    </YStack>
                    <Button variant="link" alignSelf="flex-start">
                      Forgot password?
                    </Button>
                  </YStack>
                </CardContent>
                <CardFooter>
                  <XStack space="$2" flex={1}>
                    <Button variant="outline" flex={1}>
                      Sign Up
                    </Button>
                    <Button flex={1}>Sign In</Button>
                  </XStack>
                </CardFooter>
              </Card>

              {/* Settings card example */}
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                  <CardDescription>
                    User settings with various input types
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <YStack space="$3">
                    <YStack space="$2">
                      <Label htmlFor="display-name">Display Name</Label>
                      <Input
                        id="display-name"
                        placeholder="Enter your display name"
                      />
                    </YStack>
                    <YStack space="$2">
                      <Label htmlFor="bio">Bio</Label>
                      <Input
                        id="bio"
                        placeholder="Tell us about yourself"
                        multiline
                        numberOfLines={3}
                      />
                    </YStack>
                    <XStack space="$2">
                      <Button variant="destructive">Delete Account</Button>
                      <Button variant="outline">Cancel</Button>
                      <Button>Save Changes</Button>
                    </XStack>
                  </YStack>
                </CardContent>
              </Card>
            </YStack>
          </CardContent>
        </Card>

        {/* Theme Showcase */}
        <Card>
          <CardHeader>
            <CardTitle>Theme Compatibility</CardTitle>
            <CardDescription>
              Components adapt to different themes while maintaining design consistency
            </CardDescription>
          </CardHeader>
          <CardContent>
            <YStack space="$3">
              <Text>
                These components work seamlessly with all Tamagui themes and maintain
                the exact visual appearance of shadcn/ui components.
              </Text>
              <XStack space="$2" flexWrap="wrap">
                <Button variant="outline">Light Theme</Button>
                <Button variant="outline">Dark Theme</Button>
                <Button variant="outline">Colored Themes</Button>
              </XStack>
            </YStack>
          </CardContent>
        </Card>

        {/* Footer */}
        <Card>
          <CardContent>
            <YStack space="$2" alignItems="center">
              <Text fontSize="$5" fontWeight="600" color="$foreground">
                🎨 shadcn/ui × Tamagui
              </Text>
              <Text fontSize="$3" color="$mutedForeground" textAlign="center">
                Perfect cross-platform components for React Native and Web
              </Text>
            </YStack>
          </CardContent>
        </Card>
      </YStack>
    </ScrollView>
  );
}

// Individual component demos for focused testing
export function ButtonShowcase() {
  return (
    <YStack space="$4" padding="$4">
      <Text fontSize="$6" fontWeight="600">Button Showcase</Text>
      
      <YStack space="$3">
        <Text fontSize="$4" fontWeight="500">All Variants</Text>
        <XStack space="$2" flexWrap="wrap">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </XStack>
      </YStack>

      <YStack space="$3">
        <Text fontSize="$4" fontWeight="500">All Sizes</Text>
        <XStack space="$2" flexWrap="wrap" alignItems="center">
          <Button size="sm">Small</Button>
          <Button>Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">⚙</Button>
        </XStack>
      </YStack>

      <YStack space="$3">
        <Text fontSize="$4" fontWeight="500">Disabled States</Text>
        <XStack space="$2" flexWrap="wrap">
          <Button disabled>Disabled</Button>
          <Button variant="outline" disabled>Disabled Outline</Button>
          <Button variant="destructive" disabled>Disabled Destructive</Button>
        </XStack>
      </YStack>
    </YStack>
  );
}

export function CardShowcase() {
  return (
    <YStack space="$4" padding="$4">
      <Text fontSize="$6" fontWeight="600">Card Showcase</Text>
      
      <XStack space="$4" flexWrap="wrap">
        <Card flex={1} minWidth={300}>
          <CardHeader>
            <CardTitle>Create project</CardTitle>
            <CardDescription>
              Deploy your new project in one-click.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <YStack space="$3">
              <YStack space="$2">
                <Label htmlFor="project-name">Project Name</Label>
                <Input id="project-name" placeholder="Enter project name" />
              </YStack>
              <YStack space="$2">
                <Label htmlFor="project-description">Description</Label>
                <Input
                  id="project-description"
                  placeholder="Brief description"
                  multiline
                  numberOfLines={3}
                />
              </YStack>
            </YStack>
          </CardContent>
          <CardFooter>
            <XStack space="$2" flex={1} justifyContent="flex-end">
              <Button variant="outline">Cancel</Button>
              <Button>Deploy</Button>
            </XStack>
          </CardFooter>
        </Card>

        <Card flex={1} minWidth={300}>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>
              Invite and manage your team members.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <YStack space="$3">
              <Input placeholder="Enter email address" />
              <Button variant="outline">Send Invitation</Button>
            </YStack>
          </CardContent>
        </Card>
      </XStack>
    </YStack>
  );
}

export function FormShowcase() {
  return (
    <YStack space="$4" padding="$4" maxWidth={600}>
      <Text fontSize="$6" fontWeight="600">Form Showcase</Text>
      
      <Card>
        <CardHeader>
          <CardTitle>Contact Form</CardTitle>
          <CardDescription>
            Complete form with all input types and validation states.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <YStack space="$4">
            <YStack space="$2">
              <Label htmlFor="full-name">Full Name</Label>
              <Input id="full-name" placeholder="Enter your full name" />
            </YStack>

            <YStack space="$2">
              <Label htmlFor="email-address">Email Address</Label>
              <Input
                id="email-address"
                placeholder="m@example.com"
              />
            </YStack>

            <YStack space="$2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="+1 (555) 123-4567"
              />
            </YStack>

            <YStack space="$2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="What's this about?" />
            </YStack>

            <YStack space="$2">
              <Label htmlFor="message-body">Message</Label>
              <Input
                id="message-body"
                placeholder="Tell us more..."
                multiline
                numberOfLines={4}
              />
            </YStack>

            <YStack space="$2">
              <Label htmlFor="attachment">Attachment</Label>
              <Input
                id="attachment"
                placeholder="Choose file"
              />
            </YStack>

            <XStack space="$2" justifyContent="flex-end">
              <Button variant="outline">Clear</Button>
              <Button>Send Message</Button>
            </XStack>
          </YStack>
        </CardContent>
      </Card>
    </YStack>
  );
}