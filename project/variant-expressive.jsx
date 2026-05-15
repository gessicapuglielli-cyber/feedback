// V3 — Bold expressive. Oversized condensed display, color-blocked sections,
// inverted hero, marquee-style stacking, big numbers.

function ExpressivePage({ theme, publicRatings, scale = 1 }) {
  const dark = theme === "dark";
  // Inverted palette compared to other variants: hero IS the accent block.
  const c = dark
    ? {
        bg: "#0e1411",
        fg: "#f4f1ea",
        muted: "#9aa49d",
        accent: "#e7ddc8", // warm cream becomes the loud color in dark
        accentInk: "#0e1411",
        ink: "#1a2520",
        rule: "rgba(244,241,234,0.14)",
      }
    : {
        bg: "#f6f4ef",
        fg: "#0e1411",
        muted: "#5f6a64",
        accent: "#2a4d3a",
        accentInk: "#f6f4ef",
        ink: "#0e1411",
        rule: "rgba(14,20,17,0.16)",
      };

  const display = '"Anton", "Archivo Black", "Helvetica Neue", sans-serif';
  const body = '"Manrope", "Helvetica Neue", sans-serif';
  const mono = '"JetBrains Mono", ui-monospace, monospace';

  const [talkId, setTalkId] = React.useState(GESS.talks[0].id);
  const [submitted, setSubmitted] = React.useState(false);
  const { submit, stats } = useFeedback(talkId);

  const [rating, setRating] = React.useState(0);
  const [resonated, setResonated] = React.useState("");
  const [improve, setImprove] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [followUp, setFollowUp] = React.useState(false);

  const currentTalk = GESS.talks.find((t) => t.id === talkId);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!rating && !resonated && !improve) return;
    submit({ rating, resonated, improve, name, email, followUp });
    setSubmitted(true);
  };

  const fieldLabel = {
    fontFamily: mono,
    fontSize: 10,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: c.accentInk,
    opacity: 0.7,
    display: "block",
    marginBottom: 6,
  };
  const input = {
    width: "100%",
    background: "transparent",
    border: 0,
    borderBottom: `2px solid ${c.accentInk}`,
    padding: "8px 0 10px",
    color: c.accentInk,
    fontFamily: body,
    fontSize: 16,
    fontWeight: 500,
    outline: "none",
    resize: "none",
  };

  return (
    <div
      style={{
        width: 430,
        minHeight: 1900,
        background: c.bg,
        color: c.fg,
        fontFamily: body,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        .ex-input::placeholder { color: ${c.accentInk}; opacity: 0.5; }
        @keyframes ex-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .ex-marquee {
          display: inline-flex; gap: 28px;
          animation: ex-marquee 28s linear infinite;
          white-space: nowrap;
        }
      `}</style>

      {/* ─── Top status bar ─── */}
      <div
        style={{
          padding: "16px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: mono,
          fontSize: 11,
          color: c.muted,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 8, height: 8, background: c.accent, borderRadius: 99, display: "inline-block" }} />
          LIVE / FEEDBACK
        </div>
        <div>GP-26</div>
      </div>

      {/* ─── HERO: huge stacked display ─── */}
      <section
        style={{
          background: c.accent,
          color: c.accentInk,
          padding: "32px 24px 28px",
          position: "relative",
        }}
      >
        <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 14, opacity: 0.7 }}>
          Just heard the talk?
        </div>
        <h1
          style={{
            fontFamily: display,
            fontSize: 110,
            lineHeight: 0.82,
            letterSpacing: "-0.02em",
            margin: 0,
            textTransform: "uppercase",
            fontWeight: 400,
          }}
        >
          Tell<br />me<br />what<br />you<br />think.
        </h1>
        <div
          style={{
            marginTop: 22,
            paddingTop: 14,
            borderTop: `2px solid ${c.accentInk}`,
            fontFamily: body,
            fontSize: 15,
            lineHeight: 1.45,
            maxWidth: 320,
            fontWeight: 500,
          }}
        >
          Two minutes. Honest. Anonymous if you'd like.
        </div>
      </section>

      {/* ─── Talk picker (still on accent) ─── */}
      <div style={{ background: c.accent, color: c.accentInk, padding: "0 24px 24px" }}>
        <div style={{ ...fieldLabel, marginBottom: 10 }}>Choose talk</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {GESS.talks.map((t) => {
            const active = t.id === talkId;
            return (
              <button
                key={t.id}
                onClick={() => setTalkId(t.id)}
                style={{
                  background: active ? c.accentInk : "transparent",
                  color: active ? c.accent : c.accentInk,
                  border: `2px solid ${c.accentInk}`,
                  padding: "14px 16px",
                  textAlign: "left",
                  cursor: "pointer",
                  fontFamily: display,
                  textTransform: "uppercase",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  letterSpacing: "0.01em",
                }}
              >
                <span style={{ fontSize: 22, lineHeight: 1, letterSpacing: "0.01em" }}>{t.title}</span>
                <span style={{ fontFamily: mono, fontSize: 12, fontWeight: 500 }}>{t.year}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── Form on accent ─── */}
      <section style={{ background: c.accent, color: c.accentInk, padding: "8px 24px 36px" }}>
        {submitted ? (
          <div style={{ padding: "22px 0", borderTop: `2px solid ${c.accentInk}` }}>
            <div style={{ fontFamily: display, fontSize: 56, lineHeight: 0.9, textTransform: "uppercase", margin: 0 }}>
              Got it.<br />Thank you.
            </div>
            <div style={{ marginTop: 14, fontFamily: body, fontSize: 14, fontWeight: 500, opacity: 0.8 }}>
              If you ticked follow-up, expect a note within a week.
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit}>
            <div style={{ borderTop: `2px solid ${c.accentInk}`, paddingTop: 18, marginBottom: 22 }}>
              <div style={fieldLabel}>Rate it</div>
              <StarRating value={rating} onChange={setRating} size={36} color={c.accentInk} trackColor={`${c.accentInk}33`} />
            </div>

            <div style={{ marginBottom: 18 }}>
              <div style={fieldLabel}>What resonated</div>
              <textarea className="ex-input" rows={2} value={resonated} onChange={(e) => setResonated(e.target.value)} placeholder="One thing you'll remember" style={input} />
            </div>
            <div style={{ marginBottom: 22 }}>
              <div style={fieldLabel}>What I could improve</div>
              <textarea className="ex-input" rows={2} value={improve} onChange={(e) => setImprove(e.target.value)} placeholder="Be candid" style={input} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }}>
              <div>
                <div style={fieldLabel}>Name</div>
                <input className="ex-input" value={name} onChange={(e) => setName(e.target.value)} style={input} placeholder="Optional" />
              </div>
              <div>
                <div style={fieldLabel}>Email</div>
                <input className="ex-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={input} placeholder="Optional" />
              </div>
            </div>

            <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, fontWeight: 500, marginBottom: 24, cursor: "pointer" }}>
              <input type="checkbox" checked={followUp} onChange={(e) => setFollowUp(e.target.checked)} style={{ marginTop: 3, accentColor: c.accentInk, width: 18, height: 18 }} />
              <span>OK for me to follow up about this.</span>
            </label>

            <button
              type="submit"
              style={{
                width: "100%",
                background: c.accentInk,
                color: c.accent,
                border: 0,
                padding: "20px 20px",
                fontFamily: display,
                fontSize: 28,
                textTransform: "uppercase",
                letterSpacing: "0.02em",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                lineHeight: 1,
              }}
            >
              <span>Send</span>
              <span style={{ fontFamily: mono, fontSize: 14, fontWeight: 500 }}>→</span>
            </button>
          </form>
        )}

        {publicRatings && stats.avg != null && (
          <div style={{ marginTop: 22, paddingTop: 16, borderTop: `2px solid ${c.accentInk}`, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <div style={{ ...fieldLabel, marginBottom: 0 }}>Audience score</div>
            <div style={{ fontFamily: display, fontSize: 38, lineHeight: 1 }}>
              {stats.avg.toFixed(1)}
              <span style={{ fontFamily: mono, fontSize: 13, marginLeft: 8, opacity: 0.6 }}>/5 · n={stats.count}</span>
            </div>
          </div>
        )}
      </section>

      {/* ─── Marquee divider ─── */}
      <div
        style={{
          background: c.fg,
          color: c.bg,
          padding: "14px 0",
          overflow: "hidden",
          fontFamily: display,
          textTransform: "uppercase",
          fontSize: 28,
          letterSpacing: "0.02em",
          lineHeight: 1,
        }}
      >
        <div className="ex-marquee">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} style={{ display: "inline-flex", gap: 28 }}>
              {["Product Design", "★", "Leadership", "★", "Systems", "★", "AI-ready teams", "★", "25+ years", "★"].map((w, i) => (
                <span key={i}>{w}</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ─── About ─── */}
      <section style={{ padding: "32px 24px 28px" }}>
        <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: c.muted, marginBottom: 14 }}>
          / About
        </div>
        <h2 style={{ fontFamily: display, fontSize: 72, lineHeight: 0.85, textTransform: "uppercase", margin: "0 0 4px", letterSpacing: "-0.01em", fontWeight: 400 }}>
          Gess<br /><span style={{ color: c.accent }}>Puglielli</span>
        </h2>
        <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: c.muted, marginBottom: 22 }}>
          Head of Product Design · MPB
        </div>

        <img
          src={GESS.photo}
          alt="Gess Puglielli"
          style={{ width: "100%", height: 280, objectFit: "cover", objectPosition: "center 20%", display: "block", marginBottom: 22, filter: dark ? "grayscale(0.2)" : "none" }}
        />

        <p style={{ fontSize: 16, lineHeight: 1.5, fontWeight: 500, margin: "0 0 14px" }}>{GESS.bioShort}</p>
        <p style={{ fontSize: 14, lineHeight: 1.55, color: c.muted, margin: 0 }}>{GESS.bioLong[0]}</p>

        {/* big stats */}
        <div style={{ marginTop: 26, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1, background: c.rule, border: `2px solid ${c.fg}` }}>
          {[
            ["25+", "Years"],
            ["1→8", "Team"],
            ["90", "NetSent"],
          ].map(([k, v]) => (
            <div key={v} style={{ background: c.bg, padding: "16px 10px", textAlign: "center" }}>
              <div style={{ fontFamily: display, fontSize: 36, lineHeight: 1, letterSpacing: "-0.01em" }}>{k}</div>
              <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: c.muted, marginTop: 6 }}>{v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Talks block ─── */}
      <section style={{ background: c.fg, color: c.bg, padding: "32px 24px 36px" }}>
        <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", opacity: 0.6, marginBottom: 12 }}>
          / Talks
        </div>
        {GESS.talks.map((t, i) => (
          <div key={t.id} style={{ padding: "18px 0", borderTop: i ? `2px solid currentColor` : "none" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <div style={{ fontFamily: display, fontSize: 40, lineHeight: 0.95, textTransform: "uppercase", letterSpacing: "-0.01em" }}>
                {t.title}
              </div>
              <div style={{ fontFamily: mono, fontSize: 14, opacity: 0.7 }}>{t.year}</div>
            </div>
            <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.5, marginTop: 6 }}>
              {t.venue} · {t.status}
            </div>
          </div>
        ))}
      </section>

      {/* ─── Writing ─── */}
      <section style={{ padding: "32px 24px 28px" }}>
        <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: c.muted, marginBottom: 14 }}>
          / Writing
        </div>
        {GESS.articles.map((a, i) => (
          <div key={a.id} style={{ padding: "16px 0", borderTop: i ? `1px solid ${c.rule}` : "none" }}>
            <div style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.3, marginBottom: 6 }}>{a.title}</div>
            <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: c.muted }}>
              {a.outlet} · {a.year}
            </div>
          </div>
        ))}
      </section>

      {/* ─── Connect ─── */}
      <section style={{ background: c.accent, color: c.accentInk, padding: "32px 24px 28px" }}>
        <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", opacity: 0.7, marginBottom: 12 }}>
          / Connect
        </div>
        <h3 style={{ fontFamily: display, fontSize: 56, lineHeight: 0.88, textTransform: "uppercase", margin: "0 0 22px", letterSpacing: "-0.01em" }}>
          Three<br />homes,<br />one me.
        </h3>
        {GESS.links.map((l) => (
          <a
            key={l.id}
            href={l.url}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px 0",
              borderTop: `2px solid ${c.accentInk}`,
              color: c.accentInk,
              textDecoration: "none",
            }}
          >
            <div style={{ fontFamily: display, fontSize: 26, textTransform: "uppercase", letterSpacing: "0.01em" }}>{l.label}</div>
            <div style={{ fontFamily: mono, fontSize: 12 }}>{l.handle} →</div>
          </a>
        ))}
      </section>

      <div style={{ padding: "18px 24px 28px", display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: c.muted }}>
        <div>© 2026 Gess Puglielli</div>
        <div>End.</div>
      </div>
    </div>
  );
}

Object.assign(window, { ExpressivePage });
