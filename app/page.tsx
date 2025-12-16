import Hero from '@/app/components/Home/Hero'
import NamesList from '@/app/components/Home/Courses'
import Mentor from '@/app/components/Home/Mentor'
import Testimonial from '@/app/components/Home/Testimonial'
import { Metadata } from 'next'
import ContactForm from './components/Contact/Form'
export const metadata: Metadata = {
  title: 'Trendix',
}

export default function Home() {
  return (
    <main>
      <Hero />
      <NamesList />
      <Testimonial />
      {/* <ContactForm /> */}
      <Mentor />
    </main>
  )
}
