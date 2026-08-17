"use client"

import * as React from "react"
import Link from "next/link"
import {
  CircleUserRoundIcon,
  MenuIcon,
  MoonIcon,
  ShoppingBagIcon,
  SparklesIcon,
  SunIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
const navLinks = [
  { href: "/", label: "Home" },
  { href: "#Services", label: "Services" },
  { href: "#how it work", label: "how it works" },
  { href: "#about", label: "About" },
]

type SiteNavbarProps = {
  isLoggedIn?: boolean
}

export function Navbar({ isLoggedIn = false, }: SiteNavbarProps) {
  const [isDark, setIsDark] = React.useState(false)

  React.useEffect(() => {
    const shouldUseDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    setIsDark(shouldUseDark)
    document.documentElement.classList.toggle("dark", shouldUseDark)
  }, [])

  function handleThemeChange(checked: boolean) {
    setIsDark(checked)
    document.documentElement.classList.toggle("dark", checked)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/10 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="#top" className="flex items-center gap-1" aria-label="Atelier home">
          <span className="font-serif text-lg font-semibold tracking-tight">Gear</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">Up</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted hover:text-foreground ${index === 0 ? "text-foreground" : "text-muted-foreground"}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-1 md:flex">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleThemeChange(!isDark)}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <SunIcon aria-hidden="true" /> : <MoonIcon aria-hidden="true" />}
          </Button>
          <Button variant="ghost" size="icon" aria-label="Shopping bag">
            <ShoppingBagIcon aria-hidden="true" />
          </Button>
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button variant="outline" size="sm" />}
                aria-label="Open profile menu"
              >
                <CircleUserRoundIcon data-icon="inline-start" aria-hidden="true" />
                Profile
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-40">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>My orders</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login" className="flex items-center gap-1">
              <Button variant="default" size="sm">
                Log in
              </Button>
            </Link>
          )}
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <Button variant="ghost" size="icon" aria-label="Shopping bag">
            <ShoppingBagIcon aria-hidden="true" />
          </Button>
          <Sheet>
            <SheetTrigger render={<Button variant="outline" size="icon" />} aria-label="Open navigation">
              <MenuIcon aria-hidden="true" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(20rem,88vw)]">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <SparklesIcon aria-hidden="true" />
                  </span>
                  atelier
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4" aria-label="Mobile navigation">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="rounded-lg px-3 py-3 text-base hover:bg-muted">
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-3 border-t border-border p-4">
                <Button
                  variant="outline"
                  className="justify-center"
                  onClick={() => handleThemeChange(!isDark)}
                  aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {isDark ? <SunIcon data-icon="inline-start" aria-hidden="true" /> : <MoonIcon data-icon="inline-start" aria-hidden="true" />}
                  {isDark ? "Light mode" : "Dark mode"}
                </Button>
                {isLoggedIn ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="outline" className="justify-center" />}>
                      <CircleUserRoundIcon data-icon="inline-start" aria-hidden="true" />
                      Profile
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="min-w-40">
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>My orders</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Log out</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" className="justify-center">                      Log in
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export default Navbar
