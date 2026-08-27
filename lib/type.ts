

export type Section = "overview" | "rentals" | "gear" | "users" | "profile";
export type UserStatus = "ACTIVE" | "SUSPENDED";
export type UserRole = "ADMIN" | "CUSTOMER" | "PROVIDER";

export type GearItem = {
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
  provider: {
    id: string;
    name: string;
    email: string;
    activeStatus: string;
  };
  _count: {
    rentalOrders: number;
    reviews: number;
  };
};

export type Rental = {
  id: string;
  customerId: string;
  gearItemId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  OrderStatus:"PLACED" | "PENDING" | "CONFIRMED" | "PAID" | "PICKED_UP" | "RETURNED" | "CANCELLED";
  createdAt: string;
  updatedAt: string;
  customer: {
    id: string;
    name: string;
    profile: {
      profilePhoto: "null";
    };
  };
  gearItem:{
    id:string;
    name:string;
    brand:string;
    pricePerDay:string;
    provider:{
      id:string;
      name:string;
    }
  }
};

export type User = {
  id: string;
  name: string;
  email: string;
  initials: string;
  rentals: number;
  joined: string;
  activeStatus: UserStatus;
  role: UserRole;
};

export type UserProfile = {
  name: string;
  email: string;
  role?: string;
  rentalsCount?: number;
  createdAt: string;
};

export type LoginState = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
};
