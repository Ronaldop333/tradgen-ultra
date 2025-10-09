// Tipos para o Diário de Trading
export interface Trade {
  id: string
  userId: string
  asset: string
  direction: 'BUY' | 'SELL'
  entryPrice: number
  exitPrice: number
  quantity: number
  entryDate: Date
  exitDate: Date
  result: number
  fees: number
  notes?: string
  emotionalState?: string
  setup?: string
  mistakes?: string[]
  lessons?: string[]
  createdAt: Date
  updatedAt: Date
}

export interface TradeAnalysis {
  totalTrades: number
  winningTrades: number
  losingTrades: number
  winRate: number
  totalProfit: number
  totalLoss: number
  netProfit: number
  profitFactor: number
  averageWin: number
  averageLoss: number
  largestWin: number
  largestLoss: number
  sharpeRatio?: number
  maxDrawdown: number
}

export interface JournalStats {
  daily: TradeAnalysis
  weekly: TradeAnalysis
  monthly: TradeAnalysis
  byAsset: Record<string, TradeAnalysis>
  byTimeframe: Record<string, TradeAnalysis>
}
