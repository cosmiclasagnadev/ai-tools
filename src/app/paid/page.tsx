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

export const revalidate = 30

export const metadata = {
    title: 'Best Paid AI Tools | AI Tools',
}

const PaidToolsPage = async (props: Props) => {
    const {data: tools, error} = await supabase.from('tools').select('*').in('freeOrPaid', ['subscription', 'paid', 'free--plan']);
    return (
        <ContentAreaLayout>
            <ToolsContentArea content={PAIDPAGE_CONTENT} tools={tools} />
        </ContentAreaLayout>
    )
}

export default PaidToolsPage
