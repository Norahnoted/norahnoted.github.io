'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ProjectLayout from '@/app/components/ProjectLayout';
import FloatingTabNav from '@/app/components/FloatingTabNav';

const project = {
  id: 'n108-bank',
  title: 'N108 Bank Enterprise Architecture',
  description: 'Enterprise & Systems Architecture Strategy',
  bgImage: '/preview-n108.png',
  category: 'Business Analysis',
  isGroup: true,
  tags: ['Enterprise Architecture', 'Strategic Alignment'],
  duration: 'Jan 2026 – Apr 2026',
  collaborators: 'Ariel Xiao, Catherine Yuan, Parris McKenley, Yixuan Zhang',
  role: 'Analyzed the bank’s business context and the two future-state scenarios that anchored the information and systems architecture proposals, and framed the analysis roadmap and methodology.',
  overview:
    'A future-state enterprise and systems architecture for a digital-first bank, designed around two pressures hitting at once: a post-merger data integration problem, and a shift toward real-time, agent-driven decisions.',
  tools: ['ArchiMate', 'Enterprise Data Modelling', 'Zachman Framework'],
};

const TABS = ['Overview', 'Information Architecture', 'Application Architecture', 'Alignment'];

const heading = 'text-lg font-semibold font-PlusJakarta text-[#4A423C] dark:text-white';
const body    = 'text-[15px] text-gray-600 dark:text-white/70 font-PlusJakarta leading-relaxed';
const label   = 'text-sm uppercase tracking-widest text-gray-400 dark:text-white/40 font-PlusJakarta';
const strong  = 'text-[#4A423C] dark:text-white font-semibold';

const SOLUTION_A_COLOR = '#96AED7';
const SOLUTION_B_COLOR = '#AECA90';

const COMPANY_STATS = [
  {
    value: '1994',
    label: 'Founded',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <path d="M3 9h18M8 2v4M16 2v4" />
      </svg>
    ),
  },
  {
    value: '$39.1B',
    label: 'Total revenue, 2024',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1v22" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    value: '~600',
    label: 'Cross-functional agile teams',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="7" r="3.25" />
        <path d="M17 8.5a3 3 0 1 0 0-4.5" />
        <path d="M5.5 20v-1a6.5 6.5 0 0 1 9-6" />
        <path d="M20.5 20v-1.5a3.5 3.5 0 0 0-2.5-3.35" />
      </svg>
    ),
  },
];

function ScenarioCard({ title, accent, trigger, challenge, impact }) {
  return (
    <div className="flex flex-col gap-4 border p-5" style={{ borderColor: accent }}>
      <h3 className={`${body} text-[#4A423C] dark:text-white font-semibold`}>{title}</h3>
      {[
        ['Trigger', trigger],
        ['Challenge', challenge],
        ['Impact', impact],
      ].map(([k, v]) => (
        <div key={k} className="flex flex-col gap-1">
          <span className={label}>{k}</span>
          <span className={body}>{v}</span>
        </div>
      ))}
    </div>
  );
}

function GovernanceCard({ title, accent, points }) {
  return (
    <div className="flex flex-col gap-2 border p-4" style={{ borderColor: accent }}>
      <span className={`${body} text-[#4A423C] dark:text-white font-medium`}>{title}</span>
      <ul className="flex flex-col gap-1.5">
        {points.map((p, i) => (
          <li key={i} className="text-xs text-gray-500 dark:text-white/40 font-PlusJakarta leading-relaxed flex items-start gap-1.5">
            <span className="mt-1 w-1 h-1 shrink-0" style={{ backgroundColor: accent }} />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BeforeCard({ title }) {
  return (
    <div className="border border-gray-200 dark:border-white/10 px-4 py-3">
      <span className={`${body} text-[#4A423C] dark:text-white`}>{title}</span>
    </div>
  );
}

function AfterCard({ title, badge, accent, description }) {
  return (
    <div className="border p-4" style={{ borderColor: accent }}>
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`${body} text-[#4A423C] dark:text-white font-medium`}>{title}</span>
        {badge && (
          <span
            className="text-[10px] uppercase tracking-widest font-PlusJakarta px-1.5 py-0.5 border shrink-0"
            style={{ color: accent, borderColor: accent }}
          >
            {badge}
          </span>
        )}
      </div>
      {description && <p className="text-xs text-gray-500 dark:text-white/40 font-PlusJakarta leading-relaxed mt-1.5">{description}</p>}
    </div>
  );
}

function ChangeCard({ badge, accent, description }) {
  return (
    <div className="border p-4 flex flex-col gap-2" style={{ borderColor: accent }}>
      <span
        className="self-start text-[10px] uppercase tracking-widest font-PlusJakarta px-2 py-1 border"
        style={{ color: accent, borderColor: accent }}
      >
        {badge}
      </span>
      <p className="text-xs text-gray-500 dark:text-white/40 font-PlusJakarta leading-relaxed">{description}</p>
    </div>
  );
}

function BeforeAfter({ title, accent, before, after }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className={label}>{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-3">
          <span className="text-xs uppercase tracking-widest font-PlusJakarta text-gray-400 dark:text-white/40">Before</span>
          {before.map((item, i) => <BeforeCard key={i} title={item} />)}
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-xs uppercase tracking-widest font-PlusJakarta" style={{ color: accent }}>After</span>
          {after.map((item, i) => <AfterCard key={i} accent={accent} {...item} />)}
        </div>
      </div>
    </div>
  );
}

function DiagramFigure({ title, caption, src, alt }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h3 className={`${body} text-[#4A423C] dark:text-white font-semibold`}>{title}</h3>
        {caption && <p className={body}>{caption}</p>}
      </div>
      <div className="w-full overflow-hidden border border-gray-100 dark:border-white/10 dark:bg-white">
        <img src={src} alt={alt} className="w-full h-auto block" />
      </div>
    </div>
  );
}

export default function Page() {
  const [activeTab, setActiveTab] = useState('Overview');

  const scrollToTabs = () => {
    document.getElementById('n108-tab-bar')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSideTabClick = (tab) => {
    setActiveTab(tab);
    scrollToTabs();
  };

  return (
    <ProjectLayout project={project} scrollTargetId="n108-tab-bar">
      <FloatingTabNav
        tabs={TABS.map(tab => ({ label: tab, value: tab }))}
        active={activeTab}
        onSelect={handleSideTabClick}
      />

      <div id="n108-tab-bar" className="flex flex-wrap gap-0 border-b border-gray-200 dark:border-white/10 mb-8 w-fit">
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
                layoutId="n108-tab-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9DB86A] dark:bg-[#9DB86A]"
              />
            )}
          </button>
        ))}
      </div>

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
              <div className="flex flex-col gap-4">
                <h2 className={heading}>About N108 Bank</h2>
                <p className={body}>
                  A technology-first bank built around <span className={strong}>Credit Card</span>, <span className={strong}>Consumer Banking</span>, and <span className={strong}>Commercial Banking</span>,
                  self-described as “a technology and data company that happens to run a bank.” Completed a full migration to <span className={strong}>AWS</span> in 2020.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {COMPANY_STATS.map((s, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 border px-4 py-3 shadow-sm"
                      style={{ borderColor: SOLUTION_B_COLOR, backgroundColor: `${SOLUTION_B_COLOR}0d` }}
                    >
                      <span
                        className="flex items-center justify-center w-8 h-8 shrink-0"
                        style={{ backgroundColor: `${SOLUTION_B_COLOR}30`, color: SOLUTION_B_COLOR }}
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
              </div>

              <div className="flex flex-col gap-4">
                <h2 className={heading}>Two Pressures, at the Same Time</h2>
                <p className={body}>
                  A recent acquisition and a push toward automation are pulling the bank’s architecture in two directions at once.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <ScenarioCard
                    title="Scenario 1: Post-Merger Integration"
                    accent={SOLUTION_A_COLOR}
                    trigger="Industry consolidation and the Discover network acquisition"
                    challenge="Legacy systems and mismatched data standards create silos and inconsistent processes across business units"
                    impact="More complex customer journeys, and a stronger need for cross-unit data coordination"
                  />
                  <ScenarioCard
                    title="Scenario 2: Digital Transformation"
                    accent={SOLUTION_B_COLOR}
                    trigger="Demand for real-time, personalized service and a flatter, more agile structure"
                    challenge="Manual decision-making in credit, risk, and customer operations can't meet real-time demand"
                    impact="More decentralized decisions, and closer collaboration between business and technical teams"
                  />
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-white/10" />

              <div className="flex flex-col gap-10">
                <p className={body}>
                  One proposed solution per scenario, each mapped with <span className={strong}>ArchiMate</span> across the business, organisation, application, and technology layers.
                </p>

                <DiagramFigure
                  title="Solution 1: Agent-Assisted Integration Platform"
                  caption={<>Intelligent agents handle data mapping and process coordination across <span className={strong}>CRM</span>, <span className={strong}>Core Banking</span>, and the newly acquired <span className={strong}>Discover</span> systems, supporting system integration and reducing manual cross-unit handoffs.</>}
                  src="/N108/solution1.png"
                  alt="Solution 1: Agent-Assisted Integration Platform, ArchiMate layered diagram"
                />

                <DiagramFigure
                  title="Solution 2: Agent-Enabled CRM & Decision Support System"
                  caption={<>Four agents, <span className={strong}>CRM Intelligence</span>, <span className={strong}>Real-Time Decision Engine</span>, <span className={strong}>Insight Distribution</span>, and <span className={strong}>Risk Monitoring</span>, close the gap between what the bank already knows and how fast it can act on it.</>}
                  src="/N108/solution2-decision-support-detail.png"
                  alt="Solution 2: Agent-Enabled CRM and Decision Support System, detailed ArchiMate diagram"
                />
              </div>
            </div>
          ) : activeTab === 'Information Architecture' ? (
            <div className="flex flex-col gap-10">
              <p className={body}>
                A canonical enterprise data model standardizes how the bank's <span className={strong}>ten core entities</span> are defined, before either scenario adds anything on top of them.
              </p>

              <DiagramFigure
                title="Baseline: 10 Entities, No Way to Act on Them"
                caption={<><span className={strong}>Customer</span>, <span className={strong}>Account</span>, <span className={strong}>Transaction</span>, <span className={strong}>Risk Profile</span>, and six others capture activity and fraud, but nothing in the baseline can act on what it captures.</>}
                src="/N108/baseline-edm.png"
                alt="Baseline enterprise data model, 10 core entities"
              />

              <DiagramFigure
                title="Scenario 1: Data Layer Changes for Post-Merger Integration"
                caption={<>A new <span className={strong}>Integration Event</span> entity logs every cross-system exchange between CRM, Core Banking, and Discover, giving the integration platform a full audit trail to work from.</>}
                src="/N108/scenario1-edm-changes.png"
                alt="Enterprise data model with Scenario 1's Integration Event entity highlighted"
              />

              <DiagramFigure
                title="Scenario 2: Data Layer Changes for Digital Transformation"
                caption={<>A new <span className={strong}>Credit Application</span> entity, plus <span className={strong}>modelVersion</span>, <span className={strong}>agentID</span>, and <span className={strong}>resolvedBy</span> attributes, make every automated decision traceable back to the model and agent that made it.</>}
                src="/N108/edm-scenario-changes.png"
                alt="Enterprise data model with Scenario 2's changes highlighted"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <ChangeCard
                  badge="Modified"
                  accent={SOLUTION_A_COLOR}
                  description="Added resolvedBy. Agents handle low-severity alerts automatically, freeing analysts for high-priority cases."
                />
                <ChangeCard
                  badge="Modified"
                  accent={SOLUTION_A_COLOR}
                  description="Added modelVersion and agentID. Every AI-driven score is traceable and audit-ready."
                />
                <ChangeCard
                  badge="New entity"
                  accent={SOLUTION_B_COLOR}
                  description="New entity that logs what the agent decided and why, keeping decisions accountable and reversible."
                />
                <ChangeCard
                  badge="New system"
                  accent={SOLUTION_B_COLOR}
                  description="Agent CRM + DSS pulls live data from transactions, risk, and fraud to drive real-time decisions, on a 2 to 3 year rollout."
                />
              </div>
            </div>
          ) : activeTab === 'Application Architecture' ? (
            <div className="flex flex-col gap-10">
              <p className={body}>
                Five core systems, <span className={strong}>CRM</span>, <span className={strong}>Core Banking</span>, <span className={strong}>BPMS</span>, <span className={strong}>ERP</span>, and <span className={strong}>CMS</span>, connected through a service-oriented, layered architecture.
              </p>

              <DiagramFigure
                title="As-Is: Fragmented, Manual Handoffs"
                caption="Every step of the loan workflow still needs manual intervention, and CRM functions mainly as a data store with no analytical capability of its own."
                src="/N108/layered-architecture-baseline.png"
                alt="Original layered application architecture"
              />

              <DiagramFigure
                title="Scenario 1: Application Layer Changes for Post-Merger Integration"
                caption={<>CRM, Core Banking, BPMS, ERP, and CMS are re-scoped into a single <span className={strong}>Enterprise Systems Landscape</span>, one coordinated boundary the integration platform manages instead of five separate systems.</>}
                src="/N108/layered-architecture-solution-a.png"
                alt="Layered application architecture with Scenario 1's Enterprise Systems Landscape highlighted"
              />

              <DiagramFigure
                title="Scenario 2: Application Layer Changes for Digital Transformation"
                caption={<>CRM is upgraded to an <span className={strong}>AI-Enhanced CRM System</span>, and a new <span className={strong}>Intelligent Credit Scoring System</span> automates the Credit Risk Assessment step end to end.</>}
                src="/N108/layered-architecture-solution-b.png"
                alt="Layered application architecture with Scenario 2's AI-Enhanced CRM and Intelligent Credit Scoring System highlighted"
              />
            </div>
          ) : (
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-3">
                <h2 className={heading}>Strategic Alignment</h2>
                <p className={body}>
                  The <span className={strong}>canonical data model</span> is what keeps the two architectures honest: every field an agentic system writes back to is one the information architecture already governs.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className={label}>Enterprise Information Architecture</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Canonical Enterprise Data Model',
                    '10 core entities standardized',
                    'Customer as central hub',
                    'Fraud Alert updates Risk Profile',
                    'Regulatory Report Linkage',
                  ].map((item, i) => (
                    <div key={i} className="border border-gray-200 dark:border-white/10 px-4 py-3">
                      <span className={`${body} text-[#4A423C] dark:text-white`}>{item}</span>
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
                  Shared Semantic Foundation
                </span>
                <div className="flex-1 border-t border-gray-200 dark:border-white/10" />
              </div>

              <div className="flex flex-col gap-3">
                <h3 className={label}>Systems Architecture</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <GovernanceCard
                    title="AI-Enhanced CRM"
                    accent={SOLUTION_A_COLOR}
                    points={['Consumes Customer and Risk Profile entities for real-time decisioning']}
                  />
                  <GovernanceCard
                    title="Agent Integration Platform"
                    accent={SOLUTION_A_COLOR}
                    points={['Maps data via the canonical schema', 'Resolves Discover legacy mismatches']}
                  />
                  <GovernanceCard
                    title="Intelligent Credit Scoring"
                    accent={SOLUTION_A_COLOR}
                    points={['Reads the Credit Application entity', 'Writes modelVersion back to Risk Profile']}
                  />
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-white/10" />

              <BeforeAfter
                title="Scenario: Digital Transformation"
                accent={SOLUTION_B_COLOR}
                before={[
                  'CRM (data store only)',
                  'Manual credit evaluation',
                  'Human fraud review',
                  'Delayed risk scoring',
                ]}
                after={[
                  { title: 'AI-Enhanced CRM', badge: 'Upgraded', description: 'Real-time personalization and automated customer interactions' },
                  { title: 'Intelligent Credit Scoring', badge: 'New', description: 'Agentic credit risk assessment, writes modelVersion and agentID to Risk Profile' },
                  { title: 'Fraud Alert: resolvedBy attribute', badge: 'Updated', description: 'Distinguishes human from agentic resolution for the audit trail' },
                  { title: 'Risk Profile: modelVersion attribute', badge: 'Updated', description: 'Regulatory accountability for all AI-driven decisions' },
                ]}
              />

              <div className="border-t border-gray-200 dark:border-white/10" />

              <div className="flex flex-col gap-4">
                <h3 className={label}>Governance</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <GovernanceCard
                    title="Chief Data Officer (new)"
                    accent={SOLUTION_B_COLOR}
                    points={['Sets enterprise data strategy', 'Bridges the information and systems layers', 'Resolves federated ownership gaps']}
                  />
                  <GovernanceCard
                    title="Model Risk & AI Governance (new)"
                    accent={SOLUTION_A_COLOR}
                    points={['Independent model validation', 'Biannual audits of agentic attributes', 'Governs the AI-enhanced CRM and scoring system']}
                  />
                  <GovernanceCard
                    title="Data Owners & Committees"
                    accent={SOLUTION_B_COLOR}
                    points={['Integration Event stewardship', 'Escalation to the Governance Committee', 'Compliance: Fed, OCC, CFPB']}
                  />
                </div>
                <p className={body}>
                  Cross-layer accountability: governance roles defined in the information architecture directly oversee the agentic attributes and audit logs the systems architecture produces, so no AI system operates without one.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </ProjectLayout>
  );
}
