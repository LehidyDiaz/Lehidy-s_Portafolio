import { AppProvider } from './context/AppContext'
import CosmicBackground from './components/CosmicBackground'
import SectionDivider from './components/SectionDivider'
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
      <div className="cosmic-site min-h-screen text-gray-900 dark:text-white transition-colors duration-300">
        <CosmicBackground />
        <div className="relative z-10">
          <Navbar />
          <Hero />
          <SectionDivider variant="star" />
          <About />
          <SectionDivider variant="orbit" />
          <Projects />
          <SectionDivider variant="winged" />
          <AchievementsSection />
          <SectionDivider variant="orbit" />
          <Skills />
          <SectionDivider variant="star" />
          <Contact />
          <Footer />
        </div>
      </div>
    </AppProvider>
  )
}

export default App
