import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { PiListBold, PiXBold } from 'react-icons/pi'
import logo from '../../assets/Frame.png'
import profileImg from '../../assets/Profile.jpg'


const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'Employee', to: '/employee' },
  { label: 'Hiring', to: '/hiring' },
  { label: 'Report', to: '/report' },
  { label: 'Files', to: '/files' },
  { label: 'Payroll', to: '/payroll' },
]

function formatNavbarDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  }).format(date)
}

export default function Navbar() {
  const [query, setQuery] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-6 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 justify-self-start">
          <img src={logo} alt="Pluto" className="h-7 w-auto" />
        </div>

        <nav className="hidden items-center justify-center gap-6 text-sm md:flex justify-self-center">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  'relative px-1 py-1 text-slate-500 transition-colors hover:text-slate-900',
                  isActive ? 'font-semibold text-indigo-600' : '',
                ].join(' ')
              }
              end={item.to === '/'}
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive ? (
                    <span className="absolute inset-x-0 -bottom-[14px] h-[2px] rounded-full bg-indigo-600" />
                  ) : null}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-4 justify-self-end">
          <div className="hidden md:flex items-center gap-3">
            <div className="hidden lg:block w-[260px] xl:w-[320px]">
              <div className="relative w-full">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-slate-400" aria-hidden="true">
                    <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search Anything..."
                  className="block h-9 w-full rounded-xl border-0 bg-slate-100 py-1.5 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6 transition-all"
                />
              </div>
            </div>

            <div className="hidden text-right text-xs leading-tight text-slate-600 sm:block">
              <div className="font-semibold text-slate-900">Sadik Hasan</div>
              <div>{formatNavbarDate(new Date())}</div>
            </div>
            <div className="h-9 w-9 overflow-hidden rounded-md border border-slate-200 bg-slate-100">
              <img src={profileImg} alt="Sadik Hasan" className="h-full w-full object-cover" />
            </div>
          </div>

          <button
            type="button"
            className="inline-flex md:hidden h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <PiXBold className="h-5 w-5" /> : <PiListBold className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen ? (
        <div id="mobile-menu" className="md:hidden border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
            <div className="mb-4 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5">
              <div className="h-10 w-10 overflow-hidden rounded-xl border border-slate-200 bg-white">
                <img src={profileImg} alt="Sadik Hasan" className="h-full w-full object-cover" />
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-slate-900">Sadik Hasan</div>
                <div className="text-xs text-slate-600">{formatNavbarDate(new Date())}</div>
              </div>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-slate-400" aria-hidden="true">
                  <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Anything..."
                className="block h-10 w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              />
            </div>

            <nav className="mt-4 grid gap-1 text-sm">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    [
                      'rounded-xl px-3 py-2 font-medium text-slate-700 hover:bg-slate-50',
                      isActive ? 'bg-indigo-50 text-indigo-700' : '',
                    ].join(' ')
                  }
                  end={item.to === '/'}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  )
}
