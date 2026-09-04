/**
 * Builds the static site and publishes it to the gh-pages branch.
 *
 *   npm run deploy
 *
 * The out/ directory keeps its own throwaway git repo; every deploy replaces
 * the branch wholesale, which is what GitHub Pages serves.
 */
import { execFileSync } from "node:child_process";
import { existsSync, rmSync } from "node:fs";

const REMOTE = "https://github.com/Jabay7/evolution-auto-sale.git";
const BRANCH = "gh-pages";

/* No shell anywhere: it would re-split arguments containing spaces, and the
   Next binary is invoked through node directly so this works on any platform. */
const run = (cmd, args, cwd) => execFileSync(cmd, args, { cwd, stdio: "inherit" });

console.log("\n▸ Building static export…");
run("node", ["node_modules/next/dist/bin/next", "build"]);

if (!existsSync("out/index.html")) {
  console.error("\nBuild produced no out/index.html — is output:'export' still set in next.config.ts?");
  process.exit(1);
}

console.log("\n▸ Publishing to " + BRANCH + "…");
rmSync("out/.git", { recursive: true, force: true });
run("git", ["init", "-q", "-b", BRANCH], "out");
run("git", ["add", "-A"], "out");
run("git", ["commit", "-q", "-m", `Deploy ${new Date().toISOString()}`], "out");
run("git", ["push", "-q", "--force", REMOTE, BRANCH + ":" + BRANCH], "out");

console.log("\n✓ Deployed. Live at https://evolutionautosaleturo.com once DNS points at GitHub Pages.");
console.log("  GitHub usually publishes the new build within a minute.\n");
