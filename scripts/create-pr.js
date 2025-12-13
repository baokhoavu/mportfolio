const { exec } = require('child_process');
const path = require('path');

// Function to execute shell commands
function execPromise(command) {
  return new Promise((resolve, reject) => {
    exec(command, { cwd: path.join(__dirname, '..') }, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout.trim());
      }
    });
  });
}

// Main function
async function createPrAndScheduleMerge(branchName) {
  try {
    // Create the PR
    console.log('Creating pull request...');
    const prOutput = await execPromise(`gh pr create --base main --head ${branchName} --fill`);
    console.log('PR created:', prOutput);

    // Extract PR number from output (assuming it's in the URL or output)
    // The output is the PR URL, like https://github.com/user/repo/pull/2
    const prUrlMatch = prOutput.match(/https:\/\/github\.com\/[^\/]+\/[^\/]+\/pull\/(\d+)/);
    if (!prUrlMatch) {
      throw new Error('Could not extract PR number from output');
    }
    const prNumber = prUrlMatch[1];
    console.log('PR Number:', prNumber);

    // Wait for 1 hour (3600000 milliseconds)
    console.log('Waiting 1 hour before merging...');
    setTimeout(async () => {
      try {
        console.log('Merging PR...');
        await execPromise(`gh pr merge ${prNumber} --squash --delete-branch --admin`);
        console.log('PR merged successfully');
      } catch (error) {
        console.error('Error merging PR:', error);
      }
    }, 3600000); // 1 hour

  } catch (error) {
    console.error('Error creating PR:', error);
  }
}

// Get branch name from args
const branchName = process.argv[2];
if (!branchName) {
  console.error('Usage: node scripts/create-pr.js <branch-name>');
  process.exit(1);
}

// Run the function
createPrAndScheduleMerge(branchName);