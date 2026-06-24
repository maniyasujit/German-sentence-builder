import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  BookOpen,
  ClipboardList,
  CalendarCheck,
  ChevronDown,
  Home,
  Layers,
  Languages,
  MoreHorizontal,
  NotebookTabs,
  PenLine,
  Route,
  ScrollText,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

const primaryNavItems: NavItem[] = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/sentence-practice', label: 'Practice Sentences', icon: Languages },
  { to: '/today', label: "Today’s Practice", icon: CalendarCheck },
  { to: '/my-vocabulary', label: 'My Vocabulary', icon: BookOpen },
];

const moreNavItems: NavItem[] = [
  { to: '/practice-from-text', label: 'Practice From Text', icon: PenLine },
  { to: '/sentence-builder', label: 'Sentence Builder', icon: Layers },
  { to: '/case-helper', label: 'Case Helper', icon: ClipboardList },
  { to: '/word-order', label: 'Word Order', icon: Route },
  { to: '/missions', label: 'Missions', icon: Sparkles },
  { to: '/vocabulary', label: 'Vocabulary Examples', icon: BookOpen },
  { to: '/writing', label: 'Writing', icon: PenLine },
  { to: '/mistakes', label: 'Mistakes', icon: NotebookTabs },
  { to: '/progress', label: 'Progress', icon: ScrollText },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const moreIsActive = moreNavItems.some((item) => location.pathname === item.to);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <header className="sticky top-0 z-20 border-b border-stone-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:px-8" aria-label="Primary">
        <div className="flex items-center justify-between gap-4">
          <NavLink to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 font-semibold text-ink">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-fern text-white">
              <Layers aria-hidden="true" size={22} />
            </span>
            <span>German Sentence Builder</span>
          </NavLink>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {primaryNavItems.map(({ to, label, icon: Icon }) => (
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

          <div ref={menuRef} className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-haspopup="menu"
              className={[
                'flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition',
                moreIsActive || menuOpen
                  ? 'bg-ink text-white'
                  : 'text-stone-700 hover:bg-slatewash hover:text-ink',
              ].join(' ')}
            >
              <MoreHorizontal aria-hidden="true" size={17} />
              More
              <ChevronDown
                aria-hidden="true"
                size={15}
                className={['transition', menuOpen ? 'rotate-180' : ''].join(' ')}
              />
            </button>

            {menuOpen ? (
              <div
                role="menu"
                className="absolute left-0 top-full z-30 mt-2 w-[min(20rem,calc(100vw-2rem))] rounded-lg border border-stone-200 bg-white p-2 shadow-soft sm:left-auto sm:right-0"
              >
                <p className="px-3 py-2 text-xs font-semibold uppercase tracking-normal text-stone-500">More tools</p>
                <div className="grid gap-1">
                  {moreNavItems.map(({ to, label, icon: Icon }) => (
                    <NavLink
                      key={to}
                      to={to}
                      role="menuitem"
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        [
                          'flex min-h-10 items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition',
                          isActive ? 'bg-ink text-white' : 'text-stone-700 hover:bg-slatewash hover:text-ink',
                        ].join(' ')
                      }
                    >
                      <Icon aria-hidden="true" size={17} />
                      {label}
                    </NavLink>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </nav>
    </header>
  );
}
