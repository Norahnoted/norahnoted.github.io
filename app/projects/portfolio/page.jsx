'use client';

import ProjectLayout from '@/app/components/ProjectLayout';

const project = {
  id: "portfolio",
  title: "Personal Portfolio",
  description: "Web Design & Development",
  bgImage: "/preview-personalwebsite.png",

  category: "Web Development",
  isGroup: false,
  tags: ["Next.js", "React", "Tailwind CSS"],

  duration: "Jan 2026 - Mar 2026",

  overview:
    "A responsive portfolio website to showcase personal projects and skills. Built manually using JavaScript and React, deployed on GitHub Pages, and iterated on functionality with AI Vibe Coding tool (Claude).",

  tools: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Framer Motion",
    "Figma",
    "TypeScript",
  ],
};

const body = 'text-[15px] text-gray-600 dark:text-white/70 font-PlusJakarta leading-relaxed';
const heading = 'text-lg font-semibold font-PlusJakarta text-[#4A423C] dark:text-white';

export default function Page() {
  return (
    <ProjectLayout project={project}>
      {/* Tech Stack */}
      <div className="flex flex-col gap-3 mb-10">
        <h2 className={heading}>Tech Stack</h2>
        <ul className={`flex flex-col gap-2 ${body} list-disc list-inside pl-4`}>
          <li>Built with <strong className="text-[#9DB86A] font-semibold">Next.js</strong> (App Router) and <strong className="text-[#9DB86A] font-semibold">React</strong> </li>
          <li><strong className="text-[#9DB86A] font-semibold">Tailwind CSS</strong> for styling with full dark mode support</li>
          <li><strong className="text-[#9DB86A] font-semibold">Framer Motion</strong> for page transitions, tab animations, and scroll-triggered reveals</li>
          <li><strong className="text-[#9DB86A] font-semibold">TypeScript</strong> for type safety across layout and configuration files</li>
          <li>Deployed on <strong className="text-[#9DB86A] font-semibold">GitHub Pages</strong></li>
          <li>Iterated with <strong className="text-[#9DB86A] font-semibold">Claude</strong> as an AI vibe coding assistant</li>
        </ul>
      </div>

      {/* GitHub Link */}
      <a
        href="https://github.com/Norahnoted/norahnoted.github.io"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 dark:border-white/20 text-sm font-PlusJakarta text-gray-600 dark:text-white/70 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white transition w-fit"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
        View on GitHub
      </a>
    </ProjectLayout>
  );
}
