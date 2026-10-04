export interface Ranking {
  rank: string;
  scope: string;
  title: string;
  /** Source text looks inconsistent with the label; kept verbatim, confirm with the school. */
  needsVerification?: boolean;
}

export const rankings: Ranking[] = [
  { rank: "#1", scope: "In Dehradun", title: "Co-Educational Boarding School in Dehradun by Education Today" },
  {
    rank: "#2",
    scope: "In Uttarakhand",
    title: "Co-Educational Boarding School in North India by Education Today",
    needsVerification: true,
  },
  { rank: "#1", scope: "In North India", title: "Co-Educational Boarding School in North India by Outlook" },
  { rank: "#4", scope: "In India", title: "Co-Educational Boarding School in India by Education Today" },
];
