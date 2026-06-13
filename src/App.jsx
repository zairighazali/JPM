import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductSection from './components/ProductSection'
import MaterialSection from './components/MaterialSection'
import PricingSection from './components/PricingSection'
import TrustSection from './components/TrustSection'
import ProcessTimeline from './components/ProcessTimeline'
import ActivityGallery from './components/ActivityGallery'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-metallic relative">
      <div className="fixed inset-0 bg-brushed pointer-events-none" aria-hidden="true" />
      <div className="fixed inset-0 bg-grain pointer-events-none" aria-hidden="true" />

      <div className="relative">
        <Navbar />
        <main>
          <Hero />
          <ProductSection />
          <MaterialSection />
          <PricingSection />
          <TrustSection />
          <ProcessTimeline />
          <ActivityGallery />
        </main>
        <Footer />
      </div>
    </div>
  )
}
