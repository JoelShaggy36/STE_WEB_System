import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";

if (existsSync("frontend/package.json")) {
  console.log("El frontend ya existe en `frontend/`.");
  process.exit(0);
}

mkdirSync("frontend", { recursive: true });

const env = {
  ...process.env,
  // Evita que npm intente escribir logs/cache fuera del workspace en entornos restringidos.
  npm_config_cache: process.env.npm_config_cache ?? "/tmp/npm-cache",
  npm_config_update_notifier: "false"
};

const result = spawnSync(
  "npx",
  [
    "-y",
    "@angular/cli@latest",
    "new",
    "frontend",
    "--directory",
    "frontend",
    "--skip-git",
    "--routing",
    "--style",
    "scss"
  ],
  { stdio: "inherit", env }
);

process.exit(result.status ?? 1);

