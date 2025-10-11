"use client";

import Link from "next/link";
import KPICard from "@/components/KPICard";
import LineChart from "@/components/charts/LineChart";
import BarChart from "@/components/charts/BarChart";
import { mockChartData, formatCurrency, formatNumber } from "@/lib/mockData";
import { useRealtimeMetrics } from "@/hooks/useRealtimeMetrics";
import { Coins, TrendingUp, TrendingDown, Repeat, ArrowRightLeft, DollarSign } from "lucide-react";

export default function Home() {
  // Use realtime animated metrics
  const realtimeMetrics = useRealtimeMetrics();
  return (
    <div className="min-h-screen p-4 md:p-8 lg:p-12 flex flex-col">
      {/* Header */}
      <header className="mb-8 md:mb-12">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
              GTE Insight
            </h1>
            {/* Live Indicator - Just the dot */}
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-green)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--accent-green)]"></span>
            </span>
          </div>
          {/* Terminal Link */}
          <Link 
            href="/terminal"
            className="group relative px-5 py-2.5 rounded-lg bg-gradient-to-r from-[var(--primary-orange)] to-[var(--primary-orange-light)] hover:from-[var(--primary-orange-light)] hover:to-[var(--primary-orange)] transition-all duration-300 hover:shadow-xl hover:shadow-[var(--primary-orange)]/40 flex items-center gap-2.5 overflow-hidden"
          >
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span className="relative text-sm font-semibold text-white tracking-wide">Terminal</span>
          </Link>
        </div>
                <p className="text-[var(--text-secondary)] text-sm md:text-base">
                  Real-time insights into GTE&apos;s decentralized trading ecosystem
                </p>
      </header>

      {/* Main Content */}
      <div className="flex-1">
      {/* KPI Cards Grid - 2 rows, 4 columns */}
      <div className="space-y-6 mb-8 md:mb-12">
        {/* Row 1: Volume & Fees */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
          <KPICard
            title="Total Volume"
            value={formatCurrency(realtimeMetrics.totalVolumePerpetual + realtimeMetrics.totalVolumeSwap)}
            change={realtimeMetrics.changes.volumePerpetual}
            icon={Repeat}
            subtitle="Combined trading volume"
            scrollToId="chart-total-volume"
          />
          
          <KPICard
            title="Perpetual Volume"
            value={formatCurrency(realtimeMetrics.totalVolumePerpetual)}
            change={realtimeMetrics.changes.volumePerpetual}
            icon={Repeat}
            subtitle="Total perp trading volume"
            scrollToId="chart-perpetual-volume"
          />
          
          <KPICard
            title="Swap Volume"
            value={formatCurrency(realtimeMetrics.totalVolumeSwap)}
            change={realtimeMetrics.changes.volumeSwap}
            icon={ArrowRightLeft}
            subtitle="Total swap volume"
            scrollToId="chart-swap-volume"
          />
          
          <KPICard
            title="Fees Earned"
            value={formatCurrency(realtimeMetrics.totalFeesEarned)}
            change={realtimeMetrics.changes.feesEarned}
            icon={DollarSign}
            subtitle="Total protocol fees"
            scrollToId="chart-fees-earned"
          />
        </div>

        {/* Row 2: Positions & Tokens */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
          <KPICard
            title="Open Long Positions"
            value={formatNumber(Math.floor(realtimeMetrics.totalTokensCreated * 0.6))}
            change={2.5}
            icon={TrendingUp}
            subtitle="All long positions"
            scrollToId="chart-long-positions"
          />
          
          <KPICard
            title="Open Short Positions"
            value={formatNumber(Math.floor(realtimeMetrics.totalTokensCreated * 0.4))}
            change={1.8}
            icon={TrendingDown}
            subtitle="All short positions"
            scrollToId="chart-short-positions"
          />
          
          <KPICard
            title="Total Tokens Created"
            value={formatNumber(Math.floor(realtimeMetrics.totalTokensCreated))}
            change={realtimeMetrics.changes.tokensCreated}
            icon={Coins}
            subtitle="All-time tokens launched"
            scrollToId="chart-tokens-created"
          />
          
          <KPICard
            title="Tokens Graduated"
            value={formatNumber(Math.floor(realtimeMetrics.totalTokensGraduated))}
            change={realtimeMetrics.changes.tokensGraduated}
            icon={TrendingUp}
            subtitle="Successfully graduated"
            scrollToId="chart-tokens-graduated"
          />
        </div>
      </div>

      {/* Charts Section - Row 1: Volume & Fees */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        <BarChart
          id="chart-total-volume"
          data={mockChartData.dailyTotalVolume}
          title="Daily Total Volume"
          color="#FF7817"
          formatValue={(value) => formatCurrency(value)}
        />
        
        <BarChart
          id="chart-perpetual-volume"
          data={mockChartData.dailyVolume}
          title="Daily Perpetual Volume"
          color="#00D4FF"
          formatValue={(value) => formatCurrency(value)}
        />
      </div>

      {/* Charts Section - Row 2: Swap & Fees */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        <LineChart
          id="chart-swap-volume"
          data={mockChartData.dailyVolume}
          title="Daily Swap Volume"
          color="#00D4FF"
          areaColor="rgba(0, 212, 255, 0.1)"
          formatValue={(value) => formatCurrency(value)}
        />
        
        <LineChart
          id="chart-fees-earned"
          data={mockChartData.dailyFees}
          title="Daily Fees Earned"
          color="#FF7817"
          areaColor="rgba(255, 120, 23, 0.1)"
          formatValue={(value) => formatCurrency(value)}
        />
      </div>

      {/* Charts Section - Row 3: Positions */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        <BarChart
          id="chart-long-positions"
          data={mockChartData.dailyLongPositions}
          title="Daily Long Positions"
          color="#00FF88"
          formatValue={(value) => `${value.toFixed(0)} positions`}
        />
        
        <BarChart
          id="chart-short-positions"
          data={mockChartData.dailyShortPositions}
          title="Daily Short Positions"
          color="#FF4444"
          formatValue={(value) => `${value.toFixed(0)} positions`}
        />
      </div>

      {/* Charts Section - Row 4: Tokens */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        <LineChart
          id="chart-tokens-created"
          data={mockChartData.dailyTokensCreated}
          title="Daily Tokens Created"
          color="#00FF88"
          areaColor="rgba(0, 255, 136, 0.1)"
          formatValue={(value) => `${value.toFixed(0)} tokens`}
        />
        
        <LineChart
          id="chart-tokens-graduated"
          data={mockChartData.dailyTokensCreated}
          title="Daily Tokens Graduated"
          color="#FF7817"
          areaColor="rgba(255, 120, 23, 0.1)"
          formatValue={(value) => `${value.toFixed(0)} tokens`}
        />
      </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-[var(--border-color)] text-center shrink-0">
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
