export type Event = {
  name: string;
  properties?: Record<string, string | number | boolean | null>;
};

export const trackEvent = (_input: Event): void => {
  // no-op: analytics not configured
};
