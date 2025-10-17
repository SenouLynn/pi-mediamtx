#!/bin/bash

# Deploy script for Pi MediaMTX Server to Raspberry Pi
# Usage: ./deploy.sh [pi@hostname]

set -e

# Default SSH host
DEFAULT_HOST="pi@raspberrypi.local"
SSH_HOST=${1:-$DEFAULT_HOST}

echo "🚀 Deploying Pi MediaMTX Server to $SSH_HOST"

# Build for Raspberry Pi
echo "📦 Building for Raspberry Pi (ARM64)..."
make build-pi

# Deploy binary
echo "🔄 Uploading binary..."
scp pi-mediamtx-server-pi $SSH_HOST:~/pi-mediamtx-server

# Make executable
echo "🔧 Setting permissions..."
ssh $SSH_HOST "chmod +x ~/pi-mediamtx-server"

# Check if systemd service exists and offer to restart
echo "🔍 Checking service status..."
if ssh $SSH_HOST "systemctl is-active --quiet pi-mediamtx-server 2>/dev/null"; then
    echo "📋 Service is running. Restarting..."
    ssh $SSH_HOST "sudo systemctl restart pi-mediamtx-server"
    echo "✅ Service restarted successfully"
else
    echo "ℹ️  Service not running. You can start it manually with:"
    echo "   ssh $SSH_HOST 'sudo systemctl start pi-mediamtx-server'"
fi

echo "🎉 Deployment completed successfully!"
echo "🌐 Server should be available at http://$SSH_HOST:8080"