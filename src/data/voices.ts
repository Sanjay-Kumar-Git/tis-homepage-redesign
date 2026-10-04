export interface StudentVoice {
  quote: string;
  body: string;
  image: string;
}

export interface HeadingPart {
  text: string;
  accent?: boolean;
}

export const voicesHeading: HeadingPart[] = [
  { text: "TULA'S IS... MADE FOR THE " },
  { text: "future", accent: true },
];

export const voices: StudentVoice[] = [
  {
    quote: "“We feel supported in what we do and nudged further to do more”",
    body: "At Tulas, we believe in bringing out the best in every student—whether it’s academics, music, art, or drama. With the right support and inspiration, creativity finds its way. For us, school isn’t just about lessons, it’s about endless opportunities waiting to be explored.",
    image: "/images/activities/lady-in-pink.webp",
  },
  {
    quote: "“Tulas helped me thrive and become the best version of myself”",
    body: "When you choose a school that chooses you, it becomes more than just a place to learn—it becomes a place to belong, grow, and shine. At Tulas International School, we see the potential in every student and help them bring it to life.",
    image: "/images/activities/man-in-blue.webp",
  },
];