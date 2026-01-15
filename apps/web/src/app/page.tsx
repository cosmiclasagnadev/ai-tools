import { Hero } from '@/components/home/hero';
import { BannerAd } from '@/components/home/banner-ad';
import { ToolDirectory } from '@/components/home/tool-directory';

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-900">
      <Hero />
      <BannerAd />
      <ToolDirectory />
    </div>
  );
}
