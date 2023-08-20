import SimpleHeroBanner from '@/components/SimpleHeroBanner'
import ToolCard from '@/components/ToolCard';
import {Separator} from '@/components/ui/separator';
import supabase from '@/lib/supabase';
import {HOME_CONTENT} from '@/constants/Content';
import ToolsGridArea from '@/components/ToolsGridArea';
import Footer from '@/components/Footer';
import Search from '@/components/Search';

export default async function Home() {
  const {data: tools} = await supabase.from('tools').select('*').limit(20)
  return (
    <main className="min-h-screen w-full p-8 bg-stone-900 relative">
      {/* <Search /> */}
      <SimpleHeroBanner {...HOME_CONTENT} />
      <Separator className="my-8 bg-stone-700 bg-opacity-75" />
      <ToolsGridArea tools={tools} />
      <Footer />
    </main>
  )
}
