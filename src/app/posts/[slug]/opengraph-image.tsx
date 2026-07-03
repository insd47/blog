import { ImageResponse } from 'next/og';
import { getPost, getPostList } from '@/lib/content/posts';
import { Thumbnail, Content, Metadata } from '@/app/posts/[slug]/_opengraph/views';
import { SatoriRoot, SatoriTitle, SatoriParagraph, SatoriLogo } from '@/components/opengraph';
import { getFonts } from '@/lib/opengraph/fonts';
import { ClockIcon, TagIcon } from '@/app/posts/[slug]/_opengraph/icons';
import formatter from '@/lib/utils/formatter';

export default async function OpenGraphImage({ params }: PageProps<'/posts/[slug]'>) {
  const { slug } = await params;
  const fonts = await getFonts();
  const post = await getPost(slug);

  return new ImageResponse(
    <SatoriRoot>
      <Thumbnail src={post.thumbnail.src} />
      <Content>
        <SatoriTitle style={{ flex: 1 }}>{post.title}</SatoriTitle>
        <Metadata>
          <SatoriParagraph style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <TagIcon />
            {post.tags.join(' · ')}
          </SatoriParagraph>
          <SatoriParagraph style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <ClockIcon /> {formatter.date.format(post.published)}
          </SatoriParagraph>
        </Metadata>
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
  return getPostList().then((posts) => posts.map(({ slug }) => ({ slug })));
}
