import nodePath from 'node:path';

export function getPublicPath(path: string) {
  return nodePath.join(process.cwd(), 'public', path.replace(/^\/+/, ''));
}

export function getStaticPath(path: string) {
  return nodePath.join(
    process.cwd(),
    process.env.NODE_ENV === 'development' ? '.next/dev/static' : '.next/static',
    path.replace(/^\/?(_next\/static\/)?/, ''),
  );
}
