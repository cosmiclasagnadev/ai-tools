import Footer from '@/components/Footer'
import NoToolsArea from '@/components/NoToolsArea'
import SimpleHeroBanner from '@/components/SimpleHeroBanner'
import ToolCard from '@/components/ToolCard'
import ToolsContentArea from '@/components/ToolsContentArea'
import ContentAreaLayout from '@/components/layouts/ContentAreaLayout'
import {PAIDPAGE_CONTENT} from '@/constants/Content'
import supabase from '@/lib/supabase'
import React from 'react'

type Props = {}

export const revalidate = 60

const PaidToolsPage = async (props: Props) => {
    const {data: tools, error} = await supabase.from('tools').select('*').in('freeOrPaid', ['subscription']);
    return (
        <ContentAreaLayout>
            <ToolsContentArea content={PAIDPAGE_CONTENT} tools={tools} />
        </ContentAreaLayout>
    )
}

export default PaidToolsPage
