"use client";

import {
  Section,
  User,
  UserStatus,
  UserRole,
  GearItem,
  Rental,
  UserProfile,
} from "@/lib/type";

import { useEffect, useMemo, useState } from "react";

import {
  Bell,
  Box,
  ChevronDown,
  ClipboardList,
  LayoutDashboard,
  PackageCheck,
  Plus,
  Users,
  UserRound,
} from "lucide-react";

import { getUsers } from "@/service/getUser";
import { getMe } from "@/service/getMe";
import { getGearItems } from "@/service/getGearItems";
import { getRentals } from "@/service/getRentals";
import Avatar from "./Avatar";
import Overview from "./Overview";
import Toolbar from "./Toolbar";
import RentalTable from "./RentalTable";
import GearTable from "./GearTable";
import UserTable from "./UserTable";
import Profile from "./Profile";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

const navItems: {
  id: Section;
  label: string;
  icon: typeof LayoutDashboard;
}[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "rentals", label: "All rentals", icon: ClipboardList },
  { id: "gear", label: "All gear items", icon: Box },
  { id: "users", label: "All users", icon: Users },
];

export default function DashboardPage() {
  const [rentalFilter, setRentalFilter] = useState("");
  const [section, setSection] = useState<Section>("overview");
  const [query, setQuery] = useState("");
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [gear, setGear] = useState<GearItem[]>([]);
  const [userMenu, setUserMenu] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function initDashboard() {
      setLoading(true);

      try {
        const [meRes, usersRes, gearRes, rentalsRes] = await Promise.allSettled(
          [getMe(), getUsers(), getGearItems(), getRentals()],
        );

        if (meRes.status === "fulfilled" && meRes.value) {
          const val = meRes.value;
          setCurrentUser(val.data || val);
        }

        if (usersRes.status === "fulfilled" && usersRes.value) {
          const val = usersRes.value;

          setUsers(
            Array.isArray(val.data) ? val.data : Array.isArray(val) ? val : [],
          );
        }

        if (gearRes.status === "fulfilled" && gearRes.value) {
          const val = gearRes.value;

          setGear(
            Array.isArray(val.data) ? val.data : Array.isArray(val) ? val : [],
          );
        }

        if (rentalsRes.status === "fulfilled" && rentalsRes.value) {
          const val = rentalsRes.value;

          setRentals(
            Array.isArray(val.data) ? val.data : Array.isArray(val) ? val : [],
          );
        }
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }

    initDashboard();
  }, []);

  const filteredUsers = useMemo(
    () =>
      users.filter((u) =>
        `${u.name || ""} ${u.email || ""}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [users, query],
  );

  const filteredGear = useMemo(
    () =>
      gear.filter((item) =>
        `${item?.name || ""} ${item?.categoryId || ""}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [gear, query],
  );

  const filteredRentals = useMemo(
    () =>
      rentals.filter((rental) => {
        const matchesSearch = `${rental?.id || ""} ${
          rental?.customerId || ""
        } ${rental?.gearItem?.name || ""}`
          .toLowerCase()
          .includes(query.toLowerCase());

        const matchesFilter =
          !rentalFilter || rental.OrderStatus === rentalFilter;

        return matchesSearch && matchesFilter;
      }),
    [rentals, query, rentalFilter],
  );

  const title = {
    overview: `Good morning, ${currentUser?.name || "User"}`,
    rentals: "My rentals",
    gear: "All gear items",
    users: "All users",
    profile: "Profile",
  }[section];

  const subtitle = {
    overview: "Here's what's happening with your rental business today.",
    rentals: "Track current reservations, returns, and upcoming due dates.",
    gear: "Manage your equipment inventory and availability.",
    users: "Manage members, permissions, and account status.",
    profile: "Manage your account details and workspace preferences.",
  }[section];

  function updateUserStatus(id: string, status: UserStatus) {
    setUsers((current) =>
      current.map((user) =>
        user.id === id ? { ...user, activeStatus: status } : user,
      ),
    );
  }

  function updateUserRole(id: string, role: UserRole) {
    setUsers((current) =>
      current.map((user) => (user.id === id ? { ...user, role } : user)),
    );
  }

  const userInitials = useMemo(() => {
    if (!currentUser?.name) return "US";

    return currentUser.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  }, [currentUser]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r border-[#e4ebe8] bg-card lg:flex">
        <div className="flex h-16 items-center gap-3 border-b px-6"></div>

        <nav
          className="flex flex-1 flex-col gap-1 px-4 py-6"
          aria-label="Main navigation"
        >
          <p className="px-3 pb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#9aa8a3]">
            Workspace
          </p>

          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => {
                setSection(id);
                setQuery("");
              }}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                section === id
                  ? "bg-[#eaf3ef] text-[#1f5d4f]"
                  : "text-[#71817b] hover:bg-[#f5f8f6] hover:text-[#24463c]"
              }`}
            >
              <Icon className="size-[18px]" />
              {label}
            </button>
          ))}

          <div className="mt-7 border-t border-[#eef2f0] pt-6">
            <p className="px-3 pb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#9aa8a3]">
              Account
            </p>

            <button
              onClick={() => setSection("profile")}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium ${
                section === "profile"
                  ? "bg-[#eaf3ef] text-[#1f5d4f]"
                  : "text-[#71817b] hover:bg-[#f5f8f6]"
              }`}
            >
              <UserRound className="size-[18px]" />
              Profile
            </button>
          </div>
        </nav>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-10 flex h-17 items-center justify-between border-b border-[#e4ebe8] bg-card/95 px-5 backdrop-blur sm:px-8">
          <div className="flex items-center gap-3 lg:hidden">
            <div className="flex size-8 items-center justify-center rounded-lg bg-[#1f5d4f] text-white">
              <PackageCheck className="size-4" />
            </div>

            <span className="font-semibold">GearUp</span>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <span className="text-sm text-[#90a09a]">Workspace</span>
            <span className="text-[#c5cfca]">/</span>

            <span className="text-sm font-medium text-[#3d534b]">
              {section === "overview" ? "Overview" : title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="relative rounded-lg p-2 text-[#71817b] hover:bg-[#f4f7f5]"
              aria-label="Notifications"
            >
              <Bell className="size-[18px]" />

              <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-[#da7058]" />
            </button>

            <div className="h-7 w-px bg-[#e4ebe8]" />

            <button className="flex items-center gap-2 rounded-lg p-1.5 pr-2 hover:bg-[#f4f7f5]">
              <Avatar initials={userInitials} />

              <span className="hidden text-sm font-medium text-[#3d534b] md:block">
                {currentUser?.name || "Loading..."}
              </span>

              <ChevronDown className="hidden size-4 text-[#9aa8a3] md:block" />
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10">
          <div className="mb-8 gap-4 sm:flex-row sm:items-end">
            <div className="flex flex-col items-center">
              <p className="mb-2 text-sm font-medium text-[#8a9c95]">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>

              <h1 className="text-2xl font-semibold tracking-[-0.03em] text-foreground sm:text-3xl">
                {title}
              </h1>

              <p className="mt-2 text-sm text-[#71817b]">{subtitle}</p>
            </div>
          </div>

          {loading ? (
            <div className="py-20 text-center text-sm text-[#8a9c95]">
              <Button disabled size="sm">
                <Spinner data-icon="inline-start" />
                Loading data...
              </Button>
            </div>
          ) : (
            <>
              {section === "overview" && (
                <Overview
                  onNavigate={setSection}
                  rentals={rentals}
                  gearCount={gear.length}
                  usersCount={users.length}
                />
              )}

              {section === "rentals" && (
                <>
                  <Toolbar
                    query={query}
                    setQuery={setQuery}
                    placeholder="Search rentals by ID, renter, or item..."
                  />

                  <RentalTable rentals={filteredRentals} />
                </>
              )}

              {section === "gear" && (
                <>
                  <Toolbar
                    query={query}
                    setQuery={setQuery}
                    placeholder="Search gear items..."
                  />

                  <GearTable items={filteredGear} />
                </>
              )}

              {section === "users" && (
                <>
                  <Toolbar
                    query={query}
                    setQuery={setQuery}
                    placeholder="Search by name or email..."
                  />

                  <UserTable
                    users={filteredUsers}
                    updateUserStatus={updateUserStatus}
                    updateUserRole={updateUserRole}
                  />
                </>
              )}

              {section === "profile" && (
                <Profile user={currentUser} initials={userInitials} />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export { DashboardPage };
