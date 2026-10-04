import { contact } from "@/data/contact";

export interface FooterLink {
  label: string;
  href: string;
}

export interface SocialLink extends FooterLink {
  icon: "facebook" | "twitter" | "linkedin" | "instagram" | "youtube";
}

export const footerLinks: FooterLink[] = [
  { label: "FAQ", href: "/faq/" },
  { label: "Calendar", href: "/MandatoryPDF/TIS_CALENDAR_2024__PDF.pdf" },
  { label: "Brochure", href: "/MandatoryPDF/TIS_BROCHURE.pdf" },
  { label: "Privacy Policy", href: "/privacy-policy/" },
  { label: "Terms & Conditions", href: "/terms-conditions/" },
  { label: "Disclaimer", href: "/disclaimer/" },
  { label: "Disciplinary Policy", href: "/MandatoryPDF/DisciplinaryPolicy.pdf" },
  { label: "Mobile Phone Policy", href: "/MandatoryPDF/MobilePhonePolicy.pdf" },
  { label: "Child Welfare & Safety Policy", href: "/MandatoryPDF/childWelfarePolicy.pdf" },
];

export const footerActions: FooterLink[] = [
  { label: "Virtual Tour", href: contact.virtualTourUrl },
  { label: "Apply Now", href: contact.applyUrl },
  { label: "Fedena Login", href: "https://tis.fedena.com/" },
];

export const socialLinks: SocialLink[] = [
  { label: "faceBook", href: "https://www.facebook.com/tulasinternationalschool/", icon: "facebook" },
  { label: "twitter", href: "https://twitter.com/tulas_intschool?lang=en", icon: "twitter" },
  { label: "linkedin", href: "https://www.linkedin.com/school/tulas-international-school/?originalSubdomain=in", icon: "linkedin" },
  { label: "instagram", href: "https://www.instagram.com/tulasinternationalschool/?hl=en", icon: "instagram" },
  { label: "youtube", href: "https://www.youtube.com/channel/UC-eRtybnv3GvfvcWxQq93zw", icon: "youtube" },
];

export const footerCopy: string[] = [
  "Copyright © 2026 Tulas International School, Dehradun | All Rights Reserved",
  "Designed and Managed By",
  "NetPuppys",
];

export const mapEmbedUrl = "https://maps.google.com/maps?q=Dhoolkot%2C%20P.O%20-%20Selaqui%2C%20Chakrata%20Road%20Dehradun%2C%20Uttarakhand%20India%3A%20Dhoolkot%2C%20P.O%20-%20Selaqui%2C%20Chakrata%20Road%3B%20Dehradun%2C%20Uttarakhand%3B%20India&t=m&z=10&output=embed&iwloc=near";