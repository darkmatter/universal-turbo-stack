#!/usr/bin/env bash
set -euo pipefail

. "$(dirname "$0")/lib.sh"

RED=197
KIWI=156
# ORANGE=215
PINK=212
# PURPLE=99
# Foreground
PRIMARY=7
BRIGHT=15
# FAINT=238
FAINT=103
DARK=238


container() {
  local wf
  padding=8
  wf=$(($(tput cols 2>/dev/null || echo 80) - $padding))
  gum style \
    --border rounded --border-foreground 240 \
   --align center --width 70 --margin "8 2 2 4" --padding "0 0" \
     "$1"
}
container_status_indicator() {
  local service="$1"
  local state=$(docker compose ps --format json | jq -r "select(.Service==\"$service\") | .State")
  fg_color=$RED
  if [ "$state" = "running" ]; then
    fg_color=$KIWI
  fi
  svc_name=$(gum style --foreground 240 "$service")
  sv_status=$(gum style --width 1 --height 1 --foreground $fg_color "●")
  echo "$svc_name $sv_status"
}

inner() {
  local wf
  padding=8
  wf=$(($(tput cols 2>/dev/null || echo 80) - $padding))
  gum style \
    --border-foreground 240 --border none \
   --align left --width 68 --margin "1 0" --padding "0 6 2 6" \
     "$1"
}

txtmeta() {
  padding=8
  contents=$(gum style \
      --border-foreground 240 --border none \
   --align right --width 68 --foreground $DARK --padding "0 0" --margin "0 0 2 0" \
     "$1")
  echo "$contents"
  echo ""
}

screen_width() {
  tput cols || echo 80
}

fullscreen() {
  local h w
  h=$(tput lines)
  w=$(screen_width)
  ww=$(($w - 2))
  hb=$(($h - 12))
  gum style \
    --foreground 240 \
    --margin "0 0" \
    --width $ww --height $hb --align=center \
    "$1"
}

title() {
  gum style --bold --foreground $PINK "$1"
}

text() {
  gum style --foreground $PRIMARY "$1"
}

subtle() {
  gum style --foreground $FAINT "$1"
}


emphasize() {
  gum style --bold --foreground $BRIGHT "$1"
}

hr() {
  gum style --foreground 240 "============================================================================"
}

main() {
  pg_status=$(container_status_indicator "postgres")
  redis_status=$(container_status_indicator "redis")
  meta_el=$(txtmeta "$pg_status  $redis_status")
  tpl=$(cat <<'H'
{{ Foreground "212" (Bold "Dev Shell Activated") }}
{{ Foreground "103" (Faint "Your environment is ready") }}


{{ Foreground "7" `This repo uses nix-based tooling (flox) which provides a
consistent and reproducible dev environment.` }}


{{ Foreground "212" "Monorepo CLI" }}
{{ Foreground "7" `A CLI has been installed into your $PATH to access setup
scripts, utilities, and commands to run all apps in this repo. To enter the CLI menu, run `}}{{ Foreground "156" "x" }} {{ Foreground "7" `in your shell.` }}
H
)
  header_el=$(echo "$tpl" | gum format -t template)
  wrapped=$(inner "$header_el")

  # Render
  clear
  echo ""
  echo ""
  bodyel=$(container "$meta_el $wrapped")
  fullscreen "$bodyel"

  # clear
  # body_all=$(container "$meta_el $wrapped")
  # fullscreen "$body_all"
}


debug "container width: $(screen_width)"

main