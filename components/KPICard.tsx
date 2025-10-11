"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string;
  change?: number;
  icon: LucideIcon;
  subtitle?: string;
  scrollToId?: string;
}

export default function KPICard({ title, value, change, icon: Icon, subtitle, scrollToId }: KPICardProps) {
  const isPositive = change !== undefined && change >= 0;
  
  const handleClick = () => {
    if (scrollToId) {
      const element = document.getElementById(scrollToId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };
  
  return (
    <div 
      onClick={handleClick}
      className={cn(
        "group relative overflow-hidden rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] p-6 transition-all duration-300 hover:border-[var(--primary-orange)] hover:shadow-lg hover:shadow-[var(--primary-orange)]/20",
        scrollToId && "cursor-pointer"
      )}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-orange)]/5 to-transparent" />
      </div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[var(--primary-orange)]/10 text-[var(--primary-orange)] group-hover:bg-[var(--primary-orange)]/20 transition-colors">
              <Icon className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wide">
              {title}
            </h3>
          </div>
          
          {change !== undefined && (
            <div className={cn(
              "flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md",
              isPositive 
                ? "text-[var(--accent-green)] bg-[var(--accent-green)]/10" 
                : "text-[var(--accent-red)] bg-[var(--accent-red)]/10"
            )}>
              <span>{isPositive ? "↑" : "↓"}</span>
              <span>{Math.abs(change).toFixed(1)}%</span>
            </div>
          )}
        </div>
        
        {/* Value */}
        <div className="mb-2">
          <p className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">
            {value}
          </p>
        </div>
        
        {/* Subtitle */}
        {subtitle && (
          <p className="text-xs text-[var(--text-muted)]">
            {subtitle}
          </p>
        )}
      </div>
      
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--primary-orange)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}

