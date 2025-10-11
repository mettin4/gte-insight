// Database configuration
// TODO: Setup PostgreSQL connection when ready

export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
  ssl?: boolean;
}

export const databaseConfig: DatabaseConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'gteinsight',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  ssl: process.env.NODE_ENV === 'production'
};

/**
 * Database Schema
 * 
 * Table: metrics
 * - id: UUID PRIMARY KEY
 * - metric_type: VARCHAR (tokens_created, volume_perp, etc.)
 * - value: DECIMAL
 * - timestamp: TIMESTAMP
 * - metadata: JSONB
 * 
 * Table: events
 * - id: UUID PRIMARY KEY
 * - event_type: VARCHAR (launched, graduated, long, short, swap)
 * - token_address: VARCHAR (nullable)
 * - token_name: VARCHAR (nullable)
 * - token_symbol: VARCHAR (nullable)
 * - amount: DECIMAL (nullable)
 * - asset: VARCHAR (nullable)
 * - leverage: VARCHAR (nullable)
 * - from_token: VARCHAR (nullable)
 * - to_token: VARCHAR (nullable)
 * - trader_address: VARCHAR (nullable)
 * - tx_hash: VARCHAR (nullable)
 * - timestamp: TIMESTAMP
 * - metadata: JSONB
 * 
 * Table: tokens
 * - id: UUID PRIMARY KEY
 * - address: VARCHAR UNIQUE
 * - name: VARCHAR
 * - symbol: VARCHAR
 * - initial_price: DECIMAL
 * - current_price: DECIMAL
 * - market_cap: DECIMAL
 * - volume_24h: DECIMAL
 * - is_graduated: BOOLEAN
 * - created_at: TIMESTAMP
 * - graduated_at: TIMESTAMP (nullable)
 * 
 * Table: positions
 * - id: UUID PRIMARY KEY
 * - trader_address: VARCHAR
 * - position_type: VARCHAR (long/short)
 * - asset: VARCHAR
 * - amount: DECIMAL
 * - leverage: INTEGER
 * - entry_price: DECIMAL
 * - current_price: DECIMAL
 * - pnl: DECIMAL
 * - is_open: BOOLEAN
 * - opened_at: TIMESTAMP
 * - closed_at: TIMESTAMP (nullable)
 */

// TODO: Implement database connection pool
// import { Pool } from 'pg';
// export const pool = new Pool(databaseConfig);


