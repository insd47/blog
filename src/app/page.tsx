import BannerSection from '@/app/_views/banner';
import Separator from '@/components/separator';
import GamesSection from '@/app/_views/games';
import ProjectSection from '@/app/_views/projects';
import PostSection from '@/app/_views/posts';

export default function AboutPage() {
  return (
    <main>
      <BannerSection />
      <Separator />

      <GamesSection />
      <Separator />

      <PostSection />
      <Separator />

      <ProjectSection />
    </main>
  );
}
