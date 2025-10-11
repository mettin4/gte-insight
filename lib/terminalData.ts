// Terminal feed mock data generator

// Global start time for synchronized events across all users
const GLOBAL_START_TIME = new Date('2024-12-01T00:00:00Z').getTime();

export type LaunchpadEvent = {
  id: string;
  type: 'launched' | 'graduated' | 'about_to_graduate';
  tokenName: string;
  tokenSymbol: string;
  timestamp: Date;
  data?: {
    initialPrice?: string;
    marketCap?: string;
    progress?: number;
  };
};

export type TradeEvent = {
  id: string;
  type: 'long' | 'short';
  amount: string;
  asset: string;
  leverage?: string;
  timestamp: Date;
  isWhale: boolean;
};

export type SwapEvent = {
  id: string;
  fromToken: string;
  toToken: string;
  amount: string;
  timestamp: Date;
};

const tokenNames = [
  'PepeMax', 'DogeKing', 'MoonShot', 'RocketFuel', 'DiamondHands',
  'ShibaElite', 'WhaleMoney', 'GigaChad', 'BasedToken', 'AlphaCoin',
  'SigmaToken', 'MegaETH', 'TurboApe', 'LaserEyes', 'SpaceMonkey',
  'MemeLord', 'ChadCoin', 'BullRun', 'MoonRider', 'GalaxyToken',
  'NovaFinance', 'ProtoDAO', 'MetaVerse', 'CryptoKing', 'EliteToken',
  'QuantumLeap', 'SolarFlare', 'NeonPulse', 'HyperDrive', 'VelocityX',
  'ApexTrader', 'InfinityPool', 'NitroBoost', 'PrimeVault', 'UltraSwap',
  'CosmicRay', 'ThunderBolt', 'PhoenixRise', 'TitanForge', 'OmegaFund'
];

const assets = ['ETH', 'BTC', 'SOL', 'USDC', 'USDT', 'WBTC', 'MATIC', 'AVAX', 'ARB', 'OP'];

function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomAmount(min: number, max: number): string {
  const amount = Math.random() * (max - min) + min;
  if (amount >= 1000000) return `$${(amount / 1000000).toFixed(2)}M`;
  if (amount >= 1000) return `$${(amount / 1000).toFixed(1)}K`;
  return `$${amount.toFixed(0)}`;
}

// Generate Launchpad Events
export function generateLaunchpadEvent(): LaunchpadEvent {
  const types: LaunchpadEvent['type'][] = ['launched', 'graduated', 'about_to_graduate'];
  const type = randomElement(types);
  const tokenName = randomElement(tokenNames);
  
  return {
    id: Math.random().toString(36).substring(7),
    type,
    tokenName,
    tokenSymbol: tokenName.substring(0, 4).toUpperCase(),
    timestamp: new Date(),
    data: type === 'launched' ? {
      initialPrice: `$${(Math.random() * 0.1).toFixed(4)}`,
      marketCap: randomAmount(10000, 500000)
    } : type === 'about_to_graduate' ? {
      progress: Math.floor(Math.random() * 20) + 80 // 80-100%
    } : undefined
  };
}

// Generate Trade Events
export function generateTradeEvent(): TradeEvent {
  const types: TradeEvent['type'][] = ['long', 'short'];
  
  return {
    id: Math.random().toString(36).substring(7),
    type: randomElement(types),
    amount: randomAmount(1000000, 10000000),
    asset: randomElement(assets),
    leverage: `${Math.floor(Math.random() * 10) + 1}x`,
    timestamp: new Date(),
    isWhale: true
  };
}

// Generate Swap Events
export function generateSwapEvent(): SwapEvent {
  const tokens = ['ETH', 'USDC', 'USDT', 'WBTC', 'DAI', 'MATIC', 'AVAX', 'ARB', 'OP', 'LINK'];
  const from = randomElement(tokens);
  let to = randomElement(tokens);
  while (to === from) {
    to = randomElement(tokens);
  }
  
  return {
    id: Math.random().toString(36).substring(7),
    fromToken: from,
    toToken: to,
    amount: randomAmount(100000, 5000000),
    timestamp: new Date(),
  };
}

// Generate initial historical events based on global time
export function generateHistoricalEvents(count: number): Array<LaunchpadEvent | TradeEvent | SwapEvent> {
  const events: Array<LaunchpadEvent | TradeEvent | SwapEvent> = [];
  const now = Date.now();
  
  // Generate events going back in time - weighted for more tokens
  for (let i = 0; i < count; i++) {
    const secondsAgo = (i * 2); // Events every 2 seconds going back
    const eventTime = new Date(now - (secondsAgo * 1000));
    
    const random = Math.random();
    let event: LaunchpadEvent | TradeEvent | SwapEvent;
    
    // 25% launched, 25% graduated, 20% long, 15% short, 15% swaps
    if (random < 0.25) {
      // Launched token (25%)
      const tokenName = randomElement(tokenNames);
      event = {
        id: `${eventTime.getTime()}-${Math.random().toString(36).substring(7)}`,
        type: 'launched',
        tokenName,
        tokenSymbol: tokenName.substring(0, 4).toUpperCase(),
        timestamp: eventTime,
        data: {
          initialPrice: `$${(Math.random() * 0.1).toFixed(4)}`,
          marketCap: randomAmount(10000, 500000)
        }
      };
    } else if (random < 0.5) {
      // Graduated token (25%)
      const tokenName = randomElement(tokenNames);
      event = {
        id: `${eventTime.getTime()}-${Math.random().toString(36).substring(7)}`,
        type: 'graduated',
        tokenName,
        tokenSymbol: tokenName.substring(0, 4).toUpperCase(),
        timestamp: eventTime
      };
    } else if (random < 0.7) {
      // Long position (20%)
      event = {
        id: `${eventTime.getTime()}-${Math.random().toString(36).substring(7)}`,
        type: 'long',
        amount: randomAmount(1000000, 10000000),
        asset: randomElement(assets),
        leverage: `${Math.floor(Math.random() * 10) + 1}x`,
        timestamp: eventTime,
        isWhale: true
      };
    } else if (random < 0.85) {
      // Short position (15%)
      event = {
        id: `${eventTime.getTime()}-${Math.random().toString(36).substring(7)}`,
        type: 'short',
        amount: randomAmount(1000000, 10000000),
        asset: randomElement(assets),
        leverage: `${Math.floor(Math.random() * 10) + 1}x`,
        timestamp: eventTime,
        isWhale: true
      };
    } else {
      // Swap (15%)
      event = generateSwapEvent();
      event.timestamp = eventTime;
      event.id = `${eventTime.getTime()}-${Math.random().toString(36).substring(7)}`;
    }
    
    events.push(event);
  }
  
  return events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

// Get the event index that should be generated now based on global time
export function getGlobalEventIndex(): number {
  const now = Date.now();
  const secondsSinceStart = (now - GLOBAL_START_TIME) / 1000;
  // One event every 2 seconds
  return Math.floor(secondsSinceStart / 2);
}

// Generate deterministic event based on global index
export function generateDeterministicEvent(index: number): LaunchpadEvent | TradeEvent | SwapEvent {
  // Use index as seed for consistent randomness - balanced distribution
  const seed = index % 20; // 0-19 for better distribution
  const timestamp = new Date(GLOBAL_START_TIME + (index * 2000)); // Every 2 seconds
  
  let event: LaunchpadEvent | TradeEvent | SwapEvent;
  
  // 25% launched, 25% graduated, 20% long, 15% short, 15% swaps
  if (seed < 5) {
    // Generate launched token (25%)
    const tokenName = randomElement(tokenNames);
    event = {
      id: `global-${index}`,
      type: 'launched',
      tokenName,
      tokenSymbol: tokenName.substring(0, 4).toUpperCase(),
      timestamp,
      data: {
        initialPrice: `$${(Math.random() * 0.1).toFixed(4)}`,
        marketCap: randomAmount(10000, 500000)
      }
    };
  } else if (seed < 10) {
    // Generate graduated token (25%)
    const tokenName = randomElement(tokenNames);
    event = {
      id: `global-${index}`,
      type: 'graduated',
      tokenName,
      tokenSymbol: tokenName.substring(0, 4).toUpperCase(),
      timestamp
    };
  } else if (seed < 14) {
    // Generate long position (20%)
    event = {
      id: `global-${index}`,
      type: 'long',
      amount: randomAmount(1000000, 10000000),
      asset: randomElement(assets),
      leverage: `${Math.floor(Math.random() * 10) + 1}x`,
      timestamp,
      isWhale: true
    };
  } else if (seed < 17) {
    // Generate short position (15%)
    event = {
      id: `global-${index}`,
      type: 'short',
      amount: randomAmount(1000000, 10000000),
      asset: randomElement(assets),
      leverage: `${Math.floor(Math.random() * 10) + 1}x`,
      timestamp,
      isWhale: true
    };
  } else {
    // Generate swap (15%)
    const tokens = ['ETH', 'USDC', 'USDT', 'WBTC', 'DAI', 'MATIC', 'AVAX', 'ARB', 'OP', 'LINK'];
    const fromIndex = index % tokens.length;
    const toIndex = (index + 1) % tokens.length;
    
    event = {
      id: `global-${index}`,
      fromToken: tokens[fromIndex],
      toToken: tokens[toIndex],
      amount: randomAmount(100000, 5000000),
      timestamp
    };
  }
  
  event.timestamp = timestamp;
  event.id = `global-${index}`;
  
  return event;
}

