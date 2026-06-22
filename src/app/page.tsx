import Banner from '@/app/_views/banner';
import Separator from '@/components/separator';

export default function Home() {
  return <HomePage />;
}

async function HomePage() {

  return (
    <main>
      <Banner />
      <Separator />


    </main>
  );
}
