import { HERO_LOCATION, HERO_NAME, HERO_ROLE } from "./hero-constants";
import { CONTACT_EMAIL, MY_SOCIALS } from "./social-constants";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://chaitanya-lad.github.io"
).replace(/\/$/, "");

export const absoluteUrl = (path: string) =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

export const SITE_NAME = `${HERO_NAME} | ${HERO_ROLE}`;

export const SITE_TITLE = `${HERO_NAME} | ${HERO_ROLE}`;

export const SITE_DESCRIPTION =
  "Product lead and software delivery professional with approximately five years of MedTech experience. Product lifecycle ownership, business analysis and reliable software delivery in MedTech.";

export const SITE_TAGLINE =
  "Product lifecycle ownership, business analysis and reliable software delivery in MedTech.";

export const OG_IMAGE = "/og.jpg";
export const OG_IMAGE_ALT = `${HERO_NAME}, ${HERO_ROLE} portfolio`;
export const OG_LOCALE = "en_US";

export const OG_IMAGES = [
  {
    url: OG_IMAGE,
    width: 1200,
    height: 630,
    alt: OG_IMAGE_ALT,
  },
];

export const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "";

export const SITE_KEYWORDS = [
  HERO_NAME,
  "Product Lead",
  "Product Analyst",
  "Software Delivery",
  "MedTech",
  "Business Analysis",
  "Requirements Engineering",
  "V&V",
  "BRD",
  "FRD",
  "SRS",
  "DRS",
  "Product Lifecycle",
  "Release Management",
  "Python",
  "IoT",
  "Hardware-Software Integration",
  "Agile",
  "SDLC",
  "Testing",
  "Defect Tracking",
  "Stakeholder Management",
  HERO_LOCATION,
  "India",
  "Remote Work",
];

export const HOME_TITLE = `${HERO_NAME} | ${HERO_ROLE}`;

export const HOME_DESCRIPTION =
  "Product lead and software delivery professional with approximately five years of MedTech experience. Product lifecycle ownership, business analysis and reliable software delivery in MedTech.";

export const ADMIN_TITLE = "Contact submissions";

export const ADMIN_DESCRIPTION =
  "Private dashboard for contact form submissions. Not part of the public site.";

export const ADMIN_LOGIN_TITLE = "Sign in";

export const ADMIN_LOGIN_DESCRIPTION =
  "Sign in to the private contact submissions dashboard.";

export const SITE_SECTIONS = [
  {
    name: "Home",
    hash: "#home",
    description: `${HERO_NAME}, ${HERO_ROLE} building MedTech products.`,
  },
  {
    name: "About",
    hash: "#about",
    description: `Background, stack and working style of ${HERO_NAME}, a ${HERO_ROLE} based in ${HERO_LOCATION}.`,
  },
  {
    name: "Services",
    hash: "#services",
    description:
      "Product lifecycle coordination, requirements analysis, V&V, software delivery and technical consulting for MedTech teams.",
  },
  {
    name: "Work",
    hash: "#work",
    description:
      "Selected projects and case studies in MedTech, infrastructure and IoT.",
  },
  {
    name: "Testimonials",
    hash: "#testimonials",
    description: `What clients and teammates say about working with ${HERO_NAME}.`,
  },
  {
    name: "Contact",
    hash: "#contact",
    description: `Get in touch with ${HERO_NAME} about freelance, contract or full-time work.`,
  },
] as const;

export const SOCIAL_PROFILES = MY_SOCIALS.map((social) => social.href);

export const CONTACT_POINT_EMAIL = CONTACT_EMAIL;
