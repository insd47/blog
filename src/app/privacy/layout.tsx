import { PropsWithChildren } from 'react';
import HeaderSlot, { HeaderSlotPoint } from '@/components/header/slot';
import { StickyNoteIcon } from 'lucide-react';

export default function PrivacyLayout({ children }: PropsWithChildren) {
  return (
    <main>
      <article>
        <HeaderSlotPoint asChild>
          <header className="border-b px-6 py-7.5 font-display">
            <h1 className="text-2xl font-bold">개인정보처리방침</h1>
            <time className="text-foreground/60 text-[13px]" dateTime="2025-11-08">
              시행일자: 2025년 11월 8일
            </time>
          </header>
        </HeaderSlotPoint>

        <div className="*:px-6 *:mb-5 pb-8 text-[15px] text-muted-foreground">{children}</div>
      </article>

      <HeaderSlot className="flex items-center gap-2 text-[13px] font-display">
        <StickyNoteIcon className="size-3.5 fill-muted shrink-0" />
        <p className="truncate">개인정보처리방침</p>
      </HeaderSlot>
    </main>
  );
}
