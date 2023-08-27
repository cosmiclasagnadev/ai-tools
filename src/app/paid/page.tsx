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
    const {data: tools, error} = await supabase.from('tools').select('*').in('freeOrPaid', ['subscription', 'paid', 'free-plan']).limit(20);

    const loadMoreFunc = async (from: number, to: number) => {
        "use server"
        return await supabase!
            .from('tools')
            .select('*')
            .in('freeOrPaid', ['subscription', 'paid', 'free-plan'])
            .range(from, to)
            .order('id', {ascending: false})
    }
    return (
        <ContentAreaLayout>
            <ToolsContentArea queryFunction={loadMoreFunc} content={PAIDPAGE_CONTENT} tools={tools} />
        </ContentAreaLayout>
    )
}

export default PaidToolsPage
