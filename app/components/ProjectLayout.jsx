'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { workData, assets } from '@/assets/assets';
import Navbar from '@/app/components/Navbar';

const categoryCls = 'bg-[#c8ccb0] text-[#3a3a2a] dark:bg-[#5A6538]/40 dark:text-[#b8d480]';

const TAG_COLORS = {
  'UI Design':                      'bg-[#C7D8E0] text-[#2D4557] dark:bg-[#385A6B]/30 dark:text-[#7BBDD4]',
  'UX Design':                      'bg-[#DDE0C7] text-[#4A423C] dark:bg-[#5A6538]/25 dark:text-[#9DB86A]',
  'App Design':                     'bg-[#DDE0C7] text-[#4A423C] dark:bg-[#5A6538]/25 dark:text-[#9DB86A]',
  'Service Design':                 'bg-[#DDE0C7] text-[#4A423C] dark:bg-[#5A6538]/25 dark:text-[#9DB86A]',
  'Virtual Reality':                'bg-[#DDE0C7] text-[#4A423C] dark:bg-[#5A6538]/25 dark:text-[#9DB86A]',
  'UX Research':                    'bg-[#DDE0C7] text-[#4A423C] dark:bg-[#5A6538]/25 dark:text-[#9DB86A]',
  'Accessibility & Inclusive Design':'bg-[#C7D8E0] text-[#2D4557] dark:bg-[#385A6B]/30 dark:text-[#7BBDD4]',
  'Information Architecture':       'bg-[#DFEFBB] text-[#4A423C] dark:bg-[#DFEFBB]/20 dark:text-[#DFEFBB]',
  'Business Analysis':              'bg-[#EAE0C8] text-[#5A4420] dark:bg-[#7A6035]/25 dark:text-[#D4A85A]',
  'Process Modelling':              'bg-[#EAE0C8] text-[#5A4420] dark:bg-[#7A6035]/25 dark:text-[#D4A85A]',
  'Digital Marketing':              'bg-[#EAE0C8] text-[#5A4420] dark:bg-[#7A6035]/25 dark:text-[#D4A85A]',
  'e-Commerce':                     'bg-[#EAE0C8] text-[#5A4420] dark:bg-[#7A6035]/25 dark:text-[#D4A85A]',
  'Next.js':                        'bg-[#E0C9D4] text-[#4A2D3A] dark:bg-[#6B3A52]/25 dark:text-[#C98AAE]',
  'React':                          'bg-[#E0C9D4] text-[#4A2D3A] dark:bg-[#6B3A52]/25 dark:text-[#C98AAE]',
  'Tailwind CSS':                   'bg-[#E0C9D4] text-[#4A2D3A] dark:bg-[#6B3A52]/25 dark:text-[#C98AAE]',
  'Full-Stack':                     'bg-[#E0C9D4] text-[#4A2D3A] dark:bg-[#6B3A52]/25 dark:text-[#C98AAE]',
  'Node.js':                        'bg-[#E0C9D4] text-[#4A2D3A] dark:bg-[#6B3A52]/25 dark:text-[#C98AAE]',
  'MySQL':                          'bg-[#E0C9D4] text-[#4A2D3A] dark:bg-[#6B3A52]/25 dark:text-[#C98AAE]',
  'Python':                         'bg-[#E0C9D4] text-[#4A2D3A] dark:bg-[#6B3A52]/25 dark:text-[#C98AAE]',
  '🏆 1st · UDesignathon 2026':     'bg-[#EAE0C8] text-[#5A4420] dark:bg-[#7A6035]/25 dark:text-[#D4A85A]',
};

const TAG_LABELS = {
  'UI Design': 'UI',
  'UX Design': 'UX',
  'UX Research': 'UX',
};

const tagCls   = (tag) => TAG_COLORS[tag] ?? 'bg-[#DDE0C7] text-[#4A423C] dark:bg-[#5A6538]/25 dark:text-[#9DB86A]';
const tagLabel = (tag) => TAG_LABELS[tag] ?? tag;

export default function ProjectLayout({ project, children, defaultDark = false }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const dark = defaultDark ||
      localStorage.theme === 'dark' ||
      (!localStorage.theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDarkMode(dark);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = '';
    }
  }, [isDarkMode]);

  const otherProjects = [
    ...workData.filter((p) => p.id !== project.id && p.category === project.category),
    ...workData.filter((p) => p.id !== project.id && p.category !== project.category),
  ].slice(0, 3);

  return (
    <>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      <main className="md:ml-60 overflow-x-hidden">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 pt-20 md:pt-12 pb-24">

          {/* Breadcrumb */}
          <motion.div
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="mb-10 flex items-center gap-1.5 text-sm font-PlusJakarta text-gray-400 dark:text-white/40"
          >
            <Link href="/" className="hover:text-gray-700 dark:hover:text-white/80 transition">
              Home
            </Link>
            <span>/</span>
            <Link href="/#work" className="hover:text-gray-700 dark:hover:text-white/80 transition">
              Work
            </Link>
            <span>/</span>
            <Link href={`/?tab=${encodeURIComponent(project.category)}#work`} className="hover:text-gray-700 dark:hover:text-white/80 transition">
              {project.category}
            </Link>
            <span>/</span>
            <span className="text-gray-700 dark:text-white/80">{project.title}</span>
          </motion.div>

          {/* Hero */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="mb-8"
          >
            <p className="text-xs font-PlusJakarta text-gray-500 dark:text-white/50 mb-3 uppercase tracking-widest">
              {project.description}
            </p>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-StixTwoText leading-tight break-words">
              {project.title}
            </h1>
          </motion.div>

          {/* Tags + Individual/Group */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.1 }}
            className="flex flex-wrap items-center gap-2 mb-10"
          >
            {project.tags.map((tag, i) => (
              <span key={i} className={`px-3 py-1 text-xs rounded-full font-PlusJakarta ${tagCls(tag)}`}>
                {tagLabel(tag)}
              </span>
            ))}
            <span className="ml-auto text-xs font-PlusJakarta text-gray-400 dark:text-white/30">
              {project.isGroup ? 'Group Work' : 'Individual'}
            </span>
          </motion.div>

          {/* Metadata */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex flex-col gap-8 pb-10 mb-10 border-b border-gray-200 dark:border-white/10"
          >
            {project.role ? (
              /* Group projects: 2-col — left: overview+tools, right: collaborators+role+duration */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
                  {/* Left col: Overview + Tools */}
                  <div className="flex flex-col gap-8">
                    <div>
                      <h3 className="text-xs uppercase tracking-widest text-gray-400 dark:text-white/40 mb-3 font-PlusJakarta">Project Overview</h3>
                      <p className="text-gray-700 dark:text-white/80 leading-relaxed text-sm">{project.overview}</p>
                    </div>
                    <div>
                      <h3 className="text-xs uppercase tracking-widest text-gray-400 dark:text-white/40 mb-3 font-PlusJakarta">Tools & Methodologies</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tools.map((tool, i) => (
                          <span key={i} className="px-3 py-1 text-xs border border-gray-300 dark:border-white/20 rounded-full font-PlusJakarta dark:text-white">{tool}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Right col: Collaborators + My Role + Duration */}
                  <div className="flex flex-col gap-8">
                    {project.collaborators && (
                      <div>
                        <h3 className="text-xs uppercase tracking-widest text-gray-400 dark:text-white/40 mb-3 font-PlusJakarta">Collaborators</h3>
                        <p className="text-gray-700 dark:text-white/80 leading-relaxed text-sm">{project.collaborators}</p>
                      </div>
                    )}
                    <div>
                      <h3 className="text-xs uppercase tracking-widest text-gray-400 dark:text-white/40 mb-3 font-PlusJakarta">My Role</h3>
                      <p className="text-gray-700 dark:text-white/80 leading-relaxed text-sm">{project.role}</p>
                    </div>
                    <div>
                      <h3 className="text-xs uppercase tracking-widest text-gray-400 dark:text-white/40 mb-3 font-PlusJakarta">Duration</h3>
                      <p className="text-gray-700 dark:text-white/80 leading-relaxed text-sm">{project.duration}</p>
                    </div>
                  </div>
              </div>
            ) : (
              /* Individual projects: overview full-width top, tools + duration side-by-side bottom */
              <>
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-gray-400 dark:text-white/40 mb-3 font-PlusJakarta">Project Overview</h3>
                  <p className="text-gray-700 dark:text-white/80 leading-relaxed text-sm">{project.overview}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-gray-400 dark:text-white/40 mb-3 font-PlusJakarta">Tools & Methodologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tools.map((tool, i) => (
                        <span key={i} className="px-3 py-1 text-xs border border-gray-300 dark:border-white/20 rounded-full font-PlusJakarta dark:text-white">{tool}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-gray-400 dark:text-white/40 mb-3 font-PlusJakarta">Duration</h3>
                    <p className="text-gray-700 dark:text-white/80 leading-relaxed text-sm">{project.duration}</p>
                  </div>
                </div>
              </>
            )}
          </motion.div>

          {/* Content sections (or custom content via children) */}
          {children ? children : (
          <div className="flex flex-col gap-10">
            {project.sections?.map((section, i) => (
              <motion.div
                key={i}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
              >
                {section.type === 'text' && (
                  <div>
                    <h2 className="text-lg sm:text-xl font-PlusJakarta mb-3">{section.heading}</h2>
                    <p className="text-gray-600 dark:text-white/70 leading-relaxed text-sm">
                      {section.content}
                    </p>
                  </div>
                )}

                {section.type === 'image' && (
                  <div className="w-full rounded-2xl overflow-hidden">
                    {section.src
                      ? <img src={section.src} alt={section.alt || ''} className="w-full" />
                      : <div className="aspect-video bg-gray-100 dark:bg-white/5 flex items-center justify-center"><p className="text-gray-400 dark:text-white/30 text-sm">{section.alt || 'Image coming soon'}</p></div>
                    }
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          )}

          {/* Back to top button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            viewport={{ once: true }}
            className="mt-12 flex justify-center"
          >
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-300 dark:border-white/20 text-sm font-PlusJakarta text-gray-600 dark:text-white/70 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white transition"
            >
              <svg className="w-3 h-3 -rotate-90" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 6H11M6 1L11 6L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to top
            </button>
          </motion.div>

          {/* More projects */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="mt-16 pt-10 border-t border-gray-200 dark:border-white/10"
          >
            <h3 className="text-center text-xs uppercase tracking-widest text-gray-400 dark:text-white/40 mb-8 font-PlusJakarta">
              More Projects
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherProjects.map((p, i) => (
                <Link key={i} href={`/projects/${p.id}`}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.1 }}
                    className="rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 cursor-pointer"
                  >
                    <div
                      className="aspect-video bg-cover bg-center w-full"
                      style={{ backgroundImage: `url(${p.bgImage})` }}
                    />
                    <div className="p-3">
                      <h2 className="font-semibold font-PlusJakarta text-sm text-gray-900 dark:text-white">{p.title}</h2>
                      <p className="text-xs text-gray-500 dark:text-white/50 mt-0.5">{p.description}</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>

        </div>
      </main>
    </>
  );
}
