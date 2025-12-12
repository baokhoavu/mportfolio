export interface MetricsData {
  uptime: number;
  memory: {
    used: number;
    total: number;
    percentage: number;
  };
  timestamp: number;
  pageViews: number;
  alerts: any[];
}
