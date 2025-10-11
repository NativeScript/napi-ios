#!/bin/bash
set -e

# include this in other bash scripts with the following line:
#
# source "$(dirname "$0")/build_utils.sh"
#

function to_bool() {
  local arg="$1"
  case "$(echo "$arg" | tr '[:upper:]' '[:lower:]')" in
    [0-9]+)
      if [ $arg -eq 0 ]; then
        echo false
      else
        echo true
      fi
      ;;
    n|no|f|false) echo false ;;
    y|yes|t|true) echo true ;;
    * )
      if [ -n "$arg" ]; then
        echo "warning: invalid boolean argument ('$arg'). Expected true or false" >&2
      fi
      echo false
      ;;
  esac;
}

# Prints a timestamp + title for a step/section
function checkpoint {
    local delimiter="--------------------------------------------------------------------------------"

    echo ""
    echo ""
    echo "$delimiter"
    echo "--- $(date +'%T') --- $1 "
    echo "$delimiter"
    echo ""
}