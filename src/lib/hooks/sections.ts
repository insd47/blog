'use client';

import { useState, useMemo, useEffect, type MouseEvent } from 'react';
import GithubSlugger from 'github-slugger';

export function useSections(sections: string[]) {
  const [current, setCurrent] = useState('');
  const slugger = new GithubSlugger();

  const slugs = useMemo(
    () => sections.map((text) => [slugger.slug(text), text] as const),
    [sections], // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    if (slugs.length === 0) return;
    let frame = 0;

    function updateCurrent() {
      const offset = 84;
      let [current] = slugs[0];

      for (const [id] of slugs) {
        const e = document.getElementById(current);

        if (e) {
          if (e.getBoundingClientRect().top > offset) break;
          current = id;
        }
      }

      setCurrent(current);
    }

    function schedule() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateCurrent);
    }

    updateCurrent();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [slugs]);

  function scrollTo(event?: MouseEvent<HTMLAnchorElement>, id?: string) {
    event?.preventDefault();

    if (id) {
      const element = document.getElementById(id);
      setCurrent(id);
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      setCurrent('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      console.log('no id,');
    }

    const url = new URL(window.location.href);
    url.hash = id ?? '';
    window.history.pushState(null, '', url);
  }

  return { slugs, current, scrollTo };
}
