import { useState, useEffect } from "react";

// ── Design tokens — Nocturne Clarity ──────────────────────────────────────────
const C = {
  bg:      "linear-gradient(160deg, #070A10 0%, #0D1219 55%, #090E15 100%)",
  base:    "#0B0F18",
  surface: "#111620",
  card:    "rgba(255,255,255,0.04)",
  border:  "rgba(255,255,255,0.09)",
  borderH: "rgba(255,255,255,0.17)",
  glass:   "rgba(11,15,24,0.92)",
  primary: "#8B9BF4",
  pSoft:   "#B4BEF8",
  pDark:   "#6070D0",
  p10:     "rgba(139,155,244,0.10)",
  p15:     "rgba(139,155,244,0.15)",
  t1:      "#EFF1FA",
  t2:      "#A6AABF",
  t3:      "#686B82",
  t4:      "#3E4158",
  green:   "#6DCFA0",
  orange:  "#EAB46A",
};

const schedule = [
  {
    period: "Manhã", color: "#8B9BF4", icon: "◌",
    blocks: [
      { time: "05:30", duration: "15 min",  label: "Acordar",           detail: "Água com sal, banheiro, dentes e rosto" },
      { time: "05:45", duration: "25 min",  label: "Devocional",        detail: "Oração, meditação, respiração" },
      { time: "06:10", duration: "50 min",  label: "Café e leitura",    detail: "Café da manhã com leitura tranquila" },
      { time: "07:00", duration: "20 min",  label: "Planeamento",       detail: "Definir prioridades e estrutura do dia" },
      { time: "07:20", duration: "40 min",  label: "Preparação",        detail: "Preparação leve para o dia" },
      { time: "08:00", duration: "30 min",  label: "Treino",            detail: "Exercício físico" },
      { time: "08:30", duration: "20 min",  label: "Banho e skincare",  detail: "Higiene e cuidados matinais" },
      { time: "09:00", duration: "20 min",  label: "Café da manhã",     detail: "Refeição matinal" },
      { time: "09:30", duration: "30 min",  label: "Meggy",             detail: "Tempo com a Meggy" },
    ],
  },
  {
    period: "Tarde", color: "#B87DD4", icon: "◈",
    blocks: [
      { time: "10:00", duration: "2h 30min",  label: "Trabalho profundo",      detail: "Foco total, sem interrupções" },
      { time: "12:30", duration: "45 min",    label: "Almoço e reset",         detail: "Refeição e pausa mental" },
      { time: "13:15", duration: "2h 15min",  label: "Execução e operação",    detail: "Tarefas operacionais e entregas" },
      { time: "15:30", duration: "1h 15min",  label: "Estudo e crescimento",   detail: "Aprendizado estruturado do dia" },
      { time: "16:45", duration: "1h 15min",  label: "Fechamento do dia",      detail: "Revisão, pendências e encerramento" },
    ],
  },
  {
    period: "Noite", color: "#6AAAE8", icon: "◎",
    blocks: [
      { time: "18:00", duration: "1h 30min", label: "Vida pessoal",          detail: "Desaceleração e tempo livre" },
      { time: "19:30", duration: "45 min",   label: "Jantar",                detail: "Refeição noturna" },
      { time: "20:30", duration: "30 min",   label: "Desligamento digital",  detail: "Sem ecrãs, transição para repouso" },
      { time: "21:00", duration: "1h",       label: "Higiene e revisão",     detail: "Skincare noite, preparação e revisão do dia" },
      { time: "22:00", duration: "—",        label: "Dormir",                detail: "Sono reparador" },
    ],
  },
];

const weekSystem = [
  { day: "Seg", full: "Segunda", color: "#9490F0", study: "Estratégia empresarial, crescimento, posicionamento",  content: "Visão de negócio, tese, diferenciação",            tag: "Estratégia" },
  { day: "Ter", full: "Terça",   color: "#C080D8", study: "Copywriting, branding, comunicação, valor percebido",  content: "Posicionamento, marketing, construção de marca",   tag: "Marketing"  },
  { day: "Qua", full: "Quarta",  color: "#7090E0", study: "IA, automação, ferramentas, produtividade",            content: "Inovação, tendências, tecnologia aplicada",        tag: "Tecnologia" },
  { day: "Qui", full: "Quinta",  color: "#C07AB4", study: "Liderança, gestão, psicologia, negociação",            content: "Opinião forte, autoridade, cultura, comunicação",  tag: "Liderança"  },
  { day: "Sex", full: "Sexta",   color: "#8C98F2", study: "Casos reais, biografias, comportamento humano",        content: "Bastidores, aprendizados, storytelling, reflexões", tag: "Narrativa"  },
  { day: "Sáb", full: "Sábado",  color: "#A880D8", study: "Espiritualidade, filosofia, criatividade",             content: "Opcional — mais pessoal ou reflexivo",             tag: "Expansão"   },
  { day: "Dom", full: "Domingo", color: "#6898E8", study: "Revisar a semana · Definir prioridades · Pensar conteúdos", content: "Ajustar o sistema",                           tag: "Revisão"    },
];

const allDays = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];

export default function DailyOS() {
  const [tab, setTab]             = useState("dia");
  const [expanded, setExpanded]   = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const todayShort = allDays[currentTime.getDay()];
  const todayData  = weekSystem.find(w => w.day === todayShort) || weekSystem[1];
  const timeStr    = currentTime.toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" });

  return (
    <div style={{
      minHeight: "100vh",
      background: C.bg,
      color: C.t1,
      fontFamily: "system-ui, sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(139,155,244,0.22); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(139,155,244,0.38); }
        * { scrollbar-width: thin; scrollbar-color: rgba(139,155,244,0.22) transparent; }
        .row { transition: background 0.15s ease, border-color 0.15s ease; cursor: pointer; }
        .row:hover { background: rgba(255,255,255,0.04) !important; }
        .tab { transition: all 0.2s ease; cursor: pointer; }
        .wcard { transition: transform 0.18s ease, box-shadow 0.18s ease; cursor: default; }
        .wcard:hover { transform: translateY(-2px); box-shadow: 0 10px 36px rgba(0,0,0,0.22); }
        @keyframes pulse { 0%,100%{opacity:0.7} 50%{opacity:1} }
        .live { animation: pulse 2.5s ease-in-out infinite; }
        @keyframes fadein { from{opacity:0;transform:translateY(5px)} to{opacity:1;transform:translateY(0)} }
        .fadein { animation: fadein 0.25s ease; }
      `}</style>

      {/* Top bar */}
      <div style={{
        padding: "0 28px",
        borderBottom: `1px solid ${C.border}`,
        background: C.glass,
        backdropFilter: "blur(20px)",
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "58px" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "11px" }}>
            <div style={{
              width: "30px", height: "30px", borderRadius: "8px",
              background: `linear-gradient(135deg, ${C.primary}, ${C.pDark})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "13px",
              boxShadow: `0 3px 12px ${C.primary}35`,
            }}>◈</div>
            <span style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "15px", fontWeight: 700, letterSpacing: "0.03em",
              color: C.t1,
            }}>Habitus OS</span>
          </div>

          {/* Week dots */}
          <div style={{ display: "flex", gap: "4px" }}>
            {weekSystem.map(w => (
              <div key={w.day} title={w.full} style={{
                width: "28px", height: "28px", borderRadius: "7px",
                background: w.day === todayShort ? w.color : "rgba(255,255,255,0.04)",
                border: `1px solid ${w.day === todayShort ? w.color : "rgba(255,255,255,0.08)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "9px", fontWeight: w.day === todayShort ? 600 : 400,
                color: w.day === todayShort ? "#fff" : C.t4,
                transition: "all 0.2s",
              }}>{w.day.charAt(0)}</div>
            ))}
          </div>

          {/* Clock */}
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: C.t2 }}>
            {timeStr}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex" }}>
          {[["dia","Rotina do Dia"],["semana","Sistema Semanal"]].map(([key,label]) => (
            <button key={key} className="tab" onClick={() => setTab(key)} style={{
              background: "none", border: "none", outline: "none",
              padding: "10px 20px", cursor: "pointer",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase",
              color: tab === key ? C.pSoft : C.t3,
              borderBottom: tab === key ? `2px solid ${C.primary}` : "2px solid transparent",
              marginBottom: "-1px",
              transition: "all 0.2s ease",
            }}>{label}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: "26px 28px", maxWidth: "840px" }}>
        {/* Today banner */}
        <div style={{
          background: `linear-gradient(135deg, ${todayData.color}12, ${todayData.color}06)`,
          border: `1px solid ${todayData.color}28`,
          borderRadius: "14px", padding: "17px 20px", marginBottom: "26px",
          display: "grid", gridTemplateColumns: "1fr auto",
          gap: "16px", alignItems: "center",
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "9px", marginBottom: "8px" }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: "8px",
                letterSpacing: "0.15em", textTransform: "uppercase",
                color: todayData.color, background: `${todayData.color}1E`,
                padding: "3px 9px", borderRadius: "5px", fontWeight: 500,
              }}>{todayData.tag}</div>
              <div className="live" style={{ width: "6px", height: "6px", borderRadius: "50%", background: todayData.color }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: C.t3, letterSpacing: "0.08em" }}>
                HOJE · {todayData.full.toUpperCase()}
              </span>
            </div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "13px", color: C.pSoft, marginBottom: "5px", lineHeight: 1.4 }}>
              {todayData.study.split(",")[0]}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: C.t3 }}>
              Conteúdo → {todayData.content.split(",")[0]}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "34px", fontWeight: 700, color: `${todayData.color}25`, lineHeight: 1 }}>
              {currentTime.getDate()}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "8px", color: C.t4, marginTop: "3px", letterSpacing: "0.08em" }}>
              {currentTime.toLocaleDateString("pt-PT", { month: "short" }).toUpperCase()}
            </div>
          </div>
        </div>

        {/* ── DAY TAB ── */}
        {tab === "dia" && (
          <div className="fadein">
            {schedule.map((section, si) => (
              <div key={si} style={{ marginBottom: "28px" }}>
                {/* Section header */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase",
                    color: section.color, fontWeight: 500,
                  }}>
                    {section.icon} {section.period}
                  </div>
                  <div style={{ flex: 1, height: "1px", background: `linear-gradient(90deg, ${section.color}28, transparent)` }} />
                </div>

                {/* Blocks */}
                <div style={{
                  border: `1px solid ${C.border}`,
                  borderRadius: "12px", overflow: "hidden",
                }}>
                  {section.blocks.map((block, bi) => {
                    const key  = `${si}-${bi}`;
                    const open = expanded === key;
                    return (
                      <div key={bi} className="row"
                        onClick={() => setExpanded(open ? null : key)}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "72px 90px 1fr 18px",
                          alignItems: "center", gap: "12px",
                          padding: "12px 17px",
                          background: open ? `${section.color}0D` : "rgba(255,255,255,0.02)",
                          borderBottom: bi < section.blocks.length - 1 ? `1px solid ${C.border}` : "none",
                          borderLeft: open ? `3px solid ${section.color}` : "3px solid transparent",
                          transition: "all 0.15s ease",
                        }}>
                        {/* Time */}
                        <div style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "11px",
                          color: open ? section.color : C.t3,
                          fontWeight: open ? 500 : 400,
                        }}>
                          {block.time}
                        </div>

                        {/* Duration badge */}
                        <div style={{
                          fontFamily: "'JetBrains Mono', monospace", fontSize: "9px",
                          color: section.color, background: `${section.color}14`,
                          borderRadius: "5px", padding: "3px 8px", textAlign: "center",
                          letterSpacing: "0.04em",
                        }}>
                          {block.duration}
                        </div>

                        {/* Label + detail */}
                        <div>
                          <div style={{
                            fontFamily: "'Syne', sans-serif",
                            fontSize: "13px",
                            color: open ? C.t1 : C.t2,
                            fontWeight: open ? 600 : 400,
                            lineHeight: 1.3,
                          }}>
                            {block.label}
                          </div>
                          {open && (
                            <div className="fadein" style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: "10px", color: C.t3, marginTop: "4px", lineHeight: 1.55,
                            }}>
                              {block.detail}
                            </div>
                          )}
                        </div>

                        {/* Chevron */}
                        <div style={{
                          color: open ? section.color : C.t4,
                          fontSize: "14px",
                          transition: "transform 0.2s ease, color 0.15s ease",
                          transform: open ? "rotate(90deg)" : "none",
                          textAlign: "center",
                        }}>›</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── WEEK TAB ── */}
        {tab === "semana" && (
          <div className="fadein" style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
            {weekSystem.map((w, i) => (
              <div key={i} className="wcard" style={{
                background: w.day === todayShort
                  ? `linear-gradient(135deg, ${w.color}12, ${w.color}06)`
                  : "rgba(255,255,255,0.025)",
                border: `1px solid ${w.day === todayShort ? w.color + "30" : C.border}`,
                borderRadius: "12px", padding: "15px 18px",
                display: "grid", gridTemplateColumns: "120px 1fr 1fr",
                gap: "20px", alignItems: "start",
              }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "6px" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "3px", background: w.color, flexShrink: 0 }} />
                    <div style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: "14px", fontWeight: 600,
                      color: w.day === todayShort ? w.color : C.t2,
                    }}>{w.full}</div>
                  </div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: "8px",
                    letterSpacing: "0.14em", textTransform: "uppercase",
                    color: w.color, background: `${w.color}16`,
                    borderRadius: "4px", padding: "2px 8px", display: "inline-block",
                    fontWeight: 500,
                  }}>{w.tag}</div>
                </div>

                <div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: "8px",
                    color: C.t4, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "5px",
                  }}>Estudo</div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "11px", color: C.t3, lineHeight: 1.55 }}>
                    {w.study}
                  </div>
                </div>

                <div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: "8px",
                    color: C.t4, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "5px",
                  }}>Conteúdo</div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "11px", color: C.t3, lineHeight: 1.55 }}>
                    {w.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ padding: "0 28px 28px" }}>
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: "14px", display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: C.t4, letterSpacing: "0.12em" }}>
            HABITUS OS · SISTEMA DIÁRIO
          </span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: C.t4 }}>
            16h · 7 dias
          </span>
        </div>
      </div>
    </div>
  );
}
