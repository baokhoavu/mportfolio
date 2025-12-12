import { useEffect, useState } from "react";
import { MetricsData } from "@/types/metrics";

export function useHealthMetrics() {
  const [connected, setConnected] = useState(false);
  const [metrics, setMetrics] = useState<MetricsData | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3002");
    ws.onopen = () => setConnected(true);
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setMetrics(data);
      } catch (e) {
        console.error("Failed to parse metrics:", e);
      }
    };
    ws.onerror = () => {
      setConnected(false);
      fetchMetrics();
    };
    ws.onclose = () => setConnected(false);
    return () => ws.close();
    // eslint-disable-next-line
  }, []);

  const fetchMetrics = async () => {
    try {
      const res = await fetch("http://localhost:3002/metrics");
      if (res.ok) {
        const data = await res.json();
        setMetrics(data);
      }
    } catch (e) {
      console.error("Failed to fetch metrics:", e);
    }
  };

  return { connected, metrics };
}
