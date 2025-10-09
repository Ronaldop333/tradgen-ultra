-- Schema inicial para Diário de Trading
CREATE TABLE IF NOT EXISTS trades (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  asset TEXT NOT NULL,
  direction TEXT NOT NULL CHECK (direction IN ('BUY', 'SELL')),
  entry_price REAL NOT NULL,
  exit_price REAL NOT NULL,
  quantity INTEGER NOT NULL,
  entry_date DATETIME NOT NULL,
  exit_date DATETIME NOT NULL,
  result REAL NOT NULL,
  fees REAL DEFAULT 0,
  notes TEXT,
  emotional_state TEXT,
  setup TEXT,
  mistakes TEXT,
  lessons TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_trades_user_id ON trades(user_id);
CREATE INDEX IF NOT EXISTS idx_trades_entry_date ON trades(entry_date);
CREATE INDEX IF NOT EXISTS idx_trades_asset ON trades(asset);
