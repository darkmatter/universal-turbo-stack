#!/bin/sh

# This script is used to write a conventional commit message.
# It prompts the user to choose the type of commit as specified in the
# conventional commit spec. And then prompts for the summary and detailed
# description of the message and uses the values provided. as the summary and
# details of the message.
#
# If you want to add a simpler version of this script to your dotfiles, use:
#
# alias gcm='git commit -m "$(gum input)" -m "$(gum write)"'

# if [ -z "$(git status -s -uno | grep -v '^ ' | awk '{print $2}')" ]; then
#     gum confirm "Stage all?" && git add .
# fi



TYPE=$(gum choose "fix" "feat" "docs" "style" "refactor" "test" "chore" "revert")
SCOPE=$(gum input --placeholder "workers" --header "Scope of change:" --header.foreground "99")

# Since the scope is optional, wrap it in parentheses if it has a value.
test -n "$SCOPE" && SCOPE="($SCOPE)"

# Pre-populate the input with the type(scope): so that the user may change it
SUMMARY=$(gum input --width 50 --value "$TYPE$SCOPE: " --placeholder "Summary of this change" --header "Enter summary (max 50 chars):" --header.foreground "99")
DESCRIPTION=$(gum write --placeholder "Details of this change")

_checksum=$(echo -n "$SUMMARY"$'\n\n'"$DESCRIPTION" | shasum -a 256)

if [ "$_checksum" = "$_COMMIT_HOOK_FINGERPRINT" ]; then
  echo "No changes to commit."
  exit 0
fi

# Commit these changes if user confirms
if gum confirm "Commit changes?"; then
  git commit -m "$SUMMARY" -m "$DESCRIPTION"
  _checksum=$(echo -n "$SUMMARY"$'\n\n'"$DESCRIPTION" | shasum -a 256)
  export _COMMIT_HOOK_FINGERPRINT="$_checksum"
fi
