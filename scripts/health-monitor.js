#!/usr/bin/env node

/**
 * 🎮 Bob Smith Portfolio Health Monitor
 * Real-time monitoring system - API & WebSocket only
 * Dashboard is served by separate Next.js app on port 3001
 */

const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const cors = require('cors');
const os = require('os');

class HealthMonitor {
    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.wss = new WebSocket.Server({ server: this.server });
        this.port = process.env.HEALTH_PORT || 3002;
        
        // Metrics storage
        this.metrics = {
            startTime: Date.now(),
            requests: 0,
            errors: 0,
            themes: {
                developer: 0,
                gamer: 0
            },
            pageViews: {
                home: 0,
                about: 0,
                work: 0
            },
            security: {
                suspiciousRequests: 0,
                blockedIPs: [],
                lastSecurityEvent: null
            }
        };
        
        this.alerts = [];
        
        this.setup();
        this.setupWebSocket();
        this.startMetricsCollection();
    }

    setup() {
        this.app.use(cors());
        this.app.use(express.json());
        
        // Request logging and metrics
        this.app.use((req, res, next) => {
            this.metrics.requests++;
            
            // Track page views
            if (req.url === '/') this.metrics.pageViews.home++;
            else if (req.url === '/about') this.metrics.pageViews.about++;
            else if (req.url === '/work') this.metrics.pageViews.work++;
            
            console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
            next();
        });

        // Health check endpoint
        this.app.get('/health', (req, res) => {
            res.json({
                status: 'healthy',
                uptime: Math.floor((Date.now() - this.metrics.startTime) / 1000),
                memory: this.getMemoryStats(),
                timestamp: new Date().toISOString(),
                version: '3.0.0'
            });
        });

        // Metrics endpoint
        this.app.get('/metrics', (req, res) => {
            res.json(this.getMetrics());
        });

        // Theme tracking endpoint
        this.app.post('/api/theme', (req, res) => {
            const { theme } = req.body;
            if (theme === 'developer' || theme === 'gamer') {
                this.metrics.themes[theme]++;
                this.addAlert({
                    type: 'theme_change',
                    message: `User switched to ${theme} theme`,
                    severity: 'low',
                    timestamp: Date.now()
                });
                console.log(`🎨 Theme changed to: ${theme}`);
            }
            res.json({ success: true });
        });

        // Alert endpoint
        this.app.post('/api/alert', (req, res) => {
            const alert = req.body;
            this.addAlert(alert);
            res.json({ success: true });
        });
    }

    setupWebSocket() {
        this.wss.on('connection', (ws) => {
            console.log('📡 Dashboard client connected via WebSocket');
            
            // Send initial metrics
            ws.send(JSON.stringify({
                type: 'metrics',
                data: this.getMetrics()
            }));

            ws.on('close', () => {
                console.log('📡 Dashboard client disconnected');
            });
        });
    }

    startMetricsCollection() {
        // Broadcast metrics every 5 seconds
        setInterval(() => {
            const metricsData = {
                type: 'metrics',
                data: this.getMetrics()
            };
            
            this.broadcast(metricsData);
        }, 5000);
    }

    getMemoryStats() {
        const used = process.memoryUsage();
        return {
            used: Math.round(used.heapUsed / 1024 / 1024),
            total: Math.round(used.heapTotal / 1024 / 1024),
            system: Math.round(os.totalmem() / 1024 / 1024 / 1024),
            free: Math.round(os.freemem() / 1024 / 1024 / 1024)
        };
    }

    getMetrics() {
        return {
            ...this.metrics,
            uptime: Math.floor((Date.now() - this.metrics.startTime) / 1000),
            memory: this.getMemoryStats(),
            timestamp: new Date().toISOString(),
            alerts: this.alerts.slice(-10)
        };
    }

    addAlert(alert) {
        this.alerts.unshift(alert);
        
        // Keep only last 50 alerts
        if (this.alerts.length > 50) {
            this.alerts = this.alerts.slice(0, 50);
        }
        
        // Broadcast alert
        this.broadcast({
            type: 'alert',
            data: alert
        });
    }

    broadcast(data) {
        this.wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data));
            }
        });
    }

    start() {
        this.server.listen(this.port, () => {
            console.log('\n🎮 ====================================');
            console.log('🎮 BOB SMITH PORTFOLIO HEALTH MONITOR');
            console.log('🎮 ====================================');
            console.log(`🩺 Health API: http://localhost:${this.port}/health`);
            console.log(`📊 Metrics API: http://localhost:${this.port}/metrics`);
            console.log(`🔗 WebSocket: ws://localhost:${this.port}`);
            console.log('🎯 Dashboard: http://localhost:3001/dashboard');
            console.log('🎮 ====================================\n');
            
            this.addAlert({
                type: 'system',
                message: 'Health Monitor initialized successfully',
                severity: 'low',
                timestamp: Date.now()
            });
        });
    }
}

// Start the health monitor
if (require.main === module) {
    const monitor = new HealthMonitor();
    monitor.start();
    
    // Graceful shutdown
    process.on('SIGINT', () => {
        console.log('\n🛑 Shutting down health monitor...');
        monitor.server.close(() => {
            console.log('✅ Health monitor stopped');
            process.exit(0);
        });
    });
}

module.exports = HealthMonitor;