"use client";

import { useState, useEffect } from "react";

export interface RealtimeKPIData {
  totalTokensCreated: number;
  totalTokensGraduated: number;
  totalVolumePerpetual: number;
  totalVolumeSwap: number;
  totalFeesEarned: number;
  changes: {
    tokensCreated: number;
    tokensGraduated: number;
    volumePerpetual: number;
    volumeSwap: number;
    feesEarned: number;
  };
}

// Fixed start date for all users - set to recent time for small numbers
const GLOBAL_START_TIME = Date.now() - (30 * 60 * 1000); // 30 minutes ago

const INITIAL_VALUES = {
  totalTokensCreated: 0,
  totalTokensGraduated: 0,
  totalVolumePerpetual: 0,
  totalVolumeSwap: 0,
  totalFeesEarned: 0
};

// Increment rates per minute
const RATES_PER_MINUTE = {
  tokensCreated: 10, // 10 tokens per minute
  tokensGraduated: 1, // 1 token per minute
  volumePerpetual: 1000000, // $1M per minute
  volumeSwap: 500000, // $500K per minute
  feesEarned: 10000 / 60 // $10K per hour = ~$166.67 per minute
};

// Convert to per-second rates
const RATES_PER_SECOND = {
  tokensCreated: RATES_PER_MINUTE.tokensCreated / 60,
  tokensGraduated: RATES_PER_MINUTE.tokensGraduated / 60,
  volumePerpetual: RATES_PER_MINUTE.volumePerpetual / 60,
  volumeSwap: RATES_PER_MINUTE.volumeSwap / 60,
  feesEarned: RATES_PER_MINUTE.feesEarned / 60
};

// Calculate percentage change based on growth rate
function calculatePercentageChange(currentValue: number, ratePerMinute: number): number {
  // Percentage = (rate per minute / current value) * 100
  return (ratePerMinute / currentValue) * 100;
}

export function useRealtimeMetrics() {
  const [metrics, setMetrics] = useState<RealtimeKPIData>({
    ...INITIAL_VALUES,
    changes: {
      tokensCreated: 0,
      tokensGraduated: 0,
      volumePerpetual: 0,
      volumeSwap: 0,
      feesEarned: 0
    }
  });
  useEffect(() => {
    
    // Calculate initial values immediately after mount
    const updateMetrics = () => {
      const secondsElapsed = (Date.now() - GLOBAL_START_TIME) / 1000;

      const newTokensCreated = INITIAL_VALUES.totalTokensCreated + (secondsElapsed * RATES_PER_SECOND.tokensCreated);
      const newTokensGraduated = INITIAL_VALUES.totalTokensGraduated + (secondsElapsed * RATES_PER_SECOND.tokensGraduated);
      const newVolumePerpetual = INITIAL_VALUES.totalVolumePerpetual + (secondsElapsed * RATES_PER_SECOND.volumePerpetual);
      const newVolumeSwap = INITIAL_VALUES.totalVolumeSwap + (secondsElapsed * RATES_PER_SECOND.volumeSwap);
      const newFeesEarned = INITIAL_VALUES.totalFeesEarned + (secondsElapsed * RATES_PER_SECOND.feesEarned);

      setMetrics({
        totalTokensCreated: newTokensCreated,
        totalTokensGraduated: newTokensGraduated,
        totalVolumePerpetual: newVolumePerpetual,
        totalVolumeSwap: newVolumeSwap,
        totalFeesEarned: newFeesEarned,
        changes: {
          tokensCreated: calculatePercentageChange(newTokensCreated, RATES_PER_MINUTE.tokensCreated),
          tokensGraduated: calculatePercentageChange(newTokensGraduated, RATES_PER_MINUTE.tokensGraduated),
          volumePerpetual: calculatePercentageChange(newVolumePerpetual, RATES_PER_MINUTE.volumePerpetual),
          volumeSwap: calculatePercentageChange(newVolumeSwap, RATES_PER_MINUTE.volumeSwap),
          feesEarned: calculatePercentageChange(newFeesEarned, RATES_PER_MINUTE.feesEarned)
        }
      });
    };

    // Update immediately
    updateMetrics();

    // Then update every 100ms for smooth animation
    const interval = setInterval(updateMetrics, 100);

    return () => clearInterval(interval);
  }, []); // No dependencies - always use global time

  return metrics;
}

