"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Copy, Clock, Shield, Zap } from "lucide-react"

interface PaymentGatewayProps {
  produto: string
  valor: number
  onSuccess: () => void
  onCancel: () => void
}

export default function PaymentGateway({ produto, valor, onSuccess, onCancel }: PaymentGatewayProps) {
  const [metodoSelecionado, setMetodoSelecionado] = useState("")
  const [processando, setProcessando] = useState(false)
  const [dadosCartao, setDadosCartao] = useState({
    numero: "",
    nome: "",
    validade: "",
    cvv: "",
  })
  const [pixCode, setPixCode] = useState("")

  const processarPagamento = async (metodo: string) => {
    setProcessando(true)
    setMetodoSelecionado(metodo)

    // Simular diferentes tempos de processamento
    const tempos = {
      pix: 2000,
      cartao: 3000,
      boleto: 1500,
    }

    if (metodo === "pix") {
      // Gerar código PIX simulado
      setPixCode(
        "00020126580014BR.GOV.BCB.PIX0136123e4567-e12b-12d1-a456-426614174000520400005303986540" +
          valor.toFixed(2) +
          "5802BR5913MeuPetDoc6009SAO PAULO62070503***6304",
      )
    }

    setTimeout(
      () => {
        setProcessando(false)
        onSuccess()
      },
      tempos[metodo as keyof typeof tempos] || 2000,
    )
  }

  const copiarPixCode = () => {
    navigator.clipboard.writeText(pixCode)
    alert("Código PIX copiado!")
  }

  if (processando) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <h3 className="text-xl font-bold text-purple-900 mb-2">Processando Pagamento</h3>
            <p className="text-gray-600 mb-4">
              {metodoSelecionado === "pix" && "Aguardando confirmação do PIX..."}
              {metodoSelecionado === "cartao" && "Validando dados do cartão..."}
              {metodoSelecionado === "boleto" && "Gerando boleto..."}
            </p>
            <div className="bg-gray-100 rounded-lg p-3">
              <p className="text-sm text-gray-600">
                <Shield className="w-4 h-4 inline mr-1" />
                Transação 100% segura
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (metodoSelecionado === "pix" && pixCode) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="text-4xl mb-2">📱</div>
            <CardTitle className="text-purple-900">Pagamento PIX</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">⏰</div>
              <p className="font-bold text-green-700">Expira em: 15:00</p>
              <p className="text-sm text-green-600">Tempo restante para pagamento</p>
            </div>

            <div className="space-y-3">
              <div className="text-center">
                <div className="w-48 h-48 bg-gray-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <div className="text-6xl">📱</div>
                </div>
                <p className="text-sm text-gray-600">Escaneie o QR Code com seu app do banco</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <Label className="text-xs font-bold text-gray-600 uppercase">Código PIX</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Input value={pixCode} readOnly className="text-xs font-mono" />
                  <Button onClick={copiarPixCode} size="sm" variant="outline">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <span className="font-bold text-blue-700">Aprovação Instantânea</span>
                </div>
                <p className="text-sm text-blue-600">Assim que pagar, seu produto será liberado automaticamente!</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={onCancel} variant="outline" className="flex-1 bg-transparent">
                Cancelar
              </Button>
              <Button onClick={() => processarPagamento("pix")} className="flex-1 bg-green-500 hover:bg-green-600">
                Já Paguei
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (metodoSelecionado === "cartao") {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="text-4xl mb-2">💳</div>
            <CardTitle className="text-purple-900">Dados do Cartão</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="numero">Número do Cartão</Label>
              <Input
                id="numero"
                placeholder="1234 5678 9012 3456"
                value={dadosCartao.numero}
                onChange={(e) => setDadosCartao({ ...dadosCartao, numero: e.target.value })}
                maxLength={19}
              />
            </div>

            <div>
              <Label htmlFor="nome">Nome no Cartão</Label>
              <Input
                id="nome"
                placeholder="JOÃO SILVA"
                value={dadosCartao.nome}
                onChange={(e) => setDadosCartao({ ...dadosCartao, nome: e.target.value.toUpperCase() })}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="validade">Validade</Label>
                <Input
                  id="validade"
                  placeholder="MM/AA"
                  value={dadosCartao.validade}
                  onChange={(e) => setDadosCartao({ ...dadosCartao, validade: e.target.value })}
                  maxLength={5}
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={dadosCartao.cvv}
                  onChange={(e) => setDadosCartao({ ...dadosCartao, cvv: e.target.value })}
                  maxLength={4}
                />
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-4 h-4 text-blue-500" />
                <span className="font-bold text-blue-700">Parcelamento</span>
              </div>
              <p className="text-sm text-blue-600">1x de R$ {valor.toFixed(2)} sem juros</p>
            </div>

            <div className="flex gap-3">
              <Button onClick={onCancel} variant="outline" className="flex-1 bg-transparent">
                Cancelar
              </Button>
              <Button
                onClick={() => processarPagamento("cartao")}
                className="flex-1 bg-blue-500 hover:bg-blue-600"
                disabled={!dadosCartao.numero || !dadosCartao.nome || !dadosCartao.validade || !dadosCartao.cvv}
              >
                Pagar R$ {valor.toFixed(2)}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="text-4xl mb-2">💳</div>
          <CardTitle className="text-purple-900">Finalizar Pagamento</CardTitle>
          <p className="text-gray-600">Escolha a forma de pagamento</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Resumo do Produto */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold">{produto}</span>
              <span className="font-bold text-lg">R$ {valor.toFixed(2)}</span>
            </div>
            <div className="text-sm text-gray-500 mt-1">Produto digital completo</div>
          </div>

          {/* Métodos de Pagamento */}
          <div className="space-y-3">
            {/* PIX */}
            <Button
              onClick={() => setMetodoSelecionado("pix")}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 rounded-xl flex items-center justify-between"
            >
              <div className="flex items-center">
                <div className="text-2xl mr-3">📱</div>
                <div className="text-left">
                  <div className="font-bold">PIX</div>
                  <div className="text-sm opacity-90">Aprovação instantânea</div>
                </div>
              </div>
              <Badge className="bg-green-600 text-white">
                <Zap className="w-3 h-3 mr-1" />
                Rápido
              </Badge>
            </Button>

            {/* Cartão */}
            <Button
              onClick={() => setMetodoSelecionado("cartao")}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold py-4 rounded-xl flex items-center justify-between"
            >
              <div className="flex items-center">
                <div className="text-2xl mr-3">💳</div>
                <div className="text-left">
                  <div className="font-bold">Cartão de Crédito</div>
                  <div className="text-sm opacity-90">Parcelamento disponível</div>
                </div>
              </div>
              <Badge className="bg-blue-600 text-white">
                <CreditCard className="w-3 h-3 mr-1" />
                Seguro
              </Badge>
            </Button>

            {/* Boleto */}
            <Button
              onClick={() => processarPagamento("boleto")}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 rounded-xl flex items-center justify-between"
            >
              <div className="flex items-center">
                <div className="text-2xl mr-3">🧾</div>
                <div className="text-left">
                  <div className="font-bold">Boleto</div>
                  <div className="text-sm opacity-90">Vencimento em 3 dias</div>
                </div>
              </div>
              <Badge className="bg-orange-600 text-white">
                <Clock className="w-3 h-3 mr-1" />3 dias
              </Badge>
            </Button>
          </div>

          <div className="text-center">
            <Button variant="ghost" onClick={onCancel} className="text-gray-500 hover:text-gray-700">
              Cancelar
            </Button>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              🔒 Pagamento 100% seguro • SSL • Enviamos por email em até 5 minutos
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
