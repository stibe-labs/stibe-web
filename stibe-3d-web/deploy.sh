#!/bin/bash
# Stibe Web - Deploy to VPS via GitHub
# Usage: ./deploy.sh

set -e

SERVER="root@187.127.147.191"
REMOTE_REPO="/var/www/stibe-repo"
REMOTE_APP="$REMOTE_REPO/stibe-3d-web"

echo "📥 Pulling latest code from GitHub..."
ssh "$SERVER" "cd $REMOTE_REPO && git pull origin main"

echo "📦 Installing dependencies on server..."
ssh "$SERVER" "cd $REMOTE_APP && npm install"

echo "🔨 Building Next.js project on server..."
ssh "$SERVER" "cd $REMOTE_APP && npm run build"

echo "🔄 Restarting app..."
ssh "$SERVER" "cd $REMOTE_APP && PORT=3001 pm2 restart stibe-web --update-env"

echo "✅ Deployed! Live at https://stibe.in"
