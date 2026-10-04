export interface AboutCopy {
  title: string;
  intro: { text: string; accent?: boolean }[];
  paragraphs: string[];
  subtitle: string;
  body: string[];
}

export const about: AboutCopy = {
  title: "Welcome to Tulas International School (TIS)",
  intro: [
    { text: "Tulas International School was established in 2012 under the aegis of Rishabh Educational Trust to impart education through " },
    { text: "seamless opportunities.", accent: true },
  ],
  paragraphs: [
    "TIS is one of India’s top boarding and day schools in Dehradun, India.",
    "Our CBSE curriculum focuses on academic excellence, holistic development, and preparing students to be global leaders.",
    "Explore our programs, campus life, achievements, and why TIS is the preferred choice for parents across India.",
  ],
  subtitle: "Boarding and Day School Excellence",
  body: [
    "We provide world-class education, modern facilities, and a nurturing environment for students to thrive academically, socially, and culturally.",
    "Join TIS to be part of a community that encourages leadership, innovation, and lifelong learning.",
  ],
};