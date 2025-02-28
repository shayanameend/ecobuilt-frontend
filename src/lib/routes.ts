const navRoutes = {
  products: {
    label: "Marketplace",
    url: () => "/marketplace",
  },
  vendors: {
    label: "Listings",
    url: () => "/listings",
  },
  community: {
    label: "Community Forum",
    url: () => "/community",
  },
  contact: {
    label: "Contact Us",
    url: () => "/contact",
  },
};

const authRoutes = {
  signIn: {
    label: "Sign In",
    url: () => "/auth/sign-in",
  },
  signUp: {
    label: "Sign Up",
    url: () => "/auth/sign-up",
  },
};

export { navRoutes, authRoutes };
