'use client';

import ProjectLayout from '@/app/components/ProjectLayout';

const project = {
  id: "radiovision",
  title: "RadioVision Website",
  description: "Web Design",
  bgImage: "/preview-radiovision.png",
  category: "Product Design",
  isGroup: true,
  ongoing: true,
  tags: ["UI Design", "UX Design"],
  duration: "Jan 2026 – Apr 2026",
  collaborators: "Guihao Fu, Ching-Wen Chang, Haoran Zhang, Amanda Wang",
  role: "·	Conducted UX research through stakeholder interviews and competitive auditing, and designed Hi-Fi UI prototypes in Figma.",
  overview:
    "·	A marketing website that communicates complex technology to both B2B and B2C audiences, supporting brand positioning and digital marketing efforts.",
  tools: [],
};

export default function Page() {
  return <ProjectLayout project={project} />;
}
