import { ReactNode } from 'react';

export function isEmptyNode(node: ReactNode) {
  return node === null || node === undefined || typeof node === 'boolean';
}
