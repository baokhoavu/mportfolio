"use client";

import { ToggleButton, useTheme } from "@once-ui-system/core";
import type React from "react";

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  // Derive the current theme at render time to avoid synchronous
  // setState calls inside effects which the linter flags.
  const currentTheme =
    typeof document !== "undefined"
      ? document.documentElement.getAttribute("data-theme") || theme || "dark"
      : theme || "dark";

  const icon = currentTheme === "light" ? "dark" : "light";
  const nextTheme = currentTheme === "dark" ? "light" : "dark";

  return (
    <ToggleButton
      prefixIcon={icon}
      onClick={() => setTheme(nextTheme)}
      aria-label={`Switch to ${nextTheme} mode`}
    />
  );
};
