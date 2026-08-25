import { useSyncExternalStore } from "react";

const noop = (): void => undefined;

const subscribe = () => noop;

export const useIsMac = () =>
  useSyncExternalStore(
    subscribe,
    () => navigator.platform.toUpperCase().includes("MAC"),
    () => true
  );
