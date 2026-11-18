#!/bin/bash
while true; do
  ssh -tt -o StrictHostKeyChecking=no -o ServerAliveInterval=15 -o ServerAliveCountMax=3 -R 80:localhost:3000 serveo.net
  sleep 2
done
