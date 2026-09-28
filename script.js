/* ================= JavaScript ================= */
/* EDIT ME. Prices, doll styles, reviews, gallery captions, shop products, process steps, FAQ answers
   and EMAIL_TO are SAMPLES — replace with your real ones.
   IG is your profile link; IGPOST is the exact post this page was built from. */
const IG = "https://www.instagram.com/chibs_n.co/",
  IGPOST = "https://www.instagram.com/p/DZdOFrNDx4i/",
  CUR = "Rs.",
  EMAIL_TO = "hello@chibsandco.com";
const TY = [
  { n: "Rose Garden", d: "Dusty-pink dress, plum blossoms, a butterfly and a long braid — the exact design from our pinned post.", c: ["#d9a3bd", "#8e4b7a"], k: "girl" },
  { n: "Sage Meadow", d: "Soft green dress with coral wildflowers and the same braid detail.", c: ["#a9c7a0", "#d9755b"], k: "girl" },
  { n: "Sunshine", d: "Butter-yellow dress with warm orange blooms.", c: ["#f4d67a", "#d9722f"], k: "girl" },
  { n: "Lavender Fields", d: "Lilac dress with rose-pink flowers.", c: ["#b9a6e0", "#e07aa8"], k: "girl" },
  { n: "Little Gentleman", d: "A short-haired doll in a hand-painted little suit with a bow tie.", c: ["#3f7d7a", "#2c4a48"], k: "boy" },
  { n: "Name It Yours", d: "Left plain so we can paint on a name and a heart for whoever it's for.", c: ["#f3e6d8", "#c98a4f"], k: "custom" }
];
const RV = [["Lovely detail on the braid and the flowers. It arrived beautifully wrapped.", "Nimali"],
["My daughter takes hers everywhere. The painting is so neat.", "Kasun"],
["I ordered a custom doll as a gift and everyone asked where it came from.", "Dilini"]];
const WORK = [
  { src: "images/photo-2.jpg", cap: "Flower-crown collection, five ways" },
  { src: "images/photo-3.jpg", cap: "A storybook trio — sheep, chicks and a rabbit" },
  { src: "images/photo-4.jpg", cap: "Wildflower dolls, fresh from the garden" }
];
const PRODUCTS = [
  { n: "Mini Peg Doll", size: "2.5 in", price: 1200, wood: "Solid beech, hand-painted, sealed with a matte varnish.", img: WORK[2].src },
  { n: "Classic Doll", size: "4 in", price: 2400, wood: "Solid beech, hand-painted, sealed with a matte varnish.", img: WORK[0].src },
  { n: "Large Doll", size: "5.5 in", price: 3600, wood: "Solid beech, hand-painted, sealed with a matte varnish.", img: WORK[1].src },
  { n: "Family Set of Four", size: "4 in each", price: 8500, wood: "Four solid-beech dolls, hand-painted to match one another.", img: WORK[0].src },
  { n: "Custom Name Doll", size: "4 in", price: 2900, wood: "Solid beech, hand-painted with a name of your choice.", img: WORK[2].src }
];
const STEPS = [["Sand", "Every blank is smoothed by hand until the wood feels silky, with no rough edges left."],
["Prime", "A base coat seals the wood and gives the paint something even to sit on."],
["Paint", "Each detail — braid, petals, freckles — is painted by hand, one layer at a time."],
["Seal", "A protective coat locks the design in so it holds up to years of play."]];
const FAQ = [
  ["How long does an order take?", "Every doll is painted to order, so please allow a little time before it ships — custom names take a touch longer."],
  ["Are these safe for young children?", "As with most detailed peg dolls, the smaller pieces and paint finish are best suited to children over 3, with an adult nearby."],
  ["How do I clean a painted doll?", "Wipe gently with a dry or barely damp cloth. Avoid soaking it or leaving it in direct sun for long periods."],
  ["Can I request a colour that isn't listed?", "Yes — send us a message with what you have in mind and we'll let you know if it's possible."]
];

const $ = s => document.querySelector(s);
document.querySelectorAll("[data-ig]").forEach(a => a.href = IG);
document.querySelectorAll("[data-igpost]").forEach(a => a.href = IGPOST);
$("#rv").innerHTML = RV.map(r => `<div class="card reveal"><div class="stars">★★★★★</div><p>${r[0]}</p><b>${r[1]}</b></div>`).join("");
$("#gallery").innerHTML = WORK.map(w => `<figure class="reveal"><img src="${w.src}" alt="${w.cap}" loading="lazy"><figcaption>${w.cap}</figcaption></figure>`).join("");
$("#shopgrid").innerHTML = PRODUCTS.map((p, i) => `<article class="pcard reveal">
  <img src="${p.img}" alt="${p.n}" loading="lazy">
  <div class="pinfo">
<h3>${p.n}</h3>
<p class="pwood">${p.wood}</p>
<div class="prow"><span class="pprice">${CUR} ${p.price.toLocaleString()}</span><span class="psize">${p.size}</span></div>
<button class="addbtn" data-i="${i}">Add to cart</button>
  </div>
</article>`).join("");
$("#steps").innerHTML = STEPS.map((s, i) => `<div class="step reveal"><span class="stepnum">${i + 1}</span><div><h3>${s[0]}</h3><p>${s[1]}</p></div></div>`).join("");
$("#faqlist").innerHTML = FAQ.map((f, i) => `<div class="faqitem reveal"><button class="faqq" data-i="${i}" aria-expanded="false">${f[0]}<span class="faqicon">+</span></button><div class="faqa"><p>${f[1]}</p></div></div>`).join("");

/* FAQ accordion — one open at a time */
$("#faqlist").addEventListener("click", e => {
  const b = e.target.closest(".faqq"); if (!b) return;
  const item = b.parentElement, isOpen = item.classList.contains("open");
  document.querySelectorAll(".faqitem").forEach(el => { el.classList.remove("open"); el.querySelector(".faqq").setAttribute("aria-expanded", "false") });
  if (!isOpen) { item.classList.add("open"); b.setAttribute("aria-expanded", "true") }
});

/* reveal-on-scroll for anything marked .reveal (added after the innerHTML above, so those cards are included) */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target) } });
}, { threshold: .15 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

/* aesthetic gradient: every section has a palette [base, glow, glow, glow, glow] and the fixed #bgfx layer glides between them as you scroll.
   Edit the colours here — use rgba() to soften a glow so the text on top stays readable. Index = the section's data-pal number. */
const PAL = [
  ["#1a0b33", "rgba(255,120,170,.85)", "rgba(120,110,255,.85)", "rgba(255,170,110,.65)", "rgba(70,190,220,.6)"],   /* 0  hero — candy dusk */
  ["#220a30", "rgba(255,105,180,.85)", "rgba(150,100,255,.85)", "rgba(255,150,120,.65)", "rgba(255,200,130,.45)"], /* 1  instagram — bubblegum orchid */
  ["#0b2230", "rgba(60,210,180,.75)", "rgba(150,110,255,.8)", "rgba(90,170,255,.7)", "rgba(255,140,170,.5)"],     /* 2  story — mint and iris */
  ["#2a1020", "rgba(255,140,90,.85)", "rgba(255,200,120,.6)", "rgba(240,80,140,.8)", "rgba(150,90,220,.7)"],      /* 3  head and body — peach fizz */
  ["#141235", "rgba(110,120,255,.85)", "rgba(200,160,255,.65)", "rgba(255,150,200,.6)", "rgba(70,180,255,.7)"],   /* 4  process — lavender haze */
  ["#2b0e2a", "rgba(255,90,160,.85)", "rgba(255,150,190,.6)", "rgba(160,100,255,.8)", "rgba(255,180,120,.55)"],   /* 5  work — petal pop */
  ["#26092a", "rgba(200,70,180,.85)", "rgba(255,110,150,.7)", "rgba(100,90,255,.8)", "rgba(255,170,120,.5)"],     /* 6  doll styles — berry sorbet */
  ["#0c2a2a", "rgba(70,215,170,.75)", "rgba(190,240,190,.4)", "rgba(200,140,240,.7)", "rgba(255,180,160,.5)"],    /* 7  about — sage garden */
  ["#2d1220", "rgba(255,110,120,.85)", "rgba(255,180,110,.65)", "rgba(190,80,190,.8)", "rgba(255,225,130,.42)"],  /* 8  shop — golden hour */
  ["#111536", "rgba(90,110,255,.9)", "rgba(180,130,255,.75)", "rgba(255,140,190,.55)", "rgba(60,170,255,.7)"],    /* 9  faq — twilight */
  ["#2a0f2c", "rgba(255,100,170,.85)", "rgba(255,170,200,.55)", "rgba(140,100,255,.8)", "rgba(255,190,140,.5)"],  /* 10 contact — rose quartz */
  ["#150a2e", "rgba(130,70,220,.9)", "rgba(230,80,160,.75)", "rgba(60,100,230,.8)", "rgba(255,130,150,.5)"]       /* 11 reviews — midnight bloom */
];
const navEl = document.querySelector("nav"), secs = [...document.querySelectorAll("[data-pal]")], bgfx = $("#bgfx"), rotctl = $("#rotctl");
let palNow = -1, dollReady = false;
function bg() {
  const m = innerHeight / 2, s = secs.find(e => { const r = e.getBoundingClientRect(); return r.top <= m && r.bottom > m }) || secs[0], i = +s.dataset.pal;
  rotctl.classList.toggle("show", dollReady && s.classList.contains("s")); /* doll controls only where the doll is on show */
  if (i === palNow) return;
  palNow = i; PAL[i].forEach((c, j) => bgfx.style.setProperty("--g" + j, c));
}
function navState() { navEl.classList.toggle("scrolled", scrollY > 40) }
addEventListener("scroll", bg, { passive: true }); addEventListener("scroll", navState, { passive: true }); bg(); navState();

/* contact form: builds a mailto: with what was typed, since a static page has no server to send it */
$("#msgForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = $("#mName").value.trim(), email = $("#mEmail").value.trim(), msg = $("#mMsg").value.trim(), note = $("#formNote");
  if (!name || !email || !msg) { note.textContent = "Please fill in every field."; return }
  if (!/^\S+@\S+\.\S+$/.test(email)) { note.textContent = "That email address doesn't look right."; return }
  const subject = encodeURIComponent(`Message from ${name} via the website`),
    body = encodeURIComponent(`From: ${name} (${email})\n\n${msg}`);
  location.href = `mailto:${EMAIL_TO}?subject=${subject}&body=${body}`;
  note.textContent = "Opening your email app…";
});

/* ---- cart: in-memory only (no localStorage), so it resets on reload — see the note under the checkout button ---- */
let cart = []; // {pi: index into PRODUCTS, qty: number}
function renderCart() {
  const wrap = $("#cartItems");
  wrap.innerHTML = cart.length ? cart.map((c, i) => {
    const p = PRODUCTS[c.pi]; return `<div class="citem">
<img src="${p.img}" alt="">
<div class="cinfo"><b>${p.n}</b><small>${p.wood}</small>
  <div class="cqty"><button data-a="dec" data-i="${i}">−</button><span>${c.qty}</span><button data-a="inc" data-i="${i}">+</button></div>
</div>
<div class="cright"><span>${CUR} ${(p.price * c.qty).toLocaleString()}</span><button class="rm" data-a="rm" data-i="${i}">Remove</button></div>
  </div>`}).join("") : '<p class="cartempty">Your cart is empty.</p>';
  const sub = cart.reduce((s, c) => s + PRODUCTS[c.pi].price * c.qty, 0);
  $("#cartSubtotal").textContent = `${CUR} ${sub.toLocaleString()}`;
  $("#cartCount").textContent = cart.reduce((s, c) => s + c.qty, 0);
}
function addToCart(pi) { const row = cart.find(c => c.pi === pi); if (row) row.qty++; else cart.push({ pi, qty: 1 }); renderCart(); openCart() }
$("#cartItems").addEventListener("click", e => {
  const b = e.target.closest("button[data-a]"); if (!b) return;
  const i = +b.dataset.i, a = b.dataset.a;
  if (a === "inc") cart[i].qty++;
  else if (a === "dec") { cart[i].qty--; if (cart[i].qty <= 0) cart.splice(i, 1) }
  else if (a === "rm") cart.splice(i, 1);
  renderCart();
});
$("#shopgrid").addEventListener("click", e => {
  const b = e.target.closest(".addbtn"); if (!b) return;
  addToCart(+b.dataset.i);
  b.textContent = "Added ✓"; b.classList.add("added");
  setTimeout(() => { b.textContent = "Add to cart"; b.classList.remove("added") }, 1200);
});
const cartDrawer = $("#cartDrawer"), cartOverlay = $("#cartOverlay");
function openCart() { cartDrawer.classList.add("open"); cartOverlay.classList.add("open"); cartDrawer.setAttribute("aria-hidden", "false") }
function closeCart() { cartDrawer.classList.remove("open"); cartOverlay.classList.remove("open"); cartDrawer.setAttribute("aria-hidden", "true") }
$("#cartBtn").addEventListener("click", openCart);
$("#cartClose").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);
$("#checkoutBtn").addEventListener("click", () => {
  if (!cart.length) { openCart(); return }
  const lines = cart.map(c => { const p = PRODUCTS[c.pi]; return `${c.qty} x ${p.n} (${CUR} ${p.price.toLocaleString()} each)` }).join("\n"),
    sub = cart.reduce((s, c) => s + PRODUCTS[c.pi].price * c.qty, 0),
    subject = encodeURIComponent("New order from the website"),
    body = encodeURIComponent(`I'd like to order:\n\n${lines}\n\nSubtotal: ${CUR} ${sub.toLocaleString()}\n\nMy name:\nMy address:\n`);
  location.href = `mailto:${EMAIL_TO}?subject=${subject}&body=${body}`;
});
renderCart();

if (window.THREE) {
  const T = THREE, cv = $("#c"), ren = new T.WebGLRenderer({ canvas: cv, alpha: true, antialias: true }), sc = new T.Scene(), cam = new T.PerspectiveCamera(32, 1, .1, 50);
  ren.setPixelRatio(Math.min(devicePixelRatio, 2)); ren.outputEncoding = T.sRGBEncoding;
  cam.position.set(0, 1.9, 7.2); cam.lookAt(0, 1.4, 0);
  sc.add(new T.HemisphereLight(0xfff2e0, 0x2a1620, 1.05));
  const dl = new T.DirectionalLight(0xffffff, 1); dl.position.set(3, 5, 6); sc.add(dl);
  const rim = new T.DirectionalLight(0xff9fc0, .65); rim.position.set(-4, 2, -3); sc.add(rim);
  const heroH1 = document.querySelector(".hero h1"), heroT = document.querySelector(".hero .t");

  /* paint the dress onto a canvas — branches by doll kind */
  function paint(t, nameOverride) {
    const k = document.createElement("canvas"); k.width = 1024; k.height = 512; const g = k.getContext("2d");
    const dot = (x, y, r, f) => { g.fillStyle = f; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill() };
    g.fillStyle = "#dba36a"; g.fillRect(0, 0, 1024, 512);
    g.fillStyle = t.c[0]; g.fillRect(0, 130, 1024, 400);
    if (t.k === "girl") {
      for (let x = 0; x < 1024; x += 34)dot(x, 148, 4, "rgba(255,255,255,.85)");
      for (let i = 0; i < 50; i++)dot(i * 197 % 1024, 170 + i * 83 % 270, 3, "rgba(255,255,255,.7)");
      const flower = (x, y, r) => {
        g.strokeStyle = "#7fa06a"; g.lineWidth = 6; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x - 20, (y + 440) / 2, x - 10, 440); g.stroke();
        g.fillStyle = "#93b57a";
        for (const s of [.35, .65]) {
          const yy = y + (440 - y) * s;
          g.beginPath(); g.ellipse(x - 24, yy, 22, 8, -.7, 0, 7); g.fill(); g.beginPath(); g.ellipse(x + 6, yy, 22, 8, .7, 0, 7); g.fill()
        }
        for (let i = 0; i < 5; i++)dot(x + r * 1.1 * Math.cos(i * 1.2566), y + r * 1.1 * Math.sin(i * 1.2566), r, t.c[1]);
        dot(x, y, r * .55, "#fff")
      };
      [[610, 330, 20], [705, 290, 24], [380, 390, 18], [860, 350, 22], [120, 330, 20], [260, 410, 18], [960, 410, 16]].forEach(a => flower(...a));
      g.fillStyle = "#fff";
      [[478, 245, 34, -.5], [530, 245, 34, .5], [482, 282, 24, .6], [526, 282, 24, -.6]].forEach(w => { g.beginPath(); g.ellipse(w[0], w[1], w[2], w[2] * .58, w[3], 0, 7); g.fill() });
      g.fillRect(503, 235, 7, 58);
      for (let i = 0; i < 10; i++)dot(545 + i * 24, 225 - Math.sin(i / 9 * 3) * 40, 4, "#fff");
    } else if (t.k === "boy") {
      g.fillStyle = t.c[1];
      for (let y = 175; y < 480; y += 52)dot(512, y, 9, t.c[1]);
      g.strokeStyle = "rgba(255,255,255,.3)"; g.lineWidth = 4;
      g.beginPath(); g.moveTo(392, 150); g.lineTo(470, 235); g.lineTo(392, 330); g.stroke();
      g.beginPath(); g.moveTo(632, 150); g.lineTo(554, 235); g.lineTo(632, 330); g.stroke();
    } else {
      g.strokeStyle = "rgba(160,110,80,.5)"; g.lineWidth = 4; g.setLineDash([12, 10]);
      g.strokeRect(70, 170, 884, 320); g.setLineDash([]);
      g.fillStyle = t.c[1]; g.textAlign = "center"; g.font = "italic 700 96px Georgia, serif";
      g.fillText(nameOverride || "Add a Name", 512, 300);
      g.fillStyle = "#e78ca0";
      g.beginPath(); g.moveTo(512, 355); g.bezierCurveTo(468, 315, 405, 338, 405, 383); g.bezierCurveTo(405, 428, 512, 468, 512, 468);
      g.bezierCurveTo(512, 468, 619, 428, 619, 383); g.bezierCurveTo(619, 338, 556, 315, 512, 355); g.fill();
    }
    const texOut = new T.CanvasTexture(k); texOut.encoding = T.sRGBEncoding; texOut.anisotropy = 8; return texOut;
  }
  let customName = "Ava";
  const tex = TY.map(t => paint(t, customName));

  /* the doll: lathe body, sphere head, hair, braid, and a swappable bow tie */
  const doll = new T.Group(), hg = new T.Group();
  const P = [[0, 0], [.5, 0], [.6, .05]];
  for (let i = 0; i <= 20; i++) { const y = .1 + i * .084; P.push([y < 1.35 ? .64 - .31 * y / 1.35 : .3 - (y - 1.35) * .1, y]) }
  P.push([0, 1.78]);
  const body = new T.Mesh(new T.LatheGeometry(P.map(p => new T.Vector2(p[0], p[1])), 48), new T.MeshStandardMaterial({ map: tex[0], roughness: .7 }));
  body.rotation.y = Math.PI; doll.add(body);
  const wood = new T.MeshStandardMaterial({ color: 0xe0a96d, roughness: .55 }),
    brown = new T.MeshStandardMaterial({ color: 0x7a4a2b, roughness: .8, side: T.DoubleSide });
  hg.add(new T.Mesh(new T.SphereGeometry(.5, 40, 28), wood));
  hg.add(new T.Mesh(new T.SphereGeometry(.518, 40, 20, 0, Math.PI * 2, 0, 1.15), brown));
  hg.add(new T.Mesh(new T.SphereGeometry(.515, 40, 20, Math.PI, Math.PI), brown));
  [-1, 1].forEach(s => { const e = new T.Mesh(new T.SphereGeometry(.05, 12, 12), new T.MeshBasicMaterial({ color: 0x1a1210 })); e.position.set(s * .17, 0, .465); hg.add(e) });
  const fl = new T.Group(), pm = new T.MeshStandardMaterial({ color: 0xf3b6cf });
  for (let i = 0; i < 5; i++) { const m = new T.Mesh(new T.SphereGeometry(.07, 12, 8), pm); m.position.set(Math.cos(i * 1.2566) * .085, Math.sin(i * 1.2566) * .085, 0); m.scale.z = .4; fl.add(m) }
  const ctr = new T.Mesh(new T.SphereGeometry(.04, 10, 8), new T.MeshStandardMaterial({ color: 0xfff2c8 })); ctr.position.z = .02; fl.add(ctr);
  const dir = new T.Vector3(-.5, .75, .45).normalize();
  fl.position.copy(dir).multiplyScalar(.53); fl.quaternion.setFromUnitVectors(new T.Vector3(0, 0, 1), dir); hg.add(fl);
  hg.position.y = 2.2; doll.add(hg);
  const braidGroup = new T.Group();
  for (let k = 0; k < 10; k++) {
    const y = 1.52 - k * .1, r = (y < 1.35 ? .64 - .31 * y / 1.35 : .3) + .04, a = -.9, o = k % 2 ? .03 : -.03,
      m = new T.Mesh(new T.SphereGeometry(.09 - k * .004, 14, 10), brown);
    m.position.set(r * Math.sin(a) + o * Math.cos(a), y, r * Math.cos(a) - o * Math.sin(a)); m.scale.set(1, 1.35, 1); m.rotation.z = k % 2 ? .5 : -.5; braidGroup.add(m)
  }
  [-1, 1].forEach(s => { const b = new T.Mesh(new T.SphereGeometry(.05, 10, 8), new T.MeshStandardMaterial({ color: 0xffffff })); b.position.set(-.5 + s * .05, .55, .42); b.scale.set(1.4, .8, .8); braidGroup.add(b) });
  doll.add(braidGroup);
  const bowtie = new T.Group(), btMat = new T.MeshStandardMaterial({ color: 0x24343a, roughness: .6 });
  const wing = new T.ConeGeometry(.1, .065, 3);
  const wL = new T.Mesh(wing, btMat); wL.rotation.z = Math.PI / 2; wL.position.x = -.085; bowtie.add(wL);
  const wR = new T.Mesh(wing, btMat); wR.rotation.z = -Math.PI / 2; wR.position.x = .085; bowtie.add(wR);
  bowtie.add(new T.Mesh(new T.SphereGeometry(.04, 10, 8), btMat));
  bowtie.position.set(0, 1.56, .28); bowtie.rotation.x = .1; bowtie.visible = false; doll.add(bowtie);
  const sh = new T.Mesh(new T.CircleGeometry(.9, 32), new T.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: .35 }));
  sh.rotation.x = -Math.PI / 2; sh.position.y = .01; doll.add(sh); sc.add(doll);

  /* doll-variety picker */
  $("#chips").innerHTML = TY.map((t, i) => `<button aria-pressed="false"><i style="background:${t.c[0]}"></i>${t.n}</button>`).join("");
  const chips = [...document.querySelectorAll("#chips button")], nameField = $("#nameField"), nameInput = $("#nameInput");
  let curI = 0;
  function pick(i) {
    curI = i; const t = TY[i];
    body.material.map = tex[i]; body.material.needsUpdate = true;
    const girl = t.k === "girl";
    braidGroup.visible = girl; fl.visible = girl; bowtie.visible = t.k === "boy";
    nameField.style.display = t.k === "custom" ? "block" : "none";
    $("#tn").textContent = t.n + "."; $("#td").textContent = t.d;
    chips.forEach((b, j) => b.setAttribute("aria-pressed", j == i));
  }
  chips.forEach((b, i) => b.onclick = () => pick(i));
  pick(0);
  nameInput.addEventListener("input", () => {
    customName = nameInput.value.trim() || "Add a Name";
    const ci = TY.findIndex(x => x.k === "custom");
    tex[ci] = paint(TY[ci], customName);
    if (curI === ci) { body.material.map = tex[ci]; body.material.needsUpdate = true }
  });

  /* scroll story: [section, x, scale, head lift] — one entry per section, in page order */
  const K = [[0, 0, 1, 0], [1, -1.3, .88, 0], [2, -1.5, 1.1, 0], [3, 1.5, .95, .95], [4, 0, .9, .3], [5, 0, .82, 0], [6, -1.4, 1.02, 0], [7, 1.3, 1.0, 0], [8, 0, .9, 0], [9, -.5, .8, 0], [10, 0, .78, 0]];
  function at(p) { const M = K.length - 1; p = Math.max(0, Math.min(M, p)); const i = Math.min(Math.floor(p), M - 1), a = K[i], b = K[i + 1], t = p - i, e = t * t * (3 - 2 * t); return [1, 2, 3].map(j => a[j] + (b[j] - a[j]) * e) }
  function rs() { ren.setSize(innerWidth, innerHeight, false); cam.aspect = innerWidth / innerHeight; cam.updateProjectionMatrix() }
  rs(); addEventListener("resize", rs);
  const FADE_AT = K.length - 1;
  let cur = [0, 1, 0], rot = 0;

  /* manual rotation: drag the doll (mouse or finger) or tap the ‹ › ↺ buttons — it adds to the scroll-driven spin.
     A press only grabs the doll when it lands on it (its box on screen), and vertical swipes still scroll (body has touch-action:pan-y). */
  let man = 0, manGoal = null, manVel = 0, dragId = null, lastX = 0, lastT = 0, dollRect = null;
  const NO_DRAG = "a,button,input,textarea,select,label,summary,nav,.cart-drawer,.cart-overlay,.rotctl", vTmp = new T.Vector3();
  function updRect() {
    const top = hg.position.y + .6; let l = 1e9, r = -1e9, t = 1e9, b = -1e9;
    for (const x of [-.75, .75]) for (const y of [0, top]) for (const z of [-.75, .75]) {
      vTmp.set(x, y, z).applyMatrix4(doll.matrixWorld).project(cam);
      const sx = (vTmp.x + 1) / 2 * innerWidth, sy = (1 - vTmp.y) / 2 * innerHeight;
      l = Math.min(l, sx); r = Math.max(r, sx); t = Math.min(t, sy); b = Math.max(b, sy);
    }
    dollRect = { l: l - 60, r: r + 60, t: t - 40, b: b + 40 };
  }
  const overDoll = (x, y, anywhere) => rotctl.classList.contains("show") && cv.style.opacity > .25 && (anywhere || (!!dollRect && x >= dollRect.l && x <= dollRect.r && y >= dollRect.t && y <= dollRect.b));
  $("#rotL").addEventListener("click", () => { manVel = 0; manGoal = (manGoal === null ? man : manGoal) - Math.PI / 4 });
  $("#rotR").addEventListener("click", () => { manVel = 0; manGoal = (manGoal === null ? man : manGoal) + Math.PI / 4 });
  $("#rotReset").addEventListener("click", () => { manVel = 0; manGoal = Math.round(man / (Math.PI * 2)) * Math.PI * 2 });
  addEventListener("pointerdown", e => {
    if (dragId !== null || (e.pointerType === "mouse" && e.button !== 0) || e.target.closest(NO_DRAG) || !overDoll(e.clientX, e.clientY, e.pointerType !== "mouse")) return; /* touch: swipe sideways anywhere on a doll screen */
    dragId = e.pointerId; lastX = e.clientX; lastT = e.timeStamp; manGoal = null; manVel = 0; document.body.classList.add("spinning");
    try { e.target.setPointerCapture(e.pointerId) } catch (_) { }
  });
  addEventListener("pointermove", e => {
    if (e.pointerId === dragId) { const d = (e.clientX - lastX) * .012; lastX = e.clientX; lastT = e.timeStamp; man += d; manVel = Math.max(-.25, Math.min(.25, d)) }
    else if (dragId === null && e.pointerType === "mouse") document.documentElement.style.cursor = !e.target.closest(NO_DRAG) && overDoll(e.clientX, e.clientY) ? "grab" : "";
  });
  function endDrag(e) { if (e.pointerId !== dragId) return; dragId = null; document.body.classList.remove("spinning"); if (e.timeStamp - lastT > 90) manVel = 0 }
  addEventListener("keydown", e => { /* ← → also turn the doll (not while typing) */
    if (!rotctl.classList.contains("show") || e.target.closest("input,textarea,select")) return;
    if (e.key === "ArrowLeft") { manVel = 0; manGoal = (manGoal === null ? man : manGoal) - Math.PI / 4 }
    if (e.key === "ArrowRight") { manVel = 0; manGoal = (manGoal === null ? man : manGoal) + Math.PI / 4 }
  });
  addEventListener("pointerup", endDrag); addEventListener("pointercancel", endDrag);
  dollReady = true; bg();

  (function loop() {
    const p = scrollY / innerHeight, tg = at(p), M = innerWidth < 800;
    cur = cur.map((v, i) => v + (tg[i] - v) * .1); rot += (p * Math.PI * 1.6 - rot) * .1;
    if (dragId === null) { /* glide to a button-press target, or coast after a flick */
      if (manGoal !== null) { man += (manGoal - man) * .12; if (Math.abs(manGoal - man) < .002) { man = manGoal; manGoal = null } }
      else if (Math.abs(manVel) > .0004) { man += manVel; manVel *= .94 } else manVel = 0;
    }
    doll.position.set(M ? 0 : cur[0], M ? .5 : 0, 0); doll.scale.setScalar(cur[1] * (M ? .8 : 1));
    hg.position.y = 2.2 + cur[2]; doll.rotation.y = rot + man;
    cv.style.opacity = Math.max(0, Math.min(1, (FADE_AT - p) / .4));
    const heroFade = Math.max(0, 1 - p * 1.15);
    heroH1.style.transform = `translateY(${(p * -70).toFixed(1)}px)`; heroH1.style.opacity = heroFade;
    heroT.style.transform = `translateY(${(p * 40).toFixed(1)}px)`; heroT.style.opacity = heroFade;
    ren.render(sc, cam); updRect(); requestAnimationFrame(loop);
  })();
}
  
