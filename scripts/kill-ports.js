#!/usr/bin/env node

// Kill any process on port 3000 or 8000
const { exec } = require('child_process');
const ports = [3000, 8000];

ports.forEach(port => {
  exec(`lsof -ti:${port} | xargs kill -9 2>/dev/null || true`, (err) => {
    if (!err) {
      console.log(`✅ Killed process on port ${port}`);
    }
  });
});
