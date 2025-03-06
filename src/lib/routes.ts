const navRoutes = {
  marketplace: {
    label: "Marketplace",
    url: () => "/marketplace",
  },
  vendors: {
    label: "Vendors",
    url: () => "/vendors",
  },
  community: {
    label: "Community",
    url: () => "/community",
  },
  contact: {
    label: "Contact",
    url: () => "/contact",
  },
};

const authRoutes = {
  signUp: {
    label: "Sign Up",
    url: () => "/auth/sign-up",
  },
  signIn: {
    label: "Sign In",
    url: () => "/auth/sign-in",
  },
  verifyOtp: {
    label: "Verify Otp",
    url: () => "/auth/verify-otp",
  },
  forgotPassword: {
    label: "Forgot Password",
    url: () => "/auth/forgot-password",
  },
  updatePassword: {
    label: "Update Password",
    url: () => "/auth/update-password",
  },
  error: {
    label: "Error",
    url: () => "/auth/error",
  },
};

const apiRoutes = {
  auth: {
    signUp: () => `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/sign-up`,
    signIn: () => `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/sign-in`,
    forgotPassword: () =>
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/forgot-password`,
    resendOtp: () => `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/resend-otp`,
    verifyOtp: () => `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify-otp`,
    updatePassword: () =>
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/update-password`,
    refreshToken: () => `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`,
  },
};

export { navRoutes, authRoutes, apiRoutes };
