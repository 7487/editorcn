"use client";
import { useTheme } from "next-themes";
import { ThemeSwitcher } from "@editorcn/ui/components/kibo-ui/theme-switcher";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  const handleThemeSwitch = (mode: "light" | "dark" | "system") => {
    if (!document.startViewTransition) {
      setTheme(mode);
      return;
    }
    document.startViewTransition(() => setTheme(mode));
  };

  return (
    <ThemeSwitcher
      defaultValue="system"
      onChange={handleThemeSwitch}
      value={theme as any}
    />
  );
}
