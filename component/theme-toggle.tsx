"use client";

import { Switch } from "antd";
import { useTheme } from '@/component/theme-context'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <span>{theme === "dark" ? "🌙 Dark" : "☀️ Light"}</span>

      <Switch
        checked={theme === "dark"}
        onChange={toggleTheme}
      />
    </div>
  );
}