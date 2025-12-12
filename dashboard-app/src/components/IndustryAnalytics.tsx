"use client";

import styles from "@/styles/analytics.module.scss";

import { stackOverflowData, jobMarketData, techAdoption } from "@/data/industryAnalytics";
import styles from "@/styles/analytics.module.scss";

export default function IndustryAnalytics() {
  return (
    <div className={styles.analyticsGrid}>
      <div className={styles.card}>
        <h3>Stack Overflow Trends</h3>
        <div className={styles.chartContainer}>
          {stackOverflowData.map((item) => (
            <div key={item.name} className={styles.barItem}>
              <label>{item.name}</label>
              <div className={styles.barContainer}>
                <div
                  className={styles.bar}
                  style={{
                    width: `${item.value}%`,
                    backgroundImage: `linear-gradient(90deg, #00ffaa 0%, #ff66ff 100%)`,
                  }}
                ></div>
              </div>
              <span className={styles.value}>{item.value}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.card}>
        <h3>Job Market Demand</h3>
        <div className={styles.chartContainer}>
          {jobMarketData.map((item) => (
            <div key={item.role} className={styles.barItem}>
              <label>{item.role}</label>
              <div className={styles.barContainer}>
                <div
                  className={styles.bar}
                  style={{
                    width: `${item.demand}%`,
                    backgroundColor: "#66ff00",
                  }}
                ></div>
              </div>
              <span className={styles.value}>{item.demand}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.card}>
        <h3>Tech Adoption Rates</h3>
        <div className={styles.chartContainer}>
          {techAdoption.map((item) => (
            <div key={item.tech} className={styles.barItem}>
              <label>{item.tech}</label>
              <div className={styles.barContainer}>
                <div
                  className={styles.bar}
                  style={{
                    width: `${item.adoption}%`,
                    backgroundColor: "#6600cc",
                  }}
                ></div>
              </div>
              <span className={styles.value}>{item.adoption}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
