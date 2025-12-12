export function formatUptime(uptime: number): string {
  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = uptime % 60;
  return `${hours}h ${minutes}m ${seconds}s`;
}

export function formatMemory(bytes: number): string {
  return (bytes / (1024 * 1024 * 1024)).toFixed(2) + 'GB';
}
