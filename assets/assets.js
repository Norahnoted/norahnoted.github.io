import picture1 from './picture1.png';
import picture2 from './picture2.png';
import picture3 from './picture3.png';
import right_arrow_white from './right-arrow-white.png';
import logo from './logo.png';
import logo_dark from './logo_dark.png';
import mail_icon from './mail_icon.png';
import mail_icon_dark from './mail_icon_dark.png';
import profile_img from './profile-img.svg';
import download_icon from './download-icon.png';
import hand_icon from './hand-icon.png';
import moon_icon from './moon_icon.png';
import sun_icon from './sun_icon.png';
import menu_black from './menu-black.png';
import menu_white from './menu-white.png';
import close_black from './close-black.png';
import close_white from './close-white.png';

export const assets = {
  picture1,
  picture2,
  picture3,
  right_arrow_white,
  logo,
  logo_dark,
  mail_icon,
  mail_icon_dark,
  profile_img,
  download_icon,
  hand_icon,
  moon_icon,
  sun_icon,
  menu_black,
  menu_white,
  close_black,
  close_white,
};

// ─── Project cards (used by Work section grid + Navbar submenu) ───────────────
// To add a new project: add an entry here AND create app/projects/your-id/page.jsx

export const workData = [
  {
    id: 'flot-ai',
    year: 2026,
    category: 'Product Design',
    title: 'Flot AI Workplace',
    description: 'Web Design',
    bgImage: '/preview-flot.png',
    isGroup: true,
    tags: ['UI Design', 'UX Design', '🏆 1st · UDesignathon 2026'],
  },
  {
    id: 'pitchin',
    year: 2025,
    category: 'Product Design',
    title: 'PitchIn Mobile App',
    description: 'App Design',
    bgImage: '/preview-pitchin.png',
    isGroup: false,
    tags: ['UI Design'],
  },
  {
    id: 'navigation-wayfinding',
    year: 2025,
    category: 'Product Design',
    title: 'Navigation & Wayfinding Design',
    description: 'Accessibility & Inclusive Design',
    bgImage: '/preview-nav.png',
    isGroup: true,
    tags: ['UX Research'],
  },
  {
    id: 'portfolio',
    year: 2026,
    category: 'Web Development',
    title: 'Personal Portfolio',
    description: 'Web Design & Development',
    bgImage: '/preview-personalwebsite.png',
    isGroup: false,
    tags: ['Next.js', 'React', 'Tailwind CSS'],
  },
  {
    id: 'iPet',
    year: 2024,
    category: 'Product Design',
    title: 'iPet Mobile App',
    description: 'App Design',
    bgImage: '/preview-ipet.png',
    isGroup: true,
    tags: ['UI Design', 'UX Research'],
  },
  {
    id: 'content-audit',
    year: 2024,
    category: 'Product Design',
    title: 'Content Audit Case Study',
    description: 'UX Research & Strategy',
    bgImage: '/preview-contentaudit.png',
    isGroup: false,
    tags: ['UX Research', 'Information Architecture', 'Digital Marketing'],
  },
  {
    id: 'coffee-shop-ia',
    year: 2024,
    category: 'Product Design',
    title: 'Coffee Shop IA Case Study',
    description: 'UI/UX Design',
    bgImage: '/preview-coffeeshopia.png',
    isGroup: false,
    tags: ['Information Architecture', 'UX Research', 'e-Commerce'],
  },
  {
    id: 'radiovision',
    year: 2026,
    category: 'Product Design',
    title: 'RadioVision Website',
    description: 'Web Design',
    bgImage: '/preview-radiovision.png',
    isGroup: true,
    ongoing: true,
    tags: ['UI Design', 'UX Design'],
  },
  {
    id: 'business-process-modelling',
    year: 2026,
    category: 'Business Analysis',
    title: 'Business Process Modelling',
    description: 'Business Analysis',
    bgImage: '/preview-modelling.png',
    isGroup: false,
    tags: ['Process Modelling'],
  },
  {
    id: 'bc-student-outcomes',
    year: 2025,
    category: 'Business Analysis',
    title: 'BC Student Outcomes Data Analysis',
    description: 'Data Analysis',
    bgImage: '/bcStudentOutcomes/image4.png',
    isGroup: false,
    tags: ['Python'],
  },
  {
    id: 'data-visualization',
    year: 2025,
    category: 'Business Analysis',
    title: 'Data Visualization Report',
    description: 'Data Analysis & Visualization',
    bgImage: '/preview-dataanalysis.png',
    isGroup: false,
    tags: ['Python'],
  },
  {
    id: 'brainflix',
    year: 2024,
    category: 'Web Development',
    title: 'BrainFlix',
    description: 'Streaming Platform',
    bgImage: '/preview-brainflix.png',
    isGroup: false,
    tags: ['Full-Stack', 'React', 'Node.js'],
  },
  {
    id: 'instock',
    year: 2024,
    category: 'Web Development',
    title: 'InStock',
    description: 'Inventory Management System',
    bgImage: '/preview-instock.png',
    isGroup: true,
    tags: ['Full-Stack', 'MySQL', 'Node.js'],
  },
  {
    id: 'bullet-trajectory-simulator',
    year: 2025,
    category: 'Product Design',
    title: 'Bullet Trajectory Simulator',
    description: 'Mixed Reality Design',
    bgImage: '/preview-bullet-trajectory.png',
    isGroup: true,
    locked: true,
    tags: ['UI Design', 'UX Design', 'Virtual Reality'],
  },
  {
    id: 'architectural-information-hub',
    year: 2026,
    category: 'Business Analysis',
    title: 'Architectural Information Hub',
    description: 'System Requirements and Architectural Design',
    bgImage: '/preview-arch-hub.png',
    isGroup: true,
    ongoing: true,
    locked: true,
    tags: [],
  },
  {
    id: 'elections-ontario',
    year: 2026,
    category: 'Product Design',
    title: 'EO Internship Program Design',
    description: 'Service Design',
    bgImage: '/preview-elections-ontario.png',
    isGroup: true,
    ongoing: true,
    locked: true,
    tags: [],
  },
];

// ─── Tools (About section) ────────────────────────────────────────────────────

export const toolsData = [
  { name: 'Figma',        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { name: 'Python',       src: 'https://cdn.simpleicons.org/python' },
  { name: 'draw.io',      src: 'https://cdn.simpleicons.org/diagramsdotnet' },
  { name: 'Jira',         src: 'https://cdn.simpleicons.org/jira' },
  { name: 'JavaScript',   src: 'https://cdn.simpleicons.org/javascript' },
  { name: 'BPMN',         text: 'BPMN' },
  { name: 'UML',          text: 'UML' },
  { name: 'MySQL',        src: 'https://cdn.simpleicons.org/mysql' },
  { name: 'MS Office',    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg' },
  { name: 'Next.js',      src: 'https://cdn.simpleicons.org/nextdotjs',   invert: true },
  { name: 'React',        src: 'https://cdn.simpleicons.org/react' },
  { name: 'TypeScript',   src: 'https://cdn.simpleicons.org/typescript' },
  { name: 'Tailwind CSS', src: 'https://cdn.simpleicons.org/tailwindcss' },
  { name: 'HTML5',        src: 'https://cdn.simpleicons.org/html5' },
  { name: 'Node.js',      src: 'https://cdn.simpleicons.org/nodedotjs' },
  { name: 'Photoshop',    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg' },
  { name: 'Git',          src: 'https://cdn.simpleicons.org/git' },
  { name: 'Claude',       src: 'https://cdn.simpleicons.org/claude' },
];
