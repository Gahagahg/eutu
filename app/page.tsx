"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Shield,
  CheckCircle,
  Instagram,
  Heart,
  Globe,
  FileText,
  Camera,
  Music,
  Star,
  Mail,
  Zap,
  Gift,
  Clock,
  Smartphone,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function MeuPetDocLanding() {
  const router = useRouter()
  const [selectedModel, setSelectedModel] = useState("")
  const [petData, setPetData] = useState({
    name: "",
    breed: "",
    gender: "",
    birthDate: "",
    owner: "",
  })
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null)

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

  const handleTesteGratis = (produto: string) => {
    // Redirecionar para o painel específico
    const paineis = {
      rg: "/painel",
      certidao: "/painel-certidao",
      site: "/painel-virtual",
      lembrancas: "/painel-lembrancas",
      vacina: "/painel-vacina",
    }
    router.push(paineis[produto as keyof typeof paineis] || "/painel")
  }

  const handleDownload = () => {
    alert("Documento gerado com sucesso! Download iniciado.")
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Hero Section */}
      <section className="px-4 py-8 text-center bg-gradient-to-b from-purple-50 to-pink-50">
        <div className="max-w-lg mx-auto">
          {/* Logo Real */}
          <div className="mb-8">
            <img src="/images/meupetdoc-logo.png" alt="MeuPetDoc Logo" className="w-32 h-auto mx-auto" />
          </div>

          {/* Imagem dos Cartões Coloridos */}
          <div className="mb-8">
            <img
              src="/images/pet-cards.png"
              alt="Documentos para pets"
              className="w-full max-w-2xl mx-auto rounded-2xl shadow-lg"
            />
          </div>

          {/* Texto Principal */}
          <h1 className="text-3xl font-black text-purple-900 mb-4 leading-tight">
            Crie Documentos Únicos para Seu Pet em Menos de 1 Minuto!
          </h1>

          {/* Subtítulo */}
          <p className="text-gray-600 mb-6 text-lg leading-relaxed">
            RG, Certidão, Site Virtual, Carteira de Vacina e muito mais! Teste GRÁTIS agora! ✨
          </p>

          {/* Badges de benefícios */}
          <div className="flex justify-center space-x-2 mb-8">
            <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold flex items-center">
              <Zap className="w-4 h-4 mr-1" />
              Teste Grátis
            </div>
            <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold flex items-center">
              <Mail className="w-4 h-4 mr-1" />
              Enviamos por Email
            </div>
            <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-bold flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              Em 1 Minuto
            </div>
          </div>

          {/* Botão CTA principal */}
          <Button
            className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-black py-4 px-8 rounded-full text-lg shadow-xl transform hover:scale-105 transition-all duration-200"
            onClick={() => document.getElementById("nossos-produtos")?.scrollIntoView({ behavior: "smooth" })}
          >
            🎉 TESTAR GRÁTIS AGORA! 🎉
          </Button>

          {/* Elementos decorativos */}
          <div className="mt-6 flex justify-center space-x-4 text-2xl">
            <span className="animate-bounce">🐶</span>
            <span className="animate-bounce delay-100">💖</span>
            <span className="animate-bounce delay-200">🐱</span>
          </div>
        </div>
      </section>

      {/* SEÇÃO: Nossos Produtos */}
      <section id="nossos-produtos" className="px-4 py-12 bg-white">
        <div className="max-w-lg mx-auto">
          <h2 className="text-3xl font-black text-purple-900 text-center mb-2">Nossos Produtos</h2>
          <p className="text-gray-600 text-center mb-8">Teste GRÁTIS e veja como fica! Pague só se gostar! 🎯</p>

          {/* Produto 1: RG do Pet */}
          <Card className="bg-white rounded-3xl shadow-xl mb-8 overflow-hidden border-2 border-purple-100 hover:shadow-2xl transition-all">
            <CardContent className="p-0">
              {/* Header do produto */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 text-white text-center">
                <div className="flex items-center justify-center mb-2">
                  <FileText className="w-6 h-6 mr-2" />
                  <h3 className="text-xl font-black">RG do Pet</h3>
                </div>
                <p className="text-sm opacity-90">Documento oficial personalizado</p>
              </div>

              {/* Preview MELHORADO do RG */}
              <div className="p-6">
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-4 mb-4">
                  {/* Simulação mais realista do RG */}
                  <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-4 text-white shadow-lg">
                    <div className="text-center mb-3">
                      <div className="text-xs font-bold mb-1">🐾 PET ID BRASIL 🐾</div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-1 space-y-2">
                        <div className="bg-white/90 rounded p-2">
                          <div className="text-xs font-bold text-blue-700">NOME DO PET</div>
                          <div className="text-sm font-black text-gray-800">SEU PET AQUI</div>
                        </div>
                        <div className="bg-white/90 rounded p-2">
                          <div className="text-xs font-bold text-blue-700">ESPÉCIE</div>
                          <div className="text-xs font-bold text-gray-800">CACHORRO</div>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          <div className="bg-white/90 rounded p-1">
                            <div className="text-xs font-bold text-blue-700">SEXO</div>
                            <div className="text-xs text-gray-800">MACHO</div>
                          </div>
                          <div className="bg-white/90 rounded p-1">
                            <div className="text-xs font-bold text-blue-700">ID</div>
                            <div className="text-xs text-gray-800">001</div>
                          </div>
                        </div>
                      </div>
                      <div className="w-16 h-20 bg-white/90 rounded flex items-center justify-center">
                        <Camera className="w-6 h-6 text-blue-500" />
                      </div>
                    </div>
                    <div className="bg-blue-800 text-center py-1 mt-3 rounded text-xs font-bold">DOCUMENTO OFICIAL</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex justify-center space-x-2 mb-3">
                    <span className="text-2xl">🆔</span>
                    <span className="text-2xl">✨</span>
                    <span className="text-2xl">🐕</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Identidade oficial com foto, dados e QR Code único!</p>
                  <Button
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 rounded-full shadow-lg"
                    onClick={() => handleTesteGratis("rg")}
                  >
                    🎯 TESTAR GRÁTIS
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">Pague só R$ 4,79 se gostar!</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Produto 2: Certidão de Nascimento */}
          <Card className="bg-white rounded-3xl shadow-xl mb-8 overflow-hidden border-2 border-pink-100 hover:shadow-2xl transition-all">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-4 text-white text-center">
                <div className="flex items-center justify-center mb-2">
                  <Heart className="w-6 h-6 mr-2" />
                  <h3 className="text-xl font-black">Certidão de Nascimento</h3>
                </div>
                <p className="text-sm opacity-90">Documento oficial de nascimento</p>
              </div>

              <div className="p-6">
                <div className="bg-gradient-to-br from-pink-100 to-rose-200 rounded-2xl p-6 mb-4">
                  {/* Simulação MELHORADA da certidão */}
                  <div className="bg-white rounded-lg p-4 shadow-lg border-2 border-pink-200">
                    <div className="text-center mb-4">
                      <div className="w-12 h-12 bg-pink-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-pink-600 font-black text-sm mb-2">🏛️ CERTIDÃO DE NASCIMENTO</div>
                      <div className="text-xs text-gray-600">DOCUMENTO OFICIAL</div>
                    </div>
                    <div className="flex gap-3 mb-3">
                      <div className="w-12 h-16 bg-pink-300 rounded flex items-center justify-center">
                        <Camera className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="text-xs">
                          <span className="font-bold text-pink-700">Nome:</span>
                          <span className="text-gray-600 ml-1">Seu Pet</span>
                        </div>
                        <div className="text-xs">
                          <span className="font-bold text-pink-700">Espécie:</span>
                          <span className="text-gray-600 ml-1">Canina</span>
                        </div>
                        <div className="text-xs">
                          <span className="font-bold text-pink-700">Nascimento:</span>
                          <span className="text-gray-600 ml-1">__/__/____</span>
                        </div>
                        <div className="text-xs">
                          <span className="font-bold text-pink-700">Responsável:</span>
                          <span className="text-gray-600 ml-1">Você</span>
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-pink-200 pt-2 text-center">
                      <div className="text-xs text-gray-500">Registro Oficial Nº 001234</div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex justify-center space-x-2 mb-3">
                    <span className="text-2xl">📜</span>
                    <span className="text-2xl">💕</span>
                    <span className="text-2xl">🎂</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Certidão oficial com brasão, dados completos e validação!
                  </p>
                  <Button
                    className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-3 rounded-full shadow-lg"
                    onClick={() => handleTesteGratis("certidao")}
                  >
                    🎯 TESTAR GRÁTIS
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">Pague só R$ 6,99 se gostar!</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Produto 3: Site Virtual do Pet */}
          <Card className="bg-white rounded-3xl shadow-xl mb-8 overflow-hidden border-2 border-cyan-100 hover:shadow-2xl transition-all">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 text-white text-center">
                <div className="flex items-center justify-center mb-2">
                  <Globe className="w-6 h-6 mr-2" />
                  <h3 className="text-xl font-black">Site Virtual do Pet</h3>
                </div>
                <p className="text-sm opacity-90">Página exclusiva na internet</p>
              </div>

              <div className="p-6">
                <div className="bg-gradient-to-br from-cyan-100 to-blue-200 rounded-2xl p-4 mb-4">
                  {/* Simulação MELHORADA do site */}
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Header do site simulado */}
                    <div className="bg-gradient-to-r from-cyan-400 to-blue-400 p-3 text-white text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Smartphone className="w-4 h-4 mr-1" />
                        <div className="text-xs font-bold">meupet.site/seupet</div>
                      </div>
                    </div>
                    {/* Conteúdo do site simulado */}
                    <div className="p-4">
                      <div className="text-center mb-3">
                        <div className="w-12 h-12 bg-cyan-300 rounded-full mx-auto mb-2 flex items-center justify-center">
                          <span className="text-white text-lg">🐕</span>
                        </div>
                        <div className="font-bold text-cyan-700 text-sm">Nome do Pet</div>
                        <div className="text-xs text-gray-500">Golden Retriever • 3 anos</div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <div className="bg-cyan-100 rounded p-2 text-center">
                          <Camera className="w-4 h-4 mx-auto text-cyan-500 mb-1" />
                          <div className="text-xs font-bold text-cyan-700">Fotos</div>
                        </div>
                        <div className="bg-cyan-100 rounded p-2 text-center">
                          <div className="text-cyan-500 text-lg mb-1">🎥</div>
                          <div className="text-xs font-bold text-cyan-700">Vídeos</div>
                        </div>
                        <div className="bg-cyan-100 rounded p-2 text-center">
                          <div className="text-cyan-500 text-lg mb-1">📖</div>
                          <div className="text-xs font-bold text-cyan-700">História</div>
                        </div>
                      </div>
                      <div className="bg-cyan-50 rounded p-2 text-center">
                        <div className="text-xs text-cyan-700 italic">"Adora brincar no parque!"</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex justify-center space-x-2 mb-3">
                    <span className="text-2xl">🌐</span>
                    <span className="text-2xl">📱</span>
                    <span className="text-2xl">✨</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Site completo com fotos, vídeos, história e muito mais!</p>
                  <Button
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 rounded-full shadow-lg"
                    onClick={() => handleTesteGratis("site")}
                  >
                    🎯 TESTAR GRÁTIS
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">Pague só R$ 12,99 se gostar!</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Produto 4: Carteira de Vacina */}
          <Card className="bg-white rounded-3xl shadow-xl mb-8 overflow-hidden border-2 border-green-100 hover:shadow-2xl transition-all">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 text-white text-center">
                <div className="flex items-center justify-center mb-2">
                  <Shield className="w-6 h-6 mr-2" />
                  <h3 className="text-xl font-black">Carteira de Vacina</h3>
                </div>
                <p className="text-sm opacity-90">Controle completo de vacinas</p>
              </div>

              <div className="p-6">
                <div className="bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl p-4 mb-4">
                  {/* Simulação da carteira de vacina */}
                  <div className="bg-white rounded-lg p-4 shadow-lg border-2 border-green-200">
                    <div className="text-center mb-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-green-600 font-black text-sm">💉 CARTEIRA DE VACINA</div>
                      <div className="text-xs text-gray-600">Controle de Imunização</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center bg-green-50 rounded p-2">
                        <div>
                          <div className="text-xs font-bold text-green-700">V8 Múltipla</div>
                          <div className="text-xs text-gray-600">15/03/2024</div>
                        </div>
                        <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center bg-green-50 rounded p-2">
                        <div>
                          <div className="text-xs font-bold text-green-700">Antirrábica</div>
                          <div className="text-xs text-gray-600">20/04/2024</div>
                        </div>
                        <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center bg-yellow-50 rounded p-2">
                        <div>
                          <div className="text-xs font-bold text-yellow-700">Próxima: V10</div>
                          <div className="text-xs text-gray-600">15/09/2024</div>
                        </div>
                        <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                          <Clock className="w-3 h-3 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex justify-center space-x-2 mb-3">
                    <span className="text-2xl">💉</span>
                    <span className="text-2xl">📋</span>
                    <span className="text-2xl">✅</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Controle completo com datas, lembretes e histórico!</p>
                  <Button
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 rounded-full shadow-lg"
                    onClick={() => handleTesteGratis("vacina")}
                  >
                    🎯 TESTAR GRÁTIS
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">Pague só R$ 5,99 se gostar!</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Produto 5: Álbum de Lembranças */}
          <Card className="bg-white rounded-3xl shadow-xl mb-8 overflow-hidden border-2 border-yellow-100 hover:shadow-2xl transition-all">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-4 text-white text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star className="w-6 h-6 mr-2" />
                  <h3 className="text-xl font-black">Álbum de Lembranças</h3>
                </div>
                <p className="text-sm opacity-90">Guarde os melhores momentos</p>
              </div>

              <div className="p-6">
                <div className="bg-gradient-to-br from-yellow-100 to-orange-200 rounded-2xl p-4 mb-4">
                  {/* Simulação do álbum de lembranças */}
                  <div className="bg-white rounded-lg shadow-lg p-4">
                    <div className="text-center mb-4">
                      <div className="text-yellow-600 font-black text-sm mb-2">✨ Álbum de Lembranças</div>
                      <div className="w-16 h-16 bg-yellow-300 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <Heart className="w-8 h-8 text-white" />
                      </div>
                      <div className="font-bold text-yellow-700">Nome do Pet</div>
                      <div className="text-xs text-gray-500">Momentos Especiais</div>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-yellow-50 rounded p-2 text-center">
                        <Music className="w-4 h-4 mx-auto text-yellow-500 mb-1" />
                        <div className="text-xs text-yellow-700">🎵 Música Especial</div>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="bg-yellow-200 rounded aspect-square flex items-center justify-center">
                          <Camera className="w-4 h-4 text-yellow-600" />
                        </div>
                        <div className="bg-yellow-200 rounded aspect-square flex items-center justify-center">
                          <Camera className="w-4 h-4 text-yellow-600" />
                        </div>
                        <div className="bg-yellow-200 rounded aspect-square flex items-center justify-center">
                          <Camera className="w-4 h-4 text-yellow-600" />
                        </div>
                      </div>
                      <div className="text-xs text-center text-gray-600 italic bg-yellow-50 rounded p-2">
                        "Primeiro dia no parque! 🌳"
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex justify-center space-x-2 mb-3">
                    <span className="text-2xl">📸</span>
                    <span className="text-2xl">🎵</span>
                    <span className="text-2xl">💝</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Álbum com fotos, música e momentos especiais!</p>
                  <Button
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-3 rounded-full shadow-lg"
                    onClick={() => handleTesteGratis("lembrancas")}
                  >
                    🎯 TESTAR GRÁTIS
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">Pague só R$ 8,99 se gostar!</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Combo Especial */}
          <Card className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl shadow-xl mb-8 overflow-hidden text-white transform hover:scale-105 transition-all">
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <div className="text-4xl mb-2">🎁</div>
                <h3 className="text-2xl font-black mb-2">COMBO COMPLETO</h3>
                <p className="text-sm opacity-90">Todos os produtos juntos!</p>
              </div>

              <div className="bg-white/20 rounded-2xl p-4 mb-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    <span>RG do Pet</span>
                  </div>
                  <div className="flex items-center">
                    <Heart className="w-4 h-4 mr-2" />
                    <span>Certidão</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="w-4 h-4 mr-2" />
                    <span>Site Virtual</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    <span>Carteira Vacina</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-2" />
                    <span>Álbum</span>
                  </div>
                  <div className="flex items-center">
                    <Gift className="w-4 h-4 mr-2" />
                    <span>+ Bônus</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm opacity-75 line-through">De R$ 38,75</div>
                <div className="text-3xl font-black">R$ 19,99</div>
                <div className="text-sm opacity-90">Economia de R$ 18,76!</div>
              </div>

              <Button className="w-full bg-white text-purple-600 hover:bg-gray-100 font-bold py-3 rounded-full shadow-lg">
                🚀 TESTAR COMBO GRÁTIS!
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Como Funciona Section */}
      <section className="px-4 py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-black text-purple-900 mb-2">Como Funciona?</h2>
          <p className="text-gray-600 mb-8">Super simples e rápido! 🚀</p>

          {/* Step 1 */}
          <div className="mb-12 bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
            <div className="mb-4">
              <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
            </div>
            <h3 className="text-xl font-black text-purple-900 mb-2">1 - Teste Grátis</h3>
            <p className="text-sm text-purple-700">Clique em qualquer produto e teste sem pagar nada!</p>
          </div>

          {/* Step 2 */}
          <div className="mb-12 bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
            <div className="mb-4">
              <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">📝</span>
              </div>
            </div>
            <h3 className="text-xl font-black text-purple-900 mb-2">2 - Preencha os Dados</h3>
            <p className="text-sm text-purple-700">Adicione foto e informações do seu pet!</p>
          </div>

          {/* Step 3 */}
          <div className="mb-8 bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
            <div className="mb-4">
              <div className="w-16 h-16 bg-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">💳</span>
              </div>
            </div>
            <h3 className="text-xl font-black text-purple-900 mb-2">3 - Pague Só Se Gostar!</h3>
            <p className="text-sm text-purple-700">Viu como ficou? Agora é só pagar e baixar!</p>
          </div>
        </div>
      </section>

      {/* Seção de Benefícios */}
      <section className="px-4 py-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-black mb-8">Por Que Escolher a MeuPetDoc?</h2>

          <div className="grid grid-cols-1 gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="font-bold">Enviamos por Email</div>
                <div className="text-sm opacity-90">Receba tudo direto na sua caixa de entrada!</div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="font-bold">Super Rápido</div>
                <div className="text-sm opacity-90">Pronto em menos de 1 minuto!</div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="font-bold">100% Seguro</div>
                <div className="text-sm opacity-90">Seus dados protegidos sempre!</div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="font-bold">Satisfação Garantida</div>
                <div className="text-sm opacity-90">Não gostou? Devolvemos seu dinheiro!</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="px-4 py-12 bg-gray-50">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-black text-purple-900 text-center mb-2">O Que Nossos Clientes Dizem</h2>
          <div className="flex items-center justify-center mb-8">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">4.9/5 (2.847 avaliações)</span>
          </div>

          <div className="space-y-6">
            <Card className="bg-white rounded-3xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    M
                  </div>
                  <div>
                    <div className="font-bold text-purple-900">Maria Silva</div>
                    <div className="text-sm text-gray-600">Dona da Luna</div>
                  </div>
                  <div className="ml-auto flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-4">
                  "Adorei! O RG da Luna ficou perfeito! Super fácil de fazer e chegou rapidinho no meu email. Recomendo
                  demais! 🐕💖"
                </p>
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Comprou: RG + Site Virtual</div>
                  <div className="text-xs font-bold text-purple-700">✅ Compra Verificada</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-3xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    J
                  </div>
                  <div>
                    <div className="font-bold text-purple-900">João Santos</div>
                    <div className="text-sm text-gray-600">Dono do Rex</div>
                  </div>
                  <div className="ml-auto flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-4">
                  "Que ideia genial! Fiz o combo completo pro Rex. A carteira de vacina me ajuda muito a lembrar das
                  datas. Vale cada centavo! 🎯"
                </p>
                <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Comprou: Combo Completo</div>
                  <div className="text-xs font-bold text-purple-700">✅ Compra Verificada</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-3xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-pink-400 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    A
                  </div>
                  <div>
                    <div className="font-bold text-purple-900">Ana Costa</div>
                    <div className="text-sm text-gray-600">Dona da Mel</div>
                  </div>
                  <div className="ml-auto flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-4">
                  "O álbum de lembranças da Mel ficou emocionante! Coloquei a música favorita dela e ficou perfeito.
                  Muito obrigada! 😍"
                </p>
                <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">Comprou: Álbum de Lembranças</div>
                  <div className="text-xs font-bold text-purple-700">✅ Compra Verificada</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="px-4 py-12 bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-center">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-black mb-4">Pronto para Começar?</h2>
          <p className="text-lg mb-8 opacity-90">Teste GRÁTIS agora e veja como fica incrível! 🎉</p>

          <Button
            className="w-full bg-white text-blue-600 hover:bg-gray-100 font-black py-4 px-8 rounded-full text-lg shadow-xl transform hover:scale-105 transition-all duration-200 mb-4"
            onClick={() => document.getElementById("nossos-produtos")?.scrollIntoView({ behavior: "smooth" })}
          >
            🚀 TESTAR GRÁTIS AGORA!
          </Button>

          <div className="flex justify-center space-x-4 text-sm opacity-75">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-1" />
              <span>Sem compromisso</span>
            </div>
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-1" />
              <span>100% seguro</span>
            </div>
            <div className="flex items-center">
              <Zap className="w-4 h-4 mr-1" />
              <span>Em 1 minuto</span>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Instagram Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button className="bg-pink-500 hover:bg-pink-600 text-white rounded-full p-4 shadow-lg animate-pulse">
          <Instagram className="w-5 h-5 mr-2" />
          DÚVIDAS?
        </Button>
      </div>
    </div>
  )
}
