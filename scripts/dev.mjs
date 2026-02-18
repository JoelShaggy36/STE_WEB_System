import { spawn } from "node:child_process";
import { existsSync } from "node:fs";

const processes = [];
const isWindows = process.platform === "win32";
const npmCommand = "npm";

function toCommandLine(command, args) {
  return [command, ...args].join(" ");
}

function run(label, command, args, options = {}) {
  const child = isWindows
    ? spawn("cmd.exe", ["/d", "/s", "/c", toCommandLine(command, args)], {
        stdio: "inherit",
        ...options
      })
    : spawn(command, args, {
        stdio: "inherit",
        ...options
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
  for (const { child } of processes) {
    child.kill("SIGINT");
  }
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

run("backend", npmCommand, ["--prefix", "backend", "run", "dev"]);

if (existsSync("frontend/package.json")) {
  run("frontend", npmCommand, ["--prefix", "frontend", "start", "--", "--proxy-config", "proxy.conf.json"]);
} else {
  console.log("[frontend] No existe `frontend/package.json` todavia. Ejecuta `npm run frontend:create`.");
}
