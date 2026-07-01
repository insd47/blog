import { getImageProps, ImageProps } from 'next/image';
import { parseSrcset } from 'srcset';

export function getCurrentSrc(p: ImageProps) {
  if (typeof window === 'undefined') return null;

  const { props } = getImageProps(p);
  const fallback = new URL(props.src, window.location.href).href;

  if (!props.srcSet) return fallback;

  const candidates = parseSrcset(props.srcSet, { strict: true });
  if (candidates.length === 0) return fallback;

  if (props.sizes) {
    const sourceSize = parseSizes(props.sizes);
    if (sourceSize === null) return null;

    const src = getSource(
      candidates.map(({ url, width }) => [url, width] as const),
      sourceSize * window.devicePixelRatio,
    );

    return src ? new URL(src, window.location.href).href : null;
  }

  const src = getSource(
    candidates.map(({ url, density, width }) => [url, density ?? (width ? undefined : 1)] as const),
    window.devicePixelRatio,
  );

  return src ? new URL(src, window.location.href).href : null;
}

export function parseSizes(sizes: string) {
  const parts: string[] = [];
  let depth = 0;
  let start = 0;

  for (let i = 0; i < sizes.length; i += 1) {
    const char = sizes[i];

    if (char === '(') depth += 1;
    else if (char === ')') depth = Math.max(0, depth - 1);
    else if (char === ',' && depth === 0) {
      parts.push(sizes.slice(start, i).trim());
      start = i + 1;
    }
  }

  parts.push(sizes.slice(start).trim());

  for (const size of parts) {
    let separator = -1;
    depth = 0;

    for (let i = size.length - 1; i >= 0; i -= 1) {
      const char = size[i];

      if (char === ')') depth += 1;
      else if (char === '(') depth = Math.max(0, depth - 1);
      else if (depth === 0 && /\s/.test(char)) {
        separator = i;
        break;
      }
    }

    const condition = separator === -1 ? '' : size.slice(0, separator).trim();
    const width = separator === -1 ? size : size.slice(separator).trim();

    if (condition && !window.matchMedia(condition).matches) continue;
    if (width === 'auto') return null;

    const element = document.createElement('div');
    element.style.cssText = 'position:absolute;visibility:hidden;contain:strict;width:0;height:0;';
    element.style.width = width;

    if (!element.style.width) return null;

    (document.body ?? document.documentElement).append(element);
    const measured = element.getBoundingClientRect().width;
    element.remove();

    return Number.isFinite(measured) ? measured : null;
  }

  return null;
}

function getSource(
  candidates: readonly (readonly [string, number | undefined])[],
  target: number,
) {
  const sorted = candidates
    .filter((candidate): candidate is readonly [string, number] => Number.isFinite(candidate[1]))
    .sort((a, b) => a[1] - b[1]);

  if (sorted.length !== candidates.length) return null;
  return sorted.find(([, value]) => value >= target)?.[0] ?? sorted.at(-1)?.[0] ?? null;
}
