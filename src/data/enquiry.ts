export interface EnquiryFieldCopy {
  id: string;
  label: string;
  placeholder: string;
  required: boolean;
}

export const enquiryHeading: string[] = ["Enquire Now!"];
export const enquiryFields: EnquiryFieldCopy[] = [
  { id: "full-name", label: "Full name", placeholder: "Enter your Full Name....", required: true },
  { id: "email", label: "Email address (optional)", placeholder: "Enter Email Id (Optional)", required: false },
  { id: "mobile", label: "Mobile number", placeholder: "Enter your Mobile No....", required: true },
  { id: "class", label: "Class", placeholder: "Select Class", required: true },
  { id: "state", label: "State", placeholder: "Select State", required: true },
];

export const countryCode: string[] = ["+91"];
export const classes: string[] = ["Class IV", "Class V", "Class VI", "Class VII", "Class VIII", "Class IX", "Class X", "Class XI", "Class XII"];
export const states: string[] = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Other",
  "Pondicherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

export const consentCopy: string[] = [
  "I Agree to receive information regarding my submitted application by signing up on Tulas International School, Dehradun",
];
export const enquiryStatusCopy: string[] = ["Enquiry received.", "Please check the highlighted fields."];
export const enquiryErrors: Record<string, string> = {
  fullName: "Enter your Full Name....",
  email: "Enter a valid email address.",
  mobile: "Enter a valid 10-digit mobile number.",
  className: "Select Class",
  state: "Select State",
  consent: "Please agree to receive information regarding your submitted application.",
};