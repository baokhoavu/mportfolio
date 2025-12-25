'use client';

import { useEffect, useState } from 'react';
import CacheValidator, { CacheValidationResult } from '@/utils/cacheValidator';

interface HealthStatus {
  status: string;
  timestamp: string;
  build: {
    name: string;
    version: string;
    signature: string;
  };
  framework: {
    isNextJs: boolean;
    hasGatsbyElements: boolean;
  };
  message: string;
}

export default function HealthCheck() {
  const [healthStatus, setHealthStatus] = useState<HealthStatus | null>(null);
  const [cacheValidation, setCacheValidation] = useState<CacheValidationResult | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  const [cacheIssue, setCacheIssue] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    performFullCheck();
  }, []);

  const performFullCheck = async () => {
    try {
      // Health check
      const healthResponse = await fetch('/api/health', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      });

      const healthData: HealthStatus = await healthResponse.json();
      setHealthStatus(healthData);

      // Cache validation
      const validationResult = await CacheValidator.validate();
      setCacheValidation(validationResult);

      const hasIssues = !validationResult.isValid || healthData.framework.hasGatsbyElements;
      setCacheIssue(hasIssues);

      if (hasIssues) {
        console.warn('🚨 Cache Issue Detected:', validationResult.issues);

        // Auto-refresh after a delay if critical issues found
        const criticalIssues = validationResult.issues.filter(issue =>
          issue.includes('Gatsby') || issue.includes('No Next.js elements')
        );

        if (criticalIssues.length > 0) {
          setTimeout(() => {
            CacheValidator.forceRefresh();
          }, 5000);
        }
      }
    } catch (error) {
      console.error('Health check failed:', error);
      setCacheIssue(true);
    } finally {
      setIsChecking(false);
    }
  };

  const forceRefresh = () => {
    CacheValidator.forceRefresh();
  };

  // Only show in development or when there's a cache issue
  if (process.env.NODE_ENV === 'production' && !cacheIssue) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 9999,
        background: cacheIssue ? '#ff4444' : '#44ff44',
        color: 'white',
        padding: '10px 15px',
        borderRadius: '5px',
        fontSize: '12px',
        fontFamily: 'monospace',
        boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
        maxWidth: '350px',
        cursor: 'pointer'
      }}
      onClick={() => setShowDetails(!showDetails)}
      title="Click for details"
    >
      {isChecking ? (
        <div>🔄 Checking health...</div>
      ) : cacheIssue ? (
        <div>
          <div>🚨 Cache Issue Detected!</div>
          {showDetails && cacheValidation && (
            <div style={{ fontSize: '10px', marginTop: '8px', maxHeight: '150px', overflowY: 'auto' }}>
              <div><strong>Issues:</strong></div>
              {cacheValidation.issues.map((issue, i) => (
                <div key={i}>• {issue}</div>
              ))}
              <div style={{ marginTop: '5px' }}><strong>Recommendations:</strong></div>
              {cacheValidation.recommendations.map((rec, i) => (
                <div key={i}>• {rec}</div>
              ))}
            </div>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              forceRefresh();
            }}
            style={{
              marginTop: '8px',
              padding: '4px 8px',
              background: 'white',
              color: '#ff4444',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '11px'
            }}
          >
            Force Refresh
          </button>
        </div>
      ) : (
        <div>
          <div>✅ Site Healthy</div>
          <div style={{ fontSize: '10px', marginTop: '5px' }}>
            Next.js v{healthStatus?.build.version}
          </div>
          {showDetails && cacheValidation && (
            <div style={{ fontSize: '10px', marginTop: '5px' }}>
              <div>Validated: {cacheValidation.timestamp}</div>
              <div>Status: {cacheValidation.isValid ? '✅ Valid' : '❌ Issues'}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}