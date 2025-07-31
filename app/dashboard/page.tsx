"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Heart,
  Globe,
  Star,
  Edit3,
  Eye,
  Download,
  Share2,
  Clock,
  Sparkles,
  Gift,
  Zap,
  Crown,
  Camera,
  Music,
  Award,
  Palette,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const router = useRouter()
  const [timeLeft, setTimeLeft] = useState(3600) // 1 hora em segundos

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const products = [
    {
      id: "rg",
      title: "RG do Pet",
      description: "Documento oficial personalizado",
      icon: FileText,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      price: "R$ 4,79",
      status: "Disponível",
      editRoute: "/painel",
      features: ["Foto 3x4", "QR Code único", "Dados oficiais", "5 cores disponíveis"],
    },
    {
      id: "certidao",
      title: "Certidão de Nascimento",
      description: "Documento oficial de nascimento",
      icon: Heart,
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
      price: "R$ 6,99",
      status: "Disponível",
      editRoute: "/painel-certidao",
      features: ["Brasão oficial", "Dados completos", "Validação digital", "Impressão premium"],
    },
    {
      id: "site",
      title: "Site Virtual do Pet",
      description: "Página exclusiva na internet",
      icon: Globe,
      color: "from-cyan-500 to-blue-500",
      bgColor: "bg-cyan-50",
      price: "R$ 12,99",
      status: "Disponível",
      editRoute: "/painel-virtual",
      features: ["Galeria de fotos", "Vídeos", "História do pet", "Link personalizado"],
    },
    {
      id: "memorial",
      title: "Memorial Eterno",
      description: "Página de lembranças especiais",
      icon: Star,
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50",
      price: "R$ 9,99",
      status: "Disponível",
      editRoute: "/painel-lembrancas",
      features: ["Música especial", "Galeria memorial", "Mensagens", "Acesso eterno"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <img src="/images/meupetdoc-logo.png" alt="MeuPetDoc" className="w-24 h-auto" />
          </div>
          <h1 className="text-3xl font-black text-purple-900 mb-2">Dashboard do Pet 🐾</h1>
          <p className="text-gray-600">Crie documentos únicos para seu amiguinho!</p>
        </div>

        {/* Oferta Especial com Countdown */}
        <Card className="mb-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 shadow-2xl">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Crown className="w-8 h-8 mr-2 animate-pulse" />
                <h2 className="text-2xl font-black">OFERTA ESPECIAL!</h2>
                <Crown className="w-8 h-8 ml-2 animate-pulse" />
              </div>

              <div className="bg-white/20 rounded-2xl p-4 mb-4">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="w-5 h-5 mr-2" />
                  <span className="text-sm font-bold">TEMPO LIMITADO:</span>
                </div>
                <div className="text-4xl font-black text-yellow-300 mb-2">{formatTime(timeLeft)}</div>
                <div className="text-sm opacity-90">Esta oferta expira em breve!</div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white/20 rounded-xl p-3">
                  <div className="text-2xl font-black">COMBO</div>
                  <div className="text-sm opacity-90">Todos os produtos</div>
                  <div className="text-lg font-bold text-yellow-300">R$ 19,99</div>
                  <div className="text-xs line-through opacity-75">R$ 33,76</div>
                </div>
                <div className="bg-white/20 rounded-xl p-3">
                  <div className="text-2xl font-black">ECONOMIA</div>
                  <div className="text-sm opacity-90">Você economiza</div>
                  <div className="text-lg font-bold text-green-300">R$ 13,77</div>
                  <div className="text-xs">41% OFF!</div>
                </div>
              </div>

              <Button className="w-full bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-black py-4 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all">
                <Gift className="w-5 h-5 mr-2" />
                QUERO O COMBO AGORA!
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs para organizar produtos */}
        <Tabs defaultValue="produtos" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="produtos" className="flex items-center">
              <Sparkles className="w-4 h-4 mr-2" />
              Produtos
            </TabsTrigger>
            <TabsTrigger value="meus-documentos" className="flex items-center">
              <Award className="w-4 h-4 mr-2" />
              Meus Documentos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="produtos">
            <div className="grid gap-6 md:grid-cols-2">
              {products.map((product) => {
                const IconComponent = product.icon
                return (
                  <Card
                    key={product.id}
                    className="bg-white shadow-xl border-0 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <CardHeader className={`bg-gradient-to-r ${product.color} text-white p-6`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <IconComponent className="w-8 h-8 mr-3" />
                          <div>
                            <CardTitle className="text-xl font-black">{product.title}</CardTitle>
                            <p className="text-sm opacity-90">{product.description}</p>
                          </div>
                        </div>
                        <Badge className="bg-white/20 text-white border-0 font-bold">{product.price}</Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {/* Features */}
                        <div>
                          <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                            <Zap className="w-4 h-4 mr-2 text-yellow-500" />
                            Recursos inclusos:
                          </h4>
                          <ul className="space-y-1">
                            {product.features.map((feature, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-center">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Preview mockup baseado no produto */}
                        <div className={`${product.bgColor} rounded-xl p-4`}>
                          {product.id === "rg" && (
                            <div className="bg-white rounded-lg p-3 shadow-md">
                              <div className="flex items-center mb-2">
                                <div className="w-8 h-10 bg-blue-300 rounded mr-3"></div>
                                <div>
                                  <div className="text-xs font-bold text-purple-900">RG DO PET</div>
                                  <div className="text-xs text-gray-600">Nome: Seu Pet</div>
                                </div>
                              </div>
                              <div className="text-xs text-gray-500">Documento oficial personalizado</div>
                            </div>
                          )}

                          {product.id === "certidao" && (
                            <div className="bg-white rounded-lg p-3 shadow-md">
                              <div className="text-center mb-2">
                                <div className="text-xs font-bold text-pink-700">🏛️ CERTIDÃO</div>
                                <div className="w-6 h-8 bg-pink-300 rounded mx-auto my-2"></div>
                              </div>
                              <div className="text-xs text-gray-500">Documento oficial de nascimento</div>
                            </div>
                          )}

                          {product.id === "site" && (
                            <div className="bg-white rounded-lg p-3 shadow-md">
                              <div className="bg-cyan-400 text-white text-xs p-2 rounded-t mb-2">
                                🌐 meupet.site/seupet
                              </div>
                              <div className="flex items-center">
                                <div className="w-6 h-6 bg-cyan-300 rounded-full mr-2"></div>
                                <div className="text-xs text-gray-600">Site do seu pet</div>
                              </div>
                            </div>
                          )}

                          {product.id === "memorial" && (
                            <div className="bg-white rounded-lg p-3 shadow-md">
                              <div className="text-center mb-2">
                                <div className="text-xs font-bold text-yellow-700">✨ Memorial</div>
                                <div className="w-6 h-6 bg-yellow-300 rounded-full mx-auto my-2 flex items-center justify-center">
                                  <Heart className="w-3 h-3 text-white" />
                                </div>
                              </div>
                              <div className="text-xs text-gray-500">Página de lembranças</div>
                            </div>
                          )}
                        </div>

                        {/* Action buttons */}
                        <div className="grid grid-cols-2 gap-3">
                          <Button
                            variant="outline"
                            className="flex items-center justify-center border-2 hover:bg-gray-50 bg-transparent"
                            onClick={() => router.push(product.editRoute)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                          </Button>
                          <Button
                            className={`bg-gradient-to-r ${product.color} text-white font-bold hover:opacity-90`}
                            onClick={() => router.push(product.editRoute)}
                          >
                            <Edit3 className="w-4 h-4 mr-2" />
                            Editar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="meus-documentos">
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhum documento criado ainda</h3>
              <p className="text-gray-600 mb-6">Comece criando seu primeiro documento para seu pet!</p>
              <Button
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-3 rounded-full"
                onClick={() => router.push("/painel")}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Criar Primeiro Documento
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card className="mt-8 bg-white shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center text-purple-900">
              <Palette className="w-5 h-5 mr-2" />
              Ações Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="flex flex-col items-center p-4 h-auto bg-transparent">
                <Camera className="w-6 h-6 mb-2 text-purple-600" />
                <span className="text-sm">Upload Foto</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center p-4 h-auto bg-transparent">
                <Download className="w-6 h-6 mb-2 text-green-600" />
                <span className="text-sm">Downloads</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center p-4 h-auto bg-transparent">
                <Share2 className="w-6 h-6 mb-2 text-blue-600" />
                <span className="text-sm">Compartilhar</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center p-4 h-auto bg-transparent">
                <Music className="w-6 h-6 mb-2 text-pink-600" />
                <span className="text-sm">Música</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
