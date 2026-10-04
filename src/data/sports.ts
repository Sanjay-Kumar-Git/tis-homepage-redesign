export interface Sport {
  name: string;
  image?: string;
}

export interface SportsCopyPart {
  text: string;
  accent?: boolean;
}

export interface SportsCopy {
  heading: SportsCopyPart[];
  statement: SportsCopyPart[];
  description: string;
  regionLabel: string;
  previousLabel: string;
  nextLabel: string;
  goToLabel: string;
}

export const sportsCopy: SportsCopy[] = [
  {
    heading: [{ text: "Sports", accent: true }, { text: " ?" }],
    statement: [
      { text: "It’s not just a " },
      { text: "facility", accent: true },
      { text: ". At Tulas it’s the " },
      { text: "foundation", accent: true },
      { text: "!" },
    ],
    description: "16+ sports curated to bring joy and discipline to your life.",
    regionLabel: "Sports",
    previousLabel: "Previous sports",
    nextLabel: "Next sports",
    goToLabel: "Go to",
  },
];

export const sports: Sport[] = [
  { name: "Archery", image: "/images/sports-archery.webp" },
  { name: "Cycling", image: "/images/sports-cycling.webp" },
  { name: "Hockey", image: "/images/sports-hockey.webp" },
  { name: "Swimming", image: "/images/sports-swimming.webp" },
  { name: "Taekwondo", image: "/images/sports-taekwondo.webp" },
  { name: "Football", image: "/images/sports-football.webp" },
  { name: "Shooting Range", image: "/images/sports-shooting-range.webp" },
  { name: "Horse Riding", image: "/images/sports-horse-riding.webp" },
  { name: "Billiards", image: "/images/sports/billiards.webp" },
  { name: "Squash", image: "/images/sports/squash.webp" },
  { name: "Volleyball", image: "/images/sports/volleyball.webp" },
  { name: "Basketball", image: "/images/sports/basketball.webp" },
  { name: "Cricket", image: "/images/sports/cricket.webp" },
  { name: "Lawn Tennis", image: "/images/sports/lawn-tennis.webp" },
  { name: "Badminton", image: "/images/sports/badminton.webp" },
  { name: "Table Tennis", image: "/images/sports/table-tennis.webp" },
];
