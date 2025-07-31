-- Tabela de pagamentos
CREATE TABLE payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  payment_id VARCHAR(255) UNIQUE NOT NULL,
  produto VARCHAR(100) NOT NULL,
  valor DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  pix_code TEXT,
  qr_code_base64 TEXT,
  external_reference VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de documentos dos pets
CREATE TABLE pet_documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tipo VARCHAR(50) NOT NULL, -- 'rg', 'certidao', 'vacina', 'site', 'memorial'
  dados_pet JSONB NOT NULL,
  payment_id VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'paid', 'delivered'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  FOREIGN KEY (payment_id) REFERENCES payments(payment_id)
);

-- Índices para performance
CREATE INDEX idx_payments_payment_id ON payments(payment_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_pet_documents_payment_id ON pet_documents(payment_id);
CREATE INDEX idx_pet_documents_tipo ON pet_documents(tipo);
CREATE INDEX idx_pet_documents_status ON pet_documents(status);

-- RLS (Row Level Security) - opcional, para segurança
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE pet_documents ENABLE ROW LEVEL SECURITY;

-- Políticas básicas (permite leitura/escrita para todos por enquanto)
CREATE POLICY "Allow all operations on payments" ON payments FOR ALL USING (true);
CREATE POLICY "Allow all operations on pet_documents" ON pet_documents FOR ALL USING (true);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para atualizar updated_at
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pet_documents_updated_at BEFORE UPDATE ON pet_documents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
