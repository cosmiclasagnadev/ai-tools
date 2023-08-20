import SimpleHeroBanner from '@/components/SimpleHeroBanner'
import ToolCard from '@/components/ToolCard'
import ToolsGridArea from '@/components/ToolsGridArea'
import ContentAreaLayout from '@/components/layouts/ContentAreaLayout'
import {Separator} from '@/components/ui/separator'
import supabase from '@/lib/supabase'
import {generateCategoryHeroContent} from '@/lib/utils'
import React from 'react'

type Props = {}

const SingleCategoryPage = async ({params: {slug}}: {params: {slug: string}}) => {
    const {heroTitle, heroDescription} = generateCategoryHeroContent(slug);
    const {data: tools, error} = await supabase
        .from('tools')
        .select()
        .contains('tags', [`${slug}`])
    return (
        <ContentAreaLayout>
            <SimpleHeroBanner heroTitle={heroTitle} heroDescription={heroDescription} />
            <Separator className="my-8 bg-stone-700 bg-opacity-75" />
            <ToolsGridArea tools={tools} />
        </ContentAreaLayout>
    )
}

export default SingleCategoryPage
