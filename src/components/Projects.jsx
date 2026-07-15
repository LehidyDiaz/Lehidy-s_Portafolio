import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { useApp } from '../context/AppContext'
import ProjectGalleryModal from './ProjectGalleryModal'
import SectionAtmosphere from './SectionAtmosphere'

const categories = [
  { key: 'all', icon: '⊞' },
  { key: 'university', icon: '⌘' },
  { key: 'powerbi', icon: '▤' },
  { key: 'websystems', icon: '◈' },
  { key: 'databases', icon: '◉' },
  { key: 'other', icon: '◇' },
]

const projects = [
  {
    id: 9,
    title: 'Debian',
    desc: { es: 'Proyecto desarrollado y documentado en Debian.', en: 'Project developed and documented in Debian.' },
    tags: ['Debian', 'Linux', 'Documentación'],
    image: '/resource/img/debian.jpeg',
    galleryImages: ['/resource/img/debian.jpeg', '/resource/img/debian2.jpeg', '/resource/img/debian1.jpeg', '/resource/img/debian3.jpeg'],
    projectUrl: 'https://drive.google.com/drive/folders/1boa3U9ohOFShDYZNtnGgrjcAun8O6YJU?usp=drive_link',
    documentationUrl: '/debiandoc.pdf',
    viewDocumentation: true,
    category: 'other',
    featured: false,
    features: ['Configuración en Debian', 'Implementación del proyecto', 'Documentación técnica'],
  },
  {
    id: 2,
    title: 'Proyecto final - Dashboard siniestros',
    desc: { es: 'Dashboard de análisis y seguimiento de incidentes.', en: 'Dashboard for incident analysis and tracking.' },
    tags: ['Power BI', 'Dashboard', 'Análisis de datos'],
    image: '/resource/img/parcial.jpg',
    galleryImages: ['/resource/img/parcial.jpg', '/resource/img/parcial1.jpg', '/resource/img/parcial2.jpg'],
    downloadUrl: '/Parcialdash.pbix',
    documentationUrl: '/documentacion.pdf',
    category: 'university',
    featured: false,
    features: ['Seguimiento de incidentes', 'Indicadores visuales', 'Filtros dinámicos', 'Análisis de datos'],
  },
  {
    id: 8,
    title: 'Dashboard con Lovable',
    desc: { es: 'Dashboard interactivo desarrollado en código con Lovable.', en: 'Interactive dashboard developed in code with Lovable.' },
    tags: ['Lovable', 'Dashboard', 'Excel'],
    image: '/resource/img/inicio.png',
    galleryImages: ['/resource/img/inicio.png', '/resource/img/lov1.jpeg', '/resource/img/lov2.png', '/resource/img/lov3.png'],
    projectUrl: 'https://lovable.dev/preview/wBXEkyRLgb7SNHBRleqCwRxHZMsMRyto',
    fileUrl: '/lovable.xlsx',
    fileName: 'lovable.xlsx',
    fileLabel: { es: 'Ver archivo Excel', en: 'View Excel file' },
    fileNote: {
      es: 'Como el archivo inicial está hecho en código, no hay forma de descargarlo. Por eso, también se generó un archivo Excel con las mismas funciones.',
      en: 'Since the original file was built in code, it cannot be downloaded. An Excel file with the same functions was also created.',
    },
    category: 'other',
    featured: false,
    features: ['Dashboard interactivo', 'Filtros dinámicos', 'Visualización de datos', 'Versión en Excel'],
  },
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
  },{
    id: 5,
    title: 'Financial System Dashboard',
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
    id: 6,
    title: 'Web System for the Management of Services in a Hostel and Restaurant',
    desc: { es: 'Sistema web para administrar los servicios de un hostal y restaurante.', en: 'Web system for managing hostel and restaurant services.' },
    tags: ['Sistema web', 'Gestión', 'Servicios'],
    image: '/resource/img/hostal1.png',
    galleryImages: ['/resource/img/hostal1.png', '/resource/img/hostal.png'],
    githubUrl: '#',
    category: 'websystems',
    featured: false,
    features: ['Gestión de hospedaje', 'Servicios de restaurante', 'Control de reservas', 'Administración de clientes'],
  },
  {
    id: 7,
    title: 'Sales Dashboard',
    desc: { es: 'Dashboard de ventas con indicadores clave.', en: 'Sales dashboard with key indicators.' },
    tags: ['Power BI', 'Dashboard', 'Ventas'],
    image: '/resource/img/ventas.png',
    galleryImages: ['/resource/img/ventas.png'],
    downloadUrl: '#',
    category: 'powerbi',
    featured: false,
    features: ['Indicadores de ventas', 'Gráficos interactivos', 'Filtros dinámicos', 'Análisis de tendencias'],
  },
]

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [trackIndex, setTrackIndex] = useState(projects.length)
  const [trackTransitionEnabled, setTrackTransitionEnabled] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [galleryProject, setGalleryProject] = useState(null)
  const [slidesPerView, setSlidesPerView] = useState(3)
  const [viewportWidth, setViewportWidth] = useState(0)
  const { t, lang } = useApp()
  const carouselRef = useRef(null)
  const touchStartRef = useRef(null)
  const isTransitioningRef = useRef(false)

  useEffect(() => {
    const updateSlidesPerView = () => {
      const width = window.innerWidth
      setViewportWidth(width)
      setSlidesPerView(width < 768 ? 1 : width < 1024 ? 2 : 3)
    }

    updateSlidesPerView()
    window.addEventListener('resize', updateSlidesPerView, { passive: true })
    return () => window.removeEventListener('resize', updateSlidesPerView)
  }, [])

  const filtered = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory)

  const isMobile = slidesPerView === 1
  const visibleCount = Math.min(filtered.length, slidesPerView)

  const displayItems = filtered.length > 1 ? [...filtered, ...filtered, ...filtered] : filtered
  const highlightIndex = trackIndex + (visibleCount >= 3 ? 1 : 0)

  const handleTouchStart = (event) => {
    if (!isMobile) return
    const touch = event.touches[0]
    touchStartRef.current = { x: touch.clientX, y: touch.clientY }
  }

  const handleTouchEnd = (event) => {
    if (!isMobile || !touchStartRef.current) return
    const touch = event.changedTouches[0]
    const deltaX = touch.clientX - touchStartRef.current.x
    const deltaY = touch.clientY - touchStartRef.current.y
    touchStartRef.current = null

    if (Math.abs(deltaX) < 42 || Math.abs(deltaX) <= Math.abs(deltaY)) return
    if (deltaX < 0) nextSlide()
    else prevSlide()
  }

  const selectCategory = (key) => {
    const nextProjects = key === 'all' ? projects : projects.filter((project) => project.category === key)
    isTransitioningRef.current = false
    setTrackTransitionEnabled(false)
    setIsTransitioning(false)
    setActiveCategory(key)
    setCurrentIndex(0)
    setTrackIndex(nextProjects.length > 1 ? nextProjects.length : 0)
    requestAnimationFrame(() => requestAnimationFrame(() => setTrackTransitionEnabled(true)))
  }

  const prevSlide = () => {
    if (isTransitioningRef.current || filtered.length <= 1) return
    isTransitioningRef.current = true
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev === 0 ? filtered.length - 1 : prev - 1))
    setTrackIndex((prev) => prev - 1)
  }

  const nextSlide = () => {
    if (isTransitioningRef.current || filtered.length <= 1) return
    isTransitioningRef.current = true
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev >= filtered.length - 1 ? 0 : prev + 1))
    setTrackIndex((prev) => prev + 1)
  }

  const goToSlide = (targetIndex) => {
    if (isTransitioningRef.current || targetIndex === currentIndex) return

    let distance = targetIndex - currentIndex
    if (Math.abs(distance) > filtered.length / 2) {
      distance += distance > 0 ? -filtered.length : filtered.length
    }

    isTransitioningRef.current = true
    setIsTransitioning(true)
    setCurrentIndex(targetIndex)
    setTrackIndex((prev) => prev + distance)
  }

  const handleTrackTransitionEnd = (event) => {
    if (event.target !== event.currentTarget || event.propertyName !== 'transform' || filtered.length <= 1) return

    let normalizedIndex = trackIndex
    if (trackIndex < filtered.length) normalizedIndex += filtered.length
    if (trackIndex >= filtered.length * 2) normalizedIndex -= filtered.length
    if (normalizedIndex === trackIndex) {
      isTransitioningRef.current = false
      setIsTransitioning(false)
      return
    }

    flushSync(() => {
      setTrackTransitionEnabled(false)
      setTrackIndex(normalizedIndex)
    })

    // Commit the identical cloned position before transitions are enabled again.
    void event.currentTarget.offsetWidth
    requestAnimationFrame(() => {
      setTrackTransitionEnabled(true)
      setIsTransitioning(false)
      isTransitioningRef.current = false
    })
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
      <SectionAtmosphere variant="projects" />
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

        <div className="project-filters flex flex-wrap justify-center gap-2.5 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => selectCategory(cat.key)}
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
            <div
              ref={carouselRef}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className={`project-carousel-viewport px-1 py-8 md:px-8 ${isMobile ? 'is-mobile' : ''}`}
            >
              <div
                className="project-carousel-track flex items-center gap-8 transition-transform duration-500 ease-out"
                onTransitionEnd={handleTrackTransitionEnd}
                style={isMobile
                  ? {
                      '--project-mobile-offset': `${-trackIndex * (Math.min(viewportWidth * .9, 360) + 12)}px`,
                      ...(trackTransitionEnabled ? {} : { transition: 'none' }),
                    }
                  : {
                      transform: `translateX(calc(-${trackIndex * (100 / visibleCount)}% - ${trackIndex * (32 / visibleCount)}px))`,
                      ...(trackTransitionEnabled ? {} : { transition: 'none' }),
                    }}
              >
                {displayItems.map((project, i) => (
                  <div
                    key={`${project.id}-${i}`}
                    data-slide-index={i}
                    className={`project-slide min-w-0 flex-shrink-0 ${i === highlightIndex ? 'project-slide-active' : ''}`}
                    style={isMobile ? undefined : { flex: `0 0 calc(${100 / visibleCount}% - ${(visibleCount - 1) * 32 / visibleCount}px)` }}
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
                            href={project.downloadUrl || project.projectUrl || (project.githubUrl && project.githubUrl !== '#' ? project.githubUrl : project.image)}
                            target={project.downloadUrl ? undefined : '_blank'}
                            rel={project.downloadUrl ? undefined : 'noopener noreferrer'}
                            download={project.downloadUrl ? 'Parcialdash.pbix' : undefined}
                          className="flex-1 px-3 py-2.5 text-center text-xs font-medium border border-gold/55 text-gold rounded-lg hover:bg-gold/12 transition-all duration-300 shadow-[inset_0_1px_rgba(255,255,255,.05)]"
                          >
                            {project.downloadUrl ? 'Descargar proyecto' : project.id === 9 ? 'Ver producto' : t('projectViewProject')}
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
                  disabled={isTransitioning}
                  className="project-arrow project-arrow-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-5 w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-blue-night border border-blue-200 dark:border-blue-navy text-blue-600 dark:text-gold hover:bg-blue-50 dark:hover:bg-blue-navy/70 transition-all shadow-md hover:shadow-lg z-10"
                  aria-label="Previous"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  disabled={isTransitioning}
                  className="project-arrow project-arrow-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-5 w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-blue-night border border-blue-200 dark:border-blue-navy text-blue-600 dark:text-gold hover:bg-blue-50 dark:hover:bg-blue-navy/70 transition-all shadow-md hover:shadow-lg z-10"
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
              onClick={() => goToSlide(i)}
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
