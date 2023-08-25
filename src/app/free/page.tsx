import ToolsContentArea from '@/components/ToolsContentArea'
import ContentAreaLayout from '@/components/layouts/ContentAreaLayout'
import {FREEPAGE_CONTENT} from '@/constants/Content'
import supabase from '@/lib/supabase'
import React from 'react'

type Props = {}

export const revalidate = 30

export const metadata = {
    title: 'Free AI Tools | AI Tools',
}

const FreeToolsPage = async (props: Props) => {
    const {data: tools, error} = await supabase.from('tools').select('*').in('freeOrPaid', ['free', 'free-plan']).limit(20);
    return (
        <ContentAreaLayout>
            <ToolsContentArea content={FREEPAGE_CONTENT} tools={tools} />
        </ContentAreaLayout>
    )
}

export default FreeToolsPage
