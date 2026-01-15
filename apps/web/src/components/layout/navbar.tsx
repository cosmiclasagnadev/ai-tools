'use client'

import Link from 'next/link';
import { Menu, Search, X } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-stone-900 backdrop-blur-md sticky top-0 z-50">
      <div className="container max-w-6xl mx-auto px-2 py-2 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-xl text-white">aitools</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/tools" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
            Browse
          </Link>
          <Link href="/open-source" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
            Open Source
          </Link>
          <Link href="/submit" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
            Submit Tool
          </Link>
          <Link href="/about" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
            About
          </Link>
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-medium text-white bg-stone-900 inset-shadow-[0px_1px_1px_0px_rgba(255,255,255,0.2)] hover:bg-stone-950 shadow-md hover:shadow-lg px-3 py-1 rounded-md transition-colors"
          >
            Sign In
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-400 hover:text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-800 bg-black p-4 space-y-4">
          <Link
            href="/tools"
            className="block text-sm font-medium text-gray-400 hover:text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            Browse
          </Link>
          <Link
            href="/open-source"
            className="block text-sm font-medium text-gray-400 hover:text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            Open Source
          </Link>
          <Link
            href="/submit"
            className="block text-sm font-medium text-gray-400 hover:text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            Submit Tool
          </Link>
          <Link
            href="/about"
            className="block text-sm font-medium text-gray-400 hover:text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <div className="pt-4 border-t border-gray-800">
            <Link
              href="/login"
              className="block w-full text-center text-sm font-medium text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}


