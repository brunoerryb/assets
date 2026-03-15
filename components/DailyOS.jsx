import { useState, useEffect } from "react";
const schedule = [
  {
    period: "Manhã",
    color: "#9B6FD4",
    icon: "◌",
    blocks: [
      { time: "05:30", duration: "15 min", label: "Acordar", detail: "Água com sal, banheiro, dentes e rosto" },
      { time: "05:45", duration: "25 min", label: "Devocional", detail: "Oração, meditação, respiração" },
      { time: "06:10", duration: "50 min", label: "Café e leitura", detail: "Café da manhã com leitura tranquila" },
      { time: "07:00", duration: "20 min", label: "Planeamento", detail: "Definir prioridades e estrutura do dia" },
      { time: "07:20", duration: "40 min", label: "Preparação", detail: "Preparação leve para o dia" },
      { time: "08:00", duration: "30 min", label: "Treino", detail: "Exercício físico" },
      { time: "08:30", duration: "20 min", label: "Banho e skincare", detail: "Higiene e cuidados matinais" },
      { time: "09:00", duration: "20 min", label: "Café da manhã", detail: "Refeição matinal" },
      { time: "09:30", duration: "30 min", label: "Meggy", detail: "Tempo com a Meggy" },
    ],
  },
  {
    period: "Tarde",
    color: "#C46FD4",
    icon: "◈",
    blocks: [
      { time: "10:00", duration: "2h 30min", label: "Trabalho profundo", detail: "Foco total, sem interrupções" },
      { time: "12:30", duration: "45 min", label: "Almoço e reset", detail: "Refeição e pausa mental" },
      { time: "13:15", duration: "2h 15min", label: "Execução e operação", detail: "Tarefas operacionais e entregas" },
      { time: "15:30", duration: "1h 15min", label: "Estudo e crescimento", detail: "Aprendizado estruturado do dia" },
      { time: "16:45", duration: "1h 15min", label: "Fechamento do dia", detail: "Revisão, pendências e encerramento" },
    ],
  },
  {
    period: "Noite",
    color: "#6F8FD4",
    icon: "◎",
    blocks: [
      { time: "18:00", duration: "1h 30min", label: "Vida pessoal", detail: "Desaceleração e tempo livre" },
      { time: "19:30", duration: "45 min", label: "Jantar", detail: "Refeição noturna" },
      { time: "20:30", duration: "30 min", label: "Desligamento digital", detail: "Sem ecrãs, transição para repouso" },
      { time: "21:00", duration: "1h", label: "Higiene e revisão", detail: "Skincare noite, preparação e revisão do dia" },
      { time: "22:00", duration: "—", label: "Dormir", detail: "Sono reparador" },
    ],
  },
];
const weekSystem = [
  { day: "Seg", full: "Segunda", color: "#A67DD4", study: "Estratégia empresarial, crescimento, posicionamento", content: "Visão de negócio, tese, diferenciação", tag: "Estratégia" },
  { day: "Ter", full: "Terça", color: "#C46FD4", study: "Copywriting, branding, comunicação, valor percebido", content: "Posicionamento, marketing, construção de marca", tag: "Marketing" },
  { day: "Qua", full: "Quarta", color: "#7B6FD4", study: "IA, automação, ferramentas, produtividade", content: "Inovação, tendências, tecnologia aplicada", tag: "Tecnologia" },
  { day: "Qui", full: "Quinta", color: "#D46FAA", study: "Liderança, gestão, psicologia, negociação", content: "Opinião forte, autoridade, cultura, comunicação", tag: "Liderança" },
  { day: "Sex", full: "Sexta", color: "#9B6FD4", study: "Casos reais, biografias, comportamento humano", content: "Bastidores, aprendizados, storytelling, reflexões", tag: "Narrativa" },
  { day: "Sáb", full: "Sábado", color: "#B46FD4", study: "Espiritualidade, filosofia, criatividade", content: "Opcional — mais pessoal ou reflexivo", tag: "Expansão" },
  { day: "Dom", full: "Domingo", color: "#6F8FD4", study: "Revisar a semana · Definir prioridades · Pensar conteúdos", content: "Ajustar o sistema", tag: "Revisão" },
];
const allDays = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];
export default function DailyOS() {
  const [tab, setTab] = useState("dia");
  const [expanded, setExpanded] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(t);
  }, []);
  const todayShort = allDays[currentTime.getDay()];
  const todayData = weekSystem.find(w => w.day === todayShort) || weekSystem[1];
  const timeStr = currentTime.toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" });
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #0D0910 0%, #110D16 50%, #0D0F14 100%)",
      color: "#EDE8F5",
      fontFamily: "system-ui, sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=JetBrains+Mono:wght@300;400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #3D2B52; border-radius: 2px; }
        .row { transition: background 0.15s, border-color 0.15s; cursor: pointer; }
        .row:hover { background: rgba(155,111,212,0.07) !important; }
        .tab { transition: all 0.2s; cursor: pointer; }
        .wcard { transition: transform 0.18s, box-shadow 0.18s; cursor: default; }
        .wcard:hover { transform: translateY(-1px); box-shadow: 0 8px 32px rgba(155,111,212,0.12); }
        @keyframes glow { 0%,100%{opacity:1} 50%{opacity:0.5} }
        .live { animation: glow 2s ease-in-out infinite; }
        @keyframes fadein { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:translateY(0)} }
        .fadein { animation: fadein 0.25s ease; }
      `}</style>
      {/* Top bar */}
      <div style={{
        padding: "0 28px",
        borderBottom: "1px solid rgba(155,111,212,0.12)",
        background: "rgba(13,9,16,0.8)",
        backdropFilter: "blur(12px)",
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "56px" }}>
          {/* Logo area */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "28px", height: "28px", borderRadius: "6px",
              background: "linear-gradient(135deg, #9B6FD4, #6F4FAA)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "12px",
            }}>◈</div>
            <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "15px", fontWeight: 600, letterSpacing: "0.05em", color: "#EDE8F5" }}>
              Daily OS
            </span>
          </div>
          {/* Week dots */}
          <div style={{ display: "flex", gap: "4px" }}>
            {weekSystem.map(w => (
              <div key={w.day} title={w.full} style={{
                width: "26px", height: "26px", borderRadius: "6px",
                background: w.day === todayShort ? w.color : "rgba(255,255,255,0.04)",
                border: `1px solid ${w.day === todayShort ? w.color : "rgba(255,255,255,0.06)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "9px", fontWeight: 500,
                color: w.day === todayShort ? "#fff" : "#444",
              }}>{w.day.charAt(0)}</div>
            ))}
          </div>
          {/* Clock */}
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: "#6B5580" }}>
            {timeStr}
          </div>
        </div>
        {/* Tabs */}
        <div style={{ display: "flex", gap: "0", marginTop: "0" }}>
          {[["dia","Rotina do Dia"],["semana","Sistema Semanal"]].map(([key, label]) => (
            <button key={key} className="tab" onClick={() => setTab(key)} style={{
              background: "none", border: "none", outline: "none",
              padding: "10px 18px", cursor: "pointer",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase",
              color: tab === key ? "#C09BE8" : "#4A3A5A",
              borderBottom: tab === key ? "2px solid #9B6FD4" : "2px solid transparent",
              marginBottom: "-1px",
            }}>{label}</button>
          ))}
        </div>
      </div>
      <div style={{ padding: "24px 28px", maxWidth: "820px" }}>
        {/* Today banner */}
        <div style={{
          background: `linear-gradient(135deg, ${todayData.color}18 0%, rgba(111,79,170,0.06) 100%)`,
          border: `1px solid ${todayData.color}25`,
          borderRadius: "12px", padding: "16px 20px", marginBottom: "24px",
          display: "grid", gridTemplateColumns: "1fr auto",
          gap: "16px", alignItems: "center",
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: "9px",
                letterSpacing: "0.15em", textTransform: "uppercase",
                color: todayData.color, background: `${todayData.color}20`,
                padding: "3px 8px", borderRadius: "4px",
              }}>{todayData.tag}</div>
              <div className="live" style={{ width: "5px", height: "5px", borderRadius: "50%", background: todayData.color }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "#4A3A5A" }}>HOJE · {todayData.full.toUpperCase()}</span>
            </div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "13px", color: "#C09BE8", marginBottom: "4px" }}>
              {todayData.study.split(",")[0]}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#5A4A6A" }}>
              Conteúdo → {todayData.content.split(",")[0]}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "32px", fontWeight: 700, color: `${todayData.color}30`, lineHeight: 1 }}>
              {currentTime.getDate()}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "#3A2A4A", marginTop: "2px" }}>
              {currentTime.toLocaleDateString("pt-PT", { month: "short" }).toUpperCase()}
            </div>
          </div>
        </div>
        {/* DAY TAB */}
        {tab === "dia" && (
          <div className="fadein">
            {schedule.map((section, si) => (
              <div key={si} style={{ marginBottom: "28px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "0.2em", color: section.color, textTransform: "uppercase" }}>
                    {section.icon} {section.period}
                  </div>
                  <div style={{ flex: 1, height: "1px", background: `linear-gradient(90deg, ${section.color}30, transparent)` }} />
                </div>
                <div style={{ border: "1px solid rgba(155,111,212,0.08)", borderRadius: "10px", overflow: "hidden" }}>
                  {section.blocks.map((block, bi) => {
                    const key = `${si}-${bi}`;
                    const open = expanded === key;
                    return (
                      <div key={bi} className="row"
                        onClick={() => setExpanded(open ? null : key)}
                        style={{
                          display: "grid", gridTemplateColumns: "72px 88px 1fr 16px",
                          alignItems: "center", gap: "12px",
                          padding: "11px 16px",
                          background: open ? `${section.color}0D` : "rgba(255,255,255,0.01)",
                          borderBottom: bi < section.blocks.length - 1 ? "1px solid rgba(155,111,212,0.06)" : "none",
                          borderLeft: open ? `2px solid ${section.color}` : "2px solid transparent",
                        }}>
                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: open ? section.color : "#3A2A5A" }}>
                          {block.time}
                        </div>
                        <div style={{
                          fontFamily: "'JetBrains Mono', monospace", fontSize: "9px",
                          color: section.color, background: `${section.color}15`,
                          borderRadius: "4px", padding: "3px 7px", textAlign: "center",
                          letterSpacing: "0.05em",
                        }}>
                          {block.duration}
                        </div>
                        <div>
                          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "13px", color: open ? "#EDE8F5" : "#B09AC8", fontWeight: open ? 500 : 400 }}>
                            {block.label}
                          </div>
                          {open && (
                            <div className="fadein" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#5A4A6A", marginTop: "3px" }}>
                              {block.detail}
                            </div>
                          )}
                        </div>
                        <div style={{ color: "#3A2A5A", fontSize: "10px", transition: "transform 0.2s", transform: open ? "rotate(90deg)" : "none" }}>›</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
        {/* WEEK TAB */}
        {tab === "semana" && (
          <div className="fadein" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {weekSystem.map((w, i) => (
              <div key={i} className="wcard" style={{
                background: w.day === todayShort
                  ? `linear-gradient(135deg, ${w.color}14, ${w.color}06)`
                  : "rgba(255,255,255,0.02)",
                border: `1px solid ${w.day === todayShort ? w.color + "30" : "rgba(155,111,212,0.08)"}`,
                borderRadius: "10px", padding: "14px 18px",
                display: "grid", gridTemplateColumns: "120px 1fr 1fr",
                gap: "20px", alignItems: "start",
              }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: w.color }} />
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "14px", fontWeight: 600, color: w.day === todayShort ? w.color : "#9B8AB0" }}>
                      {w.full}
                    </div>
                  </div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: "8px",
                    letterSpacing: "0.15em", textTransform: "uppercase",
                    color: w.color, background: `${w.color}18`,
                    borderRadius: "3px", padding: "2px 7px", display: "inline-block",
                  }}>{w.tag}</div>
                </div>
                <div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "8px", color: "#3A2A5A", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "5px" }}>Estudo</div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "11px", color: "#7A6A8A", lineHeight: 1.5 }}>{w.study}</div>
                </div>
                <div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "8px", color: "#3A2A5A", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "5px" }}>Conteúdo</div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "11px", color: "#7A6A8A", lineHeight: 1.5 }}>{w.content}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Footer */}
      <div style={{ padding: "0 28px 28px" }}>
        <div style={{ borderTop: "1px solid rgba(155,111,212,0.08)", paddingTop: "14px", display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "#2A1A3A", letterSpacing: "0.12em" }}>ADERRY OS · SISTEMA DIÁRIO</span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "#2A1A3A" }}>16h · 7 dias</span>
        </div>
      </div>
    </div>
  );
}
