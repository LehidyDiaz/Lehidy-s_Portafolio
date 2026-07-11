import { useState } from 'react'
import { useApp } from '../context/AppContext'
import SectionAtmosphere from './SectionAtmosphere'

const contactChannels = [
  {
    label: 'WhatsApp',
    action: 'Escríbeme',
    tone: 'whatsapp',
    value: '+51 977 419 841',
    href: 'https://api.whatsapp.com/send/?phone=51977419841&text=Hola+Lehidy%2C+vi+tu+portafolio+y+me+gustar%C3%ADa+trabajar+contigo.&type=phone_number&app_absent=0',
    icon: (
      <svg className="w-5 h-5 text-green-emerald" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    label: 'GitHub',
    action: 'Ver perfil',
    tone: 'github',
    value: '@LehidyDiaz',
    href: 'https://github.com/LehidyDiaz',
    icon: (
      <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
    ),
  },
  {
    label: 'LinkedIn',
    action: 'Conectar',
    tone: 'linkedin',
    value: '/in/lehidy-pamela-diaz-munayco-17257426b',
    href: 'https://www.linkedin.com/in/lehidy-pamela-diaz-munayco-17257426b/',
    icon: (
      <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    ),
  },
  {
    label: 'Email',
    action: 'Enviar correo',
    tone: 'email',
    value: 'diazmunaycopamela@gmail.com',
    href: 'mailto:diazmunaycopamela@gmail.com',
    icon: (
      <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
    ),
  },
]

function ContactIcon({ type }) {
  const paths = {
    user: <><circle cx="12" cy="8" r="3.5" /><path d="M5 20c.7-4 3-6 7-6s6.3 2 7 6" /></>,
    email: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
    message: <><path d="M4 5h16v12H9l-5 4V5Z" /><path d="M8 9h8M8 13h5" /></>,
    send: <><path d="m3 11 18-8-7 18-3-7-8-3Z" /><path d="m11 14 4-5" /></>,
  }

  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[type]}</svg>
}

export default function Contact() {
  const [sent, setSent] = useState(false)
  const { t } = useApp()

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <section id="contact" className="contact-section section-stars">
      <SectionAtmosphere variant="contact" />
      <div className="contact-container">
        <header className="contact-header">
          <h2><span className="contact-bracket">&lt;</span><span>{t('contactTitulo')}</span><span className="contact-code">/&gt;</span></h2>
          <div className="contact-divider" aria-hidden="true"><span /><b>✦</b><span /></div>
          <p>¿Tienes una idea, proyecto o propuesta? Escríbeme y conversemos.</p>
        </header>

        <div className="contact-layout">
          <div className="contact-form-card">
            {sent ? (
              <div className="contact-success">
                <ContactIcon type="send" />
                <p>{t('contactExito')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="contact-field">
                  <label htmlFor="contact-name">{t('contactNombre')}</label>
                  <div><ContactIcon type="user" /><input id="contact-name" type="text" required placeholder={t('contactPlaceholderNombre')} /></div>
                </div>
                <div className="contact-field">
                  <label htmlFor="contact-email">{t('contactEmail')}</label>
                  <div><ContactIcon type="email" /><input id="contact-email" type="email" required placeholder={t('contactPlaceholderEmail')} /></div>
                </div>
                <div className="contact-field">
                  <label htmlFor="contact-message">{t('contactMensaje')}</label>
                  <div className="contact-textarea"><ContactIcon type="message" /><textarea id="contact-message" required rows={5} placeholder={t('contactPlaceholderMensaje')} /></div>
                </div>
                <button type="submit" className="contact-submit">{t('contactBtn')}<ContactIcon type="send" /></button>
              </form>
            )}
          </div>

          <div className="contact-side">
            <article className="contact-intro-card">
              <div className="contact-intro-icon"><span /><ContactIcon type="email" /></div>
              <div><h3>Hablemos</h3><p>Puedes contactarme directamente por cualquiera de estos medios.</p></div>
            </article>
            <div className="contact-channels">
              {contactChannels.map((channel) => (
                <a className={`contact-channel contact-channel-${channel.tone}`} key={channel.label} href={channel.href} target="_blank" rel="noopener noreferrer">
                  <span className="contact-channel-icon">{channel.icon}</span>
                  <span className="contact-channel-copy"><strong>{channel.label}</strong><small>{channel.action}<span aria-hidden="true">›</span></small></span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
