"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Tabs } from "@/components/ui/vercel-tabs";
import { 
  generateHistoricalEvents,
  getGlobalEventIndex,
  generateDeterministicEvent,
  type LaunchpadEvent,
  type TradeEvent,
  type SwapEvent
} from "@/lib/terminalData";
import { useRealtimeEventCounts } from "@/hooks/useRealtimeEventCounts";
import { ArrowLeft } from "lucide-react";

type AllEvents = (LaunchpadEvent | TradeEvent | SwapEvent) & { 
  eventType: 'launchpad' | 'trade' | 'swap' 
};

const tabs = [
  { id: "all", label: "All" },
  { id: "token-created", label: "Token Created" },
  { id: "token-graduated", label: "Token Graduated" },
  { id: "long", label: "Long Positions" },
  { id: "short", label: "Short Positions" },
  { id: "swaps", label: "Swaps" },
];

export default function TerminalPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [allEvents, setAllEvents] = useState<AllEvents[]>([]);
  const [lastEventIndex, setLastEventIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Use realtime event counts
  const eventCounts = useRealtimeEventCounts();

  // Generate events with global sync
  useEffect(() => {
    // Load initial historical events (100 events - more data!)
    const historicalEvents = generateHistoricalEvents(100);
    const typedEvents: AllEvents[] = historicalEvents.map(event => {
      if ('type' in event && (event.type === 'launched' || event.type === 'graduated' || event.type === 'about_to_graduate')) {
        return { ...event, eventType: 'launchpad' as const };
      } else if ('leverage' in event) {
        return { ...event, eventType: 'trade' as const };
      } else {
        return { ...event, eventType: 'swap' as const };
      }
    });
    
    setAllEvents(typedEvents);
    setLastEventIndex(getGlobalEventIndex());

    // Check for new events every 500ms
    const interval = setInterval(() => {
      const currentIndex = getGlobalEventIndex();
      
      if (currentIndex > lastEventIndex) {
        // Generate all missed events
        const newEvents: AllEvents[] = [];
        for (let i = lastEventIndex + 1; i <= currentIndex; i++) {
          const event = generateDeterministicEvent(i);
          let typedEvent: AllEvents;
          
          if ('type' in event && (event.type === 'launched' || event.type === 'graduated' || event.type === 'about_to_graduate')) {
            typedEvent = { ...event, eventType: 'launchpad' as const };
          } else if ('leverage' in event) {
            typedEvent = { ...event, eventType: 'trade' as const };
          } else {
            typedEvent = { ...event, eventType: 'swap' as const };
          }
          
          newEvents.push(typedEvent);
        }
        
        // Keep all events, don't slice - let them accumulate infinitely
        setAllEvents(prev => [...newEvents, ...prev]);
        setLastEventIndex(currentIndex);
      }
    }, 500); // Check every 500ms

    return () => clearInterval(interval);
  }, [lastEventIndex]);

  // Removed auto-scroll - let users control their own scroll position

  const formatTime = (date: Date) => {
    const timeStr = date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: false 
    });
    const dateStr = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
    return `${dateStr} ${timeStr}`;
  };

  const renderLaunchpadEvent = (event: LaunchpadEvent) => {
    const icons = {
      launched: '🚀',
      graduated: '🎓',
      about_to_graduate: '⚡'
    };
    
    const colors = {
      launched: 'text-[var(--accent-cyan)]',
      graduated: 'text-[var(--accent-green)]',
      about_to_graduate: 'text-[var(--primary-orange)]'
    };

    return (
      <div key={event.id} className="flex items-start gap-3 p-4 hover:bg-[var(--bg-card-hover)] transition-colors border-l-2 border-transparent hover:border-[var(--primary-orange)] animate-fadeIn">
        <span className="text-xl">{icons[event.type]}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className={`font-semibold ${colors[event.type]}`}>
              {event.tokenName} ({event.tokenSymbol})
            </span>
            <span className="px-2 py-0.5 text-xs rounded bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)]">
              Launchpad
            </span>
            <span className="text-[var(--text-muted)] text-xs ml-auto">
              {formatTime(event.timestamp)}
            </span>
          </div>
          <p className="text-sm text-[var(--text-secondary)]">
            {event.type === 'launched' && `Launched at ${event.data?.initialPrice} • MC: ${event.data?.marketCap}`}
            {event.type === 'graduated' && 'Successfully graduated to CLOB!'}
            {event.type === 'about_to_graduate' && `${event.data?.progress}% progress - About to graduate`}
          </p>
        </div>
      </div>
    );
  };

  const renderTradeEvent = (event: TradeEvent) => {
    return (
      <div key={event.id} className="flex items-start gap-3 p-4 hover:bg-[var(--bg-card-hover)] transition-colors border-l-2 border-transparent hover:border-[var(--primary-orange)] animate-fadeIn">
        <span className="text-xl">🐋</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className={`font-semibold ${event.type === 'long' ? 'text-[var(--accent-green)]' : 'text-[var(--accent-red)]'}`}>
              {event.type.toUpperCase()} {event.asset}
            </span>
            <span className="px-2 py-0.5 text-xs rounded bg-[var(--primary-orange)]/10 text-[var(--primary-orange)]">
              {event.leverage}
            </span>
            <span className="px-2 py-0.5 text-xs rounded bg-[var(--accent-green)]/10 text-[var(--accent-green)]">
              Trade
            </span>
            <span className="text-[var(--text-muted)] text-xs ml-auto">
              {formatTime(event.timestamp)}
            </span>
          </div>
          <p className="text-sm text-[var(--text-secondary)]">
            Whale opened {event.amount} position
          </p>
        </div>
      </div>
    );
  };

  const renderSwapEvent = (event: SwapEvent) => {
    return (
      <div key={event.id} className="flex items-start gap-3 p-4 hover:bg-[var(--bg-card-hover)] transition-colors border-l-2 border-transparent hover:border-[var(--primary-orange)] animate-fadeIn">
        <span className="text-xl">💱</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="font-semibold text-[var(--text-primary)]">
              {event.fromToken} → {event.toToken}
            </span>
            <span className="px-2 py-0.5 text-xs rounded bg-[var(--accent-red)]/10 text-[var(--accent-red)]">
              Swap
            </span>
            <span className="text-[var(--text-muted)] text-xs ml-auto">
              {formatTime(event.timestamp)}
            </span>
          </div>
          <p className="text-sm text-[var(--text-secondary)]">
            {event.amount} {event.fromToken} swapped to {event.toToken}
          </p>
        </div>
      </div>
    );
  };

  const renderEvent = (event: AllEvents) => {
    if (event.eventType === 'launchpad') {
      return renderLaunchpadEvent(event as LaunchpadEvent);
    } else if (event.eventType === 'trade') {
      return renderTradeEvent(event as TradeEvent);
    } else {
      return renderSwapEvent(event as SwapEvent);
    }
  };

  const filteredEvents = activeTab === 'all' 
    ? allEvents 
    : allEvents.filter(e => {
        if (activeTab === 'token-created') {
          return e.eventType === 'launchpad' && 'type' in e && e.type === 'launched';
        }
        if (activeTab === 'token-graduated') {
          return e.eventType === 'launchpad' && 'type' in e && e.type === 'graduated';
        }
        if (activeTab === 'long') {
          return e.eventType === 'trade' && 'type' in e && e.type === 'long';
        }
        if (activeTab === 'short') {
          return e.eventType === 'trade' && 'type' in e && e.type === 'short';
        }
        if (activeTab === 'swaps') return e.eventType === 'swap';
        return true;
      });

  return (
    <div className="min-h-screen p-4 md:p-8 lg:p-12 flex flex-col">
      {/* Header */}
      <header className="mb-8 md:mb-12">
        <div className="flex items-center justify-between mb-6">
          {/* Back to Dashboard */}
          <Link 
            href="/"
            className="group inline-flex items-center gap-2.5 text-base font-medium text-[var(--text-secondary)] hover:text-[var(--primary-orange)] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Dashboard</span>
          </Link>

          {/* Stats Mini Cards */}
          <div className="flex gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--accent-cyan)]">
                {eventCounts.launchpad}
              </div>
              <div className="text-xs text-[var(--text-muted)] uppercase tracking-wide">Tokens</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--accent-green)]">
                {eventCounts.trades}
              </div>
              <div className="text-xs text-[var(--text-muted)] uppercase tracking-wide">Trades</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--accent-red)]">
                {eventCounts.swaps}
              </div>
              <div className="text-xs text-[var(--text-muted)] uppercase tracking-wide">Swaps</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs 
          tabs={tabs} 
          onTabChange={(tabId) => setActiveTab(tabId)}
        />
      </header>

      {/* Events Feed */}
      <div className="flex-1 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] overflow-hidden hover:border-[var(--border-color-hover)] transition-colors">
        <div 
          ref={scrollRef}
          className="max-h-[calc(100vh-320px)] overflow-y-auto divide-y divide-[var(--border-color)]"
        >
          {filteredEvents.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-4xl mb-4">📡</div>
              <p className="text-[var(--text-muted)]">Waiting for events...</p>
            </div>
          ) : (
            filteredEvents.map(renderEvent)
          )}
        </div>
      </div>


      {/* Footer - Fixed at bottom */}
      <footer className="mt-8 pt-6 border-t border-[var(--border-color)] text-center shrink-0">
        <p className="text-[var(--text-muted)] text-sm">
          Powered by{" "}
          <a 
            href="https://gte.xyz" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[var(--primary-orange)] hover:text-[var(--primary-orange-light)] transition-colors font-semibold"
          >
            GTE.xyz
          </a>
          {" "}Community
        </p>
      </footer>
    </div>
  );
}

