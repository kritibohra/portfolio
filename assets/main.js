/* Kriti Bohra — portfolio interactions. Vanilla JS, no dependencies. */
const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
const FINE = matchMedia("(pointer: fine)").matches;
const $ = (s, r = document) => r.querySelector(s);

/* Shortcut labels match the visitor's computer: ⌘ on Mac, Ctrl+ elsewhere. The keys themselves accept both. */
const IS_MAC = /Mac|iPhone|iPad/i.test((navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || navigator.userAgent);
const MOD = IS_MAC ? "⌘" : "Ctrl+";
if (!IS_MAC) {
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n; (n = w.nextNode());) if (n.nodeValue.includes("⌘")) n.nodeValue = n.nodeValue.replace(/⌘/g, "Ctrl+");
  document.querySelectorAll("[title*='⌘'], [aria-label*='⌘']").forEach(el => ["title", "aria-label"].forEach(at => el.hasAttribute(at) && el.setAttribute(at, el.getAttribute(at).replace(/⌘/g, "Ctrl+"))));
}

/* Every load starts at the top: no restored scroll, no jump to an old #section. */
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
if (location.hash && !["#stellar", "#adroom", "#visibility"].includes(location.hash)) history.replaceState(null, "", location.pathname + location.search);
scrollTo(0, 0);
addEventListener("load", () => scrollTo(0, 0));
addEventListener("pageshow", e => e.persisted && scrollTo(0, 0));
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ------------------------------------------------------------------
   LAB ITEMS — add new agents or code projects here.
   type: "agent" | "code"   status: "In use" | "Live" | "Coming soon"…
   The tab bar appears once both types exist.
------------------------------------------------------------------- */
// Lab cards now live in index.html (#lab). Edit status, Goal/Result and copy there.

/* ------------------------------------------------------------------
   ASK KRITI — pre-written answers. Edit freely.
------------------------------------------------------------------- */
const ASK = [
  { q: "What do you do?", a: "I'm a Senior Product Designer. I design complex products people rely on to make decisions: analytics, automation, billing, creative tools and AI agents. Most recently I spent four years at Pixis, a marketing-technology company." },
  { q: "Show me your best work", a: "Three case studies: Stellar, a conversational AI analyst; Adroom, a generative ad studio; and Visibility, which shows brands where they stand in AI search. Start with Stellar for research depth, or Visibility for the fastest growth ($3M ARR in 60 days, as reported by Pixis).",
    acts: [{ label: "Stellar", open: "stellar" }, { label: "Adroom", open: "adroom" }, { label: "Visibility", open: "visibility" }] },
  { q: "What's your experience?", a: "5+ years. I was at Pixis from July 2022 to October 2026, promoted twice: Product Designer, then Product Designer 2 (Apr 2024), then Senior Product Designer (Apr 2025). Before that, UI/UX Designer at Shardings.",
    acts: [{ label: "See experience", go: "#experience" }, { label: "Resume", href: "assets/docs/Kriti_Bohra_Resume.pdf" }] },
  { q: "What kinds of products have you designed?", a: "Decision-ready analytics dashboards, no-code rules and workflow automation, performance alerts, asset management, billing, role-based access for multi-brand teams, a generative ad studio and AI-search visibility. Before Pixis, client websites and web apps at Shardings.",
    acts: [{ label: "See my work", go: "#work" }, { label: "See experience", go: "#experience" }] },
  { q: "What AI work have you done?", a: "Most of my recent work has been on AI products. I designed Stellar, an AI analyst that shows its reasoning, tools and sources so marketers can check an answer before acting on it; Adroom, a generative ad studio built around brand rules and bulk creation; and Visibility, which shows brands how they appear in AI answers. The hard part is rarely the model. It is trust: explaining what the system did, designing the wait and the errors, and keeping people in control. I also build my own agents for design teams: Scout for research, Relay for handoff and Lens for design QA.",
    acts: [{ label: "Stellar case study", open: "stellar" }, { label: "Visit the Lab", go: "#lab" }] },
  { q: "Are you open to new roles?", a: "Yes. I'm exploring senior product design roles and always happy to hear about the problems a team is working on. Email is the best way to reach me.",
    acts: [{ label: "Email me", href: "mailto:Kritibohra23@gmail.com" }, { label: "Resume", href: "assets/docs/Kriti_Bohra_Resume.pdf" }] }
];

/* ================= HERO: A FIGMA FILE =================
   Layers select things on the canvas; the right panel shows the
   "properties" of whatever is selected. Edit LAYERS / PROPS freely.  */
const SPECTRUM = "linear-gradient(135deg,#8B7CFF,#4EA8FF,#3DD6A3,#FFD166,#FF5B2E)";
const LAYERS = [
  { id: "frame", name: "Kriti Bohra", kind: "frame", lvl: 0, size: "Senior Product Designer · 5 yrs" },
  { id: "photo", name: "kriti.jpg", kind: "image", lvl: 1, size: "Ultra HD · uncropped" },
  { id: "stickies", name: "Highlights", kind: "group", lvl: 0, size: "6 stickies · drag me" },
  { id: "s0", name: "5+ years designing products", kind: "sticky", lvl: 1, size: "Experience" },
  { id: "s1", name: "Stellar · 30× faster", kind: "sticky", lvl: 1, size: "Case study" },
  { id: "s2", name: "2 promotions", kind: "sticky", lvl: 1, size: "Growth" },
  { id: "s3", name: "Visibility · $3M ARR", kind: "sticky", lvl: 1, size: "Impact" },
  { id: "s4", name: "Tools I code", kind: "sticky", lvl: 1, size: "Lab" },
  { id: "s5", name: "Design system · 30%", kind: "sticky", lvl: 1, size: "Systems" },
  { id: "headline", name: "I turn noise into clarity…", kind: "text", lvl: 0, size: "Text · real decisions" },
  { id: "career", name: "Career", kind: "section", lvl: 0, size: "5 yrs · 4 roles · 2 promotions" },
  { id: "r4", name: "Senior Product Designer", kind: "role", lvl: 1, size: "2025 → Oct 2026 · Pixis" },
  { id: "r3", name: "Product Designer 2", kind: "role", lvl: 1, size: "2024 · Pixis · promoted" },
  { id: "r2", name: "Product Designer", kind: "role", lvl: 1, size: "2022 · Pixis" },
  { id: "r1", name: "UI/UX Designer", kind: "role", lvl: 1, size: "2021 · Shardings" }
];
const PROPS = {
  frame: [
    { h: "Frame", g: [["X", "Bengaluru"], ["Y", "IST +5:30"], ["W", "5+ yrs"], ["H", "4 roles"]] },
    { h: "Auto layout", g: [["→", "Research → Design → Ship", 1], ["Gap", "0 handoff friction", 1]] },
    { h: "Fill", sw: [[SPECTRUM, "Curiosity", "100%"]] },
    { h: "Stroke", sw: [["#3DD6A3", "Empathy", "Inside"]] },
    { h: "Effects", sw: [["#8B7CFF", "Drop shadow · calm under ambiguity", ""]] },
    { h: "Export", btn: [["Resume.pdf ↓", "assets/docs/Kriti_Bohra_Resume.pdf"]] }
  ],
  photo: [
    { h: "Image", g: [["Fit", "Fill"], ["Crop", "None"], ["Res", "Ultra HD", 1]] },
    { h: "Fill", sw: [["#FF5B2E", "Real smile", "100%"]] },
    { h: "About", t: "Senior Product Designer, most recently at Pixis. I design complex products people rely on, from analytics and automation to AI agents." }
  ],
  stickies: [{ h: "Highlights", t: "Six things worth knowing. Drag them anywhere, or add your own with the sticky tool (S)." }],
  s0: [{ h: "Experience", g: [["Years", "5+"], ["Since", "2021"]] }, { h: "Where", chips: ["Shardings", "Pixis"] }, { btn: [["See the journey", "#experience"]] }],
  s1: [{ h: "Stellar", t: "A conversational AI analyst for marketers that shows its reasoning, tools and sources, so answers can be trusted." },
       { h: "Impact", g: [["⚡", "30× faster insight-to-decision*", 1], ["◷", "70% less audit time*", 1]] }, { btn: [["Open case study", "#open:stellar"]] }],
  s2: [{ h: "Growth", t: "Product Designer (2022) → Product Designer 2 (Apr 2024) → Senior Product Designer (Apr 2025)." }, { h: "Promotions", sw: [["#3DD6A3", "↑ Apr 2024", ""], ["#3DD6A3", "↑ Apr 2025", ""]] }],
  s3: [{ h: "Visibility", t: "Shows how brands appear inside AI answers, with competitor gaps and what to fix." }, { h: "Impact", g: [["$", "$3M ARR in 60 days*", 1]] }, { btn: [["Open case study", "#open:visibility"]] }],
  s4: [{ h: "Lab", t: "Three agents I built for designers: Scout synthesises research, Relay checks handoff and Lens compares Figma with the built screens." }, { h: "Tools", chips: ["Cursor", "Figma Make", "Lovable", "v0"] }, { btn: [["Visit the Lab", "#lab"]] }],
  s5: [{ h: "Design system", t: "I design on a shared token system so engineering can build fast and the product stays consistent." }, { h: "Impact", g: [["⏱", "30% faster handoff", 1]] }],
  headline: [
    { h: "Text", g: [["Aa", "Instrument Serif + Geist", 1], ["Tone", "Honest"], ["Size", "Clear"]] },
    { h: "Fill", sw: [[SPECTRUM, "Clarity", "100%"]] },
    { h: "Content", t: "I turn noise into clarity. Products people can trust with real decisions." }
  ],
  career: [{ h: "Career", g: [["Years", "5+"], ["Roles", "4"], ["Promos", "2"], ["Now", "Open to work"]] }, { btn: [["See the full journey", "#experience"]] }],
  r4: [{ h: "Senior Product Designer", g: [["@", "Pixis"], ["📅", "Apr 2025 — Oct 2026", 1]] }, { h: "Led", t: "Design across Pixis's analytics, creative and AI products, from discovery to launch, including the Stellar analyst." }, { h: "Products", chips: ["Stellar", "Visibility", "Adroom"] }, { h: "Promotion", sw: [["#3DD6A3", "↑ Promoted · Apr 2025", ""]] }],
  r3: [{ h: "Product Designer 2", g: [["@", "Pixis"], ["📅", "Apr 2024 — Mar 2025", 1]] }, { h: "Shipped", t: "No-code automation, performance alerts, prompt-to-ad creation and role-based access for multi-brand teams." }, { h: "Products", chips: ["Rules & Automation", "Alerts", "AI Co-create", "User & Roles"] }, { h: "Promotion", sw: [["#3DD6A3", "↑ Promoted · Apr 2024", ""]] }],
  r2: [{ h: "Product Designer", g: [["@", "Pixis"], ["📅", "Jul 2022 — Mar 2024", 1]] }, { h: "Shipped", t: "Decision-ready dashboards from dense cross-channel data, plus asset management and billing." }, { h: "Products", chips: ["Analytics & Reporting", "Asset Manager", "Billing"] }],
  r1: [{ h: "UI/UX Designer", g: [["@", "Shardings"], ["📅", "Aug 2021 — Jun 2022", 1]] }, { h: "Where it started", t: "Client websites and web apps, plus my first interviews and usability tests." }]
};
const PROTO = [
  { label: "Explore my work", to: "Navigate to · Work", href: "#work" },
  { label: "✦ Ask me anything", to: "Open overlay · Ask Kriti", href: "#ask" },
  { label: "Stellar case study", to: "Open overlay · Case study", href: "#open:stellar" },
  { label: "Adroom case study", to: "Open overlay · Case study", href: "#open:adroom" },
  { label: "Visibility case study", to: "Open overlay · Case study", href: "#open:visibility" },
  { label: "Resume", to: "Open link · PDF", href: "assets/docs/Kriti_Bohra_Resume.pdf" },
  { label: "Say hello", to: "Navigate to · Contact", href: "#contact" }
];
const CURSORS = [
  { name: "Product manager", c: "#8B7CFF", path: [
    { n: 1, say: "Can users trust this answer?" }, { at: [78, 8] }, { n: 4, say: "A QA agent?! Love it." }, { at: [-12, 40] } ] },
  { name: "Engineer", c: "#3DD6A3", path: [
    { at: [112, 88] }, { n: 5, say: "Tokens make this easy to build ✓" }, { at: [30, 104] }, { n: 2, say: "Twice in two years 👏" } ] },
  { name: "Marketer", c: "#FFD166", path: [
    { at: [-20, 92] }, { n: 3, say: "$3M in 60 days? 👀" }, { at: [104, 30] }, { n: 0, say: "Finally, numbers I can trust." } ] }
];
const ICONS = {
  frame: '<svg viewBox="0 0 16 16"><path d="M5 1.5v13M11 1.5v13M1.5 5h13M1.5 11h13" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>',
  group: '<svg viewBox="0 0 16 16"><rect x="2.5" y="2.5" width="11" height="11" rx="1" fill="none" stroke="currentColor" stroke-dasharray="2 1.6" stroke-width="1.2"/></svg>',
  sticky: '<svg viewBox="0 0 16 16"><path d="M2.5 2.5h11v7l-4 4h-7z M13.5 9.5h-4v4" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>',
  image: '<svg viewBox="0 0 16 16"><rect x="2" y="2.5" width="12" height="11" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M3 12l3.5-4 2.5 3 1.8-2L13 12z"/></svg>',
  text: '<svg viewBox="0 0 16 16"><path d="M3 3h10M8 3v10" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
  comp: '<svg viewBox="0 0 16 16"><path d="M8 1.5l2.6 2.6L8 6.7 5.4 4.1zM8 9.3l2.6 2.6L8 14.5l-2.6-2.6zM4.1 5.4l2.6 2.6-2.6 2.6L1.5 8zM11.9 5.4 14.5 8l-2.6 2.6L9.3 8z"/></svg>',
  section: '<svg viewBox="0 0 16 16"><rect x="1.5" y="3" width="13" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M1.5 6h13" stroke="currentColor" stroke-width="1.2"/></svg>',
  role: '<svg viewBox="0 0 16 16"><path d="M8 2l5.5 6L8 14 2.5 8z" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>'
};
const ARROW = '<svg viewBox="0 0 18 18"><path d="M2 1.5 15.5 8 9 9.6 6.4 16z"/></svg>';
const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

(function figHero() {
  const board = $("#board"), frame = $("#frame"); if (!board || !frame) return;
  const hero = board.closest("section"), img = $("img", frame), notes = $$(".sticky", board), layer = $("#cursors");
  const selbox = $("#selbox"), selsize = $("#selsize"), hoverbox = $("#hoverbox"), props = $("#props"), list = $("#layers");
  const STORE = "kb-canvas-v1";
  // Edits live only for this visit: a reload always brings back the original canvas.
  try { localStorage.removeItem(STORE); } catch {}   // drop anything saved by older versions
  const saved = { moved: {}, items: [], style: {} };
  const persist = () => {};
  let sel = "frame", tab = "design", dev = false, compact = false, armed = null, stampPick = "👍", I;

  /* ---------- layers panel ---------- */
  saved.style = saved.style || {};
  const itemOf = id => saved.items.find(it => it.id === id);
  const isSticky = id => /^s\d$/.test(id) || itemOf(id)?.type === "sticky";
  function drawLayers() {
    const mine = saved.items.filter(it => it.type === "sticky");
    const all = LAYERS.filter(l => !saved.style[l.id]?.deleted).map(l => (/^s\d$/.test(l.id) && saved.style[l.id]?.text ? { ...l, name: saved.style[l.id].text } : l));
    if (mine.length) all.push({ id: "mine", name: "Your stickies", kind: "group", lvl: 0 }, ...mine.map(it => ({ id: it.id, name: it.text || "Untitled sticky", kind: "sticky", lvl: 1 })));
    list.innerHTML = all.map(l => `<li class="k-${l.kind}${l.id === sel ? " sel" : ""}" data-id="${l.id}" style="--lvl:${l.lvl}" tabindex="0" role="button" aria-label="Select ${esc(l.name)}">` +
      `<span class="car">${["frame", "group", "section"].includes(l.kind) ? "▾" : ""}</span>${ICONS[l.kind]}<span class="nm">${esc(l.name)}</span></li>`).join("");
  }
  const rows = () => $$("li", list);

  /* ---------- geometry ---------- */
  const elFor = id => id === "photo" ? img : itemOf(id) ? $(`[data-uid="${id}"]`, board) : id === "frame" || /^r\d|career/.test(id) ? frame : $(`[data-layer="${id}"]`, board);
  function rectOf(id) {
    const b = board.getBoundingClientRect(), els = id === "stickies" ? notes.filter(n => !n.hidden) : id === "mine" ? $$(".u-sticky", board) : [elFor(id)];
    let L = 1e9, T = 1e9, R = -1e9, B = -1e9;
    els.forEach(e => { const r = e.getBoundingClientRect(); L = Math.min(L, r.left); T = Math.min(T, r.top); R = Math.max(R, r.right); B = Math.max(B, r.bottom); });
    return { x: L - b.left, y: T - b.top, w: R - L, h: B - T };
  }
  const place = (box, r, pad = 0) => Object.assign(box.style, { left: r.x - pad + "px", top: r.y - pad + "px", width: r.w + pad * 2 + "px", height: r.h + pad * 2 + "px" });
  const meta = id => LAYERS.find(l => l.id === id) || (id === "mine" ? { id, name: "Your stickies", kind: "group", size: "Only you can see these" }
    : { id, name: itemOf(id)?.text || "Untitled sticky", kind: "sticky", size: "Your sticky · double-click to edit" });
  const padFor = id => (id === "headline" ? 6 : /stickies|mine/.test(id) || isSticky(id) ? 4 : 0);

  /* ---------- selection + properties ---------- */
  function select(id, fromUser) {
    sel = id; const m = meta(id);
    rows().forEach(r => r.classList.toggle("sel", r.dataset.id === id));
    const el = isSticky(id) && elFor(id);
    const shown = (compact && /^s\d|stickies/.test(id)) || (el && el.hidden) ? "frame" : id;
    place(selbox, rectOf(shown), padFor(shown));
    selbox.classList.add("on"); selbox.classList.toggle("comp", m.kind === "comp");
    selsize.textContent = m.size || m.name;
    render(); updateBar();
    if (fromUser) {   // keep the row in view inside the layers list only (scrollIntoView would nudge the whole panel/page)
      const r = rows().find(x => x.dataset.id === sel), box = list.closest(".fl-grow");
      if (r && box) { const t = r.offsetTop - box.offsetTop;
        if (t < box.scrollTop + 30) box.scrollTop = t - 30; else if (t + r.offsetHeight > box.scrollTop + box.clientHeight) box.scrollTop = t + r.offsetHeight - box.clientHeight + 8; }
    }
  }
  function section(s) {
    let h = s.h ? `<h4>${esc(s.h)}</h4>` : "";
    if (s.g) h += `<div class="pg">${s.g.map(([k, v, w]) => `<div class="pf${w ? " w" : ""}"><em>${k}</em>${esc(v)}</div>`).join("")}</div>`;
    if (s.sw) h += s.sw.map(([c, n, p]) => `<div class="pf w" style="--c:${c}"><span class="sw"></span>${esc(n)}<span class="pct">${p}</span></div>`).join("");
    if (s.t) h += `<p class="ptxt">${esc(s.t).replace(/\n/g, "<br>")}</p>`;
    if (s.chips) h += `<div class="pchips">${s.chips.map(x => `<span>${esc(x)}</span>`).join("")}</div>`;
    if (s.btn) h += s.btn.map(([l, href]) => `<a class="pbtn" href="${href}"${href.endsWith(".pdf") ? ' target="_blank" rel="noopener"' : ""}>${esc(l)}</a>`).join("");
    return `<div class="ps">${h}</div>`;
  }
  function stickyPanel() {
    const st = stOf(sel), el = elFor(sel), c = st.c || el.dataset.c0 || el.style.getPropertyValue("--c");
    const seg = (k, opts, cur) => `<div class="pseg">${opts.map(([v, n]) => `<button data-sb="${k}" data-v="${v}" class="${v === cur ? "on" : ""}">${n}</button>`).join("")}</div>`;
    return `<div class="ps"><h4>Sticky<small>${itemOf(sel) ? "Yours" : "Kriti's"}</small></h4>
      <div class="pswatch">${STK_COLORS.map(([v, n]) => `<button data-sb="color" data-v="${v}" title="${n}" aria-label="${n}" style="--c:${v}" class="${v === c ? "on" : ""}"></button>`).join("")}</div>
      ${seg("shape", [["sq", "Square"], ["wide", "Wide"]], st.shape || "sq")}${seg("size", [["s", "Small"], ["m", "Medium"], ["l", "Large"]], st.size || "m")}
      <div class="pf w"><em>Aa</em><select data-sb="font" aria-label="Font">${FONTS.map(([v, n]) => `<option value="${v}"${v === (st.font || "simple") ? " selected" : ""}>${n}</option>`).join("")}</select></div>
      <label class="ptog"><input type="checkbox" data-sb="bold"${st.bold ? " checked" : ""}> Bold</label>
      <label class="ptog"><input type="checkbox" data-sb="author"${st.author === false ? "" : " checked"}> Show author</label>
      <p class="ptxt pkeys">Double-click to edit · ${MOD}D duplicate · ⌫ delete</p></div>`;
  }
  function render() {
    const P = isSticky(sel) && !PROPS[sel] ? [] : PROPS[sel] || [];
    if (dev && isSticky(sel)) {
      const st = stOf(sel), el = elFor(sel), cs = getComputedStyle(el), p = getComputedStyle(el.querySelector("p"));
      props.innerHTML = `<pre class="pcode"><b>.sticky</b> {\n  <i>background</i>: <u>${esc(st.c || el.dataset.c0 || "")}</u>;\n  <i>width</i>: <u>${Math.round(el.offsetWidth)}px</u>;\n  <i>min-height</i>: <u>${cs.minHeight}</u>;\n  <i>font-family</i>: <u>${esc(p.fontFamily.split(",")[0])}</u>;\n  <i>font-size</i>: <u>${p.fontSize}</u>;\n  <i>font-weight</i>: <u>${p.fontWeight}</u>;\n  <i>rotate</i>: <u>${el.style.getPropertyValue("--r") || "0deg"}</u>;\n  /* ${esc(el.querySelector("p").textContent)} */\n}</pre>`;
      return;
    }
    if (dev) {
      const cls = meta(sel).name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const slug = (k, h) => (/[a-z]/i.test(k) ? k : h || "value").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const out = [];
      P.forEach(s => {
        (s.g || []).forEach(([k, v]) => out.push(`  <i>${slug(k, s.h)}</i>: <u>${esc(v)}</u>;`));
        (s.sw || []).forEach(([, n]) => out.push(`  <i>${slug(s.h)}</i>: <u>${esc(n)}</u>;`));
        if (s.chips) out.push(`  <i>${slug(s.h)}</i>: <u>${esc(s.chips.join(", "))}</u>;`);
        if (s.t) out.push(`  /* ${esc(s.t).replace(/\n/g, " · ")} */`);
      });
      props.innerHTML = `<pre class="pcode"><b>.${cls}</b> {\n${out.join("\n")}\n}</pre>`;
      return;
    }
    if (tab === "proto") {
      props.innerHTML = `<div class="ps"><h4>Flows</h4>${PROTO.map(f => `<a class="pflow" href="${f.href}"${f.href.endsWith(".pdf") ? ' target="_blank" rel="noopener"' : ""}><i>▶</i><span>${esc(f.label)}<small>${esc(f.to)}</small></span></a>`).join("")}</div>`;
      return;
    }
    const n = saved.items.length + Object.keys(saved.style).length + Object.keys(saved.moved).length;
    props.innerHTML = (isSticky(sel) ? stickyPanel() : "") + P.map(section).join("") + (n ? `<div class="ps"><h4>Your edits</h4><p class="ptxt">${n} change${n > 1 ? "s" : ""} on this canvas. Only you can see them, and they reset when you reload.</p><a class="pbtn" href="#clear">Clear my edits</a></div>` : "");
  }
  props.addEventListener("click", e => {
    const b = e.target.closest("button[data-sb]"); if (b) return setProp(b.dataset.sb, b.dataset.v);
    const a = e.target.closest("a"); if (!a) return;
    const h = a.getAttribute("href");
    if (h === "#ask") { e.preventDefault(); $("[data-ask]").click(); }
    else if (h === "#clear") { e.preventDefault(); resetCanvas(); }
    else if (h.startsWith("#open:")) { e.preventDefault(); $(`[data-open='${h.slice(6)}']`).click(); }
  });
  props.addEventListener("change", e => { const b = e.target.closest("[data-sb]"); if (b) setProp(b.dataset.sb, b.tagName === "SELECT" ? b.value : undefined); });
  $$(".fr-tabs button").forEach(b => b.addEventListener("click", () => {
    tab = b.dataset.tab; $$(".fr-tabs button").forEach(x => { x.classList.toggle("on", x === b); x.setAttribute("aria-selected", x === b); }); render();
  }));

  /* ---------- hover outlines (canvas ↔ layers) ---------- */
  function hover(id) {
    if (!id || id === sel || armed) { hoverbox.classList.remove("on"); return; }
    place(hoverbox, rectOf(id), padFor(id));
    hoverbox.classList.toggle("comp", meta(id).kind === "comp"); hoverbox.classList.add("on");
  }
  list.addEventListener("pointerover", e => { const r = e.target.closest("li"); hover(r ? r.dataset.id : null); });
  list.addEventListener("pointerleave", () => hover(null));
  list.addEventListener("click", e => { const r = e.target.closest("li"); if (r) select(r.dataset.id, true); });
  list.addEventListener("keydown", e => { const r = e.target.closest("li"); if (r && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); select(r.dataset.id, true); } });
  $$("[data-layer]", board).forEach(el => {
    const id = el.dataset.layer;
    el.addEventListener("pointerenter", () => { hover(id); rows().find(r => r.dataset.id === id)?.classList.add("hov"); });
    el.addEventListener("pointerleave", () => { hover(null); rows().forEach(r => r.classList.remove("hov")); });
    el.addEventListener("click", e => { if (armed) return; e.stopPropagation(); if (!el.dataset.dragged) select(id); });
  });
  img.addEventListener("click", e => { if (armed) return; e.stopPropagation(); select(sel === "frame" ? "photo" : "frame"); });

  /* ---------- toast ---------- */
  const toast = Object.assign(document.createElement("div"), { className: "toast" }); board.appendChild(toast);
  let tt; const say = (m, ms = 1800) => { toast.textContent = m; toast.classList.add("on"); clearTimeout(tt); tt = setTimeout(() => toast.classList.remove("on"), ms); };

  /* ---------- sticky editing, FigJam style ---------- */
  const STK_COLORS = [["#FFE08A", "Yellow"], ["#FFCDA8", "Orange"], ["#FFC2DD", "Pink"], ["#D2C6FF", "Violet"], ["#BFE3FF", "Blue"], ["#B4F0C8", "Green"], ["#E4E1EA", "Grey"], ["#2A2733", "Charcoal"]];
  const FONTS = [["simple", "Simple"], ["book", "Bookish"], ["tech", "Technical"], ["hand", "Handwritten"]];
  const REACTS = ["👍", "❤️", "🔥", "🎉", "👀", "💯"];
  const SVG = {
    author: '<svg viewBox="0 0 16 16"><circle cx="8" cy="5.5" r="2.6" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M3 13.5c.8-2.6 2.7-3.8 5-3.8s4.2 1.2 5 3.8" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>',
    react: '<svg viewBox="0 0 16 16"><circle cx="7" cy="8.5" r="5.5" fill="none" stroke="currentColor" stroke-width="1.3"/><circle cx="5.2" cy="7.6" r=".8"/><circle cx="8.8" cy="7.6" r=".8"/><path d="M4.8 10.2c1.2 1.3 3.2 1.3 4.4 0" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M13 1v4M11 3h4" stroke="currentColor" stroke-width="1.3"/></svg>',
    dup: '<svg viewBox="0 0 16 16"><rect x="5" y="5" width="9" height="9" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M11 3V2.5A1.5 1.5 0 0 0 9.5 1h-7A1.5 1.5 0 0 0 1 2.5v7A1.5 1.5 0 0 0 2.5 11H3" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>',
    del: '<svg viewBox="0 0 16 16"><path d="M2.5 4h11M6 4V2.5h4V4M4 4l.7 9.5h6.6L12 4" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>',
    sq: '<svg viewBox="0 0 16 16"><rect x="3" y="3" width="10" height="10" rx="1" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>',
    wide: '<svg viewBox="0 0 16 16"><rect x="1.5" y="4.5" width="13" height="7" rx="1" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>'
  };
  const stOf = id => itemOf(id) || (saved.style[id] = saved.style[id] || {});
  const newId = () => "u" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  let editing = null, undo = null;
  function applySticky(el, st) {
    el.style.setProperty("--c", st.c || el.dataset.c0);
    el.dataset.size = st.size || "m"; el.dataset.shape = st.shape || "sq"; el.dataset.font = st.font || "simple";
    el.classList.toggle("bold", !!st.bold); el.classList.toggle("no-author", st.author === false);
    el.classList.toggle("dark", (st.c || el.dataset.c0) === "#2A2733");
    const p = el.querySelector("p"); p.textContent = st.text != null ? st.text : el.dataset.t0 || "";
    el.hidden = !!st.deleted;
    let rx = el.querySelector(".rx"); if (!rx) { rx = document.createElement("div"); rx.className = "rx"; el.appendChild(rx); }
    rx.innerHTML = Object.keys(st.react || {}).map(k => `<button data-rx="${k}" title="Remove reaction">${k}<b>1</b></button>`).join("");
  }
  const bar = document.createElement("div"); bar.className = "stk-bar"; bar.hidden = true; bar.setAttribute("role", "toolbar"); bar.setAttribute("aria-label", "Sticky note");
  bar.innerHTML = `<button class="sb-c" data-sb="colors" title="Color" aria-label="Color"><span></span></button><span class="sb-sep"></span>
    <div class="sb-seg"><button data-sb="shape" data-v="sq" title="Square">${SVG.sq}</button><button data-sb="shape" data-v="wide" title="Wide">${SVG.wide}</button></div>
    <div class="sb-seg"><button data-sb="size" data-v="s" title="Small">S</button><button data-sb="size" data-v="m" title="Medium">M</button><button data-sb="size" data-v="l" title="Large">L</button></div>
    <button class="sb-font" data-sb="fonts" title="Font"><span>Simple</span><i>▾</i></button>
    <button data-sb="bold" title="Bold (${MOD}B)" aria-label="Bold"><b>B</b></button>
    <button data-sb="author" title="Show author" aria-label="Show author">${SVG.author}</button><span class="sb-sep"></span>
    <button data-sb="react" title="Add reaction" aria-label="Add reaction">${SVG.react}</button>
    <button data-sb="dup" title="Duplicate (${MOD}D)" aria-label="Duplicate">${SVG.dup}</button>
    <button data-sb="del" title="Delete (⌫)" aria-label="Delete">${SVG.del}</button>
    <div class="sb-pop sb-colors" data-pop="colors" hidden>${STK_COLORS.map(([v, n]) => `<button data-sb="color" data-v="${v}" title="${n}" aria-label="${n}" style="--c:${v}"></button>`).join("")}</div>
    <div class="sb-pop sb-fonts" data-pop="fonts" hidden>${FONTS.map(([v, n]) => `<button data-sb="font" data-v="${v}" class="f-${v}">${n}</button>`).join("")}</div>
    <div class="sb-pop" data-pop="react" hidden>${REACTS.map(r => `<button data-sb="rx" data-v="${r}">${r}</button>`).join("")}</div>`;
  board.appendChild(bar);
  const closePops = () => $$(".sb-pop", bar).forEach(p => (p.hidden = true));
  function updateBar() {
    const el = isSticky(sel) && elFor(sel);
    if (!el || el.hidden || (compact && !itemOf(sel)) || editing) { bar.hidden = true; closePops(); return; }
    const st = stOf(sel), c = st.c || el.dataset.c0;
    $(".sb-c span", bar).style.background = c;
    $$("[data-sb=shape]", bar).forEach(b => b.classList.toggle("on", b.dataset.v === (st.shape || "sq")));
    $$("[data-sb=size]", bar).forEach(b => b.classList.toggle("on", b.dataset.v === (st.size || "m")));
    $$("[data-sb=color]", bar).forEach(b => b.classList.toggle("on", b.dataset.v === c));
    $$("[data-sb=font]", bar).forEach(b => b.classList.toggle("on", b.dataset.v === (st.font || "simple")));
    $(".sb-font span", bar).textContent = FONTS.find(f => f[0] === (st.font || "simple"))[1];
    $("[data-sb=bold]", bar).classList.toggle("on", !!st.bold);
    $("[data-sb=author]", bar).classList.toggle("on", st.author !== false);
    bar.hidden = false;
    const r = rectOf(sel), bw = bar.offsetWidth, bh = bar.offsetHeight;
    let x = r.x + r.w / 2 - bw / 2, y = r.y - bh - 16;
    if (y < 8) y = r.y + r.h + 16;
    bar.style.left = Math.max(8, Math.min(board.clientWidth - bw - 8, x)) + "px"; bar.style.top = y + "px";
    bar.classList.toggle("below", y > r.y);
  }
  function savePos(el) {
    const x = el.offsetLeft / board.clientWidth, y = el.offsetTop / board.clientHeight, it = itemOf(el.dataset.uid);
    if (it) { it.x = x; it.y = y; } else saved.moved[el.dataset.layer] = [x, y];
  }
  function setProp(k, v) {
    if (!isSticky(sel)) return;
    const id = sel, el = elFor(id), st = stOf(id);
    if (k === "colors" || k === "fonts" || k === "react") { const p = $(`[data-pop="${k}"]`, bar), was = p.hidden; closePops(); p.hidden = !was; return; }
    if (k === "dup") return duplicate(id);
    if (k === "del") return removeSticky(id);
    if (k === "color") st.c = v;
    else if (k === "shape" || k === "size" || k === "font") st[k] = v;
    else if (k === "bold") st.bold = !st.bold;
    else if (k === "author") st.author = st.author === false;
    else if (k === "rx") st.react = st.react?.[v] ? {} : { [v]: 1 };   // one reaction per sticky: a new one replaces the old, same one removes it
    applySticky(el, st); persist(); closePops(); select(id);
  }
  function duplicate(id) {
    const el = elFor(id), st = stOf(id);
    const it = { type: "sticky", id: newId(), x: (el.offsetLeft + 28) / board.clientWidth, y: (el.offsetTop + 28) / board.clientHeight,
      c: st.c || el.dataset.c0, text: el.querySelector("p").textContent, size: st.size, shape: st.shape, font: st.font, bold: st.bold, author: st.author };
    saved.items.push(it); mount(it); persist(); drawLayers(); select(it.id, true); say("Duplicated");
  }
  function removeSticky(id) {
    const it = itemOf(id), el = elFor(id);
    if (it) { saved.items = saved.items.filter(x => x !== it); el.remove(); undo = { it }; }
    else { stOf(id).deleted = true; applySticky(el, stOf(id)); undo = { id }; }
    persist(); drawLayers(); select("frame"); say(`Sticky deleted · ${MOD}Z to undo`, 2400);
  }
  function restore() {
    if (!undo) return;
    if (undo.it) { saved.items.push(undo.it); mount(undo.it); select(undo.it.id); }
    else { const st = stOf(undo.id); delete st.deleted; applySticky(elFor(undo.id), st); select(undo.id); }
    undo = null; persist(); drawLayers(); say("Restored");
  }
  function edit(id) {
    const el = elFor(id); if (!el || el.hidden) return;
    const p = el.querySelector("p"); editing = id; el.classList.add("editing"); updateBar();
    p.contentEditable = "true"; p.spellcheck = false; p.focus();
    const r = document.createRange(); r.selectNodeContents(p); r.collapse(false); const s = getSelection(); s.removeAllRanges(); s.addRange(r);
    const done = () => {
      p.contentEditable = "false"; el.classList.remove("editing"); editing = null;
      const t = p.textContent.trim().slice(0, 160), st = stOf(id);
      if (itemOf(id) || t !== el.dataset.t0) st.text = t; else delete st.text;
      persist(); drawLayers(); select(id);
      p.removeEventListener("blur", done); p.removeEventListener("keydown", key);
    };
    const key = e => { e.stopPropagation(); if (e.key === "Escape" || (e.key === "Enter" && (e.metaKey || e.ctrlKey))) { e.preventDefault(); p.blur(); } };
    p.addEventListener("blur", done); p.addEventListener("keydown", key);
  }
  bar.addEventListener("pointerdown", e => e.stopPropagation());
  bar.addEventListener("click", e => { e.stopPropagation(); const b = e.target.closest("[data-sb]"); if (b) setProp(b.dataset.sb, b.dataset.v); });
  board.addEventListener("click", e => { const b = e.target.closest("[data-rx]"); if (!b) return; e.stopPropagation();
    const el = b.closest(".sticky, .u-sticky"), id = el.dataset.layer || el.dataset.uid; select(id); setProp("rx", b.dataset.rx); }, true);
  notes.forEach(n => {
    n.dataset.c0 = n.style.getPropertyValue("--c"); n.dataset.t0 = n.querySelector("p").textContent;
    applySticky(n, saved.style[n.dataset.layer] || {});
    n.addEventListener("dblclick", e => { e.stopPropagation(); edit(n.dataset.layer); });
  });
  function resetCanvas() {
    saved.items = []; saved.moved = {}; saved.style = {}; persist(); $(".uitems", board).innerHTML = "";
    notes.forEach(n => applySticky(n, {})); drawLayers(); layout(); select("frame"); say("Canvas reset");
  }
  addEventListener("keydown", e => {
    if (!document.body.classList.contains("on-hero") || editing || /input|textarea|select/i.test(e.target.tagName) || e.target.isContentEditable) return;
    const mod = e.metaKey || e.ctrlKey, k = e.key.toLowerCase();
    if (mod && k === "z" && undo) { e.preventDefault(); return restore(); }
    if (!isSticky(sel)) return;
    if (mod && k === "d") { e.preventDefault(); setProp("dup"); }
    else if (mod && k === "b") { e.preventDefault(); setProp("bold"); }
    else if (!mod && (e.key === "Delete" || e.key === "Backspace")) { e.preventDefault(); setProp("del"); }
    else if (!mod && e.key === "Enter") { e.preventDefault(); edit(sel); }
    else if (e.key.startsWith("Arrow")) {
      e.preventDefault(); const el = elFor(sel), d = e.shiftKey ? 10 : 1;
      if (e.key === "ArrowLeft") el.style.left = el.offsetLeft - d + "px"; if (e.key === "ArrowRight") el.style.left = el.offsetLeft + d + "px";
      if (e.key === "ArrowUp") el.style.top = el.offsetTop - d + "px"; if (e.key === "ArrowDown") el.style.top = el.offsetTop + d + "px";
      savePos(el); persist(); place(selbox, rectOf(sel), padFor(sel)); updateBar();
    }
  });

  /* ---------- dragging (stickies + your stamps / stickies) ---------- */
  function draggable(el, onDrop) {
    el.addEventListener("pointerdown", e => {
      if (armed || e.button !== 0 || el.classList.contains("editing") || e.target.closest("button, textarea, a")) return;
      const b = board.getBoundingClientRect(), sx = e.clientX, sy = e.clientY, ox = el.offsetLeft, oy = el.offsetTop;
      let moved = false; delete el.dataset.dragged;
      el.setPointerCapture(e.pointerId);
      const mv = ev => {
        const dx = ev.clientX - sx, dy = ev.clientY - sy;
        if (!moved && Math.hypot(dx, dy) < 4) return;
        if (!moved) { moved = true; el.classList.add("drag"); selbox.style.transition = "none"; board.classList.add("dragging"); }
        const x = Math.max(-40, Math.min(b.width - 40, ox + dx)), y = Math.max(-20, Math.min(b.height - 40, oy + dy));
        el.style.left = x + "px"; el.style.top = y + "px";
        if ((el.dataset.layer || el.dataset.uid) === sel) place(selbox, rectOf(sel), padFor(sel));
      };
      const up = () => {
        el.removeEventListener("pointermove", mv); el.removeEventListener("pointerup", up); el.removeEventListener("pointercancel", up);
        if (!moved) return;
        el.classList.remove("drag"); selbox.style.transition = ""; board.classList.remove("dragging"); el.dataset.dragged = 1; setTimeout(() => delete el.dataset.dragged, 0);
        onDrop(el.offsetLeft / board.clientWidth, el.offsetTop / board.clientHeight); persist();
        const id = el.dataset.layer || el.dataset.uid; if (id && isSticky(id)) select(id); else updateBar();
      };
      el.addEventListener("pointermove", mv); el.addEventListener("pointerup", up); el.addEventListener("pointercancel", up);
    });
  }
  notes.forEach(n => draggable(n, (x, y) => { saved.moved[n.dataset.layer] = [x, y]; }));

  /* ---------- visitor items: sticky, comment, stamp ---------- */
  const uitems = Object.assign(document.createElement("div"), { className: "uitems" }); board.appendChild(uitems);
  const UCOL = ["#FFE08A", "#D2C6FF", "#B4F0C8", "#BFE3FF", "#FFC2DD", "#FFCDA8"];
  const mail = t => `mailto:Kritibohra23@gmail.com?subject=${encodeURIComponent("A comment on your portfolio")}&body=${encodeURIComponent(t)}`;
  function at(el, it) { el.style.left = it.x * board.clientWidth + "px"; el.style.top = it.y * board.clientHeight + "px"; }
  function remove(it, el) { saved.items = saved.items.filter(x => x !== it); el.remove(); persist(); render(); }
  function mount(it, fresh) {
    let el;
    if (it.type === "sticky") {
      it.id = it.id || newId();
      el = document.createElement("div"); el.className = "u-sticky"; el.dataset.uid = it.id; el.dataset.c0 = it.c; el.dataset.t0 = "";
      el.innerHTML = `<p aria-label="Your sticky note"></p><span>You</span>`;
      applySticky(el, it);
      draggable(el, (x, y) => { it.x = x; it.y = y; });
      el.addEventListener("click", e => { e.stopPropagation(); if (!armed && !el.dataset.dragged) select(it.id); });
      el.addEventListener("dblclick", e => { e.stopPropagation(); edit(it.id); });
      el.addEventListener("pointerenter", () => hover(it.id)); el.addEventListener("pointerleave", () => hover(null));
      if (fresh) setTimeout(() => { drawLayers(); select(it.id, true); edit(it.id); }, 30);
    } else if (it.type === "stamp") {
      el = document.createElement("div"); el.className = "u-stamp" + (it.s.length > 2 ? " txt" : ""); el.textContent = it.s;
      el.title = "Double-click to remove";
      el.addEventListener("dblclick", () => remove(it, el));
      draggable(el, (x, y) => { it.x = x; it.y = y; });
    } else {
      el = document.createElement("div"); el.className = "u-cmt" + (fresh ? " open" : "") + (it.x > .5 ? " flip" : "");
      const view = () => `<small>You · just now</small>${esc(it.text)}<div class="u-row"><a class="pri" href="${mail(it.text)}">✉ Send to Kriti</a></div><button class="u-x" aria-label="Delete comment">×</button>`;
      el.innerHTML = `<div class="u-pin">Y</div><div class="u-bub">${it.text ? view() : `<small>New comment</small><textarea placeholder="Say hi, ask a question, or leave feedback…" maxlength="400"></textarea><div class="u-row"><button class="pri" data-post>Post</button><button data-cancel>Cancel</button></div>`}</div>`;
      const bub = el.lastChild;
      bub.addEventListener("click", e => {
        if (e.target.matches("[data-post]")) {
          const v = bub.querySelector("textarea").value.trim(); if (!v) return;
          it.text = v; saved.items.push(it); persist(); bub.innerHTML = view(); el.classList.remove("open"); render(); say("Comment posted. Hit “Send to Kriti” to email it.", 2600);
        } else if (e.target.matches("[data-cancel]")) el.remove();
        else if (e.target.matches(".u-x")) remove(it, el);
      });
      if (fresh) setTimeout(() => bub.querySelector("textarea")?.focus(), 30);
    }
    el.addEventListener("click", e => e.stopPropagation());
    el._it = it; at(el, it); uitems.appendChild(el); return el;
  }
  saved.items.forEach(it => mount(it));
  drawLayers();

  /* ---------- toolbar ---------- */
  const pop = $("#stamppop");
  function arm(t) {
    armed = t; board.classList.remove("arm-sticky", "arm-comment", "arm-stamp"); if (t) board.classList.add("arm-" + t);
    $$(".ft[data-tool]").forEach(b => b.classList.toggle("on", t ? b.dataset.tool === t : b.dataset.tool === "move"));
    hover(null);
  }
  function tool(t, btn) {
    pop.hidden = true;
    if (t === "ask") return $("[data-ask]").click();
    if (t === "present") return present();
    if (t === "dev") { dev = !dev; hero.classList.toggle("dev-on", dev); render(); return say(dev ? "Dev Mode: inspect me as code" : "Back to Design"); }
    if (t === "sticky") { arm(armed === "sticky" ? null : "sticky"); return armed && say("Click anywhere to drop a sticky note"); }
    if (t === "comment") { arm(armed === "comment" ? null : "comment"); return armed && say("Click anywhere to leave a comment"); }
    if (t === "stamp") { pop.hidden = false; return; }
    arm(null); if (t !== "move") select(t, true); else select("frame");
  }
  $$(".ft[data-tool]").forEach(b => b.addEventListener("click", e => { e.stopPropagation(); tool(b.dataset.tool, b); }));
  pop.addEventListener("click", e => {
    const b = e.target.closest("[data-stamp]"); if (!b) return;
    e.stopPropagation(); stampPick = b.dataset.stamp; pop.hidden = true; arm("stamp"); say(`Click anywhere to stamp ${stampPick}`);
  });
  board.addEventListener("click", e => {
    pop.hidden = true; closePops();
    if (!armed) { if (e.target === board || e.target.classList.contains("art")) select("frame"); return; }
    const b = board.getBoundingClientRect(), x = (e.clientX - b.left) / b.width, y = (e.clientY - b.top) / b.height;
    if (armed === "sticky") { const it = { type: "sticky", x: x - 75 / b.width, y: y - 30 / b.height, c: UCOL[saved.items.length % UCOL.length], text: "" }; saved.items.push(it); mount(it, true); }
    else if (armed === "stamp") { const it = { type: "stamp", x, y, s: stampPick }; saved.items.push(it); mount(it, true); }
    else mount({ type: "comment", x, y, text: "" }, true);
    persist(); arm(null); render(); toast.classList.remove("on");
  });
  const KEYS = { v: "move", a: "frame", t: "headline", s: "sticky", c: "comment", e: "stamp", f: "present" };
  addEventListener("keydown", e => {
    if (!document.body.classList.contains("on-hero") || e.metaKey || e.ctrlKey || e.altKey || /input|textarea/i.test(e.target.tagName) || e.target.isContentEditable) return;
    if (e.key === "Escape") { arm(null); pop.hidden = true; return; }
    if (e.shiftKey && e.key.toLowerCase() === "d") return tool("dev");
    const t = KEYS[e.key.toLowerCase()]; if (t) tool(t);
  });

  /* ---------- present: the whole site goes full screen, still scrollable; Esc leaves (like YouTube's F) ---------- */
  const fig = $("#fig"), maxBtn = $("#figmax"), root = document.documentElement;
  const fsEl = () => document.fullscreenElement || document.webkitFullscreenElement;
  if (!(root.requestFullscreen || root.webkitRequestFullscreen)) maxBtn.hidden = true;   // e.g. iPhone Safari
  function present() {
    if (fsEl()) (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    else Promise.resolve((root.requestFullscreen || root.webkitRequestFullscreen).call(root)).catch(() => {});
  }
  ["fullscreenchange", "webkitfullscreenchange"].forEach(ev => document.addEventListener(ev, () => {
    const on = !!fsEl(); fig.classList.toggle("max", on);
    maxBtn.setAttribute("aria-label", on ? "Exit full screen" : "Full screen"); maxBtn.title = on ? "Exit full screen (Esc)" : "Full screen (F)";
    setTimeout(() => { layout(); start(); }, 80);
    if (on) say("Full screen · scroll as usual, Esc to exit", 2400);
  }));
  maxBtn.addEventListener("click", present);

  /* ---------- sticky layout ---------- */
  function layout() {
    const b = board.getBoundingClientRect(), r = img.getBoundingClientRect();
    I = { left: r.left - b.left, top: r.top - b.top, width: r.width, height: r.height };
    const side = (b.width - r.width) / 2;
    compact = side < 150 + 36 || innerWidth <= 1024;
    board.classList.toggle("compact", compact);
    const gap = Math.max(22, Math.min(70, side - 150 - 30));
    notes.forEach((n, i) => {
      const m = saved.moved[n.dataset.layer];
      if (m) { n.style.left = m[0] * b.width + "px"; n.style.top = m[1] * b.height + "px"; return; }
      const left = n.dataset.side === "l", w = n.offsetWidth, h = n.offsetHeight, stag = i % 2 ? 18 : 0;
      n.style.left = (left ? I.left - gap - w - stag : I.left + I.width + gap + stag) + "px";
      n.style.top = Math.max(8, Math.min(b.height - h - 70, I.top + I.height * n.dataset.ny / 100 - h / 2)) + "px";
    });
    $$(".uitems > *", board).forEach(el => el._it && at(el, el._it));
    select(sel);
  }
  let shown = false;
  function reveal() {
    if (shown) return; shown = true;
    notes.forEach((n, i) => setTimeout(() => n.classList.add("on"), REDUCED ? 0 : 900 + i * 140));
    if (!REDUCED) setTimeout(() => say("Try it: click a sticky to restyle it, or press S to add your own", 3400), 2600);
  }

  /* ---------- multiplayer cursors ---------- */
  const curs = CURSORS.map(c => {
    const el = document.createElement("div"); el.className = "cur"; el.style.setProperty("--c", c.c);
    el.innerHTML = ARROW + `<span class="cur-tag">${c.name}</span><span class="cur-msg"></span>`;
    layer.appendChild(el); return { ...c, el, k: 0, msg: el.lastChild };
  });
  const pos = s => s.n != null && notes[s.n].hidden ? [I.left - 40, I.top + I.height * .4] : s.n != null ? [notes[s.n].offsetLeft + notes[s.n].offsetWidth * .6, notes[s.n].offsetTop + notes[s.n].offsetHeight * .62]
                               : [I.left + I.width * s.at[0] / 100, I.top + I.height * s.at[1] / 100];
  let running = false;
  function step(c) {
    if (!running) return;
    const s = c.path[c.k++ % c.path.length]; let [x, y] = pos(s);
    x = Math.max(10, Math.min(x, board.clientWidth - (s.say ? 230 : 150)));
    c.el.classList.remove("talk"); c.el.style.transform = `translate(${x.toFixed(0)}px, ${y.toFixed(0)}px)`;
    let wait = 1900;
    if (s.say) { c.t1 = setTimeout(() => { c.msg.textContent = s.say; c.el.classList.add("talk"); }, 1750); wait = 4350; }
    c.t2 = setTimeout(() => step(c), wait + 400);
  }
  function start() {
    if (running || REDUCED || compact || !I) return; running = true;
    curs.forEach((c, i) => { c.el.style.transition = "none"; const [x, y] = pos(c.path[c.path.length - 1]); c.el.style.transform = `translate(${x}px, ${y}px)`;
      c.el.offsetWidth; c.el.style.transition = ""; c.el.classList.add("on"); c.t0 = setTimeout(() => step(c), 2600 + i * 900); });
  }
  function stop() { running = false; curs.forEach(c => { clearTimeout(c.t0); clearTimeout(c.t1); clearTimeout(c.t2); c.el.classList.remove("on", "talk"); }); }
  if (FINE && !REDUCED) {
    const you = document.createElement("div"); you.className = "cur cur-you"; you.style.setProperty("--c", "#FF5B2E");
    you.innerHTML = '<span class="cur-tag">You</span>'; layer.appendChild(you);
    board.addEventListener("pointermove", e => { const b = board.getBoundingClientRect(); you.style.transform = `translate(${e.clientX - b.left}px, ${e.clientY - b.top}px)`; you.classList.add("on"); });
    board.addEventListener("pointerleave", () => you.classList.remove("on"));
  }

  const go = () => { layout(); reveal(); start(); };
  img.complete ? go() : img.addEventListener("load", go);
  document.fonts && document.fonts.ready.then(() => I && layout());
  let rt; addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => { layout(); if (compact) stop(); else start(); }, 200); });
  new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop())).observe(board);
  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
  new IntersectionObserver(([e]) => document.body.classList.toggle("on-hero", e.intersectionRatio > .35), { threshold: [0, .35, 1] }).observe(hero);
})();

/* ================= BACK TO TOP ================= */
// The logo, the "k" in the file panel, "Hello" and "Back to top" all go here.
document.addEventListener("click", e => {
  const a = e.target.closest('a[href="#top"]'); if (!a) return;
  e.preventDefault();
  if (document.fullscreenElement) document.exitFullscreen();
  scrollTo({ top: 0, behavior: REDUCED ? "auto" : "smooth" });
  history.replaceState(null, "", location.pathname + location.search);
});

/* ================= SHARE ================= */
(function share() {
  const d = $("#share"), open = $("#share-open"); if (!d || !open) return;
  const SITE = "https://kritibohra.github.io/portfolio/";   // the public portfolio link shown and copied in Share
  const url = () => SITE;
  let tt;
  open.addEventListener("click", () => {
    $("#share-url").value = url();
    d.showModal();
  });
  async function copy(text, btn) {
    try { await navigator.clipboard.writeText(text); }
    catch { const i = $("#share-url"); i.select(); document.execCommand("copy"); getSelection().removeAllRanges(); i.blur(); }
    btn.textContent = "Copied ✓"; clearTimeout(tt); tt = setTimeout(() => (btn.textContent = "Copy link"), 1600);
  }
  d.addEventListener("click", e => {
    if (e.target === d || e.target.closest("[data-share-close]")) return d.close();
    const c = e.target.closest("[data-copy]"); if (c) copy(url(), c);
  });
})();

/* ================= SCRAMBLE TEXT ================= */
const GLYPHS = "!<>-_\\/[]{}=+*^?#01%&";
function scramble(el, dur = 900) {
  const final = el.dataset.final || (el.dataset.final = el.textContent);
  if (REDUCED) { el.textContent = final; return; }
  const start = performance.now();
  (function step(now) {
    const k = Math.min(1, (now - start) / dur);
    el.textContent = [...final].map((ch, i) => (ch === " " || i / final.length < k) ? ch : GLYPHS[Math.random() * GLYPHS.length | 0]).join("");
    if (k < 1) requestAnimationFrame(step);
  })(start);
}
(function scrambles() {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { scramble(e.target); io.unobserve(e.target); } }), { threshold: .6 });
  $$("h2[data-scramble]").forEach(h => io.observe(h));
  const n = $(".noise[data-scramble]");
  if (n && !REDUCED) setInterval(() => scramble(n, 700), 3200);
})();

/* ================= MANIFESTO WORD REVEAL ================= */
(function manifesto() {
  const el = $("#manifesto"); if (!el) return;
  const HOT = new Set(["simple.", "rely", "watching", "fast."]);
  el.innerHTML = el.textContent.trim().split(/\s+/).map(w => `<span class="w${HOT.has(w) ? " hot" : ""}">${w}</span>`).join(" ");
  const words = $$(".w", el);
  const update = () => {
    const r = el.getBoundingClientRect(), vh = innerHeight;
    const p = Math.min(1, Math.max(0, (vh * .85 - r.top) / (r.height + vh * .35)));
    const n = Math.round(p * words.length);
    words.forEach((w, i) => w.classList.toggle("on", i < n));
  };
  if (REDUCED) { words.forEach(w => w.classList.add("on")); return; }
  addEventListener("scroll", update, { passive: true }); update();
})();

/* ================= HORIZONTAL WORK ================= */
(function work() {
  const sec = $("#work"), track = $("#work-track"), bar = $("#work-bar"), idx = $("#work-i");
  const mq = matchMedia("(max-width: 720px)");
  const panels = $$(".panel", track);
  function update() {
    if (REDUCED || mq.matches) { track.style.transform = ""; return; }
    const r = sec.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, -r.top / (sec.offsetHeight - innerHeight)));
    const max = track.scrollWidth - innerWidth;
    track.style.transform = `translate3d(${-p * Math.max(0, max)}px,0,0)`;
    bar.style.width = `${p * 100}%`;
    idx.textContent = String(Math.min(panels.length, Math.round(p * (panels.length - 1)) + 1)).padStart(2, "0");
  }
  addEventListener("scroll", update, { passive: true }); addEventListener("resize", update); update();
})();

/* ================= CONFETTI ================= */
function celebrate(badge) {
  if (REDUCED) return;
  badge.classList.remove("pop"); void badge.offsetWidth; badge.classList.add("pop");
  const host = badge.closest(".stop-card"), hr = host.getBoundingClientRect(), br = badge.getBoundingClientRect();
  const ox = br.left - hr.left + br.width / 2, oy = br.top - hr.top + br.height / 2;
  const colors = ["#8B7CFF", "#4EA8FF", "#3DD6A3", "#FFD166", "#FF5B2E"];
  for (let i = 0; i < 34; i++) {
    const c = document.createElement("i"), ang = Math.random() * Math.PI * 2, dist = 60 + Math.random() * 120;
    c.className = "confetti";
    c.style.cssText = `left:${ox}px;top:${oy}px;background:${colors[i % 5]};width:${5 + Math.random() * 6}px;height:${4 + Math.random() * 8}px;` +
      `--dx:${Math.cos(ang) * dist}px;--dy:${Math.sin(ang) * dist - 40}px;--rot:${Math.random() * 720 - 360}deg;animation-delay:${Math.random() * 80}ms`;
    host.appendChild(c);
    setTimeout(() => c.remove(), 1500);
  }
}

/* ================= JOURNEY PATH ================= */
(function journey() {
  const box = $("#journey"); if (!box) return;
  const svg = $(".journey-svg", box), base = $(".j-base", svg), line = $(".j-line", svg), tip = $(".j-tip", svg);
  const stops = $$(".stop", box), mq = matchMedia("(max-width: 720px)");
  let len = 0, nodeAt = [];
  function layout() {
    const W = box.clientWidth, mobile = mq.matches;
    const cx = mobile ? 14 : W / 2, amp = mobile ? 0 : Math.min(90, W * .07);
    const ys = stops.map(s => s.offsetTop + 49);
    let d = `M ${cx} 0`, prevY = 0, prevX = cx;
    ys.forEach((y, i) => {
      const x = cx + (i % 2 ? -amp : amp) * (i === ys.length - 1 ? 0 : 1);
      const my = (prevY + y) / 2;
      d += ` C ${prevX} ${my}, ${x} ${my}, ${x} ${y}`;
      stops[i].style.setProperty("--nx", `${x}px`);
      prevY = y; prevX = x;
    });
    base.setAttribute("d", d); line.setAttribute("d", d);
    len = line.getTotalLength();
    line.style.strokeDasharray = len;
    nodeAt = ys.map(y => { let lo = 0, hi = len; for (let k = 0; k < 18; k++) { const m = (lo + hi) / 2; line.getPointAtLength(m).y < y ? lo = m : hi = m; } return lo; });
    update();
  }
  function update() {
    const r = box.getBoundingClientRect(), vh = innerHeight;
    const p = REDUCED ? 1 : Math.min(1, Math.max(0, (vh * .6 - r.top) / r.height));
    const at = p * len;
    line.style.strokeDashoffset = len - at;
    const pt = line.getPointAtLength(Math.max(0, at));
    tip.setAttribute("cx", pt.x); tip.setAttribute("cy", pt.y);
    stops.forEach((s, i) => {
      const on = at >= nodeAt[i] - 2;
      s.classList.toggle("lit", on);
      const b = $(".promo-badge", s);
      if (b) {
        if (on && !b.dataset.done) { b.dataset.done = 1; setTimeout(() => celebrate(b), 350); }
        if (!on && b.dataset.done) { delete b.dataset.done; b.classList.remove("pop"); }
      }
    });
  }
  addEventListener("scroll", update, { passive: true });
  let t; addEventListener("resize", () => { clearTimeout(t); t = setTimeout(layout, 150); });
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(layout);
})();

/* ================= COUNTERS ================= */
(function counters() {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, to = +el.dataset.count, t = performance.now();
    if (REDUCED) { el.textContent = to; return; }
    (function f(n) { const k = Math.min(1, (n - t) / 1200); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(f); })(t);
    io.unobserve(el);
  }), { threshold: .6 });
  $$("[data-count]").forEach(el => io.observe(el));
})();

/* ================= REVEAL ================= */
(function reveal() {
  const sel = ".about-text, .now, .journey-side .card-s, .lab-sub, .contact-big, .contact-row, .socials, .nums .num";
  const els = $$(sel); els.forEach(e => e.classList.add("rv"));
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
  els.forEach(e => io.observe(e));
  const sig = $(".signature");
  new IntersectionObserver(([e]) => { if (e.isIntersecting) sig.classList.add("in"); }, { threshold: .4 }).observe(sig);
})();

/* ================= NAV ACTIVE ================= */
(function nav() {
  const links = $$(".nav nav a"), map = new Map(links.map(a => [a.getAttribute("href").slice(1), a]));
  const io = new IntersectionObserver(es => es.forEach(e => {
    const a = map.get(e.target.id);
    if (a && e.isIntersecting) { links.forEach(l => l.classList.remove("active")); a.classList.add("active"); }
  }), { rootMargin: "-45% 0px -50% 0px" });
  map.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
})();

/* ================= NAV THEME OVER LIGHT SECTIONS ================= */
(function navTheme() {
  const lights = $$("section.light");
  const check = () => {
    const y = 40;
    const over = lights.some(s => { const r = s.getBoundingClientRect(); return r.top <= y && r.bottom >= y; });
    document.body.classList.toggle("nav-light", over);
  };
  addEventListener("scroll", check, { passive: true }); check();
})();

/* ================= CLOCK ================= */
(function clock() {
  const el = $("#clock"), f = new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Kolkata" });
  const tick = () => (el.textContent = f.format(new Date())); tick(); setInterval(tick, 30000);
})();

/* ================= MAGNETIC BUTTON ================= */
(function magnetic() {
  if (!FINE || REDUCED) return;
  $$(".magnetic").forEach(b => {
    b.addEventListener("pointermove", e => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px, ${(e.clientY - r.top - r.height / 2) * .35}px)`; });
    b.addEventListener("pointerleave", () => (b.style.transform = ""));
  });
})();

/* ================= PRINCIPLES + TOOLKIT: staggered reveal ================= */
(function staggers() {
  $$(".principles").forEach(g => {
    [...g.children].forEach((c, i) => c.style.setProperty("--i", i));
    if (REDUCED) return g.classList.add("play");
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { g.classList.add("play"); io.disconnect(); } }, { threshold: .25 });
    io.observe(g);
  });
})();

/* ================= PRINCIPLE 04: the demo controls work ================= */
(function protoDemo() {
  const r = $(".dp-range input"), o = $(".dp-range output"); if (!r) return;
  r.addEventListener("input", () => (o.textContent = "$" + r.value));
})();

/* ================= TOOLKIT: auto-playing skill stage ================= */
(function toolkit() {
  const root = $(".toolkit"); if (!root) return;
  const COLORS = ["#8B7CFF", "#4EA8FF", "#3DD6A3", "#FF5B2E"];
  const groups = [...root.children].map(d => ({ name: $("h3", d).textContent.trim(), items: $("p", d).textContent.split("·").map(s => s.trim()).filter(Boolean) }));
  root.classList.add("tk");
  root.innerHTML = `<div class="tk-nav" role="tablist" aria-label="Skill groups">${groups.map((g, i) => `<button class="tk-tab" role="tab" style="--c:${COLORS[i]}" aria-selected="false"><span class="tk-n">0${i + 1}</span><span class="tk-name">${g.name}</span><span class="tk-count">${g.items.length} skills</span><i class="tk-prog"></i></button>`).join("")}</div>
    <div class="tk-stage" aria-live="polite"><span class="tk-big" aria-hidden="true"></span><p class="tk-title"></p><div class="tk-cloud"></div></div>`;
  const big = $(".tk-big", root), tabs = $$(".tk-tab", root), stage = $(".tk-stage", root), cloud = $(".tk-cloud", root), title = $(".tk-title", root);
  let cur = -1;
  function show(i) {
    if (i === cur) return;
    cur = i; const g = groups[i], c = COLORS[i];
    tabs.forEach((t, k) => { t.classList.toggle("on", k === i); t.setAttribute("aria-selected", k === i); });
    stage.style.setProperty("--c", c);
    const nav = tabs[i].parentElement;                       // phones: keep the active tab in view
    if (nav.scrollWidth > nav.clientWidth) nav.scrollTo({ left: tabs[i].offsetLeft - 20, behavior: REDUCED ? "auto" : "smooth" });
    title.textContent = g.name; big.textContent = "0" + (i + 1);
    cloud.innerHTML = g.items.map((s, j) => {
      const r = ((j * 37) % 9 - 4) * 1.2;                     // small, stable tilt per tag
      return `<span class="tk-tag" style="--j:${j}; --r:${r}deg; --f:${3.6 + (j % 4) * .7}s">${s}</span>`;
    }).join("");
    stage.classList.remove("in"); void stage.offsetWidth; stage.classList.add("in");
  }
  // scroll-driven: the section is pinned and each quarter of its scroll opens the next group
  const sec = root.closest(".tk-scroll");
  const span = () => Math.max(1, sec.offsetHeight - $(".tk-sticky", sec).offsetHeight);   // = the runway height
  function onScroll() {
    if (REDUCED) return;
    const p = Math.min(1, Math.max(0, -sec.getBoundingClientRect().top / span()));
    const i = Math.min(groups.length - 1, Math.floor(p * groups.length));
    show(i);
    tabs[i].style.setProperty("--p", Math.max(46, (p * groups.length - i) * tabs[i].offsetWidth) + "px");
  }
  tabs.forEach((t, i) => t.addEventListener("click", () => {
    if (REDUCED) return show(i);
    scrollTo({ top: sec.getBoundingClientRect().top + scrollY + span() * ((i + .05) / groups.length), behavior: "smooth" });
  }));
  addEventListener("scroll", onScroll, { passive: true }); addEventListener("resize", onScroll);
  show(0);
})();

/* ================= CASE VIEWER ================= */
// Add a case study: slides go in assets/img/<id>-slide-01..NN.webp, the PDF in assets/docs.
const CASES = {
  stellar:    { title: "Stellar (formerly Prism)", pdf: "assets/docs/Kriti_Bohra_Stellar_Case_Study.pdf", pages: 10 },
  adroom:     { title: "Adroom", pdf: "assets/docs/Kriti_Bohra_Adroom_Case_Study.pdf", pages: 10 },
  visibility: { title: "Visibility", pdf: "assets/docs/Kriti_Bohra_Visibility_Case_Study.pdf", pages: 10 }
};
const Viewer = (function viewer() {
  const dlg = $("#viewer"), body = $("#viewer-body"), title = $("#viewer-title"), pdf = $("#viewer-pdf");
  let current = null;
  function open(id, e) {
    if (e) e.preventDefault();
    const c = CASES[id]; if (!c) return;
    if (current !== id) {
      body.innerHTML = Array.from({ length: c.pages }, (_, i) => `<img src="assets/img/${id}-slide-${String(i + 1).padStart(2, "0")}.webp" width="1920" height="1200" loading="lazy" alt="${c.title} case study, page ${i + 1} of ${c.pages}">`).join("");
      title.textContent = c.title; pdf.href = c.pdf; current = id;
    }
    dlg.showModal(); body.scrollTop = 0; history.replaceState(null, "", "#" + id);
  }
  function close() { dlg.close(); history.replaceState(null, "", "#work"); }
  document.addEventListener("click", e => { const b = e.target.closest("[data-open]"); if (b && CASES[b.dataset.open]) open(b.dataset.open, e); });
  $("[data-close]", dlg).addEventListener("click", close);
  dlg.addEventListener("click", e => { if (e.target === dlg) close(); });
  const h = location.hash.slice(1); if (CASES[h]) open(h);
  return { open };
})();

/* ================= ASK KRITI ================= */
(function ask() {
  const box = $("#ask"), log = $("#ask-log"), chips = $("#ask-chips");
  let greeted = false, busy = false;
  const add = (cls, html) => { const m = document.createElement("div"); m.className = `msg ${cls}`; m.innerHTML = html; log.appendChild(m); log.scrollTop = log.scrollHeight; return m; };
  function reply(item) {
    if (busy) return; busy = true;
    add("me", item.q);
    const m = add("her", `<span class="typing"><i></i><i></i><i></i></span>`);
    setTimeout(() => {
      const txt = item.a; let i = 0; m.textContent = "";
      const step = () => {
        i = Math.min(txt.length, i + (REDUCED ? txt.length : 3)); m.textContent = txt.slice(0, i); log.scrollTop = log.scrollHeight;
        if (i < txt.length) setTimeout(step, 14);
        else {
          if (item.acts) {
            const a = document.createElement("div"); a.className = "acts";
            item.acts.forEach(x => {
              const el = x.href ? Object.assign(document.createElement("a"), { href: x.href, target: x.href.startsWith("mailto") ? "_self" : "_blank", rel: "noopener" }) : document.createElement("button");
              el.textContent = x.label + (x.href && !x.href.startsWith("mailto") ? " ↗" : "");
              if (x.open) el.addEventListener("click", () => Viewer.open(x.open));   // Ask stays open; it is there again when the viewer closes
              if (x.go) el.addEventListener("click", () => { document.querySelector(x.go).scrollIntoView({ behavior: REDUCED ? "auto" : "smooth" }); });
              a.appendChild(el);
            });
            m.appendChild(a);
          }
          busy = false;
        }
      };
      step();
    }, REDUCED ? 0 : 550);
  }
  chips.innerHTML = ASK.map((x, i) => `<button data-i="${i}" style="--i:${i}">${x.q}</button>`).join("");
  chips.addEventListener("click", e => { const b = e.target.closest("button"); if (b) reply(ASK[+b.dataset.i]); });
  const isOpen = () => !box.hidden && !box.classList.contains("out");
  function open() {
    box.classList.remove("out"); box.hidden = false; document.body.classList.add("ask-open");
    if (!greeted) { add("her", "Hi, I'm Kriti 👋 Pick a question below and I'll answer like I would in an interview."); greeted = true; }
    $("button", chips).focus();
  }
  function close() {
    if (!isOpen()) return;
    document.body.classList.remove("ask-open");
    if (REDUCED) { box.hidden = true; return; }
    box.classList.add("out");   // play the exit, then hide
    box.addEventListener("animationend", () => { if (box.classList.contains("out")) { box.hidden = true; box.classList.remove("out"); } }, { once: true });
  }
  $$("[data-ask]").forEach(b => b.addEventListener("click", () => (isOpen() ? close() : open())));
  // Click outside closes it. Capture phase, because the hero canvas stops propagation.
  // Ignored: the Ask triggers themselves, and anything inside an open dialog (a case study opened from Ask).
  document.addEventListener("pointerdown", e => {
    if (!isOpen() || box.contains(e.target) || e.target.closest('[data-ask], [data-tool="ask"], a[href="#ask"], dialog[open]')) return;
    close();
  }, true);
  $("[data-ask-close]").addEventListener("click", close);
  addEventListener("keydown", e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); isOpen() ? close() : open(); }
    if (e.key === "Escape" && isOpen() && !$("dialog[open]")) close();
  });
})();

/* ================= LAB ================= */
(function agents() {
  // Each card opens a modal with the full story; its demo plays when the modal opens.
  const dlg = $("#agent-dlg"), body = $("#ad-body"); if (!dlg) return;
  const wait = ms => new Promise(r => setTimeout(r, REDUCED ? 0 : ms));
  let run = 0;   // bumps on every open/replay so a stale demo stops early
  const runs = {
    async research(d, id) {
      const qs = $$(".rs-quotes p", d), th = $$(".rs-theme", d), cnt = { a: 0, b: 0 }, target = { a: 6, b: 4 };
      qs.forEach(q => q.classList.remove("on")); th.forEach(t => { t.classList.remove("on"); $("i", t).textContent = "0"; });
      for (const q of qs) {
        await wait(650); if (id !== run) return; q.classList.add("on");
        const t = th.find(x => x.dataset.t === q.dataset.t); t.classList.add("on");
        cnt[q.dataset.t] = Math.min(target[q.dataset.t], cnt[q.dataset.t] + (q.dataset.t === "a" ? 3 : 4)); $("i", t).textContent = cnt[q.dataset.t];
      }
    },
    async handoff(d, id) {
      const li = $$(".hs-list li", d), sum = $(".hs-sum", d);
      li.forEach(l => l.classList.remove("scan", "done")); sum.classList.remove("on");
      for (const l of li) { await wait(120); if (id !== run) return; l.classList.add("scan"); await wait(420); l.classList.remove("scan"); l.classList.add("done"); }
      await wait(250); sum.classList.add("on");
    },
    async qa(d, id) {
      const st = $(".qa-stage", d), r = $(".qa-range", d), tags = $$(".qa-tag", d), sum = $(".qa-sum", d);
      tags.forEach(t => t.classList.remove("on")); sum.classList.remove("on");
      for (const x of [50, 20, 80, 22]) { await wait(500); if (id !== run) return; st.style.setProperty("--x", x + "%"); r.value = x; }
      for (const t of tags) { await wait(380); t.classList.add("on"); }
      await wait(300); sum.classList.add("on");
    }
  };
  let opener = null;
  $$(".ag-open").forEach(b => b.addEventListener("click", () => {
    opener = b;
    body.replaceChildren($("#agent-" + b.dataset.agent).content.cloneNode(true));
    const d = $(".ag-demo", body), play = () => runs[d.dataset.demo](d, ++run);
    $(".ad-replay", body).addEventListener("click", play);
    const r = $(".qa-range", d);
    if (r) r.addEventListener("input", () => { run++; $(".qa-stage", d).style.setProperty("--x", r.value + "%"); $$(".qa-tag", d).forEach(t => t.classList.add("on")); $(".qa-sum", d).classList.add("on"); });
    dlg.showModal(); dlg.scrollTop = 0; $(".ad-x", body).focus();
    setTimeout(play, 250);
  }));
  dlg.addEventListener("click", e => { if (e.target === dlg || e.target.closest("[data-close]")) dlg.close(); });
  dlg.addEventListener("close", () => { run++; opener?.focus(); });
})();

/* ================= COPY EMAIL ================= */
(function copy() {
  const b = $("#copy-email");
  b.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(b.dataset.email); b.textContent = "Copied ✓"; } catch { b.textContent = b.dataset.email; }
    setTimeout(() => (b.textContent = "Copy email"), 2200);
  });
})();
