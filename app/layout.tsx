"use client";

import "antd/dist/reset.css";
import ThemeProvider, { useTheme } from '@/component/theme-context';
import { ConfigProvider, theme as antdTheme } from "antd";

function AntWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <ConfigProvider
      theme={{
        algorithm:
          theme === "dark"
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <AntWrapper>{children}</AntWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}