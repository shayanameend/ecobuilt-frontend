enum Role {
  UNSPECIFIED = "UNSPECIFIED",
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  VENDOR = "VENDOR",
  USER = "USER",
}

enum UserStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

enum OtpType {
  VERIFY = "VERIFY",
  RESET = "RESET",
}

enum CategoryStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

enum OrderStatus {
  PENDING = "PENDING",
  REJECTED = "REJECTED",
  APPROVED = "APPROVED",
  CANCELLED = "CANCELLED",
  PROCESSING = "PROCESSING",
  IN_TRANSIT = "IN_TRANSIT",
  DELIVERED = "DELIVERED",
}

type DecodedUser = {
  access: string;
  id: string;
  email: string;
  status: UserStatus;
  role: Role;
  isVerified: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type CategoryType = {
  id: string;
  name: string;
  status: CategoryStatus;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type ProductType = {
  id: string;
  pictureIds: string[];
  name: string;
  description: string;
  sku: string;
  stock: number;
  price: number;
  salePrice: number;
  isDeleted: boolean;
  categoryId: string;
  vendorId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type { DecodedUser, CategoryType, ProductType };

export { Role, UserStatus, OtpType, CategoryStatus, OrderStatus };
