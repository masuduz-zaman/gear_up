"use client";

import { DashboardSidebar } from "@/components/shared/customer/CustomerSidebar";
import { DashboardHeader } from "@/components/shared/customer/DashboardHeader";
import { useState } from "react";



export default function CustomerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="">
      <DashboardSidebar
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      {/* Main area */}
      <div className="">

        <main className="">
          {children}
        </main>
      </div>
    </div>
  );
}