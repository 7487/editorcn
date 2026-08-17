"use client";

import { useCallback } from "react";

export type FeedbackType = string;

export interface UseFeedbackOptions {
  sound?: FeedbackType;
  haptic?: boolean;
}

export const useFeedback = (_options: UseFeedbackOptions = {}) => {
  return useCallback(() => {
    // Placeholder - audio/haptics system not included
  }, []);
};
