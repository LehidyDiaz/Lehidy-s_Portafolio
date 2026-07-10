const ornaments = {
  hero: <><path d="m7 19 10-14 2 2L9 21l-2-2Z"/><path d="m5 7 1-3M3 5h4M18 14l1-3M16 12h4"/></>,
  about: <><path d="M7 5c4 0 5 3 5 7 0-4 1-7 5-7v12c-4 0-5 1-5 3 0-2-1-3-5-3V5Z"/><path d="M12 12v8"/></>,
  projects: <><ellipse cx="12" cy="12" rx="9" ry="4"/><ellipse cx="12" cy="12" rx="4" ry="9" transform="rotate(36 12 12)"/><circle cx="12" cy="12" r="1.5"/></>,
  achievements: <><circle cx="12" cy="12" r="3"/><path d="M9 11C5 7 2 8 1 11c3-1 5 0 8 3M15 11c4-4 7-3 8 0-3-1-5 0-8 3"/><path d="M10 15h4"/></>,
  skills: <><path d="M4 18 9 6l3 12 3-9 5 9"/><circle cx="4" cy="18" r="1"/><circle cx="9" cy="6" r="1"/><circle cx="12" cy="18" r="1"/><circle cx="15" cy="9" r="1"/><circle cx="20" cy="18" r="1"/></>,
  contact: <><path d="M3 7h18v11H3z"/><path d="m3 8 9 6 9-6M16 4c2 0 3-1 3-2"/></>,
  footer: <><path d="M4 12c4-5 12-5 16 0-4 5-12 5-16 0Z"/><circle cx="12" cy="12" r="2"/></>,
}

export default function SectionAtmosphere({ variant }) {
  return (
    <div className={`section-atmosphere atmosphere-${variant}`} aria-hidden="true">
      <svg className="section-constellation section-constellation-a" viewBox="0 0 260 170">
        <path d="M18 128 C48 104 57 59 91 66 S132 124 165 90 S204 35 242 52" />
        <circle cx="18" cy="128" r="3"/><circle cx="54" cy="92" r="2"/><circle cx="91" cy="66" r="3"/><circle cx="130" cy="105" r="2.5"/><circle cx="165" cy="90" r="3"/><circle cx="205" cy="49" r="2"/><circle cx="242" cy="52" r="3"/>
      </svg>
      <svg className="section-constellation section-constellation-b" viewBox="0 0 220 150">
        <path d="M17 34 C52 53 60 102 99 91 S141 41 174 58 S194 104 211 122" />
        <circle cx="17" cy="34" r="2.5"/><circle cx="56" cy="65" r="2"/><circle cx="99" cy="91" r="3"/><circle cx="139" cy="49" r="2.5"/><circle cx="174" cy="58" r="3"/><circle cx="195" cy="98" r="2"/><circle cx="211" cy="122" r="2.5"/>
      </svg>
      <div className="section-magic-mark">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">{ornaments[variant]}</svg>
      </div>
      <span className="section-spark section-spark-one">✦</span>
      <span className="section-spark section-spark-two">✦</span>
      <span className="section-spark section-spark-three">·</span>
    </div>
  )
}
