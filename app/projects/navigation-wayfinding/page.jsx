'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ProjectLayout from '@/app/components/ProjectLayout';

const body = 'text-[15px] text-gray-600 dark:text-white/70 font-PlusJakarta leading-relaxed';
const heading = 'text-lg font-semibold font-PlusJakarta text-[#4A423C] dark:text-white';

const hlTerms = [
  'accessible routes',
  'accessibility information',
  'accessibility features',
  'audio assistant',
  'low-vision users',
  'tactile text',
  'braille',
  'hearing loops',
  'visual hierarchy',
  'mental models',
  'interactive wayfinding tools',
  'student privacy',
  'anchor point',
];

function hl(text) {
  const escaped = hlTerms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const pattern = new RegExp(`(${escaped.join('|')})`, 'gi');
  return text.split(pattern).map((part, i) =>
    hlTerms.some(t => t.toLowerCase() === part.toLowerCase())
      ? <span key={i} className="text-[#9DB86A] font-medium">{part}</span>
      : part
  );
}

const tabs = [
  {
    label: 'Problem Definition',
    src: null,
    intro: {
      title: 'Hi, welcome to our lovely iSchool.',
      image: '/navigationWayfinding/image1-1.avif',
      text: 'But the navigation and wayfinding here tells a different story. Despite being a school dedicated to information design, the building itself struggles to communicate clearly with the people inside it. Confusing floor labels, cluttered signage, and a lack of digital tools leave visitors and students alike unsure of where to go.',
    },
    problems: [
      {
        title: 'Floor Logic',
        text: 'The main entrance is labeled Floor 2 but feels like ground level, while the actual first floor appears as a basement. This mismatch disrupts users\' mental models before they even begin navigating.',
        image: '/navigationWayfinding/image1-1.png',
      },
      {
        title: 'Mixed Orientation after Entry',
        text: 'Inside, directories, maps, notices, and safety instructions appear in different formats with no visual hierarchy. Without a clear anchor point, users struggle to determine which information to trust first.',
        image: '/navigationWayfinding/image1-2.png',
      },
      {
        title: 'Inconsistent Room Signage',
        text: 'Room numbers do not reflect spatial relationships. Some secondary spaces inside larger rooms have their own numbers (e.g., Room 206 is a booth inside Room 205). Renovations have left missing, duplicated, and outdated numbers throughout the building.',
        image: '/navigationWayfinding/image1-3.png',
      },
      {
        title: 'Inconsistent Placement & Visual Language',
        text: 'Signage varies widely in placement height, typography, scale, and color with no evident standards. Some signs are above sightlines, others are obstructed by doors or displays, making each sign feel like a one-off interpretation.',
        images: ['/navigationWayfinding/image1-4.png', '/navigationWayfinding/image1-5.png'],
      },
      {
        title: 'No Digital Navigation',
        text: 'The building has no interactive wayfinding tools for accessible routes, real-time updates, or floor connections. Users rely entirely on static physical signs, many of which become outdated quickly.',
      },
    ],
  },
  {
    label: 'Solution: Interactive Map',
    src: '/navigationWayfinding/image2.png',
    description: [
      'A QR code at the main entrance links to a 3D digital building map. After scanning, users can view the floor layout, real-time classroom schedules, room availability, and accessibility information.',
      'Logged-in U of T users see full schedule details; visitors see a limited view to protect student privacy. The map also includes an audio assistant that reads content aloud in order of importance for low-vision users.',
    ],
  },
  {
    label: 'Directory Signage',
    src: '/navigationWayfinding/image3.png',
    description: [
      'Consolidated all scattered posters, maps, and notices at the Floor 2 main entrance into a single digital directory display. It shows a floor overview, a "you are here" marker, and live school event updates.',
      'This replaced the cluttered mix of boards that previously offered no clear starting point for navigation.',
    ],
  },
  {
    label: 'Classroom Information System',
    src: '/navigationWayfinding/image4.png',
    description: [
      'Each classroom door has a plaque with tactile text, braille, and a QR code. Scanning it brings up a digital page showing current room occupancy, the day\'s schedule, upcoming activities, and accessibility features including lighting, noise level, outlets, projectors, and hearing loops.',
      'Users can also submit a feedback form to report issues. Support rooms receive the same plaque but without the QR code.',
    ],
  },
];

const project = {
  id: "navigation-wayfinding",
  title: "iSchool Wayfinding Redesign",
  description: "Accessibility & Inclusive Design",
  bgImage: "/work-2.png",

  category: "Product Design",
  isGroup: true,
  tags: ["UX Research", "Navigation"],

  duration: "Sep 2025 - Dec 2025",

  overview:
    "This project identifies the current difficulties in navigating the iSchool building and proposes a cohesive wayfinding system that is accessible, consistent, and built for everyone.",

  collaborators: "Ariel Ma, Wanshu Lu, Yiqin Huang, Yolanda Zhang, Willow Zhou",
  role: "Proposed the initial concept, conducted on-site field observation to identify wayfinding pain points, and designed the 3D map.",

  tools: ["Figma", "Rhino 3D"],
};

export default function Page() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <ProjectLayout project={project} defaultDark>
      {/* Tab bar */}
      <div className="flex flex-wrap gap-0 border-b border-gray-200 dark:border-white/10 mb-8 w-fit">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`relative px-4 py-2.5 text-sm font-PlusJakarta transition-colors ${
              activeTab === i
                ? 'text-[#4A423C] dark:text-white'
                : 'text-[#4A423C]/40 dark:text-white/40 hover:text-[#4A423C]/70 dark:hover:text-white/60'
            }`}
          >
            {tab.label}
            {activeTab === i && (
              <motion.div
                layoutId="nav-wayfinding-tab-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#DDE0C7] dark:bg-[#DDE0C7]"
              />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {tabs[activeTab].problems ? (
            <div className="flex flex-col gap-8">
              {tabs[activeTab].intro && (
                <div className="flex flex-col gap-4">
                  <h2 className={heading}>{tabs[activeTab].intro.title}</h2>
                  <div className="w-full overflow-hidden">
                    <img src={tabs[activeTab].intro.image} alt="iSchool building" className="w-full h-auto block" />
                  </div>
                  <p className={body}>{hl(tabs[activeTab].intro.text)}</p>
                </div>
              )}
              {tabs[activeTab].problems.map((item, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <h2 className={heading}>{item.title}</h2>
                  <p className={body}>{hl(item.text)}</p>
                  {item.images ? item.images.map((src, j) => (
                    <div key={j} className="w-full overflow-hidden">
                      <img src={src} alt={item.title} className="w-full h-auto block" />
                    </div>
                  )) : item.image && (
                    <div className="w-full overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-auto block" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : tabs[activeTab].src ? (
            <div className="flex flex-col gap-6">
              {activeTab === 1 && (
                <div className="flex flex-col gap-3">
                  <h2 className={heading}>Design Principles</h2>
                  <ul className={`flex flex-col gap-2 ${body} list-disc list-inside pl-4`}>
                    <li>Consistency</li>
                    <li>Consideration</li>
                    <li>Creativity</li>
                  </ul>
                </div>
              )}
              {tabs[activeTab].description && (
                <div className="flex flex-col gap-4">
                  <h2 className={heading}>{tabs[activeTab].label}</h2>
                  <div className="flex flex-col gap-3">
                  {tabs[activeTab].description.map((para, i) => (
                    <p key={i} className={body}>{hl(para)}</p>
                  ))}
                  </div>
                </div>
              )}
              <div className="w-full overflow-hidden">
                <img src={tabs[activeTab].src} alt={tabs[activeTab].label} className="w-full h-auto block" />
              </div>
            </div>
          ) : placeholder}

        </motion.div>
      </AnimatePresence>
    </ProjectLayout>
  );
}
