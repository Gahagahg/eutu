"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Share2,
  Camera,
  Palette,
  Globe,
  Heart,
  Play,
  ImageIcon,
  Eye,
  Smartphone,
  Lock,
  CreditCard,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { Upload } from "lucide-react"

export default function PainelVirtual() {
  const router = useRouter()
  const [petData, setPetData] = useState({
    name: "Rex",
    breed: "Golden Retriever",
    age: "3 anos",
    personality: "Brincalhão e carinhoso",
    story:
      "Rex chegou na nossa família quando tinha apenas 2 meses. Desde então, tem sido uma fonte constante de alegria e amor.",
    favoriteActivities: "Correr no parque, brincar de buscar a bolinha",
    photos: [] as string[],
    videos: [] as string[],
    profilePhoto: null as string | null,
  })

  const [selectedTheme, setSelectedTheme] = useState("azul")
  const [siteUrl, setSiteUrl] = useState("meupet.site/rex")
  const [showPayment, setShowPayment] = useState(false)
  const [isPaid, setIsPaid] = useState(false)

  const themes = [
    {
      id: "azul",
      name: "Azul Oceano",
      primary: "bg-blue-500",
      secondary: "bg-blue-100",
      accent: "text-blue-700",
      gradient: "from-blue-400 to-cyan-500",
    },
    {
      id: "rosa",
      name: "Rosa Doce",
      primary: "bg-pink-500",
      secondary: "bg-pink-100",
      accent: "text-pink-700",
      gradient: "from-pink-400 to-rose-500",
    },
    {
      id: "verde",
      name: "Verde Natureza",
      primary: "bg-green-500",
      secondary: "bg-green-100",
      accent: "text-green-700",
      gradient: "from-green-400 to-emerald-500",
    },
    {
      id: "roxo",
      name: "Roxo Místico",
      primary: "bg-purple-500",
      secondary: "bg-purple-100",
      accent: "text-purple-700",
      gradient: "from-purple-400 to-indigo-500",
    },
    {
      id: "laranja",
      name: "Laranja Vibrante",
      primary: "bg-orange-500",
      secondary: "bg-orange-100",
      accent: "text-orange-700",
      gradient: "from-orange-400 to-red-500",
    },
  ]

  const currentTheme = themes.find((t) => t.id === selectedTheme) || themes[0]

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>, type: "profile" | "gallery") => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        if (type === "profile") {
          setPetData({ ...petData, profilePhoto: result })
        } else {
          setPetData({ ...petData, photos: [...petData.photos, result] })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePagar = () => {
    setShowPayment(true)
  }

  const handleFinalizarPagamento = () => {
    setIsPaid(true)
    setShowPayment(false)
    alert("🎉 Pagamento aprovado! Site liberado com sucesso!")
  }

  // Preview Parcial do Site
  const PreviewParcial = () => {
    return (
      <div className="relative">
        <h3 className="font-bold text-purple-700 mb-4 flex items-center">
          <Eye className="w-5 h-5 mr-2" />
          Preview das Cores
        </h3>
        <div className="bg-gray-50 min-h-[400px] rounded-2xl overflow-hidden relative">
          {/* Header do Site */}
          <div className={`bg-gradient-to-r ${currentTheme.gradient} text-white p-6 text-center`}>
            <div className="max-w-md mx-auto">
              {petData.profilePhoto ? (
                <img
                  src={petData.profilePhoto || "/placeholder.svg"}
                  alt="Perfil"
                  className="w-16 h-16 object-cover rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white/70" />
                </div>
              )}
              <h1 className="text-2xl font-black mb-2">{petData.name}</h1>
              <p className="text-lg opacity-90">{petData.breed}</p>
            </div>
          </div>

          {/* Overlay central cobrindo o conteúdo */}
          <div className="absolute inset-0 flex items-center justify-center z-20" style={{ top: "120px" }}>
            <div className="bg-black/90 backdrop-blur-sm rounded-2xl p-8 text-center border-2 border-white/30">
              <Lock className="w-12 h-12 text-white mx-auto mb-4" />
              <h4 className="text-white font-bold text-lg mb-2">Site Bloqueado</h4>
              <p className="text-white/80 text-sm mb-4">Pague para ver o site completo!</p>
              <div className="text-2xl">🌐</div>
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-purple-600 font-medium">
            ✨ As cores mudam conforme sua seleção! Pague R$ 12,99 para ver o site completo.
          </p>
        </div>
      </div>
    )
  }

  // Site Final (só aparece após pagamento)
  const SiteFinal = () => {
    if (!isPaid) return null

    return (
      <div className="bg-gray-50 min-h-[600px]">
        {/* Header do Site */}
        <div className={`bg-gradient-to-r ${currentTheme.gradient} text-white p-6 text-center`}>
          <div className="max-w-md mx-auto">
            {petData.profilePhoto ? (
              <img
                src={petData.profilePhoto || "/placeholder.svg"}
                alt="Perfil"
                className="w-24 h-24 object-cover rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Camera className="w-8 h-8 text-white/70" />
              </div>
            )}
            <h1 className="text-3xl font-black mb-2">{petData.name}</h1>
            <p className="text-lg opacity-90">{petData.breed}</p>
            <p className="text-sm opacity-75">{petData.age}</p>
          </div>
        </div>

        {/* Conteúdo do Site */}
        <div className="p-6 max-w-4xl mx-auto">
          {/* Seção Sobre */}
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
            <h2 className={`text-2xl font-black ${currentTheme.accent} mb-4 flex items-center`}>
              <Heart className="w-6 h-6 mr-2" />
              Sobre Mim
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Personalidade</h3>
                <p className="text-gray-700 mb-4">{petData.personality}</p>

                <h3 className="font-bold text-gray-900 mb-2">Atividades Favoritas</h3>
                <p className="text-gray-700">{petData.favoriteActivities}</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Minha História</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{petData.story}</p>
              </div>
            </div>
          </div>

          {/* Galeria de Fotos */}
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
            <h2 className={`text-2xl font-black ${currentTheme.accent} mb-4 flex items-center`}>
              <ImageIcon className="w-6 h-6 mr-2" />
              Galeria de Fotos
            </h2>
            {petData.photos.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {petData.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo || "/placeholder.svg"}
                    alt={`Foto ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Camera className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>Adicione fotos para criar uma galeria incrível!</p>
              </div>
            )}
          </div>

          {/* Seção de Vídeos */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className={`text-2xl font-black ${currentTheme.accent} mb-4 flex items-center`}>
              <Play className="w-6 h-6 mr-2" />
              Vídeos
            </h2>
            <div className="text-center py-8 text-gray-500">
              <Play className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Em breve você poderá adicionar vídeos!</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button variant="ghost" onClick={() => router.back()} className="mr-4 hover:bg-white/50">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-3xl font-black text-purple-900 flex items-center">
                <Globe className="w-8 h-8 mr-3 text-cyan-500" />
                Editor de Site Virtual
              </h1>
              <p className="text-gray-600">Crie uma página exclusiva na internet para seu pet</p>
            </div>
          </div>
          <Badge className="bg-cyan-500 text-white px-4 py-2 text-sm font-bold">R$ 12,99</Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Formulário de Edição */}
          <div className="lg:col-span-1 space-y-6">
            {/* URL do Site */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-900">
                  <Globe className="w-5 h-5 mr-2" />
                  URL do Site
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Label className="text-sm font-bold text-gray-700">Endereço do seu site</Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">https://</span>
                    <Input
                      value={siteUrl}
                      onChange={(e) => setSiteUrl(e.target.value)}
                      className="flex-1"
                      placeholder="meupet.site/seupet"
                    />
                  </div>
                  <p className="text-xs text-gray-500">Este será o endereço único do site do seu pet</p>
                </div>
              </CardContent>
            </Card>

            {/* Seleção de Tema */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-900">
                  <Palette className="w-5 h-5 mr-2" />
                  Tema do Site
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  {themes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => setSelectedTheme(theme.id)}
                      className={`p-3 rounded-xl border-2 transition-all flex items-center ${
                        selectedTheme === theme.id
                          ? "border-purple-500 shadow-lg"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className={`w-8 h-8 ${theme.primary} rounded-lg mr-3`}></div>
                      <div className="text-left">
                        <div className="text-sm font-bold text-gray-700">{theme.name}</div>
                        <div className="text-xs text-gray-500">Tema {theme.id}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tabs para organizar conteúdo */}
            <Tabs defaultValue="dados" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="dados">Dados</TabsTrigger>
                <TabsTrigger value="fotos">Fotos</TabsTrigger>
                <TabsTrigger value="historia">História</TabsTrigger>
              </TabsList>

              <TabsContent value="dados">
                <Card className="bg-white shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center text-purple-900">
                      <ImageIcon className="w-5 h-5 mr-2" />
                      Informações Básicas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Foto de Perfil */}
                    <div>
                      <Label className="text-sm font-bold text-gray-700 mb-2 block">Foto de Perfil</Label>
                      <div className="flex items-center space-x-4">
                        {petData.profilePhoto ? (
                          <img
                            src={petData.profilePhoto || "/placeholder.svg"}
                            alt="Perfil"
                            className="w-16 h-16 object-cover rounded-full shadow-md"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                            <Camera className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => document.getElementById("profile-upload")?.click()}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          {petData.profilePhoto ? "Trocar" : "Adicionar"}
                        </Button>
                        <input
                          id="profile-upload"
                          type="file"
                          accept="image/*"
                          onChange={(e) => handlePhotoUpload(e, "profile")}
                          className="hidden"
                        />
                      </div>
                    </div>

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

                    <div className="grid grid-cols-2 gap-4">
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
                      <div>
                        <Label htmlFor="age" className="text-sm font-bold text-gray-700">
                          Idade
                        </Label>
                        <Input
                          id="age"
                          value={petData.age}
                          onChange={(e) => setPetData({ ...petData, age: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="personality" className="text-sm font-bold text-gray-700">
                        Personalidade
                      </Label>
                      <Input
                        id="personality"
                        value={petData.personality}
                        onChange={(e) => setPetData({ ...petData, personality: e.target.value })}
                        className="mt-1"
                        placeholder="Ex: Brincalhão e carinhoso"
                      />
                    </div>

                    <div>
                      <Label htmlFor="activities" className="text-sm font-bold text-gray-700">
                        Atividades Favoritas
                      </Label>
                      <Input
                        id="activities"
                        value={petData.favoriteActivities}
                        onChange={(e) => setPetData({ ...petData, favoriteActivities: e.target.value })}
                        className="mt-1"
                        placeholder="Ex: Correr no parque, brincar"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="fotos">
                <Card className="bg-white shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center text-purple-900">
                      <ImageIcon className="w-5 h-5 mr-2" />
                      Galeria de Fotos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Upload de Fotos */}
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-cyan-400 transition-colors">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600 mb-3">Adicione fotos à galeria</p>
                        <Button variant="outline" onClick={() => document.getElementById("gallery-upload")?.click()}>
                          <Camera className="w-4 h-4 mr-2" />
                          Escolher Fotos
                        </Button>
                        <input
                          id="gallery-upload"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => handlePhotoUpload(e, "gallery")}
                          className="hidden"
                        />
                      </div>

                      {/* Grid de Fotos */}
                      {petData.photos.length > 0 && (
                        <div className="grid grid-cols-2 gap-3">
                          {petData.photos.map((photo, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={photo || "/placeholder.svg"}
                                alt={`Foto ${index + 1}`}
                                className="w-full h-24 object-cover rounded-lg shadow-md"
                              />
                              <button
                                onClick={() => {
                                  const newPhotos = petData.photos.filter((_, i) => i !== index)
                                  setPetData({ ...petData, photos: newPhotos })
                                }}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="historia">
                <Card className="bg-white shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center text-purple-900">
                      <Heart className="w-5 h-5 mr-2" />
                      História do Pet
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <Label htmlFor="story" className="text-sm font-bold text-gray-700">
                        Conte a história do seu pet
                      </Label>
                      <Textarea
                        id="story"
                        value={petData.story}
                        onChange={(e) => setPetData({ ...petData, story: e.target.value })}
                        className="mt-1 min-h-[120px]"
                        placeholder="Conte como seu pet chegou na sua vida, momentos especiais, características únicas..."
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Ações */}
            <Card className="bg-white shadow-lg border-0">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="flex items-center justify-center bg-transparent">
                    <Share2 className="w-4 h-4 mr-2" />
                    Compartilhar
                  </Button>
                  <Button
                    onClick={handlePagar}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white flex items-center justify-center"
                    disabled={!petData.name}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Pagar R$ 12,99
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview do Site */}
          <div className="lg:col-span-2 lg:sticky lg:top-8">
            <Card className="bg-white shadow-2xl border-0 overflow-hidden">
              <CardHeader className={`bg-gradient-to-r ${currentTheme.gradient} text-white text-center py-6`}>
                <div className="flex items-center justify-center mb-2">
                  <Smartphone className="w-8 h-8 mr-2" />
                  <CardTitle className="text-2xl font-black">{isPaid ? "SITE LIBERADO" : "PREVIEW DO SITE"}</CardTitle>
                </div>
                <p className="text-sm opacity-90">
                  {isPaid ? `Site completo: https://${siteUrl}` : `https://${siteUrl}`}
                </p>
              </CardHeader>

              <CardContent className="p-0">
                {!isPaid ? (
                  <div className="p-6">
                    <PreviewParcial />
                    <div className="mt-6">
                      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border-2 border-cyan-200">
                        <h4 className="font-bold text-cyan-800 mb-2">🌐 Teste as Cores!</h4>
                        <p className="text-sm text-cyan-600 mb-4">
                          Mude as cores e veja o preview mudando em tempo real!
                        </p>
                        <div className="bg-white rounded-xl p-4 mb-4 shadow-lg">
                          <h5 className="font-bold text-gray-800 mb-2">O que você vai receber:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>✅ Site completo e responsivo</li>
                            <li>✅ URL personalizada</li>
                            <li>✅ Galeria de fotos</li>
                            <li>✅ História personalizada</li>
                            <li>✅ Design profissional</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <SiteFinal />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Modal de Pagamento */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">🌐</div>
              <h3 className="text-2xl font-black text-purple-900 mb-2">Finalizar Pagamento</h3>
              <p className="text-gray-600">Site Virtual do Pet</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Site do Pet</span>
                <span className="font-bold text-lg">R$ 12,99</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleFinalizarPagamento}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-4"
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
