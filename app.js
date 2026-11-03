/**
 * MARATONA TECH 2026 - DASHBOARD DE NEURODIVERGÊNCIA & TECNOLOGIA
 * Lógica da aplicação, integração em tempo real com Google Sheets,
 * cálculo de métricas, gráficos reativos, tema escuro/claro e exportação PDF.
 */

// URL pública de exportação CSV da planilha do Google Sheets
const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/15_904bf-kzcH2H4oFoYuL-KkJsG9z52D38ER1NdzVhU/gviz/tq?tqx=out:csv";

// Base de dados de contingência/offline com as 22 respostas já registradas
const FALLBACK_SURVEY_DATA = [
  { id: 1, timestamp: "02/11/2026 13:55:25", perfil: "Sou estudante / colega de classe", perfilGroup: "estudante", obstaculo: "Falta de ferramentas tecnológicas fáceis que auxiliem o professor", obstaculoKey: "ferramentas", impactoRotina: 5, suporteEscolas: "Parcialmente, mas faltam softwares específicos para inclusão", suporteKey: "parcial" },
  { id: 2, timestamp: "02/11/2026 13:59:04", perfil: "Sou estudante / colega de classe", perfilGroup: "estudante", obstaculo: "Falta de ferramentas tecnológicas fáceis que auxiliem o professor", obstaculoKey: "ferramentas", impactoRotina: 4, suporteEscolas: "Não, os professores precisam adaptar tudo de forma manual ou impressa.", suporteKey: "manual" },
  { id: 3, timestamp: "02/11/2026 14:02:12", perfil: "Sou professor(a) / educador(a)", perfilGroup: "educador", obstaculo: "Falta de ferramentas tecnológicas fáceis que auxiliem o professor", obstaculoKey: "ferramentas", impactoRotina: 5, suporteEscolas: "Parcialmente, mas faltam softwares específicos para inclusão", suporteKey: "parcial" },
  { id: 4, timestamp: "02/11/2026 14:03:41", perfil: "Sou familiar de uma pessoa com TEA", perfilGroup: "familiar", obstaculo: "Falta de treinamento prático e formação na área", obstaculoKey: "treinamento", impactoRotina: 5, suporteEscolas: "Parcialmente, mas faltam softwares específicos para inclusão", suporteKey: "parcial" },
  { id: 5, timestamp: "02/11/2026 14:05:54", perfil: "Sou estudante / colega de classe", perfilGroup: "estudante", obstaculo: "Falta de tempo dos professores para criar materiais visuais individualizados", obstaculoKey: "tempo", impactoRotina: 5, suporteEscolas: "Não, os professores precisam adaptar tudo de forma manual ou impressa.", suporteKey: "manual" },
  { id: 6, timestamp: "02/11/2026 14:05:57", perfil: "Sou estudante / colega de classe", perfilGroup: "estudante", obstaculo: "Falta de tempo dos professores para criar materiais visuais individualizados", obstaculoKey: "tempo", impactoRotina: 4, suporteEscolas: "Parcialmente, mas faltam softwares específicos para inclusão", suporteKey: "parcial" },
  { id: 7, timestamp: "02/11/2026 14:31:38", perfil: "Sou familiar de uma pessoa com TEA", perfilGroup: "familiar", obstaculo: "Falta de ferramentas tecnológicas fáceis que auxiliem o professor", obstaculoKey: "ferramentas", impactoRotina: 4, suporteEscolas: "Parcialmente, mas faltam softwares específicos para inclusão", suporteKey: "parcial" },
  { id: 8, timestamp: "02/11/2026 14:47:36", perfil: "Sou professor(a) / educador(a)", perfilGroup: "educador", obstaculo: "Falta de tempo dos professores para criar materiais visuais individualizados", obstaculoKey: "tempo", impactoRotina: 3, suporteEscolas: "Parcialmente, mas faltam softwares específicos para inclusão", suporteKey: "parcial" },
  { id: 9, timestamp: "02/11/2026 14:52:19", perfil: "Sou estudante / colega de classe", perfilGroup: "estudante", obstaculo: "Falta de treinamento prático e formação na área", obstaculoKey: "treinamento", impactoRotina: 5, suporteEscolas: "Não, os professores precisam adaptar tudo de forma manual ou impressa.", suporteKey: "manual" },
  { id: 10, timestamp: "02/11/2026 14:54:42", perfil: "Sou estudante / colega de classe", perfilGroup: "estudante", obstaculo: "Falta de ferramentas tecnológicas fáceis que auxiliem o professor", obstaculoKey: "ferramentas", impactoRotina: 5, suporteEscolas: "Não, os professores precisam adaptar tudo de forma manual ou impressa.", suporteKey: "manual" },
  { id: 11, timestamp: "02/11/2026 14:56:45", perfil: "Sou professor(a) / educador(a)", perfilGroup: "educador", obstaculo: "Falta de tempo dos professores para criar materiais visuais individualizados", obstaculoKey: "tempo", impactoRotina: 5, suporteEscolas: "Não, os professores precisam adaptar tudo de forma manual ou impressa.", suporteKey: "manual" },
  { id: 12, timestamp: "02/11/2026 14:59:12", perfil: "Sou familiar de uma pessoa com TEA", perfilGroup: "familiar", obstaculo: "Falta de treinamento prático e formação na área", obstaculoKey: "treinamento", impactoRotina: 3, suporteEscolas: "Não, os professores precisam adaptar tudo de forma manual ou impressa.", suporteKey: "manual" },
  { id: 13, timestamp: "02/11/2026 16:57:50", perfil: "Sou estudante / colega de classe", perfilGroup: "estudante", obstaculo: "Falta de ferramentas tecnológicas fáceis que auxiliem o professor", obstaculoKey: "ferramentas", impactoRotina: 4, suporteEscolas: "Parcialmente, mas faltam softwares específicos para inclusão", suporteKey: "parcial" },
  { id: 14, timestamp: "02/11/2026 20:39:30", perfil: "Sou professor(a) / educador(a)", perfilGroup: "educador", obstaculo: "Falta de tempo dos professores para criar materiais visuais individualizados", obstaculoKey: "tempo", impactoRotina: 5, suporteEscolas: "Não, os professores precisam adaptar tudo de forma manual ou impressa.", suporteKey: "manual" },
  { id: 15, timestamp: "02/11/2026 20:43:11", perfil: "Sou familiar de uma pessoa com TEA", perfilGroup: "familiar", obstaculo: "Falta de treinamento prático e formação na área", obstaculoKey: "treinamento", impactoRotina: 5, suporteEscolas: "Não, os professores precisam adaptar tudo de forma manual ou impressa.", suporteKey: "manual" },
  { id: 16, timestamp: "02/11/2026 20:58:44", perfil: "Sou familiar de uma pessoa com TEA", perfilGroup: "familiar", obstaculo: "Falta de treinamento prático e formação na área", obstaculoKey: "treinamento", impactoRotina: 4, suporteEscolas: "Parcialmente, mas faltam softwares específicos para inclusão", suporteKey: "parcial" },
  { id: 17, timestamp: "02/11/2026 21:00:46", perfil: "Sou estudante / colega de classe", perfilGroup: "estudante", obstaculo: "Falta de ferramentas tecnológicas fáceis que auxiliem o professor", obstaculoKey: "ferramentas", impactoRotina: 5, suporteEscolas: "Não, os professores precisam adaptar tudo de forma manual ou impressa.", suporteKey: "manual" },
  { id: 18, timestamp: "02/11/2026 21:04:13", perfil: "Sou professor(a) / educador(a)", perfilGroup: "educador", obstaculo: "Falta de treinamento prático e formação na área", obstaculoKey: "treinamento", impactoRotina: 4, suporteEscolas: "Parcialmente, mas faltam softwares específicos para inclusão", suporteKey: "parcial" },
  { id: 19, timestamp: "02/11/2026 21:06:17", perfil: "Sou estudante / colega de classe", perfilGroup: "estudante", obstaculo: "Falta de tempo dos professores para criar materiais visuais individualizados", obstaculoKey: "tempo", impactoRotina: 3, suporteEscolas: "Parcialmente, mas faltam softwares específicos para inclusão", suporteKey: "parcial" },
  { id: 20, timestamp: "02/11/2026 21:06:28", perfil: "Ja fui professor", perfilGroup: "educador", obstaculo: "Falta de treinamento prático e formação na área", obstaculoKey: "treinamento", impactoRotina: 4, suporteEscolas: "Não, os professores precisam adaptar tudo de forma manual ou impressa.", suporteKey: "manual" },
  { id: 21, timestamp: "02/11/2026 21:10:46", perfil: "Sou estudante / colega de classe", perfilGroup: "estudante", obstaculo: "Falta de tempo dos professores para criar materiais visuais individualizados", obstaculoKey: "tempo", impactoRotina: 4, suporteEscolas: "Não, os professores precisam adaptar tudo de forma manual ou impressa.", suporteKey: "manual" },
  { id: 22, timestamp: "02/11/2026 21:11:15", perfil: "Sou estudante / colega de classe", perfilGroup: "estudante", obstaculo: "Falta de tempo dos professores para criar materiais visuais individualizados", obstaculoKey: "tempo", impactoRotina: 5, suporteEscolas: "Não, os professores precisam adaptar tudo de forma manual ou impressa.", suporteKey: "manual" }
];

// Estado da Aplicação
let currentSurveyData = [...FALLBACK_SURVEY_DATA];
let currentFilter = "all";
let isFetchingLive = false;

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  setupFilterControls();
  setupExportButtons();
  setupLiveSyncControls();
  
  // Render inicial com os dados locais
  renderAll();

  // Busca dados em tempo real da planilha e agenda polling a cada 30 segundos
  fetchLiveSheetData(false);
  setInterval(() => {
    fetchLiveSheetData(false);
  }, 30000);
});

// ==========================================================================
// 1. SINCRONIZAÇÃO EM TEMPO REAL COM GOOGLE SHEETS
// ==========================================================================

async function fetchLiveSheetData(isManual = false) {
  if (isFetchingLive) return;
  isFetchingLive = true;

  const refreshIcon = document.getElementById("refreshIcon");
  const metaEl = document.getElementById("filterMeta");
  
  if (refreshIcon) refreshIcon.classList.add("refreshing");
  if (isManual && metaEl) metaEl.textContent = "Sincronizando com a planilha...";

  try {
    // Adiciona timestamp para desabilitar cache do navegador
    const cacheBusterUrl = `${SHEET_CSV_URL}&_=${Date.now()}`;
    const response = await fetch(cacheBusterUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const csvText = await response.text();
    const parsedData = processGoogleSheetsCSV(csvText);

    if (parsedData && parsedData.length > 0) {
      const prevLength = currentSurveyData.length;
      currentSurveyData = parsedData;
      renderAll();

      const now = new Date();
      const timeStr = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
      if (metaEl) {
        metaEl.textContent = `Ao vivo • ${currentSurveyData.length} respostas (sincronizado às ${timeStr})`;
      }

      if (isManual || currentSurveyData.length > prevLength) {
        showToast(`Dashboard atualizado! ${currentSurveyData.length} respostas registradas.`);
      }
    }
  } catch (error) {
    console.warn("Não foi possível carregar ao vivo do Google Sheets (usando cache local):", error);
    const now = new Date();
    const timeStr = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    if (metaEl) {
      metaEl.textContent = `Offline • ${currentSurveyData.length} respostas locais (última checagem às ${timeStr})`;
    }
    if (isManual) {
      showToast("Não foi possível conectar ao Google Sheets. Usando dados locais.");
    }
  } finally {
    isFetchingLive = false;
    if (refreshIcon) refreshIcon.classList.remove("refreshing");
  }
}

// Parser RFC 4180 robusto para CSV
function parseCSV(text) {
  const rows = [];
  let row = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push(current.trim());
      current = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      row.push(current.trim());
      if (row.some(cell => cell.length > 0)) {
        rows.push(row);
      }
      row = [];
      current = '';
    } else {
      current += char;
    }
  }

  if (current.length > 0 || row.length > 0) {
    row.push(current.trim());
    if (row.some(cell => cell.length > 0)) {
      rows.push(row);
    }
  }

  return rows;
}

// Normalização dos registros recebidos do Google Sheets
function processGoogleSheetsCSV(csvText) {
  const rawRows = parseCSV(csvText);
  if (!rawRows || rawRows.length < 2) return null;

  // Ignora cabeçalho (rawRows[0])
  const dataRows = rawRows.slice(1);
  const normalized = [];

  dataRows.forEach((row, idx) => {
    if (!row || row.length < 4) return;

    const timestamp = row[0] || "";
    const perfilRaw = row[1] || "";
    const obstaculoRaw = row[2] || "";
    const impactoRaw = parseInt(row[3], 10) || 5;
    const suporteRaw = row[4] || "";
    const sugestaoRaw = row[5] || "";

    // Mapeamento normalizado de Perfil
    const pLower = perfilRaw.toLowerCase();
    let perfilGroup = "outro";
    if (pLower.includes("estudante") || pLower.includes("colega") || pLower.includes("alun")) {
      perfilGroup = "estudante";
    } else if (pLower.includes("professor") || pLower.includes("educador") || pLower.includes("docente")) {
      perfilGroup = "educador";
    } else if (pLower.includes("familiar") || pLower.includes("tea") || pLower.includes("pai") || pLower.includes("mãe")) {
      perfilGroup = "familiar";
    }

    // Mapeamento normalizado de Obstáculo
    const oLower = obstaculoRaw.toLowerCase();
    let obstaculoKey = "ferramentas";
    if (oLower.includes("tempo") || oLower.includes("material")) {
      obstaculoKey = "tempo";
    } else if (oLower.includes("treinamento") || oLower.includes("capacita") || oLower.includes("forma")) {
      obstaculoKey = "treinamento";
    }

    // Mapeamento normalizado de Suporte
    const sLower = suporteRaw.toLowerCase();
    let suporteKey = "manual";
    if (sLower.includes("parcial") || sLower.includes("faltam")) {
      suporteKey = "parcial";
    }

    normalized.push({
      id: idx + 1,
      timestamp,
      perfil: perfilRaw,
      perfilGroup,
      obstaculo: obstaculoRaw,
      obstaculoKey,
      impactoRotina: Math.min(Math.max(impactoRaw, 1), 5),
      suporteEscolas: suporteRaw,
      suporteKey,
      sugestao: sugestaoRaw
    });
  });

  return normalized;
}

// Configuração do botão de atualização manual
function setupLiveSyncControls() {
  const btn = document.getElementById("btnManualRefresh");
  if (btn) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      fetchLiveSheetData(true);
    });
  }
}

// ==========================================================================
// 2. RENDERIZAÇÃO GERAL DO DASHBOARD
// ==========================================================================

function renderAll() {
  updateFilterPillCounts();
  const filteredData = getFilteredData();
  renderKPIs(filteredData);
  renderCharts(filteredData);
}

function getFilteredData() {
  if (currentFilter === "all") return currentSurveyData;
  return currentSurveyData.filter(item => item.perfilGroup === currentFilter);
}

function updateFilterPillCounts() {
  const total = currentSurveyData.length;
  const countEstudantes = currentSurveyData.filter(i => i.perfilGroup === "estudante").length;
  const countEducadores = currentSurveyData.filter(i => i.perfilGroup === "educador").length;
  const countFamiliares = currentSurveyData.filter(i => i.perfilGroup === "familiar").length;

  const pillAll = document.getElementById("filterPillAll");
  const pillEstudante = document.getElementById("filterPillEstudante");
  const pillEducador = document.getElementById("filterPillEducador");
  const pillFamiliar = document.getElementById("filterPillFamiliar");

  if (pillAll) pillAll.textContent = `Todos (${total})`;
  if (pillEstudante) pillEstudante.textContent = `Estudantes (${countEstudantes})`;
  if (pillEducador) pillEducador.textContent = `Professores (${countEducadores})`;
  if (pillFamiliar) pillFamiliar.textContent = `Familiares TEA (${countFamiliares})`;
}

// KPIs
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

  // Média linear de automação (1 a 5)
  const sumScores = data.reduce((acc, cur) => acc + cur.impactoRotina, 0);
  const avgScore = (sumScores / count).toFixed(2);
  kpiScoreEl.textContent = `${avgScore} / 5.0`;

  // Déficit Tecnológico (Manual + Parcial)
  const deficitCount = data.filter(i => i.suporteKey === "manual" || i.suporteKey === "parcial").length;
  const deficitPct = Math.round((deficitCount / count) * 100);
  kpiDeficitEl.textContent = `${deficitPct}%`;

  // Gargalo Tempo & Ferramentas
  const timeAndToolsCount = data.filter(i => i.obstaculoKey === "tempo" || i.obstaculoKey === "ferramentas").length;
  const timeAndToolsPct = Math.round((timeAndToolsCount / count) * 100);
  kpiTimeEl.textContent = `${timeAndToolsPct}%`;
}

// Gráficos
function renderCharts(data) {
  const count = data.length;
  renderProfileChart(data, count);
  renderObstaclesChart(data, count);
  renderRatingChart(data, count);
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
    { label: "Falta de ferramentas tecnológicas práticas", count: counts.ferramentas, pct: Math.round((counts.ferramentas / total) * 100), colorClass: "" },
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
  html += `<p style="font-size:0.75rem; color:var(--text-light); text-align:center; margin-top:8px;">Escala linear: 1 ("Não ajudaria") a 5 ("Ajudaria totalmente")</p>`;
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
          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none" stroke="var(--border-color)" stroke-width="3.8" />
          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none" stroke="var(--accent)" stroke-width="3.8"
                stroke-dasharray="${parcialPct}, 100" />
          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none" stroke="var(--chart-bar-neutral)" stroke-width="3.8"
                stroke-dasharray="${manualPct}, 100"
                stroke-dashoffset="-${parcialPct}" />
        </svg>
      </div>
      <div class="donut-legend">
        <div class="donut-legend-item">
          <span class="donut-color-dot" style="background-color: var(--chart-bar-neutral);"></span>
          <div>
            <strong>Não dão suporte (${manualPct}%)</strong>
            <p style="font-size:0.775rem; margin-top:2px;">Adaptação de forma manual ou impressa.</p>
          </div>
        </div>
        <div class="donut-legend-item">
          <span class="donut-color-dot" style="background-color: var(--accent);"></span>
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

// Filtros
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

// ==========================================================================
// 3. MODO ESCURO / MODO CLARO (THEME TOGGLE)
// ==========================================================================

function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

  applyTheme(initialTheme);

  const toggleBtn = document.getElementById("btnThemeToggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const current = document.documentElement.getAttribute("data-theme") || "light";
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem("theme", next);
    });
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const iconMoon = document.getElementById("themeIconMoon");
  const iconSun = document.getElementById("themeIconSun");
  const textEl = document.getElementById("themeToggleText");

  if (theme === "dark") {
    if (iconMoon) iconMoon.style.display = "none";
    if (iconSun) iconSun.style.display = "inline-block";
    if (textEl) textEl.textContent = "Modo Claro";
  } else {
    if (iconMoon) iconMoon.style.display = "inline-block";
    if (iconSun) iconSun.style.display = "none";
    if (textEl) textEl.textContent = "Modo Escuro";
  }
}

// ==========================================================================
// 4. EXPORTAÇÃO E DOWNLOAD EM PDF
// ==========================================================================

function setupExportButtons() {
  const printBtns = document.querySelectorAll(".btn-export-print");
  printBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      window.print();
    });
  });

  const topDownloadPdfBtn = document.getElementById("btnTopDownloadPdf");
  if (topDownloadPdfBtn) {
    topDownloadPdfBtn.addEventListener("click", (e) => {
      e.preventDefault();
      exportReportPdf();
    });
  }
}

function exportReportPdf() {
  showToast("Gerando relatório PDF...");

  if (typeof html2pdf !== "undefined") {
    const element = document.getElementById("pdfReportContent") || document.body;
    
    // Temporariamente força aparência limpa de relatório para PDF
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

// Toast
function showToast(message) {
  const toast = document.getElementById("toastNotice");
  if (!toast) return;

  toast.textContent = message;
  toast.style.display = "flex";
  setTimeout(() => {
    toast.style.display = "none";
  }, 3200);
}
