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
    <div
      className="min-h-screen bg-[#030804]"
      style={{
        backgroundImage: 'url(/assets/background-texture-2.JPG)',
        backgroundRepeat: 'repeat',
        backgroundSize: '400px',
        backgroundBlendMode: 'overlay',
      }}
    >
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
  )
}
