import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ImpactSection from './components/ImpactSection'
import StockSection from './components/StockSection'
import CriteriaSection from './components/CriteriaSection'
import EligibilitySection from './components/EligibilitySection'
import CentersSection from './components/CentersSection'
import ProcessSection from './components/ProcessSection'
import TestimonialsSection from './components/TestimonialsSection'
import FaqSection from './components/FaqSection'
import MythsSection from './components/MythsSection'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ImpactSection />
        <StockSection />
        <CriteriaSection />
        <EligibilitySection />
        <CentersSection />
        <ProcessSection />
        <TestimonialsSection />
        <FaqSection />
        <MythsSection />
      </main>
      <Footer />
    </>
  )
}

export default App
