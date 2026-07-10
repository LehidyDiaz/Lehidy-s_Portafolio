import { useState } from 'react'
import { useApp } from '../context/AppContext'

const navLinks = [
  { key: 'navInicio', href: '#hero' },
  { key: 'navSobreMi', href: '#about' },
  { key: 'navProyectos', href: '#projects' },
  { key: 'navLogros', href: '#achievements' },
  { key: 'navHabilidades', href: '#skills' },
  { key: 'navContacto', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { t, toggleLang, lang, toggleDark, dark } = useApp()

  const scrollTo = (e, href) => {
    e.preventDefault()
    setOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="fixed top-0 left-0 w-full bg-surface-light/80 dark:bg-blue-deep/80 backdrop-blur-md z-50 border-b border-gold/20 dark:border-gold/10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#hero" onClick={(e) => scrollTo(e, '#hero')} className="text-lg font-cinzel font-bold text-gold dark:text-gold tracking-wider flex items-center gap-2">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="brand-name">Lehidy</span>
          <span className="hidden sm:inline text-[10px] font-normal tracking-[0.3em] text-gold/40 ml-1">PORTFOLIO</span>
        </a>

        <ul className="hidden md:flex gap-6 items-center">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={(e) => scrollTo(e, l.href)}
                className="text-gray-600 dark:text-blue-200/70 hover:text-gold dark:hover:text-gold transition-colors text-sm tracking-wide"
              >
                {t(l.key)}
              </a>
            </li>
          ))}
          <li>
            <button onClick={toggleLang} className="px-3 py-1 text-sm font-medium border border-gold/40 dark:border-blue-navy rounded-md text-gold dark:text-gold hover:bg-gold/10 dark:hover:bg-blue-navy/50 transition-colors">
              {lang === 'es' ? 'EN' : 'ES'}
            </button>
          </li>
          <li>
            <button onClick={toggleDark} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-gray-600 dark:text-blue-200/70 hover:bg-gold/10 dark:hover:bg-blue-navy/50 transition-colors text-xs font-cinzel tracking-wider" aria-label="Toggle dark mode">
              {dark ? (
                <><svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg><span>LUMOS</span></>
              ) : (
                <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg><span>NOX</span></>
              )}
            </button>
          </li>
        </ul>

        <div className="flex items-center gap-2 md:hidden">
          <button onClick={toggleLang} className="px-2 py-1 text-xs font-medium border border-gold/40 dark:border-blue-navy rounded text-gold dark:text-gold">
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
          <button onClick={toggleDark} className="flex items-center gap-1 p-2 text-gray-600 dark:text-blue-200/70 text-[10px] font-cinzel" aria-label="Toggle dark mode">
            {dark ? (
              <><svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg><span>LUMOS</span></>
            ) : (
              <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg><span>NOX</span></>
            )}
          </button>
          <button className="p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            <svg className="w-5 h-5 text-gray-700 dark:text-blue-200/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <ul className="md:hidden bg-surface-light dark:bg-blue-deep border-t border-gold/20 dark:border-blue-navy">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={(e) => scrollTo(e, l.href)}
                className="block px-4 py-3 text-gray-600 dark:text-blue-200/70 hover:text-gold dark:hover:text-gold hover:bg-gold/10 dark:hover:bg-blue-navy/50"
              >
                {t(l.key)}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}
