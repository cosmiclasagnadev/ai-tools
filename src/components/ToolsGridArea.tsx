import React from 'react'
import NoToolsArea from './NoToolsArea'
import ToolCard from './ToolCard'

type Props = {
    tools: any
}

const ToolsGridArea = ({tools}: Props) => {
    return (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-2 space-y-8">
            {tools?.length === 0 && (
                <NoToolsArea />
            )}
            {tools?.map((tool: any) => (
                <ToolCard key={tool.title} {...tool} />
            ))}
        </div>
    )
}

export default ToolsGridArea
