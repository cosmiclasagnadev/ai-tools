import React from 'react'
import LogoLink from './LogoLink'
import {NAVIGATION_LINKS} from '@/constants/Navigation'

type Props = {}

const Footer = (props: Props) => {
    return (
        <section className="mt-11 border-t border-solid border-stone-700/50 w-[100%] py-12 bg-stone-900">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div className="text-center xl:flex xl:items-center xl:justify-between xl:text-left">
                    <div className="xl:flex xl:items-center xl:justify-start">
                        <LogoLink />

                        <p className="mt-5 text-sm text-white xl:ml-6 xl:mt-0">© Made with ❤️ by Allen</p>
                    </div>

                    <div className="items-center mt-8 xl:mt-0 xl:flex xl:justify-end xl:space-x-8">
                        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 xl:justify-end">
                            {NAVIGATION_LINKS.map((link) => (
                                <li key={link.title}>
                                    <a href={link.href} className="text-sm text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80">{link.title}</a>
                                </li>
                            ))}
                        </ul>

                        <div className="w-full h-px mt-8 mb-5 xl:w-px xl:m-0 xl:h-6 bg-gray-50/20"></div>

                        <ul className="flex items-center justify-center space-x-8 xl:justify-end">
                            <li>
                                <a target="_blank" href="https://twitter.com/ohitscosmic" title="" className="block text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80">
                                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path
                                            d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
                                        ></path>
                                    </svg>
                                </a>
                            </li>

                            <li>
                                <a target="_blank" href="https://github.com/cosmiclasagnadev" title="" className="block text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Footer
