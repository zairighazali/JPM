import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductSection from './components/ProductSection'
import PricingWizard from './components/PricingWizard'
import MaterialSection from './components/MaterialSection'
import ProcessTimeline from './components/ProcessTimeline'
import AboutSection from './components/AboutSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-metallic relative">
      {/* Lapisan tekstur metalik — fixed supaya kekal sewaktu scroll */}
      <div className="fixed inset-0 bg-brushed pointer-events-none" aria-hidden="true" />
      <div className="fixed inset-0 bg-grain pointer-events-none" aria-hidden="true" />

      <div className="relative">
        <Navbar />
        <main>
          <Hero />
          <ProductSection />
          <PricingWizard />
          <MaterialSection />
          <ProcessTimeline />
          <AboutSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  )
}
