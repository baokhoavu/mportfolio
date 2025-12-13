const { exec } = require("node:child_process");
const _fs = require("node:fs");
const path = require("node:path");

// Patterns to check for in git history
const patterns = [
  { regex: /https?:\/\/[^\s'"]+/, description: "HTTP/HTTPS URLs" },
  { regex: /api[_-]?key|apikey/i, description: "API keys" },
  { regex: /secret[_-]?key|secretkey/i, description: "Secret keys" },
  { regex: /token/i, description: "Tokens" },
  { regex: /password/i, description: "Passwords" },
  {
    regex: /mongodb:\/\/|postgresql:\/\/|mysql:\/\/|sqlite:\/\//i,
    description: "Database connection strings",
  },
];

// Function to execute shell commands
function execPromise(command) {
  return new Promise((resolve, reject) => {
    exec(command, { cwd: path.join(__dirname, "..") }, (error, stdout, _stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout.trim());
      }
    });
  });
}

// Main function
async function checkGitHistory() {
  try {
    console.log("Checking git history for sensitive data...\n");

    // Get all commits
    const commits = await execPromise("git log --oneline --all");
    const commitHashes = commits.split("\n").map((line) => line.split(" ")[0]);

    let issuesFound = false;

    for (const hash of commitHashes) {
      // Check all commits
      try {
        const diff = await execPromise(`git show ${hash} --name-only`);
        const files = diff
          .split("\n")
          .filter(
            (line) =>
              line &&
              !line.startsWith("commit") &&
              !line.startsWith("Author") &&
              !line.startsWith("Date"),
          );

        for (const file of files) {
          if (
            file &&
            (file.endsWith(".ts") ||
              file.endsWith(".tsx") ||
              file.endsWith(".js") ||
              file.endsWith(".jsx") ||
              file.endsWith(".env"))
          ) {
            const content = await execPromise(`git show ${hash}:${file}`);
            patterns.forEach((pattern) => {
              const matches = content.match(new RegExp(pattern.regex, "g"));
              if (matches) {
                const realMatches = matches.filter((_match) => {
                  return (
                    !content.includes("process.env") &&
                    !content.includes("//") &&
                    !content.includes("/*")
                  );
                });

                if (realMatches.length > 0) {
                  issuesFound = true;
                  console.log(`⚠️  ${pattern.description} found in commit ${hash}, file ${file}:`);
                  realMatches.forEach((match) => console.log(`   - ${match}`));
                  console.log("");
                }
              }
            });
          }
        }
      } catch (_e) {
        // File might not exist in that commit
      }
    }

    if (!issuesFound) {
      console.log("✅ No sensitive data found in recent git history.");
    } else {
      console.log(
        "❌ Sensitive data detected in git history. Consider using git filter-branch or BFG to remove it.",
      );
    }
  } catch (error) {
    console.error("Error checking git history:", error);
  }
}

checkGitHistory();
