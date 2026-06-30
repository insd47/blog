import { ImageResponse } from 'next/og';
import { getPost, getPostList } from '@/lib/content/posts';
import { Thumbnail, Content, Metadata } from '@/app/posts/[slug]/_opengraph/views';
import { OGRoot, OGTitle, OGParagraph, OGLogo } from '@/components/opengraph';
import { getFonts } from '@/lib/opengraph/fonts';
import { ClockIcon, TagIcon } from '@/app/posts/[slug]/_opengraph/icons';
import formatter from '@/lib/utils/formatter';

export default async function OpenGraphImage({ params }: PageProps<'/posts/[slug]'>) {
  const { slug } = await params;
  const fonts = await getFonts();
  const post = await getPost(slug);

  return new ImageResponse(
    <OGRoot>
      <Thumbnail src={post.thumbnail.src} />
      <Content>
        <OGTitle style={{ flex: 1 }}>{post.title}</OGTitle>
        <Metadata>
          <OGParagraph style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <TagIcon />
            {post.tags.join(' · ')}
          </OGParagraph>
          <OGParagraph style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <ClockIcon /> {formatter.date.format(post.published)}
          </OGParagraph>
        </Metadata>
      </Content>

      <OGLogo />
    </OGRoot>,
    { ...size, fonts },
  );
}

export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };
export const dynamicParams = false;

export async function generateStaticParams() {
  return getPostList().then((posts) => posts.map(({ slug }) => ({ slug })));
}
