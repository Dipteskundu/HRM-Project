import { useState } from 'react'
import { NavLink } from 'react-router-dom'
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
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Pluto" className="h-7 w-auto" />
        </div>

        <nav className="hidden flex-1 items-center justify-center gap-6 text-sm md:flex">
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

        <div className="hidden max-w-[320px] flex-1 justify-center md:flex">
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

        <div className="ml-auto flex items-center gap-3">
          <div className="hidden text-right text-xs leading-tight text-slate-600 sm:block">
            <div className="font-semibold text-slate-900">Sadik Hasan</div>
            <div>{formatNavbarDate(new Date())}</div>
          </div>
          <div className="h-9 w-9 overflow-hidden rounded-md border border-slate-200 bg-slate-100">
            <img src={profileImg} alt="Sadik Hasan" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </header>
  )
}
