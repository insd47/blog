'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import type { Dispatch, PropsWithChildren, ReactElement, SetStateAction } from 'react';
import { useScrollFrame } from '@/lib/hooks/scroll';

export function HeaderProvider({ children }: PropsWithChildren) {
  const [slot, setSlot] = useState<ReactElement | null>(null);
  const [point, setPoint] = useState<number | null>(null);
  const [offset, setOffset] = useState<number>(0);

  useScrollFrame(() => setOffset(window.scrollY), []);

  const state = useMemo(() => ({ slot, point, offset }), [slot, point, offset]);
  const actions = useMemo(() => ({ setSlot, setPoint }), [setSlot, setPoint]);

  return (
    <ActionsContext value={actions}>
      <StateContext value={state}>{children}</StateContext>
    </ActionsContext>
  );
}

export function useHeaderState() {
  const state = useContext(StateContext);
  if (!state) throw new Error('useHeaderState must be used within a HeaderProvider');
  return state;
}

export function useHeaderActions() {
  const actions = useContext(ActionsContext);
  if (!actions) throw new Error('useHeaderActions must be used within a HeaderProvider');
  return actions;
}

const StateContext = createContext<State | null>(null);
const ActionsContext = createContext<Actions | null>(null);

interface State {
  slot: ReactElement | null;
  point: number | null;
  offset: number;
}

interface Actions {
  setSlot: Dispatch<SetStateAction<ReactElement | null>>;
  setPoint: Dispatch<SetStateAction<number | null>>;
}
