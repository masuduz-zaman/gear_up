import { User, UserRole, UserStatus } from "@/lib/type";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { updateStatus } from "@/service/updateStatus";
import { updateRole } from "@/service/updateRole";
import Avatar from "./Avatar";

export default function UserTable({
  users,
  updateUserStatus,
  updateUserRole,
}: {
  users: User[];
  updateUserStatus: (id: string, status: UserStatus) => void;
  updateUserRole: (id: string, role: UserRole) => void;
}) {
  async function handleStatus(userId: string, status: UserStatus) {
    try {
      await updateStatus(userId, status);

      updateUserStatus(userId, status);
    } catch (error) {
      console.error("Failed to update user status:", error);
    }
  }


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
            className="grid gap-6 px-5 py-4 sm:grid-cols-5 sm:items-center sm:px-5"
          >
            {/* User */}
            <div className="flex items-center gap-3">
              <Avatar
                initials={
                  user.initials ||
                  user.name?.slice(0, 2).toUpperCase() ||
                  "U"
                }
              />

              <div className="flex flex-col">
                <p className="text-sm font-semibold">{user.name}</p>

                <p className="mt-1 text-xs text-[#8a9c95]">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Rentals */}
            <div className="text-sm text-[#536961]">
              <span className="text-xs text-[#99a69f]">
                {user.rentals ?? 0}{" "}
              </span>
              rentals
            </div>

            {/* Joined */}
            <div className="text-sm text-[#536961]">
              {user.joined ?? "N/A"}
            </div>

            {/* Role */}
            {/* <div>
              <NativeSelect
                value={user.role}
                onChange={(e) =>
                  handleRole(
                    user.id,
                    e.target.value as UserRole
                  )
                }
              >
                <NativeSelectOption value="CUSTOMER">
                  CUSTOMER
                </NativeSelectOption>

                <NativeSelectOption value="PROVIDER">
                  PROVIDER
                </NativeSelectOption>

                <NativeSelectOption value="ADMIN">
                  ADMIN
                </NativeSelectOption>
              </NativeSelect>
            </div> */}

            {/* Status */}
            <div>
              <NativeSelect
                value={user.activeStatus}
                onChange={(e) =>
                  handleStatus(
                    user.id,
                    e.target.value as UserStatus
                  )
                }
              >
                <NativeSelectOption value="ACTIVE">
                  ACTIVE
                </NativeSelectOption>

                <NativeSelectOption value="SUSPENDED">
                  SUSPENDED
                </NativeSelectOption>
              </NativeSelect>
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
