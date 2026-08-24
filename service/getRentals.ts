export async function getRentals() {
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/api/admin/rentals`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch rentals");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching rentals:", error);
    return [];
  }
}