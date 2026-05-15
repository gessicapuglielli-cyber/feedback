// Shared data + feedback hook + star rating used across all three variants.
// Each variant skins its own form; this file is purely behavior + content.

const GESS = {
  name: "Gess Puglielli",
  role: "Head of Product Design",
  org: "MPB",
  bioShort:
    "Product design leader with 25+ years across editorial, advertising, UX and enterprise. I turn complexity into clarity — building teams, systems, and experiences people trust.",
  bioLong: [
    "I head MPB's international design team — rebuilt the platform for global relaunch, scaled the team from 1 to 8 across all disciplines, and embedded design systems, ops and discovery from scratch.",
    "The work delivers: a consistent 90/100 UX NetSentiment score, innovation sessions shaping MPB's future, and projects like personalised buying recommendations that drove GMV.",
    "I balance craft with leadership and strategy — co-creating product vision, coaching the team to be AI-ready, and building custom GPTs to lift productivity.",
  ],
  talks: [
    { id: "uxdx-2026", title: "UXDX London", year: "2026", venue: "London", status: "upcoming" },
    { id: "evolve-2026", title: "Evolve", year: "2026", venue: "Conference", status: "upcoming" },
  ],
  articles: [
    { id: "a1", title: "Scaling a design team from 1 to 8 without losing the plot", outlet: "Medium", year: "2025" },
    { id: "a2", title: "What 90/100 NetSentiment actually means in practice", outlet: "MPB Engineering", year: "2025" },
    { id: "a3", title: "Custom GPTs as a design-team superpower", outlet: "Talk recap", year: "2024" },
  ],
  links: [
    { id: "linkedin", label: "LinkedIn", handle: "@gessicapuglielli", url: "https://www.linkedin.com/in/gessicapuglielli/" },
    { id: "design", label: "Design site", handle: "gess.design", url: "https://gess.design/" },
    { id: "photos", label: "Photography", handle: "gess.photos", url: "https://gess.photos/" },
  ],
  photo: "assets/gess.png" + (typeof location !== "undefined" ? location.search : ""),
};

// ─── Feedback storage ────────────────────────────────────────────────
const FB_KEY = "gess.feedback.v1";

function readFeedback() {
  try {
    const raw = localStorage.getItem(FB_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function writeFeedback(list) {
  try {
    localStorage.setItem(FB_KEY, JSON.stringify(list));
  } catch {}
}

function useFeedback(talkId) {
  const [all, setAll] = React.useState(() => readFeedback());
  const submit = React.useCallback(
    (entry) => {
      const item = { ...entry, talkId, ts: Date.now(), id: Math.random().toString(36).slice(2, 9) };
      const next = [item, ...all];
      setAll(next);
      writeFeedback(next);
      return item;
    },
    [all, talkId]
  );
  const forTalk = all.filter((f) => f.talkId === talkId);
  const stats = (() => {
    if (!forTalk.length) return { avg: null, count: 0 };
    const rated = forTalk.filter((f) => f.rating > 0);
    if (!rated.length) return { avg: null, count: forTalk.length };
    const avg = rated.reduce((s, f) => s + f.rating, 0) / rated.length;
    return { avg, count: forTalk.length };
  })();
  return { all, forTalk, submit, stats };
}

// ─── Star rating ─────────────────────────────────────────────────────
function StarRating({ value, onChange, size = 28, color = "currentColor", trackColor }) {
  const [hover, setHover] = React.useState(0);
  const display = hover || value || 0;
  return (
    <div role="radiogroup" aria-label="Rating" style={{ display: "inline-flex", gap: size * 0.18 }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          aria-checked={value === n}
          role="radio"
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(n)}
          style={{
            background: "transparent",
            border: 0,
            padding: 0,
            cursor: "pointer",
            color: n <= display ? color : trackColor || "rgba(0,0,0,0.18)",
            transition: "transform 120ms ease, color 160ms ease",
            transform: hover === n ? "scale(1.12)" : "scale(1)",
            lineHeight: 0,
          }}
        >
          <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 2.5l2.9 6.4 6.9.7-5.1 4.7 1.5 6.8L12 17.7 5.8 21.1l1.5-6.8L2.2 9.6l6.9-.7L12 2.5z" />
          </svg>
        </button>
      ))}
    </div>
  );
}

// ─── Submitted state component used by all variants ──────────────────
function ThanksNote({ accent, fg, muted, mono }) {
  return (
    <div style={{ color: fg }}>
      <div
        style={{
          fontFamily: mono,
          fontSize: 11,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: accent,
          marginBottom: 10,
        }}
      >
        ✓ Received
      </div>
      <div style={{ fontSize: 18, lineHeight: 1.35, marginBottom: 6 }}>
        Thank you — that's genuinely useful.
      </div>
      <div style={{ fontSize: 14, color: muted, lineHeight: 1.5 }}>
        If you ticked follow-up, I'll be in touch within a week.
      </div>
    </div>
  );
}

Object.assign(window, { GESS, useFeedback, StarRating, ThanksNote, readFeedback, writeFeedback });
