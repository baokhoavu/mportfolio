/**
 * Cache Validation Utilities
 * Detects and prevents serving of cached/old content
 */

export interface CacheValidationResult {
  isValid: boolean;
  issues: string[];
  recommendations: string[];
  timestamp: string;
}

export class CacheValidator {
  private static readonly GATSBY_INDICATORS = [
    '[data-react-helmet]',
    '.tl-edges',
    '[data-testid="gatsby-focus-wrapper"]',
    '.gatsby-image-wrapper'
  ];

  private static readonly NEXTJS_INDICATORS = [
    'next-root',
    '[data-nextjs-scroll-focus-boundary]',
    'next-head-count'
  ];

  /**
   * Comprehensive cache validation
   */
  static async validate(): Promise<CacheValidationResult> {
    const issues: string[] = [];
    const recommendations: string[] = [];

    // Check for Gatsby elements (old cached content)
    const gatsbyElements = this.GATSBY_INDICATORS.filter(selector => {
      try {
        return document.querySelector(selector) !== null;
      } catch {
        return false;
      }
    });

    if (gatsbyElements.length > 0) {
      issues.push(`Found ${gatsbyElements.length} Gatsby elements: ${gatsbyElements.join(', ')}`);
      recommendations.push('Clear browser cache and hard refresh (Ctrl+F5)');
      recommendations.push('Check Vercel deployment for cache issues');
    }

    // Check for Next.js elements (current content)
    const nextElements = this.NEXTJS_INDICATORS.filter(selector => {
      try {
        return document.querySelector(selector) !== null;
      } catch {
        return false;
      }
    });

    if (nextElements.length === 0) {
      issues.push('No Next.js elements detected - may be serving cached content');
      recommendations.push('Verify current deployment is active');
    }

    // Check global objects
    if (typeof (window as any).___gatsby !== 'undefined') {
      issues.push('Gatsby global object detected');
      recommendations.push('Force cache purge on Vercel');
    }

    if (typeof (window as any).GATSBY !== 'undefined') {
      issues.push('Gatsby configuration detected');
      recommendations.push('Check deployment configuration');
    }

    // Check for Next.js globals
    if (typeof (window as any).__NEXT_DATA__ === 'undefined') {
      issues.push('Next.js data not found');
      recommendations.push('Verify Next.js build is correct');
    }

    // Check health endpoint
    try {
      const healthResponse = await fetch('/api/health', {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' }
      });

      if (!healthResponse.ok) {
        issues.push('Health check endpoint failed');
        recommendations.push('Check API routes and deployment');
      } else {
        const healthData = await healthResponse.json();
        if (healthData.framework?.hasGatsbyElements) {
          issues.push('Health check detected Gatsby elements');
          recommendations.push('Redeploy with cache purge');
        }
      }
    } catch (error) {
      issues.push('Health check request failed');
      recommendations.push('Check network connectivity and API status');
    }

    return {
      isValid: issues.length === 0,
      issues,
      recommendations,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Force cache busting
   */
  static forceRefresh(): void {
    // Clear all caches
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => caches.delete(name));
      });
    }

    // Clear localStorage (theme preferences, etc.)
    try {
      localStorage.clear();
    } catch (e) {
      console.warn('Could not clear localStorage:', e);
    }

    // Force reload bypassing cache
    window.location.href = window.location.href + (window.location.href.includes('?') ? '&' : '?') + '_cache_bust=' + Date.now();
  }

  /**
   * Check if current content is fresh
   */
  static async isContentFresh(): Promise<boolean> {
    try {
      const response = await fetch('/api/health', {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' }
      });

      const data = await response.json();
      return !data.framework?.hasGatsbyElements && data.status === 'healthy';
    } catch {
      return false;
    }
  }
}

export default CacheValidator;