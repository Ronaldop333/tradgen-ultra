import { NextRequest, NextResponse } from 'next/server'

// Mock database - vamos usar array temporário
let trades: any[] = []

export async function GET() {
  try {
    // Retorna todos os trades
    return NextResponse.json({ 
      success: true,
      trades: trades
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar trades' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validação básica
    if (!body.asset || !body.direction || !body.entryPrice || !body.quantity) {
      return NextResponse.json(
        { success: false, error: 'Dados obrigatórios faltando' },
        { status: 400 }
      )
    }

    // Calcula resultado automaticamente
    const entryPrice = parseFloat(body.entryPrice)
    const exitPrice = parseFloat(body.exitPrice) || entryPrice
    const quantity = parseInt(body.quantity)
    
    let result = 0
    if (body.direction === 'BUY') {
      result = (exitPrice - entryPrice) * quantity
    } else {
      result = (entryPrice - exitPrice) * quantity
    }

    // Cria novo trade
    const newTrade = {
      id: Date.now().toString(),
      userId: 'user-demo', // Temporário - depois implementamos auth
      asset: body.asset,
      direction: body.direction,
      entryPrice: entryPrice,
      exitPrice: exitPrice,
      quantity: quantity,
      result: result,
      fees: parseFloat(body.fees) || 0,
      entryDate: new Date(body.entryDate),
      exitDate: new Date(body.exitDate),
      notes: body.notes || '',
      emotionalState: body.emotionalState || '',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    trades.push(newTrade)

    return NextResponse.json({ 
      success: true, 
      trade: newTrade 
    }, { status: 201 })

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID do trade é obrigatório' },
        { status: 400 }
      )
    }

    // Remove o trade
    const initialLength = trades.length
    trades = trades.filter(trade => trade.id !== id)
    
    if (trades.length === initialLength) {
      return NextResponse.json(
        { success: false, error: 'Trade não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Trade deletado com sucesso' 
    })

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erro ao deletar trade' },
      { status: 500 }
    )
  }
}
