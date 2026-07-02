#!/bin/bash

function cleanup {
  pnpm run services:down
  PID=$(lsof -t -i:3000)
  if [ -n "$PID" ]; then
    kill $PID
  fi
  exit 0
}

trap cleanup INT

if [ "$1" != "test" ]; then
  pnpm run services:up && pnpm run services:wait:database && pnpm run migrations:up && next dev
else
  shift
  pnpm run services:up && concurrently -n next,jest --hide next -k -s command-jest "next dev" "jest --runInBand --verbose $*"
  cleanup
fi
