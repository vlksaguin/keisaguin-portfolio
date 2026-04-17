export interface ProjectItem {
  id: number;
  title: string;
  summary: string;
  stack: string[];
  year: string;
  href: string;
}

export const profile = {
  name: "Kei Saguin",
  role: "Software Engineer and Student Leader",
  location: "Metro Manila, Philippines",
  headline:
    "CS@DLSU. Building practical software with strong fundamentals, and reliable execution.",
  about: [
    "I design and build web products that balance engineering quality with business outcomes. My focus is scalable full-stack delivery, from architecture and implementation to deployment and iteration.",
    "I enjoy leading teams, mentoring peers, and turning ambiguous ideas into systems that can be shipped with confidence.",
  ],
};

export const projects: ProjectItem[] = [
  {
    id: 1,
    title: "Personal Portfolio v1",
    summary: "An App Router portfolio with mini CMS system for blog posts.",
    stack: ["Next.js", "TypeScript", "Tailwind", "MySQL"],
    year: "2026",
    href: "/"
  },
  {
    id: 2,
    title: "News Translation CMS",
    summary: "Editorial desk publishes one english article into 6 Philippine dialects, upon review.",
    stack: ["React", "Tailwind", "Node.js", "Express"],
    year: "2025",
    href: "https://news-translation-system.vercel.app"
  },
  {
    id: 3,
    title: "LANDMASS: Laboratory Reservation System",
    summary: "A laboratory reservation system. ",
    stack: ["Tailwind", "Handlebars", "Express", "MongoDB"],
    year: "2026",
    href: "https://landmass-reservation-system.onrender.com"
  },
];