export type Gear = {
  id: string;
  photo: string;
  name: string;
  description: string;
  brand: string;
  pricePerDay: string;
  stock: number;
  isActive: boolean;
  categoryId: string;
  providerId: string;
  createdAt: string;
  updatedAt: string;
};



export type OrderStatus =
  | "PLACED"
  | "CONFIRMED"
  | "PAID"
  | "PICKED_UP"
  | "RETURNED"
  | "CANCELLED";

export type Order = {
  id: string;
  customerName: string;
  customerEmail: string;
  gearName: string;
  startDate: string;
  endDate: string;
  amount: number;
  status: OrderStatus;
};


export type CreateGearPayload = {
  name: string;
  description?: string;
  category: string;
  price: number;
  quantity: number;
  image?: string;
};