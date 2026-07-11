import { useApp } from '../context/AppContext'
import SectionAtmosphere from './SectionAtmosphere'

const skills = [
  { name: 'React', level: 90, tone: 'react', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { name: 'JavaScript', level: 85, tone: 'javascript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
  { name: 'TypeScript', level: 75, tone: 'typescript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
  { name: 'Tailwind CSS', level: 90, tone: 'tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Node.js', level: 80, tone: 'node', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
  { name: 'HTML/CSS', level: 95, tone: 'html', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
  { name: 'Git', level: 85, tone: 'git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
  { name: 'MySQL', level: 70, tone: 'mysql', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
]

export default function Skills() {
  const { t } = useApp()

  return (
    <section id="skills" className="skills-section section-stars">
      <SectionAtmosphere variant="skills" />
      <div className="skills-glow" aria-hidden="true" />

      <div className="skills-container">
        <header className="skills-header">
          <h2>
            <span className="skills-bracket">&lt;</span>
            <span>{t('skillsTitulo')}</span>
            <span className="skills-slash">/</span><span className="skills-bracket">&gt;</span>
          </h2>
          <div className="skills-divider" aria-hidden="true"><span /><b>✦</b><span /></div>
          <p>Tecnologías y herramientas que utilizo para crear soluciones<br className="skills-description-break" /> modernas, eficientes y escalables.</p>
        </header>

        <div className="skills-grid">
          {skills.map((skill) => (
            <article className={`skill-card skill-${skill.tone}`} key={skill.name}>
              <div className="skill-icon"><img src={skill.icon} alt="" /></div>
              <div className="skill-details">
                <div className="skill-card-header">
                  <h3>{skill.name}</h3>
                  <span>{skill.level}%</span>
                </div>
                <div className="skill-progress" role="progressbar" aria-label={`${skill.name}: ${skill.level}%`} aria-valuenow={skill.level} aria-valuemin="0" aria-valuemax="100">
                  <i style={{ width: `${skill.level}%` }} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
