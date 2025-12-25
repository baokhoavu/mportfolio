#!/usr/bin/env node

/**
 * Health Check Script for Vercel Deployment
 * Checks if the deployed site is serving current content and not cached Gatsby content
 */

const https = require('https');
const http = require('http');

const SITE_URL = process.env.SITE_URL || 'https://baokhoavu.vercel.app';

console.log('🔍 Health Check for:', SITE_URL);
console.log('=====================================\n');

// Check health endpoint
function checkHealthEndpoint() {
  return new Promise((resolve, reject) => {
    const url = new URL('/api/health', SITE_URL);
    const client = url.protocol === 'https:' ? https : http;

    const req = client.get(url, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    }, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const healthData = JSON.parse(data);
          resolve(healthData);
        } catch (error) {
          reject(new Error('Failed to parse health response'));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Health check timeout'));
    });
  });
}

// Check main page for Gatsby indicators
function checkForGatsbyContent() {
  return new Promise((resolve, reject) => {
    const url = new URL('/', SITE_URL);
    const client = url.protocol === 'https:' ? https : http;

    const req = client.get(url, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    }, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        const hasGatsbyIndicators = [
          'data-react-helmet',
          '___gatsby',
          'GATSBY',
          'tl-edges',
          'gatsby-image-wrapper'
        ].some(indicator => data.includes(indicator));

        const hasNextJsIndicators = [
          '_next/static',
          'self.__next_f',
          '__NEXT_DATA__',
          'data-nextjs'
        ].some(indicator => data.includes(indicator));

        resolve({
          hasGatsbyIndicators,
          hasNextJsIndicators,
          contentLength: data.length
        });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error('Content check timeout'));
    });
  });
}

async function runHealthCheck() {
  try {
    console.log('🔄 Checking health endpoint...');
    const healthData = await checkHealthEndpoint();

    console.log('✅ Health endpoint responded');
    console.log('   Status:', healthData.status);
    console.log('   Build:', `${healthData.build.name} v${healthData.build.version}`);
    console.log('   Framework:', healthData.framework.isNextJs ? 'Next.js' : 'Unknown');
    console.log('   Gatsby Elements:', healthData.framework.hasGatsbyElements ? '❌ DETECTED' : '✅ None');
    console.log('');

    console.log('🔄 Checking page content...');
    const contentCheck = await checkForGatsbyContent();

    console.log('✅ Content check completed');
    console.log('   Content Length:', contentCheck.contentLength, 'bytes');
    console.log('   Gatsby Indicators:', contentCheck.hasGatsbyIndicators ? '❌ DETECTED' : '✅ None');
    console.log('   Next.js Indicators:', contentCheck.hasNextJsIndicators ? '✅ DETECTED' : '❌ None');
    console.log('');

    // Overall assessment
    const issues = [];

    if (healthData.status !== 'healthy') {
      issues.push('Health endpoint not healthy');
    }

    if (healthData.framework.hasGatsbyElements) {
      issues.push('Health check detected Gatsby elements');
    }

    if (contentCheck.hasGatsbyIndicators) {
      issues.push('Page content contains Gatsby indicators');
    }

    if (!contentCheck.hasNextJsIndicators) {
      issues.push('Page content missing Next.js indicators');
    }

    if (issues.length === 0) {
      console.log('🎉 HEALTH CHECK PASSED');
      console.log('   ✅ Site is serving current Next.js content');
      console.log('   ✅ No Gatsby cache detected');
      process.exit(0);
    } else {
      console.log('🚨 HEALTH CHECK FAILED');
      console.log('Issues found:');
      issues.forEach(issue => console.log(`   ❌ ${issue}`));
      console.log('');
      console.log('💡 Recommendations:');
      console.log('   1. Run: npm run deploy (clean redeploy)');
      console.log('   2. Check Vercel dashboard for cache issues');
      console.log('   3. Hard refresh browser (Ctrl+F5)');
      console.log('   4. Clear browser cache');
      process.exit(1);
    }

  } catch (error) {
    console.error('❌ Health check failed:', error.message);
    console.log('');
    console.log('💡 Troubleshooting:');
    console.log('   1. Check if site is deployed:', SITE_URL);
    console.log('   2. Verify Vercel deployment status');
    console.log('   3. Check network connectivity');
    process.exit(1);
  }
}

runHealthCheck();