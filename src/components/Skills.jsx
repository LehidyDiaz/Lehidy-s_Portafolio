import { useApp } from '../context/AppContext'

const skills = [
  { name: 'React', level: 90, color: 'from-blue-500 to-blue-700', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { name: 'JavaScript', level: 85, color: 'from-gold to-gold-light', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
  { name: 'TypeScript', level: 75, color: 'from-blue-600 to-blue-800', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
  { name: 'Tailwind CSS', level: 90, color: 'from-green-emerald to-green-soft', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Node.js', level: 80, color: 'from-green-emerald to-green-soft', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
  { name: 'HTML/CSS', level: 95, color: 'from-blue-500 to-blue-700', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
  { name: 'Git', level: 85, color: 'from-gold to-gold-light', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
  { name: 'MySQL', level: 70, color: 'from-blue-600 to-blue-800', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
]

export default function Skills() {
  const { t } = useApp()

  return (
    <section id="skills" className="py-20 px-4 bg-white dark:bg-[#07101f] transition-colors relative overflow-hidden section-stars">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-gold to-blue-600" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="hidden md:block absolute top-10 left-1/3 w-52 h-52 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-[12%] text-lg float-slow opacity-20 dark:opacity-30 animate-float-slow">✦</div>
      </div>

      <div className="max-w-4xl mx-auto relative">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12 font-cinzel tracking-wide">
          <span className="text-gold">&lt;</span> {t('skillsTitulo')} <span className="text-gold">/&gt;</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skills.map((s) => (
            <div
              key={s.name}
              className="premium-surface group relative bg-surface-light dark:bg-blue-night rounded-xl border border-blue-200/60 dark:border-blue-400/20 p-4 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br ${s.color}`} />
              <div className="relative flex items-center gap-3 mb-2">
                <img src={s.icon} alt={s.name} className="w-5 h-5" />
                <span className="font-semibold text-gray-900 dark:text-white">{s.name}</span>
                <span className="ml-auto text-sm font-bold text-blue-600 dark:text-gold">{s.level}%</span>
              </div>
              <div className="relative w-full h-2.5 bg-blue-100 dark:bg-blue-navy/50 rounded-full overflow-hidden">
                <div className={`h-full rounded-full bg-gradient-to-r ${s.color} transition-all duration-700`} style={{ width: `${s.level}%` }} />
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-xs italic text-gold/50 mt-8 font-cinzel tracking-wide">
          "It takes a great deal of bravery to stand up to our enemies, but just as much to stand up to our friends."
        </p>
      </div>
    </section>
  )
}
