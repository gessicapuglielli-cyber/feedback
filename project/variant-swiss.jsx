// V2 — Minimal Swiss. Tight grid, Helvetica, IBM Plex Mono metadata, ruled
// horizontals, generous whitespace, left-aligned. No decoration.

function SwissPage({ theme, publicRatings, scale = 1 }) {
  const dark = theme === "dark";
  const c = dark
    ? { bg: "#101512", panel: "#161c18", fg: "#eef0ec", muted: "#8a948c", accent: "#9bc4a3", rule: "rgba(238,240,236,0.12)", input: "rgba(238,240,236,0.06)" }
    : { bg: "#f6f4ef", panel: "#ffffff", fg: "#0e1411", muted: "#6a746e", accent: "#2a4d3a", rule: "rgba(14,20,17,0.14)", input: "rgba(14,20,17,0.04)" };

  const sans = '"Helvetica Neue", Helvetica, "Söhne", "Geist", sans-serif';
  const mono = '"IBM Plex Mono", ui-monospace, monospace';

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

  const label = {
    fontFamily: mono,
    fontSize: 10,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: c.muted,
    display: "block",
    marginBottom: 6,
  };
  const input = {
    width: "100%",
    background: c.input,
    border: 0,
    borderRadius: 0,
    padding: "12px 14px",
    color: c.fg,
    fontFamily: sans,
    fontSize: 15,
    outline: "none",
    resize: "none",
  };
  const section = { padding: "28px 24px", borderTop: `1px solid ${c.rule}` };

  return (
    <div
      style={{
        width: 430,
        minHeight: 1900,
        background: c.bg,
        color: c.fg,
        fontFamily: sans,
        fontFeatureSettings: '"ss01"',
        letterSpacing: "-0.005em",
        transform: `scale(${scale})`,
        transformOrigin: "top left",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap');
        .sw-input::placeholder { color: ${c.muted}; opacity: 0.85; }
        .sw-input:focus { outline: 1px solid ${c.accent}; outline-offset: -1px; }
      `}</style>

      {/* ─── Top bar ─── */}
      <div
        style={{
          padding: "18px 24px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          alignItems: "center",
          fontFamily: mono,
          fontSize: 10,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: c.muted,
          borderBottom: `1px solid ${c.rule}`,
        }}
      >
        <div>GP / 001</div>
        <div style={{ textAlign: "center" }}>Talk Feedback</div>
        <div style={{ textAlign: "right" }}>2026</div>
      </div>

      {/* ─── Hero / feedback context ─── */}
      <section style={{ padding: "44px 24px 8px" }}>
        <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: c.accent, marginBottom: 22, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 16, height: 1, background: c.accent, display: "inline-block" }} />
          Step 01 — Feedback
        </div>
        <h1 style={{ fontFamily: sans, fontWeight: 500, fontSize: 40, lineHeight: 1.02, letterSpacing: "-0.025em", margin: "0 0 18px" }}>
          Thanks for being<br />in the room.
        </h1>
        <p style={{ fontFamily: sans, fontSize: 15, lineHeight: 1.55, color: c.muted, margin: "0 0 32px", maxWidth: 340 }}>
          Two minutes of honest feedback helps me do this better. Pick the talk, score it, type a line.
        </p>
      </section>

      {/* ─── Talk picker ─── */}
      <div style={{ padding: "0 24px 24px" }}>
        <div style={label}>Talk</div>
        <div style={{ display: "grid", gap: 1, background: c.rule, border: `1px solid ${c.rule}` }}>
          {GESS.talks.map((t) => {
            const active = t.id === talkId;
            return (
              <button
                key={t.id}
                onClick={() => setTalkId(t.id)}
                style={{
                  background: active ? c.accent : c.panel,
                  color: active ? c.panel : c.fg,
                  border: 0,
                  padding: "16px 16px",
                  textAlign: "left",
                  cursor: "pointer",
                  fontFamily: sans,
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  alignItems: "center",
                  transition: "background 160ms ease, color 160ms ease",
                }}
              >
                <div>
                  <div style={{ fontSize: 16, fontWeight: 500 }}>{t.title}</div>
                  <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.65, marginTop: 4 }}>
                    {t.venue}
                  </div>
                </div>
                <div style={{ fontFamily: mono, fontSize: 13 }}>{t.year}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── Form ─── */}
      <form onSubmit={onSubmit} style={{ padding: "0 24px 32px" }}>
        {submitted ? (
          <div style={{ padding: "28px 22px", background: c.panel, border: `1px solid ${c.rule}` }}>
            <ThanksNote accent={c.accent} fg={c.fg} muted={c.muted} mono={mono} />
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 24 }}>
              <div style={label}>Rating</div>
              <StarRating value={rating} onChange={setRating} size={32} color={c.accent} trackColor={c.rule} />
            </div>

            <div style={{ marginBottom: 18 }}>
              <div style={label}>What resonated</div>
              <textarea
                className="sw-input"
                value={resonated}
                onChange={(e) => setResonated(e.target.value)}
                rows={2}
                placeholder="One thing you'll take away."
                style={input}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={label}>What I could improve</div>
              <textarea
                className="sw-input"
                value={improve}
                onChange={(e) => setImprove(e.target.value)}
                rows={2}
                placeholder="Be specific."
                style={input}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
              <div>
                <div style={label}>Name <span style={{ textTransform: "none", letterSpacing: 0 }}>(opt.)</span></div>
                <input className="sw-input" value={name} onChange={(e) => setName(e.target.value)} style={input} />
              </div>
              <div>
                <div style={label}>Email <span style={{ textTransform: "none", letterSpacing: 0 }}>(opt.)</span></div>
                <input className="sw-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={input} />
              </div>
            </div>

            <label
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: 12,
                alignItems: "start",
                padding: "14px 14px",
                background: c.input,
                marginBottom: 22,
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={followUp}
                onChange={(e) => setFollowUp(e.target.checked)}
                style={{ marginTop: 2, accentColor: c.accent, width: 16, height: 16 }}
              />
              <span style={{ fontSize: 13, lineHeight: 1.4, color: c.fg }}>
                OK to follow up about this feedback.
              </span>
            </label>

            <button
              type="submit"
              style={{
                width: "100%",
                background: c.accent,
                color: dark ? c.bg : "#ffffff",
                border: 0,
                padding: "18px 20px",
                fontFamily: sans,
                fontSize: 15,
                fontWeight: 500,
                letterSpacing: "-0.005em",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>Send feedback</span>
              <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.85 }}>
                → {currentTalk?.title.toLowerCase()}
              </span>
            </button>
          </>
        )}

        {publicRatings && stats.avg != null && (
          <div style={{ marginTop: 18, padding: "14px 16px", border: `1px solid ${c.rule}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: c.muted }}>
              Avg · {currentTalk?.title}
            </div>
            <div style={{ fontSize: 18, fontWeight: 500 }}>
              {stats.avg.toFixed(1)}<span style={{ color: c.muted, fontWeight: 400 }}>/5</span>
              <span style={{ fontFamily: mono, fontSize: 11, color: c.muted, marginLeft: 8 }}>n={stats.count}</span>
            </div>
          </div>
        )}
      </form>

      {/* ─── About ─── */}
      <section style={section}>
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 16, alignItems: "start", marginBottom: 22 }}>
          <img src={GESS.photo} alt="Gess Puglielli" style={{ width: 96, height: 96, objectFit: "cover", filter: dark ? "grayscale(0.2)" : "grayscale(0.3) contrast(1.05)" }} />
          <div>
            <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: c.muted, marginBottom: 6 }}>About</div>
            <div style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.1 }}>Gess Puglielli</div>
            <div style={{ fontSize: 14, color: c.muted, marginTop: 4 }}>Head of Product Design, MPB</div>
          </div>
        </div>
        <p style={{ fontSize: 15, lineHeight: 1.55, margin: "0 0 12px" }}>{GESS.bioLong[0]}</p>
        <p style={{ fontSize: 15, lineHeight: 1.55, margin: "0 0 12px", color: c.muted }}>{GESS.bioLong[1]}</p>
        <p style={{ fontSize: 15, lineHeight: 1.55, margin: 0, color: c.muted }}>{GESS.bioLong[2]}</p>

        <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1, background: c.rule, border: `1px solid ${c.rule}` }}>
          {[
            ["25+", "Years"],
            ["1→8", "Team scaled"],
            ["90/100", "NetSentiment"],
          ].map(([k, v]) => (
            <div key={v} style={{ background: c.bg, padding: "14px 12px" }}>
              <div style={{ fontSize: 20, fontWeight: 500, letterSpacing: "-0.02em" }}>{k}</div>
              <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: c.muted, marginTop: 4 }}>{v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Talks ─── */}
      <section style={section}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "baseline", marginBottom: 16 }}>
          <h3 style={{ margin: 0, fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em" }}>Talks</h3>
          <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: c.muted }}>02</span>
        </div>
        {GESS.talks.map((t, i) => (
          <div key={t.id} style={{ display: "grid", gridTemplateColumns: "1fr auto", padding: "14px 0", borderTop: `1px solid ${c.rule}`, alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 17, fontWeight: 500 }}>{t.title}</div>
              <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: c.muted, marginTop: 4 }}>{t.venue}</div>
            </div>
            <div style={{ fontFamily: mono, fontSize: 13, color: c.accent }}>{t.year}</div>
          </div>
        ))}
      </section>

      {/* ─── Writing ─── */}
      <section style={section}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "baseline", marginBottom: 16 }}>
          <h3 style={{ margin: 0, fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em" }}>Writing</h3>
          <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: c.muted }}>03</span>
        </div>
        {GESS.articles.map((a) => (
          <div key={a.id} style={{ padding: "14px 0", borderTop: `1px solid ${c.rule}` }}>
            <div style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.35, marginBottom: 4 }}>{a.title}</div>
            <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: c.muted }}>
              {a.outlet} · {a.year}
            </div>
          </div>
        ))}
      </section>

      {/* ─── Links ─── */}
      <section style={section}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "baseline", marginBottom: 16 }}>
          <h3 style={{ margin: 0, fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em" }}>Connect</h3>
          <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: c.muted }}>04</span>
        </div>
        {GESS.links.map((l) => (
          <a
            key={l.id}
            href={l.url}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              padding: "16px 0",
              borderTop: `1px solid ${c.rule}`,
              color: c.fg,
              textDecoration: "none",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontSize: 16, fontWeight: 500 }}>{l.label}</div>
              <div style={{ fontFamily: mono, fontSize: 11, color: c.muted, marginTop: 2 }}>{l.handle}</div>
            </div>
            <div style={{ fontFamily: mono, fontSize: 14, color: c.accent }}>→</div>
          </a>
        ))}
      </section>

      <div style={{ padding: "18px 24px 26px", display: "grid", gridTemplateColumns: "1fr auto", borderTop: `1px solid ${c.rule}`, fontFamily: mono, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: c.muted }}>
        <div>Gess Puglielli</div>
        <div>2026</div>
      </div>
    </div>
  );
}

Object.assign(window, { SwissPage });
