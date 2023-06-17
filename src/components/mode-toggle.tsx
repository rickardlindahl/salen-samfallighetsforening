"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Icons } from "~/components/icons";
import { Button } from "~/components/ui/button";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    const isSystemDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    return theme === "dark" || (theme === "system" && isSystemDark)
      ? "light"
      : "dark";
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
      onClick={() => {
        setTheme(toggleTheme());
      }}
    >
      <Icons.sun className="h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-teal-50 [@media(prefers-color-scheme:dark)]:stroke-teal-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-teal-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-teal-600" />
      <Icons.moon className="hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400 [@media_not_(prefers-color-scheme:dark)]:fill-teal-400/10 [@media_not_(prefers-color-scheme:dark)]:stroke-teal-500" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
