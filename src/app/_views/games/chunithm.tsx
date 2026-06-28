import GameCard from '@/components/cards/game';

export default async function ChunithmCard() {
  const name = '5.6 Sol';
  const rating = 17.14;
  const min = 17.0;
  const max = 17.25;

  return (
    <GameCard
      icon={icon}
      title="CHUNITHM"
      name={name}
      rating={rating}
      min={min}
      max={max}
      grade="RAINBOW(B)"
      colors={['#CBF9FC', '#85C6E6', '#FFC3FF']}
    />
  );
}

const icon = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7 0C8.933 0 10.6834 0.783054 11.9502 2.0498L10.8887 3.11133C11.884 4.10663 12.5 5.48122 12.5 7C12.5 8.51878 11.884 9.89337 10.8887 10.8887L11.9502 11.9502C10.6834 13.2169 8.933 14 7 14C3.13401 14 0 10.866 0 7C0 3.13401 3.13401 0 7 0ZM7 3C4.79086 3 3 4.79086 3 7C3 9.20914 4.79086 11 7 11C9.20914 11 11 9.20914 11 7C11 4.79086 9.20914 3 7 3ZM7 5C8.10457 5 9 5.89543 9 7C9 8.10457 8.10457 9 7 9C5.89543 9 5 8.10457 5 7C5 5.89543 5.89543 5 7 5Z"
      fill="currentColor"
    />
  </svg>
);
