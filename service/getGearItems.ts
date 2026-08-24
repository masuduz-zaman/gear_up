export async function getGearItems(token: string) {
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/api/admin/gear`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch gear items`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching gear items:", error);
    return null;
  }
}
