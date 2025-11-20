#!/usr/bin/env bash
# set -euo pipefail

RED=197
KIWI=156
PINK=212
# Foreground
PRIMARY=7
BRIGHT=15
# FAINT=238
FAINT=103
DARK=238

# echo "BASH_SOURCE[0]: ${BASH_SOURCE[0]}"

log() {
  if command -v gum >/dev/null 2>&1; then
    gum log --level="info" --time="1/2 15:04:05" --prefix="$LOG_PREFIX" -s "$@"
  else
    echo "$@"
  fi
}

debug() {
  if [ "${DEBUG:-0}" -eq 1 ]; then
    echo "$@" >> /tmp/debug.log
    # if command -v gum >/dev/null 2>&1; then
    #   gum log --level="debug" --time="1/2 15:04:05" --prefix="$LOG_PREFIX" -s "$@"
    # else
    #   echo "DEBUG: $@"
    # fi
  fi
}

chamber_rename() {
  local service_path="$1"
  local old_name="$2"
  local new_name="$3"
  chamber read "$service_path" "$old_name" -q | chamber write "$service_path" "$new_name" - && chamber delete "$service_path" "$old_name"
}

find_root() {
  local ws_file=./pnpm-workspace.yaml
  while ! [ -f "$ws_file" ]; do
    cd ..
    if [ "$(pwd)" == "/" ]; then break; fi
  done
  echo "$ws_file"
}

container() {
  gum style \
    --border rounded --border-foreground 240 \
   --align center --width 70 --margin "12 2 2 4" --padding "0 0" \
     "$1"
}
container_status_indicator() {
  if ! command -v docker >/dev/null 2>&1; then
    return
  fi

  local service="$1"
	local state
  state=$(docker compose ps --format json | jq -r "select(.Service==\"$service\") | .State")
  fg_color=$RED
  if [ "$state" = "running" ]; then
    fg_color=$KIWI
  fi
  svc_name=$(gum style --foreground 240 "$service")
  sv_status=$(gum style --width 1 --height 1 --foreground $fg_color "●")
  echo "$svc_name $sv_status"
}

inner() {
  gum style \
    --border-foreground 240 --border none \
   --align left --width 68 --margin "1 0" --padding "0 6 2 6" \
     "$1"
}

txtmeta() {
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
  ww=$((w - 2))
  hb=$((h - 2))
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


{{ Foreground "7" `This repo uses the ` }}{{ Foreground "99" (Bold "nix") }}{{ Foreground "7" ` package manager to provide a reproducible dev environment. To view the available commands, run `}}{{ Foreground "156" "menu" }} {{ Foreground "7" `in your shell.` }}


{{ Foreground "212" "Getting Started" }}

{{ Foreground "103" "Start Services" }}            {{ Foreground "7" `  devenv ` }}{{ Foreground "156" "up" }}
{{ Foreground "103" "Dev Shell" }}                 {{ Foreground "7" `  devenv ` }}{{ Foreground "156" "shell" }}
{{ Foreground "103" "Available commands" }}        {{ Foreground "7" "  menu" }}
{{ Foreground "103" "Run a common task" }}           {{ Foreground "7" "start" }}


{{ Foreground "238" "More info: `devenv help` or visit devenv.sh" }}
H
)
  header_el=$(echo "$tpl" | gum format -t template)
  wrapped=$(inner "$header_el")

  # Render
  clear
  echo ""
  echo ""
  bodyel=$(container "$meta_el $wrapped")
  fullscreen "$bodyel" || true

}


main


# stripped=$(sed 's/:node_modules\/.bin//g' <<< "$PATH")

# export PATH="$stripped:node_modules/.bin"
