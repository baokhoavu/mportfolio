# 🎮 Dashboard System Documentation

## Overview

Bob Smith's Portfolio includes a comprehensive health monitoring and analytics dashboard system built with Next.js and Express. The system consists of two services that work together:

1. **Health Monitor API** (Port 3002) - Backend metrics collection service
2. **Dashboard** (Port 3001) - Frontend Next.js dashboard

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  Portfolio Ecosystem                     │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  Portfolio Website (Port 3000)                           │
│  ├─ Next.js 16 with Turbopack                           │
│  ├─ Gaming Theme Switcher                               │
│  └─ Bob Smith Portfolio                                 │
│                                                           │
│  Dashboard (Port 3001)                                   │
│  ├─ Next.js TypeScript Dashboard                        │
│  ├─ Real-time WebSocket Updates                         │
│  ├─ Industry Analytics Display                          │
│  └─ Neon Gaming Theme                                   │
│                                                           │
│  Health Monitor API (Port 3002)                          │
│  ├─ Express.js REST API                                 │
│  ├─ WebSocket Server (ws)                               │
│  ├─ System Metrics Collection                           │
│  └─ Alert Management                                    │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

## Quick Start

### Option 1: Start All Services (Recommended)

```bash
# PowerShell
./start-services.ps1

# Or using npm script
npm run services

# Or batch file
start-services.bat
```

This will open two terminal windows:
- Health Monitor on port 3002
- Dashboard on port 3001

### Option 2: Start Services Individually

```bash
# Terminal 1: Health Monitor
npm run health-monitor

# Terminal 2: Dashboard (in a new terminal)
npm run dashboard
```

## Accessing the Services

| Service | URL | Description |
|---------|-----|-------------|
| Portfolio | http://localhost:3000 | Main portfolio website |
| Dashboard | http://localhost:3001 | Real-time analytics dashboard |
| Health API | http://localhost:3002/health | Health status endpoint |
| Metrics API | http://localhost:3002/metrics | Full metrics endpoint |
| WebSocket | ws://localhost:3002 | Real-time metrics stream |

## Health Monitor API (Port 3002)

### Endpoints

#### GET /health
Returns basic health status
```json
{
  "status": "healthy",
  "uptime": 123,
  "memory": {
    "used": 8,
    "total": 9,
    "system": 16,
    "free": 4
  },
  "timestamp": "2025-12-12T18:55:10.099Z",
  "version": "3.0.0"
}
```

#### GET /metrics
Returns comprehensive metrics
```json
{
  "uptime": 123,
  "memory": { ... },
  "timestamp": 1234567890,
  "requests": 45,
  "errors": 0,
  "themes": {
    "developer": 10,
    "gamer": 5
  },
  "pageViews": {
    "home": 20,
    "about": 15,
    "work": 10
  },
  "security": {
    "suspiciousRequests": 0,
    "blockedIPs": [],
    "lastSecurityEvent": null
  },
  "alerts": []
}
```

#### POST /api/theme
Track theme switching
```bash
curl -X POST http://localhost:3002/api/theme \
  -H "Content-Type: application/json" \
  -d '{"theme": "gamer"}'
```

#### POST /api/alert
Log system alerts
```bash
curl -X POST http://localhost:3002/api/alert \
  -H "Content-Type: application/json" \
  -d '{"message": "Test alert", "severity": "warning"}'
```

#### WebSocket Connection
```javascript
const ws = new WebSocket('ws://localhost:3002');

ws.onmessage = (event) => {
  const metrics = JSON.parse(event.data);
  console.log('Metrics updated:', metrics);
};
```

## Dashboard (Port 3001)

### Features

- **Real-time Updates**: WebSocket integration for live metrics
- **Health Metrics**: System uptime, memory usage, activity tracking
- **Industry Analytics**:
  - Stack Overflow trends (TypeScript, JavaScript, Python, React, Node.js)
  - Job market demand (Full Stack, Frontend, Backend, DevOps)
  - Tech adoption rates (Next.js, Docker, AWS, GraphQL)
- **Neon Gaming Theme**: Consistent with portfolio design
- **Responsive Grid Layout**: Works on desktop and mobile

### Technology Stack

- Next.js 16.0.10 with Turbopack
- React 19.2.0
- TypeScript 5.8.3
- SCSS Modules
- WebSocket (native browser API)

### Component Structure

```
dashboard-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with global styles
│   │   ├── page.tsx            # Dashboard main page
│   │   └── globals.css         # Global CSS styles
│   ├── components/
│   │   ├── HealthMetrics.tsx   # System metrics display
│   │   └── IndustryAnalytics.tsx # Industry data charts
│   └── styles/
│       ├── dashboard.module.scss  # Dashboard styles
│       ├── metrics.module.scss    # Metrics card styles
│       └── analytics.module.scss  # Analytics chart styles
├── package.json
├── next.config.mjs
├── tsconfig.json
└── README.md
```

## Development

### Dashboard Development

```bash
cd dashboard-app
npm install
npm run dev     # Start dev server on port 3001
npm run build   # Build for production
npm start       # Start production server
```

### Health Monitor Development

```bash
node scripts/health-monitor.js
```

Environment variables:
- `HEALTH_PORT`: Port for health monitor (default: 3002)

## Troubleshooting

### Port Already in Use

If you get "port already in use" errors:

```powershell
# Check what's using the port
netstat -ano | Select-String ":3001"
netstat -ano | Select-String ":3002"

# Kill the process (replace PID with actual process ID)
Stop-Process -Id <PID> -Force
```

### WebSocket Connection Failed

1. Ensure health monitor is running on port 3002
2. Check firewall settings
3. Dashboard will automatically fall back to HTTP polling

### Build Errors

```bash
# Clear Next.js cache
cd dashboard-app
rm -rf .next
npm run build
```

## Customization

### Changing Ports

**Health Monitor** (scripts/health-monitor.js):
```javascript
this.port = process.env.HEALTH_PORT || 3002;
```

**Dashboard** (dashboard-app/package.json):
```json
"scripts": {
  "dev": "next dev -p 3001",
  "start": "next start -p 3001"
}
```

### Theme Colors

Located in SCSS files (`dashboard-app/src/styles/*.scss`):

```scss
$color-verdant: #00ffaa;  // Primary green
$color-magenta: #ff66ff;  // Accent magenta
$color-lime: #66ff00;     // Bright green
$color-violet: #6600cc;   // Deep violet
$color-dark: #0a0e27;     // Background dark
$color-darker: #050812;   // Background darker
```

### Industry Data

Edit `dashboard-app/src/components/IndustryAnalytics.tsx`:

```typescript
const stackOverflowData = [
  { name: "TypeScript", value: 84.1 },
  // Add more data points
];
```

## Security Considerations

- CORS is enabled on the health monitor for local development
- For production, configure CORS to allow only specific origins
- Consider adding authentication for dashboard access
- Rate limiting recommended for production deployments

## Performance

- WebSocket connections maintained for real-time updates
- Metrics broadcast every 5 seconds
- Dashboard uses React 19's automatic batching
- Next.js Turbopack for fast builds
- SCSS modules for scoped styling

## License

MIT - Part of Bob Smith's Portfolio

---

**Need Help?**
- Check [Next.js Documentation](https://nextjs.org/docs)
- Review [Express.js Guide](https://expressjs.com/)
- See [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
