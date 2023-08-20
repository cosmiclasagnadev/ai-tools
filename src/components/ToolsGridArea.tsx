import React from 'react'
import NoToolsArea from './NoToolsArea'
import ToolCard from './ToolCard'

type Props = {
    tools: any
}

const ToolsGridArea = ({tools}: Props) => {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
