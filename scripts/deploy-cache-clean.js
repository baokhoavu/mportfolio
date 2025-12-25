#!/usr/bin/env node

/**
 * Vercel Cache Management Script
 * Helps manage deployments and cache purging for baokhoavu.vercel.app
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");

console.log("🚀 Vercel Cache Management Script");
console.log("==================================\n");

// Check if we're in the right directory
const packageJsonPath = path.join(process.cwd(), "package.json");
if (!fs.existsSync(packageJsonPath)) {
  console.error("❌ Error: package.json not found. Please run this script from the project root.");
  process.exit(1);
}

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
if (packageJson.name !== "baokhoavu-portfolio") {
  console.error("❌ Error: This script is designed for the baokhoavu-portfolio project.");
  process.exit(1);
}

console.log("✅ Project verified: baokhoavu-portfolio\n");

function runCommand(command, description) {
  try {
    console.log(`🔄 ${description}...`);
    const result = execSync(command, { encoding: "utf8", stdio: "inherit" });
    console.log(`✅ ${description} completed\n`);
    return result;
  } catch (error) {
    console.error(`❌ Error during ${description}:`, error.message);
    process.exit(1);
  }
}

// Detect platform and use appropriate commands
const isWindows = os.platform() === "win32";
const rmCommand = isWindows ? "rmdir /s /q" : "rm -rf";
const rmFileCommand = isWindows ? "del" : "rm";

// Clean build artifacts
runCommand(`${rmCommand} .next 2>nul || echo .next not found`, "Cleaning .next directory");
runCommand(`${rmCommand} out 2>nul || echo out not found`, "Cleaning out directory");

// Force reinstall dependencies
runCommand(
  `${rmCommand} node_modules 2>nul || echo node_modules not found`,
  "Removing node_modules",
);
runCommand(
  `${rmFileCommand} package-lock.json 2>nul || echo package-lock.json not found`,
  "Removing package-lock.json",
);
runCommand("npm install", "Reinstalling dependencies");

// Build with fresh cache
runCommand("npm run build", "Building project");

// Deploy to production
runCommand("npx vercel --prod --force", "Deploying to production with cache purge");

console.log("🎉 Deployment completed successfully!");
console.log("📱 Check your site at: https://baokhoavu.vercel.app");
console.log("\n💡 Cache Prevention Measures:");
console.log("   - Cache-Control headers set to prevent caching");
console.log("   - Unique build IDs generated for each deployment");
console.log("   - Static assets cached for 1 year");
console.log("\n🔍 If you still see old content:");
console.log("   1. Hard refresh your browser (Ctrl+F5 or Cmd+Shift+R)");
console.log("   2. Clear browser cache");
console.log("   3. Try incognito/private browsing mode");
console.log("   4. Run this script again if needed");
