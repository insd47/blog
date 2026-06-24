const formatter = {
  date: Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Asia/Seoul',
  }),
  time: Intl.DateTimeFormat('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Asia/Seoul',
  }),
  weekday: Intl.DateTimeFormat('ko-KR', {
    weekday: 'long',
    timeZone: 'Asia/Seoul',
  }),
};

export default formatter;
