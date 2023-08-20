import React from 'react'

type Props = {
    children: React.ReactNode;
}

const ContentAreaLayout = ({children}: Props) => {
    return (
        <main className="min-h-screen w-full p-8 bg-stone-900">
            {children}
        </main>
    )
}

export default ContentAreaLayout
