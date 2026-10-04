export interface HeroPhoto {
  src: string;
  blob: string;
}

export interface HeroSet {
  photos: [HeroPhoto, HeroPhoto];
}

export const heroSets: HeroSet[] = [
  {
    photos: [
      { src: "/images/hero-basketball.webp", blob: "#a6c81e" },
      { src: "/images/hero-dance.webp", blob: "#1c1c1c" },
    ],
  },
  {
    photos: [
      { src: "/images/hero-cricket.webp", blob: "#ec7d3c" },
      { src: "/images/hero-taekwondo.webp", blob: "#b8ad68" },
    ],
  },
  {
    photos: [
      { src: "/images/hero-science.webp", blob: "#e8506b" },
      { src: "/images/hero-shooting.webp", blob: "#ffc800" },
    ],
  },
  {
    photos: [
      { src: "/images/hero-pottery.webp", blob: "#8a6272" },
      { src: "/images/hero-painting.webp", blob: "#8f93b8" },
    ],
  },
];

export const logo = "/images/logo.webp";
export const campus = "/images/campus.webp";