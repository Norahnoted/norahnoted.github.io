// Shared project-tag styling, used by the Work grid and the Spotlight card.

const TAG_COLORS = {
  // Design
  'UI Design':                      'bg-[var(--tag-blue-bg)] text-[var(--tag-blue-ink)]',
  'App Design':                     'bg-[var(--tag-sage-bg)] text-[var(--tag-sage-ink)]',
  'Service Design':                 'bg-[var(--tag-sage-bg)] text-[var(--tag-sage-ink)]',
  'Virtual Reality':                'bg-[var(--tag-sage-bg)] text-[var(--tag-sage-ink)]',
  // Research
  'UX Research':                    'bg-[var(--tag-sage-bg)] text-[var(--tag-sage-ink)]',
  'Accessibility & Inclusive Design':'bg-[var(--tag-blue-bg)] text-[var(--tag-blue-ink)]',
  'Navigation':                     'bg-[var(--tag-sand-bg)] text-[var(--tag-sand-ink)]',
  'Information Architecture':       'bg-[var(--tag-mint-bg)] text-[var(--tag-mint-ink)]',
  // Business
  'Business Analysis':              'bg-[var(--tag-sand-bg)] text-[var(--tag-sand-ink)]',
  'Process Modelling':              'bg-[var(--tag-sand-bg)] text-[var(--tag-sand-ink)]',
  'Digital Marketing':              'bg-[var(--tag-sand-bg)] text-[var(--tag-sand-ink)]',
  'e-Commerce':                     'bg-[var(--tag-sand-bg)] text-[var(--tag-sand-ink)]',
  // Dev / Tech
  'Next.js':                        'bg-[var(--tag-lilac-bg)] text-[var(--tag-lilac-ink)]',
  'Three.js':                       'bg-[var(--tag-lilac-bg)] text-[var(--tag-lilac-ink)]',
  'React':                          'bg-[var(--tag-lilac-bg)] text-[var(--tag-lilac-ink)]',
  'Tailwind CSS':                   'bg-[var(--tag-lilac-bg)] text-[var(--tag-lilac-ink)]',
  'Full-Stack':                     'bg-[var(--tag-lilac-bg)] text-[var(--tag-lilac-ink)]',
  'Node.js':                        'bg-[var(--tag-lilac-bg)] text-[var(--tag-lilac-ink)]',
  'MySQL':                          'bg-[var(--tag-lilac-bg)] text-[var(--tag-lilac-ink)]',
  'Python':                         'bg-[var(--tag-lilac-bg)] text-[var(--tag-lilac-ink)]',
  // Domain
  'Healthcare':                     'bg-[var(--tag-sand-bg)] text-[var(--tag-sand-ink)]',
  'Public Service':                 'bg-[var(--tag-sand-bg)] text-[var(--tag-sand-ink)]',
  'Green':                          'bg-[var(--tag-sage-bg)] text-[var(--tag-sage-ink)]',
  'Sustainability':                 'bg-[var(--tag-sage-bg)] text-[var(--tag-sage-ink)]',
  'Social':                         'bg-[var(--tag-mint-bg)] text-[var(--tag-mint-ink)]',
  'Pet Care':                       'bg-[var(--tag-lilac-bg)] text-[var(--tag-lilac-ink)]',
  'Retail':                         'bg-[var(--tag-sand-bg)] text-[var(--tag-sand-ink)]',
  'Entertainment':                  'bg-[var(--tag-lilac-bg)] text-[var(--tag-lilac-ink)]',
  '🏆 1st · UDesignathon 2026':     'bg-[var(--tag-sand-bg)] text-[var(--tag-sand-ink)]',
};

const TAG_LABELS = { 'UI Design': 'UI', 'UX Research': 'UX' };

export const tagCls = (tag) =>
  TAG_COLORS[tag] ?? 'bg-[var(--site-accent-soft)] text-brand';

export const tagLabel = (tag) => TAG_LABELS[tag] ?? tag;
