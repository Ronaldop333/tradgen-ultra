'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NewTradePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    asset: '',
    direction: 'BUY',
    entryPrice: '',
    exitPrice: '',
    quantity: '',
    entryDate: new Date().toISOString().slice(0, 16),
    exitDate: new Date().toISOString().slice(0, 16),
    fees: '0',
    notes: '',
    emotionalState: '',
    setup: '',
    mistakes: '',
    lessons: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/journal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          entryPrice: parseFloat(formData.entryPrice),
          exitPrice: parseFloat(formData.exitPrice),
          quantity: parseInt(formData.quantity),
          fees: parseFloat(formData.fees),
          entryDate: new Date(formData.entryDate),
          exitDate: new Date(formData.exitDate)
        })
      })

      if (response.ok) {
        router.push('/journal')
      } else {
        alert('Erro ao salvar trade')
      }
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao salvar trade')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
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
          <div className="flex items-center gap-4 mb-4">
            <Link href="/journal" className="text-cyber-blue hover:text-matrix-green transition-colors">
              ← Voltar
            </Link>
            <h1 className="text-4xl font-tech font-bold">
              <span className="text-cyber-blue">Novo</span>
              <span className="text-matrix-green"> Trade</span>
            </h1>
          </div>
          <p className="text-gray-300 text-lg">
            Registre seus trades para acompanhar sua evolução
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="max-w-2xl bg-gray-card rounded-lg border border-gray-border p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Ativo */}
            <div>
              <label className="block text-gray-300 mb-2">Ativo *</label>
              <input
                type="text"
                name="asset"
                value={formData.asset}
                onChange={handleChange}
                placeholder="Ex: WINJ25, PETR4, EURUSD"
                className="w-full bg-gray-dark border border-gray-border rounded-lg px-4 py-3 text-white focus:border-cyber-blue focus:outline-none"
                required
              />
            </div>

            {/* Direção */}
            <div>
              <label className="block text-gray-300 mb-2">Direção *</label>
              <select
                name="direction"
                value={formData.direction}
                onChange={handleChange}
                className="w-full bg-gray-dark border border-gray-border rounded-lg px-4 py-3 text-white focus:border-cyber-blue focus:outline-none"
              >
                <option value="BUY">Compra</option>
                <option value="SELL">Venda</option>
              </select>
            </div>

            {/* Preço de Entrada */}
            <div>
              <label className="block text-gray-300 mb-2">Preço de Entrada *</label>
              <input
                type="number"
                step="0.01"
                name="entryPrice"
                value={formData.entryPrice}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full bg-gray-dark border border-gray-border rounded-lg px-4 py-3 text-white focus:border-cyber-blue focus:outline-none"
                required
              />
            </div>

            {/* Preço de Saída */}
            <div>
              <label className="block text-gray-300 mb-2">Preço de Saída</label>
              <input
                type="number"
                step="0.01"
                name="exitPrice"
                value={formData.exitPrice}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full bg-gray-dark border border-gray-border rounded-lg px-4 py-3 text-white focus:border-cyber-blue focus:outline-none"
              />
            </div>

            {/* Quantidade */}
            <div>
              <label className="block text-gray-300 mb-2">Quantidade *</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="0"
                className="w-full bg-gray-dark border border-gray-border rounded-lg px-4 py-3 text-white focus:border-cyber-blue focus:outline-none"
                required
              />
            </div>

            {/* Taxas */}
            <div>
              <label className="block text-gray-300 mb-2">Taxas</label>
              <input
                type="number"
                step="0.01"
                name="fees"
                value={formData.fees}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full bg-gray-dark border border-gray-border rounded-lg px-4 py-3 text-white focus:border-cyber-blue focus:outline-none"
              />
            </div>

            {/* Data de Entrada */}
            <div>
              <label className="block text-gray-300 mb-2">Data de Entrada *</label>
              <input
                type="datetime-local"
                name="entryDate"
                value={formData.entryDate}
                onChange={handleChange}
                className="w-full bg-gray-dark border border-gray-border rounded-lg px-4 py-3 text-white focus:border-cyber-blue focus:outline-none"
                required
              />
            </div>

            {/* Data de Saída */}
            <div>
              <label className="block text-gray-300 mb-2">Data de Saída</label>
              <input
                type="datetime-local"
                name="exitDate"
                value={formData.exitDate}
                onChange={handleChange}
                className="w-full bg-gray-dark border border-gray-border rounded-lg px-4 py-3 text-white focus:border-cyber-blue focus:outline-none"
              />
            </div>
          </div>

          {/* Campo de Notas */}
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Anotações</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Descreva o trade, estratégia usada, etc."
              rows={3}
              className="w-full bg-gray-dark border border-gray-border rounded-lg px-4 py-3 text-white focus:border-cyber-blue focus:outline-none"
            />
          </div>

          {/* Estado Emocional */}
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Estado Emocional</label>
            <input
              type="text"
              name="emotionalState"
              value={formData.emotionalState}
              onChange={handleChange}
              placeholder="Ex: Confiante, Ansioso, Disciplinado"
              className="w-full bg-gray-dark border border-gray-border rounded-lg px-4 py-3 text-white focus:border-cyber-blue focus:outline-none"
            />
          </div>

          {/* Botões */}
          <div className="flex gap-4">
            <Link href="/journal">
              <button
                type="button"
                className="px-6 py-3 border border-gray-border text-gray-300 rounded-lg hover:bg-gray-dark transition-colors"
              >
                Cancelar
              </button>
            </Link>
            <button
              type="submit"
              className="bg-gradient-to-r from-cyber-blue to-matrix-green text-gray-dark px-6 py-3 rounded-lg font-tech font-bold hover:scale-105 transition-transform"
            >
              Salvar Trade
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  )
}
