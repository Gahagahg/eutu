"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Share2,
  Camera,
  Palette,
  FileText,
  Heart,
  Award,
  Shield,
  Upload,
  Eye,
  Lock,
  CreditCard,
  Download,
  CheckCircle,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function PainelCertidao() {
  const router = useRouter()
  const [petData, setPetData] = useState({
    name: "Rex",
    breed: "Golden Retriever",
    gender: "Macho",
    birthDate: "2020-05-15",
    birthPlace: "São Paulo, SP",
    owner: "João Silva",
    ownerCpf: "123.456.789-00",
    registrationNumber: "001234567",
    photo: null as string | null,
  })

  const [selectedTheme, setSelectedTheme] = useState("rosa")
  const [showPayment, setShowPayment] = useState(false)
  const [isPaid, setIsPaid] = useState(false)
  const [produtosLiberados, setProdutosLiberados] = useState<string[]>([])

  // Verificar produtos liberados
  useEffect(() => {
    const liberados = localStorage.getItem("produtosLiberados")
    if (liberados) {
      setProdutosLiberados(JSON.parse(liberados))
    }
  }, [])

  const themes = [
    { id: "rosa", name: "Rosa Clássico", primary: "bg-pink-500", secondary: "bg-pink-100", accent: "text-pink-700" },
    { id: "azul", name: "Azul Oficial", primary: "bg-blue-500", secondary: "bg-blue-100", accent: "text-blue-700" },
    {
      id: "verde",
      name: "Verde Natureza",
      primary: "bg-green-500",
      secondary: "bg-green-100",
      accent: "text-green-700",
    },
    { id: "roxo", name: "Roxo Real", primary: "bg-purple-500", secondary: "bg-purple-100", accent: "text-purple-700" },
    {
      id: "dourado",
      name: "Dourado Premium",
      primary: "bg-yellow-500",
      secondary: "bg-yellow-100",
      accent: "text-yellow-700",
    },
  ]

  const currentTheme = themes.find((t) => t.id === selectedTheme) || themes[0]

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPetData({ ...petData, photo: e.target?.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePagar = () => {
    setShowPayment(true)
  }

  const handleFinalizarPagamento = () => {
    const novosLiberados = [...produtosLiberados, "certidao"]
    setProdutosLiberados(novosLiberados)
    localStorage.setItem("produtosLiberados", JSON.stringify(novosLiberados))

    setIsPaid(true)
    setShowPayment(false)
    alert("🎉 Pagamento aprovado! Certidão liberada com sucesso!")
  }

  const isProdutoLiberado = produtosLiberados.includes("certidao")

  // Sistema de Download Real
  const handleDownload = async () => {
    if (!isProdutoLiberado) {
      alert("❌ Você precisa pagar para fazer o download!")
      return
    }

    try {
      const certidaoData = {
        pet: petData,
        theme: currentTheme,
        timestamp: new Date().toISOString(),
      }

      const blob = new Blob([JSON.stringify(certidaoData, null, 2)], {
        type: "application/json",
      })

      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `Certidao_${petData.name || "Pet"}_${Date.now()}.json`

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      alert("📥 Download iniciado! Certidão salva com sucesso!")
    } catch (error) {
      console.error("Erro no download:", error)
      alert("❌ Erro ao fazer download. Tente novamente.")
    }
  }

  // Preview Parcial da Certidão
  const PreviewParcial = () => {
    return (
      <div className="relative">
        <h3 className="font-bold text-purple-700 mb-4 flex items-center">
          <Eye className="w-5 h-5 mr-2" />
          Preview das Cores
        </h3>
        <div className={`${currentTheme.secondary} rounded-2xl p-6 border-2 border-gray-200 relative overflow-hidden`}>
          {/* Header da Certidão */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-3">
              <div className={`w-16 h-16 ${currentTheme.primary} rounded-full flex items-center justify-center`}>
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className={`text-xl font-black ${currentTheme.accent} mb-1`}>CERTIDÃO DE NASCIMENTO</h2>
            <p className="text-sm text-gray-600">DOCUMENTO OFICIAL</p>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-400 mx-auto mt-2 rounded-full"></div>
          </div>

          {/* Overlay central cobrindo o conteúdo */}
          <div
            className="absolute inset-0 flex items-center justify-center z-20"
            style={{ top: "100px", bottom: "50px" }}
          >
            <div className="bg-black/90 backdrop-blur-sm rounded-2xl p-8 text-center border-2 border-white/30">
              <Lock className="w-12 h-12 text-white mx-auto mb-4" />
              <h4 className="text-white font-bold text-lg mb-2">Conteúdo Bloqueado</h4>
              <p className="text-white/80 text-sm mb-4">Pague para ver a certidão completa!</p>
              <div className="text-2xl">📜</div>
            </div>
          </div>

          {/* Footer visível */}
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <p className="text-xs text-gray-500">Documento emitido em {new Date().toLocaleDateString("pt-BR")}</p>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-purple-600 font-medium">
            ✨ As cores mudam conforme sua seleção! Pague R$ 6,99 para ver o conteúdo completo.
          </p>
        </div>
      </div>
    )
  }

  // Certidão Final (só aparece após pagamento)
  const CertidaoFinal = () => {
    if (!isProdutoLiberado) return null

    return (
      <div className={`${currentTheme.secondary} rounded-2xl p-6 border-2 border-gray-200`}>
        {/* Header da Certidão */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-3">
            <div className={`w-16 h-16 ${currentTheme.primary} rounded-full flex items-center justify-center`}>
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className={`text-xl font-black ${currentTheme.accent} mb-1`}>CERTIDÃO DE NASCIMENTO</h2>
          <p className="text-sm text-gray-600">DOCUMENTO OFICIAL</p>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-400 mx-auto mt-2 rounded-full"></div>
        </div>

        {/* Foto e Dados Principais */}
        <div className="flex items-start gap-6 mb-6">
          <div className="flex-shrink-0">
            {petData.photo ? (
              <img
                src={petData.photo || "/placeholder.svg"}
                alt="Pet"
                className="w-24 h-32 object-cover rounded-lg shadow-lg border-2 border-white"
              />
            ) : (
              <div className="w-24 h-32 bg-gray-200 rounded-lg shadow-lg border-2 border-white flex items-center justify-center">
                <Camera className="w-8 h-8 text-gray-400" />
              </div>
            )}
          </div>

          <div className="flex-1 space-y-3">
            <div>
              <label className={`text-xs font-bold ${currentTheme.accent} uppercase tracking-wide`}>Nome</label>
              <p className="text-lg font-black text-gray-900">{petData.name}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`text-xs font-bold ${currentTheme.accent} uppercase tracking-wide`}>Raça</label>
                <p className="text-sm font-semibold text-gray-700">{petData.breed}</p>
              </div>
              <div>
                <label className={`text-xs font-bold ${currentTheme.accent} uppercase tracking-wide`}>Sexo</label>
                <p className="text-sm font-semibold text-gray-700">{petData.gender}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dados de Nascimento */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
          <h3 className={`text-sm font-black ${currentTheme.accent} mb-3 uppercase tracking-wide`}>
            Dados de Nascimento
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">Data</label>
              <p className="text-sm font-semibold text-gray-900">
                {new Date(petData.birthDate).toLocaleDateString("pt-BR")}
              </p>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">Local</label>
              <p className="text-sm font-semibold text-gray-900">{petData.birthPlace}</p>
            </div>
          </div>
        </div>

        {/* Dados do Responsável */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
          <h3 className={`text-sm font-black ${currentTheme.accent} mb-3 uppercase tracking-wide`}>
            Responsável Legal
          </h3>
          <div className="space-y-2">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">Nome</label>
              <p className="text-sm font-semibold text-gray-900">{petData.owner}</p>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">CPF</label>
              <p className="text-sm font-semibold text-gray-900">{petData.ownerCpf}</p>
            </div>
          </div>
        </div>

        {/* Registro e Validação */}
        <div className="border-t-2 border-gray-200 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">Registro Nº</label>
              <p className="text-sm font-black text-gray-900">{petData.registrationNumber}</p>
            </div>
            <div className="text-right">
              <div
                className={`inline-flex items-center px-3 py-1 rounded-full ${currentTheme.secondary} ${currentTheme.accent} text-xs font-bold`}
              >
                <Award className="w-3 h-3 mr-1" />
                VÁLIDO
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">Documento emitido em {new Date().toLocaleDateString("pt-BR")}</p>
            <div className="mt-2 flex items-center justify-center">
              <div className="w-16 h-16 bg-gray-100 rounded border-2 border-gray-300 flex items-center justify-center">
                <span className="text-xs text-gray-400">QR Code</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
      {/* PADDING MOBILE CORRIGIDO */}
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
            <div className="flex items-start sm:items-center">
              <Button variant="ghost" onClick={() => router.back()} className="mr-4 hover:bg-white/50">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Voltar
              </Button>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-purple-900 flex items-center">
                  <Heart className="w-6 sm:w-8 h-6 sm:h-8 mr-3 text-pink-500" />
                  Editor de Certidão
                </h1>
                <p className="text-gray-600 text-sm sm:text-base">Crie a certidão de nascimento oficial do seu pet</p>
              </div>
            </div>
            <Badge className="bg-pink-500 text-white px-3 sm:px-4 py-2 text-sm font-bold">R$ 6,99</Badge>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Formulário de Edição - PADDING MOBILE CORRIGIDO */}
            <div className="space-y-4 sm:space-y-6">
              {/* Seleção de Tema */}
              <Card className="bg-white shadow-lg border-0">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-purple-900 text-lg sm:text-xl">
                    <Palette className="w-5 h-5 mr-2" />
                    Escolha o Tema
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  <div className="grid grid-cols-2 gap-3">
                    {themes.map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => setSelectedTheme(theme.id)}
                        className={`p-3 rounded-xl border-2 transition-all ${
                          selectedTheme === theme.id
                            ? "border-purple-500 shadow-lg"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className={`w-full h-6 sm:h-8 ${theme.primary} rounded-lg mb-2`}></div>
                        <div className="text-xs sm:text-sm font-bold text-gray-700">{theme.name}</div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Dados do Pet */}
              <Card className="bg-white shadow-lg border-0">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-purple-900 text-lg sm:text-xl">
                    <FileText className="w-5 h-5 mr-2" />
                    Dados do Pet
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 sm:px-6 space-y-4">
                  {/* Upload de Foto */}
                  <div>
                    <Label className="text-sm font-bold text-gray-700 mb-2 block">Foto 3x4</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 sm:p-6 text-center hover:border-pink-400 transition-colors">
                      {petData.photo ? (
                        <div className="relative">
                          <img
                            src={petData.photo || "/placeholder.svg"}
                            alt="Pet"
                            className="w-20 sm:w-24 h-28 sm:h-32 object-cover mx-auto rounded-lg shadow-md"
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            className="mt-3 bg-transparent"
                            onClick={() => document.getElementById("photo-upload")?.click()}
                          >
                            <Camera className="w-4 h-4 mr-2" />
                            Trocar Foto
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <Upload className="w-8 sm:w-12 h-8 sm:h-12 text-gray-400 mx-auto mb-3" />
                          <p className="text-gray-600 mb-3 text-sm">Clique para adicionar uma foto</p>
                          <Button variant="outline" onClick={() => document.getElementById("photo-upload")?.click()}>
                            <Camera className="w-4 h-4 mr-2" />
                            Escolher Foto
                          </Button>
                        </div>
                      )}
                      <input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-sm font-bold text-gray-700">
                        Nome do Pet
                      </Label>
                      <Input
                        id="name"
                        value={petData.name}
                        onChange={(e) => setPetData({ ...petData, name: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="breed" className="text-sm font-bold text-gray-700">
                        Raça
                      </Label>
                      <Input
                        id="breed"
                        value={petData.breed}
                        onChange={(e) => setPetData({ ...petData, breed: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="gender" className="text-sm font-bold text-gray-700">
                        Sexo
                      </Label>
                      <Select
                        value={petData.gender}
                        onValueChange={(value) => setPetData({ ...petData, gender: value })}
                      >
                        <SelectTrigger className="mt-1 bg-white border border-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-300 shadow-lg">
                          <SelectItem value="Macho" className="hover:bg-gray-100">
                            Macho
                          </SelectItem>
                          <SelectItem value="Fêmea" className="hover:bg-gray-100">
                            Fêmea
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="birthDate" className="text-sm font-bold text-gray-700">
                        Data de Nascimento
                      </Label>
                      <Input
                        id="birthDate"
                        type="date"
                        value={petData.birthDate}
                        onChange={(e) => setPetData({ ...petData, birthDate: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="birthPlace" className="text-sm font-bold text-gray-700">
                      Local de Nascimento
                    </Label>
                    <Input
                      id="birthPlace"
                      value={petData.birthPlace}
                      onChange={(e) => setPetData({ ...petData, birthPlace: e.target.value })}
                      className="mt-1"
                      placeholder="Cidade, Estado"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="owner" className="text-sm font-bold text-gray-700">
                        Nome do Responsável
                      </Label>
                      <Input
                        id="owner"
                        value={petData.owner}
                        onChange={(e) => setPetData({ ...petData, owner: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="ownerCpf" className="text-sm font-bold text-gray-700">
                        CPF do Responsável
                      </Label>
                      <Input
                        id="ownerCpf"
                        value={petData.ownerCpf}
                        onChange={(e) => setPetData({ ...petData, ownerCpf: e.target.value })}
                        className="mt-1"
                        placeholder="000.000.000-00"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="registrationNumber" className="text-sm font-bold text-gray-700">
                      Número de Registro
                    </Label>
                    <Input
                      id="registrationNumber"
                      value={petData.registrationNumber}
                      onChange={(e) => setPetData({ ...petData, registrationNumber: e.target.value })}
                      className="mt-1"
                      placeholder="Gerado automaticamente"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Ações */}
              <Card className="bg-white shadow-lg border-0">
                <CardContent className="p-4 sm:p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="flex items-center justify-center bg-transparent">
                      <Share2 className="w-4 h-4 mr-2" />
                      Compartilhar
                    </Button>
                    <Button
                      onClick={handlePagar}
                      className="bg-pink-500 hover:bg-pink-600 text-white flex items-center justify-center"
                      disabled={!petData.name || !petData.photo}
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Pagar R$ 6,99
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Preview da Certidão - PADDING MOBILE CORRIGIDO */}
            <div className="lg:sticky lg:top-8">
              <Card className="bg-white shadow-2xl border-0 overflow-hidden">
                <CardHeader className={`${currentTheme.primary} text-white text-center py-4 sm:py-6`}>
                  <div className="flex items-center justify-center mb-2">
                    <Shield className="w-6 sm:w-8 h-6 sm:h-8 mr-2" />
                    <CardTitle className="text-xl sm:text-2xl font-black">
                      {isProdutoLiberado ? "CERTIDÃO LIBERADA" : "PREVIEW"}
                    </CardTitle>
                  </div>
                  <p className="text-sm opacity-90">
                    {isProdutoLiberado ? "Documento completo" : "Certidão de Nascimento"}
                  </p>
                </CardHeader>

                <CardContent className="p-4 sm:p-8">
                  {!isProdutoLiberado ? (
                    <div>
                      <PreviewParcial />
                      <div className="mt-6 text-center">
                        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-4 sm:p-6 border-2 border-pink-200">
                          <h4 className="font-bold text-pink-800 mb-2">🎨 Teste as Cores!</h4>
                          <p className="text-sm text-pink-600 mb-4">
                            Mude as cores e veja o preview mudando em tempo real!
                          </p>
                          <div className="bg-white rounded-xl p-4 mb-4 shadow-lg">
                            <h5 className="font-bold text-gray-800 mb-2">O que você vai receber:</h5>
                            <ul className="text-sm text-gray-600 space-y-1">
                              <li>✅ Certidão oficial em alta qualidade</li>
                              <li>✅ Arquivo PNG e PDF</li>
                              <li>✅ Design profissional</li>
                              <li>✅ Pronto para imprimir</li>
                              <li>✅ Entrega instantânea</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <CertidaoFinal />
                      <div className="text-center mt-6 sm:mt-8 space-y-4">
                        <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-4 sm:p-6 border-2 border-green-200">
                          <CheckCircle className="w-10 sm:w-12 h-10 sm:h-12 text-green-500 mx-auto mb-3" />
                          <h4 className="text-lg font-bold text-green-700 mb-2">🎉 Certidão Liberada!</h4>
                          <p className="text-sm text-green-600 mb-4">
                            Produto pago com sucesso! Agora você pode baixar.
                          </p>
                        </div>
                        <Button
                          onClick={handleDownload}
                          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3"
                        >
                          <Download className="w-4 h-4 mr-2" />📥 Baixar Certidão Completa (PNG + PDF)
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Pagamento */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">💳</div>
              <h3 className="text-2xl font-black text-purple-900 mb-2">Finalizar Pagamento</h3>
              <p className="text-gray-600">Certidão de Nascimento</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Certidão do Pet</span>
                <span className="font-bold text-lg">R$ 6,99</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleFinalizarPagamento}
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-4"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Pagar Agora
              </Button>
            </div>

            <div className="mt-6 text-center">
              <Button
                variant="ghost"
                onClick={() => setShowPayment(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
