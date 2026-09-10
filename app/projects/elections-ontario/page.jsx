'use client';

import { useState, useRef, useEffect } from 'react';
import { Fraunces } from 'next/font/google';
import { motion, AnimatePresence } from 'motion/react';
import ProjectLayout from '@/app/components/ProjectLayout';
import FloatingTabNav from '@/app/components/FloatingTabNav';

const fraunces = Fraunces({ subsets: ['latin'], weight: ['500', '600'], style: ['normal', 'italic'] });
const displayFont = fraunces.className;

const project = {
  id: 'elections-ontario',
  title: 'EO Internship Program Design',
  description: 'Service Design',
  bgImage: '/preview-eo.png',
  category: 'Product Design',
  isGroup: true,
  tags: ['Service Design', 'UX Research', 'Public Service'],
  duration: 'Jan 2026 – Apr 2026',
  collaborators: 'Rachel Lau Xin Yi, Amanda Wang, Yijia Li, Elliot Liang',
  role: 'Led coding and synthesis of the research data, built the future-state journey map, and developed both physical and web-based prototypes.',
  overview: 'A future-state service design for a new one-year internship program, centered on a badge system that guides interns from onboarding to alumni status.',
  tools: ['Figma', 'Co-design Workshop', 'Service Map', 'Claude Code'],
};

const TABS = ['Context', 'Research & Insights', 'Future-State Journey', 'Service Integration', 'Design Process'];

const heading = 'text-lg font-semibold font-PlusJakarta text-[#4A423C] dark:text-white';
const body    = 'text-[15px] text-gray-600 dark:text-white/70 font-PlusJakarta leading-relaxed';
const eyebrow = 'text-sm uppercase tracking-widest text-[#D4A85A] dark:text-[#E8C97A] font-PlusJakarta';
// A serif display voice for the handful of moments that should read as the big idea,
// not supporting detail — set apart from the sans body copy used everywhere else.
const display = `${displayFont} text-[28px] sm:text-4xl leading-[1.2] text-[#4A423C] dark:text-white`;

// The three concepts are the spine of the whole project — First Connect, Milestone
// Marker, Path Finder — so they get a colour identity that recurs everywhere they
// show up (Future-State Journey, Prototype Walkthrough), instead of reading as three
// more items in a list.
const CONCEPT_THEME = {
  'First Connect':    { accent: '#D4A85A', wash: 'bg-[#F8EEDA] dark:bg-[#3a2f18]/40', text: 'text-[#D4A85A] dark:text-[#E8C97A]' },
  'Milestone Marker':  { accent: '#7A8F4A', wash: 'bg-[#E9EEDC] dark:bg-[#2a3319]/40', text: 'text-[#7A8F4A] dark:text-[#A8C078]' },
  'Path Finder':       { accent: '#5B90A8', wash: 'bg-[#E3EEF2] dark:bg-[#16242b]/40', text: 'text-[#5B90A8] dark:text-[#9CC9DA]' },
};

// A quote given room to breathe — the biggest lever this case study has and, until
// now, the most buried. No box, no border: a mark and the serif voice do the work.
function PullQuote({ text, insight, accent = '#9DB86A', className = '' }) {
  return (
    <blockquote className={`relative pl-7 sm:pl-9 ${className}`}>
      <span
        className={`absolute left-0 top-0 ${displayFont} text-4xl sm:text-5xl leading-none select-none`}
        style={{ color: accent, opacity: 0.55 }}
        aria-hidden
      >
        “
      </span>
      <p className={`${displayFont} text-lg sm:text-xl leading-snug text-[#4A423C] dark:text-white`}>
        {text}
      </p>
      {insight && (
        <p className="mt-1.5 text-sm text-gray-400 dark:text-white/40 font-PlusJakarta">{insight}</p>
      )}
    </blockquote>
  );
}

// A number pulled out of a sentence and given weight — a visual anchor for the eye
// instead of one more line in a bullet list.
function Stat({ value, label, accent = '#4A423C' }) {
  return (
    <div className="flex flex-col gap-1">
      <span className={`${displayFont} text-4xl sm:text-5xl leading-none`} style={{ color: accent }}>{value}</span>
      <span className={eyebrow}>{label}</span>
    </div>
  );
}

// The recurring per-concept header: a serif numeral in the concept's own colour, so
// First Connect / Milestone Marker / Path Finder read as one identity wherever they
// appear, not three unrelated list items.
function ConceptHeader({ index, name, label }) {
  const theme = CONCEPT_THEME[name] ?? { accent: '#9DB86A', text: 'text-[#9DB86A]' };
  return (
    <div className="flex items-baseline gap-4">
      <span className={`${displayFont} text-3xl sm:text-4xl leading-none`} style={{ color: theme.accent }}>
        {String(index + 1).padStart(2, '0')}
      </span>
      <h2 className={`${displayFont} text-[28px] sm:text-4xl leading-[1.2] text-[#4A423C] dark:text-white`}>{label ?? name}</h2>
    </div>
  );
}

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

const BOOKLET_PAGES = [
  '/EO/booklet-cover.png',
  '/EO/booklet-page1.png',
  '/EO/booklet-page2.png',
  '/EO/booklet-page3.png',
  '/EO/booklet-page4.png',
  '/EO/booklet-back-cover.png',
];

function Booklet() {
  const [page, setPage] = useState(0);
  const [turn, setTurn] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }, []);

  const go = (d) => {
    setPage(p => {
      const next = p + d;
      if (next < 0 || next > BOOKLET_PAGES.length - 1) return p;
      setTurn({ from: p, dir: d, flipped: false });
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTurn(t => (t ? { ...t, flipped: true } : t));
        });
      });
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setTurn(null), 650);
      return next;
    });
  };

  const current = BOOKLET_PAGES[page];
  const prev = turn ? BOOKLET_PAGES[turn.from] : null;

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div
        className="relative w-full max-w-[300px] aspect-[300/420] rounded-md shadow-xl border border-gray-200 dark:border-white/10 overflow-hidden select-none"
        style={{ perspective: 1800 }}
      >
        <img src={current} alt={`Welcome Guide booklet, page ${page + 1} of ${BOOKLET_PAGES.length}`} className="absolute inset-0 w-full h-full object-cover" />

        {turn && turn.dir > 0 && (
          <div
            className="absolute inset-0"
            style={{
              transformStyle: 'preserve-3d',
              transformOrigin: 'left center',
              transition: 'transform 0.6s ease-in-out',
              transform: `rotateY(${turn.flipped ? '-180deg' : '0deg'})`,
              boxShadow: turn.flipped ? 'none' : '-8px 0 16px rgba(0,0,0,0.2)',
            }}
          >
            <img
              src={prev}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              style={{ backfaceVisibility: 'hidden' }}
            />
          </div>
        )}

        {turn && turn.dir < 0 && (
          <div
            className="absolute inset-0"
            style={{
              transformStyle: 'preserve-3d',
              transformOrigin: 'right center',
              transition: 'transform 0.6s ease-in-out',
              transform: `rotateY(${turn.flipped ? '180deg' : '0deg'})`,
              boxShadow: turn.flipped ? 'none' : '8px 0 16px rgba(0,0,0,0.2)',
            }}
          >
            <img
              src={prev}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              style={{ backfaceVisibility: 'hidden' }}
            />
          </div>
        )}

        {page > 0 && (
          <button
            onClick={() => go(-1)}
            aria-label="Previous page"
            className="absolute left-0 top-0 w-1/2 h-full z-10 cursor-w-resize group"
          >
            <span className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 dark:bg-black/50 text-[#4A423C] dark:text-white opacity-0 group-hover:opacity-100 transition-opacity">
              ‹
            </span>
          </button>
        )}
        {page < BOOKLET_PAGES.length - 1 && (
          <button
            onClick={() => go(1)}
            aria-label="Next page"
            className="absolute right-0 top-0 w-1/2 h-full z-10 cursor-e-resize group"
          >
            <span className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 dark:bg-black/50 text-[#4A423C] dark:text-white opacity-0 group-hover:opacity-100 transition-opacity">
              ›
            </span>
          </button>
        )}
      </div>
      <span className="text-xs text-gray-400 dark:text-white/40 font-PlusJakarta tabular-nums">
        {page + 1} / {BOOKLET_PAGES.length}
      </span>
    </div>
  );
}

// ─── Service Integration: phased rollout, roles/dependencies, and stage-based KPIs ───

const IMPLEMENTATION_PHASES = [
  {
    impact: 'High Impact',
    note: 'Start with the onboarding experience: it creates immediate, visible impact.',
    items: [
      { text: 'Develop digital onboarding packet', roles: ['MC'] },
      { text: 'Build interactive building map', roles: ['IT', 'HR'] },
    ],
  },
  {
    impact: 'Structural Impact',
    items: [
      { text: 'Design and produce physical badges', roles: ['HR'] },
      { text: 'Celebratory pinning ceremony', roles: ['HR', 'MC'] },
    ],
  },
  {
    impact: 'Retention Impact',
    items: [
      { text: 'Build integrated learning plan platform', roles: ['IT', 'HR'] },
      { text: 'Develop and launch digital badge system', roles: ['IT', 'HR'] },
      { text: 'Build exclusive alumni opportunities and role pipeline', roles: ['IT', 'HR'] },
    ],
  },
];

const ROLE_LABELS = {
  HR: 'HR (Learning & Development)',
  HM: 'Hiring Manager (Recruitment)',
  M: 'Mentor (Intern Support)',
  IT: 'IT (Platform & System Support)',
  MC: 'Marketing & Comms (Program Communication)',
};

const ROLE_COLORS = {
  HR: 'bg-[#F5E3B3] dark:bg-[#4A3B1C] text-[#8A6423] dark:text-[#E8C97A]',
  HM: 'bg-[#F0D6E2] dark:bg-[#3A2430] text-[#8B4A68] dark:text-[#E0A8C0]',
  M: 'bg-[#D6E8EE] dark:bg-[#1F3540] text-[#2F5F73] dark:text-[#9CC9DA]',
  IT: 'bg-[#DCE8C8] dark:bg-[#2A3319] text-[#5A6B34] dark:text-[#A8C078]',
  MC: 'bg-[#E5DCF0] dark:bg-[#2F2440] text-[#6B4F94] dark:text-[#C7A8E0]',
};

const DEPENDENCIES = [
  { title: 'Learning Platform Integration', roles: ['HR', 'M', 'IT'] },
  { title: 'Badge System Functionality', roles: ['HR', 'IT', 'MC'] },
  { title: 'Manager Participation', roles: ['HR', 'M'] },
  { title: 'Cross-Team Coordination', roles: ['HR', 'HM', 'MC'] },
];

const KPI_STAGES = [
  {
    stage: 'Before',
    title: 'Awareness & Application',
    desc: 'Measures early engagement and awareness',
    metrics: [
      '# of clicks on LinkedIn badge certificate page',
      '# of impressions on shared badge posts',
    ],
  },
  {
    stage: 'During',
    title: 'Internship Experience',
    desc: 'Measures engagement, learning progress, and clarity',
    metrics: [
      '% of milestones completed to earn badge',
      '% of interns tracking progress on platform',
      '# of milestone badges received within cohort',
      '% of interns collecting badges based on criteria',
      '% increase in internship clarity and progress',
    ],
  },
  {
    stage: 'After',
    title: 'Post-Internship Outcomes',
    desc: 'Measures retention, confidence, and talent pipeline',
    metrics: [
      '# of interns completing all milestones',
      '# of achievements received by interns',
      '% increase in confidence after ceremony',
      '% of managers participating in recognition',
      '% of interns feeling engaged overall',
      '# of specialized roles created for graduates',
    ],
  },
];

// ─── Prototype Walkthrough: the actual clickable mock-ups, embedded live ───

const PROTO_BASE = '/EO-test/elections-ontario-onboarding';

// A small "browser chrome" frame around each embed, so it reads as a live,
// clickable artifact rather than another static screenshot. The prototypes are
// built for a desktop-width viewport (1280px), so rather than cropping them
// with a horizontal scrollbar, the iframe is scaled down to whatever width its
// container actually has, keeping the full page visible.
function ProtoWindow({ title, src, height = 800, protoWidth = 1280 }) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setScale(el.offsetWidth / protoWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [protoWidth]);

  return (
    <div className="flex flex-col rounded-lg border border-gray-200 dark:border-white/10 overflow-hidden">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 dark:bg-white/10 border-b border-gray-200 dark:border-white/10">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        <span className="ml-2 truncate text-xs font-PlusJakarta text-gray-500 dark:text-white/50">{title}</span>
      </div>
      <div ref={containerRef} className="w-full overflow-hidden bg-white" style={{ height: height * scale }}>
        <iframe
          src={src}
          title={title}
          loading="lazy"
          className="block border-0 origin-top-left"
          style={{ width: protoWidth, height, transform: `scale(${scale})` }}
        />
      </div>
    </div>
  );
}

// First Connect's welcome-email/intern-portal breakdown, recreated as real markup
// instead of a screenshot — matches the source slide, minus the repeated title.
const FIRST_CONNECT_FEATURES = [
  {
    title: 'Welcome Email',
    points: [
      'First touchpoint with the organization',
      'Provides essential pre-boarding information',
      'Builds early connection through warm, personalized messaging',
    ],
  },
  {
    title: 'Intern Portal',
    points: [
      'Extends onboarding with interactive features',
      'Includes welcome video, Day 1 timeline, and office floor plan',
    ],
  },
];

const FIRST_CONNECT_TAGS = [
  'Welcome Messages',
  'First Day Tips',
  'Key Contacts',
  'First Day Timeline',
  'Pre-Arrival & Day 1 Checklist',
  'Interactive Map & Floor Plan',
];

// Milestone Marker's badge/pin breakdown, recreated as real markup the same way as
// First Connect.
const MILESTONE_MARKER_OUTCOMES = {
  user: {
    label: 'User Outcomes',
    items: [
      'Ongoing engagement',
      'Stay aligned with the learning plan',
      'Celebration of personal achievements',
      'Sense of shared journey and community',
      'Feeling of making an impact',
    ],
    kpi: '% of interns feeling engaged in their overall internship experience',
  },
  provider: {
    label: 'Provider Outcomes',
    items: [
      'Clear tracking of intern progress',
      'Transparent pathway to full-time roles and readiness clarity',
      'Promotion of a vibrant work culture',
    ],
    kpi: '% of interns staying on track with their learning plans',
  },
};

// Path Finder's internal job portal breakdown, recreated the same way.
const PATH_FINDER_TAGS = ['Priority Access', 'Exclusive Roles', 'Badge Specific'];

const PATH_FINDER_EXAMPLES = ['Policy Pro', 'Data Detective', 'Cross-Team Contributor'];

const PATH_FINDER_OUTCOMES = {
  user: {
    label: 'User Outcomes',
    items: [
      'Clear understanding of expectations and how to improve',
      'Defined path toward future career opportunities',
    ],
    kpi: '% of interns meeting and exceeding performance criteria and expectations',
  },
  provider: {
    label: 'Provider Outcomes',
    items: [
      'Long-term talent pipeline',
      'Ability to provide targeted follow-up and future full-time opportunities',
    ],
    kpi: '% of alumni hired for internal roles through the internal job portal',
  },
};

// The welcome kit's physical items and provider-side payoff, recreated the same way.
// Solid pastel chip themes, saturated enough to read clearly against any of the
// three wash backgrounds instead of blending into them.
const TAG_THEME_CLS = {
  gold: 'bg-[#F5E3B3] dark:bg-[#4A3B1C] text-[#8A6423] dark:text-[#E8C97A]',
  pink: 'bg-[#F0D6E2] dark:bg-[#3A2430] text-[#8B4A68] dark:text-[#E0A8C0]',
  blue: 'bg-[#D6E8EE] dark:bg-[#1F3540] text-[#2F5F73] dark:text-[#9CC9DA]',
};

const WELCOME_KIT_TAGS = [
  { label: 'Hand Written Postcard', theme: 'gold' },
  { label: 'Welcome Guide Booklet', theme: 'gold' },
  { label: 'Branded Mug & Badge Holder', theme: 'gold' },
  { label: 'Welcome Badge', theme: 'pink' },
];

const WELCOME_KIT_OUTCOME = {
  items: [
    'Smoother onboarding process',
    'Stronger employer brand',
    'Reduced HR time spent on repetitive questions',
  ],
  kpi: '% reduced in “What do I need to do?” questions in the first week',
};

const CONCEPTS = [
  {
    name: 'First Connect',
    tagline: 'The first touchpoint with the organization: essential pre-boarding information, delivered through warm, personalized messaging.',
    outcome: 'Interns feel welcomed, prepared, and supported before they ever walk in the door.',
    kpi: '# of interns reporting they felt welcome and included',
    windows: [
      { title: 'Welcome Email · Inbox', src: `${PROTO_BASE}/welcome-email.html`, height: 720 },
      { title: 'Intern Hub · Onboarding Portal', src: `${PROTO_BASE}/New/Intern%20Hub.html`, height: 900 },
    ],
  },
  {
    name: 'Milestone Marker',
    tagline: 'A badge system anchoring each stage of the journey: clear milestones that signal expectations, skills, and achievements as they’re earned.',
    windows: [
      { title: 'My Pins & Badges', src: `${PROTO_BASE}/pins.html`, height: 900 },
    ],
  },
  {
    name: 'Path Finder',
    tagline: 'Exclusive early access to internal roles, unlocked by badge collection, rewarding top performers on both sides of the service.',
    windows: [
      { title: 'EO Careers · Internal Job Portal', src: `${PROTO_BASE}/New/EO-Job-Portal.html`, height: 900 },
      { title: 'EO Careers · Manager Portal (Backstage)', src: `${PROTO_BASE}/New/eo-manager-portal(updated).html`, height: 900 },
    ],
  },
];

// ─── Design Process: how the team actually got from research to these concepts ───

const IDEATION_STEPS = [
  {
    title: 'Co-Design & Ideation',
    text: 'The team ran a co-design workshop, generating ideas individually before grouping and mapping them onto the journey.',
  },
  {
    title: 'From 3 Ideas to 3 Concepts',
    text: 'Ideas were prioritized against user needs, merging into three concepts: In-House Kit, Progress Checker, and Jumpstart Career.',
    quote: '“How would we celebrate the end of the program?”',
    footnote: 'That question turned the badge system into the hero solution guiding the entire internship journey.',
  },
];

const USABILITY_METHOD = {
  intro: 'A usability test grounded in the team’s storyboard validated the badge system’s clarity, sequence, and feasibility.',
  types: ['Need-based', 'Functional', 'Value', 'Sequencing', 'Generative'],
  note: 'Seven questions across these types surfaced early concerns and refinements.',
};

const FEEDBACK_PRIORITIZATION = 'Feedback was clustered, then mapped on a grid weighing frequency against impact, surfacing what needed attention next.';

const VIDEO_PROCESS = 'The team storyboarded every scene, then wrote the voiceover script used in the final video prototype.';

const TOOLS_USED = [
  { tool: 'Figjam', use: 'Future-state journey mapping and usability testing synthesis', icon: 'https://cdn.simpleicons.org/figma' },
  { tool: 'Claude AI', use: 'Prototyping, implementing refinements, and generating icons for the deck and journey map', icon: 'https://cdn.simpleicons.org/claude' },
  { tool: 'Gemini', use: 'Storyboard imagery and badge preview generation', icon: 'https://cdn.simpleicons.org/googlegemini' },
  { tool: 'VoiceBooking.com', use: 'Voiceover for the video prototype', icon: null },
  { tool: 'Canva', use: 'Editing the final video prototype', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg' },
];

const PROCESS_FRAMES = [
  { title: 'Planning the Research', src: '/EO/Frame.png' },
  { title: 'Interviewing Users', src: '/EO/Frame-1.png' },
  { title: 'Analyzing the Data', src: '/EO/Frame-2.png' },
  { title: 'Coding & Synthesizing', src: '/EO/Frame-9.png' },
  { title: 'Co-Designing & Ideating', src: '/EO/Frame-3.png' },
  { title: 'Usability Testing', src: '/EO/Frame-4.png' },
  { title: 'Prioritizing Feedback', src: '/EO/Frame-6.png' },
  { title: 'Scripting the Video', src: '/EO/Frame-5.png' },
  { title: 'Building the Prototypes', src: '/EO/Frame-7.png' },
  { title: 'Iterating on Feedback', src: '/EO/Frame-8.png' },
];

// ─── User Feedback & Iteration: what interns actually said, and what changed because of it ───

const VOICE_QUOTES = [
  { stage: 'Onboarding', quote: 'I had to figure out what I was doing during orientation and it made me feel unsupported as newcomers.', insight: 'Unstructured onboarding and unclear expectations cause interns to feel underprepared before arrival.' },
  { stage: 'Onboarding', quote: 'Getting lost on their way to work and weak mentorship caused major insecurity.', insight: 'Physical unfamiliarity and emotional gaps limit interns’ sense of belonging.' },
  { stage: 'Settling Into Work', quote: 'I want to understand what I am doing and it stresses me out when I don’t.', insight: 'Clear milestone markers and expectations help track progress and professional development.' },
  { stage: 'Settling Into Work', quote: 'Blurred, overlapping roles and responsibilities make it difficult to contribute.', insight: 'A lack of structured learning plans hinders interns’ ownership, contribution, and impact.' },
  { stage: 'Transition to Early Career', quote: 'I am interested in long-term opportunities but lack the connection to explore these opportunities.', insight: 'Clear connections to the organization after internship completion are essential to long-term commitment.' },
  { stage: 'Transition to Early Career', quote: 'By presenting my work and gaining other skills, I felt more prepared for early-career roles.', insight: 'Opportunities to demonstrate work signal full-time readiness and support professional development.' },
];

const THEMES = [
  { name: 'Preparedness', text: 'Unstructured onboarding and unfamiliar environments cause interns to feel underprepared and unsupported before arrival.' },
  { name: 'Clarity', text: 'A lack of clear expectations and milestone markers limits interns’ ability to track progress and meaningfully contribute.' },
  { name: 'Contribution', text: 'Unclear responsibilities and inconsistent support make it difficult for interns to understand their role, hindering ownership and impact.' },
  { name: 'Connections', text: 'A lack of transparent conversion pathways, readiness assessments, and clear opportunities creates friction for pursuing long-term growth.' },
];

const REFINEMENTS = [
  { issue: 'Users wanted clear, consistent criteria for how badges were assessed and awarded.', change: 'Aligned badges to a personalized learning plan and predetermined outcomes and goals.' },
  { issue: 'Interns worried the badge system would add pressure and competitiveness between peers.', change: 'Reframed badges as milestone markers, with full badge visibility held until program completion.' },
  { issue: 'Testing revealed a strong desire for transparent pathways to opportunities after the program.', change: 'Introduced badge-completion alumni status, unlocking exclusive roles and opportunities.' },
  { issue: 'Even with visibility hidden, interns still wanted some sense of where they stood.', change: 'Kept a brief progress report visible, scoped to badges already rewarded: signal without the leaderboard.' },
  { issue: 'One exclusive-roles pathway felt too narrow for the range of interns completing the program.', change: 'Explored a wider set of exclusive opportunities (volunteer, part-time, and full-time roles) for badge-completion alumni.' },
];

export default function Page() {
  const [activeTab, setActiveTab] = useState('Context');
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
          {activeTab === 'Context' ? (
            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-4">
                <span className={eyebrow}>Problem Definition</span>
                <p className={display}>
                  Elections Ontario lacks a structured, long-term internship service that develops,
                  evaluates, and integrates emerging talent into its future workforce.
                </p>
                <p className={body}>
                  Our client, Elections Ontario (hereinafter referred to as “EO”), requested a coherent service design for a new, one-year internship program for recent graduates, closing exactly that gap.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <span className={eyebrow}>Envision Our End-to-End Solution</span>
                <p className={body}>
                  A complete service design spanning front stage to back stage, built for both service users (interns) and service providers (EO staff).
                </p>
                <img src="/EO/end-to-end-solution.png" alt="Illustrated overview of the end-to-end internship journey, from application to alumni" className="w-full h-auto" />
                <p className={`${body} italic`}>Video Prototype following Aiden Lee</p>
                <div className="w-full aspect-video overflow-hidden rounded-lg border border-gray-100 dark:border-white/10">
                  <iframe
                    loading="lazy"
                    className="w-full h-full"
                    src="https://www.canva.com/design/DAHE4noFdoI/ex-UXVYd5kHtLBCR9a-j1Q/watch?embed&meta"
                    allow="fullscreen"
                    allowFullScreen
                    title="EO Internship Program Design project video"
                  />
                </div>
                <div className="w-full overflow-x-auto rounded-lg border border-gray-100 dark:border-white/10 dark:bg-white">
                  <img src="/EO/Prototype-1.png" alt="Service blueprint prototype" className="w-[1600px] max-w-none h-auto block" />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <span className={eyebrow}>Project Outline</span>
                <p className={body}>Ten steps from research to final prototype, detailed further under Design Process.</p>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-3">
                  {PROCESS_FRAMES.map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 rounded-full border border-gray-300 dark:border-white/20 pl-1 pr-3 py-1">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#9DB86A]/15 text-[10px] font-semibold font-PlusJakarta text-[#5A6538] dark:text-[#9DB86A] shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-xs font-PlusJakarta text-[#4A423C] dark:text-white/80 whitespace-nowrap">{f.title}</span>
                      </div>
                      {i < PROCESS_FRAMES.length - 1 && (
                        <span className="text-gray-300 dark:text-white/20">→</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : activeTab === 'Future-State Journey' ? (
            <div className="flex flex-col gap-16">
              <div className="w-full overflow-hidden rounded-lg border border-gray-100 dark:border-white/10">
                <img src="/EO/Future-1.png" alt="Future-State Journey" className="w-full h-auto block" />
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <span className={eyebrow}>The Hero Solution</span>
                  <p className={display}>A Badge System: Guiding Interns’ Professional Growth and Developing EO’s Talent Pipeline</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    { name: 'Structured Internship', text: 'The badge system helps anchor each stage of the internship journey, providing a clear, guided start to finish to standardize interns’ development and satisfaction.' },
                    { name: 'Clear Milestones', text: 'Every milestone defines a badge, signaling expectations, skills, and achievements to encourage growth and development.' },
                    { name: 'Readiness Assessment', text: 'A completed badge collection signals professional growth and readiness, unlocking exclusive benefits to strengthen EO’s talent pipeline.' },
                  ].map((pillar, i) => (
                    <div key={i} className="flex flex-col gap-3 rounded-2xl p-6 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                      <span className={`${displayFont} text-3xl leading-none text-[#B8A98A] dark:text-white/40`}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className={`${displayFont} text-xl text-[#4A423C] dark:text-white`}>{pillar.name}</h3>
                      <p className={body}>{pillar.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`flex flex-col gap-6 rounded-2xl p-5 sm:p-8 -mx-1 ${CONCEPT_THEME['First Connect'].wash}`}>
                <ConceptHeader index={0} name="First Connect" />
                <p className={body}>
                  The first touchpoint with the organization: essential pre-boarding information,
                  delivered through warm, personalized messaging.
                </p>

                <div className="flex flex-col gap-6">
                  <div className="w-full flex flex-col gap-5">
                    <div className="flex flex-col gap-4">
                      {FIRST_CONNECT_FEATURES.map((f, i) => (
                        <div key={i} className="flex flex-col gap-1.5">
                          <h4 className="font-semibold font-PlusJakarta text-sm text-[#4A423C] dark:text-white">{f.title}</h4>
                          <ul className={`flex flex-col gap-1 ${body} list-disc list-inside pl-1`}>
                            {f.points.map((p, j) => (
                              <li key={j}>
                                {i === 0 && j === 2 ? (
                                  <>Builds early connection through <span className="text-[#B8863C] dark:text-[#E0BA7A] font-medium">warm, personalized messaging</span></>
                                ) : p}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {FIRST_CONNECT_TAGS.map((t) => (
                        <span key={t} className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-semibold font-PlusJakarta ${TAG_THEME_CLS.gold}`}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ProtoWindow title={CONCEPTS[0].windows[0].title} src={CONCEPTS[0].windows[0].src} height={CONCEPTS[0].windows[0].height} />
                  <ProtoWindow title={CONCEPTS[0].windows[1].title} src={CONCEPTS[0].windows[1].src} height={CONCEPTS[0].windows[1].height} />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1 border-l-2 pl-4" style={{ borderColor: CONCEPT_THEME['First Connect'].accent }}>
                      <h4 className="text-xs uppercase tracking-widest text-gray-400 dark:text-white/40 font-PlusJakarta">User Outcomes</h4>
                      <p className="text-sm text-gray-600 dark:text-white/70 font-PlusJakarta leading-relaxed">{CONCEPTS[0].outcome}</p>
                    </div>
                    <div className="flex flex-col gap-1 border-l-2 pl-4" style={{ borderColor: CONCEPT_THEME['First Connect'].accent }}>
                      <h4 className="text-xs uppercase tracking-widest text-gray-400 dark:text-white/40 font-PlusJakarta">Key Performance Indicator</h4>
                      <p className="text-sm text-gray-600 dark:text-white/70 font-PlusJakarta leading-relaxed">{CONCEPTS[0].kpi}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
                    <img src="/EO/firstconnect.png" alt="Welcome kit items: postcard, mug, badges, and booklet" className="w-full sm:flex-1 sm:min-w-0 h-auto object-contain" />
                    <div className="w-full sm:w-[230px] sm:shrink-0">
                      <Booklet />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {WELCOME_KIT_TAGS.map((t) => (
                      <span
                        key={t.label}
                        className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-semibold font-PlusJakarta text-center ${TAG_THEME_CLS[t.theme]}`}
                      >
                        {t.label}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1 border-l-2 pl-4" style={{ borderColor: CONCEPT_THEME['First Connect'].accent }}>
                      <h4 className="text-xs uppercase tracking-widest text-gray-400 dark:text-white/40 font-PlusJakarta">Provider Outcomes</h4>
                      <ul className="flex flex-col gap-0.5 text-sm text-gray-600 dark:text-white/70 font-PlusJakarta leading-relaxed list-disc list-inside pl-1">
                        {WELCOME_KIT_OUTCOME.items.map((it, i) => <li key={i}>{it}</li>)}
                      </ul>
                    </div>
                    <div className="flex flex-col gap-1 border-l-2 pl-4" style={{ borderColor: CONCEPT_THEME['First Connect'].accent }}>
                      <h4 className="text-xs uppercase tracking-widest text-gray-400 dark:text-white/40 font-PlusJakarta">Key Performance Indicator</h4>
                      <p className="text-sm text-gray-600 dark:text-white/70 font-PlusJakarta leading-relaxed">{WELCOME_KIT_OUTCOME.kpi}</p>
                    </div>
                  </div>
                </div>

              </div>

              <div className={`flex flex-col gap-6 rounded-2xl p-5 sm:p-8 -mx-1 ${CONCEPT_THEME['Milestone Marker'].wash}`}>
                <ConceptHeader index={1} name="Milestone Marker" />
                <p className={body}>{CONCEPTS[1].tagline}</p>

                <div className="flex flex-col gap-6">
                  <div className="w-full flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <h4 className="font-semibold font-PlusJakarta text-sm text-[#4A423C] dark:text-white">Personalized Learning Plan</h4>
                      <ul className={`flex flex-col gap-1 ${body} list-disc list-inside pl-1`}>
                        <li>Provides a clear roadmap of <span className="text-[#6B7F3E] dark:text-[#A8C078] font-medium">goals, milestones, and skill development</span></li>
                      </ul>
                    </div>

                    <div className="flex flex-col gap-2">
                      <h4 className="font-semibold font-PlusJakarta text-sm text-[#4A423C] dark:text-white">Mystery Badge (Work-related)</h4>
                      <div className="flex gap-4 items-start">
                        <img src="/EO/badge1.png" alt="Mystery Badge preview" className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-lg object-cover" />
                        <ul className={`flex-1 flex flex-col gap-1 ${body} list-disc list-inside pl-1`}>
                          <li>Awarded at key learning milestones to <span className="text-[#6B7F3E] dark:text-[#A8C078] font-medium">track progress</span></li>
                          <li>Hidden rewards to keep interns <span className="text-[#6B7F3E] dark:text-[#A8C078] font-medium">motivated</span>. Collect 5 pin vouchers to redeem a physical custom badge</li>
                          <li>Badges will be <span className="text-[#6B7F3E] dark:text-[#A8C078] font-medium">viewable by the interns’ mentor, manager, and HR</span> to track interns’ progress and development</li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <h4 className="font-semibold font-PlusJakarta text-sm text-[#4A423C] dark:text-white">Personal Pins (Non Work-related)</h4>
                      <div className="flex gap-4 items-start">
                        <img src="/EO/badge2.png" alt="Personal Pin preview" className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-lg object-cover" />
                        <ul className={`flex-1 flex flex-col gap-1 ${body} list-disc list-inside pl-1`}>
                          <li>Create custom digital pins that reflect interns’ interests and identity</li>
                          <li>Strengthen <span className="text-[#6B7F3E] dark:text-[#A8C078] font-medium">team connection</span> and sense of belonging</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <ProtoWindow title={CONCEPTS[1].windows[0].title} src={CONCEPTS[1].windows[0].src} height={CONCEPTS[1].windows[0].height} />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1 border-l-2 pl-4" style={{ borderColor: CONCEPT_THEME['Milestone Marker'].accent }}>
                      <h4 className="text-xs uppercase tracking-widest text-gray-400 dark:text-white/40 font-PlusJakarta">{MILESTONE_MARKER_OUTCOMES.user.label}</h4>
                      <ul className="flex flex-col gap-0.5 text-sm text-gray-600 dark:text-white/70 font-PlusJakarta leading-relaxed list-disc list-inside pl-1">
                        {MILESTONE_MARKER_OUTCOMES.user.items.map((it, i) => <li key={i}>{it}</li>)}
                      </ul>
                      <p className="text-xs italic text-gray-400 dark:text-white/40 font-PlusJakarta">KPI: {MILESTONE_MARKER_OUTCOMES.user.kpi}</p>
                    </div>
                    <div className="flex flex-col gap-1 border-l-2 pl-4" style={{ borderColor: CONCEPT_THEME['Milestone Marker'].accent }}>
                      <h4 className="text-xs uppercase tracking-widest text-gray-400 dark:text-white/40 font-PlusJakarta">{MILESTONE_MARKER_OUTCOMES.provider.label}</h4>
                      <ul className="flex flex-col gap-0.5 text-sm text-gray-600 dark:text-white/70 font-PlusJakarta leading-relaxed list-disc list-inside pl-1">
                        {MILESTONE_MARKER_OUTCOMES.provider.items.map((it, i) => <li key={i}>{it}</li>)}
                      </ul>
                      <p className="text-xs italic text-gray-400 dark:text-white/40 font-PlusJakarta">KPI: {MILESTONE_MARKER_OUTCOMES.provider.kpi}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`flex flex-col gap-6 rounded-2xl p-5 sm:p-8 -mx-1 ${CONCEPT_THEME['Path Finder'].wash}`}>
                <ConceptHeader index={2} name="Path Finder" label="Path Finder (Backstage)" />
                <p className={body}>
                  Exclusive early access to internal roles, unlocked by badge collection, rewarding
                  top performers on both sides of the service.
                </p>

                <div className="flex flex-col gap-4">
                  <h4 className="font-semibold font-PlusJakarta text-sm text-[#4A423C] dark:text-white">Internal Job Portal</h4>
                  <ul className={`flex flex-col gap-1 ${body} list-disc list-inside pl-1`}>
                    <li><span className="text-[#3D6E85] dark:text-[#8FC4DA] font-medium">Provides exclusive early access to internal job opportunities</span> based on awarded badges. Performance is reflected through badge collection, unlocking access to roles aligned with each interns’ skills.</li>
                    <li><span className="text-[#3D6E85] dark:text-[#8FC4DA] font-medium">Rewards top performers</span> with special roles unlocked by achieving specific badges</li>
                  </ul>

                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <div className="flex flex-row sm:flex-col gap-2 flex-wrap">
                      {PATH_FINDER_TAGS.map((t) => (
                        <span key={t} className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-semibold font-PlusJakarta whitespace-nowrap ${TAG_THEME_CLS.blue}`}>
                          {t}
                        </span>
                      ))}
                    </div>

                    <img src="/EO/Priorityaccess.png" alt="Priority Access preview" className="w-full sm:max-w-md h-auto rounded-lg" />
                  </div>

                  <p className={body}>
                    Such as {PATH_FINDER_EXAMPLES.map((ex, i) => (
                      <span key={ex}>
                        <span className="font-semibold text-[#4A423C] dark:text-white">“{ex}”</span>
                        {i < PATH_FINDER_EXAMPLES.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </p>

                  <div className="flex flex-col gap-6">
                    <ProtoWindow title={CONCEPTS[2].windows[0].title} src={CONCEPTS[2].windows[0].src} height={CONCEPTS[2].windows[0].height} />
                    <ProtoWindow title={CONCEPTS[2].windows[1].title} src={CONCEPTS[2].windows[1].src} height={CONCEPTS[2].windows[1].height} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1 border-l-2 pl-4" style={{ borderColor: CONCEPT_THEME['Path Finder'].accent }}>
                      <h4 className="text-xs uppercase tracking-widest text-gray-400 dark:text-white/40 font-PlusJakarta">{PATH_FINDER_OUTCOMES.user.label}</h4>
                      <ul className="flex flex-col gap-0.5 text-sm text-gray-600 dark:text-white/70 font-PlusJakarta leading-relaxed list-disc list-inside pl-1">
                        {PATH_FINDER_OUTCOMES.user.items.map((it, i) => <li key={i}>{it}</li>)}
                      </ul>
                      <p className="text-xs italic text-gray-400 dark:text-white/40 font-PlusJakarta">KPI: {PATH_FINDER_OUTCOMES.user.kpi}</p>
                    </div>
                    <div className="flex flex-col gap-1 border-l-2 pl-4" style={{ borderColor: CONCEPT_THEME['Path Finder'].accent }}>
                      <h4 className="text-xs uppercase tracking-widest text-gray-400 dark:text-white/40 font-PlusJakarta">{PATH_FINDER_OUTCOMES.provider.label}</h4>
                      <ul className="flex flex-col gap-0.5 text-sm text-gray-600 dark:text-white/70 font-PlusJakarta leading-relaxed list-disc list-inside pl-1">
                        {PATH_FINDER_OUTCOMES.provider.items.map((it, i) => <li key={i}>{it}</li>)}
                      </ul>
                      <p className="text-xs italic text-gray-400 dark:text-white/40 font-PlusJakarta">KPI: {PATH_FINDER_OUTCOMES.provider.kpi}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className={heading}>Full Future-State Journey Map</h2>
                <div
                  onClick={() => setZoomImage({ src: '/EO/Future-6.png', alt: 'Full Future-State service blueprint' })}
                  className="w-full overflow-hidden rounded-lg border border-gray-100 dark:border-white/10 dark:bg-white cursor-zoom-in"
                >
                  <img src="/EO/Future-6.png" alt="Full Future-State service blueprint" className="w-full h-auto block" />
                </div>
              </div>
            </div>
          ) : activeTab === 'Research & Insights' ? (
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <span className={eyebrow}>Challenges</span>
                  <p className={display}>Both sides of the service lose out: interns lose confidence, EO loses talent.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {CHALLENGES.map((c, i) => {
                    const accent = ['#FFC943', CONCEPT_THEME['Path Finder'].accent][i];
                    return (
                      <div key={i} className="flex flex-col gap-3 border-l-2 pl-5" style={{ borderColor: accent }}>
                        <span className={`${displayFont} text-2xl leading-none`} style={{ color: accent }}>{String(i + 1).padStart(2, '0')}</span>
                        <h3 className="text-sm uppercase tracking-widest text-gray-500 dark:text-white/50 font-PlusJakarta">
                          {c.title}
                        </h3>
                        <ul className={`flex flex-col gap-1.5 ${body} list-disc list-inside pl-1`}>
                          {c.points.map((p, j) => <li key={j}>{p}</li>)}
                        </ul>
                        <p className={`${body} font-medium text-[#4A423C] dark:text-white`}>{c.conclusion}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                  <span className={eyebrow}>Voice of the Intern</span>
                  <p className={display}>The same tensions at every stage of the journey, in interns’ own words.</p>
                </div>

                <div className="flex flex-col gap-8">
                  <PullQuote
                    accent={CONCEPT_THEME['First Connect'].accent}
                    text={VOICE_QUOTES[0].quote}
                    insight={VOICE_QUOTES[0].insight}
                  />
                  <PullQuote
                    accent={CONCEPT_THEME['Milestone Marker'].accent}
                    text={VOICE_QUOTES[2].quote}
                    insight={VOICE_QUOTES[2].insight}
                    className="sm:ml-10"
                  />
                  <PullQuote
                    accent={CONCEPT_THEME['Path Finder'].accent}
                    text={VOICE_QUOTES[5].quote}
                    insight={VOICE_QUOTES[5].insight}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-5 pt-2">
                  {[VOICE_QUOTES[1], VOICE_QUOTES[3], VOICE_QUOTES[4]].map((v, i) => (
                    <div key={i} className="flex flex-col gap-1">
                      <span className="text-xs uppercase tracking-widest text-gray-400 dark:text-white/30 font-PlusJakarta">{v.stage}</span>
                      <p className={`${body} italic text-gray-500 dark:text-white/50`}>“{v.quote}”</p>
                      <p className="text-sm text-gray-400 dark:text-white/40 font-PlusJakarta">{v.insight}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                  <span className={eyebrow}>Current Journey Insights</span>
                  <p className={display}>Before designing the future, the team mapped what already exists.</p>
                </div>

                <div className="flex flex-col gap-4">
                  <span className={eyebrow}>Research Approach</span>
                  <div className="flex flex-row flex-wrap gap-4">
                    {RESEARCH_METHODS.map((m, i) => (
                      <div key={i} className="flex items-center gap-2.5 rounded-full border border-gray-200 dark:border-white/15 bg-white dark:bg-white/5 pl-4 pr-2 py-2">
                        <span className={body}>{m.label}</span>
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 text-[#4A423C] dark:text-white shrink-0">
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
                  <span className={eyebrow}>Front Stage Focus</span>
                  <div className="w-full overflow-hidden rounded-lg border border-gray-100 dark:border-white/10">
                    <img src="/EO/Research-1.png" alt="Front Stage Focus" className="w-full h-auto block" />
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <span className={eyebrow}>3 Opportunities We Identified</span>
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div
                      onClick={() => setZoomImage({ src: '/EO/Research-2.png', alt: 'Current journey map' })}
                      className="sm:w-2/5 w-full overflow-hidden rounded-lg border border-gray-100 dark:border-white/10 shrink-0 cursor-zoom-in"
                    >
                      <img src="/EO/Research-2.png" alt="Current journey map" className="w-full h-auto block" />
                    </div>
                    <div className="flex flex-col justify-between gap-5 sm:w-3/5">
                      {OPPORTUNITIES.map((o, i) => {
                        const accent = [
                          CONCEPT_THEME['First Connect'].accent,
                          CONCEPT_THEME['Milestone Marker'].accent,
                          CONCEPT_THEME['Path Finder'].accent,
                        ][i];
                        return (
                          <div key={i} className="flex flex-col gap-1.5 border-l-2 pl-4" style={{ borderColor: accent }}>
                            <h4 className="font-semibold font-PlusJakarta text-sm text-[#4A423C] dark:text-white">
                              {o.stage}
                            </h4>
                            <p className={body}>{hlOpp(o.text)}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <span className={eyebrow}>4 Major Themes Emerged in Data Analysis</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {THEMES.map((t, i) => (
                    <div key={i} className="flex flex-col gap-2 rounded-2xl bg-[#FFF6DF] dark:bg-[#3a2f18]/40 border border-[#FFC943]/70 p-6 shadow-sm">
                      <span className={`${displayFont} text-3xl leading-none text-[#D4A85A] dark:text-[#E8C97A]`}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className={`${displayFont} text-xl text-[#4A423C] dark:text-white`}>{t.name}</h3>
                      <p className={body}>{t.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : activeTab === 'Service Integration' ? (
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-3">
                <span className={eyebrow}>A Phased Approach to Implementation</span>
                <p className={display}>Immediate impact first, then the structural and retention pieces.</p>
                <p className={body}>
                  Rather than launching the full badge system at once, the rollout is sequenced so
                  visible wins come early, while the pieces that take longer to stand up catch up behind them.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="text-xs uppercase tracking-widest text-gray-400 dark:text-white/40 font-PlusJakarta">Who's Involved Behind the Scenes</h3>
                <div className="flex flex-wrap gap-3">
                  {Object.entries(ROLE_LABELS).map(([code, label]) => (
                    <div key={code} className="flex items-center gap-2 rounded-full border border-gray-200 dark:border-white/15 bg-white dark:bg-white/5 pl-1 pr-3 py-1">
                      <span className={`flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-medium shrink-0 ${ROLE_COLORS[code]}`}>
                        {code}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-white/50 font-PlusJakarta">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {IMPLEMENTATION_PHASES.map((phase, i) => (
                  <div key={i} className="flex flex-col gap-3 pt-4 border-t-2 border-[#9DB86A]">
                    <span className={`${displayFont} text-2xl leading-none text-gray-400 dark:text-white/30`}>{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="text-sm uppercase tracking-widest text-[#7a8f4a] dark:text-[#9DB86A] font-PlusJakarta">{phase.impact}</h3>
                    {phase.note && <p className={`${body} italic`}>{phase.note}</p>}
                    <ul className="flex flex-col gap-3 mt-1">
                      {phase.items.map((item, j) => (
                        <li key={j} className="flex flex-col gap-1.5">
                          <span className={`${body} text-[#4A423C] dark:text-white`}>{item.text}</span>
                          <div className="flex gap-1.5">
                            {item.roles.map(r => (
                              <span key={r} title={ROLE_LABELS[r]} className={`flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-medium cursor-help ${ROLE_COLORS[r]}`}>
                                {r}
                              </span>
                            ))}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-5">
                <h2 className={heading}>Implementation Readiness</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {DEPENDENCIES.map((d, i) => (
                    <div key={i} className="flex items-center justify-between gap-3 rounded-lg border border-gray-100 dark:border-white/10 px-4 py-3">
                      <span className={body}>{d.title}</span>
                      <div className="flex gap-1 shrink-0">
                        {d.roles.map(r => (
                          <span key={r} title={ROLE_LABELS[r]} className={`flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-medium cursor-help ${ROLE_COLORS[r]}`}>
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  <div className="rounded-lg border border-[#FFC943] p-4 flex flex-col gap-1.5">
                    <h4 className="text-xs uppercase tracking-widest text-gray-500 dark:text-white/50 font-PlusJakarta">⚠ Major Risk</h4>
                    <p className={body}>Inconsistent adoption across teams may lead to uneven implementation: it breaks down when roles aren’t aligned.</p>
                  </div>
                  <div className="rounded-lg border border-[#9DB86A] p-4 flex flex-col gap-1.5">
                    <h4 className="text-xs uppercase tracking-widest text-gray-500 dark:text-white/50 font-PlusJakarta">Enabling Condition</h4>
                    <p className={body}>Strong leadership buy-in and a standardized internship structure enable consistent delivery.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <span className={eyebrow}>Performance Measures</span>
                <p className={display}>Measured before, during, and after, so it can be adjusted while it’s still running.</p>
              </div>
              <div className="flex flex-col gap-5">
                <p className={body}>
                  Success is tracked in three stages, not just reviewed after the fact once the cohort has
                  already moved on.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {KPI_STAGES.map((k, i) => (
                    <div key={i} className="flex flex-col gap-2 rounded-2xl border border-gray-200 dark:border-white/10 p-5">
                      <span className={eyebrow}>{k.stage}</span>
                      <h4 className="font-semibold font-PlusJakarta text-sm text-[#4A423C] dark:text-white">{k.title}</h4>
                      <p className={`${body} text-gray-500 dark:text-white/50`}>{k.desc}</p>
                      <ul className={`flex flex-col gap-1.5 ${body} list-disc list-inside pl-1 mt-1`}>
                        {k.metrics.map((m, j) => <li key={j}>{m}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : activeTab === 'Design Process' ? (
            <div className="flex flex-col gap-9">
              <div className="flex flex-col gap-3">
                <h2 className={heading}>Tools We Used</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TOOLS_USED.map((t, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-lg border border-gray-300 dark:border-white/20 px-4 py-3">
                      <span className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-50 dark:bg-white/10 shrink-0 overflow-hidden">
                        {t.icon ? (
                          <img src={t.icon} alt="" className="w-5 h-5 object-contain dark:invert" />
                        ) : (
                          <svg className="w-4 h-4 text-[#4A423C] dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Z" />
                            <path d="M19 11a7 7 0 0 1-14 0" />
                            <path d="M12 18v3" />
                          </svg>
                        )}
                      </span>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-semibold font-PlusJakarta text-sm text-[#4A423C] dark:text-white">{t.tool}</span>
                        <span className={`${body} text-gray-500 dark:text-white/50`}>{t.use}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <h2 className={heading}>How We Got Here</h2>
                <p className={body}>
                  The badge system emerged through co-design, testing, and refinement.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {IDEATION_STEPS.map((step, i) => (
                  <div key={i} className="flex flex-col gap-1.5">
                    <h3 className="font-semibold font-PlusJakarta text-sm text-[#4A423C] dark:text-white">{step.title}</h3>
                    <p className={body}>{step.text}</p>
                    {step.quote && (
                      <p className="text-base italic font-PlusJakarta text-[#4A423C] dark:text-white border-l-2 border-[#9DB86A] pl-4 my-1">
                        {step.quote}
                      </p>
                    )}
                    {step.footnote && <p className={body}>{step.footnote}</p>}
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <h2 className={heading}>User Feedback & Iteration</h2>
                <p className={body}>How testing shaped the badge system before and after it was built.</p>
              </div>

              <div className="flex flex-col gap-2.5 rounded-2xl border border-gray-300 dark:border-white/20 p-4">
                <h3 className={eyebrow}>Storyboard Usability Testing</h3>
                <p className={body}>{USABILITY_METHOD.intro}</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {USABILITY_METHOD.types.map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-full text-xs font-PlusJakarta bg-[#DDE0C7] text-[#4A423C] dark:bg-[#5A6538]/25 dark:text-[#9DB86A]">
                      {t}
                    </span>
                  ))}
                </div>
                <p className={`${body} text-gray-500 dark:text-white/50`}>{USABILITY_METHOD.note}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 rounded-2xl border border-gray-300 dark:border-white/20 p-4">
                  <h3 className={eyebrow}>Feedback Prioritization</h3>
                  <p className={body}>{FEEDBACK_PRIORITIZATION}</p>
                </div>
                <div className="flex flex-col gap-1.5 rounded-2xl border border-gray-300 dark:border-white/20 p-4">
                  <h3 className={eyebrow}>Video Prototype Production</h3>
                  <p className={body}>{VIDEO_PROCESS}</p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <h2 className={heading}>What Worked, What Didn’t</h2>
                <p className={body}>
                  Two rounds of usability testing surfaced real concerns. Here’s what changed.
                </p>
                <div className="flex flex-col gap-3">
                  {REFINEMENTS.map((r, i) => (
                    <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-lg border border-gray-300 dark:border-white/20 p-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs uppercase tracking-widest text-gray-400 dark:text-white/40 font-PlusJakarta">Heard</span>
                        <p className={body}>{r.issue}</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-xs uppercase tracking-widest text-[#9DB86A] font-PlusJakarta">Refined</span>
                        <p className={`${body} text-[#4A423C] dark:text-white`}>{r.change}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <span className={eyebrow}>Detailing Our Process and Decisions</span>
                  <p className={body}>A closer look at every step, from the research plan to the final prototype.</p>
                </div>
                <div className="flex flex-col">
                  {PROCESS_FRAMES.map((f, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-[#9DB86A] text-xs font-semibold font-PlusJakarta text-[#4A423C] dark:text-white shrink-0">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {i < PROCESS_FRAMES.length - 1 && (
                          <div className="w-px flex-1 bg-gray-300 dark:bg-white/15 my-1" />
                        )}
                      </div>
                      <div className="flex flex-col gap-2 pb-8 flex-1">
                        <h3 className="font-semibold font-PlusJakarta text-sm text-[#4A423C] dark:text-white pt-1">{f.title}</h3>
                        <div
                          onClick={() => setZoomImage({ src: f.src, alt: f.title })}
                          className="w-full max-w-xl overflow-hidden rounded-lg border border-gray-300 dark:border-white/20 cursor-zoom-in"
                        >
                          <img src={f.src} alt={f.title} className="w-full h-auto block" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
