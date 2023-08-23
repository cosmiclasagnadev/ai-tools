import React from 'react'

type Props = {
    children: React.ReactNode
}

const ContentAreaNoHeaderLayout = ({children}: Props) => {
    return (
        <main className="min-h-screen w-full bg-stone-900 relative">
            {children}
        </main>
    )
}

export default ContentAreaNoHeaderLayout
