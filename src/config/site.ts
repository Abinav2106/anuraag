export type NavItem = {
  title: string;
  href: string;
};

export const siteConfig = {
  name: "Anuraag",
  nav: [
    { title: "Home", href: "/" },
    { title: "Products", href: "/products" },
    { title: "Markets", href: "/markets" },
    { title: "Quality", href: "/quality" },
    { title: "About", href: "/about" },
    { title: "Dealers", href: "/dealers" },
    { title: "Get Quote", href: "/quote" },
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


