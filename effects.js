/* ===== Motion layer: scroll progress, hero intro, stagger, tilt, parallax, magnetic buttons, cursor light, petals ===== */
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(pointer: fine)").matches;
  const $$ = s => [...document.querySelectorAll(s)];
  const lerp = (a, b, t) => a + (b - a) * t;

  /* stagger: each .reveal gets a small delay based on its position among siblings */
  $$(".reveal").forEach(el => {
    const i = [...el.parentElement.children].filter(c => c.classList.contains("reveal")).indexOf(el);
    el.style.setProperty("--d", (Math.max(i, 0) % 6) * 0.09 + "s");
  });

  if (reduce) return;

  document.body.prepend(Object.assign(document.createElement("div"), { id: "rays" }));   /* sunlight rays */

  /* scroll progress bar */
  const bar = Object.assign(document.createElement("div"), { id: "progress" });
  document.body.append(bar);

  /* hero intro: title, tagline and hint fade up in sequence */
  $$(".hero h1, .hero .t, .hero p, .hero .divider").forEach((el, i) => {
    el.animate(
      [{ opacity: 0, transform: "translateY(40px) scale(.94)", letterSpacing: "0.12em" },
       { opacity: 1, transform: "none", letterSpacing: "normal" }],
      { duration: 1400, delay: 250 + i * 220, easing: "cubic-bezier(.2,.8,.2,1)", fill: "backwards" }
    );
  });

  /* tilt + glare */
  if (fine) {
    $$(".pcard, .card, .gallery figure, .igcard, .step").forEach(el => {
      el.classList.add("tilt");
      const g = Object.assign(document.createElement("i"), { className: "glare" });
      el.append(g);
      el.addEventListener("pointermove", e => {
        const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        el.style.transition = "transform .12s ease-out";
        el.style.transform = `perspective(900px) rotateX(${(.5 - y) * 9}deg) rotateY(${(x - .5) * 11}deg) translateY(-6px)`;
        el.style.setProperty("--gx", x * 100 + "%"); el.style.setProperty("--gy", y * 100 + "%");
      });
      el.addEventListener("pointerleave", () => {
        el.style.transition = "transform .7s cubic-bezier(.2,.8,.2,1)"; el.style.transform = "";
      });
    });

    /* magnetic buttons */
    $$(".pill").forEach(b => {
      b.addEventListener("pointermove", e => {
        const r = b.getBoundingClientRect();
        b.style.translate = `${(e.clientX - r.left - r.width / 2) * .22}px ${(e.clientY - r.top - r.height / 2) * .3}px`;
      });
      b.addEventListener("pointerleave", () => { b.style.translate = ""; });
    });
  }

  /* cursor light (also moves the 3D doll's key light, so the doll is lit from where you point) */
  const glow = Object.assign(document.createElement("div"), { id: "glow" });
  document.body.append(glow);
  let mx = innerWidth / 2, my = innerHeight / 2, gx = mx, gy = my;
  addEventListener("pointermove", e => { mx = e.clientX; my = e.clientY; if (fine) glow.classList.add("on"); });
  document.addEventListener("pointerleave", () => glow.classList.remove("on"));

  /* petals + dust */
  const cv = Object.assign(document.createElement("canvas"), { id: "fx" });
  document.body.append(cv);
  const ctx = cv.getContext("2d");
  let W, H, dpr;
  const size = () => { dpr = Math.min(devicePixelRatio, 2); W = cv.width = innerWidth * dpr; H = cv.height = innerHeight * dpr; };
  size(); addEventListener("resize", size);
  const cols = ["255,170,200", "255,205,190", "255,240,225", "230,190,255"];
  const N = innerWidth < 700 ? 16 : 30;
  const P = Array.from({ length: N }, () => mk(true));
  function mk(anywhere) {
    const z = Math.random();                       /* depth: 0 far … 1 near */
    return { x: Math.random() * innerWidth, y: anywhere ? Math.random() * innerHeight : -30, z,
      s: 4 + z * 11, vy: .25 + z * .9, ph: Math.random() * 6.28, sw: .4 + Math.random() * .8,
      rot: Math.random() * 6.28, vr: (Math.random() - .5) * .03, c: cols[(Math.random() * cols.length) | 0], dust: Math.random() < .35 };
  }
  let lastY = scrollY, wind = 0, t = 0, vis = true;
  document.addEventListener("visibilitychange", () => { vis = !document.hidden; });

  function frame() {
    requestAnimationFrame(frame);
    if (!vis) return;
    t += .016;
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    wind = lerp(wind, Math.max(-6, Math.min(6, (scrollY - lastY) * .25)), .08); lastY = scrollY;   /* scrolling = gust of wind */

    gx = lerp(gx, mx, .12); gy = lerp(gy, my, .12);
    glow.style.transform = `translate(${gx}px, ${gy}px)`;
    if (window.__dollLight) {
      const L = window.__dollLight;
      L.position.x = lerp(L.position.x, 3 + (mx / innerWidth - .5) * 7, .06);
      L.position.y = lerp(L.position.y, 5 + (.5 - my / innerHeight) * 4, .06);
    }

    $$(".gallery img, .igcard img").forEach(img => {   /* parallax */
      const r = img.parentElement.getBoundingClientRect();
      img.style.setProperty("--py", ((r.top + r.height / 2 - innerHeight / 2) * -.06).toFixed(1) + "px");
    });

    ctx.clearRect(0, 0, W, H);
    for (const p of P) {
      p.y += p.vy - wind * p.z * .35; p.x += Math.sin(t * p.sw + p.ph) * .5 * (.4 + p.z) + wind * p.z; p.rot += p.vr;
      if (p.y > innerHeight + 30 || p.y < -60) Object.assign(p, mk(false), { y: p.y < 0 ? innerHeight + 20 : -30 });
      if (p.x < -40) p.x = innerWidth + 30; if (p.x > innerWidth + 40) p.x = -30;
      ctx.save(); ctx.translate(p.x * dpr, p.y * dpr); ctx.rotate(p.rot);
      ctx.globalAlpha = (p.dust ? .35 : .5) * (.35 + p.z * .65);
      const r = p.s * dpr * (p.dust ? .3 : 1), g = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
      g.addColorStop(0, `rgba(${p.c},1)`); g.addColorStop(1, `rgba(${p.c},0)`);
      ctx.fillStyle = g; ctx.beginPath();
      p.dust ? ctx.arc(0, 0, r, 0, 6.28) : ctx.ellipse(0, 0, r, r * .55 * Math.abs(Math.cos(t * .8 + p.ph)) + r * .12, 0, 0, 6.28);   /* petals flutter */
      ctx.fill(); ctx.restore();
    }
  }
  frame();
})();
