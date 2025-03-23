// Simple script to run the TypeScript server
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to the TypeScript server file
const serverPath = resolve(__dirname, 'server', 'index.ts');

console.log('Starting server from:', serverPath);

// Spawn ts-node process
const tsNode = spawn('npx', ['ts-node', serverPath], {
  stdio: 'inherit',
  shell: true
});

// Handle process events
tsNode.on('error', (error) => {
  console.error('Failed to start server:', error);
});

tsNode.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
});
