# GTE Insight

Real-time analytics dashboard for tracking GTE.xyz platform metrics. Built to provide instant visibility into token launches, trading activity, and platform growth.

## What's This?

GTE Insight gives you a live view of what's happening on the GTE platform. Watch tokens being created and graduated, track perpetual and swap volumes, monitor position activity, and see everything unfold in real-time through an event feed.

The dashboard runs entirely on the frontend right now using simulated data that mimics real platform behavior. Once GTE hits mainnet, we'll plug in the actual API and you'll see genuine platform activity.

## Features

**Dashboard View**
- 8 live KPI cards showing platform metrics
- Charts for volumes, positions, fees, and token activity
- All metrics update continuously to show growth trends
- Click any KPI card to jump straight to its chart

**Event Feed**
- Live stream of platform events (tokens, trades, swaps)
- Filter by event type (Token Created, Token Graduated, Long/Short Positions, Swaps)
- Event counters at the top show totals across categories

**Design**
- Dark theme using GTE's brand colors (that signature orange)
- Works great on mobile, tablet, and desktop
- Smooth animations without being distracting
- Clean, modern interface that gets out of your way

## Tech Stack

- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- ECharts for data visualization

## Project Structure

```
gteinsight/
├── app/
│   ├── layout.tsx              # Root layout, metadata, fonts
│   ├── page.tsx                # Main dashboard with KPIs and charts
│   ├── terminal/
│   │   └── page.tsx            # Event feed page
│   └── globals.css             # Global styles and CSS variables
│
├── components/
│   ├── KPICard.tsx             # Reusable KPI card with click-to-scroll
│   ├── charts/
│   │   ├── LineChart.tsx       # Line chart for trends
│   │   └── BarChart.tsx        # Bar chart for volumes
│   └── ui/
│       └── vercel-tabs.tsx     # Tab component for event filters
│
├── lib/
│   ├── mockData.ts             # Mock KPI and chart data
│   ├── terminalData.ts         # Mock event generation
│   └── utils.ts                # Utility functions
│
├── hooks/
│   ├── useRealtimeMetrics.ts   # Hook for live KPI updates
│   └── useRealtimeEventCounts.ts # Hook for event counter updates
│
├── backend/                    # Ready but not connected yet
│   ├── api/
│   │   └── routes.ts           # API endpoint definitions
│   ├── services/
│   │   ├── metricsService.ts   # Metrics data service
│   │   └── eventsService.ts    # Events data service
│   ├── models/
│   │   └── types.ts            # TypeScript type definitions
│   └── config/
│       └── database.ts         # Database schema and config
│
└── public/                     # Static assets
    ├── icon.svg                # App icon
    └── site.webmanifest        # PWA manifest
```

## Running Locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open `http://localhost:3000` and you're good to go.

## How Data Works Right Now

Everything you see is simulated to feel real:

- **KPI Metrics**: Start from zero and continuously increase at set rates (e.g., 10 tokens/min, $1M perp volume/min)
- **Charts**: Show 30 days of historical data with realistic variance

The simulation is sophisticated enough that it'll be a clean swap to real data when the time comes.

## Backend Setup

There's a full backend structure in the `/backend` folder with API routes, services, and data models all defined. It's not running or connected to the frontend yet - we're waiting for GTE mainnet. When that happens, it's just a matter of:

1. Connecting to the actual GTE API
2. Updating the services to fetch real data
3. Swapping out the mock hooks in the frontend

Everything's designed to make that transition smooth.

## Brand Colors

The color palette matches GTE's brand:

- Primary Orange: `#FF7817`
- Dark Background: `#0A0A0A` 
- Card Background: `#1A1A1A`
- Accent Cyan: `#00D4FF`
- Accent Green: `#00FF88`
- Accent Red: `#FF4444`

## Deployment

### Vercel (Easiest)

```bash
npm run build
vercel deploy
```

### Docker

```bash
docker build -t gteinsight .
docker run -p 3000:3000 gteinsight
```

### Environment Variables

None required for the frontend. When you connect the backend later, you'll need:

```env
GTE_API_URL=https://api.gte.xyz
DATABASE_URL=your_db_connection_string
```

## Contributing

This is a community project. If you want to add features or fix bugs:

1. Fork it
2. Create a branch
3. Make your changes  
4. Submit a PR

Keep the code clean, match the existing style, and test on mobile.

## License

MIT - do whatever you want with it.

## Links

- [GTE Website](https://gte.xyz)
- [GTE Brand Kit](https://liquid-labs.notion.site/gte-brandkit)

---

Built for the GTE community
