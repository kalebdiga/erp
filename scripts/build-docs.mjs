import { execSync } from "node:child_process";
import { existsSync, rmSync } from "node:fs";
import { resolve } from "node:path";
import extract from "extract-zip";

const zipPath = resolve("_site.zip");
const outputDir = resolve("_site");

function run(command) {
  execSync(command, { stdio: "inherit" });
}

async function main() {
  run("node ./node_modules/mintlify/index.js export --output _site.zip");

  if (existsSync(outputDir)) {
    rmSync(outputDir, { recursive: true, force: true });
  }

  await extract(zipPath, { dir: outputDir });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
