export interface NavLink {
  label: string;
  href: string;
}

export interface NavItem extends NavLink {
  children?: NavLink[];
}

export interface MenuTile extends NavLink {
  image: string;
  alt: string;
}

export const navItems: NavItem[] = [
  {
    label: "About TIS",
    href: "/about-tis/why-choose-us/",
    children: [
      { label: "Our History", href: "/about-tis/our-history/" },
      { label: "Why Choose Us?", href: "/about-tis/why-choose-us/" },
      { label: "Vision & Mission", href: "/about-tis/vision-mission/" },
      { label: "Awards & Achievements", href: "/about-tis/awards-achievements/" },
      { label: "Headmaster's Profile", href: "/about-tis/principal-message/" },
      { label: "Our Management", href: "/about-tis/about-management/" },
      { label: "Virtual Tour", href: "/virtual-tour/" },
    ],
  },
  {
    label: "Academics",
    href: "/academics/streams-offered/",
    children: [
      { label: "Pedagogy", href: "/academics/pedagogy/" },
      { label: "Curriculum", href: "/academics/affilation" },
      { label: "Streams Offered", href: "/academics/streams-offered/" },
      { label: "International Tie-Ups", href: "/academics/international-tie-ups/" },
      { label: "Publications", href: "/academics/publications/" },
      { label: "Digital Workstations", href: "/digital-workstations" },
      { label: "Awadh Tinkering Lab", href: "/awadh-tinkering-lab" },
    ],
  },
  {
    label: "Boarding Life",
    href: "/boarding-life/facilities/",
    children: [
      { label: "Pastoral Care", href: "/boarding-life/pastoral-care/" },
      { label: "Food & Nutrition", href: "/boarding-life/food-and-nutrition/" },
      { label: "Facilities", href: "/boarding-life/facilities/" },
      { label: "Infirmary & Medical Facilities", href: "/boarding-life/infirmary-and-medical-facilities/" },
      { label: "Our House System", href: "/boarding-life/our-house-system/" },
      { label: "Teachers Profile", href: "/teachers-profile" },
    ],
  },
  {
    label: "Beyond Academics",
    href: "/beyond-academics/clubs-and-societies/",
    children: [
      { label: "Sports", href: "/beyond-academics/sports/" },
      { label: "Beyond The Curriculum", href: "/beyond-academics/music" },
      { label: "Clubs & Societies", href: "/beyond-academics/clubs-and-societies/" },
      { label: "Celebrations", href: "/events/celebrations/" },
      { label: "Mentor & Mentee System", href: "/mentor-mentee" },
      { label: "Career Counselling", href: "/academics/career-counselling/" },
      { label: "Raasta Students Counselling", href: "/academics/raasta-students-counselling/" },
    ],
  },
  {
    label: "Events",
    href: "/events/sports-day/",
    children: [
      { label: "Sports Day", href: "/events/sports-day/" },
      { label: "38th National Games", href: "/events/national-games/" },
      { label: "Founders Day", href: "/events/founders-day/" },
      { label: "Confluence", href: "/events/confluence/" },
      { label: "Prominent Personalities", href: "/prominent-personalities/" },
      { label: "Sports Achievements", href: "/events/sports-achievements/" },
    ],
  },
  {
    label: "Admission",
    href: "/admission-procedure/",
    children: [
      { label: "Admission Procedure", href: "/admission-procedure/" },
      { label: "Pay Fee Online", href: "/pay" },
      { label: "Fee Structure", href: "/admission-procedure/fee-structure/" },
      { label: "Scholarship Programs", href: "/admission-procedure/scholarship-programmes/" },
      { label: "Withdrawal Policy", href: "/admission-procedure/withdrawal-policy/" },
    ],
  },
  {
    label: "Mandatory Disclosure",
    href: "/cbse-documents/",
    children: [{ label: "Mandatory Disclosure", href: "/cbse-documents/" }],
  },
  { label: "Alumni Network", href: "https://alumni.tis.edu.in/" },
  {
    label: "Quick Links",
    href: "/contact-us/",
    children: [
      { label: "Blogs", href: "/blog" },
      { label: "Contact Us", href: "/contact-us/" },
      { label: "Newsletter", href: "/newsletter/" },
      { label: "Careers", href: "/careers/" },
      { label: "Transfer Certificate", href: "/transfer-certificate" },
      { label: "Parent Testimonial", href: "/parent-testimonial" },
    ],
  },
];

export const menuTiles: MenuTile[] = [
  {
    label: "Explore Our Vibrant Campus Life.",
    href: "/about-tis/why-choose-us/",
    image: "/images/menu/admissions-1.webp",
    alt: "Tulas International School campus life",
  },
  {
    label: "Discover Our Comprehensive Academic Programs.",
    href: "/academics/streams-offered/",
    image: "/images/menu/admissions-2.webp",
    alt: "Tulas International School academic programs",
  },
  {
    label: "Learn About Our State-Of-The-Art Boarding Facilities.",
    href: "/boarding-life/facilities/",
    image: "/images/menu/admissions-3.webp",
    alt: "Tulas International School boarding facilities",
  },
  {
    label: "Join Us In Celebrating Diverse Cultural Events.",
    href: "/beyond-academics/clubs-and-societies/",
    image: "/images/menu/admissions-4.webp",
    alt: "Tulas International School cultural events",
  },
];

export const menuHome: NavLink[] = [{ label: "Home", href: "/" }];
