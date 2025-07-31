import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos do banco de dados
export interface PetDocument {
  id: string
  tipo: "rg" | "certidao" | "vacina" | "site" | "memorial"
  dados_pet: any
  payment_id: string
  status: "pending" | "paid" | "delivered"
  created_at: string
  updated_at: string
}

export interface Payment {
  id: string
  payment_id: string
  produto: string
  valor: number
  status: "pending" | "approved" | "rejected"
  pix_code?: string
  qr_code_base64?: string
  external_reference: string
  created_at: string
  updated_at: string
}

// Funções do banco
export const dbService = {
  // Salvar documento do pet
  async savePetDocument(data: {
    tipo: string
    dados_pet: any
    payment_id: string
  }) {
    const { data: result, error } = await supabase
      .from("pet_documents")
      .insert([
        {
          tipo: data.tipo,
          dados_pet: data.dados_pet,
          payment_id: data.payment_id,
          status: "pending",
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Erro ao salvar documento:", error)
      throw error
    }

    return result
  },

  // Salvar pagamento
  async savePayment(data: {
    payment_id: string
    produto: string
    valor: number
    status: string
    pix_code?: string
    qr_code_base64?: string
    external_reference: string
  }) {
    const { data: result, error } = await supabase.from("payments").insert([data]).select().single()

    if (error) {
      console.error("Erro ao salvar pagamento:", error)
      throw error
    }

    return result
  },

  // Atualizar status do pagamento
  async updatePaymentStatus(payment_id: string, status: string) {
    const { data, error } = await supabase
      .from("payments")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("payment_id", payment_id)
      .select()

    if (error) {
      console.error("Erro ao atualizar pagamento:", error)
      throw error
    }

    // Atualizar documento relacionado
    await supabase
      .from("pet_documents")
      .update({
        status: status === "approved" ? "paid" : status,
        updated_at: new Date().toISOString(),
      })
      .eq("payment_id", payment_id)

    return data
  },

  // Buscar documento por payment_id
  async getDocumentByPaymentId(payment_id: string) {
    const { data, error } = await supabase.from("pet_documents").select("*").eq("payment_id", payment_id).single()

    if (error) {
      console.error("Erro ao buscar documento:", error)
      return null
    }

    return data
  },

  // Buscar pagamento por ID
  async getPaymentById(payment_id: string) {
    const { data, error } = await supabase.from("payments").select("*").eq("payment_id", payment_id).single()

    if (error) {
      console.error("Erro ao buscar pagamento:", error)
      return null
    }

    return data
  },

  // Marcar documento como entregue
  async markDocumentAsDelivered(payment_id: string) {
    const { data, error } = await supabase
      .from("pet_documents")
      .update({
        status: "delivered",
        updated_at: new Date().toISOString(),
      })
      .eq("payment_id", payment_id)
      .select()

    if (error) {
      console.error("Erro ao marcar como entregue:", error)
      throw error
    }

    return data
  },
}
