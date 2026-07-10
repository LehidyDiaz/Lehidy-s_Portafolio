import { useApp } from '../context/AppContext'

export default function Hero() {
  const { t } = useApp()

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-surface-light via-surface-light to-gold/10 dark:from-blue-deep dark:via-blue-night dark:to-blue-deep pt-16 relative overflow-hidden section-stars">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-[15%] text-sm float-slow opacity-30 dark:opacity-40 animate-float-slow">✦</div>
        <div className="absolute bottom-1/3 left-[10%] text-xs float-slow opacity-25 dark:opacity-35 animate-float-slow" style={{ animationDelay: '2s' }}>✦</div>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16 relative">
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 dark:bg-gold/10 border border-gold/30 dark:border-gold/30 mb-4">
            <svg className="w-3.5 h-3.5 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-xs font-cinzel tracking-[0.25em] text-gold uppercase">Web Developer</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 font-cinzel leading-tight">
            {t('heroTitulo')}{' '}
            <span className="text-gold">{t('heroNombre')}</span>
          </h1>
          <div className="flex items-center justify-center gap-4 mb-3 text-gold/30">
            <div className="h-px flex-1 max-w-[220px] bg-gold/30" />
            <span className="text-sm tracking-[0.3em]">✦ ✦ ✦</span>
            <div className="h-px flex-1 max-w-[220px] bg-gold/30" />
          </div>
          <p className="text-lg md:text-xl text-gray-600 dark:text-blue-200/70 max-w-xl mb-2 leading-relaxed">
            {t('heroDesc')}
          </p>
          <p className="text-xs italic text-gold/50 mb-8 font-cinzel tracking-wide">
            "I solemnly swear that I am up to no good"
          </p>
          <div className="flex gap-4 justify-center md:justify-start">
            <a
              href="#projects"
              onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="px-6 py-3 bg-gold hover:bg-gold-light text-blue-deep rounded-lg transition-all duration-300 shadow-lg shadow-gold/20 font-cinzel tracking-wide text-sm hover:shadow-xl hover:-translate-y-0.5"
            >
              {t('heroBtnProyectos')}
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="px-6 py-3 border border-gold/40 dark:border-gold/30 text-gold rounded-lg hover:bg-gold/10 dark:hover:bg-gold/10 transition-all duration-300 text-sm hover:-translate-y-0.5"
            >
              {t('heroBtnContacto')}
            </a>
          </div>
        </div>

        <div className="flex-shrink-0 relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold to-gold-light blur-xl opacity-20" />
          <div className="hero-portrait relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-2 border-gold/55 shadow-xl shadow-gold/20">
            <img
              src="/resource/img/profile.jpeg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gold rounded-full flex items-center justify-center text-lg shadow-lg animate-bounce" style={{ animationDuration: '3s' }}>
            ✦
          </div>
        </div>
      </div>
    </section>
  )
}
