"use client"

import * as React from "react"
import Link from "next/link"
import {
  CircleUserRoundIcon,
  MenuIcon,
  MoonIcon,
  Search,
  ShoppingBagIcon,
  SparklesIcon,
  SunIcon,
  X
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
import { Metadata, Viewport } from "next"
import { ThemeToggle } from "../theme-toggle"
const navLinks = [
  { href: "/", label: "Home" },
  { href: "#Services", label: "Services" },
  { href: "#how it work", label: "how it works" },
  { href: "#about", label: "About" },
]

type IUser ={
  success: boolean,
  message: string,
  data:{
    id: string,
    name: string,
    email: string,
    role: string,
    activeStatus: string,
    createdAt: string,
    updatedAt: string,
      profile:{
        id: string,
        profilePhoto: string,
        bio: string | null,
        userId: string,
        createdAt: string,
        updatedAt: string,
      }
    }
  }


type NavbarProps = {
  user?: IUser
}



export function Navbar({user}: NavbarProps) {
  const [isDark, setIsDark] = React.useState(false)
  const [searchQuery, setSearchQuery]= React.useState(false)
  const isLoggedIn = Boolean(user?.success && user?.data?.profile)
console.log("USER FROM NAVBAR:", user)


const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
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
        <div className="flex items-center">
            {searchQuery ? (
              <div className="flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1.5">
                <Search aria-hidden="true" className="size-4 text-muted-foreground" />
                <input
                  aria-label="Search"
                  autoFocus
                  className="w-28 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground sm:w-40"
                  placeholder="Search..."
                  type="search"
                />
                <button
                  aria-label="Close search"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => setSearchQuery(false)}
                  type="button"
                >
                  <X aria-hidden="true" className="size-4" />
                </button>
              </div>
            ) : (
              <button
                aria-label="Open search"
                className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={() => setSearchQuery(true)}
                type="button"
              >
                <Search aria-hidden="true" className="size-5" />
              </button>
            )}
        <div className="hidden items-center gap-1 md:flex">
          </div>
          <ThemeToggle />
          <Button variant="ghost" size="icon" aria-label="Shopping bag">
            <ShoppingBagIcon aria-hidden="true" />
          </Button>
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                className={"flex justify-center"}
                aria-label="Open profile menu"
              >
                <CircleUserRoundIcon data-icon="inline-start" aria-hidden="true" />
              </DropdownMenuTrigger>
                
              <DropdownMenuContent align="center" className="min-w-40">
                <div className="flex flex-col justify-center items-center gap-1">
                  <p className="text-sm font-medium">{user?.data.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.data.email}</p>
                </div>
                <DropdownMenuSeparator />
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
                  aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                >
                  <ThemeToggle />
                </Button>
                {isLoggedIn ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="outline" className="justify-center" />}>
                      <CircleUserRoundIcon data-icon="inline-start" aria-hidden="true" />
                      
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
                    <Button variant="outline" className="justify-center">Log in
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
