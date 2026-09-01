'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ProjectLayout from '@/app/components/ProjectLayout';
import FloatingTabNav from '@/app/components/FloatingTabNav';

const project = {
  id: 'elections-ontario',
  title: 'EO Internship Program Design',
  description: 'Service Design',
  bgImage: '/preview-eo.png',
  category: 'Product Design',
  isGroup: true,
  ongoing: true,
  tags: ['Public Service'],
  duration: 'Jan 2026 – Apr 2026',
  collaborators: 'Rachel Lau Xin Yi, Amanda Wang, Yijia Li, Elliot Liang',
  role: 'Coming soon.',
  overview: 'Coming soon.',
  tools: ['Figma', 'Co-design Workshop', 'Service Map', 'Claude Code'],
};

const TABS = ['Problem', 'Future-State Journey', 'Service Integration'];

const heading = 'text-lg font-semibold font-PlusJakarta text-[#4A423C] dark:text-white';
const body    = 'text-[15px] text-gray-600 dark:text-white/70 font-PlusJakarta leading-relaxed';

const CHALLENGES = [
  {
    title: 'For Interns (Service User)',
    points: [
      'Unclear expectations and inconsistent support',
      'Unstructured internship',
      'Unclear future opportunities',
    ],
    conclusion: 'Reduces interns’ confidence, contribution, and impact, weakening retention.',
  },
  {
    title: 'For Elections Ontario (Service Provider)',
    points: [
      'Inconsistent internship experiences',
      'Lack of transparent pathways to future opportunities',
      'Unclear readiness evaluation process and assessments',
    ],
    conclusion: 'Limits talent retention and development.',
  },
];

const RESEARCH_METHODS = [
  {
    label: 'Client Workshop',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 20v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="3.25" />
        <path d="M17 8.5a3 3 0 1 0 0-4.5" />
        <path d="M20.5 20v-1.5a3.5 3.5 0 0 0-2.5-3.35" />
      </svg>
    ),
  },
  {
    label: 'User Interviews',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a7 7 0 0 1-10.4 6.1L4 20l1.9-6.6A7 7 0 1 1 21 12Z" />
        <circle cx="8.5" cy="12" r="0.75" fill="currentColor" stroke="none" />
        <circle cx="12" cy="12" r="0.75" fill="currentColor" stroke="none" />
        <circle cx="15.5" cy="12" r="0.75" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Client Interview',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="3.25" />
        <path d="M5.5 20v-1a6.5 6.5 0 0 1 13 0v1" />
      </svg>
    ),
  },
];

const OPPORTUNITIES = [
  {
    stage: 'Onboarding Stage',
    text: 'Structure onboarding in the 3 weeks before an intern’s start date, so expectations are clear from day one.',
  },
  {
    stage: 'Setting into Work Stage',
    text: 'Deliver weekly, structured feedback so interns have clear, measurable working expectations.',
  },
  {
    stage: 'Transitioning into Early Career',
    text: 'Build transparent full-time conversion pathways that support interns’ career-readiness, skill-building, and connection to the organization.',
  },
];

const oppHlTerms = [
  '3 weeks before an intern’s start date',
  'clear from day one',
  'weekly, structured feedback',
  'clear, measurable working expectations',
  'transparent full-time conversion pathways',
  'career-readiness',
];

function hlOpp(text) {
  const escaped = oppHlTerms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const pattern = new RegExp(`(${escaped.join('|')})`, 'gi');
  return text.split(pattern).map((part, i) =>
    oppHlTerms.some(t => t.toLowerCase() === part.toLowerCase())
      ? <span key={i} className="text-[#9DB86A] font-medium">{part}</span>
      : part
  );
}

export default function Page() {
  const [activeTab, setActiveTab] = useState('Problem');
  const [zoomImage, setZoomImage] = useState(null);

  const scrollToTabs = () => {
    document.getElementById('eo-tab-bar')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSideTabClick = (tab) => {
    setActiveTab(tab);
    scrollToTabs();
  };

  return (
    <ProjectLayout project={project} scrollTargetId="eo-tab-bar">
      {/* Zoom lightbox for detailed diagrams */}
      {zoomImage && (
        <div
          onClick={() => setZoomImage(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6 cursor-zoom-out"
        >
          <button
            onClick={() => setZoomImage(null)}
            aria-label="Close"
            className="absolute top-5 right-5 text-white/70 hover:text-white transition"
          >
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          <img
            src={zoomImage.src}
            alt={zoomImage.alt}
            className="max-w-full max-h-full object-contain rounded-lg cursor-zoom-out"
          />
        </div>
      )}

      {/* Floating side tabs (desktop only, stays put while scrolling) */}
      <FloatingTabNav
        tabs={TABS.map(tab => ({ label: tab, value: tab }))}
        active={activeTab}
        onSelect={handleSideTabClick}
      />

      {/* Tab bar */}
      <div id="eo-tab-bar" className="flex flex-wrap gap-0 border-b border-gray-200 dark:border-white/10 mb-8 w-fit">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative px-4 py-2.5 text-sm font-PlusJakarta transition-colors whitespace-nowrap ${
              activeTab === tab
                ? 'text-[#4A423C] dark:text-white'
                : 'text-[#4A423C]/40 dark:text-white/40 hover:text-[#4A423C]/70 dark:hover:text-white/60'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="eo-tab-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9DB86A] dark:bg-[#9DB86A]"
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
        >
          {activeTab === 'Problem' ? (
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-3">
                <h2 className={heading}>Problem Definition</h2>
                <p className={body}>
                  Our client, Elections Ontario (hereinafter referred to as “EO”), requested a coherent service design for a new, one-year internship program for recent graduates, as they currently lack a structured, long-term internship service that develops, evaluates, and integrates emerging talent into its future workforce.
                </p>
              </div>

              <div className="flex flex-col gap-5">
                <h2 className={heading}>Challenges</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {CHALLENGES.map((c, i) => (
                    <div
                      key={i}
                      className="flex flex-col gap-3 rounded-2xl border border-[#FFC943] p-5"
                    >
                      <h3 className="text-sm uppercase tracking-widest text-gray-500 dark:text-white/50 font-PlusJakarta">
                        {c.title}
                      </h3>
                      <ul className={`flex flex-col gap-1.5 ${body} list-disc list-inside pl-1`}>
                        {c.points.map((p, j) => <li key={j}>{p}</li>)}
                      </ul>
                      <p className={`${body} font-medium text-[#4A423C] dark:text-white`}>{c.conclusion}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <h2 className={heading}>Current Journey Insights</h2>
                <div className="flex flex-col gap-4">
                  <h3 className="text-sm uppercase tracking-widest text-gray-400 dark:text-white/40 font-PlusJakarta">
                    Research Approach
                  </h3>
                  <div className="flex flex-row flex-wrap gap-8 sm:gap-12">
                    {RESEARCH_METHODS.map((m, i) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <span className={body}>{m.label}</span>
                        <span className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-300 dark:border-white/20 text-[#4A423C] dark:text-white shrink-0">
                          {m.icon}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <p className={body}>
                  The current journey map below is synthesized from EO’s existing Co-op programs, together with comparable internship programs at other organizations.
                </p>

                <div className="flex flex-col gap-3">
                  <h3 className="text-sm uppercase tracking-widest text-gray-400 dark:text-white/40 font-PlusJakarta">
                    Front Stage Focus
                  </h3>
                  <div className="w-full overflow-hidden rounded-lg border border-gray-100 dark:border-white/10">
                    <img src="/EO/Problem-1.png" alt="Front Stage Focus" className="w-full h-auto block" />
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-sm uppercase tracking-widest text-gray-400 dark:text-white/40 font-PlusJakarta">
                    3 Opportunities We Identified
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <div
                      onClick={() => setZoomImage({ src: '/EO/Problem-2.png', alt: 'Current journey map' })}
                      className="sm:w-2/5 w-full overflow-hidden rounded-lg border border-gray-100 dark:border-white/10 shrink-0 cursor-zoom-in"
                    >
                      <img src="/EO/Problem-2.png" alt="Current journey map" className="w-full h-auto block" />
                    </div>
                    <div className="flex flex-col gap-5 sm:w-3/5">
                      {OPPORTUNITIES.map((o, i) => (
                        <div key={i} className="flex flex-col gap-1.5">
                          <h4 className="font-semibold font-PlusJakarta text-sm text-[#4A423C] dark:text-white">
                            {o.stage}
                          </h4>
                          <p className={body}>{hlOpp(o.text)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === 'Future-State Journey' ? (
            <div className="flex flex-col gap-6">
              <div className="w-full overflow-hidden rounded-lg border border-gray-100 dark:border-white/10">
                <img src="/EO/Future-1.png" alt="Future-State Journey" className="w-full h-auto block" />
              </div>
              <div
                onClick={() => setZoomImage({ src: '/EO/Future-2.png', alt: 'Future-State Journey detail' })}
                className="w-full overflow-hidden rounded-lg border border-gray-100 dark:border-white/10 cursor-zoom-in"
              >
                <img src="/EO/Future-2.png" alt="Future-State Journey detail" className="w-full h-auto block" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
              <div className="w-2 h-2 rounded-full bg-[#9DB86A] animate-pulse" />
              <p className="text-sm font-PlusJakarta text-gray-400 dark:text-white/40">
                {activeTab} is currently in progress. Check back soon.
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </ProjectLayout>
  );
}
