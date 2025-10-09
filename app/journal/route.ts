import { NextRequest, NextResponse } from 'next/server'
import { Trade } from '../../../../lib/types/journal'

// Mock database - depois substituímos por banco real
let trades: Trade[] = []

export async function GET() {
  // Retorna todos os trades do usuário (mock)
  return NextResponse.json({ trades })
}

export async function POST(request: NextRequest) {
  try {
    const tradeData = await request.json()
    
    // Validação básica
    if (!tradeData.asset || !tradeData.direction || !tradeData.entryPrice) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      )
    }

    // Cria novo trade
    const newTrade: Trade = {
      id: Math.random().toString(36).substr(2, 9),
      userId: 'user-1', // Mock - depois autenticação
      ...tradeData,
      result: tradeData.exitPrice ? 
        (tradeData.direction === 'BUY' ? 
          (tradeData.exitPrice - tradeData.entryPrice) * tradeData.quantity :
          (tradeData.entryPrice - tradeData.exitPrice) * tradeData.quantity
        ) : 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    trades.push(newTrade)

    return NextResponse.json({ trade: newTrade }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao criar trade' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    
    trades = trades.filter(trade => trade.id !== id)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao deletar trade' },
      { status: 500 }
    )
  }
}
