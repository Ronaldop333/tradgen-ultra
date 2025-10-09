'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Trade } from '../../../lib/types/journal'

export default function JournalPage() {
  const [trades, setTrades] = useState<Trade[]>([])
  const [stats, setStats] = useState({
    totalTrades: 0,
    winningTrades: 0,
    winRate: 0,
    netProfit: 0
  })

  useEffect(() => {
    fetchTrades()
  }, [])

  const fetchTrades = async () => {
    try {
      const response = await fetch('/api/journal')
      const data = await response.json()
      setTrades(data.trades || [])
      calculateStats(data.trades || [])
    } catch (error) {
      console.error('Erro ao carregar trades:', error)
    }
  }

  const calculateStats = (trades: Trade[]) => {
    const totalTrades = trades.length
    const winningTrades = trades.filter(trade => trade.result > 0).length
    const winRate = totalTrades > 0 ? (winningTrades / totalTrades) * 100 : 0
    const netProfit = trades.reduce((sum, trade) => sum + trade.result, 0)

    setStats({
      totalTrades,
      winningTrades,
      winRate,
      netProfit
    })
  }

  const deleteTrade = async (id: string) => {
    try {
      await fetch('/api/journal', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id })
      })
      fetchTrades() // Recarrega a lista
    } catch (error) {
      console.error('Erro ao deletar trade:', error)
    }
  }

  return (
    <div className="min-h-screen bg-deep-space pt-20">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-tech font-bold mb-4">
            <span className="text-cyber-blue">Diário</span>
            <span className="text-matrix-green"> de Trading</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Acompanhe sua performance e evolua como trader
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-card rounded-lg p-6 border border-gray-border"
          >
            <h3 className="text-gray-400 text-sm mb-2">Total de Trades</h3>
            <p className="text-3xl font-bold text-white">{stats.totalTrades}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-card rounded-lg p-6 border border-gray-border"
          >
            <h3 className="text-gray-400 text-sm mb-2">Win Rate</h3>
            <p className="text-3xl font-bold text-matrix-green">
              {stats.winRate.toFixed(1)}%
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-card rounded-lg p-6 border border-gray-border"
          >
            <h3 className="text-gray-400 text-sm mb-2">Lucro Líquido</h3>
            <p className={`text-3xl font-bold ${
              stats.netProfit >= 0 ? 'text-matrix-green' : 'text-red-500'
            }`}>
              R$ {stats.netProfit.toFixed(2)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-card rounded-lg p-6 border border-gray-border"
          >
            <Link href="/journal/new-trade">
              <button className="w-full bg-gradient-to-r from-cyber-blue to-matrix-green text-gray-dark py-3 rounded-lg font-tech font-bold hover:scale-105 transition-transform">
                + Novo Trade
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Trades List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-card rounded-lg border border-gray-border overflow-hidden"
        >
          <div className="p-6 border-b border-gray-border">
            <h2 className="text-xl font-bold text-white">Trades Recentes</h2>
          </div>

          <div className="p-6">
            {trades.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 mb-4">Nenhum trade registrado ainda</p>
                <Link href="/journal/new-trade">
                  <button className="bg-cyber-blue text-gray-dark px-6 py-2 rounded-lg font-tech font-bold">
                    Registrar Primeiro Trade
                  </button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {trades.map((trade) => (
                  <div
                    key={trade.id}
                    className="flex items-center justify-between p-4 bg-gray-dark rounded-lg border border-gray-border"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${
                        trade.direction === 'BUY' ? 'bg-matrix-green' : 'bg-red-500'
                      }`} />
                      <div>
                        <p className="font-bold text-white">{trade.asset}</p>
                        <p className="text-gray-400 text-sm">
                          {trade.direction === 'BUY' ? 'Compra' : 'Venda'} • 
                          {new Date(trade.entryDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className={`font-bold ${
                        trade.result >= 0 ? 'text-matrix-green' : 'text-red-500'
                      }`}>
                        R$ {trade.result.toFixed(2)}
                      </p>
                      <button
                        onClick={() => deleteTrade(trade.id)}
                        className="text-gray-400 hover:text-red-500 text-sm"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
