"use client";

import HealthMetrics from "@/components/HealthMetrics";
import IndustryAnalytics from "@/components/IndustryAnalytics";
import styles from "@/styles/dashboard.module.scss";
import { useHealthMetrics } from "@/hooks/useHealthMetrics";

export default function Dashboard() {
  const { connected, metrics } = useHealthMetrics();

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>Health Monitor Dashboard</h1>
        <div className={styles.status}>
          <span className={`${styles.indicator} ${connected ? styles.connected : styles.disconnected}`}></span>
          {connected ? "Live" : "Offline"}
        </div>
      </header>

      <div className={styles.container}>
        {metrics ? (
          <>
            <HealthMetrics metrics={metrics} />
            <IndustryAnalytics />
          </>
        ) : (
          <div className={styles.loading}>
            <p>Connecting to health monitor...</p>
          </div>
        )}
      </div>
    </div>
  );
}
