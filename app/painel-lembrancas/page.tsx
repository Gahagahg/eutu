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
  Star,
  Heart,
  Music,
  ImageIcon,
  Type,
  Upload,
  Eye,
  Calendar,
  MessageCircle,
  Play,
  Pause,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function PainelLembrancas() {
  const router = useRouter()
  const [petData, setPetData] = useState({
    name: "Rex",
    birthDate: "2020-05-15",
    passedDate: "2024-01-20",
    breed: "Golden Retriever",
    favoriteMemory: "Adorava correr no parque todas as manhãs",
    specialMessage:
      "Você sempre estará em nossos corações. Obrigado por todos os momentos de alegria que nos proporcionou.",
    photos: [] as string[],
    profilePhoto: null as string | null,
    musicUrl: "",
    musicTitle: "Música Especial",
  })

  const [selectedTheme, setSelectedTheme] = useState("dourado")
  const [isPlaying, setIsPlaying] = useState(false)

  const themes = [
    {
      id: "dourado",
      name: "Dourado Celestial",
      primary: "bg-yellow-500",
      secondary: "bg-yellow-100",
      accent: "text-yellow-700",
      gradient: "from-yellow-400 to-orange-500",
    },
    {
      id: "azul",
      name: "Azul Serenidade",
      primary: "bg-blue-500",
      secondary: "bg-blue-100",
      accent: "text-blue-700",
      gradient: "from-blue-400 to-indigo-500",
    },
    {
      id: "rosa",
      name: "Rosa Eterno",
      primary: "bg-pink-500",
      secondary: "bg-pink-100",
      accent: "text-pink-700",
      gradient: "from-pink-400 to-rose-500",
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
      id: "verde",
      name: "Verde Esperança",
      primary: "bg-green-500",
      secondary: "bg-green-100",
      accent: "text-green-700",
      gradient: "from-green-400 to-emerald-500",
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50">
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
                <Star className="w-8 h-8 mr-3 text-yellow-500" />
                Editor de Memorial
              </h1>
              <p className="text-gray-600">Crie uma página especial de lembranças do seu pet</p>
            </div>
          </div>
          <Badge className="bg-yellow-500 text-white px-4 py-2 text-sm font-bold">R$ 9,99</Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Formulário de Edição */}
          <div className="lg:col-span-1 space-y-6">
            {/* Seleção de Tema */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-900">
                  <Palette className="w-5 h-5 mr-2" />
                  Tema do Memorial
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
                <TabsTrigger value="musica">Música</TabsTrigger>
              </TabsList>

              <TabsContent value="dados">
                <Card className="bg-white shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center text-purple-900">
                      <Type className="w-5 h-5 mr-2" />
                      Informações do Pet
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Foto de Perfil */}
                    <div>
                      <Label className="text-sm font-bold text-gray-700 mb-2 block">Foto Principal</Label>
                      <div className="flex items-center space-x-4">
                        {petData.profilePhoto ? (
                          <img
                            src={petData.profilePhoto || "/placeholder.svg"}
                            alt="Perfil"
                            className="w-16 h-16 object-cover rounded-full shadow-md border-2 border-yellow-200"
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

                    <div className="grid grid-cols-2 gap-4">
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
                      <div>
                        <Label htmlFor="passedDate" className="text-sm font-bold text-gray-700">
                          Data de Partida
                        </Label>
                        <Input
                          id="passedDate"
                          type="date"
                          value={petData.passedDate}
                          onChange={(e) => setPetData({ ...petData, passedDate: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="favoriteMemory" className="text-sm font-bold text-gray-700">
                        Lembrança Favorita
                      </Label>
                      <Input
                        id="favoriteMemory"
                        value={petData.favoriteMemory}
                        onChange={(e) => setPetData({ ...petData, favoriteMemory: e.target.value })}
                        className="mt-1"
                        placeholder="Ex: Adorava correr no parque"
                      />
                    </div>

                    <div>
                      <Label htmlFor="specialMessage" className="text-sm font-bold text-gray-700">
                        Mensagem Especial
                      </Label>
                      <Textarea
                        id="specialMessage"
                        value={petData.specialMessage}
                        onChange={(e) => setPetData({ ...petData, specialMessage: e.target.value })}
                        className="mt-1 min-h-[100px]"
                        placeholder="Uma mensagem carinhosa de despedida..."
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
                      Galeria de Memórias
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Upload de Fotos */}
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-yellow-400 transition-colors">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600 mb-3">Adicione fotos especiais</p>
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
                                alt={`Memória ${index + 1}`}
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

              <TabsContent value="musica">
                <Card className="bg-white shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center text-purple-900">
                      <Music className="w-5 h-5 mr-2" />
                      Música Especial
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="musicTitle" className="text-sm font-bold text-gray-700">
                        Título da Música
                      </Label>
                      <Input
                        id="musicTitle"
                        value={petData.musicTitle}
                        onChange={(e) => setPetData({ ...petData, musicTitle: e.target.value })}
                        className="mt-1"
                        placeholder="Nome da música especial"
                      />
                    </div>

                    <div>
                      <Label htmlFor="musicUrl" className="text-sm font-bold text-gray-700">
                        URL da Música (YouTube, Spotify, etc.)
                      </Label>
                      <Input
                        id="musicUrl"
                        value={petData.musicUrl}
                        onChange={(e) => setPetData({ ...petData, musicUrl: e.target.value })}
                        className="mt-1"
                        placeholder="https://..."
                      />
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-3">
                        Adicione uma música que lembre do seu pet. Ela tocará automaticamente quando alguém visitar o
                        memorial.
                      </p>
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsPlaying(!isPlaying)}
                          disabled={!petData.musicUrl}
                        >
                          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </Button>
                        <span className="text-sm text-gray-600">
                          {petData.musicTitle || "Nenhuma música selecionada"}
                        </span>
                      </div>
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
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-white flex items-center justify-center">
                    <Eye className="w-4 h-4 mr-2" />
                    Publicar Memorial
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview do Memorial */}
          <div className="lg:col-span-2 lg:sticky lg:top-8">
            <Card className="bg-white shadow-2xl border-0 overflow-hidden">
              <CardHeader className={`bg-gradient-to-r ${currentTheme.gradient} text-white text-center py-8`}>
                <div className="flex items-center justify-center mb-4">
                  <Star className="w-8 h-8 mr-2 animate-pulse mb-4" />
                  <CardTitle className="text-2xl font-black">PREVIEW DO MEMORIAL</CardTitle>
                </div>
                <p className="text-sm opacity-90">Página de lembranças eternas</p>
              </CardHeader>

              <CardContent className="p-0">
                {/* Simulação do Memorial */}
                <div className="bg-gradient-to-b from-yellow-50 to-orange-50 min-h-[600px]">
                  {/* Header do Memorial */}
                  <div className="text-center py-12 px-6">
                    <div className="max-w-md mx-auto">
                      <div className="mb-6">
                        <div className="inline-flex items-center justify-center w-4 h-4 bg-yellow-400 rounded-full animate-pulse mb-4">
                          <span className="text-xs">✨</span>
                        </div>
                        <h2 className={`text-2xl font-black ${currentTheme.accent} mb-2`}>Em Memória de</h2>
                      </div>

                      {petData.profilePhoto ? (
                        <img
                          src={petData.profilePhoto || "/placeholder.svg"}
                          alt="Memorial"
                          className="w-32 h-32 object-cover rounded-full mx-auto mb-6 border-4 border-white shadow-2xl"
                        />
                      ) : (
                        <div className="w-32 h-32 bg-yellow-200 rounded-full mx-auto mb-6 flex items-center justify-center border-4 border-white shadow-2xl">
                          <Heart className="w-12 h-12 text-yellow-600" />
                        </div>
                      )}

                      <h1 className="text-4xl font-black text-gray-900 mb-2">{petData.name}</h1>
                      <p className="text-lg text-gray-700 mb-4">{petData.breed}</p>

                      <div className="flex items-center justify-center space-x-4 text-sm text-gray-600 mb-6">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(petData.birthDate)}
                        </div>
                        <span>-</span>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(petData.passedDate)}
                        </div>
                      </div>

                      {/* Player de Música */}
                      {petData.musicUrl && (
                        <div className="bg-white rounded-2xl p-4 mb-6 shadow-lg">
                          <div className="flex items-center justify-center space-x-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setIsPlaying(!isPlaying)}
                              className="rounded-full"
                            >
                              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            </Button>
                            <div className="text-left">
                              <div className="text-sm font-bold text-gray-900">{petData.musicTitle}</div>
                              <div className="text-xs text-gray-500">Música especial</div>
                            </div>
                            <Music className="w-5 h-5 text-yellow-500" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Conteúdo do Memorial */}
                  <div className="px-6 pb-12 max-w-4xl mx-auto">
                    {/* Lembrança Favorita */}
                    <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
                      <h3 className={`text-xl font-black ${currentTheme.accent} mb-3 flex items-center`}>
                        <Heart className="w-5 h-5 mr-2" />
                        Lembrança Especial
                      </h3>
                      <p className="text-gray-700 italic text-lg leading-relaxed">"{petData.favoriteMemory}"</p>
                    </div>

                    {/* Galeria de Fotos */}
                    {petData.photos.length > 0 && (
                      <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
                        <h3 className={`text-xl font-black ${currentTheme.accent} mb-4 flex items-center`}>
                          <ImageIcon className="w-5 h-5 mr-2" />
                          Galeria de Memórias
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {petData.photos.map((photo, index) => (
                            <img
                              key={index}
                              src={photo || "/placeholder.svg"}
                              alt={`Memória ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow"
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Mensagem Especial */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <h3 className={`text-xl font-black ${currentTheme.accent} mb-4 flex items-center`}>
                        <MessageCircle className="w-5 h-5 mr-2" />
                        Mensagem do Coração
                      </h3>
                      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6">
                        <p className="text-gray-800 leading-relaxed text-center italic">"{petData.specialMessage}"</p>
                        <div className="text-center mt-4">
                          <div className="inline-flex items-center space-x-2 text-yellow-600">
                            <Heart className="w-4 h-4" />
                            <span className="text-sm font-semibold">Sempre em nossos corações</span>
                            <Heart className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
