#!/bin/bash
echo "Building and watching for changes..."
npx tsc --watch &
watch_pid=$!

# When the script is terminated, kill the watch process
trap "kill $watch_pid" EXIT

# Keep the script running
while true; do
  sleep 1
done
