import { siteConfig } from "@/config/site";

export type Faq = { question: string; answer: string };

/**
 * Answers deliberately avoid anything not confirmed by the business — no
 * pricing, no hours, no delivery promises, no requirements.
 */
export const faqs: Faq[] = [
  {
    question: `Where is ${siteConfig.businessName} located?`,
    answer: `${siteConfig.businessName} is based in ${siteConfig.location}, serving drivers exploring ${siteConfig.area} and Southern California.`,
  },
  {
    question: "How large is the fleet?",
    answer: `${siteConfig.businessName} operates a fleet of more than ${siteConfig.fleetCountNumeric} vehicles. Current availability can change, so use the live availability link for the latest selection.`,
  },
  {
    question: "Can I reserve a vehicle on this website?",
    answer: `No. This website is designed to showcase ${siteConfig.businessName} and its fleet. Reservations and live availability are handled through the company's external booking profile.`,
  },
  {
    question: "Where can I see new vehicles and fleet updates?",
    answer: `Follow ${siteConfig.instagramHandle} on Instagram for vehicle photos, new additions and fleet updates.`,
  },
  {
    question: "Are the vehicles shown here always available?",
    answer:
      "Not necessarily. Featured vehicles may change, so check the live booking profile for current availability.",
  },
];
