"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Upload,
  ArrowLeft,
  Shield,
  Plus,
  Trash2,
  CheckCircle,
  Clock,
  AlertTriangle,
  CreditCard,
  Eye,
  Lock,
} from "lucide-react"
import Link from "next/link"

export default function PainelVacina() {
  const [petData, setPetData] = useState({
    nome: "Rex",
    raca: "Golden Retriever",
    sexo: "Macho",
    dataNascimento: "2020-05-15",
    nomeDono: "João Silva",
    telefone: "(11) 99999-9999",
    corTema: "verde",
  })

  const [vacinas, setVacinas] = useState([
    {
      id: 1,
      nome: "V8 Múltipla",
      data: "2024-03-15",
      veterinario: "Dr. Carlos Silva",
      lote: "ABC123",
      status: "aplicada",
      proximaDose: "2025-03-15",
    },
    {
      id: 2,
      nome: "Antirrábica",
      data: "2024-04-20",
      veterinario: "Dr. Carlos Silva",
      lote: "DEF456",
      status: "aplicada",
      proximaDose: "2025-04-20",
    },
    {
      id: 3,
      nome: "V10 Múltipla",
      data: "",
      veterinario: "",
      lote: "",
      status: "pendente",
      proximaDose: "2024-09-15",
    },
  ])

  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null)
  const [showPayment, setShowPayment] = useState(false)
  const [isPaid, setIsPaid] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const coresTema = [
    {
      id: "verde",
      nome: "Verde Saúde",
      primary: "#10b981",
      secondary: "#34d399",
      accent: "#6ee7b7",
      dark: "#047857",
    },
    {
      id: "azul",
      nome: "Azul Médico",
      primary: "#3b82f6",
      secondary: "#60a5fa",
      accent: "#93c5fd",
      dark: "#1d4ed8",
    },
    {
      id: "roxo",
      nome: "Roxo Cuidado",
      primary: "#8b5cf6",
      secondary: "#a78bfa",
      accent: "#c4b5fd",
      dark: "#7c3aed",
    },
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

  const corSelecionada = coresTema.find((cor) => cor.id === petData.corTema) || coresTema[0]

  const handlePagar = () => {
    setShowPayment(true)
  }

  const handleFinalizarPagamento = () => {
    setIsPaid(true)
    setShowPayment(false)
    alert("🎉 Pagamento aprovado! Carteira de vacina liberada com sucesso!")
  }

  const adicionarVacina = () => {
    const novaVacina = {
      id: Date.now(),
      nome: "",
      data: "",
      veterinario: "",
      lote: "",
      status: "pendente",
      proximaDose: "",
    }
    setVacinas([...vacinas, novaVacina])
  }

  const removerVacina = (id: number) => {
    setVacinas(vacinas.filter((v) => v.id !== id))
  }

  const atualizarVacina = (id: number, campo: string, valor: string) => {
    setVacinas(
      vacinas.map((v) =>
        v.id === id ? { ...v, [campo]: valor, status: valor && campo === "data" ? "aplicada" : v.status } : v,
      ),
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "aplicada":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "pendente":
        return <Clock className="w-4 h-4 text-yellow-500" />
      case "atrasada":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "aplicada":
        return "bg-green-100 text-green-700"
      case "pendente":
        return "bg-yellow-100 text-yellow-700"
      case "atrasada":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  // Preview Parcial da Carteira
  const PreviewParcial = () => {
    return (
      <div className="relative">
        <h3 className="font-bold text-purple-700 mb-4 flex items-center">
          <Eye className="w-5 h-5 mr-2" />
          Preview das Cores
        </h3>
        <div
          className="relative w-full max-w-2xl mx-auto rounded-3xl shadow-2xl overflow-hidden border-4"
          style={{
            background: `linear-gradient(135deg, ${corSelecionada.accent} 0%, ${corSelecionada.secondary} 50%, ${corSelecionada.primary} 100%)`,
            borderColor: corSelecionada.secondary,
          }}
        >
          {/* Header */}
          <div
            className="text-center py-6 text-white"
            style={{ background: `linear-gradient(135deg, ${corSelecionada.primary}, ${corSelecionada.dark})` }}
          >
            <div className="text-3xl mb-2">💉</div>
            <h1 className="text-2xl font-black mb-1">CARTEIRA DE VACINA</h1>
            <p className="text-sm opacity-90">Controle de Imunização Animal</p>
          </div>

          {/* Overlay central cobrindo o conteúdo */}
          <div
            className="absolute inset-0 flex items-center justify-center z-20"
            style={{ top: "100px", bottom: "50px" }}
          >
            <div className="bg-black/90 backdrop-blur-sm rounded-2xl p-8 text-center border-2 border-white/30">
              <Lock className="w-12 h-12 text-white mx-auto mb-4" />
              <h4 className="text-white font-bold text-lg mb-2">Carteira Bloqueada</h4>
              <p className="text-white/80 text-sm mb-4">Pague para ver a carteira completa!</p>
              <div className="text-2xl">💉</div>
            </div>
          </div>

          {/* Footer visível */}
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <p className="text-xs text-white/80">Documento emitido em {new Date().toLocaleDateString("pt-BR")}</p>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-purple-600 font-medium">
            ✨ As cores mudam conforme sua seleção! Pague R$ 5,99 para ver o conteúdo completo.
          </p>
        </div>
      </div>
    )
  }

  // Carteira Final (só aparece após pagamento)
  const CarteiraFinal = () => {
    if (!isPaid) return null

    return (
      <div className="max-w-2xl mx-auto">
        <div
          className="rounded-3xl shadow-2xl overflow-hidden border-4"
          style={{
            background: `linear-gradient(135deg, ${corSelecionada.accent} 0%, ${corSelecionada.secondary} 50%, ${corSelecionada.primary} 100%)`,
            borderColor: corSelecionada.secondary,
          }}
        >
          {/* Header */}
          <div
            className="text-center py-6 text-white"
            style={{ background: `linear-gradient(135deg, ${corSelecionada.primary}, ${corSelecionada.dark})` }}
          >
            <div className="text-3xl mb-2">💉</div>
            <h1 className="text-2xl font-black mb-1">CARTEIRA DE VACINA</h1>
            <p className="text-sm opacity-90">Controle de Imunização Animal</p>
          </div>

          {/* Dados do Pet */}
          <div className="p-6">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 mb-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {uploadedPhoto ? (
                    <img
                      src={uploadedPhoto || "/placeholder.svg"}
                      alt="Pet"
                      className="w-20 h-24 object-cover rounded-lg shadow-md border-2 border-white"
                    />
                  ) : (
                    <div className="w-20 h-24 bg-gray-200 rounded-lg shadow-md border-2 border-white flex items-center justify-center">
                      <Shield className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-2">
                  <div>
                    <label
                      className={`text-xs font-bold ${corSelecionada.accent.replace("text-", "text-")} uppercase tracking-wide`}
                    >
                      Nome do Pet
                    </label>
                    <p className="text-lg font-black text-gray-900">{petData.nome}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase">Raça</label>
                      <p className="text-sm font-semibold text-gray-700">{petData.raca}</p>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase">Sexo</label>
                      <p className="text-sm font-semibold text-gray-700">{petData.sexo}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase">Nascimento</label>
                    <p className="text-sm font-semibold text-gray-700">
                      {new Date(petData.dataNascimento).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Lista de Vacinas */}
            <div className="space-y-3">
              <h3 className="text-lg font-black text-white mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Histórico de Vacinas
              </h3>

              {vacinas.map((vacina) => (
                <div key={vacina.id} className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(vacina.status)}
                      <div>
                        <h4 className="font-bold text-gray-900">{vacina.nome || "Nova Vacina"}</h4>
                        <p className="text-xs text-gray-500">
                          {vacina.data ? new Date(vacina.data).toLocaleDateString("pt-BR") : "Data não informada"}
                        </p>
                      </div>
                    </div>
                    <Badge className={`${getStatusColor(vacina.status)} text-xs font-bold`}>
                      {vacina.status === "aplicada"
                        ? "APLICADA"
                        : vacina.status === "pendente"
                          ? "PENDENTE"
                          : "ATRASADA"}
                    </Badge>
                  </div>

                  {vacina.veterinario && (
                    <div className="text-xs text-gray-600 mb-1">
                      <strong>Veterinário:</strong> {vacina.veterinario}
                    </div>
                  )}

                  {vacina.lote && (
                    <div className="text-xs text-gray-600 mb-1">
                      <strong>Lote:</strong> {vacina.lote}
                    </div>
                  )}

                  {vacina.proximaDose && (
                    <div className="text-xs text-gray-600">
                      <strong>Próxima dose:</strong> {new Date(vacina.proximaDose).toLocaleDateString("pt-BR")}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Dados do Responsável */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 mt-6 shadow-lg">
              <h4
                className={`text-sm font-black ${corSelecionada.accent.replace("text-", "text-")} mb-2 uppercase tracking-wide`}
              >
                Responsável Legal
              </h4>
              <div className="space-y-1">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Nome</label>
                  <p className="text-sm font-semibold text-gray-900">{petData.nomeDono}</p>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Telefone</label>
                  <p className="text-sm font-semibold text-gray-900">{petData.telefone}</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-6">
              <p className="text-xs text-white/80">Documento emitido em {new Date().toLocaleDateString("pt-BR")}</p>
              <div className="mt-2 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/20 rounded border-2 border-white/30 flex items-center justify-center">
                  <span className="text-xs text-white/60">QR Code</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao início
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-purple-900 mb-2">
                🎯 Carteira de Vacina - Preview das Cores! 💉
              </h1>
              <p className="text-gray-600">Controle completo das vacinas do seu pet!</p>
            </div>
            <div className="text-right">
              {isPaid ? (
                <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold mb-2">
                  ✅ CARTEIRA LIBERADA ✅
                </div>
              ) : (
                <div className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-bold mb-2">
                  👁️ PREVIEW PARCIAL 👁️
                </div>
              )}
              <div className="text-sm text-gray-600">
                {isPaid ? "Produto pago e liberado!" : "Veja as cores mudando!"}
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulário */}
          <div className="space-y-6">
            {/* Upload da Foto */}
            <Card>
              <CardHeader>
                <CardTitle className="text-purple-900">📸 Foto do Pet</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {uploadedPhoto ? (
                    <div className="space-y-4">
                      <img
                        src={uploadedPhoto || "/placeholder.svg"}
                        alt="Pet"
                        className="w-32 h-40 object-cover mx-auto rounded-lg shadow-md"
                      />
                      <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                        Trocar Foto
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                      <div>
                        <Button onClick={() => fileInputRef.current?.click()}>Escolher Foto</Button>
                        <p className="text-sm text-gray-500 mt-2">Formato recomendado: JPG, PNG</p>
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
            <Card>
              <CardHeader>
                <CardTitle className="text-purple-900">🐕 Dados do Pet</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="nome">Nome do Pet *</Label>
                  <Input
                    id="nome"
                    placeholder="Ex: Rex, Mimi..."
                    value={petData.nome}
                    onChange={(e) => setPetData({ ...petData, nome: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="raca">Raça</Label>
                    <Input
                      id="raca"
                      placeholder="Ex: Golden Retriever"
                      value={petData.raca}
                      onChange={(e) => setPetData({ ...petData, raca: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="sexo">Sexo</Label>
                    <Select value={petData.sexo} onValueChange={(value) => setPetData({ ...petData, sexo: value })}>
                      <SelectTrigger className="bg-white border border-gray-300">
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
                </div>

                <div>
                  <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                  <Input
                    id="dataNascimento"
                    type="date"
                    value={petData.dataNascimento}
                    onChange={(e) => setPetData({ ...petData, dataNascimento: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Dados do Responsável */}
            <Card>
              <CardHeader>
                <CardTitle className="text-purple-900">👤 Dados do Responsável</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="nomeDono">Nome Completo</Label>
                  <Input
                    id="nomeDono"
                    placeholder="Seu nome completo"
                    value={petData.nomeDono}
                    onChange={(e) => setPetData({ ...petData, nomeDono: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    placeholder="(11) 99999-9999"
                    value={petData.telefone}
                    onChange={(e) => setPetData({ ...petData, telefone: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Gerenciar Vacinas */}
            <Card>
              <CardHeader>
                <CardTitle className="text-purple-900 flex items-center justify-between">
                  💉 Vacinas
                  <Button onClick={adicionarVacina} size="sm" className="bg-green-500 hover:bg-green-600">
                    <Plus className="w-4 h-4 mr-1" />
                    Adicionar
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {vacinas.map((vacina) => (
                  <div key={vacina.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <Input
                        placeholder="Nome da vacina"
                        value={vacina.nome}
                        onChange={(e) => atualizarVacina(vacina.id, "nome", e.target.value)}
                        className="flex-1 mr-2"
                      />
                      <Button
                        onClick={() => removerVacina(vacina.id)}
                        size="sm"
                        variant="outline"
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label>Data de Aplicação</Label>
                        <Input
                          type="date"
                          value={vacina.data}
                          onChange={(e) => atualizarVacina(vacina.id, "data", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Próxima Dose</Label>
                        <Input
                          type="date"
                          value={vacina.proximaDose}
                          onChange={(e) => atualizarVacina(vacina.id, "proximaDose", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label>Veterinário</Label>
                        <Input
                          placeholder="Dr. Nome"
                          value={vacina.veterinario}
                          onChange={(e) => atualizarVacina(vacina.id, "veterinario", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Lote</Label>
                        <Input
                          placeholder="ABC123"
                          value={vacina.lote}
                          onChange={(e) => atualizarVacina(vacina.id, "lote", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Escolha da Cor */}
            <Card>
              <CardHeader>
                <CardTitle className="text-purple-900">🎨 Tema da Carteira</CardTitle>
                <p className="text-sm text-gray-600">Veja as cores mudando no preview ao lado!</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  {coresTema.map((cor) => (
                    <button
                      key={cor.id}
                      onClick={() => setPetData({ ...petData, corTema: cor.id })}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        petData.corTema === cor.id
                          ? "border-purple-500 bg-purple-50 shadow-lg"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-12 h-8 rounded-lg shadow-md"
                          style={{
                            background: `linear-gradient(135deg, ${cor.primary} 0%, ${cor.secondary} 100%)`,
                          }}
                        ></div>
                        <div className="text-left">
                          <p className="font-bold text-gray-800">{cor.nome}</p>
                          <p className="text-sm text-gray-500">Tema {cor.nome.toLowerCase()}</p>
                        </div>
                        {petData.corTema === cor.id && (
                          <div className="ml-auto">
                            <CheckCircle className="w-5 h-5 text-purple-500" />
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview */}
          <div className="space-y-6">
            {!isPaid ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-purple-700 flex items-center">
                    <Eye className="w-5 h-5 mr-2" />
                    Preview das Cores
                  </CardTitle>
                  <p className="text-sm text-gray-600">Veja as cores mudando! Pague para ver o conteúdo completo.</p>
                </CardHeader>
                <CardContent>
                  <PreviewParcial />

                  <div className="mt-8 space-y-4">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 text-center border-2 border-green-200">
                      <h4 className="font-bold text-green-800 mb-2">💉 Teste as Cores!</h4>
                      <p className="text-sm text-green-600 mb-4">
                        Mude as cores no formulário e veja o preview mudando em tempo real!
                      </p>

                      <div className="bg-white rounded-xl p-4 mb-4 shadow-lg">
                        <h5 className="font-bold text-gray-800 mb-2">O que você vai receber:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>✅ Carteira de vacina completa</li>
                          <li>✅ Arquivo PNG e PDF</li>
                          <li>✅ Controle de vacinas</li>
                          <li>✅ Design profissional</li>
                          <li>✅ Entrega instantânea</li>
                        </ul>
                      </div>

                      <Button
                        onClick={handlePagar}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 text-lg shadow-lg transform hover:scale-105 transition-all"
                        disabled={!petData.nome}
                      >
                        <CreditCard className="w-5 h-5 mr-2" />
                        Pagar R$ 5,99 e Ver Resultado Completo!
                      </Button>

                      {!petData.nome && (
                        <p className="text-sm text-red-500 mt-4">⚠️ Preencha o nome do pet para continuar</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-700 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Carteira de Vacina - LIBERADA!
                  </CardTitle>
                  <p className="text-sm text-gray-600">Pagamento aprovado! Aqui está o resultado:</p>
                </CardHeader>
                <CardContent>
                  <CarteiraFinal />

                  <div className="text-center mt-8 space-y-4">
                    <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-6 border-2 border-green-200">
                      <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                      <h4 className="text-lg font-bold text-green-700 mb-2">🎉 Carteira Liberada!</h4>
                      <p className="text-sm text-green-600 mb-4">Produto pago com sucesso! Agora você pode baixar.</p>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3">
                      📥 Baixar Carteira Completa (PNG + PDF)
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Pagamento */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">💉</div>
              <h3 className="text-2xl font-black text-purple-900 mb-2">Finalizar Pagamento</h3>
              <p className="text-gray-600">Carteira de Vacina</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Carteira de Vacina</span>
                <span className="font-bold text-lg">R$ 5,99</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleFinalizarPagamento}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4"
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
