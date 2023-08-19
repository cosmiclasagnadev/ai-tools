import SimpleHeroBanner from '@/components/SimpleHeroBanner'
import ToolCard from '@/components/ToolCard';
import {Separator} from '@/components/ui/separator';
import supabase from '@/lib/supabase';

export default async function Home() {
  const {data: tools} = await supabase.from('tools').select('*')
  return (
    <main className="min-h-screen w-full p-8 bg-stone-900">
      <SimpleHeroBanner />
      <Separator className="my-8 bg-stone-700 bg-opacity-75" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools?.map(tool => (
          <ToolCard key={tool.title} {...tool} />
        ))}
      </div>
      {/* <pre className="text-white">{JSON.stringify(tools, null, 2)}</pre> */}
    </main>
  )
}
