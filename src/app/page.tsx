import SimpleHeroBanner from '@/components/SimpleHeroBanner'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen w-full p-8 bg-stone-900">
      <SimpleHeroBanner />
    </main>
  )
}
