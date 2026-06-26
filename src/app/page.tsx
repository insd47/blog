import BannerSection from '@/app/_views/banner';
import Separator from '@/components/separator';
import GamesSection from '@/app/_views/games';
import Projects from '@/app/_views/projects';

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
