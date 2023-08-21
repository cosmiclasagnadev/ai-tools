import supabase from '@/lib/supabase';
import {HOME_CONTENT} from '@/constants/Content';
import ToolsContentArea from '@/components/ToolsContentArea';
import ContentAreaLayout from '@/components/layouts/ContentAreaLayout';

export const revalidate = 60

export default async function Home() {
  const {data: tools} = await supabase.from('tools').select('*').limit(20);
  // multiply tools by 5 to make the grid area look full
  // const moreTools = [...tools!, ...tools!, ...tools!, ...tools!, ...tools!];

  return (
    <ContentAreaLayout>
      <ToolsContentArea content={HOME_CONTENT} tools={tools} />
    </ContentAreaLayout>
  )
}
