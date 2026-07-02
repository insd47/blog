import { Figcaption, Figure } from '@/components/mdx/image';
import Loader from '@/components/loader';

export function LoadingIndicatorDemo() {
  return (
    <Figure className="-mt-5">
      <div className="aspect-16/10 w-full flex flex-center bg-foreground/2 border-b">
        <Loader />
      </div>
      <Figcaption>이 블로그에서 사용되는 이미지 로딩 인디케이터</Figcaption>
    </Figure>
  );
}