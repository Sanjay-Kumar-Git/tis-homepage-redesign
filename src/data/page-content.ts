export interface SectionCopy {
  id: string;
  heading: string;
}

export const sectionCopy: SectionCopy[] = [
  { id: "future-title", heading: "Prepare your child for the future with the best!" },
  { id: "personalities-title", heading: "Influential Personalities On Campus" },
  { id: "leaders-title", heading: "Leaders of India" },
  { id: "awards-title", heading: "Awards" },
  { id: "tour-title", heading: "DIVE INTO OUR..." },
  { id: "parents-title", heading: "From The Parents" },
  { id: "reviews-title", heading: "Google Reviews" },
  { id: "collaborations-title", heading: "12+ COLLABORATIONS" },
];

export const futureCopy: string[] = ["Prepare your child for the future with the best!"];
export const awardsCopy: string[] = ["We believe in celebrating the hard work and perseverance of the best!", "See More"];
export const tourCopy: string[] = ["VIRTUAL TOUR"];
export const parentFeature: string[] = [
  "Tulas International School has truly exceeded our expectations. The focus on holistic development and the encouragement provided by the teachers have played a significant role in our child's growth. We are grateful for the personalized attention and the care the school offers.",
];

export interface UiCopy {
  primaryNavigation: string;
  openMenu: string;
  closeMenu: string;
  close: string;
  previous: string;
  next: string;
  apply: string;
  enquire: string;
  visit: string;
  whatsapp: string;
  skipToContent: string;
}

export const uiCopy: UiCopy[] = [
  {
    primaryNavigation: "Primary",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    close: "Close",
    previous: "Previous",
    next: "Next",
    apply: "Apply Now",
    enquire: "Enquire Now",
    visit: "Book a Campus Visit",
    whatsapp: "Chat on WhatsApp",
    skipToContent: "Skip to content",
  },
];
export const contactHeading: string[] = ["Contact Us."];
export const contactPanelCopy: string[] = ["Admission Helpline No.", "Landline No."];
export const personalitiesSubheading: string[] = ["Sports Person/Social Media Influencers"];
export const mapTitle: string[] = ["Map of Dhoolkot, P.O - Selaqui, Chakrata Road Dehradun, Uttarakhand India"];