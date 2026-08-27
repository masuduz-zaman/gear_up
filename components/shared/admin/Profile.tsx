import { UserProfile } from "@/lib/type";
import Avatar from "./Avatar";

export default function Profile({
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
            <h2 className="font-semibold">
              {user?.name || "User Name"}
            </h2>

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
