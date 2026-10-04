export interface PhoneLink {
  display: string;
  href: string;
}

export const contact = {
  helpline: { display: "+91-9837983791", href: "tel:+919837983791" } satisfies PhoneLink,
  landlines: [
    { display: "0135-2699444", href: "tel:01352699444" },
    { display: "0135-2699666", href: "tel:01352699666" },
  ] satisfies PhoneLink[],
  email: "info@tis.edu.in",
  address: "Dhoolkot, P.O – Selaqui, Chakrata Road, Dehradun-248011 (Uttarakhand)",
  mapsUrl: "https://maps.app.goo.gl/maBF8syXueQkw31E6",
  googleMapsUrl: "https://www.google.com/maps/place/Tula's+International+School+-+Best+Boarding+School+in+Dehradun+(Uttarakhand)/@30.3430336,77.8865903,17z/data=!3m1!4b1!4m6!3m5!1s0x390f2a8f6621db6d:0xb5df8a7bd77caf7d!8m2!3d30.3430336!4d77.8891652!16s%2Fm%2F0121_pmh?entry=ttu",
  applyUrl: "https://admission.tis.edu.in/",
  virtualTourUrl: "https://tis.edu.in/virtual-tour/",
  whatsappUrl: "https://wa.me/919837983791",
} as const;
