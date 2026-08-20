'use client'

import { useEffect, useState } from 'react'
import { Monitor, Moon, Sun } from 'lucide-react'

const modes = ['light', 'system', 'dark'] as const
type ThemeMode = (typeof modes)[number]

const labels: Record<ThemeMode, string> = {
  light: 'Light theme',
  system: 'System theme',
  dark: 'Dark theme',
}

function isThemeMode(value: string | undefined): value is ThemeMode {
  return modes.includes(value as ThemeMode)
}

export function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>('system')

  useEffect(() => {
    const root = document.documentElement
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const applyTheme = () => {
      const isDark = mode === 'dark' || (mode === 'system' && mediaQuery.matches)
      root.classList.toggle('dark', isDark)
      root.classList.toggle('light', !isDark)
      root.style.colorScheme = isDark ? 'dark' : 'light'
    }

    const savedMode = document.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith('theme-mode='))
      ?.split('=')[1]

    if (isThemeMode(savedMode) && savedMode !== mode) {
      setMode(savedMode)
      return
    }

    applyTheme()
    mediaQuery.addEventListener('change', applyTheme)
    return () => mediaQuery.removeEventListener('change', applyTheme)
  }, [mode])

  const selectMode = (nextMode: ThemeMode) => {
    document.cookie = `theme-mode=${nextMode}; path=/; max-age=31536000; samesite=lax`
    setMode(nextMode)
  }

  return (
    <div
      aria-label="Choose color theme"
      className="relative flex h-5 w-16 max-w-full items-center justify-between rounded-full bg-muted p-0.5 shadow-inner sm:h-6 sm:w-24 sm:p-0.5"
      role="group"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0.5 left-0.5 w-[calc((100%-0.25rem)/3)] rounded-full border border-border bg-background shadow-sm transition-transform duration-300 ease-out"
        style={{ transform: `translateX(${modes.indexOf(mode) * 100}%)` }}
      />
      <button
        aria-label={labels.light}
        aria-pressed={mode === 'light'}
        className="relative z-10 flex h-full flex-1 items-center justify-center rounded-full text-foreground transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        onClick={() => selectMode('light')}
        type="button"
      >
        <Sun aria-hidden="true" className="size-3.5 sm:size-4" strokeWidth={2} />
      </button>
      <button
        aria-label={labels.system}
        aria-pressed={mode === 'system'}
        className="relative z-10 flex h-full flex-1 items-center justify-center rounded-full text-foreground transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        onClick={() => selectMode('system')}
        type="button"
      >
        <Monitor aria-hidden="true" className="size-3.5 sm:size-4" strokeWidth={2} />
      </button>
      <button
        aria-label={labels.dark}
        aria-pressed={mode === 'dark'}
        className="relative z-10 flex h-full flex-1 items-center justify-center rounded-full text-foreground transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        onClick={() => selectMode('dark')}
        type="button"
      >
        <Moon aria-hidden="true" className="size-3.5 sm:size-4" strokeWidth={2} />
      </button>
    </div>
  )
}
