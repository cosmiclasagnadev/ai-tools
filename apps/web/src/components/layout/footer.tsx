import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-accent pt-16 pb-8">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="size-8 rounded-lg bg-white flex items-center justify-center">
                <span className="text-black font-bold text-xl">A</span>
              </div>
              <span className="font-bold text-xl text-white">AITools.sh</span>
            </Link>
            <p className="text-gray-400 text-sm mb-6 max-w-sm">
              Discover Open Source Alternatives to Proprietary Software.
              Join over 1 million users replacing their tools with open source software.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="size-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="size-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="size-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Browse</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/tools" className="text-sm text-gray-400 hover:text-white transition-colors">
                  All Tools
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/open-source" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Open Source
                </Link>
              </li>
              <li>
                <Link href="/submit" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Submit Tool
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/blog" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/affiliate-disclosure" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Affiliate Disclosure
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-accent-foreground/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-accent-foreground">
            &copy; {new Date().getFullYear()} AITools.sh. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
             <p className="text-sm text-accent-foreground">
                Made by <a href="#" className="hover:text-white transition-colors">Allen Ponce De Leon</a>
             </p>
          </div>
        </div>
      </div>
    </footer>
  );
}


