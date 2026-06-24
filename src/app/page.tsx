import BannerSection from '@/app/_views/banner';
import Separator from '@/components/separator';
import GamesSection from '@/app/_views/games';
import Projects from '@/app/_views/projects';
import type { Metadata } from 'next';

export default function AboutPage() {
  return (
    <main>
      <BannerSection />
      <Separator />

      <GamesSection />
      <Separator />

      <Projects />
    </main>
  );
}

export const metadata: Metadata = {
  title: 'About',
  openGraph: { title: 'About' },
};
