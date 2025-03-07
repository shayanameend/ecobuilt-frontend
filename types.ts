type DecodedUser = {
  access: string;
  id: string;
  email: string;
  status: UserStatus;
  role: Role;
  isVerified: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Data;
};

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

export type { DecodedUser };

export { Role, UserStatus, OtpType, CategoryStatus, OrderStatus };
