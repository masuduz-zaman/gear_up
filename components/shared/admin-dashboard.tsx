"use client";

import {
  Section,
  User,
  UserStatus,
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
  MoreHorizontal,
  PackageCheck,
  Plus,
  Search,
  SlidersHorizontal,
  Users,
  UserRound,
  X,
} from "lucide-react";
import { getUsers } from "@/service/getUser";
import { getMe } from "@/service/getMe";
import { getGearItems } from "@/service/getGearItems";
import { getRentals } from "@/service/getRentals";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

const navItems: { id: Section; label: string; icon: typeof LayoutDashboard }[] =
  [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "rentals", label: "All rentals", icon: ClipboardList },
    { id: "gear", label: "All gear items", icon: Box },
    { id: "users", label: "All users", icon: Users },
  ];

function StatusPill({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Active: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    Available: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    Returned: "bg-slate-100 text-slate-600 ring-slate-200",
    Pending: "bg-amber-50 text-amber-700 ring-amber-200",
    "Due soon": "bg-orange-50 text-orange-700 ring-orange-200",
    "Low stock": "bg-orange-50 text-orange-700 ring-orange-200",
    Suspended: "bg-rose-50 text-rose-700 ring-rose-200",
    Maintenance: "bg-slate-100 text-slate-600 ring-slate-200",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
        styles[status] ?? "bg-slate-100 text-slate-600 ring-slate-200"
      }`}
    >
      {status}
    </span>
  );
}

function Avatar({
  initials,
  large = false,
}: {
  initials: string;
  large?: boolean;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-[#dce9e4] font-semibold text-[#356557] ${
        large ? "size-14 text-lg" : "size-9 text-xs"
      }`}
    >
      {initials}
    </span>
  );
}

export default function RentalDashboard() {
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
          [getMe(), getUsers(), getGearItems(""), getRentals()],
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
      rentals.filter((rental) =>
        `${rental?.id || ""} ${rental?.renter || ""} ${rental?.item || ""}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [rentals, query],
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

  function updateUserStatus(id: number, status: UserStatus) {
    setUsers((current) =>
      current.map((u) => (u.id === id ? { ...u, status } : u)),
    );
    setUserMenu(null);
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
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
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
            {(section === "gear" || section === "users") && (
              <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1f5d4f] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#174d41]">
                <Plus className="size-4" />
                {section === "gear" ? "Add gear item" : "Invite user"}
              </button>
            )}
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
                    userMenu={userMenu}
                    setUserMenu={setUserMenu}
                    updateUserStatus={updateUserStatus}
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

function Overview({
  onNavigate,
  rentals,
  gearCount,
  usersCount,
}: {
  onNavigate: (section: Section) => void;
  rentals: Rental[];
  gearCount: number;
  usersCount: number;
}) {
  const activeRentalsCount = useMemo(
    () => rentals.filter((r) => r.status === "Active").length,
    [rentals],
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric
          label="Active rentals"
          value={String(activeRentalsCount)}
          detail="Currently in use"
          icon={ClipboardList}
          positive
        />
        <Metric
          label="Total gear items"
          value={String(gearCount)}
          detail="Total listed items"
          icon={Box}
        />
        <Metric
          label="Registered users"
          value={String(usersCount)}
          detail="Total registered members"
          icon={Users}
          positive
        />
        <Metric
          label="Monthly revenue"
          value="$8,492"
          detail="+18.4% from last month"
          icon={PackageCheck}
          positive
        />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.45fr_1fr]">
        <section className="rounded-xl border border-[#e4ebe8] bg-card p-5 sm:p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="font-semibold">Rental activity</h2>
              <p className="mt-1 text-xs text-[#8a9c95]">
                Bookings and returns over the last 7 days
              </p>
            </div>
            <button
              onClick={() => onNavigate("rentals")}
              className="text-xs font-semibold text-[#1f5d4f]"
            >
              View all rentals →
            </button>
          </div>
          <div className="flex h-48 items-end gap-3 border-b border-[#edf2ef] px-2 pb-0 sm:gap-6">
            <div className="flex h-full flex-1 flex-col justify-between py-2 text-[10px] text-[#a3b0ab]">
              <span>40</span>
              <span>30</span>
              <span>20</span>
              <span>10</span>
              <span>0</span>
            </div>
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
              <div
                key={day}
                className="flex h-full flex-1 flex-col items-center justify-end gap-2"
              >
                <div className="flex h-[84%] w-full items-end justify-center gap-1.5 sm:gap-2">
                  <span
                    className="w-2 rounded-t-sm bg-[#c9ddd5] sm:w-3"
                    style={{ height: `${[42, 58, 48, 72, 64, 78, 55][i]}%` }}
                  />
                  <span
                    className="w-2 rounded-t-sm bg-[#1f5d4f] sm:w-3"
                    style={{ height: `${[28, 44, 36, 52, 45, 60, 40][i]}%` }}
                  />
                </div>
                <span className="pb-2 text-[10px] text-[#93a29c]">{day}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-center gap-5 text-[11px] text-[#83938c]">
            <span className="flex items-center gap-1.5">
              <i className="size-2 rounded-full bg-[#1f5d4f]" />
              New rentals
            </span>
            <span className="flex items-center gap-1.5">
              <i className="size-2 rounded-full bg-[#c9ddd5]" />
              Returns
            </span>
          </div>
        </section>
        <section className="rounded-xl border border-[#e4ebe8] bg-card p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-semibold">Inventory health</h2>
              <p className="mt-1 text-xs text-[#8a9c95]">
                Current gear availability
              </p>
            </div>
            <button
              onClick={() => onNavigate("gear")}
              className="rounded-lg p-2 text-[#8a9c95] hover:bg-[#f4f7f5]"
              aria-label="Inventory filters"
            >
              <SlidersHorizontal className="size-4" />
            </button>
          </div>
          <div className="flex items-center gap-6">
            <div
              className="relative flex size-32 shrink-0 items-center justify-center rounded-full"
              style={{
                background:
                  "conic-gradient(#1f5d4f 0 71%, #d9e8e1 71% 91%, #f2b36b 91% 100%)",
              }}
            >
              <div className="flex size-24 flex-col items-center justify-center rounded-full bg-card">
                <span className="text-2xl font-semibold">{gearCount}</span>
                <span className="text-[10px] text-[#8a9c95]">total items</span>
              </div>
            </div>
            <div className="space-y-3 text-xs">
              <Legend color="bg-[#1f5d4f]" label="Available" value="68" />
              <Legend color="bg-[#d9e8e1]" label="Rented" value="20" />
              <Legend color="bg-[#f2b36b]" label="Attention" value="8" />
            </div>
          </div>
          <div className="mt-6 rounded-lg bg-[#f5f8f6] p-3 text-xs text-[#71817b]">
            <span className="font-semibold text-[#355d51]">Good shape.</span>{" "}
            71% of your inventory is available today.
          </div>
        </section>
      </div>
      <section className="rounded-xl border border-[#e4ebe8] bg-card">
        <div className="flex items-center justify-between border-b border-[#eef2f0] px-5 py-4 sm:px-6">
          <div>
            <h2 className="font-semibold">Recent rentals</h2>
            <p className="mt-1 text-xs text-[#8a9c95]">
              Latest activity from your workspace
            </p>
          </div>
          <button
            onClick={() => onNavigate("rentals")}
            className="text-xs font-semibold text-[#1f5d4f]"
          >
            See all →
          </button>
        </div>
        <RentalRows rentals={rentals} limit={3} />
      </section>
    </div>
  );
}

function Metric({
  label,
  value,
  detail,
  icon: Icon,
  positive,
}: {
  label: string;
  value: string;
  detail: string;
  icon: typeof Box;
  positive?: boolean;
}) {
  return (
    <div className="rounded-xl border border-[#e4ebe8] bg-card p-5">
      <div className="flex items-start justify-between">
        <div className="flex size-9 items-center justify-center rounded-lg bg-[#edf6f2] text-[#1f5d4f]">
          <Icon className="size-[18px]" />
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9aa8a4]">
          This month
        </span>
      </div>
      <p className="mt-5 text-2xl font-semibold tracking-[-0.04em]">{value}</p>
      <p className="mt-1 text-xs text-[#71817b]">{label}</p>
      <p
        className={`mt-3 text-[11px] font-medium ${
          positive ? "text-[#3e846d]" : "text-[#a2754b]"
        }`}
      >
        {positive ? "↗ " : ""}
        {detail}
      </p>
    </div>
  );
}

function Legend({
  color,
  label,
  value,
}: {
  color: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className={`size-2.5 rounded-full ${color}`} />
      <span className="w-16 text-[#71817b]">{label}</span>
      <strong className="font-semibold text-[#3d534b]">{value}</strong>
    </div>
  );
}

function Toolbar({
  query,
  setQuery,
  placeholder,
}: {
  query: string;
  setQuery: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div className="mb-5 flex flex-col gap-3 rounded-xl border border-[#e4ebe8] bg-card p-3 sm:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#9aa8a3]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="h-10 w-full rounded-lg bg-[#f5f8f6] pl-10 pr-10 text-sm outline-none placeholder:text-[#a2afa9] focus:ring-2 focus:ring-[#c6ded5]"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#91a19a]"
            aria-label="Clear search"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
      <button className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#dfe8e3] px-4 text-sm font-medium text-[#5c7169] hover:bg-[#f5f8f6]">
        <SlidersHorizontal className="size-4" /> Filters
      </button>
    </div>
  );
}

function RentalTable({ rentals }: { rentals: Rental[] }) {
  return (
    <section className="overflow-hidden rounded-xl border border-[#e4ebe8] bg-card">
      <div className="flex items-center justify-between border-b border-[#eef2f0] px-5 py-4 sm:px-6">
        <div>
          <h2 className="font-semibold">
            Rental history{" "}
            <span className="ml-1 text-xs font-normal text-[#98a69f]">
              {rentals.length} rentals
            </span>
          </h2>
          <p className="mt-1 text-xs text-[#8a9c95]">
            All reservations linked to your account
          </p>
        </div>
        <button className="rounded-lg border border-[#dfe8e3] px-3 py-2 text-xs font-semibold text-[#5c7169]">
          Export CSV
        </button>
      </div>
      <RentalRows rentals={rentals} />
    </section>
  );
}

function RentalRows({ rentals, limit }: { rentals: Rental[]; limit?: number }) {
  const dataToDisplay = limit ? rentals.slice(0, limit) : rentals;

  return (
    <div className="divide-y divide-[#eef2f0]">
      {dataToDisplay.map((rental) => (
        <div
          key={rental.id}
          className="grid gap-3 px-5 py-4 sm:grid-cols-[1fr_1.3fr_1fr_1fr_auto] sm:items-center sm:px-6"
        >
          <div>
            <p className="text-sm font-semibold">{rental.id}</p>
            <p className="mt-1 text-xs text-[#93a19b]">{rental.date}</p>
          </div>
          <div className="flex items-center gap-3">
            <Avatar
              initials={
                rental.renter
                  ? rental.renter
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                  : "U"
              }
            />
            <div>
              <p className="text-sm font-medium">{rental.renter}</p>
              <p className="mt-1 text-xs text-[#8a9c95]">{rental.item}</p>
            </div>
          </div>
          <div className="text-sm text-[#5c7169]">
            <span className="text-xs text-[#9aaa04]">Due </span>
            {rental.due}
          </div>
          <StatusPill status={rental.status} />
          <button
            className="hidden rounded-md p-2 text-[#9aa8a3] hover:bg-[#f5f8f6] sm:block"
            aria-label={`Actions for ${rental.id}`}
          >
            <MoreHorizontal className="size-4" />
          </button>
        </div>
      ))}
      {dataToDisplay.length === 0 && (
        <p className="p-10 text-center text-sm text-[#8a9c95]">
          No rental records found.
        </p>
      )}
    </div>
  );
}

function GearTable({ items }: { items: GearItem[] }) {
  return (
    <section className="overflow-hidden rounded-xl border border-[#e4ebe8] bg-card">
      <div className="flex items-center justify-between border-b border-[#eef2f0] px-5 py-4 sm:px-6">
        <div>
          <h2 className="font-semibold">
            Gear inventory{" "}
            <span className="ml-1 text-xs font-normal text-[#98a69f]">
              {items.length} items
            </span>
          </h2>
        </div>
      </div>
      <div className="divide-y divide-[#eef2f0]">
        {items.map((item) => (
          <div
            key={item.name}
            className="grid gap-3 px-5 py-4 sm:grid-cols-[1.5fr_1fr_0.7fr_0.8fr_0.8fr_auto] sm:items-center sm:px-6"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-[#f0f5f2] text-[#4f776a]">
                <Box className="size-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">{item.name}</p>
                <p className="mt-1 text-xs text-[#8a9c95]">{item.categoryId}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-[#536961]">{item.pricePerDay}</p>
            </div>
            <div>
              <p className="text-sm font-medium">{item.stock}</p>
              <p className="text-xs text-[#99a69f]">in stock</p>
            </div>
            <div>
              <p className="text-sm font-medium">
                {item._count?.rentalOrders ?? 0}
              </p>
              <p className="text-xs text-[#99a69f]">rented</p>
            </div>
            <StatusPill status={item?.provider?.activeStatus || "Available"} />
            <button
              className="rounded-md p-2 text-[#9aa8a3] hover:bg-[#f5f8f6]"
              aria-label={`Actions for ${item.name}`}
            >
              <MoreHorizontal className="size-4" />
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <p className="p-10 text-center text-sm text-[#8a9c95]">
            No gear items found.
          </p>
        )}
      </div>
    </section>
  );
}

function UserTable({
  users,
  userMenu,
  setUserMenu,
  updateUserStatus,
}: {
  users: User[];
  userMenu: number | null;
  setUserMenu: (id: number | null) => void;
  updateUserStatus: (id: number, status: UserStatus) => void;
}) {
  return (
    <section className="overflow-visible rounded-xl border border-[#e4ebe8] bg-card">
      <div className="flex items-center justify-between border-b border-[#eef2f0] px-5 py-4 sm:px-6">
        <div>
          <h2 className="font-semibold">
            Member directory{" "}
            <span className="ml-1 text-xs font-normal text-[#98a69f]">
              {users.length} users
            </span>
          </h2>
        </div>
      </div>
      <div className="divide-y divide-[#eef2f0]">
        {users.map((user) => (
          <div
            key={user.id}
            className="grid gap-3 px-5 py-4 sm:grid-cols-[1.6fr_0.7fr_0.8fr_0.8fr_auto] sm:items-center sm:px-6"
          >
            <div className="flex items-center gap-3">
              <Avatar
                initials={
                  user.initials || user.name?.slice(0, 2).toUpperCase() || "U"
                }
              />
              <div>
                <p className="text-sm font-semibold">{user.name}</p>
                <p className="mt-1 text-xs text-[#8a9c95]">{user.email}</p>
              </div>
            </div>
            <div className="text-sm text-[#536961]">
              <span className="text-xs text-[#99a69f]">
                {user.rentals ?? 0}{" "}
              </span>
              rentals
            </div>
            <div className="text-sm text-[#536961]">{user.joined ?? "N/A"}</div>
            <StatusPill status={user.status} />
            <div className="relative flex justify-end">
              <button
                onClick={() =>
                  setUserMenu(userMenu === user.id ? null : user.id)
                }
                className="rounded-md p-2 text-[#9aa8a3] hover:bg-[#f5f8f6]"
                aria-label={`Update status for ${user.name}`}
              >
                <MoreHorizontal className="size-4" />
              </button>
              {userMenu === user.id && (
                <div className="absolute right-0 top-10 z-30 w-36 rounded-lg border border-[#dfe8e3] bg-card p-1.5 shadow-lg">
                  <p className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#9aa8a3]">
                    Set status
                  </p>
                  {(["Active", "Pending", "Suspended"] as UserStatus[]).map(
                    (status) => (
                      <button
                        key={status}
                        onClick={() => updateUserStatus(user.id, status)}
                        className="block w-full rounded-md px-2 py-2 text-left text-xs font-medium text-[#536961] hover:bg-[#f1f7f4]"
                      >
                        {status}
                      </button>
                    ),
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
        {users.length === 0 && (
          <p className="p-10 text-center text-sm text-[#8a9c95]">
            No users found.
          </p>
        )}
      </div>
    </section>
  );
}

function Profile({
  user,
  initials,
}: {
  user: UserProfile | null;
  initials: string;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <section className="rounded-xl border border-[#e4ebe8] bg-card p-6">
        <div className="flex items-center gap-4">
          <Avatar initials={initials} large />
          <div>
            <h2 className="font-semibold">{user?.name || "User Name"}</h2>
            <p className="mt-1 text-sm text-[#8a9c95]">
              {user?.role || "Workspace Member"}
            </p>
          </div>
        </div>
        <div className="mt-7 space-y-4 border-t border-[#eef2f0] pt-5">
          <div>
            <p className="text-xs text-[#98a69f]">Email address</p>
            <p className="mt-1 text-sm font-medium">
              {user?.email || "No email available"}
            </p>
          </div>
          <div>
            <p className="text-xs text-[#98a69f]">Member since</p>
            <p className="mt-1 text-sm font-medium">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "January 18, 2024"}
            </p>
          </div>
        </div>
        <button className="mt-7 w-full rounded-lg border border-[#dfe8e3] py-2.5 text-sm font-semibold text-[#5c7169] hover:bg-[#f5f8f6]">
          Edit profile
        </button>
      </section>
    </div>
  );
}

export { RentalDashboard };
