'use client';

import { useState } from 'react';
import { Twitter, Facebook, Linkedin, Link2, Check } from 'lucide-react';

interface ToolShareProps {
  name: string;
  slug: string;
}

export function ToolShare({ name, slug }: ToolShareProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/tool/${slug}`;
  const shareText = `Check out ${name} - AI Tools Directory`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
  ];

  return (
    <div className="border-t border-border pt-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Share this tool</h3>
      <div className="flex items-center gap-4">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-accent hover:bg-accent/80 transition-colors text-muted-foreground hover:text-foreground"
            aria-label={`Share on ${link.name}`}
          >
            <link.icon className="size-5" />
          </a>
        ))}
        <button
          onClick={copyToClipboard}
          className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-accent hover:bg-accent/80 transition-colors text-muted-foreground hover:text-foreground"
          aria-label="Copy link"
        >
          {copied ? <Check className="size-5 text-green-500" /> : <Link2 className="size-5" />}
        </button>
      </div>
    </div>
  );
}
