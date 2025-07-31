import { type NextRequest, NextResponse } from "next/server"
import { dbService } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("📝 Dados recebidos:", body)

    // Validar dados obrigatórios
    if (!body.title || !body.unit_price) {
      return NextResponse.json(
        {
          success: false,
          error: "Dados obrigatórios não fornecidos",
          details: "title e unit_price são obrigatórios",
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
          details: "MERCADO_PAGO_ACCESS_TOKEN não configurado",
        },
        { status: 500 },
      )
    }

    // Dados do pagamento para Mercado Pago
    const externalReference = `pet_${Date.now()}`
    const paymentData = {
      transaction_amount: body.unit_price,
      description: body.description || body.title,
      payment_method_id: "pix",
      payer: {
        email: body.payer?.email || "cliente@email.com",
        first_name: body.payer?.first_name || "Cliente",
        last_name: body.payer?.last_name || "Pet",
        identification: {
          type: "CPF",
          number: "12345678901",
        },
      },
      notification_url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://meupetdoc.vercel.app"}/api/mercadopago/webhook`,
      external_reference: externalReference,
      date_of_expiration: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15 minutos
    }

    console.log("💳 Criando pagamento no Mercado Pago:", paymentData)

    // Fazer requisição para API do Mercado Pago
    const response = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "X-Idempotency-Key": `${Date.now()}-${Math.random()}`,
      },
      body: JSON.stringify(paymentData),
    })

    const responseData = await response.json()
    console.log("📋 Resposta do Mercado Pago:", responseData)

    if (!response.ok) {
      console.error("❌ Erro na API do Mercado Pago:", responseData)
      return NextResponse.json(
        {
          success: false,
          error: "Erro ao criar pagamento",
          details: responseData.message || "Erro desconhecido",
          mercadopago_error: responseData,
        },
        { status: response.status },
      )
    }

    // Extrair dados importantes da resposta
    const pixCode = responseData.point_of_interaction?.transaction_data?.qr_code
    const qrCodeBase64 = responseData.point_of_interaction?.transaction_data?.qr_code_base64
    const paymentId = responseData.id

    console.log("✅ Pagamento criado com sucesso:", {
      id: paymentId,
      status: responseData.status,
      has_pix_code: !!pixCode,
      has_qr_code: !!qrCodeBase64,
    })

    // Salvar pagamento no banco de dados
    try {
      await dbService.savePayment({
        payment_id: paymentId.toString(),
        produto: body.title,
        valor: body.unit_price,
        status: responseData.status,
        pix_code: pixCode,
        qr_code_base64: qrCodeBase64,
        external_reference: externalReference,
      })

      // Salvar dados do pet se fornecidos
      if (body.pet_data) {
        await dbService.savePetDocument({
          tipo: body.pet_type || "rg",
          dados_pet: body.pet_data,
          payment_id: paymentId.toString(),
        })
      }

      console.log("💾 Dados salvos no banco com sucesso")
    } catch (dbError) {
      console.error("❌ Erro ao salvar no banco:", dbError)
      // Continua mesmo com erro no banco, pois o pagamento foi criado
    }

    return NextResponse.json({
      success: true,
      payment_id: paymentId,
      status: responseData.status,
      pix_code: pixCode,
      qr_code_base64: qrCodeBase64,
      expires_at: responseData.date_of_expiration,
      amount: responseData.transaction_amount,
      external_reference: externalReference,
    })
  } catch (error) {
    console.error("💥 Erro interno:", error)
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
