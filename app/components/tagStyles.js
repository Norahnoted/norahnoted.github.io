// Shared project-tag styling, used by the Work grid and the Spotlight card.

const TAG_COLORS = {
  // Design
  'UI Design':                      'bg-[#C7D8E0] text-[#2D4557] dark:bg-[#385A6B]/30 dark:text-[#7BBDD4]',
  'App Design':                     'bg-[#DDE0C7] text-[#4A423C] dark:bg-[#5A6538]/25 dark:text-[#9DB86A]',
  'Service Design':                 'bg-[#DDE0C7] text-[#4A423C] dark:bg-[#5A6538]/25 dark:text-[#9DB86A]',
  'Virtual Reality':                'bg-[#DDE0C7] text-[#4A423C] dark:bg-[#5A6538]/25 dark:text-[#9DB86A]',
  // Research
  'UX Research':                    'bg-[#DDE0C7] text-[#4A423C] dark:bg-[#5A6538]/25 dark:text-[#9DB86A]',
  'Accessibility & Inclusive Design':'bg-[#C7D8E0] text-[#2D4557] dark:bg-[#385A6B]/30 dark:text-[#7BBDD4]',
  'Navigation':                     'bg-[#EAE0C8] text-[#5A4420] dark:bg-[#7A6035]/25 dark:text-[#D4A85A]',
  'Information Architecture':       'bg-[#DFEFBB] text-[#4A423C] dark:bg-[#DFEFBB]/20 dark:text-[#DFEFBB]',
  // Business
  'Business Analysis':              'bg-[#EAE0C8] text-[#5A4420] dark:bg-[#7A6035]/25 dark:text-[#D4A85A]',
  'Process Modelling':              'bg-[#EAE0C8] text-[#5A4420] dark:bg-[#7A6035]/25 dark:text-[#D4A85A]',
  'Digital Marketing':              'bg-[#EAE0C8] text-[#5A4420] dark:bg-[#7A6035]/25 dark:text-[#D4A85A]',
  'e-Commerce':                     'bg-[#EAE0C8] text-[#5A4420] dark:bg-[#7A6035]/25 dark:text-[#D4A85A]',
  // Dev / Tech
  'Next.js':                        'bg-[#E0C9D4] text-[#4A2D3A] dark:bg-[#6B3A52]/25 dark:text-[#C98AAE]',
  'React':                          'bg-[#E0C9D4] text-[#4A2D3A] dark:bg-[#6B3A52]/25 dark:text-[#C98AAE]',
  'Tailwind CSS':                   'bg-[#E0C9D4] text-[#4A2D3A] dark:bg-[#6B3A52]/25 dark:text-[#C98AAE]',
  'Full-Stack':                     'bg-[#E0C9D4] text-[#4A2D3A] dark:bg-[#6B3A52]/25 dark:text-[#C98AAE]',
  'Node.js':                        'bg-[#E0C9D4] text-[#4A2D3A] dark:bg-[#6B3A52]/25 dark:text-[#C98AAE]',
  'MySQL':                          'bg-[#E0C9D4] text-[#4A2D3A] dark:bg-[#6B3A52]/25 dark:text-[#C98AAE]',
  'Python':                         'bg-[#E0C9D4] text-[#4A2D3A] dark:bg-[#6B3A52]/25 dark:text-[#C98AAE]',
  // Domain
  'Healthcare':                     'bg-[#EAE0C8] text-[#5A4420] dark:bg-[#7A6035]/25 dark:text-[#D4A85A]',
  'Public Service':                 'bg-[#EAE0C8] text-[#5A4420] dark:bg-[#7A6035]/25 dark:text-[#D4A85A]',
  'Green':                          'bg-[#DDE0C7] text-[#4A423C] dark:bg-[#5A6538]/25 dark:text-[#9DB86A]',
  'Sustainability':                 'bg-[#DDE0C7] text-[#4A423C] dark:bg-[#5A6538]/25 dark:text-[#9DB86A]',
  'Social':                         'bg-[#EAE0C8] text-[#5A4420] dark:bg-[#7A6035]/25 dark:text-[#D4A85A]',
  'Pet Care':                       'bg-[#EAE0C8] text-[#5A4420] dark:bg-[#7A6035]/25 dark:text-[#D4A85A]',
  'Retail':                         'bg-[#EAE0C8] text-[#5A4420] dark:bg-[#7A6035]/25 dark:text-[#D4A85A]',
  'Entertainment':                  'bg-[#EAE0C8] text-[#5A4420] dark:bg-[#7A6035]/25 dark:text-[#D4A85A]',
  '🏆 1st · UDesignathon 2026':     'bg-[#EAE0C8] text-[#5A4420] dark:bg-[#7A6035]/25 dark:text-[#D4A85A]',
};

const TAG_LABELS = {
  'UI Design': 'UI',
  'UX Research': 'UX',
};

export const tagCls = (tag) =>
  TAG_COLORS[tag] ?? 'bg-[#DDE0C7] text-[#4A423C] dark:bg-[#5A6538]/25 dark:text-[#9DB86A]';

export const tagLabel = (tag) => TAG_LABELS[tag] ?? tag;
