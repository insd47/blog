export const dynamic = 'force-static';

export function GET() {
  const result = Object.entries(profiles).map(([id, v]) => ({ id, ...v }));

  return Response.json(result, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
}

const profiles = {
  myeolinmalchi: {
    name: '강민석',
    avatar: `https://github.com/myeolinmalchi.png`,
    githubUrl: `https://github.com/myeolinmalchi`,
  },
  insd47: {
    name: '황인성',
    email: 'me@insd.dev',
    avatar: 'https://github.com/insd47.png',
    githubUrl: `https://github.com/insd47`,
  },
  yuhoyeong: {
    name: '유호영',
    avatar: 'https://github.com/yuhoyeong.png',
    githubUrl: `https://github.com/yuhoyeong.png`,
  },
  cla6shade: {
    name: '이세형',
    email: 'cla6shade@gmail.com',
    avatar: 'https://github.com/cla6shade.png',
    githubUrl: `https://github.com/cla6shade.png`,
  },
};
