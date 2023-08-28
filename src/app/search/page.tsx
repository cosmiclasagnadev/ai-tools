import SearchResultsContentArea from '@/components/SearchResultsContentArea';
import ContentAreaLayout from '@/components/layouts/ContentAreaLayout'
import React from 'react'

type Props = {}

export const metadata = {
    title: 'Search for AI Tools | AI Tools',
    description: 'Curated collection of AI tools, all in one place. Discover the perfect tool for your next project or business and speed up your workflow!',
    openGraph: {
        title: 'Search for AI Tools | AI Tools',
        url: 'https://aitools.sh',
        description: 'Curated collection of AI tools, all in one place. Discover the perfect tool for your next project or business and speed up your workflow!',
        type: 'website',
    },
    twitter: {
        title: 'Search for AI Tools | AI Tools',
        creator: '@cosmiclasagnadev',
        card: 'summary_large_image',
        site: 'https://aitools.sh',
        description: 'Curated collection of AI tools, all in one place. Discover the perfect tool for your next project or business and speed up your workflow!',
        type: 'website',
    }
}

const SearchResultsPage = (props: Props) => {

    return (
        <ContentAreaLayout>
            <SearchResultsContentArea />
        </ContentAreaLayout>
    )
}

export default SearchResultsPage
