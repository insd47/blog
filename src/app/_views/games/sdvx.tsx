import GameCard from '@/components/cards/game';
import parse from 'node-html-parser';

export default async function SdvxCard() {
  const id = 'SV-5917-4794';

  const html = await fetch(`https://vaddict.b35.jp/user.php?player_id=${id}`)
    .then((res) => res.text())
    .then((text) => parse(text));

  const name = html
    .querySelector('div.player_info')
    ?.querySelectorAll('h5')
    ?.find((node) => node.textContent.trim() === 'Player Name')
    ?.nextElementSibling?.textContent.trim();

  const rating = Number(html.querySelector('text#volforce_num')?.textContent);
  const min = Number(html.querySelector('text#volforce_min')?.textContent);
  const max = Number(html.querySelector('text#volforce_max')?.textContent);
  const grade = html.querySelector('text#volforce_class')?.textContent;

  return (
    <GameCard
      icon={icon}
      title="Sound Voltex"
      name={name}
      rating={rating}
      min={min}
      max={max}
      grade={grade}
      colors={['#BAE969', '#0E1808', '#D6D6D6']}
    />
  );
}

const icon = (
  <svg className="h-3.5" width="17" height="10" viewBox="0 0 17 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4.86911 1.36126L7.06806 0H16.3351L14.0838 1.72775H9.21466L7.12042 3.50785L6.96335 4.60733L10.2094 2.87958L9.73822 4.71204L13.0367 2.87958L11.5707 8.37696L9.10995 10H0L2.04189 8.27225H7.06806L9.05759 6.43979L9.68587 5.02618L6.17801 7.12042L6.49215 5.07853L3.29843 6.85864L4.86911 1.36126Z"
      fill="currentColor"
    />
  </svg>
);
