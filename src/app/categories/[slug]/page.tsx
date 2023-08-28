import ToolsContentArea from '@/components/ToolsContentArea'
import ContentAreaLayout from '@/components/layouts/ContentAreaLayout'
import supabase from '@/lib/supabase'
import {capitalizeAndRemoveHyphen, generateCategoryHeroContent} from '@/lib/utils'
import {ResolvingMetadata, Metadata} from 'next'
import React from 'react'

type Props = {
    params: {slug: string}
}

export async function generateMetadata(
    {params}: Props,
    parent?: ResolvingMetadata
): Promise<Metadata> {
    const {slug} = params;
    const newTitle = `AI ${capitalizeAndRemoveHyphen(slug)} Tools | AI Tools`;

    return {
        category: capitalizeAndRemoveHyphen(slug),
        title: newTitle,
        description: 'Curated collection of AI tools, all in one place. Discover the perfect tool for your next project or business and speed up your workflow!',
        openGraph: {
            title: newTitle,
            url: 'https://aitools.sh',
            description: 'Curated collection of AI tools, all in one place. Discover the perfect tool for your next project or business and speed up your workflow!',
            type: 'website',
        },
        twitter: {
            title: newTitle,
            creator: '@cosmiclasagnadev',
            card: 'summary_large_image',
            site: 'https://aitools.sh',
            description: 'Curated collection of AI tools, all in one place. Discover the perfect tool for your next project or business and speed up your workflow!',
        }

    }
}

const SingleCategoryPage = async ({params: {slug}}: Props) => {
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
