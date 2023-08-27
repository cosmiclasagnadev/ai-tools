import supabase from '@/lib/supabase';
import {HOME_CONTENT} from '@/constants/Content';
import ToolsContentArea from '@/components/ToolsContentArea';
import ContentAreaLayout from '@/components/layouts/ContentAreaLayout';

export const revalidate = 30;

export default async function Home() {
  const {data: tools} = await supabase.from('tools').select('*').contains('tags', []).limit(20).order('id', {ascending: false});

  const loadMoreFunc = async (from: number, to: number) => {
    "use server"
    return await supabase!
      .from('tools')
      .select('*')
      .range(from, to)
      .order('id', {ascending: false})
  }

  return (
    <ContentAreaLayout>
      <ToolsContentArea queryFunction={loadMoreFunc} content={HOME_CONTENT} tools={tools} />
    </ContentAreaLayout>
  )
}
