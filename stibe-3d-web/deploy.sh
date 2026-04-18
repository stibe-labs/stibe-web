#!/bin/bash
# Stibe Web - Deploy to VPS
# Usage: ./deploy.sh

set -e

SERVER="root@187.127.147.191"
REMOTE_DIR="/var/www/stibe-web"

echo "🔨 Building Next.js project..."
npm run build

echo "📦 Uploading files to server..."
rsync -avz --delete \
  --exclude 'node_modules' \
  --exclude '.git' \
  ./ "$SERVER:$REMOTE_DIR/"

echo "📥 Installing dependencies on server..."
ssh "$SERVER" "cd $REMOTE_DIR && npm install --omit=dev"

echo "🔄 Restarting app..."
ssh "$SERVER" "cd $REMOTE_DIR && PORT=3001 pm2 restart stibe-web --update-env"

echo "✅ Deployed! Live at https://stibe.in"
