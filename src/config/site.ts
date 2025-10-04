export type NavItem = {
  title: string;
  href: string;
};

export const siteConfig = {
  name: "Anuraag",
  nav: [
    { title: "Home", href: "/" },
    { title: "Products", href: "/products" },
    { title: "Testimonials", href: "/testimonials" },
    { title: "About", href: "/about" },
    { title: "Contact Us", href: "/contact" },
  ] as NavItem[],
  footer: {
    links: [
      { title: "Privacy", href: "/privacy" },
      { title: "Terms", href: "/terms" },
      { title: "Support", href: "/support" },
      { title: "Contact", href: "/contact" },
    ] as NavItem[],
  },
};

export type SiteConfig = typeof siteConfig;


