import Footer from '@/components/Footer'
import SimpleHeroBanner from '@/components/SimpleHeroBanner'
import ToolCard from '@/components/ToolCard'
import ToolsContentArea from '@/components/ToolsContentArea'
import ToolsGridArea from '@/components/ToolsGridArea'
import ContentAreaLayout from '@/components/layouts/ContentAreaLayout'
import supabase from '@/lib/supabase'
import {generateCategoryHeroContent} from '@/lib/utils'
import React from 'react'

type Props = {}

const SingleCategoryPage = async ({params: {slug}}: {params: {slug: string}}) => {
    const {heroTitle, heroDescription} = generateCategoryHeroContent(slug);
    const {data: tools, error} = await supabase
        .from('tools')
        .select('*')
        .contains('tags', [`${slug}`]).limit(20).order('id', {ascending: false});

    const loadMoreFunc = async (from: number, to: number) => {
        "use server"
        return await supabase!
            .from('tools')
            .select('*')
            .contains('tags', [`${slug}`])
            .range(from, to)
            .order('id', {ascending: false})
    }

    return (
        <ContentAreaLayout>
            <ToolsContentArea queryFunction={loadMoreFunc} content={{heroTitle, heroDescription}} tools={tools} />
        </ContentAreaLayout>
    )
}

export default SingleCategoryPage
