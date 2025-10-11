"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactECharts from "echarts-for-react";
import { DailyMetric } from "@/lib/mockData";

interface BarChartProps {
  data: DailyMetric[];
  title: string;
  color?: string;
  formatValue?: (value: number) => string;
  id?: string;
}

export default function BarChart({ 
  data, 
  title, 
  color = "#00D4FF",
  formatValue = (value: number) => value.toLocaleString(),
  id
}: BarChartProps) {
  const option = {
    backgroundColor: "transparent",
    title: {
      text: title,
      textStyle: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: 600
      },
      padding: [20, 20, 10, 20]
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "#1A1A1A",
      borderColor: "#2A2A2A",
      borderWidth: 1,
      textStyle: {
        color: "#FFFFFF"
      },
      axisPointer: {
        type: "shadow",
        shadowStyle: {
          color: "rgba(255, 120, 23, 0.1)"
        }
      },
              formatter: (params: any) => {
        const param = params[0];
        return `
          <div style="padding: 8px;">
            <div style="color: #A0A0A0; font-size: 12px; margin-bottom: 4px;">
              ${param.axisValue}
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="display: inline-block; width: 8px; height: 8px; background: ${color}; border-radius: 50%;"></span>
              <span style="font-weight: 600; font-size: 14px;">
                ${formatValue(param.value)}
              </span>
            </div>
          </div>
        `;
      }
    },
    grid: {
      left: "3%",
      right: "3%",
      bottom: "3%",
      top: "80px",
      containLabel: true
    },
    xAxis: {
      type: "category",
      data: data.map(d => d.date),
      axisLine: {
        lineStyle: {
          color: "#2A2A2A"
        }
      },
      axisLabel: {
        color: "#666666",
        fontSize: 11,
        formatter: (value: string) => {
          const date = new Date(value);
          return `${date.getMonth() + 1}/${date.getDate()}`;
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: "value",
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: "#666666",
        fontSize: 11,
        formatter: (value: number) => {
          if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
          if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
          return value.toString();
        }
      },
      splitLine: {
        lineStyle: {
          color: "#2A2A2A",
          type: "dashed"
        }
      }
    },
    series: [
      {
        name: title,
        type: "bar",
        barWidth: "60%",
        itemStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: color },
              { offset: 1, color: color + "80" }
            ]
          },
          borderRadius: [4, 4, 0, 0]
        },
        emphasis: {
          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: "#FF7817" },
                { offset: 1, color: "#FF7817" + "80" }
              ]
            },
            shadowBlur: 10,
            shadowColor: "#FF7817"
          }
        },
        data: data.map(d => d.value)
      }
    ]
  };

  return (
    <div 
      id={id}
      className="rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] p-4 hover:border-[var(--border-color-hover)] transition-colors scroll-mt-8"
    >
      <ReactECharts 
        option={option} 
        style={{ height: "400px" }}
        opts={{ renderer: "canvas" }}
      />
    </div>
  );
}


