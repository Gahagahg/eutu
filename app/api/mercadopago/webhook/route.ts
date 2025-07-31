import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("🔔 Webhook recebido:", body)

    // Verificar se é uma notificação de pagamento
    if (body.type === "payment") {
      const paymentId = body.data?.id

      if (paymentId) {
        console.log(`💳 Notificação de pagamento: ${paymentId}`)

        // Aqui você pode implementar lógica adicional
        // como atualizar banco de dados, enviar emails, etc.

        // Por enquanto, apenas logamos a notificação
        console.log(`✅ Pagamento ${paymentId} processado via webhook`)
      }
    }

    // Sempre retornar 200 para o Mercado Pago
    return NextResponse.json({ received: true }, { status: 200 })
  } catch (error) {
    console.error("💥 Erro no webhook:", error)

    // Mesmo com erro, retornar 200 para evitar reenvios
    return NextResponse.json({ received: false }, { status: 200 })
  }
}

// Método GET para verificação do endpoint
export async function GET() {
  return NextResponse.json({
    message: "Webhook do Mercado Pago ativo",
    timestamp: new Date().toISOString(),
  })
}
