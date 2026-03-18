import { assets } from "@/assets/assets";
import { workData } from "@/assets/assets";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const NAV_ITEMS = [
  { label: "Home",       href: "#top",     section: "top"     },
  { label: "About me",   href: "#about",   section: "about"   },
  { label: "My work",    href: "#work",    section: "work"    },
  { label: "Contact me", href: "#contact", section: "contact" },
];

const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isProjectPage = pathname.startsWith("/projects/");
  const prefix = isHome ? "" : "/";

  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");

  const [workExpanded, setWorkExpanded] = useState(isProjectPage);

  // Auto-expand on project pages, collapse on home
  useEffect(() => {
    if (isProjectPage) setWorkExpanded(true);
  }, [isProjectPage]);

  // Collapse when scrolling away from work section on home page
  useEffect(() => {
    if (!isHome) return;
    if (activeSection === "work") {
      setWorkExpanded(true);
    } else {
      setWorkExpanded(false);
    }
  }, [activeSection, isHome]);

  const toggleWork = () => setWorkExpanded(p => !p);

  // IntersectionObserver for active section on home page
  useEffect(() => {
    if (!isHome) return;
    const observers = [];

    NAV_ITEMS.forEach(({ section }) => {
      const el = document.getElementById(section);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(section); },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(o => o.disconnect());
  }, [isHome]);

  const getIsActive = (section) => {
    if (isProjectPage) return section === "work";
    return isHome && activeSection === section;
  };

  return (
    <>
      {/* Mobile hamburger */}
      <button
        className="fixed top-5 left-5 z-50 md:hidden"
        onClick={() => setIsOpen(true)}
      >
        <Image src={isDarkMode ? assets.menu_white : assets.menu_black} alt="" className="w-6" />
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Floating sidebar */}
      <nav
        className={`fixed left-4 top-4 bottom-4 w-52 z-50 flex flex-col px-5 py-7
          rounded-[2rem]
          bg-white/70 dark:bg-black/40
          backdrop-blur-3xl backdrop-saturate-[180%]
          border border-white/70 dark:border-white/10
          shadow-[0_2px_0_0_rgba(255,255,255,0.9)_inset,0_24px_48px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.05)]
          dark:shadow-[0_2px_0_0_rgba(255,255,255,0.06)_inset,0_24px_48px_rgba(0,0,0,0.5)]
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-[calc(100%+1rem)] md:translate-x-0"}`}
      >
        {/* Mobile close */}
        <button
          className="absolute top-4 right-4 md:hidden"
          onClick={() => setIsOpen(false)}
        >
          <Image src={isDarkMode ? assets.close_white : assets.close_black} alt="" className="w-4 cursor-pointer" />
        </button>

        {/* Logo */}
        <a href={`${prefix}#top`} className="mb-10 px-1">
          <Image src={isDarkMode ? assets.logo_dark : assets.logo} className="w-20" alt="" />
        </a>

        {/* Nav links */}
        <ul className="flex flex-col gap-0.5 flex-1 overflow-y-auto">
          {NAV_ITEMS.map(({ label, href, section }) => {
            const isActive = getIsActive(section);
            const isWork = section === "work";

            return (
              <li key={label}>
                {isWork ? (
                  <>
                    <div className={`flex items-center justify-between rounded-xl transition-colors duration-200
                      ${isActive ? "bg-brand/10 dark:bg-white/15" : "hover:bg-brand/5 dark:hover:bg-white/10"}`}
                    >
                      <a
                        href={`${prefix}${href}`}
                        onClick={() => { setActiveSection(section); setWorkExpanded(true); }}
                        className={`font-PlusJakarta flex-1 py-2 px-3 text-sm
                          ${isActive ? "text-brand dark:text-white font-medium" : "text-textMain dark:text-white/80"}`}
                      >
                        {label}
                      </a>
                      <button
                        onClick={toggleWork}
                        className="pr-3 py-2 text-gray-500 dark:text-white/50"
                      >
                        <svg
                          className={`w-3 h-3 transition-transform duration-200 ${workExpanded ? "rotate-180" : ""}`}
                          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>

                    {workExpanded && (
                      <div className="mt-1 ml-3 flex flex-col gap-3 border-l border-gray-200 dark:border-white/10 pl-3">
                        {/* Group projects by category in fixed order */}
                        {['Product Design', 'Business Analysis', 'Web Development'].map(category => (
                          <div key={category}>
                            <p className="font-PlusJakarta text-[10px] uppercase tracking-widest text-gray-400 dark:text-white/30 px-2 mb-0.5">
                              {category}
                            </p>
                            <ul className="flex flex-col gap-0.5">
                              {workData.filter(p => p.category === category).map((project) => {
                                const isCurrentProject = pathname === `/projects/${project.id}`;
                                return (
                                  <li key={project.id}>
                                    <Link
                                      href={`/projects/${project.id}`}
                                      className={`font-PlusJakarta block py-1.5 px-2 rounded-lg text-xs transition-colors duration-200 leading-snug
                                        ${isCurrentProject
                                          ? "bg-brand/10 dark:bg-white/15 text-brand dark:text-white font-medium"
                                          : "text-textMain/70 dark:text-white/60 hover:bg-brand/5 dark:hover:bg-white/10"
                                        }`}
                                    >
                                      {project.title.replace(' Case Study', '')}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <a
                    href={`${prefix}${href}`}
                    onClick={() => { setActiveSection(section); setWorkExpanded(false); }}
                    className={`font-PlusJakarta block py-2 px-3 rounded-xl text-sm transition-colors duration-200
                      ${isActive
                        ? "bg-black/10 dark:bg-white/15 text-gray-900 dark:text-white font-medium"
                        : "text-gray-700 dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/10"
                      }`}
                  >
                    {label}
                  </a>
                )}
              </li>
            );
          })}
        </ul>

        {/* Dark mode toggle */}
        <button
          onClick={() => setIsDarkMode((prev) => !prev)}
          className="mt-3 flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-200"
        >
          <Image src={isDarkMode ? assets.sun_icon : assets.moon_icon} alt="" className="w-4" />
          <span className="text-xs font-PlusJakarta text-gray-500 dark:text-white/50">
            {isDarkMode ? "Light" : "Dark"}
          </span>
        </button>
      </nav>
    </>
  );
};

export default Navbar;
