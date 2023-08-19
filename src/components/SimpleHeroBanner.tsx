import React from 'react'

type Props = {
    showBanner?: boolean;
    bannerText?: string;
}

const SimpleHeroBanner = ({showBanner, bannerText}: Props) => {
    return (
        <section>
            <div className="max-w-7xl">
                <div className="text-left">
                    {!!showBanner &&
                        <div className="inline-flex px-4 py-1.5 rounded-full bg-gradient-to-r from-fuchsia-600 to-blue-600">
                            <p className="text-xs font-semibold tracking-widest text-white uppercase">{bannerText ?? '130+ Handcoded Blocks'}</p>
                        </div>
                    }
                    <h2 className="mt-6 text-3xl font-bold leading-tight text-stone-300 sm:text-2xl lg:text-3xl">Celebration helps you build beautiful website</h2>
                    <p className="mt-4 text-base leading-relaxed text-stone-500">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
                </div>
            </div>
        </section>

    )
}

export default SimpleHeroBanner
