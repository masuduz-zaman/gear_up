import { apiClient } from "@/lib/api-client";
import { Category, CategoryResponse, GearItem, GearListResponse } from "@/lib/type";


function extractData<T>(
  response: T | { data: T },
): T {
  if (
    response &&
    typeof response === "object" &&
    "data" in response
  ) {
    return (response as { data: T }).data;
  }

  return response as T;
}

export async function getGear(): Promise<GearItem[]> {
  const response = await apiClient<GearListResponse>(
    "/api/gear",
  );

  const data = extractData(response);

  return Array.isArray(data) ? data : [];
}

export async function getCategories(): Promise<Category[]> {
  const response = await apiClient<CategoryResponse>(
    "/api/categories",
  );

  const data = extractData(response);

  return Array.isArray(data) ? data : [];
}

export async function getGearById(
  id: string,
): Promise<GearItem> {
  const response = await apiClient<
    GearItem | { data: GearItem }
  >(`/api/gear/${encodeURIComponent(id)}`);

  const data = extractData(response);

  if (!data) {
    throw new Error(`Gear not found: ${id}`);
  }

  return data;
}