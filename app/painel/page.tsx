"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Upload, ArrowLeft, CreditCard, CheckCircle, Lock, Eye, Download } from "lucide-react"
import Link from "next/link"
import { RGGenerator, downloadPDF, type PetData } from "@/lib/pdf-generator"
import { dbService } from "@/lib/supabase"

export default function PainelCriacao() {
  const [petData, setPetData] = useState<PetData>({
    nome: "",
    raca: "",
    sexo: "",
    idade: "",
    dataNascimento: "",
    cpf: "",
    nomeDono: "",
    endereco: "",
    telefone: "",
    cor: "padrao",
    foto: undefined,
  })

  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null)
  const [showPayment, setShowPayment] = useState(false)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [isPaid, setIsPaid] = useState(false)
  const [produtosLiberados, setProdutosLiberados] = useState<string[]>([])
  const [pixCode, setPixCode] = useState("")
  const [pixQrCode, setPixQrCode] = useState("")
  const [paymentId, setPaymentId] = useState("")
  const [isCheckingPayment, setIsCheckingPayment] = useState(false)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Verificar produtos liberados
  useEffect(() => {
    const liberados = localStorage.getItem("produtosLiberados")
    if (liberados) {
      setProdutosLiberados(JSON.parse(liberados))
    }
  }, [])

  // Calcular data de nascimento baseada na idade
  useEffect(() => {
    if (petData.idade) {
      const idade = Number.parseInt(petData.idade)
      if (idade > 0 && idade <= 30) {
        const hoje = new Date()
        const anoNascimento = hoje.getFullYear() - idade
        const dataNascimento = new Date(anoNascimento, hoje.getMonth(), hoje.getDate())
        const dataFormatada = dataNascimento.toISOString().split("T")[0]
        setPetData((prev) => ({ ...prev, dataNascimento: dataFormatada }))
      }
    }
  }, [petData.idade])

  // Atualizar foto no petData quando uploadedPhoto mudar
  useEffect(() => {
    setPetData((prev) => ({ ...prev, foto: uploadedPhoto || undefined }))
  }, [uploadedPhoto])

  const cores = [
    { id: "padrao", nome: "Verde Esmeralda", cor: "#10b981" },
    { id: "rosa", nome: "Rosa Flamingo", cor: "#ec4899" },
    { id: "azul", nome: "Azul Oceano", cor: "#3b82f6" },
    { id: "amarelo", nome: "Dourado Solar", cor: "#f59e0b" },
    { id: "vermelho", nome: "Vermelho Coral", cor: "#ef4444" },
  ]

  const tiposPet = [
    "Cachorro",
    "Gato",
    "Papagaio",
    "Periquito",
    "Hamster",
    "Coelho",
    "Peixe",
    "Tartaruga",
    "Iguana",
    "Chinchila",
    "Ferret",
    "Outro",
  ]

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedPhoto(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const generateCPF = () => {
    const cpf = Math.floor(Math.random() * 99999999999)
      .toString()
      .padStart(11, "0")
    const formatted = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
    setPetData({ ...petData, cpf: formatted })
  }

  const corSelecionada = cores.find((cor) => cor.id === petData.cor) || cores[0]

  // Criar pagamento no Mercado Pago
  const criarPagamentoMercadoPago = async () => {
    try {
      setIsProcessingPayment(true)

      const response = await fetch("/api/mercadopago/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "RG do Pet - Documento Oficial",
          quantity: 1,
          unit_price: 4.79,
          description: `RG do Pet ${petData.nome || "Personalizado"}`,
          pet_type: "rg",
          pet_data: petData,
          payer: {
            email: "cliente@email.com",
            first_name: petData.nomeDono.split(" ")[0] || "Cliente",
            last_name: petData.nomeDono.split(" ").slice(1).join(" ") || "Pet",
          },
        }),
      })

      const data = await response.json()
      console.log("Resposta da API:", data)

      if (data.success) {
        setPixCode(data.pix_code || "")
        setPixQrCode(data.qr_code_base64 || "")
        setPaymentId(data.payment_id || "")
        setShowPayment(true)

        if (data.payment_id) {
          iniciarVerificacaoPagamento(data.payment_id)
        }
      } else {
        alert("Erro ao criar pagamento: " + data.error)
        console.error("Detalhes do erro:", data.details)
      }
    } catch (error) {
      alert("Erro ao processar pagamento")
      console.error(error)
    } finally {
      setIsProcessingPayment(false)
    }
  }

  // Verificar pagamento periodicamente
  const iniciarVerificacaoPagamento = (paymentId: string) => {
    setIsCheckingPayment(true)

    const verificarPagamento = async () => {
      try {
        const response = await fetch(`/api/mercadopago/check-payment/${paymentId}`)
        const data = await response.json()

        if (data.success && data.status === "approved") {
          const novosLiberados = [...produtosLiberados, "rg"]
          setProdutosLiberados(novosLiberados)
          localStorage.setItem("produtosLiberados", JSON.stringify(novosLiberados))

          setIsPaid(true)
          setShowPayment(false)
          setIsCheckingPayment(false)
          alert("🎉 Pagamento aprovado! RG liberado com sucesso!")
        } else if (data.success && data.status === "pending") {
          setTimeout(verificarPagamento, 3000)
        } else {
          setIsCheckingPayment(false)
        }
      } catch (error) {
        console.error("Erro ao verificar pagamento:", error)
        setTimeout(verificarPagamento, 5000)
      }
    }

    setTimeout(verificarPagamento, 2000)
  }

  const handlePagar = () => {
    if (!petData.nome || !uploadedPhoto) {
      alert("Preencha o nome do pet e adicione uma foto primeiro!")
      return
    }
    criarPagamentoMercadoPago()
  }

  const isProdutoLiberado = produtosLiberados.includes("rg")

  // Sistema de Download REAL com PDF
  const handleDownload = async () => {
    if (!isProdutoLiberado) {
      alert("❌ Você precisa pagar para fazer o download!")
      return
    }

    try {
      setIsGeneratingPDF(true)

      // Gerar PDF usando a biblioteca
      const rgGenerator = new RGGenerator(petData.cor)
      const pdfBlob = await rgGenerator.generateRG(petData)

      // Fazer download
      downloadPDF(pdfBlob, `RG_${petData.nome || "Pet"}_${Date.now()}.pdf`)

      // Marcar como entregue no banco
      if (paymentId) {
        try {
          await dbService.markDocumentAsDelivered(paymentId)
          console.log("✅ Documento marcado como entregue")
        } catch (error) {
          console.error("Erro ao marcar como entregue:", error)
        }
      }

      alert("📥 Download concluído! RG salvo com sucesso!")
    } catch (error) {
      console.error("Erro ao gerar PDF:", error)
      alert("❌ Erro ao gerar PDF. Tente novamente.")
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  // Preview Parcial - Frente e Verso
  const PreviewParcial = () => {
    return (
      <div className="space-y-6">
        <h3 className="font-bold text-purple-700 mb-4 flex items-center">
          <Eye className="w-5 h-5 mr-2" />
          Preview das Cores - Frente e Verso
        </h3>

        {/* Frente */}
        <div>
          <h4 className="text-sm font-bold text-gray-600 mb-2">📄 Frente do RG</h4>
          <div
            className="relative w-full max-w-md mx-auto rounded-2xl shadow-2xl overflow-hidden"
            style={{
              aspectRatio: "1.6/1",
              height: "250px",
              background: `linear-gradient(135deg, ${corSelecionada.cor} 0%, ${corSelecionada.cor}80 50%, ${corSelecionada.cor}40 100%)`,
            }}
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-4 left-4 w-6 h-6 rounded-full bg-white"></div>
              <div className="absolute top-6 right-6 w-4 h-4 rounded-full bg-white"></div>
            </div>

            <div className="relative z-10 text-center pt-2 pb-2">
              <div className="inline-block px-4 py-1.5 rounded-full text-white font-black text-xs shadow-lg bg-black/30">
                🐾 PET ID BRASIL 🐾
              </div>
            </div>

            <div
              className="absolute inset-0 flex items-center justify-center z-20"
              style={{ top: "50px", bottom: "30px" }}
            >
              <div className="bg-black/90 backdrop-blur-sm rounded-2xl p-6 text-center border-2 border-white/30 max-w-xs">
                <Lock className="w-8 h-8 text-white mx-auto mb-3" />
                <h4 className="text-white font-bold text-sm mb-2">Conteúdo Bloqueado</h4>
                <p className="text-white/80 text-xs mb-3">Pague para ver completo!</p>
                <div className="text-lg">🔒</div>
              </div>
            </div>

            <div
              className="absolute bottom-0 left-0 right-0 text-center py-2 text-white font-bold bg-black/30"
              style={{ fontSize: "9px" }}
            >
              DOCUMENTO OFICIAL DE IDENTIFICAÇÃO ANIMAL
            </div>
          </div>
        </div>

        {/* Verso */}
        <div>
          <h4 className="text-sm font-bold text-gray-600 mb-2">📄 Verso do RG</h4>
          <div
            className="relative w-full max-w-md mx-auto rounded-2xl shadow-2xl overflow-hidden"
            style={{
              aspectRatio: "1.6/1",
              height: "250px",
              background: `linear-gradient(225deg, ${corSelecionada.cor} 0%, ${corSelecionada.cor}80 50%, ${corSelecionada.cor}40 100%)`,
            }}
          >
            <div className="relative z-10 text-center pt-2 pb-2">
              <div className="inline-block px-3 py-1 rounded-full text-white font-black text-xs shadow-lg bg-black/30">
                DADOS COMPLETOS
              </div>
            </div>

            <div
              className="absolute inset-0 flex items-center justify-center z-20"
              style={{ top: "40px", bottom: "20px" }}
            >
              <div className="bg-black/90 backdrop-blur-sm rounded-2xl p-6 text-center border-2 border-white/30 max-w-xs">
                <Lock className="w-8 h-8 text-white mx-auto mb-3" />
                <h4 className="text-white font-bold text-sm mb-2">Dados Bloqueados</h4>
                <p className="text-white/80 text-xs mb-3">Informações completas após pagamento!</p>
                <div className="text-lg">📝</div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-purple-600 font-medium">
            ✨ As cores mudam conforme sua seleção! Pague R$ 4,79 para ver o conteúdo completo.
          </p>
        </div>
      </div>
    )
  }

  // Componente do RG REAL (só aparece após pagamento)
  const RGFinal = () => {
    if (!isProdutoLiberado) return null

    return (
      <div className="space-y-8">
        {/* Frente do RG */}
        <div>
          <h3 className="font-bold text-green-700 mb-4 flex items-center">
            ✅ Frente do RG - LIBERADO
            <Badge className="ml-2 bg-green-500 text-white">
              <CheckCircle className="w-3 h-3 mr-1" />
              PAGO
            </Badge>
          </h3>
          <div
            className="relative w-full max-w-md mx-auto rounded-2xl shadow-2xl overflow-hidden"
            style={{
              aspectRatio: "1.6/1",
              height: "300px",
              background: `linear-gradient(135deg, ${corSelecionada.cor} 0%, ${corSelecionada.cor}80 50%, ${corSelecionada.cor}40 100%)`,
            }}
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-4 w-6 h-6 rounded-full bg-white"></div>
              <div className="absolute top-6 right-6 w-4 h-4 rounded-full bg-white"></div>
            </div>

            <div className="relative z-10 text-center pt-2 pb-2">
              <div className="inline-block px-4 py-1.5 rounded-full text-white font-black text-xs shadow-lg bg-black/30">
                🐾 PET ID BRASIL 🐾
              </div>
            </div>

            <div className="relative z-10 flex px-3" style={{ height: "220px" }}>
              <div className="flex-1 space-y-2 pr-2">
                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-lg">
                  <div className="text-xs font-bold text-gray-600 mb-0.5">NOME DO PET</div>
                  <div className="text-sm font-black text-gray-800 truncate">{petData.nome}</div>
                </div>

                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-lg">
                  <div className="text-xs font-bold text-gray-600 mb-0.5">ID</div>
                  <div className="text-xs font-bold text-gray-800">{petData.cpf}</div>
                </div>

                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-lg">
                  <div className="text-xs font-bold text-gray-600 mb-0.5">ESPÉCIE</div>
                  <div className="text-xs font-bold text-gray-800 truncate">{petData.raca}</div>
                </div>

                <div className="grid grid-cols-2 gap-1.5">
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg p-1.5 shadow-lg">
                    <div className="text-xs font-bold text-gray-600">SEXO</div>
                    <div className="text-xs font-bold text-gray-800">{petData.sexo?.toUpperCase()}</div>
                  </div>
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg p-1.5 shadow-lg">
                    <div className="text-xs font-bold text-gray-600">IDADE</div>
                    <div className="text-xs font-bold text-gray-800">{petData.idade} anos</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-start pt-2">
                <div className="w-20 h-24 rounded-xl overflow-hidden shadow-2xl border-3 border-white relative">
                  {uploadedPhoto ? (
                    <img src={uploadedPhoto || "/placeholder.svg"} alt="Pet" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-xs text-gray-400 font-bold">FOTO</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div
              className="absolute bottom-0 left-0 right-0 text-center py-2 text-white font-bold bg-black/30"
              style={{ fontSize: "10px" }}
            >
              DOCUMENTO OFICIAL DE IDENTIFICAÇÃO ANIMAL
            </div>
          </div>
        </div>

        {/* Verso do RG */}
        <div>
          <h3 className="font-bold text-green-700 mb-4">✅ Verso do RG - LIBERADO</h3>
          <div
            className="relative w-full max-w-md mx-auto rounded-2xl shadow-2xl overflow-hidden"
            style={{
              aspectRatio: "1.6/1",
              height: "280px",
              background: `linear-gradient(225deg, ${corSelecionada.cor} 0%, ${corSelecionada.cor}80 50%, ${corSelecionada.cor}40 100%)`,
            }}
          >
            <div className="relative z-10 text-center pt-2 pb-2">
              <div className="inline-block px-3 py-1 rounded-full text-white font-black text-xs shadow-lg bg-black/30">
                DADOS COMPLETOS
              </div>
            </div>

            <div className="relative z-10 p-3" style={{ height: "calc(100% - 50px)" }}>
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 h-full shadow-2xl overflow-hidden">
                <div className="space-y-2 text-xs h-full">
                  <div>
                    <div className="font-black text-gray-700 mb-1">NOME COMPLETO</div>
                    <div
                      className="border-b-2 pb-0.5 font-bold text-gray-800 truncate"
                      style={{ borderColor: corSelecionada.cor }}
                    >
                      {petData.nome}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="font-black text-gray-700 mb-1">ESPÉCIE/RAÇA</div>
                      <div
                        className="border-b-2 pb-0.5 font-bold text-gray-800 truncate"
                        style={{ borderColor: corSelecionada.cor }}
                      >
                        {petData.raca}
                      </div>
                    </div>
                    <div>
                      <div className="font-black text-gray-700 mb-1">SEXO</div>
                      <div
                        className="border-b-2 pb-0.5 font-bold text-gray-800"
                        style={{ borderColor: corSelecionada.cor }}
                      >
                        {petData.sexo}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="font-black text-gray-700 mb-1">NASCIMENTO</div>
                      <div
                        className="border-b-2 pb-0.5 font-bold text-gray-800"
                        style={{ borderColor: corSelecionada.cor }}
                      >
                        {petData.dataNascimento ? new Date(petData.dataNascimento).toLocaleDateString("pt-BR") : ""}
                      </div>
                    </div>
                    <div>
                      <div className="font-black text-gray-700 mb-1">IDADE</div>
                      <div
                        className="border-b-2 pb-0.5 font-bold text-gray-800"
                        style={{ borderColor: corSelecionada.cor }}
                      >
                        {petData.idade} anos
                      </div>
                    </div>
                  </div>

                  <div className="pt-1">
                    <div
                      className="text-center font-black text-white py-1 px-2 rounded-full text-xs mb-1"
                      style={{ backgroundColor: corSelecionada.cor }}
                    >
                      👤 DADOS DO TUTOR
                    </div>

                    <div>
                      <div className="font-black text-gray-700 mb-1">NOME DO RESPONSÁVEL</div>
                      <div
                        className="border-b-2 pb-0.5 font-bold text-gray-800 truncate"
                        style={{ borderColor: corSelecionada.cor }}
                      >
                        {petData.nomeDono}
                      </div>
                    </div>

                    <div className="mt-1">
                      <div className="font-black text-gray-700 mb-1">TELEFONE</div>
                      <div
                        className="border-b-2 pb-0.5 font-bold text-gray-800"
                        style={{ borderColor: corSelecionada.cor }}
                      >
                        {petData.telefone}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 text-center">
                    <div className="border-b-2 w-24 mx-auto mb-1" style={{ borderColor: corSelecionada.cor }}></div>
                    <div className="text-xs font-bold text-gray-600">Assinatura do Responsável</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Modal de Pagamento PIX Real
  const PaymentModal = () => {
    if (!showPayment) return null

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl">
          <div className="text-center mb-6">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="text-2xl font-black text-purple-900 mb-2">Pagamento PIX</h3>
            <p className="text-gray-600">Escaneie o QR Code ou copie o código</p>
          </div>

          <div className="space-y-4">
            {/* QR Code */}
            {pixQrCode && (
              <div className="text-center">
                <img
                  src={`data:image/png;base64,${pixQrCode}`}
                  alt="QR Code PIX"
                  className="w-48 h-48 mx-auto border-2 border-gray-200 rounded-lg"
                />
                <p className="text-sm text-gray-600 mt-2">Escaneie com seu app do banco</p>
              </div>
            )}

            {/* Código PIX */}
            {pixCode && (
              <div className="bg-gray-50 rounded-lg p-3">
                <Label className="text-xs font-bold text-gray-600 uppercase">Código PIX</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Input value={pixCode} readOnly className="text-xs font-mono" />
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(pixCode)
                      alert("Código PIX copiado!")
                    }}
                    size="sm"
                    variant="outline"
                  >
                    Copiar
                  </Button>
                </div>
              </div>
            )}

            {/* Status do pagamento */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 text-center">
              {isCheckingPayment ? (
                <>
                  <div className="animate-spin w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-3"></div>
                  <p className="font-bold text-blue-700">Aguardando pagamento...</p>
                  <p className="text-sm text-blue-600">Verificando automaticamente</p>
                </>
              ) : (
                <>
                  <div className="text-2xl mb-2">⚡</div>
                  <p className="font-bold text-blue-700">Aprovação Instantânea</p>
                  <p className="text-sm text-blue-600">Assim que pagar, seu RG será liberado!</p>
                </>
              )}
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold">RG do Pet</span>
                <span className="font-bold text-lg">R$ 4,79</span>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Button
              variant="ghost"
              onClick={() => {
                setShowPayment(false)
                setIsCheckingPayment(false)
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* PADDING MOBILE CORRIGIDO */}
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <Link href="/" className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao início
            </Link>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-purple-900 mb-2">
                  🎯 RG do Pet - Preview das Cores! 🐾
                </h1>
                <p className="text-gray-600 text-sm sm:text-base">
                  Preencha os dados, veja as cores mudando e pague para ver o resultado final!
                </p>
              </div>
              <div className="text-left sm:text-right">
                {isProdutoLiberado ? (
                  <div className="bg-green-100 text-green-700 px-3 sm:px-4 py-2 rounded-full font-bold mb-2 text-sm">
                    ✅ RG LIBERADO ✅
                  </div>
                ) : (
                  <div className="bg-purple-100 text-purple-700 px-3 sm:px-4 py-2 rounded-full font-bold mb-2 text-sm">
                    👁️ PREVIEW PARCIAL 👁️
                  </div>
                )}
                <div className="text-xs sm:text-sm text-gray-600">
                  {isProdutoLiberado ? "Produto pago e liberado!" : "Veja as cores mudando!"}
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Formulário - PADDING MOBILE CORRIGIDO */}
            <div className="space-y-4 sm:space-y-6">
              {/* Upload da Foto */}
              <Card className="shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-purple-900 text-lg sm:text-xl">📸 Foto do Pet</CardTitle>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center">
                    {uploadedPhoto ? (
                      <div className="space-y-4">
                        <img
                          src={uploadedPhoto || "/placeholder.svg"}
                          alt="Pet"
                          className="w-24 sm:w-32 h-32 sm:h-40 object-cover mx-auto rounded-lg shadow-md"
                        />
                        <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                          Trocar Foto
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="w-8 sm:w-12 h-8 sm:h-12 text-gray-400 mx-auto" />
                        <div>
                          <Button onClick={() => fileInputRef.current?.click()}>Escolher Foto 3x4</Button>
                          <p className="text-xs sm:text-sm text-gray-500 mt-2">
                            Formato recomendado: JPG, PNG (máx. 5MB)
                          </p>
                        </div>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Dados do Pet */}
              <Card className="shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-purple-900 text-lg sm:text-xl">🐕 Dados do Pet</CardTitle>
                </CardHeader>
                <CardContent className="px-4 sm:px-6 space-y-4">
                  <div>
                    <Label htmlFor="nome" className="text-sm font-bold text-gray-700">
                      Nome do Pet *
                    </Label>
                    <Input
                      id="nome"
                      placeholder="Ex: Rex, Mimi, Pipoca..."
                      value={petData.nome}
                      onChange={(e) => setPetData({ ...petData, nome: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="raca" className="text-sm font-bold text-gray-700">
                      Tipo/Raça *
                    </Label>
                    <Select onValueChange={(value) => setPetData({ ...petData, raca: value })}>
                      <SelectTrigger className="mt-1 bg-white border border-gray-300">
                        <SelectValue placeholder="Selecione o tipo do pet" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-gray-300 shadow-lg">
                        {tiposPet.map((tipo) => (
                          <SelectItem key={tipo} value={tipo} className="hover:bg-gray-100">
                            {tipo}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="sexo" className="text-sm font-bold text-gray-700">
                      Sexo *
                    </Label>
                    <Select onValueChange={(value) => setPetData({ ...petData, sexo: value })}>
                      <SelectTrigger className="mt-1 bg-white border border-gray-300">
                        <SelectValue placeholder="Selecione o sexo" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-gray-300 shadow-lg">
                        <SelectItem value="macho" className="hover:bg-gray-100">
                          Macho
                        </SelectItem>
                        <SelectItem value="femea" className="hover:bg-gray-100">
                          Fêmea
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="idade" className="text-sm font-bold text-gray-700">
                      Idade do Pet *
                    </Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="idade"
                        type="number"
                        min="1"
                        max="30"
                        placeholder="Ex: 3"
                        value={petData.idade}
                        onChange={(e) => setPetData({ ...petData, idade: e.target.value })}
                        className="flex-1"
                      />
                      <div className="flex items-center px-3 bg-gray-100 rounded-md">
                        <span className="text-sm text-gray-600">anos</span>
                      </div>
                    </div>
                    {petData.idade && petData.dataNascimento && (
                      <p className="text-xs text-green-600 mt-1">
                        ✅ Data calculada: {new Date(petData.dataNascimento).toLocaleDateString("pt-BR")}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="cpf" className="text-sm font-bold text-gray-700">
                      CPF do Pet
                    </Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="cpf"
                        placeholder="000.000.000-00"
                        value={petData.cpf}
                        onChange={(e) => setPetData({ ...petData, cpf: e.target.value })}
                        className="flex-1"
                      />
                      <Button variant="outline" onClick={generateCPF}>
                        Gerar
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">CPF fictício para o documento do pet</p>
                  </div>
                </CardContent>
              </Card>

              {/* Dados do Dono */}
              <Card className="shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-purple-900 text-lg sm:text-xl">👤 Dados do Dono</CardTitle>
                </CardHeader>
                <CardContent className="px-4 sm:px-6 space-y-4">
                  <div>
                    <Label htmlFor="nomeDono" className="text-sm font-bold text-gray-700">
                      Nome Completo *
                    </Label>
                    <Input
                      id="nomeDono"
                      placeholder="Seu nome completo"
                      value={petData.nomeDono}
                      onChange={(e) => setPetData({ ...petData, nomeDono: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="endereco" className="text-sm font-bold text-gray-700">
                      Endereço
                    </Label>
                    <Input
                      id="endereco"
                      placeholder="Rua, número, bairro, cidade"
                      value={petData.endereco}
                      onChange={(e) => setPetData({ ...petData, endereco: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="telefone" className="text-sm font-bold text-gray-700">
                      Telefone
                    </Label>
                    <Input
                      id="telefone"
                      placeholder="(11) 99999-9999"
                      value={petData.telefone}
                      onChange={(e) => setPetData({ ...petData, telefone: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Escolha da Cor */}
              <Card className="shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-purple-900 text-lg sm:text-xl">🎨 Escolha a Cor</CardTitle>
                  <p className="text-sm text-gray-600">Veja as cores mudando no preview ao lado!</p>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  <div className="grid grid-cols-1 gap-3">
                    {cores.map((cor) => (
                      <button
                        key={cor.id}
                        onClick={() => setPetData({ ...petData, cor: cor.id })}
                        className={`p-3 sm:p-4 rounded-xl border-2 transition-all ${
                          petData.cor === cor.id
                            ? "border-purple-500 bg-purple-50 shadow-lg"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className="w-10 sm:w-12 h-6 sm:h-8 rounded-lg shadow-md"
                            style={{ backgroundColor: cor.cor }}
                          ></div>
                          <div className="text-left flex-1">
                            <p className="font-bold text-gray-800 text-sm sm:text-base">{cor.nome}</p>
                            <p className="text-xs sm:text-sm text-gray-500">Tema {cor.nome.toLowerCase()}</p>
                          </div>
                          {petData.cor === cor.id && (
                            <div className="ml-auto">
                              <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-purple-500" />
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Área do Preview - PADDING MOBILE CORRIGIDO */}
            <div className="space-y-4 sm:space-y-6">
              {!isProdutoLiberado ? (
                <Card className="shadow-2xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-purple-700 flex items-center text-lg sm:text-xl">
                      <Eye className="w-5 h-5 mr-2" />
                      Preview das Cores
                    </CardTitle>
                    <p className="text-sm text-gray-600">Veja as cores mudando! Pague para ver o conteúdo completo.</p>
                  </CardHeader>
                  <CardContent className="px-4 sm:px-6">
                    <PreviewParcial />

                    <div className="mt-6 sm:mt-8 space-y-4">
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 sm:p-6 text-center border-2 border-purple-200">
                        <h4 className="font-bold text-purple-800 mb-2 text-lg">🎨 Teste as Cores!</h4>
                        <p className="text-sm text-purple-600 mb-4">
                          Mude as cores no formulário e veja o preview mudando em tempo real!
                        </p>

                        <div className="bg-white rounded-xl p-4 mb-4 shadow-lg">
                          <h5 className="font-bold text-gray-800 mb-2">O que você vai receber:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>✅ RG frente e verso em alta qualidade</li>
                            <li>✅ Arquivo PDF profissional</li>
                            <li>✅ Pronto para imprimir</li>
                            <li>✅ Design personalizado</li>
                            <li>✅ Download instantâneo</li>
                          </ul>
                        </div>

                        <Button
                          onClick={handlePagar}
                          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 sm:py-4 text-base sm:text-lg shadow-lg transform hover:scale-105 transition-all"
                          disabled={!petData.nome || !uploadedPhoto || isProcessingPayment}
                        >
                          {isProcessingPayment ? (
                            <>
                              <div className="animate-spin w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                              Criando Pagamento...
                            </>
                          ) : (
                            <>
                              <CreditCard className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                              Pagar R$ 4,79 e Ver Resultado Completo!
                            </>
                          )}
                        </Button>

                        {(!petData.nome || !uploadedPhoto) && (
                          <p className="text-sm text-red-500 mt-4">
                            ⚠️ Preencha o nome e adicione uma foto para continuar
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="shadow-2xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-green-700 flex items-center text-lg sm:text-xl">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      RG do Seu Pet - LIBERADO!
                    </CardTitle>
                    <p className="text-sm text-gray-600">Pagamento aprovado! Aqui está o resultado:</p>
                  </CardHeader>
                  <CardContent className="px-4 sm:px-6">
                    <RGFinal />

                    <div className="text-center mt-6 sm:mt-8 space-y-4">
                      <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-4 sm:p-6 border-2 border-green-200">
                        <CheckCircle className="w-10 sm:w-12 h-10 sm:h-12 text-green-500 mx-auto mb-3" />
                        <h4 className="text-lg font-bold text-green-700 mb-2">🎉 RG Liberado!</h4>
                        <p className="text-sm text-green-600 mb-4">Produto pago com sucesso! Agora você pode baixar.</p>
                      </div>
                      <Button
                        onClick={handleDownload}
                        disabled={isGeneratingPDF}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3"
                      >
                        {isGeneratingPDF ? (
                          <>
                            <div className="animate-spin w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                            Gerando PDF...
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4 mr-2" />📥 Baixar RG Completo (PDF)
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Pagamento */}
      <PaymentModal />
    </div>
  )
}
