const repo = "https://github.com/hyperchat99999/vision-reel-playbook";

const films = [
  {
    number: "01",
    format: "9:16 · 18 seconds",
    title: "Cinematic scroll story",
    description:
      "A beat-synced 2.5D journey that turns a long interface into one continuous, connected argument.",
    command: "--type scroll-story",
    video: "/media/scroll-story-demo.mp4",
    poster: "/media/scroll-story-demo-still.png",
    portrait: true,
    tone: "violet",
  },
  {
    number: "02",
    format: "16:9 · 12 seconds",
    title: "Editorial launch film",
    description:
      "A fast hook, decisive kinetic type, and product proof that lands before attention has time to drift.",
    command: "--type launch-film",
    video: "/media/launch-film-demo.mp4",
    poster: "/media/launch-film-demo-still.png",
    portrait: false,
    tone: "coral",
  },
  {
    number: "03",
    format: "9:16 · 15 seconds",
    title: "VOX collage explainer",
    description:
      "Paper actors make an abstract creator problem concrete, then assemble the solution one visible proof at a time.",
    command: "--type vox-collage",
    video: "/media/vox-collage-demo.mp4",
    poster: "/media/vox-collage-demo-still.png",
    portrait: true,
    tone: "acid",
  },
  {
    number: "04",
    format: "Optional studio pass",
    title: "VOX collage studio cut",
    description:
      "The same deterministic story contract, enriched with generated collage plates, connected motion, upbeat voice, and a fast score.",
    command: "source-provenanced",
    video: "/media/vox-collage-higgsfield-demo.mp4",
    poster: "/media/vox-collage-higgsfield-demo-still.png",
    portrait: true,
    tone: "teal",
  },
];

export default function Home() {
  return (
    <main>
      <nav className="nav" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Vision Reel home">
          <span className="brandMark" aria-hidden="true"><i /><i /><i /></span>
          <span>VISION REEL</span>
        </a>
        <div className="navLinks">
          <a href="#films">Films</a>
          <a href="#workflow">Workflow</a>
          <a href={`${repo}/blob/main/docs/README.md`}>Docs</a>
        </div>
        <a className="navCta" href={`${repo}/blob/main/prompts/idea-to-film-consultant.md`}>Find your format <span aria-hidden="true">↗</span></a>
      </nav>

      <section className="hero" id="top">
        <div className="heroGrid" aria-hidden="true" />
        <div className="heroCopy">
          <p className="kicker"><span /> Open-source product-film studio</p>
          <h1>Don&apos;t record<br />the product.<br /><em>Direct it.</em></h1>
          <p className="heroLede">
            Turn a real interface into a polished, deterministic film where every claim is proved on screen.
          </p>
          <div className="heroActions">
            <a className="button buttonPrimary" href={`${repo}/blob/main/prompts/idea-to-film-consultant.md`}>Find your format <span>↗</span></a>
            <a className="button buttonGhost" href="#films"><span className="play">▶</span> Watch the formats</a>
          </div>
          <div className="install" aria-label="Install command">
            <span>$</span><code>npx create-vision-reel@latest my-film</code>
            <b>LOCAL · REPEATABLE · OPEN</b>
          </div>
        </div>

        <div className="heroStage">
          <div className="stageIndex"><span>FORMAT / 02</span><b>EDITORIAL LAUNCH</b></div>
          <div className="stageFrame">
            <video autoPlay muted loop playsInline preload="metadata" poster="/media/launch-film-demo-still.png">
              <source src="/media/launch-film-demo.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="stageNote"><span>PROOF</span><strong>Real UI.<br />Directed motion.</strong></div>
        </div>
      </section>

      <section className="proofStrip" aria-label="Project facts">
        <div><strong>03</strong><span>signature<br />formats</span></div>
        <div><strong>$0</strong><span>default<br />generation cost</span></div>
        <div><strong>1:1</strong><span>frame-perfect<br />reproducibility</span></div>
        <p>Built for creators who need the product to explain itself—clearly, quickly, and without a black-box render.</p>
      </section>

      <section className="principles" aria-labelledby="principles-title">
        <div className="sectionIntro">
          <p className="kicker dark"><span /> The directing system</p>
          <h2 id="principles-title">A film pipeline,<br />not a screen recorder.</h2>
        </div>
        <div className="principleList">
          <article><span>01</span><div><h3>Voice sets the clock.</h3><p>Start with the argument. Each spoken beat gets one visual actor and one job.</p></div></article>
          <article><span>02</span><div><h3>The interface proves it.</h3><p>Real product states become deterministic evidence—not decorative B-roll.</p></div></article>
          <article><span>03</span><div><h3>Every frame is inspectable.</h3><p>Browser capture, FFmpeg assembly, contact sheets, and automated blank-frame checks.</p></div></article>
        </div>
      </section>

      <section className="films" id="films" aria-labelledby="films-title">
        <div className="filmsHead">
          <div><p className="kicker light"><span /> Signature presets</p><h2 id="films-title">Choose a way<br />to make it move.</h2></div>
          <p>Three code-native formats selected by communication job, plus one optional generated-media production pass.</p>
        </div>
        <div className="filmGrid">
          {films.map((film) => (
            <article className={`filmCard ${film.portrait ? "portrait" : "landscape"} ${film.tone}`} key={film.number}>
              <div className="filmMedia">
                <video controls playsInline preload="metadata" poster={film.poster}>
                  <source src={film.video} type="video/mp4" />
                  <a href={film.video}>Download {film.title}</a>
                </video>
                <span className="filmNumber">{film.number}</span>
              </div>
              <div className="filmCopy">
                <span className="filmMeta">{film.format}</span>
                <h3>{film.title}</h3>
                <p>{film.description}</p>
                <div><code>{film.command}</code><a href={film.video} download aria-label={`Download ${film.title}`}>Download ↓</a></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="workflow" id="workflow" aria-labelledby="workflow-title">
        <div className="workflowCopy">
          <p className="kicker dark"><span /> The no-cost route</p>
          <h2 id="workflow-title">Your browser is the studio.</h2>
          <p>First diagnose the communication problem; then React draws the chosen format, a deterministic timeline directs the action, the local browser captures the frames, and FFmpeg finishes the master—with original procedural music included.</p>
          <a className="textLink consultantLink" href={`${repo}/blob/main/prompts/idea-to-film-consultant.md`}>Run the three-format discovery consultant <span>↗</span></a>
          <a className="textLink" href={`${repo}/blob/main/docs/19-no-cost-video-generation.md`}>Read the complete workflow <span>↗</span></a>
        </div>
        <ol className="workflowSteps">
          <li><span>01</span><div><strong>Diagnose the job</strong><small>Choose scroll for continuity, launch for announcement, or collage for explanation.</small></div></li>
          <li><span>02</span><div><strong>Replace the story</strong><small>Edit copy, UI states, evidence, palette, and timing.</small></div></li>
          <li><span>03</span><div><strong>Direct in the browser</strong><small>Scrub every beat before spending time on a render.</small></div></li>
          <li><span>04</span><div><strong>Render locally</strong><small>Capture exact frames and synthesize the original score.</small></div></li>
          <li><span>05</span><div><strong>Ship with proof</strong><small>Run QC, inspect contact sheets, and export the MP4.</small></div></li>
        </ol>
      </section>

      <section className="classic" aria-labelledby="classic-title">
        <div className="classicMedia">
          <video controls muted playsInline preload="metadata" poster="/media/sample-still.png">
            <source src="/media/sample-clean.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="classicCopy">
          <p className="kicker light"><span /> Classic proof loop</p>
          <h2 id="classic-title">Start small.<br />Prove one thing.</h2>
          <p>The included fictional product runs through the full pipeline: interface state, deterministic motion, browser capture, final encode, and safety checks.</p>
          <a className="button buttonPrimary" href={`${repo}/blob/main/MAKE_YOUR_FIRST_FILM.md`}>Build this in 10 minutes <span>↗</span></a>
        </div>
      </section>

      <section className="closing">
        <p className="kicker dark"><span /> Make the evidence memorable</p>
        <h2>Your product already has a story.<br /><em>Give it direction.</em></h2>
        <div className="closingActions">
          <a className="button buttonDark" href={repo}>Explore the repository <span>↗</span></a>
          <a className="textLink" href="https://www.npmjs.com/package/create-vision-reel">View the npm package <span>↗</span></a>
        </div>
      </section>

      <footer>
        <a className="brand footerBrand" href="#top"><span className="brandMark"><i /><i /><i /></span><span>VISION REEL</span></a>
        <p>Open source. Public-safe. Built to be remixed.</p>
        <div><a href={repo}>GitHub ↗</a><a href={`${repo}/blob/main/CONTRIBUTING.md`}>Contribute ↗</a></div>
      </footer>
    </main>
  );
}
