import { contact } from "@/data/contact";

export interface HomeHeadingPart {
  text: string;
  accent?: boolean;
}

export interface HomeSectionCopy {
  id: string;
  heading: HomeHeadingPart[];
}

export interface HomeAction {
  label: string;
  cursorLabel: string;
  href: string;
  variant: "light" | "lightOutline";
}

export const homepageSections: HomeSectionCopy[] = [
  {
    id: "rankings-title",
    heading: [{ text: "Our " }, { text: "Rankings", accent: true }],
  },
];

export const homepageActions: HomeAction[] = [
  { label: "Apply Now", cursorLabel: "Apply", href: contact.applyUrl, variant: "light" },
  { label: "Book a Campus Visit", cursorLabel: "Visit", href: "#enquire", variant: "lightOutline" },
];