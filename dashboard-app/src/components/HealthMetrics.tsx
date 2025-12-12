"use client";


import styles from "@/styles/metrics.module.scss";
import { MetricsData } from "@/types/metrics";
import { formatUptime, formatMemory } from "@/utils/format";

export default function HealthMetrics({ metrics }: { metrics: MetricsData }) {
  const memoryPercent = metrics.memory?.percentage || 0;
  const memoryUsed = formatMemory(metrics.memory?.used);
  const memoryTotal = formatMemory(metrics.memory?.total);

  return (
    <div className={styles.metricsGrid}>
      <div className={styles.card}>
        <h3>System Status</h3>
        <div className={styles.metric}>
          <label>Uptime</label>
          <span className={styles.value}>{formatUptime(metrics.uptime)}</span>
        </div>
        <div className={styles.metric}>
          <label>Memory Usage</label>
          <div className={styles.progressBar}>
            <div
              className={styles.progress}
              style={{
                width: `${memoryPercent}%`,
                backgroundColor:
                  memoryPercent > 80 ? "#ff66ff" : "#00ffaa",
              }}
            ></div>
          </div>
          <span className={styles.value}>
            {memoryUsed} / {memoryTotal} ({memoryPercent.toFixed(1)}%)
          </span>
        </div>
      </div>

      <div className={styles.card}>
        <h3>Activity</h3>
        <div className={styles.metric}>
          <label>Page Views</label>
          <span className={styles.value}>{metrics.pageViews || 0}</span>
        </div>
        <div className={styles.metric}>
          <label>Active Alerts</label>
          <span className={styles.value}>{metrics.alerts?.length || 0}</span>
        </div>
        <div className={styles.metric}>
          <label>Last Update</label>
          <span className={styles.value}>
            {new Date(metrics.timestamp).toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
}
