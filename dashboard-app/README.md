# Health Monitor Dashboard

A minimal, industry-standard Next.js dashboard for real-time health monitoring and analytics.

## Features

- Real-time metrics from health monitor API
- WebSocket integration for live updates
- Industry analytics and trends
- Neon gaming theme with dark mode
- Responsive grid layout
- TypeScript support

## Quick Start

```bash
npm install
npm run dev
```

Dashboard will be available at `http://localhost:3001`

## Configuration

The dashboard connects to the health monitor API on `http://localhost:3002`. Make sure the health monitor service is running before starting the dashboard.

### Environment Variables

No environment variables required for basic setup. The health monitor URL is hardcoded to `localhost:3002`.

## Architecture

- **Frontend**: Next.js 16 with React 19
- **Styling**: SCSS modules with neon theme
- **Communication**: WebSocket (with HTTP fallback)
- **Components**: Minimal, reusable component structure

## Components

- **HealthMetrics**: Displays system uptime, memory usage, and activity
- **IndustryAnalytics**: Shows Stack Overflow trends, job market demand, and tech adoption rates
- **Dashboard**: Main page component managing WebSocket connection and metrics state

## License

MIT
