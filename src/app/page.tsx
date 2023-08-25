import supabase from '@/lib/supabase';
import {HOME_CONTENT} from '@/constants/Content';
import ToolsContentArea from '@/components/ToolsContentArea';
import ContentAreaLayout from '@/components/layouts/ContentAreaLayout';

export const revalidate = 30;

export default async function Home() {
  const {data: tools} = await supabase.from('tools').select('*').limit(20);

  return (
    <ContentAreaLayout>
      <ToolsContentArea content={HOME_CONTENT} tools={tools} />
    </ContentAreaLayout>
  )
}
