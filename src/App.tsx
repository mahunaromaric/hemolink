import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ImpactSection from './components/ImpactSection'
import CriteriaSection from './components/CriteriaSection'
import EligibilitySection from './components/EligibilitySection'
import ProcessSection from './components/ProcessSection'
import CentersSection from './components/CentersSection'
import StockSection from './components/StockSection'
import TestimonialsSection from './components/TestimonialsSection'
import FaqSection from './components/FaqSection'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ImpactSection />
        <CriteriaSection />
        <EligibilitySection />
        <ProcessSection />
        <CentersSection />
        <StockSection />
        <TestimonialsSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  )
}

export default App
