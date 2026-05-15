// V1 — Editorial / magazine. Serif display, classical proportions, drop caps, ruled
// dividers. Cream paper, deep green ink.

function EditorialPage({ theme, publicRatings, scale = 1 }) {
  const dark = theme === "dark";
  const c = dark
    ? { bg: "#14201a", paper: "#1b2a23", fg: "#f0ebe3", muted: "#aab3ab", accent: "#cfe0d2", rule: "rgba(240,235,227,0.14)" }
    : { bg: "#f4efe6", paper: "#f6f4ef", fg: "#1a2a22", muted: "#5b6660", accent: "#2a4d3a", rule: "rgba(26,42,34,0.16)" };

  const display = '"DM Serif Display", "Playfair Display", Georgia, serif';
  const body = '"Newsreader", "Source Serif Pro", Georgia, serif';
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

  const onSubmit = (e) => {
    e.preventDefault();
    if (!rating && !resonated && !improve) return;
    submit({ rating, resonated, improve, name, email, followUp });
    setSubmitted(true);
  };

  const currentTalk = GESS.talks.find((t) => t.id === talkId);

  const inputStyle = {
    width: "100%",
    background: "transparent",
    border: 0,
    borderBottom: `1px solid ${c.rule}`,
    padding: "10px 0 12px",
    color: c.fg,
    fontFamily: body,
    fontSize: 16,
    lineHeight: 1.45,
    outline: "none",
    resize: "none",
    fontStyle: "italic",
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
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Newsreader:ital,wght@0,400;0,500;0,600;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap');
        .ed-input::placeholder { color: ${c.muted}; opacity: 0.7; font-style: italic; }
        .ed-link { color: inherit; text-decoration: none; border-bottom: 1px solid ${c.rule}; transition: border-color .2s ease; }
        .ed-link:hover { border-bottom-color: ${c.accent}; }
        .ed-drop::first-letter {
          font-family: ${display};
          font-size: 4.2em; float: left; line-height: 0.85;
          padding: 6px 10px 0 0; color: ${c.accent};
        }
      `}</style>

      {/* ─── Masthead ─── */}
      <div style={{ padding: "20px 28px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: c.muted }}>
          Gess Puglielli
        </div>
        <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: c.muted }}>
          Vol. XXV · 2026
        </div>
      </div>
      <div style={{ borderTop: `1px solid ${c.rule}`, margin: "12px 28px 0" }} />
      <div style={{ borderTop: `1px solid ${c.rule}`, margin: "3px 28px 0" }} />

      {/* ─── Feedback Hero ─── */}
      <section style={{ padding: "32px 28px 28px" }}>
        <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: c.accent, marginBottom: 18 }}>
          ¶ A note from the audience
        </div>
        <h1
          style={{
            fontFamily: display,
            fontSize: 52,
            lineHeight: 0.98,
            margin: "0 0 14px",
            letterSpacing: "-0.01em",
            fontWeight: 400,
          }}
        >
          You just<br />
          <em style={{ color: c.accent }}>heard me</em><br />
          speak.
        </h1>
        <p style={{ fontFamily: body, fontSize: 16, lineHeight: 1.55, color: c.muted, margin: "0 0 4px" }}>
          Tell me what landed and what didn't. Honest, brief — anonymous unless you want otherwise.
        </p>
      </section>

      {/* ─── Talk picker ─── */}
      <div style={{ padding: "0 28px 18px" }}>
        <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: c.muted, marginBottom: 10 }}>
          Which talk?
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {GESS.talks.map((t) => {
            const active = t.id === talkId;
            return (
              <button
                key={t.id}
                onClick={() => setTalkId(t.id)}
                style={{
                  background: active ? c.accent : "transparent",
                  color: active ? c.paper : c.fg,
                  border: `1px solid ${active ? c.accent : c.rule}`,
                  fontFamily: body,
                  fontStyle: "italic",
                  fontSize: 14,
                  padding: "8px 14px",
                  borderRadius: 999,
                  cursor: "pointer",
                  transition: "all 160ms ease",
                }}
              >
                {t.title} <span style={{ opacity: 0.65, fontStyle: "normal", fontFamily: mono, fontSize: 11, marginLeft: 4 }}>{t.year}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── Feedback form ─── */}
      <form
        onSubmit={onSubmit}
        style={{
          margin: "0 28px",
          padding: "26px 22px 24px",
          background: c.paper,
          border: `1px solid ${c.rule}`,
          borderRadius: 2,
        }}
      >
        {submitted ? (
          <ThanksNote accent={c.accent} fg={c.fg} muted={c.muted} mono={mono} />
        ) : (
          <>
            <div style={{ marginBottom: 22 }}>
              <label style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: c.muted, display: "block", marginBottom: 10 }}>
                Overall
              </label>
              <StarRating value={rating} onChange={setRating} size={30} color={c.accent} trackColor={c.rule} />
            </div>

            <div style={{ marginBottom: 18 }}>
              <label style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: c.muted, display: "block", marginBottom: 4 }}>
                What resonated
              </label>
              <textarea
                className="ed-input"
                value={resonated}
                onChange={(e) => setResonated(e.target.value)}
                rows={2}
                placeholder="One idea, one sentence."
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: 22 }}>
              <label style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: c.muted, display: "block", marginBottom: 4 }}>
                What I could improve
              </label>
              <textarea
                className="ed-input"
                value={improve}
                onChange={(e) => setImprove(e.target.value)}
                rows={2}
                placeholder="Be candid."
                style={inputStyle}
              />
            </div>

            <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
              <input
                className="ed-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name (optional)"
                style={{ ...inputStyle, flex: 1 }}
              />
            </div>
            <div style={{ marginBottom: 18 }}>
              <input
                className="ed-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email (optional)"
                style={inputStyle}
              />
            </div>

            <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13, lineHeight: 1.45, color: c.muted, marginBottom: 22, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={followUp}
                onChange={(e) => setFollowUp(e.target.checked)}
                style={{ marginTop: 4, accentColor: c.accent }}
              />
              <span style={{ fontStyle: "italic" }}>You may follow up with me about this feedback.</span>
            </label>

            <button
              type="submit"
              style={{
                width: "100%",
                background: c.accent,
                color: c.paper,
                border: 0,
                padding: "16px 20px",
                fontFamily: display,
                fontSize: 18,
                letterSpacing: "0.01em",
                cursor: "pointer",
                borderRadius: 2,
              }}
            >
              Send to {currentTalk?.title || "talk"}
            </button>
          </>
        )}
      </form>

      {publicRatings && stats.avg != null && (
        <div style={{ padding: "16px 28px 0", display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: c.muted }}>
            Audience score · {currentTalk?.title}
          </div>
          <div style={{ fontFamily: display, fontSize: 22, color: c.accent }}>
            {stats.avg.toFixed(1)} <span style={{ fontSize: 12, color: c.muted, fontFamily: mono }}>/ 5 · {stats.count}</span>
          </div>
        </div>
      )}

      {/* ─── Rule ─── */}
      <div style={{ borderTop: `1px solid ${c.rule}`, margin: "44px 28px 0" }} />
      <div style={{ borderTop: `1px solid ${c.rule}`, margin: "3px 28px 0" }} />

      {/* ─── Profile / About ─── */}
      <section style={{ padding: "36px 28px 32px" }}>
        <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: c.muted, marginBottom: 18 }}>
          The Profile · No. 01
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 22 }}>
          <img
            src={GESS.photo}
            alt="Gess Puglielli"
            style={{ width: 110, height: 140, objectFit: "cover", borderRadius: 2, filter: dark ? "none" : "grayscale(0.1) contrast(1.02)" }}
          />
          <div style={{ flex: 1 }}>
            <h2 style={{ fontFamily: display, fontSize: 30, lineHeight: 0.95, margin: "0 0 8px", fontWeight: 400 }}>
              Gess<br />Puglielli
            </h2>
            <div style={{ fontFamily: body, fontStyle: "italic", fontSize: 14, color: c.muted, lineHeight: 1.4 }}>
              Head of Product Design,<br />MPB
            </div>
          </div>
        </div>
        <p className="ed-drop" style={{ fontFamily: body, fontSize: 16, lineHeight: 1.6, margin: "0 0 14px", color: c.fg }}>
          {GESS.bioLong[0]}
        </p>
        <p style={{ fontFamily: body, fontSize: 16, lineHeight: 1.6, margin: "0 0 14px", color: c.fg }}>
          {GESS.bioLong[1]}
        </p>
        <p style={{ fontFamily: body, fontSize: 16, lineHeight: 1.6, margin: 0, color: c.fg }}>
          {GESS.bioLong[2]}
        </p>
      </section>

      <div style={{ borderTop: `1px solid ${c.rule}`, margin: "0 28px" }} />

      {/* ─── Talks ─── */}
      <section style={{ padding: "32px 28px 28px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 18 }}>
          <h3 style={{ fontFamily: display, fontSize: 28, margin: 0, fontWeight: 400 }}>Talks</h3>
          <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: c.muted }}>
            Upcoming · 2026
          </span>
        </div>
        {GESS.talks.map((t, i) => (
          <div key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "16px 0", borderTop: i ? `1px solid ${c.rule}` : "none" }}>
            <div>
              <div style={{ fontFamily: display, fontSize: 22, lineHeight: 1.1, fontWeight: 400 }}>{t.title}</div>
              <div style={{ fontFamily: body, fontStyle: "italic", fontSize: 13, color: c.muted, marginTop: 2 }}>{t.venue}</div>
            </div>
            <div style={{ fontFamily: mono, fontSize: 13, color: c.accent }}>{t.year}</div>
          </div>
        ))}
      </section>

      <div style={{ borderTop: `1px solid ${c.rule}`, margin: "0 28px" }} />

      {/* ─── Articles ─── */}
      <section style={{ padding: "32px 28px 28px" }}>
        <h3 style={{ fontFamily: display, fontSize: 28, margin: "0 0 18px", fontWeight: 400 }}>Writing</h3>
        {GESS.articles.map((a, i) => (
          <div key={a.id} style={{ padding: "14px 0", borderTop: i ? `1px solid ${c.rule}` : "none" }}>
            <div style={{ fontFamily: display, fontSize: 18, lineHeight: 1.2, fontWeight: 400, marginBottom: 4 }}>{a.title}</div>
            <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: c.muted }}>
              {a.outlet} · {a.year}
            </div>
          </div>
        ))}
      </section>

      <div style={{ borderTop: `1px solid ${c.rule}`, margin: "0 28px" }} />

      {/* ─── Connect ─── */}
      <section style={{ padding: "32px 28px 40px" }}>
        <h3 style={{ fontFamily: display, fontSize: 28, margin: "0 0 6px", fontWeight: 400 }}>
          Find me <em style={{ color: c.accent }}>elsewhere</em>
        </h3>
        <div style={{ fontFamily: body, fontStyle: "italic", fontSize: 14, color: c.muted, marginBottom: 18 }}>
          Three places, three different sides.
        </div>
        {GESS.links.map((l, i) => (
          <a
            key={l.id}
            href={l.url}
            target="_blank"
            rel="noreferrer"
            style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "16px 0", borderTop: `1px solid ${c.rule}`, color: c.fg, textDecoration: "none" }}
          >
            <div style={{ fontFamily: display, fontSize: 20, fontWeight: 400 }}>{l.label}</div>
            <div style={{ fontFamily: mono, fontSize: 12, color: c.muted }}>{l.handle} →</div>
          </a>
        ))}
      </section>

      <div style={{ borderTop: `1px solid ${c.rule}`, margin: "0 28px" }} />
      <div style={{ borderTop: `1px solid ${c.rule}`, margin: "3px 28px 0" }} />
      <div style={{ padding: "18px 28px 28px", display: "flex", justifyContent: "space-between" }}>
        <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: c.muted }}>
          © Gess Puglielli
        </div>
        <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: c.muted }}>
          End of issue
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { EditorialPage });
