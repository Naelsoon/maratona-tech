/**
 * MARATONA TECH 2026 - DASHBOARD DE NEURODIVERGÊNCIA & TECNOLOGIA
 * Lógica da aplicação, cálculos analíticos, filtros e exportação PDF.
 */

// Conjunto completo de dados da pesquisa de campo (12 respostas)
const SURVEY_DATA = [
  {
    id: 1,
    timestamp: "02/11/2026 13:55:25",
    perfil: "Sou estudante / colega de classe",
    perfilGroup: "estudante",
    obstaculo: "Falta de ferramentas tecnológicas fáceis que auxiliem o professor",
    obstaculoKey: "ferramentas",
    impactoRotina: 5,
    suporteEscolas: "Parcialmente, mas faltam softwares específicos para inclusão",
    suporteKey: "parcial"
  },
  {
    id: 2,
    timestamp: "02/11/2026 13:59:04",
    perfil: "Sou estudante / colega de classe",
    perfilGroup: "estudante",
    obstaculo: "Falta de ferramentas tecnológicas fáceis que auxiliem o professor",
    obstaculoKey: "ferramentas",
    impactoRotina: 4,
    suporteEscolas: "Não, os professores precisam adaptar tudo de forma manual ou impressa.",
    suporteKey: "manual"
  },
  {
    id: 3,
    timestamp: "02/11/2026 14:02:12",
    perfil: "Sou professor(a) / educador(a)",
    perfilGroup: "educador",
    obstaculo: "Falta de ferramentas tecnológicas fáceis que auxiliem o professor",
    obstaculoKey: "ferramentas",
    impactoRotina: 5,
    suporteEscolas: "Parcialmente, mas faltam softwares específicos para inclusão",
    suporteKey: "parcial"
  },
  {
    id: 4,
    timestamp: "02/11/2026 14:03:41",
    perfil: "Sou familiar de uma pessoa com TEA",
    perfilGroup: "familiar",
    obstaculo: "Falta de treinamento prático e formação na área",
    obstaculoKey: "treinamento",
    impactoRotina: 5,
    suporteEscolas: "Parcialmente, mas faltam softwares específicos para inclusão",
    suporteKey: "parcial"
  },
  {
    id: 5,
    timestamp: "02/11/2026 14:05:54",
    perfil: "Sou estudante / colega de classe",
    perfilGroup: "estudante",
    obstaculo: "Falta de tempo dos professores para criar materiais visuais individualizados",
    obstaculoKey: "tempo",
    impactoRotina: 5,
    suporteEscolas: "Não, os professores precisam adaptar tudo de forma manual ou impressa.",
    suporteKey: "manual"
  },
  {
    id: 6,
    timestamp: "02/11/2026 14:05:57",
    perfil: "Sou estudante / colega de classe",
    perfilGroup: "estudante",
    obstaculo: "Falta de tempo dos professores para criar materiais visuais individualizados",
    obstaculoKey: "tempo",
    impactoRotina: 4,
    suporteEscolas: "Parcialmente, mas faltam softwares específicos para inclusão",
    suporteKey: "parcial"
  },
  {
    id: 7,
    timestamp: "02/11/2026 14:31:38",
    perfil: "Sou familiar de uma pessoa com TEA",
    perfilGroup: "familiar",
    obstaculo: "Falta de ferramentas tecnológicas fáceis que auxiliem o professor",
    obstaculoKey: "ferramentas",
    impactoRotina: 4,
    suporteEscolas: "Parcialmente, mas faltam softwares específicos para inclusão",
    suporteKey: "parcial"
  },
  {
    id: 8,
    timestamp: "02/11/2026 14:47:36",
    perfil: "Sou professor(a) / educador(a)",
    perfilGroup: "educador",
    obstaculo: "Falta de tempo dos professores para criar materiais visuais individualizados",
    obstaculoKey: "tempo",
    impactoRotina: 3,
    suporteEscolas: "Parcialmente, mas faltam softwares específicos para inclusão",
    suporteKey: "parcial"
  },
  {
    id: 9,
    timestamp: "02/11/2026 14:52:19",
    perfil: "Sou estudante / colega de classe",
    perfilGroup: "estudante",
    obstaculo: "Falta de treinamento prático e formação na área",
    obstaculoKey: "treinamento",
    impactoRotina: 5,
    suporteEscolas: "Não, os professores precisam adaptar tudo de forma manual ou impressa.",
    suporteKey: "manual"
  },
  {
    id: 10,
    timestamp: "02/11/2026 14:54:42",
    perfil: "Sou estudante / colega de classe",
    perfilGroup: "estudante",
    obstaculo: "Falta de ferramentas tecnológicas fáceis que auxiliem o professor",
    obstaculoKey: "ferramentas",
    impactoRotina: 5,
    suporteEscolas: "Não, os professores precisam adaptar tudo de forma manual ou impressa.",
    suporteKey: "manual"
  },
  {
    id: 11,
    timestamp: "02/11/2026 14:56:45",
    perfil: "Sou professor(a) / educador(a)",
    perfilGroup: "educador",
    obstaculo: "Falta de tempo dos professores para criar materiais visuais individualizados",
    obstaculoKey: "tempo",
    impactoRotina: 5,
    suporteEscolas: "Não, os professores precisam adaptar tudo de forma manual ou impressa.",
    suporteKey: "manual"
  },
  {
    id: 12,
    timestamp: "02/11/2026 14:59:12",
    perfil: "Sou familiar de uma pessoa com TEA",
    perfilGroup: "familiar",
    obstaculo: "Falta de treinamento prático e formação na área",
    obstaculoKey: "treinamento",
    impactoRotina: 3,
    suporteEscolas: "Não, os professores precisam adaptar tudo de forma manual ou impressa.",
    suporteKey: "manual"
  }
];

// Estado da Aplicação
let currentFilter = "all";

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  setupFilterControls();
  setupExportButtons();
  renderAll();
});

// Renderização Geral
function renderAll() {
  const filteredData = getFilteredData();
  renderKPIs(filteredData);
  renderCharts(filteredData);
  updateFilterMeta(filteredData.length);
}

// Obter dados filtrados pelo grupo
function getFilteredData() {
  if (currentFilter === "all") return SURVEY_DATA;
  return SURVEY_DATA.filter(item => item.perfilGroup === currentFilter);
}

// 1. Renderização dos KPIs
function renderKPIs(data) {
  const count = data.length;
  const kpiTotalEl = document.getElementById("kpiTotal");
  const kpiScoreEl = document.getElementById("kpiScore");
  const kpiDeficitEl = document.getElementById("kpiDeficit");
  const kpiTimeEl = document.getElementById("kpiTime");

  if (!kpiTotalEl) return;

  if (count === 0) {
    kpiTotalEl.textContent = "0";
    kpiScoreEl.textContent = "0.0";
    kpiDeficitEl.textContent = "0%";
    kpiTimeEl.textContent = "0%";
    return;
  }

  // Total
  kpiTotalEl.textContent = count.toString();

  // Média de Impacto na Rotina (Escala 1 a 5)
  const sumScores = data.reduce((acc, cur) => acc + cur.impactoRotina, 0);
  const avgScore = (sumScores / count).toFixed(2);
  kpiScoreEl.textContent = `${avgScore} / 5.0`;

  // Déficit de Software de Inclusão (Manual + Parcial)
  const deficitCount = data.filter(i => i.suporteKey === "manual" || i.suporteKey === "parcial").length;
  const deficitPct = Math.round((deficitCount / count) * 100);
  kpiDeficitEl.textContent = `${deficitPct}%`;

  // Sobrecarga de Ferramentas e Tempo de Materiais Visuais
  const timeAndToolsCount = data.filter(i => i.obstaculoKey === "tempo" || i.obstaculoKey === "ferramentas").length;
  const timeAndToolsPct = Math.round((timeAndToolsCount / count) * 100);
  kpiTimeEl.textContent = `${timeAndToolsPct}%`;
}

// 2. Renderização dos Gráficos Minimalistas
function renderCharts(data) {
  const count = data.length;

  // Gráfico 1: Perfil dos Respondentes
  renderProfileChart(data, count);

  // Gráfico 2: Maiores Obstáculos
  renderObstaclesChart(data, count);

  // Gráfico 3: Avaliação do Impacto na Rotina (1 a 5)
  renderRatingChart(data, count);

  // Gráfico 4: Suporte nas Escolas
  renderSupportChart(data, count);
}

function renderProfileChart(data, total) {
  const el = document.getElementById("chartProfiles");
  if (!el) return;

  if (total === 0) {
    el.innerHTML = `<p class="chart-empty">Nenhum dado selecionado.</p>`;
    return;
  }

  const counts = {
    estudante: data.filter(i => i.perfilGroup === "estudante").length,
    educador: data.filter(i => i.perfilGroup === "educador").length,
    familiar: data.filter(i => i.perfilGroup === "familiar").length
  };

  const items = [
    { label: "Estudantes / Colegas", count: counts.estudante, pct: Math.round((counts.estudante / total) * 100), colorClass: "" },
    { label: "Professores / Educadores", count: counts.educador, pct: Math.round((counts.educador / total) * 100), colorClass: "neutral-fill" },
    { label: "Familiares de pessoas com TEA", count: counts.familiar, pct: Math.round((counts.familiar / total) * 100), colorClass: "light-fill" }
  ];

  let html = `<div class="custom-bar-list">`;
  items.forEach(item => {
    html += `
      <div class="custom-bar-item">
        <div class="custom-bar-label-row">
          <span class="custom-bar-label">${item.label}</span>
          <span class="custom-bar-val">${item.count} (${item.pct}%)</span>
        </div>
        <div class="custom-bar-track">
          <div class="custom-bar-fill ${item.colorClass}" style="width: ${item.pct}%;"></div>
        </div>
      </div>
    `;
  });
  html += `</div>`;
  el.innerHTML = html;
}

function renderObstaclesChart(data, total) {
  const el = document.getElementById("chartObstacles");
  if (!el) return;

  if (total === 0) {
    el.innerHTML = `<p class="chart-empty">Nenhum dado selecionado.</p>`;
    return;
  }

  const counts = {
    ferramentas: data.filter(i => i.obstaculoKey === "ferramentas").length,
    tempo: data.filter(i => i.obstaculoKey === "tempo").length,
    treinamento: data.filter(i => i.obstaculoKey === "treinamento").length
  };

  const items = [
    { label: "Falta de ferramentas tecnológicas fáceis", count: counts.ferramentas, pct: Math.round((counts.ferramentas / total) * 100), colorClass: "" },
    { label: "Falta de tempo para materiais visuais", count: counts.tempo, pct: Math.round((counts.tempo / total) * 100), colorClass: "neutral-fill" },
    { label: "Falta de treinamento prático e formação", count: counts.treinamento, pct: Math.round((counts.treinamento / total) * 100), colorClass: "light-fill" }
  ];

  let html = `<div class="custom-bar-list">`;
  items.forEach(item => {
    html += `
      <div class="custom-bar-item">
        <div class="custom-bar-label-row">
          <span class="custom-bar-label">${item.label}</span>
          <span class="custom-bar-val">${item.count} (${item.pct}%)</span>
        </div>
        <div class="custom-bar-track">
          <div class="custom-bar-fill ${item.colorClass}" style="width: ${item.pct}%;"></div>
        </div>
      </div>
    `;
  });
  html += `</div>`;
  el.innerHTML = html;
}

function renderRatingChart(data, total) {
  const el = document.getElementById("chartRatings");
  if (!el) return;

  if (total === 0) {
    el.innerHTML = `<p class="chart-empty">Nenhum dado selecionado.</p>`;
    return;
  }

  const counts = {
    1: data.filter(i => i.impactoRotina === 1).length,
    2: data.filter(i => i.impactoRotina === 2).length,
    3: data.filter(i => i.impactoRotina === 3).length,
    4: data.filter(i => i.impactoRotina === 4).length,
    5: data.filter(i => i.impactoRotina === 5).length
  };

  const maxVal = Math.max(...Object.values(counts), 1);

  let html = `<div class="rating-scale-grid">`;
  for (let score = 1; score <= 5; score++) {
    const count = counts[score];
    const barHeightPercent = Math.round((count / maxVal) * 100);
    const isHigh = score >= 4 && count > 0;

    html += `
      <div class="rating-col">
        <span class="rating-col-count">${count}</span>
        <div class="rating-col-bar ${isHigh ? 'active-accent' : ''}" style="height: ${Math.max(barHeightPercent, 8)}%;"></div>
        <span class="rating-col-label">${score}★</span>
      </div>
    `;
  }
  html += `</div>`;
  html += `<p style="font-size:0.75rem; color:var(--text-light); text-align:center; margin-top:8px;">Escala de 1 ("Não ajudaria") a 5 ("Ajudaria totalmente")</p>`;
  el.innerHTML = html;
}

function renderSupportChart(data, total) {
  const el = document.getElementById("chartSupport");
  if (!el) return;

  if (total === 0) {
    el.innerHTML = `<p class="chart-empty">Nenhum dado selecionado.</p>`;
    return;
  }

  const manualCount = data.filter(i => i.suporteKey === "manual").length;
  const parcialCount = data.filter(i => i.suporteKey === "parcial").length;

  const manualPct = Math.round((manualCount / total) * 100);
  const parcialPct = Math.round((parcialCount / total) * 100);

  let html = `
    <div class="donut-wrapper">
      <div class="donut-svg-box">
        <svg viewBox="0 0 36 36" style="width: 100%; height: 100%; transform: rotate(-90deg);">
          <!-- Fundo neutro -->
          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none" stroke="#E2E8F0" stroke-width="3.8" />
          <!-- Segmento Parcial (Accent) -->
          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none" stroke="#2563EB" stroke-width="3.8"
                stroke-dasharray="${parcialPct}, 100" />
          <!-- Segmento Manual (Slate) -->
          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none" stroke="#64748B" stroke-width="3.8"
                stroke-dasharray="${manualPct}, 100"
                stroke-dashoffset="-${parcialPct}" />
        </svg>
      </div>
      <div class="donut-legend">
        <div class="donut-legend-item">
          <span class="donut-color-dot" style="background-color: #64748B;"></span>
          <div>
            <strong>Não dão suporte (${manualPct}%)</strong>
            <p style="font-size:0.775rem; margin-top:2px;">Adaptação de forma manual ou impressa.</p>
          </div>
        </div>
        <div class="donut-legend-item">
          <span class="donut-color-dot" style="background-color: #2563EB;"></span>
          <div>
            <strong>Parcial (${parcialPct}%)</strong>
            <p style="font-size:0.775rem; margin-top:2px;">Faltam softwares específicos para inclusão.</p>
          </div>
        </div>
      </div>
    </div>
  `;
  el.innerHTML = html;
}

// 3. Configuração dos Controles de Filtro
function setupFilterControls() {
  const pills = document.querySelectorAll(".filter-pill");
  pills.forEach(pill => {
    pill.addEventListener("click", () => {
      pills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      currentFilter = pill.dataset.filter || "all";
      renderAll();
    });
  });
}

function updateFilterMeta(visibleCount) {
  const metaEl = document.getElementById("filterMeta");
  if (metaEl) {
    metaEl.textContent = `Exibindo ${visibleCount} de ${SURVEY_DATA.length} respostas registradas`;
  }
}

// 4. Utilitários de Exportação & Download (PDF / CSV / JSON)
function setupExportButtons() {
  // Impressão / Salvar PDF Nativo
  const printBtns = document.querySelectorAll(".btn-export-print");
  printBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      window.print();
    });
  });

  // Download PDF Direto
  const downloadPdfBtn = document.getElementById("btnDownloadPdf");
  if (downloadPdfBtn) {
    downloadPdfBtn.addEventListener("click", (e) => {
      e.preventDefault();
      exportReportPdf();
    });
  }

  const topDownloadPdfBtn = document.getElementById("btnTopDownloadPdf");
  if (topDownloadPdfBtn) {
    topDownloadPdfBtn.addEventListener("click", (e) => {
      e.preventDefault();
      exportReportPdf();
    });
  }

  // Download CSV
  const btnCsv = document.getElementById("btnDownloadCsv");
  if (btnCsv) {
    btnCsv.addEventListener("click", (e) => {
      e.preventDefault();
      downloadCsvFile();
    });
  }

  // Download JSON
  const btnJson = document.getElementById("btnDownloadJson");
  if (btnJson) {
    btnJson.addEventListener("click", (e) => {
      e.preventDefault();
      downloadJsonFile();
    });
  }
}

// Exportar Relatório Oficial em PDF
function exportReportPdf() {
  showToast("Gerando relatório PDF...");

  if (typeof html2pdf !== "undefined") {
    const element = document.getElementById("pdfReportContent") || document.body;
    const opt = {
      margin:       [10, 10, 10, 10],
      filename:     'Dashboard_Maratona_Tech_Neurodivergencia.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, letterRendering: true },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save().then(() => {
      showToast("Download do PDF concluído com sucesso!");
    }).catch(err => {
      console.warn("Falha no html2pdf, acionando impressão nativa:", err);
      window.print();
    });
  } else {
    window.print();
  }
}

// Download de CSV
function downloadCsvFile() {
  const headers = ["Data_Hora", "Perfil", "Maior_Obstaculo", "Impacto_Rotina_1_a_5", "Suporte_Escolas"];
  const rows = SURVEY_DATA.map(d => [
    `"${d.timestamp}"`,
    `"${d.perfil}"`,
    `"${d.obstaculo}"`,
    d.impactoRotina,
    `"${d.suporteEscolas}"`
  ]);

  const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
  triggerDownload(csvContent, "dados_pesquisa_maratona_tech.csv");
  showToast("Download do CSV concluído!");
}

// Download de JSON
function downloadJsonFile() {
  const jsonContent = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(SURVEY_DATA, null, 2));
  triggerDownload(jsonContent, "dados_pesquisa_maratona_tech.json");
  showToast("Download do JSON concluído!");
}

function triggerDownload(uri, filename) {
  const link = document.createElement("a");
  link.setAttribute("href", uri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Exibir Toast
function showToast(message) {
  const toast = document.getElementById("toastNotice");
  if (!toast) return;

  toast.textContent = message;
  toast.style.display = "flex";
  setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
}
