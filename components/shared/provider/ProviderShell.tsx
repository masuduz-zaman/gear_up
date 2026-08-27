"use client";

import { useState } from "react";

import ProviderHeader from "./ProviderHeader";
import ProviderSidebar from "./ProviderSidebar";

type ProviderShellProps = {
  children: React.ReactNode;
  title: string;
};

export default function ProviderShell({
  children,
  title,
}: ProviderShellProps) {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ProviderSidebar
        open={sidebarOpen}
        onClose={() =>
          setSidebarOpen(false)
        }
      />

      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-foreground/20 lg:hidden"
          onClick={() =>
            setSidebarOpen(false)
          }
          aria-label="Close navigation"
        />
      )}

      <div className="lg:pl-64">
        <ProviderHeader
          title={title}
          onMenuOpen={() =>
            setSidebarOpen(true)
          }
        />

        <main className="mx-auto max-w-[1440px] p-5 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}