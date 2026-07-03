import { ImageResponse } from 'next/og';
import { getFonts } from '@/lib/opengraph/fonts';
import { getProject, getProjectList } from '@/lib/content/projects';
import { SatoriRoot, SatoriTitle, SatoriParagraph, SatoriJoin, SatoriLogo } from '@/components/opengraph';
import { Banner, Content } from '@/app/projects/[code]/_opengraph/views';
import { Fragment } from 'react';
import formatter from '@/lib/utils/formatter';

export default async function OpenGraphImage({ params }: PageProps<'/projects/[code]'>) {
  const { code } = await params;
  const fonts = await getFonts();
  const project = await getProject(code);

  const [start, end] = project.period;

  return new ImageResponse(
    <SatoriRoot style={{ flexDirection: 'column' }}>
      <Banner src={project.banner.src} />
      <Content>
        <SatoriTitle style={{ marginBottom: 8 }}>{project.title}</SatoriTitle>
        <SatoriParagraph>
          {project.stacks.map((s, i) => (
            <Fragment key={s}>
              {i > 0 && <SatoriJoin style={{ margin: '0 9px' }}>+</SatoriJoin>}
              {s}
            </Fragment>
          ))}
          <SatoriJoin style={{ margin: '0 9px' }}>|</SatoriJoin>
          {!end && 'Since '}
          {formatter.year.format(start)}
          {end && '-' + formatter.year.format(end)}
        </SatoriParagraph>
      </Content>

      <SatoriLogo />
    </SatoriRoot>,
    { ...size, fonts },
  );
}

export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };
export const dynamicParams = false;

export async function generateStaticParams() {
  return getProjectList().then((project) => project.map(({ code }) => ({ code })));
}
