
// lib/type.ts

export type Section = "overview" | "rentals" | "gear" | "users" | "profile";
export type UserStatus = "Active" | "Pending" | "Suspended";

export type GearItem = {
  name: string;
  category: string;
  stock: number;
  rented: number;
  status: "Available" | "Low stock" | "Maintenance";
  price: string;
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
};

export type UserProfile = {
  name: string;
  email: string;
  role?: string;
  rentalsCount?: number;
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