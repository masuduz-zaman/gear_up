export async function updateRole(role: string) {
  const response = await fetch(`/api/admin/users/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      role,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update role");
  }

  return response.json();
}
