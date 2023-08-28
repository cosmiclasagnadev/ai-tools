import React from 'react'
import NoToolsArea from './NoToolsArea'
import ToolCard from './ToolCard'
import {motion} from 'framer-motion';

type Props = {
    tools: any,
    pageCount: number,
    offset: number,
}

const ToolsGridArea = ({tools, pageCount, offset}: Props) => {
    return (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-2 space-y-2">
            {tools?.length === 0 && (
                <NoToolsArea />
            )}
            {tools?.map((tool: any, i: number) => {
                const recalculatedDelay = i >= pageCount * 2 ? (i - pageCount * (offset - 1)) / 15 : i / 15
                return (
                    <motion.div
                        key={tool.id}
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{
                            duration: 0.4,
                            ease: [0.25, 0.25, 0, 1],
                            delay: recalculatedDelay,
                        }}
                    >
                        <ToolCard {...tool} />
                    </motion.div>
                )
            })}
        </div>
    )
}

export default ToolsGridArea
