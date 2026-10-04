import { services } from "./services";

/** A link to a page on the site, shared by the header, mobile menu and footer. */
export interface Link {
  label: string;
  href: string;
}

export const about: Link = { label: "About Emma", href: "/about/" };
export const research: Link = { label: "Research", href: "/projects/" };
export const faqs: Link = { label: "FAQs", href: "/faqs/" };
export const contact: Link = { label: "Contact Us", href: "/contact/" };

export const serviceLinks: Link[] = services.map((service) => ({ label: service.name, href: `/${service.id}/` }));

export const practicalLinks: Link[] = [
  { label: "Fees and cancellations", href: "/terms-and-conditions/" },
  { label: "Confidentiality", href: "/confidentiality/" },
  { label: "Privacy policy", href: "/privacy-policy/" },
  { label: "Complaints", href: "/complaints/" },
];
