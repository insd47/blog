'use client';

import { createContext, PropsWithChildren, use } from 'react';

export function ImageSizesProvider({ children, sizes, quality }: PropsWithChildren<Value>) {
  return <Context value={{ sizes, quality }}>{children}</Context>;
}

export function useImageSizes() {
  return use(Context);
}

const Context = createContext<Value>({});

interface Value {
  sizes?: string;
  quality?: number;
}
