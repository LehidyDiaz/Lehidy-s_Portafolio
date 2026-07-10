import { useState, useRef } from 'react'
import { useApp } from '../context/AppContext'
import ProjectGalleryModal from './ProjectGalleryModal'

const categories = [
  { key: 'all', icon: '⊞' },
  { key: 'university', icon: '⌘' },
  { key: 'powerbi', icon: '▤' },
  { key: 'websystems', icon: '◈' },
  { key: 'databases', icon: '◉' },
  { key: 'webpages', icon: '◎' },
  { key: 'other', icon: '◇' },
]

const projects = [
  {
    id: 1,
    title: 'Gym Web System',
    desc: { es: 'Plataforma de compras con carrito, pagos y panel admin.', en: 'Shopping platform with cart, payments, and admin panel.' },
    tags: ['React', 'Node.js', 'MySQL'],
    image: '/resource/img/academico-ra.png',
    galleryImages: ['/resource/img/academico-ra.png', '/resource/img/body.jpeg'],
    githubUrl: 'https://github.com/LehidyDiaz/gimnasio---Body',
    category: 'websystems',
    featured: true,
    features: ['Carrito de compras', 'Pasarela de pagos', 'Panel administrativo', 'Gestión de usuarios'],
  },
  {
    id: 2,
    title: 'Dashboard Analytics',
    desc: { es: 'Panel de análisis con gráficos interactivos.', en: 'Analytics dashboard with interactive charts.' },
    tags: ['Power BI', 'SQL', 'Excel'],
    image: '/resource/img/dashb.png',
    galleryImages: ['/resource/img/dashb.png', '/resource/img/dash2.jpeg'],
    githubUrl: '#',
    category: 'powerbi',
    featured: false,
    features: ['Gráficos interactivos', 'Filtros dinámicos', 'Exportación de datos', 'Métricas en tiempo real'],
  },
  {
    id: 3,
    title: 'Database Design',
    desc: { es: 'Diseño de base de datos para sistema de gestión.', en: 'Database design for management system.' },
    tags: ['SQL', 'MySQL', 'Modelado'],
    image: '/resource/img/db.png',
    galleryImages: ['/resource/img/db.png'],
    githubUrl: '#',
    category: 'databases',
    featured: false,
    features: ['Modelo relacional', 'Optimización de queries', 'Procedimientos almacenados', 'Diagramas ER'],
  },
  {
    id: 4,
    title: 'Referral System - EsSalud',
    desc: { es: 'Sistema de referidos para el proyecto EsSalud.', en: 'Referral system for the EsSalud project.' },
    tags: ['SQL', 'MySQL', 'PhpMyAdmin'],
    image: '/resource/img/image.png',
    galleryImages: ['/resource/img/image.png', '/resource/img/image (1).png', '/resource/img/image (2).png', '/resource/img/image (3).png'],
    githubUrl: 'https://github.com/LehidyDiaz/referencias_essalud',
    category: 'university',
    featured: false,
    features: ['Registro de referencias', 'Búsqueda avanzada', 'Reportes PDF', 'Roles de usuario'],
  },
]

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [galleryProject, setGalleryProject] = useState(null)
  const { t, lang } = useApp()
  const carouselRef = useRef(null)

  const filtered = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory)

  const visibleCount = Math.min(filtered.length, 3)

  const displayItems = [...filtered, ...filtered.slice(0, visibleCount)]
  const maxIndex = filtered.length - 1
  const highlightIndex = visibleCount <= 2 ? currentIndex : currentIndex + 1

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1))
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const openGallery = (project) => {
    setGalleryProject(project)
    setGalleryOpen(true)
  }

  const getCategoryLabel = (key) => {
    const map = {
      all: t('projectFilterAll'),
      university: t('projectFilterUniversity'),
      powerbi: t('projectFilterPowerBI'),
      websystems: t('projectFilterWebSystems'),
      databases: t('projectFilterDatabases'),
      webpages: t('projectFilterWebPages'),
      other: t('projectFilterOther'),
    }
    return map[key] || key
  }

  return (
    <section id="projects" className="py-20 px-4 bg-gray-50 dark:bg-[#060A18] transition-colors relative overflow-hidden section-stars">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-gold to-blue-600" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="hidden md:block absolute top-20 left-10 w-56 h-56 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-[15%] text-lg float-slow opacity-20 dark:opacity-30 animate-float-slow">✦</div>
      </div>

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-3 px-4 py-1 text-xs font-cinzel tracking-[.24em] text-gold">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/70" />✦ PORTFOLIO ✦<span className="h-px w-12 bg-gradient-to-l from-transparent to-gold/70" />
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-3 font-cinzel tracking-wide">
          {t('projectsTitulo')}
        </h2>
        <p className="text-center text-gray-500 dark:text-blue-200/60 max-w-2xl mx-auto mb-8 text-sm">
          {t('projectsSub')}
        </p>

        <div className="flex flex-wrap justify-center gap-2.5 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => { setActiveCategory(cat.key); setCurrentIndex(0) }}
              className={`project-filter flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeCategory === cat.key
                  ? 'project-filter-active bg-gold/10 text-gold border-gold/80 shadow-md shadow-gold/20'
                  : 'bg-white/65 text-gray-600 dark:bg-[#07101e]/75 dark:text-blue-100/70 border-blue-200/70 dark:border-blue-400/20 hover:border-gold/55 hover:text-gold'
              }`}
            >
              <span className="text-xs">{cat.icon}</span>
              {getCategoryLabel(cat.key)}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 dark:text-blue-200/40 py-12 font-cinzel italic">
            ✦ No projects in this category yet ✦
          </p>
        ) : (
          <div className="relative project-carousel-shell">
            <div ref={carouselRef} className="overflow-hidden px-1 py-8 md:px-8">
              <div
                className="flex items-center transition-transform duration-500 ease-out gap-4"
                style={{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }}
              >
                {displayItems.map((project, i) => (
                  <div
                    key={`${project.id}-${i}`}
                    className={`project-slide min-w-0 flex-shrink-0 ${i === highlightIndex ? 'project-slide-active' : ''}`}
                    style={{ flex: `0 0 calc(${100 / visibleCount}% - ${(visibleCount - 1) * 16 / visibleCount}px)` }}
                  >
                    <div
                      className={`project-card group relative bg-white/95 dark:bg-[#07101f]/95 rounded-2xl overflow-hidden border transition-all duration-500 hover:shadow-xl ${
                        i === highlightIndex
                          ? 'project-card-active border-gold/80 dark:border-gold/75 shadow-xl shadow-gold/20'
                          : 'border-blue-200/50 dark:border-blue-navy/50 shadow-md opacity-70'
                      }`}
                    >
                      {i === highlightIndex && (
                        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 px-3 py-1 text-[10px] font-cinzel tracking-[0.16em] bg-blue-deep/90 text-gold border border-gold/50 rounded-full shadow-md">
                          ✦ {t('projectFeatured')}
                        </div>
                      )}

                      <div className="h-48 md:h-56 bg-blue-50 dark:bg-blue-navy/30 overflow-hidden relative">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      <div className="p-5">
                        <div className="text-[10px] font-cinzel tracking-wider text-gold mb-1 uppercase">
                          {getCategoryLabel(project.category)}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1.5 font-cinzel">
                          {project.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-blue-200/60 mb-3 line-clamp-2">
                          {project.desc[lang]}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 text-[10px] font-medium bg-blue-100 dark:bg-blue-navy/60 text-blue-700 dark:text-blue-300 rounded-md"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex gap-2">
                          <a
                            href={project.githubUrl && project.githubUrl !== '#' ? project.githubUrl : project.image}
                            target="_blank"
                            rel="noopener noreferrer"
                          className="flex-1 px-3 py-2.5 text-center text-xs font-medium border border-gold/55 text-gold rounded-lg hover:bg-gold/12 transition-all duration-300 shadow-[inset_0_1px_rgba(255,255,255,.05)]"
                          >
                            {t('projectViewProject')}
                          </a>
                          <button
                            onClick={() => openGallery(project)}
                            className="flex-1 px-3 py-2.5 text-xs font-medium bg-gradient-to-r from-blue-700 to-blue-navy hover:from-blue-600 hover:to-blue-700 text-white rounded-lg border border-blue-400/25 transition-all duration-300 shadow-[0_8px_22px_rgba(25,82,190,.24)]"
                          >
                            {t('projectViewGallery')}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {filtered.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-5 w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-blue-night border border-blue-200 dark:border-blue-navy text-blue-600 dark:text-gold hover:bg-blue-50 dark:hover:bg-blue-navy/70 transition-all shadow-md hover:shadow-lg z-10"
                  aria-label="Previous"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-5 w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-blue-night border border-blue-200 dark:border-blue-navy text-blue-600 dark:text-gold hover:bg-blue-50 dark:hover:bg-blue-navy/70 transition-all shadow-md hover:shadow-lg z-10"
                  aria-label="Next"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>
        )}

        <div className="flex justify-center gap-2 mt-6">
          {filtered.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? 'bg-gold w-6 shadow-sm shadow-gold/50'
                  : 'bg-blue-300 dark:bg-blue-navy/60 hover:bg-gold/50'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        <p className="text-center text-xs italic text-gold/50 mt-8 font-cinzel tracking-wide">
          "Wit beyond measure is man's greatest treasure"
        </p>
      </div>

      {galleryOpen && galleryProject && (
        <ProjectGalleryModal
          project={galleryProject}
          lang={lang}
          onClose={() => setGalleryOpen(false)}
        />
      )}
    </section>
  )
}
