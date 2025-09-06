#!/bin/sh

# Load environment variables from .env files
if [ -f .env ]; then
  export $(cat .env | grep -v '^#' | xargs)
fi

if [ -f .env.local ]; then
  export $(cat .env.local | grep -v '^#' | xargs)
fi

if [ -f .env.production ]; then
  export $(cat .env.production | grep -v '^#' | xargs)
fi

# Start the application
exec node .next/standalone/server.js
