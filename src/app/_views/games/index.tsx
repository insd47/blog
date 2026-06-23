import Section from '@/app/_views/section';
import GameCard from '@/components/cards/game';
import * as icons from '@/app/_views/games/icons';

export default function GamesSection() {
  return (
    <Section>
      <header className="px-4 flex items-center">
        <h2>Games</h2>
      </header>
      <div className="flex *:flex-1">
        <GameCard
          icon={icons.sdvx}
          title="Sound Voltex"
          rating={21.309}
          grade={{ name: 'IMPERIAL II', gap: 1 }}
          colors={['#BAE969', '#0E1808', '#D6D6D6']}
        />

        <GameCard
          icon={icons.maimai}
          title="maimai DX"
          rating={16152}
          grade={{ name: 'RAINBOW', gap: 100 }}
          colors={['#F2BBCC', '#E64BA7', '#EBF4AF']}
        />

        <GameCard
          icon={icons.chunithm}
          title="CHUNITHM"
          rating={17.14}
          grade={{ name: 'RAINBOW(B)', gap: 0.1 }}
          colors={['#CBF9FC', '#85C6E6', '#FFC3FF']}
        />
      </div>
    </Section>
  );
}
