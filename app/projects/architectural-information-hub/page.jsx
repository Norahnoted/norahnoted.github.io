'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ProjectLayout from '@/app/components/ProjectLayout';
import FloatingTabNav from '@/app/components/FloatingTabNav';

const project = {
  id: 'architectural-information-hub',
  title: 'Architectural Information Hub',
  description: 'System Requirements and Architectural Design',
  bgImage: '/preview-AIH.jpg',
  category: 'Business Analysis',
  isGroup: true,
  tags: ['Systems Analysis', 'Enterprise Architecture'],
  duration: 'Jan 2026 – Mar 2026',
  collaborators: 'Cordelia Shan, Vlad Serenko, Kex Zhang, Joy Gu',
  role: 'Collaborated on requirements gathering, designed and evaluated two candidate system architectures, and detailed the concrete design of the selected solution as part of a 5-person team.',
  overview:
    'Vertex Design Partners, a full-service architectural practice, needed an in-house knowledge hub to fix information silos and “key person” risk. Critical assets like permits and drawings were scattered across personal files, emails, and physical drawers. This report proposes two candidate system architectures, evaluates their trade-offs, and details the concrete design of the selected solution: a Microsoft 365-based automated pipeline.',
  tools: ['Systems Architecture Design', 'Trade-off Evaluation Matrix', 'Microsoft 365 Ecosystem', 'Stakeholder Requirements Analysis'],
};

const TABS = ['Overview', 'Solutions', 'Concrete Design', 'UML Diagrams'];

const heading = 'text-lg font-semibold font-PlusJakarta text-[#4A423C] dark:text-white';
const body    = 'text-[15px] text-gray-600 dark:text-white/70 font-PlusJakarta leading-relaxed';
const label   = 'text-sm uppercase tracking-widest text-gray-400 dark:text-white/40 font-PlusJakarta';

const COMPANY_STATS = [
  { value: '1990s', label: 'Established' },
  { value: '150+', label: 'Clients' },
  { value: '50+', label: 'Members' },
];

const IDEA_STATS = [
  {
    value: '50%',
    label: 'Less data retrieval time',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
    ),
  },
  {
    value: '$36K',
    label: 'Saved per year in third-party software',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1v22" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    value: '✓',
    label: 'Builds on existing Microsoft 365 setup',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 7V4M15 7V4M8 10h8a1 1 0 0 1 1 1v1a5 5 0 0 1-5 5v0a5 5 0 0 1-5-5v-1a1 1 0 0 1 1-1Z" />
        <path d="M12 17v3" />
      </svg>
    ),
  },
];

const PROBLEMS = [
  'Information Silos',
  '“Key Person Risk”',
  'Delayed Information Retrieval',
];

const REQUESTS = [
  'Clear and Timely Updates Needed',
  'High Level of Coordination Required',
  'Easier Document Accessibility',
];

const SOLUTION_A_COLOR = '#96AED7';
const SOLUTION_B_COLOR = '#AECA90';

const SOLUTION_A_COMPONENTS = [
  { title: 'Authentication', value: 'Microsoft Entra ID', detail: 'Central authentication, enforcing role-based access control across Staff, Project Managers, and Leadership.' },
  { title: 'Frontend Input', value: 'Microsoft Forms', detail: 'A lightweight, mobile-friendly interface for logging project milestones.' },
  { title: 'Integration Engine', value: 'Power Automate', detail: 'Parses and routes incoming data, then transforms it into structured project updates.' },
  { title: 'Data Storage', value: 'Microsoft List', detail: 'The relational data store for structured project records.' },
  { title: 'Analytics', value: 'Power BI', detail: 'Turns stored data into real-time dashboards for leadership to monitor project health.' },
];

const SOLUTION_A_PROS = [
  'Easy adoption using familiar tools',
  'Low learning curve for staff',
  'Fast deployment with existing infrastructure',
  'Low internal coupling improves system stability',
];
const SOLUTION_A_CONS = [
  'Limited flexibility for deep customization',
  'Vendor lock-in within the Microsoft ecosystem',
  'May limit integration with non-Microsoft tools in future expansions',
];

const SOLUTION_B_COMPONENTS = [
  { title: 'Frontend', value: 'User Interface Webpage', detail: 'Where Staff, Project Managers, and Leadership submit updates, retrieve historical data, and view dashboards.' },
  { title: 'Backend', value: 'Application Server', detail: 'Handles core business logic: receiving and processing requests, validating updates, and managing project data.' },
  { title: 'Data Storage', value: 'Project Database', detail: 'Stores structured project information: details, milestones, and status updates.' },
  { title: 'File Storage', value: 'Document Repository', detail: 'Stores unstructured data such as architectural drawings, permits, and project files.' },
  { title: 'Analytics', value: 'Analytics Module', detail: 'Queries the database directly to generate performance indicators and a reporting dashboard.' },
];

const SOLUTION_B_PROS = [
  'High flexibility and customization',
  'Strong scalability for long-term growth',
  'Independent of vendor constraints',
];
const SOLUTION_B_CONS = [
  'High development and maintenance cost',
  'Steep learning curve for users',
  'Significant training required',
  'Slower implementation timeline',
];

const EVAL_ROWS = [
  { criterion: 'Learning Curve', a: '++', b: '--' },
  { criterion: 'Internal Coupling', a: '++', b: '+' },
  { criterion: 'Scalability', a: '-', b: '+' },
  { criterion: 'Deployment', a: '+', b: '-' },
  { criterion: 'Flexibility', a: '-', b: '+' },
];

const RATING_STYLE = {
  '++': 'bg-[#D7E5C7] text-[#3d5c2a] dark:bg-[#AECA90]/20 dark:text-[#AECA90]',
  '+':  'bg-[#D7E5C7]/60 text-[#4a6b38] dark:bg-[#AECA90]/10 dark:text-[#AECA90]/80',
  '-':  'bg-[#EAE0C8] text-[#7a4420] dark:bg-[#D4A85A]/15 dark:text-[#D4A85A]',
  '--': 'bg-[#EAC8C8] text-[#7a2020] dark:bg-[#D46A6A]/15 dark:text-[#D46A6A]',
};

const SOLUTION_A_WORKS = ['Uses familiar tools (M365)', 'Low-friction adoption', 'Fast deployment', 'Low internal coupling'];
const SOLUTION_B_NOT_SELECTED = ['High learning curve', 'Heavy training required', 'Poor fit with organization'];

const SUB_COMPONENTS = [
  { title: 'Entry Point', value: 'Submission Trigger', detail: 'Fires the moment a standardized MS Forms submission comes in.' },
  { title: 'Backend', value: 'Input Validator', detail: 'Receives the data and enforces validation rules.' },
  { title: 'Logging Handler', value: 'Audit Trail', detail: 'Logs results so every submission is traceable.' },
  { title: 'Notification Service', value: 'Email Notification', detail: 'Sends a real-time email notification to stakeholders.' },
  { title: 'MS List Connector', value: 'Writes Records', detail: 'Receives the validated data and writes it to the MS List.' },
];

const CONCRETE_ALTERNATIVES = [
  {
    title: 'Semi-Automated (Email-Triggered)',
    selected: false,
    description: 'Staff send milestone updates via email, which are manually routed through a task and MS Project before reaching the MS List.',
    note: 'Rejected: jumping from Email → Task → MS Project → MS List introduced multiple points of failure and high latency, making error-tracking tedious for Project Managers.',
  },
  {
    title: 'Form-Triggered Full Automation',
    selected: true,
    description: 'A standardized MS Forms submission triggers Power Automate directly, routing data through its sub-components with zero manual intervention.',
    note: 'Selected: ensures strict data integrity, eliminates workflow friction, and keeps the system highly reliable.',
  },
];

function ImagePlaceholder({ caption }) {
  return (
    <div className="w-full aspect-video rounded-xl border-2 border-dashed border-gray-300 dark:border-white/15 flex flex-col items-center justify-center gap-2 text-gray-400 dark:text-white/30 px-4 text-center">
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
      <span className="text-xs font-PlusJakarta">Waiting for image{caption ? `: ${caption}` : ''}</span>
    </div>
  );
}

function StatRow({ stats, vertical, spread }) {
  return (
    <div className={vertical ? 'flex flex-col gap-5' : spread ? 'flex justify-between gap-4 w-full max-w-md' : 'flex flex-wrap gap-x-10 gap-y-4'}>
      {stats.map((s, i) => (
        <div key={i} className="flex flex-col gap-1.5 max-w-[11rem]">
          {s.icon && (
            <span className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 dark:border-white/20 text-[#4A423C] dark:text-white mb-0.5">
              {s.icon}
            </span>
          )}
          <span className="text-2xl sm:text-3xl font-bold font-PlusJakarta text-[#4A423C] dark:text-white">{s.value}</span>
          <span className="text-xs text-gray-500 dark:text-white/40 font-PlusJakarta leading-snug">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

function ComponentGrid({ items, accent }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {items.map((c, i) => (
        <div key={i} className="flex flex-col gap-1.5 rounded-xl border p-4" style={{ borderColor: accent }}>
          <span className={label}>{c.title}</span>
          <span className={`${body} text-[#4A423C] dark:text-white font-medium`}>{c.value}</span>
          {c.detail && <span className="text-xs text-gray-500 dark:text-white/40 font-PlusJakarta leading-relaxed">{c.detail}</span>}
        </div>
      ))}
    </div>
  );
}

function ProsCons({ pros, cons, accent }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="flex flex-col gap-3 rounded-2xl border p-5" style={{ borderColor: accent }}>
        <h3 className={label}>Pros</h3>
        <ul className="flex flex-col gap-2">
          {pros.map((p, i) => (
            <li key={i} className={`${body} flex items-start gap-2`}>
              <span style={{ color: accent }} className="mt-0.5">✓</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 dark:border-white/10 p-5">
        <h3 className={label}>Cons</h3>
        <ul className="flex flex-col gap-2">
          {cons.map((c, i) => (
            <li key={i} className={`${body} flex items-start gap-2`}>
              <span className="text-gray-400 dark:text-white/30 mt-0.5">✕</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Page() {
  const [activeTab, setActiveTab] = useState('Overview');

  const scrollToTabs = () => {
    document.getElementById('aih-tab-bar')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSideTabClick = (tab) => {
    setActiveTab(tab);
    scrollToTabs();
  };

  return (
    <ProjectLayout project={project} scrollTargetId="aih-tab-bar">
      {/* Floating side tabs (desktop only, stays put while scrolling) */}
      <FloatingTabNav
        tabs={TABS.map(tab => ({ label: tab, value: tab }))}
        active={activeTab}
        onSelect={handleSideTabClick}
      />

      {/* Tab bar */}
      <div id="aih-tab-bar" className="flex flex-wrap gap-0 border-b border-gray-200 dark:border-white/10 mb-8 w-fit">
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
                layoutId="aih-tab-underline"
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
          {activeTab === 'Overview' ? (
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-4">
                  <h2 className={heading}>About the Company</h2>
                  <p className={body}>
                    Vertex Design Partners is a full-service architectural practice with a strong focus on teamwork and collaboration.
                  </p>
                  <StatRow stats={COMPANY_STATS} spread />
                </div>

                <div className="flex flex-col gap-3">
                  <h3 className={label}>Organizational Structure</h3>
                  <div className="w-full overflow-hidden rounded-xl border border-gray-100 dark:border-white/10">
                    <img src="/AIH/org.png" alt="Organizational Structure" className="w-full h-auto block" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <h2 className={heading}>The Problems and Requests</h2>
                <p className={body}>
                  Vertex deals with severe information silos: critical project assets like permits and drawings are scattered across personal files, emails, and physical drawers. This fragmentation delays data retrieval and creates a dangerous “key person risk.”
                </p>
                <div className="flex flex-col gap-3">
                  <h3 className={label}>Problems</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {PROBLEMS.map((p, i) => (
                      <div key={i} className="flex items-center gap-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-3 shadow-sm">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 text-gray-400 dark:text-white/40 shrink-0">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="9" />
                            <path d="M12 8v5" />
                            <path d="M12 16h.01" />
                          </svg>
                        </span>
                        <span className={`${body} text-[#4A423C] dark:text-white`}>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative flex items-center py-1">
                  <div className="flex-1 border-t border-gray-200 dark:border-white/10" />
                  <span className="mx-3 flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-PlusJakarta text-gray-400 dark:text-white/40 whitespace-nowrap">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14M18 13l-6 6-6-6" />
                    </svg>
                    leads to
                  </span>
                  <div className="flex-1 border-t border-gray-200 dark:border-white/10" />
                </div>

                <div className="flex flex-col gap-3">
                  <h3 className={label}>Requests</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {REQUESTS.map((r, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 rounded-xl border px-4 py-3 shadow-sm"
                        style={{ borderColor: SOLUTION_A_COLOR, backgroundColor: `${SOLUTION_A_COLOR}0d` }}
                      >
                        <span
                          className="flex items-center justify-center w-8 h-8 rounded-full shrink-0"
                          style={{ backgroundColor: `${SOLUTION_A_COLOR}30`, color: SOLUTION_A_COLOR }}
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="9" />
                            <path d="M9 12.5l1.8 1.8L15.5 9.5" />
                          </svg>
                        </span>
                        <span className={`${body} text-[#4A423C] dark:text-white`}>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <h2 className={heading}>Our Idea</h2>
                <p className={body}>
                  The Architectural Information Hub (AIH) is a unified, low-friction operating system built entirely on top of the firm’s existing Microsoft 365 setup. The primary business objective is to reduce data retrieval time by 50% and avoid costly construction errors, while using familiar tools to guarantee high user adoption with minimal training.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {IDEA_STATS.map((s, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-xl border px-4 py-3 shadow-sm"
                      style={{ borderColor: SOLUTION_A_COLOR, backgroundColor: `${SOLUTION_A_COLOR}0d` }}
                    >
                      <span
                        className="flex items-center justify-center w-8 h-8 rounded-full shrink-0"
                        style={{ backgroundColor: `${SOLUTION_A_COLOR}30`, color: SOLUTION_A_COLOR }}
                      >
                        {s.icon}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-base font-bold font-PlusJakarta text-[#4A423C] dark:text-white leading-tight">{s.value}</span>
                        <span className="text-xs text-gray-500 dark:text-white/40 font-PlusJakarta leading-snug">{s.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="w-full overflow-hidden rounded-xl border border-gray-100 dark:border-white/10">
                  <img src="/AIH/idea.png" alt="Our Idea" className="w-full h-auto block" />
                </div>
              </div>
            </div>
          ) : activeTab === 'Solutions' ? (
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-3">
                <h2 className={heading}>Solution A: The Automated Pipeline Architecture</h2>
                <p className={body}>
                  A five-component automated pipeline designed natively within Microsoft 365.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className={label}>Key Components</h3>
                <ComponentGrid items={SOLUTION_A_COMPONENTS} accent={SOLUTION_A_COLOR} />
              </div>

              <div className="flex flex-col gap-4">
                <h3 className={label}>Component Diagram</h3>
                <div className="w-full max-w-lg mx-auto overflow-hidden rounded-xl border border-gray-100 dark:border-white/10">
                  <img src="/AIH/solution-a.png" alt="Solution A Component Diagram" className="w-full h-auto block" />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <p className={body}>
                  This design relies on a highly decoupled, pipeline-style approach that clearly separates user input from data storage and analytics, reducing internal dependencies and improving overall system stability.
                </p>
                <ProsCons pros={SOLUTION_A_PROS} cons={SOLUTION_A_CONS} accent={SOLUTION_A_COLOR} />
              </div>

              <div className="border-t border-gray-200 dark:border-white/10" />

              <div className="flex flex-col gap-3">
                <h2 className={heading}>Solution B: Centralized Web Application Architecture</h2>
                <p className={body}>
                  An entirely custom, multi-tier system built from scratch around five main components.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className={label}>Key Components</h3>
                <ComponentGrid items={SOLUTION_B_COMPONENTS} accent={SOLUTION_B_COLOR} />
              </div>

              <div className="flex flex-col gap-4">
                <h3 className={label}>Component Diagram</h3>
                <div className="w-full max-w-lg mx-auto overflow-hidden border border-gray-100 dark:border-white/10">
                  <img src="/AIH/solution-b.png" alt="Solution B Component Diagram" className="w-full h-auto block" />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <p className={body}>
                  This modularity comes at a price: significantly higher development time, complex maintenance, and a heavy training burden for staff unfamiliar with the new interface.
                </p>
                <ProsCons pros={SOLUTION_B_PROS} cons={SOLUTION_B_CONS} accent={SOLUTION_B_COLOR} />
              </div>

              <div className="border-t border-gray-200 dark:border-white/10" />

              <div className="flex flex-col gap-4">
                <h2 className={heading}>Evaluating the Architectural Trade-offs</h2>
                <div className="w-full overflow-x-auto">
                  <table className="w-full text-sm border-collapse min-w-[480px]">
                    <thead>
                      <tr>
                        <th className="text-left p-3 border-b border-gray-200 dark:border-white/10 font-PlusJakarta text-gray-400 dark:text-white/40 text-xs uppercase tracking-widest"></th>
                        <th className="text-left p-3 border-b border-gray-200 dark:border-white/10 font-PlusJakarta text-[#4A423C] dark:text-white">Automated Pipeline (A)</th>
                        <th className="text-left p-3 border-b border-gray-200 dark:border-white/10 font-PlusJakarta text-[#4A423C] dark:text-white">Centralized Web App (B)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {EVAL_ROWS.map((row, i) => (
                        <tr key={i}>
                          <td className="p-3 border-b border-gray-100 dark:border-white/5 font-PlusJakarta text-gray-600 dark:text-white/70">{row.criterion}</td>
                          <td className="p-3 border-b border-gray-100 dark:border-white/5">
                            <span className={`inline-flex items-center justify-center min-w-[2.5rem] px-2 py-1 rounded-md text-xs font-semibold font-PlusJakarta ${RATING_STYLE[row.a]}`}>{row.a}</span>
                          </td>
                          <td className="p-3 border-b border-gray-100 dark:border-white/5">
                            <span className={`inline-flex items-center justify-center min-w-[2.5rem] px-2 py-1 rounded-md text-xs font-semibold font-PlusJakarta ${RATING_STYLE[row.b]}`}>{row.b}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-400 dark:text-white/40 font-PlusJakarta">++ / + strong to moderate support · − / −− weak to poor support</p>
              </div>

              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <h2 className={heading}>Final Selection: Solution A</h2>
                  <p className={`${body} italic`}>The Microsoft 365 Automated Pipeline.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-3 rounded-2xl border p-5" style={{ borderColor: SOLUTION_A_COLOR }}>
                    <h3 className={label}>Why Solution A Works</h3>
                    <ul className="flex flex-col gap-2">
                      {SOLUTION_A_WORKS.map((w, i) => (
                        <li key={i} className={`${body} flex items-start gap-2`}>
                          <span style={{ color: SOLUTION_A_COLOR }} className="mt-0.5">✓</span>
                          <span>{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 dark:border-white/10 p-5">
                    <h3 className={label}>Why Solution B Was Not Selected</h3>
                    <ul className="flex flex-col gap-2">
                      {SOLUTION_B_NOT_SELECTED.map((w, i) => (
                        <li key={i} className={`${body} flex items-start gap-2`}>
                          <span className="text-gray-400 dark:text-white/30 mt-0.5">✕</span>
                          <span>{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === 'Concrete Design' ? (
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-3">
                <h2 className={heading}>The Microsoft 365 Automated Pipeline</h2>
                <p className={body}>
                  A form-triggered full automation design: the concrete design of Solution A’s data ingestion pipeline, nested inside Power Automate.
                </p>
                <div className="w-full overflow-hidden rounded-xl border border-gray-100 dark:border-white/10 bg-white">
                  <img src="/AIH/Concretedesign.png" alt="Concrete Design" className="w-full h-auto block" />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className={label}>Alternatives Considered</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {CONCRETE_ALTERNATIVES.map((alt, i) => (
                    <div
                      key={i}
                      className={`flex flex-col gap-2 rounded-2xl border p-5 ${!alt.selected ? 'border-gray-200 dark:border-white/10' : ''}`}
                      style={alt.selected ? { borderColor: SOLUTION_A_COLOR } : undefined}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <h4 className={`${body} text-[#4A423C] dark:text-white font-semibold`}>{alt.title}</h4>
                        {alt.selected && (
                          <span className="text-xs font-PlusJakarta px-2 py-0.5 rounded-full shrink-0 bg-[#C7D8E0] text-[#2D4557] dark:bg-[#385A6B]/30 dark:text-[#7BBDD4]">
                            Selected
                          </span>
                        )}
                      </div>
                      <p className={body}>{alt.description}</p>
                      <p className="text-xs text-gray-500 dark:text-white/40 font-PlusJakarta leading-relaxed">{alt.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className={label}>Power Automate: Key Sub-Components</h3>
                <ComponentGrid items={SUB_COMPONENTS} accent={SOLUTION_A_COLOR} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-3">
                <h2 className={heading}>Use Case Diagram</h2>
                <ImagePlaceholder caption="Use Case Diagram" />
              </div>

              <div className="flex flex-col gap-3">
                <h2 className={heading}>Class Diagram</h2>
                <ImagePlaceholder caption="Class Diagram" />
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </ProjectLayout>
  );
}
