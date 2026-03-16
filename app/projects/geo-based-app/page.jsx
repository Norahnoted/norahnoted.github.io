import ProjectLayout from '@/app/components/ProjectLayout';

// ─── Edit your project content here ───────────────────────────────────────────

const project = {
  id: 'geo-based-app',
  title: 'Geo Based App',
  description: 'Mobile App',
  bgImage: '/work-2.png',

  tags: [
    { label: '2023', color: 'blue' },
    { label: 'Coursework', color: 'amber' },
    { label: 'Group Work', color: 'rose' },
  ],

  duration: 'Sep 2023 – Dec 2023',

  overview:
    'A location-aware mobile application that helps users discover nearby services and points of interest in real time. Designed with a focus on speed and offline usability.',

  role:
    'I handled UX design and prototyping, defining the information architecture and interaction flows, as well as supporting front-end implementation.',

  tools: ['React Native', 'Google Maps API', 'Firebase', 'Figma'],

  sections: [
    {
      type: 'text',
      heading: 'The Challenge',
      content:
        'Building a smooth map-based experience on mobile required careful attention to performance, especially when handling large datasets of location points.',
    },
    {
      type: 'image',
      alt: 'App map view',
      // src: '/images/geo-app-map.png',  // ← uncomment and set path to add an image
    },
    {
      type: 'text',
      heading: 'Design Process',
      content:
        'We ran multiple rounds of user testing to refine the location search flow and reduce friction when switching between map and list views.',
    },
    {
      type: 'image',
      alt: 'User flow diagrams',
      // src: '/images/geo-app-flow.png',
    },
    {
      type: 'text',
      heading: 'Outcome',
      content:
        'The app saw strong early adoption, with users praising the speed and clarity of the location discovery experience.',
    },
  ],
};

// ──────────────────────────────────────────────────────────────────────────────

export default function Page() {
  return <ProjectLayout project={project} />;
}
