export interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: "Trees" | "Medal" | "HeartPulse" | "Users";
  image: string;
}

export const stats: Stat[] = [
  { value: 22, suffix: "", label: "Acre Pollution Free Campus", icon: "Trees", image: "/images/stats/campus.webp" },
  { value: 16, suffix: "+", label: "Olympic Sports", icon: "Medal", image: "/images/stats/sports.webp" },
  { value: 24, suffix: "*7", label: "Medical Assistance", icon: "HeartPulse", image: "/images/stats/medical.webp" },
  { value: 6, suffix: ":1", label: "Student Teacher Ratio", icon: "Users", image: "/images/stats/ratio.webp" },
];

export interface StatsIntro {
  heading: string;
  body: string;
  closing: string;
}

export const statsIntro: StatsIntro[] = [
  {
    heading: "At Tulas, we always ask, “What’s the secret to making school awesome?”",
    body: "The secret to making one's school experience truly unforgettable? It’s all about making learning feel like an adventure—where curiosity leads, creativity thrives, and every day brings something new to discover. When students are inspired, they don’t just learn—they grow, explore, and shape their own futures.",
    closing: "There, we cracked it!",
  },
];
