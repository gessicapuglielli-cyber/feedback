// App entry — mounted after all variant components have been loaded.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "publicRatings": false
}/*EDITMODE-END*/;

function seedFeedback() {
  const samples = [
    { talkId: "uxdx-2026", rating: 5, resonated: "The bit about coaching teams to be AI-ready landed.", improve: "Could go deeper on the GPT examples.", name: "Sam", email: "", followUp: false, id: "s1", ts: Date.now() - 86400000 },
    { talkId: "uxdx-2026", rating: 4, resonated: "Loved the NetSentiment story.", improve: "More on org politics.", name: "", email: "", followUp: false, id: "s2", ts: Date.now() - 7200000 },
    { talkId: "uxdx-2026", rating: 5, resonated: "Practical, not theoretical.", improve: "", name: "Alex", email: "alex@x.com", followUp: true, id: "s3", ts: Date.now() - 600000 },
    { talkId: "evolve-2026", rating: 4, resonated: "Scaling 1→8 honest take.", improve: "Tighten the middle.", name: "", email: "", followUp: false, id: "s4", ts: Date.now() - 3600000 },
  ];
  writeFeedback(samples);
}
function clearAllFeedback() { writeFeedback([]); }

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [tick, forceTick] = React.useReducer((x) => x + 1, 0);

  React.useEffect(() => {
    const h = () => forceTick();
    window.addEventListener("gess-fb-change", h);
    return () => window.removeEventListener("gess-fb-change", h);
  }, []);

  return (
    <>
      <DesignCanvas>
        <DCSection
          id="variants"
          title="Gess Puglielli — Personal hub"
          subtitle="Three directions on the same content + structure. Drag to reorder · double-click to focus · QR-friendly mobile widths."
        >
          <DCArtboard id="editorial" label="A · Editorial / Magazine" width={430} height={1900}>
            <EditorialPage theme={t.theme} publicRatings={!!t.publicRatings} key={`ed-${t.theme}-${tick}`} />
          </DCArtboard>
          <DCArtboard id="swiss" label="B · Minimal Swiss" width={430} height={1900}>
            <SwissPage theme={t.theme} publicRatings={!!t.publicRatings} key={`sw-${t.theme}-${tick}`} />
          </DCArtboard>
          <DCArtboard id="expressive" label="C · Bold Expressive" width={430} height={1900}>
            <ExpressivePage theme={t.theme} publicRatings={!!t.publicRatings} key={`ex-${t.theme}-${tick}`} />
          </DCArtboard>
        </DCSection>
      </DesignCanvas>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Appearance" />
        <TweakRadio
          label="Theme"
          value={t.theme}
          options={[{ value: "light", label: "Light" }, { value: "dark", label: "Dark" }]}
          onChange={(v) => setTweak("theme", v)}
        />

        <TweakSection label="Talk feedback" />
        <TweakToggle
          label="Show audience score"
          value={!!t.publicRatings}
          onChange={(v) => setTweak("publicRatings", v)}
        />
        <TweakButton
          label="Seed sample feedback"
          onClick={() => { seedFeedback(); window.dispatchEvent(new Event("gess-fb-change")); }}
        />
        <TweakButton
          label="Clear all feedback"
          secondary
          onClick={() => { clearAllFeedback(); window.dispatchEvent(new Event("gess-fb-change")); }}
        />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
