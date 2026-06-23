import { NavLink } from 'react-router-dom';
import {
  BookOpen,
  ClipboardList,
  Home,
  Layers,
  NotebookTabs,
  PenLine,
  Route,
  ScrollText,
  Sparkles,
} from 'lucide-react';

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/sentence-builder', label: 'Sentence Builder', icon: Layers },
  { to: '/case-helper', label: 'Case Helper', icon: ClipboardList },
  { to: '/word-order', label: 'Word Order', icon: Route },
  { to: '/missions', label: 'Missions', icon: Sparkles },
  { to: '/vocabulary', label: 'Vocabulary', icon: BookOpen },
  { to: '/writing', label: 'Writing', icon: PenLine },
  { to: '/mistakes', label: 'Mistakes', icon: NotebookTabs },
  { to: '/progress', label: 'Progress', icon: ScrollText },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-stone-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:px-8" aria-label="Primary">
        <div className="flex items-center justify-between gap-4">
          <NavLink to="/" className="flex items-center gap-2 font-semibold text-ink">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-fern text-white">
              <Layers aria-hidden="true" size={22} />
            </span>
            <span>German Sentence Builder</span>
          </NavLink>
        </div>

        <div className="-mx-1 flex gap-1 overflow-x-auto pb-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                [
                  'flex min-h-10 shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition',
                  isActive
                    ? 'bg-ink text-white'
                    : 'text-stone-700 hover:bg-slatewash hover:text-ink',
                ].join(' ')
              }
            >
              <Icon aria-hidden="true" size={17} />
              {label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
