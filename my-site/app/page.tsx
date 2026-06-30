// app/page.tsx

import HomeHero from '@/components/HomeHero/HomeHero'
import Categories from '@/components/Categories/Categories'
import Instruments from '@/components/Instruments/Instruments'
import FeaturedProducts from '@/components/FeaturedProducts/FeaturedProducts'
import Testimonials from '@/components/Testimonials/Testimonials'
import Newsletter from '@/components/Newsletter/Newsletter'
import Footer from '@/components/Footer/Footer'

export const metadata = {
  title: 'Acordz — Música para Crianças',
  description: 'Jogos, partituras e ebooks para crianças curiosas que amam aprender música.',
}

export default function Home() {
  return (
    <main>
      <HomeHero />
      <Categories />
      <Instruments />
      <FeaturedProducts />
      <Testimonials />
      <Newsletter />
      <Footer />
    </main>
  )
}