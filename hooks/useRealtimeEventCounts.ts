"use client";

import { useState, useEffect } from "react";

// Fixed start date for all users - set to a recent time to keep numbers reasonable
const GLOBAL_START_TIME = Date.now() - (2 * 60 * 60 * 1000); // 2 hours ago

const INITIAL_VALUES = {
  launchpad: 0,
  trades: 0,
  swaps: 0
};

// Increment rates per minute
const RATES_PER_MINUTE = {
  launchpad: 10,  // 10 events per minute
  trades: 40,     // 40 events per minute
  swaps: 30       // 30 events per minute
};

// Convert to per-second rates
const RATES_PER_SECOND = {
  launchpad: RATES_PER_MINUTE.launchpad / 60,
  trades: RATES_PER_MINUTE.trades / 60,
  swaps: RATES_PER_MINUTE.swaps / 60
};

export interface EventCounts {
  launchpad: number;
  trades: number;
  swaps: number;
}

export function useRealtimeEventCounts() {
  const [counts, setCounts] = useState<EventCounts>(INITIAL_VALUES);

  useEffect(() => {
    // Calculate initial values immediately after mount
    const updateCounts = () => {
      const secondsElapsed = (Date.now() - GLOBAL_START_TIME) / 1000;

      const newLaunchpad = INITIAL_VALUES.launchpad + (secondsElapsed * RATES_PER_SECOND.launchpad);
      const newTrades = INITIAL_VALUES.trades + (secondsElapsed * RATES_PER_SECOND.trades);
      const newSwaps = INITIAL_VALUES.swaps + (secondsElapsed * RATES_PER_SECOND.swaps);

      setCounts({
        launchpad: Math.floor(newLaunchpad),
        trades: Math.floor(newTrades),
        swaps: Math.floor(newSwaps)
      });
    };

    // Update immediately
    updateCounts();

    // Then update every 100ms for smooth animation
    const interval = setInterval(updateCounts, 100);

    return () => clearInterval(interval);
  }, []);

  return counts;
}

