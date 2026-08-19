import { ScrollController } from './scroll/ScrollController'
import { Nav } from './sections/Nav'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Services } from './sections/Services'
import { Work } from './sections/Work'
import { Process } from './sections/Process'
import { Pricing } from './sections/Pricing'
import { Inquire } from './sections/Inquire'
import { Contact } from './sections/Contact'
import './styles/sections.css'

export default function App() {
  return (
    <>
      <ScrollController />
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <Work />
        <Process />
        <Pricing />
        <Inquire />
      </main>
      <Contact />
    </>
  )
}
