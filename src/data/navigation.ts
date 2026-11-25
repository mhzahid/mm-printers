export const mainNav = [
  { href: "/", label: "Home", short: "Home" },
  { href: "/products", label: "Products", short: "Products" },
  { href: "/manufacturing", label: "Manufacturing & Capabilities", short: "Manufacturing" },
  { href: "/quality", label: "Quality & Sustainability", short: "Quality" },
  { href: "/facilities", label: "Facilities", short: "Facilities" },
  { href: "/about", label: "About Us", short: "About" },
  { href: "/global-buyers", label: "Global Buyers", short: "Global Buyers" },
  { href: "/contact", label: "Contact", short: "Contact" },
] as const;

/**
 * Header navigation (desktop bar and mobile menu). Contact is left out because the
 * "Request a quote" button beside it already leads to the contact page; it stays in the footer.
 * About sits last, after Global Buyers.
 */
export const headerNav = [
  ...mainNav.filter((item) => !["/about", "/contact"].includes(item.href)),
  ...mainNav.filter((item) => item.href === "/about"),
];

export const inquiryTypes = [
  { value: "product", label: "Product inquiry" },
  { value: "quotation", label: "Request a quotation" },
  { value: "custom", label: "Custom design or specification" },
  { value: "manufacturing", label: "Manufacturing capabilities" },
  { value: "packaging", label: "Packaging requirements" },
  { value: "other", label: "Other business inquiry" },
] as const;

export type InquiryType = (typeof inquiryTypes)[number]["value"];
