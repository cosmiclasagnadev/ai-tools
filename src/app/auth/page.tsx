import ContentAreaLayout from '@/components/layouts/ContentAreaLayout'
import {Button} from '@/components/ui/button'
import React from 'react'
import {} from 'lucide-react'

type Props = {}

const AuthPage = (props: Props) => {
    return (
        <ContentAreaLayout>
            <section className="py-10 bg-stone-900 sm:py-16 lg:py-24">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto text-center">
                        <h1 className="text-3xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400 sm:text-4xl lg:text-5xl">All The Best AI Tools, All In One Place</h1>
                        <h2 className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-stone-500">Login to your account</h2>
                    </div>

                    <div className="relative max-w-md mx-auto mt-8 md:mt-8">
                        <div className="overflow-hidden bg-stone-800 rounded-md shadow-md">
                            <div className="px-4 py-6 sm:px-8 sm:py-7">
                                <div className="flex gap-2 flex-row mb-4">
                                    <Button className="rounded-full w-full flex justify-between">
                                        <svg className="w-4 h-4 text-rose-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                            <path
                                                d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"
                                            ></path>
                                        </svg>
                                        <span>Sign in with Google</span></Button>
                                    <Button className="rounded-full w-full flex justify-between">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                                        <span>
                                            Sign in with Github
                                        </span>
                                    </Button>
                                </div>
                                <form action="#" method="POST">
                                    <div className="space-y-5">
                                        <div>
                                            <label htmlFor="email" className="text-base font-medium text-stone-600"> Email address </label>
                                            <div className="mt-2.5 relative text-stone-400 focus-within:text-stone-600">
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                                    </svg>
                                                </div>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    placeholder="Enter email to get started"
                                                    className="block w-full py-4 pl-10 pr-4 text-white placeholder-stone-500 transition-all duration-200 bg-stone-900 border border-stone-600 rounded-md focus:outline-none focus:border-emerald-400 caret-emerald-600"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex items-center justify-between">
                                                <label htmlFor="password" className="text-base font-medium text-stone-600"> Password </label>
                                                <a href="#" title="" className="text-sm font-medium text-emerald-500 transition-all duration-200 hover:text-emerald-600 focus:text-orange-600 hover:underline"> Forgot password? </a>
                                            </div>
                                            <div className="mt-2.5 relative text-stone-400 focus-within:text-stone-600">
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                                                        />
                                                    </svg>
                                                </div>

                                                <input
                                                    type="password"
                                                    name="password"
                                                    id="password"
                                                    placeholder="Enter your password"
                                                    className="block w-full py-4 pl-10 pr-4 text-white placeholder-stone-500 transition-all duration-200 bg-stone-900 border border-stone-600 rounded-md focus:outline-none focus:border-emerald-600 caret-emerald-600"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <button type="submit" className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-emerald-600 border border-transparent rounded-md focus:outline-none hover:bg-emerald-700 focus:bg-emerald-700">
                                                Log in
                                            </button>
                                        </div>

                                        <div className="text-center">
                                            <p className="text-base text-stone-500">Don&apos;t have an account? <a href="#" title="" className="font-medium text-emerald-500 transition-all duration-200 hover:text-emerald-600 hover:underline">Create a free account</a></p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </ContentAreaLayout>

    )
}

export default AuthPage
