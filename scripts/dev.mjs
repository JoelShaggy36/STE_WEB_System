import { spawn } from "node:child_process";
import { existsSync } from "node:fs";

const processes = [];

function run(label, command, args, options = {}) {
  const child = spawn('npm', ['--prefix', 'backend', 'run', 'dev'], {
    stdio: 'inherit',
    shell: true
  });
  processes.push({ label, child });
  child.on("exit", (code, signal) => {
    if (signal) return;
    if (code !== 0) {
      console.error(`[${label}] exit code ${code}`);
      process.exitCode = code;
    }
  });
}

function shutdown() {
  for (const { child } of processes) child.kill("SIGINT");
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

run("backend", "npm", ["--prefix", "backend", "run", "dev"]);

if (existsSync("frontend/package.json")) {
  run("frontend", "npm", ["--prefix", "frontend", "start", "--", "--proxy-config", "proxy.conf.json"]);
} else {
  console.log("[frontend] No existe `frontend/package.json` todavía. Ejecuta `npm run frontend:create`.");
}
