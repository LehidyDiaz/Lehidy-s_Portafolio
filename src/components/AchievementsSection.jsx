import { useState } from 'react'
import { useApp } from '../context/AppContext'
import SectionAtmosphere from './SectionAtmosphere'

const microsoftProfileUrl = 'https://learn.microsoft.com/es-es/users/diazmunaycolehidypamela-7971/achievements'

const achievements = [
  {
    id: 1,
    title: 'Introducción al análisis de datos de Microsoft',
    description: {
      es: 'Logro oficial de Microsoft Learn sobre los fundamentos del análisis de datos de Microsoft.',
      en: 'Official Microsoft Learn achievement covering the fundamentals of Microsoft data analysis.',
    },
    date: null,
    year: null,
    category: 'Power BI',
    type: 'Módulo completado',
    platform: 'Microsoft Learn',
    url: 'https://learn.microsoft.com/api/achievements/share/es-es/DiazMunaycoLehidyPamela-7971/H224C6V8?sharingId=48B90D91B7E1A7',
    featured: true,
    visible: true,
    image: 'https://learn.microsoft.com/training/achievements/overview-data-analysis-power-bi-social.png',
    imageAlt: 'Introducción al análisis de datos de Microsoft',
    badge: 'chart',
    tone: 'blue',
  },
  {
    id: 2,
    title: 'Descripción de las ventajas de usar servicios en la nube',
    date: null,
    year: null,
    category: 'Azure',
    type: 'Módulo completado',
    platform: 'Microsoft Learn',
    url: 'https://learn.microsoft.com/api/achievements/share/es-es/DiazMunaycoLehidyPamela-7971/ZJSGJ8W2?sharingId=48B90D91B7E1A7',
    featured: false,
    visible: true,
    image: 'https://learn.microsoft.com/training/achievements/describe-benefits-use-cloud-services-social.png',
    imageAlt: 'Descripción de las ventajas de usar servicios en la nube',
    badge: 'azure',
    tone: 'blue',
  },
  {
    id: 3,
    title: 'Descripción de la informática en la nube',
    date: null,
    year: null,
    category: 'Azure',
    type: 'Módulo completado',
    platform: 'Microsoft Learn',
    url: 'https://learn.microsoft.com/api/achievements/share/es-es/DiazMunaycoLehidyPamela-7971/XPKJK6XY?sharingId=48B90D91B7E1A7',
    featured: false,
    visible: true,
    image: 'https://learn.microsoft.com/training/achievements/describe-cloud-compute-social.png',
    imageAlt: 'Descripción de la informática en la nube',
    badge: 'azure',
    tone: 'blue',
  },
  {
    id: 4,
    title: 'Descripción del análisis de datos',
    date: null,
    year: null,
    category: 'Datos',
    type: 'Módulo completado',
    platform: 'Microsoft Learn',
    url: 'https://learn.microsoft.com/api/achievements/share/es-es/DiazMunaycoLehidyPamela-7971/WMVCSHRN?sharingId=48B90D91B7E1A7',
    featured: false,
    visible: true,
    image: 'https://learn.microsoft.com/training/achievements/data-analytics-and-microsoft-social.png',
    imageAlt: 'Descripción del análisis de datos',
    badge: 'data',
    tone: 'gold',
  },
  {
    id: 5,
    title: 'Crear informes interactivos con Copilot para Power BI',
    date: null,
    year: null,
    category: 'Power BI',
    type: 'Módulo completado',
    platform: 'Microsoft Learn',
    url: 'https://learn.microsoft.com/api/achievements/share/es-es/DiazMunaycoLehidyPamela-7971/EGGH2ZCP?sharingId=48B90D91B7E1A7',
    featured: false,
    visible: true,
    image: 'https://learn.microsoft.com/training/achievements/power-bi-module-social.png',
    imageAlt: 'Crear informes interactivos con Copilot para Power BI',
    badge: 'chart',
    tone: 'green',
  },
]

const categoryOptions = [
  { key: 'Todos', label: 'Todos', icon: 'star' },
  { key: 'Power BI', label: 'Power BI', icon: 'chart' },
  { key: 'Azure', label: 'Azure', icon: 'azure' },
  { key: 'Datos', label: 'Datos', icon: 'data' },
  { key: 'Inteligencia Artificial', label: 'IA', icon: 'ai' },
  { key: 'Desarrollo Web', label: 'Web', icon: 'web' },
  { key: 'Seguridad', label: 'Seguridad', icon: 'shield' },
  { key: 'Otros', label: 'Otros', icon: 'grid' },
]

const INITIAL_SECONDARY_COUNT = 2

function LineIcon({ type, className = 'h-5 w-5' }) {
  const paths = {
    star: <path d="m12 3 2.2 4.7 5.1.7-3.7 3.6.9 5.1-4.5-2.4-4.5 2.4.9-5.1-3.7-3.6 5.1-.7L12 3Z" />,
    trophy: <><path d="M8 4h8v4a4 4 0 0 1-8 0V4Z"/><path d="M8 6H5v1a3 3 0 0 0 3 3M16 6h3v1a3 3 0 0 1-3 3M12 12v4M9 20h6M10 16h4"/></>,
    medal: <><circle cx="12" cy="14" r="4"/><path d="m9 10-2-7h4l1 7 1-7h4l-2 7M10 14l1.2 1.2L14 12.5"/></>,
    route: <><circle cx="6" cy="6" r="2"/><circle cx="18" cy="18" r="2"/><path d="M8 6h4a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h7"/></>,
    verified: <><path d="m12 3 2 2.1 2.9-.2.6 2.8 2.5 1.5-1.2 2.7 1.2 2.7-2.5 1.5-.6 2.8-2.9-.2L12 21l-2-2.1-2.9.2-.6-2.8L4 14.8l1.2-2.7L4 9.4l2.5-1.5.6-2.8 2.9.2L12 3Z"/><path d="m9 12 2 2 4-4"/></>,
    chart: <><path d="M5 19V9M10 19V5M15 19v-7M20 19V7"/><path d="m4 14 6-5 5 2 5-5"/></>,
    azure: <path d="m12 3-7 14h5l2 4 7-4-4-1-3-13Zm0 5 2 7h-5l3-7Z" />,
    data: <><ellipse cx="12" cy="5" rx="7" ry="3"/><path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/></>,
    ai: <><path d="M9 4a3 3 0 0 0-3 3v1a3 3 0 0 0-1 5.8V16a3 3 0 0 0 4 2.8M15 4a3 3 0 0 1 3 3v1a3 3 0 0 1 1 5.8V16a3 3 0 0 1-4 2.8M9 4v16M15 4v16"/><path d="M9 8H6M15 8h3M9 14H6M15 14h3"/></>,
    web: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></>,
    shield: <><path d="M12 3 5 6v5c0 4.5 2.8 7.7 7 10 4.2-2.3 7-5.5 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></>,
    grid: <><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></>,
  }

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[type] || paths.star}
    </svg>
  )
}

function AchievementImage({ achievement, large = false }) {
  const [failed, setFailed] = useState(false)
  const toneClasses = {
    blue: 'achievement-image-blue text-blue-300',
    gold: 'achievement-image-gold text-gold-light',
    green: 'achievement-image-green text-green-emerald',
  }

  return (
    <div className={`achievement-image ${large ? 'achievement-image-large' : ''} ${achievement.image && !failed ? 'has-official-image' : ''} ${toneClasses[achievement.tone] || toneClasses.blue}`}>
      {achievement.image && !failed ? (
        <img src={achievement.image} alt={achievement.imageAlt || `Insignia de ${achievement.title}`} loading="lazy" onError={() => setFailed(true)} />
      ) : (
        <LineIcon type={achievement.badge} className={large ? 'h-16 w-16' : 'h-10 w-10'} />
      )}
    </div>
  )
}

function AchievementStats({ items }) {
  const total = items.length
  const badges = items.filter((item) => Boolean(item.url)).length
  const paths = items.filter((item) => item.type === 'Ruta completada').length
  const verified = items.filter((item) => Boolean(item.url)).length
  const stats = [
    { value: total, label: 'Logros obtenidos', note: '¡Sigue creciendo!', icon: 'trophy', tone: 'blue' },
    { value: badges, label: 'Insignias conseguidas', note: '¡Sigue aprendiendo!', icon: 'medal', tone: 'gold' },
    { value: paths, label: 'Rutas completadas', note: '¡Gran progreso!', icon: 'route', tone: 'green' },
    { value: verified, label: 'Credenciales verificables', note: 'Conocimiento certificado', icon: 'verified', tone: 'blue' },
  ]

  return (
    <div className="achievement-stats-grid">
      {stats.map((stat) => (
        <article className={`achievement-stat achievement-stat-${stat.tone}`} key={stat.label}>
          <span className="achievement-stat-icon"><LineIcon type={stat.icon} className="h-8 w-8" /></span>
          <span>
            <strong>{stat.value}</strong>
            <span className="achievement-stat-label">{stat.label}</span>
            <small>{stat.note}</small>
          </span>
        </article>
      ))}
    </div>
  )
}

function FeaturedAchievement({ achievement, lang }) {
  if (!achievement) return null

  return (
    <article className="featured-achievement">
      <span className="featured-corner featured-corner-top">✦</span>
      <span className="featured-corner featured-corner-bottom">✦</span>
      <div className="featured-label"><LineIcon type="star" className="h-4 w-4" /> LOGRO DESTACADO</div>
      <div className="featured-content">
        <AchievementImage achievement={achievement} large />
        <div className="featured-copy">
          <span className="achievement-type">{achievement.type}</span>
          <h3>{achievement.title}</h3>
          <p>{achievement.description?.[lang]}</p>
          <div className="featured-meta">
            <span><LineIcon type="verified" />{achievement.platform}</span>
            {achievement.date && <span><LineIcon type="calendar" />Obtenido en {achievement.date}</span>}
            <span><LineIcon type="star" />{achievement.category}</span>
          </div>
          <a className="featured-credential" href={achievement.url} target="_blank" rel="noopener noreferrer">
            Ver credencial
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </article>
  )
}

function AchievementCard({ achievement }) {
  return (
    <article className={`achievement-card achievement-card-${achievement.tone}`}>
      <span className="achievement-verified" title="Credencial verificable"><LineIcon type="verified" /></span>
      <AchievementImage achievement={achievement} />
      <span className="achievement-type">{achievement.type}</span>
      <h3>{achievement.title}</h3>
      <span className="achievement-category">{achievement.category}</span>
      {achievement.date && <time dateTime={String(achievement.year)}><LineIcon type="calendar" />{achievement.date}</time>}
      <a href={achievement.url} target="_blank" rel="noopener noreferrer">Ver logro <span aria-hidden="true">↗</span></a>
    </article>
  )
}

export default function AchievementsSection() {
  const { t, lang } = useApp()
  const [category, setCategory] = useState('Todos')
  const [year, setYear] = useState('Todos')
  const [expanded, setExpanded] = useState(false)

  const visibleAchievements = achievements.filter((achievement) => achievement.visible !== false)
  const years = [...new Set(visibleAchievements.map((achievement) => achievement.year).filter(Number.isInteger))].sort((a, b) => b - a)
  const filteredAchievements = visibleAchievements.filter((achievement) => {
    const matchesCategory = category === 'Todos' || achievement.category === category
    const matchesYear = year === 'Todos' || achievement.year === Number(year)
    return matchesCategory && matchesYear
  })
  const featured = filteredAchievements.find((achievement) => achievement.featured)
  const secondary = filteredAchievements.filter((achievement) => !achievement.featured)
  const shownSecondary = expanded ? secondary : secondary.slice(0, INITIAL_SECONDARY_COUNT)
  const canToggle = secondary.length > INITIAL_SECONDARY_COUNT

  const selectCategory = (nextCategory) => {
    setCategory(nextCategory)
    setExpanded(false)
  }

  const selectYear = (event) => {
    setYear(event.target.value)
    setExpanded(false)
  }

  return (
    <section id="achievements" className="achievements-section section-stars">
      <SectionAtmosphere variant="achievements" />
      <div className="achievement-constellation achievement-constellation-left" aria-hidden="true"><span /><span /><span /><span /></div>
      <div className="achievement-constellation achievement-constellation-right" aria-hidden="true"><span /><span /><span /><span /></div>

      <div className="achievements-container">
        <header className="achievements-header">
          <span className="microsoft-learn-badge"><LineIcon type="route" />{t('achievementsBadge')}</span>
          <div className="achievement-title-row"><span /> <b>✦</b> <h2>{t('achievementsTitulo')}</h2> <b>✦</b> <span /></div>
          <div className="snitch-divider" aria-hidden="true"><i /><strong>✦</strong><i /></div>
          <p>{t('achievementsSub')}</p>
        </header>

        <AchievementStats items={visibleAchievements} />

        <div className="achievement-filters">
          <div className="achievement-category-filters" role="group" aria-label="Filtrar logros por categoría">
            {categoryOptions.map((option) => (
              <button
                type="button"
                key={option.key}
                onClick={() => selectCategory(option.key)}
                className={category === option.key ? 'is-active' : ''}
                aria-pressed={category === option.key}
              >
                <LineIcon type={option.icon} />{option.label}
              </button>
            ))}
          </div>
          <label className="achievement-year-filter">
            <LineIcon type="calendar" />
            <span className="sr-only">Filtrar por año</span>
            <select value={year} onChange={selectYear}>
              <option value="Todos">Todos los años</option>
              {years.map((itemYear) => <option key={itemYear} value={itemYear}>{itemYear}</option>)}
            </select>
          </label>
        </div>

        {filteredAchievements.length ? (
          <div className={`achievement-constellation-grid ${featured ? '' : 'without-featured'}`}>
            {featured && <FeaturedAchievement achievement={featured} lang={lang} />}
            <div className="achievement-bento" aria-live="polite">
              {shownSecondary.map((achievement) => <AchievementCard achievement={achievement} key={achievement.id} />)}
            </div>
          </div>
        ) : (
          <div className="achievements-empty"><LineIcon type="star" /><p>No hay logros que coincidan con estos filtros.</p></div>
        )}

        {canToggle && (
          <button type="button" className="achievements-show-more" onClick={() => setExpanded((value) => !value)} aria-expanded={expanded}>
            {expanded ? 'Mostrar menos' : 'Explorar todos los logros'}
            <span aria-hidden="true">{expanded ? '↑' : '↓'}</span>
          </button>
        )}

        <div className="microsoft-learn-cta">
          <span className="cta-spark" aria-hidden="true">✦</span>
          <div><strong>¿Quieres ver todos mis logros y certificaciones?</strong><p>Explora mi perfil completo en Microsoft Learn y descubre más de mis aprendizajes.</p></div>
          <a href={microsoftProfileUrl} target="_blank" rel="noopener noreferrer">Ver todos mis logros en Microsoft Learn <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  )
}
