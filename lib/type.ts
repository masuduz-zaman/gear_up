
// lib/type.ts

export type Section = "overview" | "rentals" | "gear" | "users" | "profile";
export type UserStatus = "Active" | "Pending" | "Suspended";

export type GearItem = {
  id:string;
  photo:string;
  name: string;
  description:string;
  brand:string;
  pricePerDay: string;
  stock: number;
  isActive: boolean;
  categoryId: string;
  providerId: string;
  createdAt: string;
  updatedAt: string;
  provider:{
    id:string;
    name:string;
    email:string;
    activeStatus:string
  }
  _count: {
    rentalOrders: number;
    reviews:number;
  }
};

export type Rental = {
  id: string;
  renter: string;
  item: string;
  date: string;
  due: string;
  status: "Active" | "Due soon" | "Returned";
};

export type User = {
  id: number;
  name: string;
  email: string;
  initials: string;
  rentals: number;
  joined: string;
  status: UserStatus;
  role : "ADMIN" | "CUSTOMER" | "PROVIDER"
};

export type UserProfile = {
  name: string;
  email: string;
  role?: string;
  rentalsCount?: number;
  createdAt: string;
};

export type LoginState ={
  success: boolean,
  statusCode: number,
  message:string,
  data:{
    accessToken:string,
    refreshToken:string
  }
}