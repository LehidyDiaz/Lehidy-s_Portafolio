import { createContext, useContext, useState, useEffect } from 'react'
import { translations } from '../i18n'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'es')
  const [dark, setDark] = useState(() => localStorage.getItem('dark') === 'true')

  useEffect(() => {
    localStorage.setItem('lang', lang)
  }, [lang])

  useEffect(() => {
    localStorage.setItem('dark', dark)
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const t = (key) => translations[lang]?.[key] ?? key

  const toggleLang = () => setLang((l) => (l === 'es' ? 'en' : 'es'))
  const toggleDark = () => setDark((d) => !d)

  return (
    <AppContext.Provider value={{ lang, setLang, toggleLang, dark, setDark, toggleDark, t }}>
      {children}
    </AppContext.Provider>
  )
}

// The context hook intentionally lives beside its provider.
// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => useContext(AppContext)
