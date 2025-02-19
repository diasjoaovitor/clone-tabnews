#!/bin/bash

function cleanup {
  npm run services:down
  PID=$(lsof -t -i:3000)
  if [ -n "$PID" ]; then
    kill $PID
  fi
  exit 0
}

trap cleanup INT

if [ "$1" != "test" ]; then
  npm run services:up && npm run services:wait:database && npm run migrations:up && next dev
else
  npm run services:up && concurrently -n next,jest --hide next -k -s command-jest "next dev" "jest --runInBand --verbose"
  cleanup
fi
