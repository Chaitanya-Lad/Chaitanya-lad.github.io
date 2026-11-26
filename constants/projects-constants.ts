import { type Transition } from "motion/react";
import { type Project } from "@/types/portfolio-types";

export const MY_PROJECTS: Project[] = [
  {
    id: 1,
    title: "INFLAQUICK ESR Analyzer Portfolio",
    category: "MedTech · Product Delivery",
    description:
      "End-to-end requirements, planning and release coordination for the ED60, SC40 and PROMX ED120 analyzer portfolio.",
    subDescription: [
      "Own end-to-end product lifecycle activities for INFLAQUICK PROMX ED120 with the R&D Lead.",
      "Lead customer, vendor and distributor discussions for the INFLAQUICK ESR Analyzer portfolio.",
      "Oversee BRD, FRD, SRS, DRS, change requests and V&V documentation with full traceability.",
      "Coordinate development workflows, feature behavior, calculation logic, edge cases and integration needs.",
      "Review test coverage, V&V outcomes, regression risks and coordinate release readiness.",
    ],
    href: "https://strumed.com/products/esr-analyser/#ed120",
    logo: "",
    image: "/assets/infl-QUICK.png",
    accent: "from-aqua/40 to-royal/10",
    tags: [
      { id: 1, name: "BRD / FRD / SRS / DRS", path: "/assets/logos/react.svg" },
      { id: 2, name: "V&V", path: "/assets/logos/javascript.svg" },
      { id: 3, name: "Stakeholder Management", path: "/assets/logos/tailwindcss.svg" },
      { id: 4, name: "Release Management", path: "/assets/logos/javascript.svg" },
    ],
  },
  {
    id: 2,
    title: "Self-Hosted Docker Lab",
    category: "Infrastructure · 2026—Present",
    description:
      "Containerized services on Raspberry Pi, secure remote access, DNS, Tailscale and AI-assisted n8n workflows.",
    subDescription: [
      "Deployed and manage self-hosted applications on a Raspberry Pi using Docker and Docker Compose.",
      "Deployed Immich (open-source, Google Photos-style family photo library) with server-side face recognition.",
      "Deployed OmniRoute in a container to provide a unified API interface to multiple AI models/providers.",
      "Configured Cloudflare Tunnel, DNS and application subdomains for secure remote access without static public IP.",
      "Configured Tailscale for private remote access.",
      "Building AI-assisted n8n automations: using AI to understand requirements, design workflows, develop nodes/logic, test executions and deploy workflows.",
    ],
    href: "https://homer.chaitusnas.shop/",
    logo: "",
    image: "/assets/Screenshot From 2026-11-25 16-33-26.png",
    accent: "from-royal/40 to-lavender/10",
    tags: [
      { id: 1, name: "Docker", path: "/assets/logos/react.svg" },
      { id: 2, name: "Linux", path: "/assets/logos/javascript.svg" },
      { id: 3, name: "Cloudflare", path: "/assets/logos/tailwindcss.svg" },
      { id: 4, name: "n8n", path: "/assets/logos/javascript.svg" },
    ],
  },
  {
    id: 3,
    title: "Portfolio Website",
    category: "Personal · 2026",
    description:
      "Created and published a personal portfolio website using modern web technologies.",
    subDescription: [
      "Built a responsive, accessible portfolio website showcasing professional experience and projects.",
      "Implemented modern design with smooth animations and 3D visualizations.",
      "Optimized for performance, SEO and accessibility.",
      "Deployed on GitHub Pages with custom domain.",
    ],
    href: "https://chaitanya-lad.github.io/",
    logo: "",
    image: "/assets/Screenshot From 2026-11-26 12-40-27.png",
    accent: "from-fuchsia/40 to-royal/10",
    tags: [
      { id: 1, name: "Next.js", path: "/assets/logos/react.svg" },
      { id: 2, name: "TypeScript", path: "/assets/logos/javascript.svg" },
      { id: 3, name: "TailwindCSS", path: "/assets/logos/tailwindcss.svg" },
      { id: 4, name: "Three.js", path: "/assets/logos/javascript.svg" },
    ],
  },
  {
    id: 4,
    title: "WordPress E-Commerce Automation",
    category: "E-Commerce · 2021",
    description:
      "WordPress store with payment, inventory, billing and Shiprocket shipping integrations.",
    subDescription: [
      "Built a WordPress e-commerce platform integrated with Shiprocket and a UPI payment gateway.",
      "Supported billing, shipping labels, inventory, product management and order processing.",
      "Tested core purchase and fulfilment workflows.",
      "Integrated payment gateway and shipping/billing automation.",
    ],
    logo: "",
    image: "/projects/wordpress-ecommerce.svg",
    accent: "from-sand/40 to-coral/10",
    tags: [
      { id: 1, name: "WordPress", path: "/assets/logos/wordpress.svg" },
      { id: 2, name: "UPI", path: "/assets/logos/javascript.svg" },
      { id: 3, name: "Shiprocket", path: "/assets/logos/shiprocket.svg" },
      { id: 4, name: "Payment Gateway", path: "/assets/logos/javascript.svg" },
    ],
  },
  {
    id: 5,
    title: "IoT-Based Smart Home Automation",
    category: "IoT · 2019",
    description:
      "Arduino and Blynk system for remote device control, monitoring and Google Assistant voice control.",
    subDescription: [
      "Built an Arduino- and Raspberry Pi-based home automation system with remote control and monitoring.",
      "Integrated Google Assistant voice control for hands-free operation.",
      "Implemented remote device control and real-time monitoring capabilities.",
      "Designed hardware-software integration for IoT device management.",
    ],
    logo: "",
    image: "/projects/smart-home.svg",
    accent: "from-mint/40 to-aqua/10",
    tags: [
      { id: 1, name: "Arduino", path: "/assets/logos/react.svg" },
      { id: 2, name: "Blynk", path: "/assets/logos/javascript.svg" },
      { id: 3, name: "Google Assistant", path: "/assets/logos/tailwindcss.svg" },
      { id: 4, name: "IoT", path: "/assets/logos/javascript.svg" },
    ],
  },
];

export const TILT_SPRING: Transition = { stiffness: 200, damping: 18 };

export const TILT_RANGE: { x: [number, number]; y: [number, number] } = {
  x: [10, -10],
  y: [-14, 14],
};

export const TRACK_SPRING: Transition = { stiffness: 60, damping: 20 };

export const PREVIEW_WINDOW = 1;
