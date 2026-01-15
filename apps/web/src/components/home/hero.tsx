import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] rounded-full blur-3xl -z-10" />
      <div className="container mx-auto px-4 text-center">
        {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mb-8">
          <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
          Built with AI Dreams
        </div> */}

        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400">Open Source Alternatives</span>
          <br />
          to Popular Software
        </h1>

        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Over 1 million users replaced their proprietary tools with open source software.
          Discover the best alternatives and join the movement.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
           {/* Email subscribe was requested to be skipped, so just the CTA to browse tools if any */}
           {/* The design screenshot shows an email input + button, but user asked to skip it.
               I'll add a "Browse Tools" button instead as a main CTA since email is removed. */}
          <Link 
            href="/tools" 
            className="inline-flex items-center gap-2 bg-white text-black px-3 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Browse Tools
            <ArrowRight className="size-4" />
          </Link>
          
          <Link 
             href="/submit"
             className="inline-flex items-center gap-2 bg-white/10 text-white px-3 py-2 rounded-lg font-medium hover:bg-white/20 transition-colors"
          >
             Submit a Tool
          </Link>
        </div>
      </div>
    </section>
  );
}


