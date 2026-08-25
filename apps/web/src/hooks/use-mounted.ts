import { useSyncExternalStore } from "react";

const noop = (): void => undefined;

const subscribe = () => noop;

export const useMounted = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
