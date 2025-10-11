// Backend data models and types

export interface KPIMetrics {
  totalTokensCreated: number;
  totalTokensGraduated: number;
  totalVolumePerpetual: number;
  totalVolumeSwap: number;
  totalFeesEarned: number;
  totalLongPositions: number;
  totalShortPositions: number;
  timestamp: Date;
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

export interface LaunchpadEvent {
  id: string;
  type: 'launched' | 'graduated' | 'about_to_graduate';
  tokenName: string;
  tokenSymbol: string;
  tokenAddress?: string;
  timestamp: Date;
  data?: {
    initialPrice?: string;
    marketCap?: string;
    progress?: number;
    volume24h?: number;
  };
}

export interface TradeEvent {
  id: string;
  type: 'long' | 'short';
  amount: string;
  asset: string;
  leverage?: string;
  timestamp: Date;
  isWhale: boolean;
  trader?: string;
  entryPrice?: number;
  currentPnL?: number;
}

export interface SwapEvent {
  id: string;
  fromToken: string;
  toToken: string;
  amount: string;
  timestamp: Date;
  trader?: string;
  txHash?: string;
  slippage?: number;
}

export type AllEvents = LaunchpadEvent | TradeEvent | SwapEvent;

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: Date;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
  timestamp: Date;
}


