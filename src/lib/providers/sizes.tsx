'use client';

import { createContext, PropsWithChildren, use } from 'react';

export function SizesProvider({ sizes, ...props }: Props) {
  return <Context {...props} value={sizes} />;
}

export function useSizes() {
  return use(Context);
}

const Context = createContext<string | undefined>(undefined);

interface Props extends PropsWithChildren {
  sizes?: string;
}
