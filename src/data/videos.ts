export interface RemoteVideo {
  id: string;
  src: string;
  poster: string;
  section: "campus" | "parent";
  alt: string;
}

export const campusVideos: RemoteVideo[] = [
  { id: "campus-desktop", src: "https://assets.tulas.edu.in/Desktop_TIS.mp4", poster: "/images/campus.webp", section: "campus", alt: "Tulas International School campus" },
  { id: "campus-mobile", src: "https://assets.tulas.edu.in/Mobile_TIS.mp4", poster: "/images/campus.webp", section: "campus", alt: "Tulas International School campus" },
];

export const parentVideos: RemoteVideo[] = [
  { id: "parent-1", src: "https://assets.tulas.edu.in/tis/1VIDEO-compressed.mp4", poster: "/images/campus.webp", section: "parent", alt: "Parent testimonial video" },
  { id: "parent-2", src: "https://assets.tulas.edu.in/tis/2VIDEO-compressed.mp4", poster: "/images/campus.webp", section: "parent", alt: "Parent testimonial video" },
  { id: "parent-3", src: "https://assets.tulas.edu.in/tis/3VIDEO-compressed.mp4", poster: "/images/campus.webp", section: "parent", alt: "Parent testimonial video" },
];

export const applicationStages: string[] = [
  "Please fill in your personal details in the form above and register as a user. Once registered, you can use your Mobile Number to Login.",
  "Fill your academic details and upload your documents.",
  "Complete your application form and pay the application fee.",
  "We will send you confirmation email for Interview Date subject to availability.",
];