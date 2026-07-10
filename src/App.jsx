import { AppProvider } from './context/AppContext'
import Stars from './components/Stars'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import AchievementsSection from './components/AchievementsSection'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-surface-light text-gray-900 dark:bg-blue-deep dark:text-white transition-colors duration-300 star-bg">
        <Stars />
        <div className="relative">
          <Navbar />
          <Hero />
          <About />
          <Projects />
          <AchievementsSection />
          <Skills />
          <Contact />
          <Footer />
        </div>
      </div>
    </AppProvider>
  )
}

export default App
