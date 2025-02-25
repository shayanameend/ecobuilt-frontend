const navRoutes = {
  products: {
    label: "Marketplace",
    url: () => "/marketplace",
  },
  vendors: {
    label: "Your Listings",
    url: () => "/your-listings",
  },
  community: {
    label: "Community Forum",
    url: () => "/community-forum",
  },
  contact: {
    label: "Contact Us",
    url: () => "/contact-us",
  },
};

const authRoutes = {
  signIn: {
    label: "Sign In",
    url: () => "/sign-in",
  },
  signUp: {
    label: "Sign Up",
    url: () => "/sign-up",
  },
};

export { navRoutes, authRoutes };
