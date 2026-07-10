import { useApp } from '../context/AppContext'

const quickData = [
  { labelEs: 'Análisis de datos', labelEn: 'Data Analysis', icon: '📊' },
  { labelEs: 'Desarrollo web', labelEn: 'Web Development', icon: '🌐' },
  { labelEs: 'Dashboards', labelEn: 'Dashboards', icon: '📈' },
  { labelEs: 'Bases de datos', labelEn: 'Databases', icon: '🗄️' },
  { labelEs: 'Automatización', labelEn: 'Automation', icon: '⚡' },
  { labelEs: 'Diseño de interfaces', labelEn: 'UI Design', icon: '🎨' },
]

export default function About() {
  const { t, lang } = useApp()

  return (
    <section id="about" className="py-20 px-4 bg-white dark:bg-blue-night transition-colors relative overflow-hidden section-stars">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-emerald via-gold to-green-emerald" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="hidden md:block absolute top-10 right-10 w-48 h-48 bg-green-emerald/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-[10%] text-lg float-slow opacity-20 dark:opacity-30 animate-float-slow">✦</div>
      </div>

      <div className="max-w-4xl mx-auto relative">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12 font-cinzel tracking-wide">
          <span className="text-green-emerald">&lt;</span> {t('aboutTitulo')} <span className="text-green-emerald">/&gt;</span>
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-10 mb-10">
          <div className="relative w-48 h-48 flex-shrink-0">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-emerald to-green-soft blur-md opacity-20" />
            <div className="premium-surface relative w-full h-full rounded-full overflow-hidden border-2 border-green-emerald/45 shadow-lg">
              <img
                src="/resource/img/cod.jpeg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="text-gray-600 dark:text-blue-200/70 text-lg leading-relaxed">
            <p className="mb-4">{t('aboutP1')}</p>
            <p>{t('aboutP2')}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
          {quickData.map((item) => (
            <div
              key={item.labelEs}
              className="premium-surface group flex items-center gap-3 px-3 py-2.5 rounded-xl bg-green-emerald/5 dark:bg-[#08172a]/85 border border-green-emerald/25 dark:border-green-emerald/25 hover:border-green-emerald/55 transition-all duration-300"
            >
              <span className="text-lg group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
              <span className="text-xs font-medium text-gray-700 dark:text-blue-200/70">
                {lang === 'es' ? item.labelEs : item.labelEn}
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-green-emerald hover:bg-green-soft text-white rounded-lg transition-all duration-300 shadow-lg shadow-green-emerald/20 font-cinzel tracking-wide text-sm hover:shadow-xl hover:-translate-y-0.5"
          >
            {lang === 'es' ? 'Ver CV' : 'View CV'}
          </a>
          <a
            href="/cv.pdf"
            download
            className="px-6 py-3 border border-green-emerald/40 dark:border-green-emerald/30 text-green-emerald rounded-lg hover:bg-green-emerald/10 transition-all duration-300 font-cinzel tracking-wide text-sm hover:-translate-y-0.5"
          >
            {lang === 'es' ? 'Descargar CV' : 'Download CV'}
          </a>
        </div>

        <div className="pt-4 border-t border-green-emerald/20 dark:border-green-emerald/20 text-center">
          <p className="text-sm italic text-green-emerald/80 font-cinzel tracking-wide">
            "Or perhaps in Slytherin, you'll make your real friends, those cunning folk use any means to achieve their ends."
          </p>
          <p className="text-xs text-green-emerald/50 mt-1">— The Sorting Hat</p>
        </div>
      </div>
    </section>
  )
}
