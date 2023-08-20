import React from 'react'

type Props = {
    showBanner?: boolean;
    bannerText?: string;
    heroTitle: string;
    heroDescription: string;
}

const SimpleHeroBanner = ({showBanner, bannerText, heroTitle, heroDescription}: Props) => {
    return (
        <section>
            <div className="max-w-7xl">
                <div className=" max-w-xl text-left">
                    {!!showBanner &&
                        <div className="inline-flex px-4 py-1.5 rounded-full bg-gradient-to-r from-fuchsia-600 to-blue-600">
                            <p className="text-xs font-semibold tracking-widest text-white uppercase">{bannerText ?? '130+ Handcoded Blocks'}</p>
                        </div>
                    }
                    <h1 className="mt-6 text-3xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400 sm:text-2xl lg:text-4xl">{heroTitle}</h1>
                    <p className="mt-4 text-base leading-relaxed text-stone-500">{heroDescription}</p>
                </div>
            </div>
        </section>

    )
}

export default SimpleHeroBanner
