import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const result = spawnSync(
  process.execPath,
  [fileURLToPath(new URL("node_modules/next/dist/bin/next", root)), "build"],
  {
    cwd: fileURLToPath(root),
    stdio: "inherit",
    env: {
      ...process.env,
      GITHUB_PAGES: "true",
      NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH ?? "/StudyMate",
      NEXT_TELEMETRY_DISABLED: "1",
    },
  },
);

if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);
writeFileSync(new URL("out/.nojekyll", root), "");
