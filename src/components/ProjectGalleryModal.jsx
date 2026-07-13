import { useCallback, useEffect, useState } from 'react'

export default function ProjectGalleryModal({ project, lang, onClose }) {
  const [current, setCurrent] = useState(0)
  const [imageExpanded, setImageExpanded] = useState(false)
  const images = project.galleryImages || []

  const previous = useCallback(() => {
    setCurrent((index) => (index === 0 ? images.length - 1 : index - 1))
  }, [images.length])

  const next = useCallback(() => {
    setCurrent((index) => (index === images.length - 1 ? 0 : index + 1))
  }, [images.length])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (imageExpanded) setImageExpanded(false)
        else onClose()
      }
      if (event.key === 'ArrowLeft') previous()
      if (event.key === 'ArrowRight') next()
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [imageExpanded, next, onClose, previous])

  if (!images.length) return null

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-blue-deep/76 px-3 py-6 backdrop-blur-[5px]"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div className="gallery-panel relative my-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-gold/60 bg-[#040b18]/97 shadow-[0_35px_120px_rgba(0,0,0,.72),0_0_42px_rgba(217,178,95,.17),0_0_80px_rgba(34,96,210,.10)] animate-modal-in">
        <header className="relative px-14 pb-4 pt-7 text-center">
          <span className="mb-2 block text-[9px] font-semibold tracking-[.32em] text-blue-300/70">PRESENTACIÓN DEL PROYECTO</span>
          <h3 className="font-cinzel text-xl font-semibold text-gold drop-shadow-[0_0_12px_rgba(217,178,95,.25)] md:text-2xl">{project.title}</h3>
          <div className="mx-auto mt-3 flex max-w-sm items-center gap-3 text-gold/70">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/50" />
            <span>✦</span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/50" />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-gold/55 bg-blue-deep/80 text-gold transition hover:bg-gold hover:text-blue-deep"
            aria-label="Cerrar galería"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="gallery-stage relative mx-4 overflow-hidden rounded-xl border border-gold/35 bg-black/35 md:mx-7">
          <div className="flex h-[44vh] min-h-64 items-center justify-center md:h-[55vh]">
            <button
              type="button"
              onClick={() => setImageExpanded(true)}
              className="group/image relative h-full w-full cursor-zoom-in"
              aria-label={`Ampliar imagen ${current + 1} a pantalla completa`}
            >
              <img
                src={images[current]}
                alt={`${project.title}, imagen ${current + 1}`}
                className="h-full w-full object-contain p-3"
              />
              <span className="absolute bottom-3 right-3 flex items-center gap-2 rounded-full border border-gold/45 bg-blue-deep/80 px-3 py-2 text-xs text-gold opacity-80 backdrop-blur-sm transition group-hover/image:opacity-100">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8 3H3v5m13-5h5v5M8 21H3v-5m18 0v5h-5" />
                </svg>
                Ampliar
              </span>
            </button>
          </div>

          {images.length > 1 && (
            <>
              <button type="button" onClick={previous} className="gallery-arrow left-3" aria-label="Imagen anterior">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button type="button" onClick={next} className="gallery-arrow right-3" aria-label="Imagen siguiente">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </button>
            </>
          )}
        </div>

        <div className="px-4 pb-6 pt-3 md:px-7">
          <p className="mb-3 text-center font-cinzel text-base tracking-[.16em] text-gold-light drop-shadow-[0_0_8px_rgba(217,178,95,.25)]">{current + 1} / {images.length}</p>
          <div className="flex justify-center gap-3 overflow-x-auto pb-1">
            {images.map((image, index) => (
              <button
                type="button"
                key={image}
                onClick={() => setCurrent(index)}
                className={`h-14 w-24 flex-none overflow-hidden rounded-lg border-2 bg-blue-night p-1 transition ${index === current ? 'border-gold shadow-[0_0_14px_rgba(217,178,95,.35)]' : 'border-blue-navy opacity-55 hover:opacity-100'}`}
                aria-label={`Ver imagen ${index + 1}`}
              >
                <img src={image} alt="" className="h-full w-full rounded object-cover" />
              </button>
            ))}
          </div>
          {project.documentationUrl && (
            <div className="mt-5 flex justify-center">
              <a
                href={project.documentationUrl}
                download="documentacion.pdf"
                className="rounded-lg border border-gold/60 bg-gold/10 px-5 py-2.5 text-sm font-medium text-gold transition hover:bg-gold hover:text-blue-deep"
              >
                Descargar documentación
              </a>
            </div>
          )}
          {project.fileUrl && (
            <div className="mx-auto mt-5 max-w-2xl text-center">
              {project.fileNote && (
                <p className="mb-4 text-sm leading-relaxed text-blue-100/70">
                  {project.fileNote[lang]}
                </p>
              )}
              <a
                href={project.fileUrl}
                download={project.fileName}
                className="inline-flex rounded-lg border border-gold/60 bg-gold/10 px-5 py-2.5 text-sm font-medium text-gold transition hover:bg-gold hover:text-blue-deep"
              >
                {project.fileLabel[lang]}
              </a>
            </div>
          )}
        </div>
      </div>

      {imageExpanded && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 p-2 backdrop-blur-sm md:p-6"
          onMouseDown={(event) => event.target === event.currentTarget && setImageExpanded(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`Imagen ampliada de ${project.title}`}
        >
          <img
            src={images[current]}
            alt={`${project.title}, imagen ${current + 1} ampliada`}
            className="max-h-full max-w-full object-contain"
          />

          <button
            type="button"
            onClick={() => setImageExpanded(false)}
            className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full border border-gold/60 bg-blue-deep/90 text-gold transition hover:bg-gold hover:text-blue-deep md:right-6 md:top-6"
            aria-label="Cerrar imagen ampliada"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {images.length > 1 && (
            <>
              <button type="button" onClick={previous} className="gallery-arrow left-3 md:left-6" aria-label="Imagen anterior">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button type="button" onClick={next} className="gallery-arrow right-3 md:right-6" aria-label="Imagen siguiente">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </button>
            </>
          )}

          <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/65 px-3 py-1.5 font-cinzel text-sm text-gold md:bottom-6">
            {current + 1} / {images.length}
          </span>
        </div>
      )}
    </div>
  )
}
