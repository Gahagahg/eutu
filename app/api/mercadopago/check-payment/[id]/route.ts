import { type NextRequest, NextResponse } from "next/server"
import { dbService } from "@/lib/supabase"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const paymentId = params.id

    if (!paymentId) {
      return NextResponse.json(
        {
          success: false,
          error: "ID do pagamento não fornecido",
        },
        { status: 400 },
      )
    }

    const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN

    if (!accessToken) {
      console.error("❌ Token do Mercado Pago não configurado")
      return NextResponse.json(
        {
          success: false,
          error: "Configuração do pagamento não encontrada",
        },
        { status: 500 },
      )
    }

    console.log(`🔍 Verificando pagamento: ${paymentId}`)

    // Consultar status do pagamento na API do Mercado Pago
    const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })

    const paymentData = await response.json()
    console.log(`📋 Status do pagamento ${paymentId}:`, paymentData.status)

    if (!response.ok) {
      console.error("❌ Erro ao consultar pagamento:", paymentData)
      return NextResponse.json(
        {
          success: false,
          error: "Erro ao consultar status do pagamento",
          details: paymentData,
        },
        { status: response.status },
      )
    }

    // Atualizar status no banco de dados
    try {
      await dbService.updatePaymentStatus(paymentId, paymentData.status)
      console.log("💾 Status atualizado no banco")
    } catch (dbError) {
      console.error("❌ Erro ao atualizar banco:", dbError)
      // Continua mesmo com erro no banco
    }

    // Retornar status do pagamento
    return NextResponse.json({
      success: true,
      payment_id: paymentData.id,
      status: paymentData.status,
      status_detail: paymentData.status_detail,
      transaction_amount: paymentData.transaction_amount,
      date_created: paymentData.date_created,
      date_approved: paymentData.date_approved,
      external_reference: paymentData.external_reference,
    })
  } catch (error) {
    console.error("💥 Erro ao verificar pagamento:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Erro interno do servidor",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    )
  }
}
