import ProjectLayout from '@/app/components/ProjectLayout';

// ─── Edit your project content here ───────────────────────────────────────────

const project = {
  id: 'photography-site',
  title: 'Photography Site',
  description: 'Web Design',
  bgImage: '/work-3.png',

  tags: [
    { label: '2024', color: 'blue' },
    { label: 'Side Project', color: 'violet' },
    { label: 'Individual', color: 'emerald' },
  ],

  duration: 'Mar 2024 – May 2024',

  overview:
    'A portfolio website for a professional photographer, built to let the imagery take center stage while remaining easy to navigate and update.',

  role:
    'I was responsible for the full design and development — from initial concept and layout to final deployment and CMS integration.',

  tools: ['Next.js', 'Tailwind CSS', 'Sanity CMS', 'Vercel'],

  sections: [
    {
      type: 'text',
      heading: 'The Challenge',
      content:
        'High-resolution photography can easily hurt page performance. The challenge was delivering a visually stunning experience without sacrificing load times.',
    },
    {
      type: 'image',
      alt: 'Homepage hero section',
      // src: '/images/photography-hero.png',  // ← uncomment and set path to add an image
    },
    {
      type: 'text',
      heading: 'Design Process',
      content:
        "The design went through three major iterations, moving from a traditional grid layout to a more editorial, asymmetric approach that better matched the photographer's style.",
    },
    {
      type: 'image',
      alt: 'Gallery layout exploration',
      // src: '/images/photography-gallery.png',
    },
    {
      type: 'text',
      heading: 'Outcome',
      content:
        'The site achieved a perfect Lighthouse performance score and became a key tool for the client to attract new bookings.',
    },
  ],
};

// ──────────────────────────────────────────────────────────────────────────────

export default function Page() {
  return <ProjectLayout project={project} />;
}
