import ProjectLayout from '@/app/components/ProjectLayout';

// ─── Edit your project content here ───────────────────────────────────────────

const project = {
  id: 'ui-ux-designing',
  title: 'UI/UX Designing',
  description: 'UI/UX Design',
  bgImage: '/work-4.png',

  tags: [
    { label: '2023', color: 'blue' },
    { label: 'Coursework', color: 'amber' },
    { label: 'Group Work', color: 'rose' },
  ],

  duration: 'Oct 2023 – Jan 2024',

  overview:
    'A comprehensive UI/UX redesign of a SaaS dashboard, aimed at reducing user confusion and improving task completion rates across the core workflows.',

  role:
    'I led the UX research, wireframing, and high-fidelity prototyping phases, presenting findings and designs to stakeholders throughout the process.',

  tools: ['Figma', 'Maze', 'Notion', 'Zeplin'],

  sections: [
    {
      type: 'text',
      heading: 'The Challenge',
      content:
        'The existing dashboard had accumulated years of feature additions without a cohesive design strategy, resulting in a cluttered and confusing interface.',
    },
    {
      type: 'image',
      alt: 'Before and after comparison',
      // src: '/images/ui-ux-before-after.png',  // ← uncomment and set path to add an image
    },
    {
      type: 'text',
      heading: 'Design Process',
      content:
        'We began with stakeholder interviews and usability testing sessions to identify the most critical pain points, then systematically redesigned each section of the dashboard.',
    },
    {
      type: 'image',
      alt: 'Wireframe explorations',
      // src: '/images/ui-ux-wireframes.png',
    },
    {
      type: 'text',
      heading: 'Outcome',
      content:
        'Post-launch usability testing showed a 35% improvement in task completion rates and a significant drop in support tickets related to navigation.',
    },
  ],
};

// ──────────────────────────────────────────────────────────────────────────────

export default function Page() {
  return <ProjectLayout project={project} />;
}
