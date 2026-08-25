import { useCallback, useSyncExternalStore } from "react";

export const useIsMobile = (mobileBreakpoint = 768) => {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const mql = window.matchMedia(`(max-width: ${mobileBreakpoint - 1}px)`);
      mql.addEventListener("change", onStoreChange);
      return () => {
        mql.removeEventListener("change", onStoreChange);
      };
    },
    [mobileBreakpoint]
  );

  return useSyncExternalStore(
    subscribe,
    () => window.innerWidth < mobileBreakpoint,
    () => false
  );
};
