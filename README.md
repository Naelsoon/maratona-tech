# Maratona Tech 2026 — Dashboard de Neurodivergência & Tecnologia nas Escolas

Landing page institucional com dashboard analítico interativo e exportação em PDF, desenvolvida com base nas 12 respostas coletadas no formulário de campo sobre os desafios da inclusão escolar e o suporte a estudantes neurodivergentes (como pessoas com Transtorno do Espectro Autista - TEA).

---

## 🎯 Diretrizes de Design Aplicadas

- **Estilo:** Minimalista, limpo e direto. Foco exclusivo nos dados e na clareza visual, sem ornamentos excessivos, sem gradientes chamativos e sem luzes neon.
- **Tipografia:** Google Fonts rigorosamente selecionadas — `Plus Jakarta Sans` para títulos e hierarquia de leitura, e `Inter` para o corpo de texto e dados tabulares.
- **Cores Sóbrias:**
  - Fundo neutro/claro: `#F8FAFC` e `#FFFFFF`
  - Texto neutro escuro: `#0F172A` (títulos) e `#475569` (apoio)
  - Bordas suaves: `1px solid #E2E8F0`
  - Apenas 1 cor de destaque (accent): `#2563EB` (azul institucional sóbrio)
- **Bordas & Sombras:** Cantos levemente arredondados (`border-radius: 6px` a `8px`) e ausência de sombras projetadas intensas.
- **Espaçamento:** Amplo respiro (whitespace) e separação confortável de elementos.

---

## 📊 Síntese dos Dados da Pesquisa (12 Respostas)

1. **Perfil da Amostra:**
   - Estudantes / Colegas de classe: 6 (50%)
   - Professores / Educadores: 3 (25%)
   - Familiares de pessoa com TEA: 3 (25%)

2. **Gargalo Principal na Sala de Aula (ex: Método TEACCH):**
   - Falta de ferramentas tecnológicas fáceis que auxiliem o professor: 5 (41.7%)
   - Falta de tempo dos professores para criar materiais visuais: 4 (33.3%)
   - Falta de treinamento prático e formação na área: 3 (25.0%)
   - *Nota:* **75%** dos entrevistados concentram os entraves em falta de ferramentas e falta de tempo.

3. **Receptividade a uma Plataforma de Automação (1 a 5):**
   - Nota 5 ("Ajudaria totalmente"): 7 respondentes (58.3%)
   - Nota 4: 3 respondentes (25.0%)
   - Nota 3: 2 respondentes (16.7%)
   - **Média Geral:** **4.42 / 5.0** (83.3% deram nota 4 ou 5; 100% deram nota ≥ 3).

4. **Suporte Tecnológico das Escolas Brasileiras:**
   - Não dão suporte (adaptação 100% manual ou impressa): 6 (50%)
   - Parcial (mas faltam softwares específicos para inclusão): 6 (50%)
   - Suporte adequado: 0 (0%) — **100% de déficit percebido**.

5. **Destaques Qualitativos dos Participantes:**
   - Requisito de cores calmas, painéis visuais organizados e rotinas personalizáveis com mascotes de interesse (Ex: dinossauros, planetas).
   - Necessidade urgente de capacitação docente e reconhecimento dos esforços dos professores.
   - Apelo direto por mais recursos técnicos para viabilizar a inclusão prática.

---

## 🚀 Como Executar e Visualizar

A aplicação é puramente estática, ultra-leve e sem dependências de compilação:

1. **Abrir diretamente no navegador:**
   - Dê um duplo clique no arquivo `index.html` em qualquer navegador (Google Chrome, Microsoft Edge, Firefox, Safari).
   - O arquivo está localizado em:
     `C:\Users\naels\.gemini\antigravity\scratch\maratona-tech-dashboard\index.html`

2. **(Opcional) Executar via servidor local:**
   Se preferir testar em um servidor web local, abra o PowerShell nesta pasta e execute:
   ```powershell
   npx serve .
   # ou
   python -m http.server 8000
   ```
   E acesse `http://localhost:8000`.

---

## 📄 Funcionalidades de Exportação em PDF

A página implementa dois mecanismos de exportação de alta fidelidade:

1. **Botão "Baixar Relatório em PDF" (via html2pdf.js):**
   Gera e baixa diretamente o arquivo `Relatorio_Maratona_Tech_Neurodivergencia.pdf` formatado no padrão A4.

2. **Botão "Imprimir / Salvar Nativo" (via `@media print`):**
   Aciona a caixa de diálogo de impressão nativa do navegador (`Ctrl + P`), com regras CSS que:
   - Ocultam navegações, menus, filtros e botões de interface.
   - Ajustam a tipografia e o contraste para papel A4.
   - Preservam a integridade dos cards, gráficos e da tabela sem quebras desnecessárias de página.

3. **Exportação de Dados Brutos:**
   - Botão para download direto em formato `.CSV`.
   - Botão para download direto em formato `.JSON`.

---

## 📁 Estrutura de Arquivos

```
maratona-tech-dashboard/
├── index.html        # Página completa e semântica com todas as seções
├── styles.css        # Folha de estilos minimalista com variáveis e regras @media print
├── app.js            # Lógica analítica, filtros interativos, renderização e PDF
├── dados.csv         # Base de dados original dos 12 respondentes
└── README.md         # Documentação e diretrizes do projeto
```
