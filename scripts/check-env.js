const fs = require('fs');
const path = require('path');

// Function to recursively get all files in a directory
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      // Skip node_modules and .next
      if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
        arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
      }
    } else {
      // Only check .ts, .tsx, .js, .jsx files
      if (/\.(ts|tsx|js|jsx)$/.test(file)) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

// Patterns to check for
const patterns = [
  { regex: /https?:\/\/[^\s'"]+/, description: 'Hardcoded HTTP/HTTPS URLs' },
  { regex: /api[_-]?key|apikey/i, description: 'API keys' },
  { regex: /secret[_-]?key|secretkey/i, description: 'Secret keys' },
  { regex: /token/i, description: 'Tokens' },
  { regex: /password/i, description: 'Passwords' },
  { regex: /mongodb:\/\/|postgresql:\/\/|mysql:\/\/|sqlite:\/\//i, description: 'Database connection strings' },
];

// Known safe URLs (e.g., social media, demo sites)
const safeUrls = [
  'github.com',
  'linkedin.com',
  'instagram.com',
  'threads.com',
  'discord.com',
  'demo.magic-portfolio.com',
  'once-ui.com'
];

// Main function
function checkForHardcodedValues() {
  const srcDir = path.join(__dirname, '..', 'src');
  const files = getAllFiles(srcDir);
  let issuesFound = false;

  console.log('Checking for hardcoded sensitive values in source files...\n');

  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const relativePath = path.relative(path.join(__dirname, '..'), file);

    patterns.forEach(pattern => {
      const matches = content.match(new RegExp(pattern.regex, 'g'));
      if (matches) {
        // Filter out false positives (e.g., comments, process.env usage)
        const realMatches = matches.filter(match => {
          const context = content.substring(Math.max(0, content.indexOf(match) - 50), content.indexOf(match) + match.length + 50);
          // Skip if it's process.env or in comments
          if (context.includes('process.env') || context.includes('//') || context.includes('/*')) return false;
          // Skip if in import statements or CSS
          if (context.includes('import') || context.includes('.css') || context.includes('tokens.css')) return false;
          // Skip variable names
          if (/\b(password|token|apiKey|secret|key)\b/i.test(context) && !/\b(tokens?|spacing|color)/i.test(context)) return false;
          // Skip safe URLs
          if (pattern.description === 'Hardcoded HTTP/HTTPS URLs') {
            return !safeUrls.some(safe => match.includes(safe));
          }
          return true;
        });

        if (realMatches.length > 0) {
          issuesFound = true;
          console.log(`⚠️  ${pattern.description} found in ${relativePath}:`);
          realMatches.forEach(match => console.log(`   - ${match}`));
          console.log('');
        }
      }
    });
  });

  if (!issuesFound) {
    console.log('✅ No hardcoded sensitive values found in source files.');
  } else {
    console.log('❌ Hardcoded sensitive values detected. Please move them to environment variables.');
    process.exit(1);
  }
}

checkForHardcodedValues();