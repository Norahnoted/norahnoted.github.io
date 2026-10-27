'use client';

import Link from 'next/link';
import { tagCls, tagLabel } from './tagStyles';

export default function WorkTable({ projects, year }) {
  return <div className="overflow-x-auto rounded-lg border border-[var(--site-border)] font-PlusJakarta">
    <table className="w-full min-w-[660px] border-collapse text-left text-[12px] leading-[1.6]">
      <caption className="sr-only">Projects from {year}</caption>
      <thead className="bg-[var(--site-surface-muted)] text-[10px] font-medium uppercase tracking-[.08em] text-[var(--site-text-muted)]">
        <tr><th scope="col" className="w-[40%] px-5 py-3 font-medium">Project</th><th scope="col" className="px-4 py-3 font-medium">Discipline</th><th scope="col" className="px-4 py-3 font-medium">Focus</th><th scope="col" className="px-4 py-3 font-medium">Team</th></tr>
      </thead>
      <tbody>{projects.map(project => <tr key={project.id} className="border-t border-[var(--site-border)] bg-[var(--site-surface)] transition-colors hover:bg-[var(--site-accent-soft)]">
        <th scope="row" className="px-5 py-4 font-normal">
          {project.locked
            ? <div className="flex items-center gap-3"><span className="grid h-10 w-14 shrink-0 place-items-center rounded-sm bg-[var(--site-surface-muted)] text-[var(--site-text-muted)]" aria-hidden="true">—</span><span className="text-[var(--site-text-muted)]">{project.title}<span className="mt-1 block text-[9px] uppercase tracking-wider">Coming soon</span></span></div>
            : <Link href={`/projects/${project.id}`} className="group flex items-center gap-3 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--site-accent)]"><img src={project.bgImage} alt="" loading="lazy" className="h-10 w-14 shrink-0 rounded-sm border border-[var(--site-border)] object-cover" /><span className="text-[13px] font-medium text-[var(--site-text)] group-hover:text-[var(--site-accent)]">{project.title}{project.ongoing && <span className="mt-1 block text-[10px] font-normal text-[var(--site-accent)]">Ongoing</span>}</span></Link>}
        </th>
        <td className="px-4 py-4 text-[11px] text-[var(--site-text-muted)]">{project.description}</td>
        <td className="px-4 py-4"><div className="flex flex-wrap gap-1">{project.tags.map(tag => <span key={tag} className={`rounded-full px-2 py-0.5 text-[9px] ${tagCls(tag)}`}>{tagLabel(tag)}</span>)}</div></td>
        <td className="whitespace-nowrap px-4 py-4 text-[11px] text-[var(--site-text-muted)]">{project.isGroup?'Group work':'Individual'}</td>
      </tr>)}</tbody>
    </table>
  </div>;
}
