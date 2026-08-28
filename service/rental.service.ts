import { apiClient } from "@/lib/api-client";
import { Rental } from "@/lib/type";


export type CreateRentalPayload = {
  gearItemId: string;
  startDate: string;
  endDate: string;
};

export async function createRental(
  payload: CreateRentalPayload,
) {
  return apiClient<Rental>("/api/rentals", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getMyRentals() {
  return apiClient<Rental[]>("/api/rentals");
}

export async function getRentalById(id: string) {
  return apiClient<Rental>(`/api/rentals/${id}`);
}