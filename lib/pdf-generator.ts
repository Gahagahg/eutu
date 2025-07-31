import jsPDF from "jspdf"

export interface PetData {
  nome: string
  raca: string
  sexo: string
  idade: string
  dataNascimento: string
  cpf: string
  nomeDono: string
  endereco: string
  telefone: string
  cor: string
  foto?: string
}

export interface CertidaoData {
  name: string
  breed: string
  gender: string
  birthDate: string
  birthPlace: string
  owner: string
  ownerCpf: string
  registrationNumber: string
  photo?: string
}

export interface VacinaData {
  nome: string
  raca: string
  sexo: string
  dataNascimento: string
  nomeDono: string
  telefone: string
  corTema: string
  foto?: string
  vacinas: Array<{
    nome: string
    data: string
    veterinario: string
    lote: string
    status: string
    proximaDose: string
  }>
}

// Gerador de RG do Pet
export class RGGenerator {
  private doc: jsPDF
  private corSelecionada: any

  constructor(cor: string) {
    this.doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: [85.6, 54], // Tamanho cartão de crédito
    })

    const cores = [
      { id: "padrao", nome: "Verde Esmeralda", cor: "#10b981" },
      { id: "rosa", nome: "Rosa Flamingo", cor: "#ec4899" },
      { id: "azul", nome: "Azul Oceano", cor: "#3b82f6" },
      { id: "amarelo", nome: "Dourado Solar", cor: "#f59e0b" },
      { id: "vermelho", nome: "Vermelho Coral", cor: "#ef4444" },
    ]

    this.corSelecionada = cores.find((c) => c.id === cor) || cores[0]
  }

  async generateRG(petData: PetData): Promise<Blob> {
    // Gerar frente do RG
    await this.generateFrente(petData)

    // Adicionar nova página para o verso
    this.doc.addPage()
    await this.generateVerso(petData)

    // Retornar PDF como blob
    return this.doc.output("blob")
  }

  private async generateFrente(petData: PetData) {
    const { doc } = this

    // Background gradient
    doc.setFillColor(this.hexToRgb(this.corSelecionada.cor))
    doc.rect(0, 0, 85.6, 54, "F")

    // Header
    doc.setFontSize(8)
    doc.setTextColor(255, 255, 255)
    doc.setFont("helvetica", "bold")
    doc.text("🐾 PET ID BRASIL 🐾", 42.8, 8, { align: "center" })

    // Foto do pet (se existir)
    if (petData.foto) {
      try {
        doc.addImage(petData.foto, "JPEG", 60, 12, 20, 25)
      } catch (error) {
        console.log("Erro ao adicionar foto:", error)
      }
    }

    // Dados do pet
    doc.setFillColor(255, 255, 255, 0.95)
    doc.rect(5, 12, 50, 35, "F")

    doc.setTextColor(0, 0, 0)
    doc.setFontSize(6)
    doc.setFont("helvetica", "bold")
    doc.text("NOME DO PET", 7, 16)
    doc.setFontSize(10)
    doc.text(petData.nome.toUpperCase(), 7, 20)

    doc.setFontSize(6)
    doc.text("ID", 7, 25)
    doc.setFontSize(8)
    doc.text(petData.cpf, 7, 28)

    doc.setFontSize(6)
    doc.text("ESPÉCIE", 7, 33)
    doc.setFontSize(8)
    doc.text(petData.raca.toUpperCase(), 7, 36)

    doc.setFontSize(6)
    doc.text("SEXO", 7, 41)
    doc.text("IDADE", 25, 41)
    doc.setFontSize(8)
    doc.text(petData.sexo.toUpperCase(), 7, 44)
    doc.text(`${petData.idade} anos`, 25, 44)

    // Footer
    doc.setFillColor(0, 0, 0, 0.8)
    doc.rect(0, 48, 85.6, 6, "F")
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(6)
    doc.text("DOCUMENTO OFICIAL DE IDENTIFICAÇÃO ANIMAL", 42.8, 51.5, { align: "center" })
  }

  private async generateVerso(petData: PetData) {
    const { doc } = this

    // Background gradient
    doc.setFillColor(this.hexToRgb(this.corSelecionada.cor))
    doc.rect(0, 0, 85.6, 54, "F")

    // Header
    doc.setFontSize(8)
    doc.setTextColor(255, 255, 255)
    doc.setFont("helvetica", "bold")
    doc.text("DADOS COMPLETOS", 42.8, 8, { align: "center" })

    // Área de dados
    doc.setFillColor(255, 255, 255, 0.95)
    doc.rect(5, 12, 75.6, 35, "F")

    doc.setTextColor(0, 0, 0)
    doc.setFontSize(6)
    doc.setFont("helvetica", "bold")

    // Nome completo
    doc.text("NOME COMPLETO", 7, 16)
    doc.line(7, 18, 78, 18)
    doc.setFontSize(8)
    doc.text(petData.nome.toUpperCase(), 7, 21)

    // Espécie e sexo
    doc.setFontSize(6)
    doc.setFont("helvetica", "bold")
    doc.text("ESPÉCIE/RAÇA", 7, 26)
    doc.text("SEXO", 45, 26)
    doc.line(7, 28, 40, 28)
    doc.line(45, 28, 78, 28)
    doc.setFontSize(8)
    doc.text(petData.raca.toUpperCase(), 7, 31)
    doc.text(petData.sexo.toUpperCase(), 45, 31)

    // Nascimento e idade
    doc.setFontSize(6)
    doc.setFont("helvetica", "bold")
    doc.text("NASCIMENTO", 7, 36)
    doc.text("IDADE", 45, 36)
    doc.line(7, 38, 40, 38)
    doc.line(45, 38, 78, 38)
    doc.setFontSize(8)
    const dataNasc = new Date(petData.dataNascimento).toLocaleDateString("pt-BR")
    doc.text(dataNasc, 7, 41)
    doc.text(`${petData.idade} anos`, 45, 41)

    // Dados do tutor
    doc.setFillColor(this.hexToRgb(this.corSelecionada.cor))
    doc.rect(7, 44, 71.6, 2, "F")
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(6)
    doc.setFont("helvetica", "bold")
    doc.text("👤 DADOS DO TUTOR", 42.8, 45.5, { align: "center" })

    // Nome do responsável
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(6)
    doc.text("NOME DO RESPONSÁVEL", 7, 49)
    doc.line(7, 50, 78, 50)
    doc.setFontSize(7)
    doc.text(petData.nomeDono.toUpperCase(), 7, 52.5)
  }

  private hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? [Number.parseInt(result[1], 16), Number.parseInt(result[2], 16), Number.parseInt(result[3], 16)]
      : [16, 185, 129] // Verde padrão
  }
}

// Gerador de Certidão
export class CertidaoGenerator {
  private doc: jsPDF
  private theme: any

  constructor(theme: string) {
    this.doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    const themes = [
      { id: "rosa", name: "Rosa Clássico", color: "#ec4899" },
      { id: "azul", name: "Azul Oficial", color: "#3b82f6" },
      { id: "verde", name: "Verde Natureza", color: "#10b981" },
      { id: "roxo", name: "Roxo Real", color: "#8b5cf6" },
      { id: "dourado", name: "Dourado Premium", color: "#f59e0b" },
    ]

    this.theme = themes.find((t) => t.id === theme) || themes[0]
  }

  async generateCertidao(data: CertidaoData): Promise<Blob> {
    const { doc } = this

    // Header
    doc.setFillColor(this.hexToRgb(this.theme.color))
    doc.rect(0, 0, 210, 40, "F")

    // Logo/Escudo
    doc.setFillColor(255, 255, 255)
    doc.circle(105, 20, 12, "F")
    doc.setTextColor(this.hexToRgb(this.theme.color))
    doc.setFontSize(16)
    doc.text("🛡️", 105, 25, { align: "center" })

    // Título
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(18)
    doc.setFont("helvetica", "bold")
    doc.text("CERTIDÃO DE NASCIMENTO", 105, 50, { align: "center" })
    doc.setFontSize(12)
    doc.text("DOCUMENTO OFICIAL", 105, 58, { align: "center" })

    // Linha decorativa
    doc.setDrawColor(this.hexToRgb(this.theme.color))
    doc.setLineWidth(2)
    doc.line(60, 65, 150, 65)

    // Foto do pet
    if (data.photo) {
      try {
        doc.addImage(data.photo, "JPEG", 20, 80, 30, 40)
      } catch (error) {
        console.log("Erro ao adicionar foto:", error)
      }
    }

    // Dados principais
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(10)
    doc.setFont("helvetica", "bold")
    doc.text("NOME:", 60, 90)
    doc.setFont("helvetica", "normal")
    doc.setFontSize(14)
    doc.text(data.name.toUpperCase(), 60, 98)

    doc.setFontSize(10)
    doc.setFont("helvetica", "bold")
    doc.text("RAÇA:", 60, 110)
    doc.text("SEXO:", 120, 110)
    doc.setFont("helvetica", "normal")
    doc.text(data.breed, 60, 118)
    doc.text(data.gender, 120, 118)

    // Dados de nascimento
    doc.setFillColor(240, 240, 240)
    doc.rect(20, 140, 170, 30, "F")
    doc.setTextColor(this.hexToRgb(this.theme.color))
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.text("DADOS DE NASCIMENTO", 105, 150, { align: "center" })

    doc.setTextColor(0, 0, 0)
    doc.setFontSize(10)
    doc.text("DATA:", 30, 160)
    doc.text("LOCAL:", 120, 160)
    doc.setFont("helvetica", "normal")
    const birthDate = new Date(data.birthDate).toLocaleDateString("pt-BR")
    doc.text(birthDate, 30, 168)
    doc.text(data.birthPlace, 120, 168)

    // Dados do responsável
    doc.setFillColor(240, 240, 240)
    doc.rect(20, 190, 170, 30, "F")
    doc.setTextColor(this.hexToRgb(this.theme.color))
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.text("RESPONSÁVEL LEGAL", 105, 200, { align: "center" })

    doc.setTextColor(0, 0, 0)
    doc.setFontSize(10)
    doc.text("NOME:", 30, 210)
    doc.text("CPF:", 120, 210)
    doc.setFont("helvetica", "normal")
    doc.text(data.owner, 30, 218)
    doc.text(data.ownerCpf, 120, 218)

    // Registro
    doc.setTextColor(this.hexToRgb(this.theme.color))
    doc.setFontSize(10)
    doc.setFont("helvetica", "bold")
    doc.text("REGISTRO Nº:", 30, 240)
    doc.setFont("helvetica", "normal")
    doc.text(data.registrationNumber, 30, 248)

    // Selo de validação
    doc.setFillColor(this.hexToRgb(this.theme.color))
    doc.rect(140, 235, 50, 15, "F")
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(8)
    doc.setFont("helvetica", "bold")
    doc.text("🏆 VÁLIDO", 165, 245, { align: "center" })

    // Footer
    doc.setTextColor(100, 100, 100)
    doc.setFontSize(8)
    doc.text(`Documento emitido em ${new Date().toLocaleDateString("pt-BR")}`, 105, 270, { align: "center" })

    return doc.output("blob")
  }

  private hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? [Number.parseInt(result[1], 16), Number.parseInt(result[2], 16), Number.parseInt(result[3], 16)]
      : [236, 72, 153] // Rosa padrão
  }
}

// Gerador de Carteira de Vacina
export class VacinaGenerator {
  private doc: jsPDF
  private corSelecionada: any

  constructor(cor: string) {
    this.doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    const coresTema = [
      { id: "verde", nome: "Verde Saúde", primary: "#10b981" },
      { id: "azul", nome: "Azul Médico", primary: "#3b82f6" },
      { id: "roxo", nome: "Roxo Cuidado", primary: "#8b5cf6" },
    ]

    this.corSelecionada = coresTema.find((c) => c.id === cor) || coresTema[0]
  }

  async generateCarteira(data: VacinaData): Promise<Blob> {
    const { doc } = this

    // Header
    doc.setFillColor(this.hexToRgb(this.corSelecionada.primary))
    doc.rect(0, 0, 210, 50, "F")

    // Título
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(20)
    doc.setFont("helvetica", "bold")
    doc.text("💉", 105, 20, { align: "center" })
    doc.text("CARTEIRA DE VACINA", 105, 30, { align: "center" })
    doc.setFontSize(12)
    doc.text("Controle de Imunização Animal", 105, 40, { align: "center" })

    // Foto do pet
    if (data.foto) {
      try {
        doc.addImage(data.foto, "JPEG", 20, 60, 25, 30)
      } catch (error) {
        console.log("Erro ao adicionar foto:", error)
      }
    }

    // Dados do pet
    doc.setFillColor(255, 255, 255)
    doc.rect(50, 60, 140, 30, "F")
    doc.setTextColor(this.hexToRgb(this.corSelecionada.primary))
    doc.setFontSize(10)
    doc.setFont("helvetica", "bold")
    doc.text("NOME DO PET", 55, 70)
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(14)
    doc.text(data.nome.toUpperCase(), 55, 78)

    doc.setTextColor(100, 100, 100)
    doc.setFontSize(8)
    doc.text("RAÇA", 55, 85)
    doc.text("SEXO", 120, 85)
    doc.setTextColor(0, 0, 0)
    doc.text(data.raca, 55, 90)
    doc.text(data.sexo, 120, 90)

    // Histórico de vacinas
    let yPos = 110
    doc.setTextColor(this.hexToRgb(this.corSelecionada.primary))
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.text("🛡️ HISTÓRICO DE VACINAS", 20, yPos)

    yPos += 15
    data.vacinas.forEach((vacina, index) => {
      if (yPos > 250) {
        doc.addPage()
        yPos = 30
      }

      // Box da vacina
      doc.setFillColor(250, 250, 250)
      doc.rect(20, yPos - 5, 170, 25, "F")

      // Status
      const statusColor = vacina.status === "aplicada" ? "#10b981" : "#f59e0b"
      doc.setFillColor(this.hexToRgb(statusColor))
      doc.circle(30, yPos + 5, 3, "F")

      // Nome da vacina
      doc.setTextColor(0, 0, 0)
      doc.setFontSize(10)
      doc.setFont("helvetica", "bold")
      doc.text(vacina.nome || "Vacina", 40, yPos + 2)

      // Status
      doc.setTextColor(this.hexToRgb(statusColor))
      doc.setFontSize(8)
      doc.text(vacina.status.toUpperCase(), 40, yPos + 8)

      // Data
      if (vacina.data) {
        doc.setTextColor(100, 100, 100)
        doc.text(`Data: ${new Date(vacina.data).toLocaleDateString("pt-BR")}`, 40, yPos + 14)
      }

      // Veterinário
      if (vacina.veterinario) {
        doc.text(`Vet: ${vacina.veterinario}`, 120, yPos + 8)
      }

      // Lote
      if (vacina.lote) {
        doc.text(`Lote: ${vacina.lote}`, 120, yPos + 14)
      }

      yPos += 35
    })

    // Dados do responsável
    yPos += 10
    doc.setFillColor(240, 240, 240)
    doc.rect(20, yPos, 170, 25, "F")
    doc.setTextColor(this.hexToRgb(this.corSelecionada.primary))
    doc.setFontSize(10)
    doc.setFont("helvetica", "bold")
    doc.text("👤 RESPONSÁVEL LEGAL", 105, yPos + 8, { align: "center" })

    doc.setTextColor(0, 0, 0)
    doc.setFontSize(9)
    doc.text(`Nome: ${data.nomeDono}`, 30, yPos + 15)
    doc.text(`Telefone: ${data.telefone}`, 30, yPos + 20)

    // Footer
    doc.setTextColor(100, 100, 100)
    doc.setFontSize(8)
    doc.text(`Documento emitido em ${new Date().toLocaleDateString("pt-BR")}`, 105, 280, { align: "center" })

    return doc.output("blob")
  }

  private hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? [Number.parseInt(result[1], 16), Number.parseInt(result[2], 16), Number.parseInt(result[3], 16)]
      : [16, 185, 129] // Verde padrão
  }
}

// Função utilitária para download
export const downloadPDF = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
