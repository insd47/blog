import Section from '@/app/_views/section';
import SdvxCard from '@/app/_views/games/sdvx';
import ChunithmCard from '@/app/_views/games/chunithm';
import MaimaiCard from '@/app/_views/games/maimai';

export default function GamesSection() {
  return (
    <Section>
      <header className="px-4 flex items-center">
        <h2>Games</h2>
      </header>
      <div className="flex *:flex-1">
        <SdvxCard />
        <MaimaiCard />
        <ChunithmCard />
      </div>
    </Section>
  );
}
