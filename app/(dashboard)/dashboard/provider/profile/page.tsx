import Profile from "@/components/shared/admin/Profile";
import ProviderShell from "@/components/shared/provider/ProviderShell";
import { getMe } from "@/service/getMe";

export default async function ProviderProfilePage() {
  const result = await getMe();

  const user = result?.data ?? null;

  const userInitials =
    user?.name
      ?.split(" ")
      .map((part: string) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "P";

  return (
    <ProviderShell title="Profile">
      <Profile
        user={user}
        initials={userInitials}
      />
    </ProviderShell>
  );
}