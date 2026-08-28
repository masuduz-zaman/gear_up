import { apiClient } from "@/lib/api-client";
import { UserProfile } from "@/lib/type";


export type UpdateProfilePayload = {
  name: string;
  profilePhoto?: string;
};

export async function getMyProfile() {
  return apiClient<UserProfile>("/api/auth/me");
}

export async function updateMyProfile(
  payload: UpdateProfilePayload,
) {
  return apiClient<UserProfile>("/api/auth/my-profile", {   
    method: "PUT",
    body: JSON.stringify(payload),
  });
}