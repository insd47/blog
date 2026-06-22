import Banner from '@/app/_views/banner';
import Separator from '@/components/separator';
import Games from '@/app/_views/game';

export default function Home() {
  return <HomePage />;
}

async function HomePage() {

  return (
    <main>
      <Banner />
      <Separator />

      <Games />
      <Separator />
    </main>
  );
}
