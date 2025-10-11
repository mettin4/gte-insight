// Mock data for GTE Insight Dashboard

export interface KPIData {
  totalTokensCreated: number;
  totalTokensGraduated: number;
  totalVolumePerpetual: number;
  totalVolumeSwap: number;
  totalFeesEarned: number;
}

export interface DailyMetric {
  date: string;
  value: number;
}

export interface ChartData {
  dailyFees: DailyMetric[];
  dailyVolume: DailyMetric[];
  dailyTokensCreated: DailyMetric[];
  dailyLongPositions: DailyMetric[];
  dailyShortPositions: DailyMetric[];
  dailyTotalVolume: DailyMetric[];
}

// Generate mock data for the last 30 days
const generateDailyData = (baseValue: number, variance: number): DailyMetric[] => {
  const data: DailyMetric[] = [];
  const today = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const randomVariance = (Math.random() - 0.5) * variance;
    const trendFactor = (30 - i) / 30; // Upward trend
    const value = baseValue + (baseValue * trendFactor * 0.5) + randomVariance;
    
    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.max(0, Math.round(value * 100) / 100)
    });
  }
  
  return data;
};

// KPI Summary Data
export const mockKPIData: KPIData = {
  totalTokensCreated: 1247,
  totalTokensGraduated: 342,
  totalVolumePerpetual: 45678234.56,
  totalVolumeSwap: 23456789.12,
  totalFeesEarned: 234567.89
};

// Chart Data
export const mockChartData: ChartData = {
  dailyFees: generateDailyData(8000, 2000),
  dailyVolume: generateDailyData(1500000, 400000),
  dailyTokensCreated: generateDailyData(40, 15),
  dailyLongPositions: generateDailyData(2500, 600),
  dailyShortPositions: generateDailyData(1800, 500),
  dailyTotalVolume: generateDailyData(2500000, 600000)
};

// Helper function to format currency
export const formatCurrency = (value: number): string => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(2)}M`;
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(2)}K`;
  }
  return `$${value.toFixed(2)}`;
};

// Helper function to format number with commas
export const formatNumber = (value: number): string => {
  return value.toLocaleString('en-US');
};

// Calculate percentage change (mock) - using seeded value to avoid hydration mismatch
export const calculateChange = (current: number): number => {
  // Use the current value to generate a consistent "random" change
  const seed = current % 100;
  return (seed / 100) * 30 - 10;
};

