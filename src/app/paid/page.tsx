import NoToolsArea from '@/components/NoToolsArea'
import SimpleHeroBanner from '@/components/SimpleHeroBanner'
import ToolCard from '@/components/ToolCard'
import ToolsGridArea from '@/components/ToolsGridArea'
import ContentAreaLayout from '@/components/layouts/ContentAreaLayout'
import {Separator} from '@/components/ui/separator'
import {PAIDPAGE_CONTENT} from '@/constants/Content'
import supabase from '@/lib/supabase'
import React from 'react'

type Props = {}

const PaidToolsPage = async (props: Props) => {
    const {data: tools, error} = await supabase.from('tools').select('*').in('freeOrPaid', ['subscription']);
    return (
        <ContentAreaLayout>
            <SimpleHeroBanner {...PAIDPAGE_CONTENT} />
            <Separator className="my-8 bg-stone-700 bg-opacity-75" />
            <ToolsGridArea tools={tools} />
        </ContentAreaLayout>
    )
}

export default PaidToolsPage
