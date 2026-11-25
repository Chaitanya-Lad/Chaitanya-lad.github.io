import { type Service } from "@/types/portfolio-types";

export const SERVICES: Service[] = [
  {
    id: 1,
    title: "Product Lifecycle Coordination",
    description:
      "End-to-end product ownership from customer discovery and feasibility through validation and software delivery.",
    bullets: [
      "Product planning & roadmap definition",
      "Stakeholder alignment & cross-functional coordination",
      "Release readiness & post-deployment follow-up",
    ],
  },
  {
    id: 2,
    title: "Requirements Analysis & Documentation",
    description:
      "Comprehensive requirements engineering with BRD, FRD, SRS, DRS and change request management.",
    bullets: [
      "Business & functional requirements (BRD/FRD)",
      "System & design specifications (SRS/DRS)",
      "Traceability from requirements through delivery",
    ],
  },
  {
    id: 3,
    title: "Verification & Validation",
    description:
      "Medical-device quality assurance with V&V planning, test case design, regression testing and defect tracking.",
    bullets: [
      "V&V planning & traceability matrices",
      "Manual & beta validation testing",
      "Regression testing & defect management",
    ],
  },
  {
    id: 4,
    title: "Software Delivery & Technical Integration",
    description:
      "Hands-on development coordination with Python, IoT, hardware-software integration and release management.",
    bullets: [
      "Python modules for sensor acquisition & device communication",
      "Hardware-software integration & touchscreen workflows",
      "Release notes, installation/upgrade instructions",
    ],
  },
];
