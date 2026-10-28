"use client";

import { useEffect, useMemo, useRef } from "react";

type Props = {
  levels: number[][];
  text: string;
  label: string;
  className?: string;
};

const CELL_ASPECT = 1.85;
const RESOLVE_MS = 1500;
const FLARE_RADIUS = 5.5; // in cells
const FLARE_DECAY = 0.9;

// A picture printed in the page's own text: each lit cell is the next character,
// coloured from --glyph-0..7 by brightness; dim cells sit at 62% size.
// It resolves row by row from noise once, and cells flare to the accent under the pointer.
export default function GlyphPicture({ levels, text, label, className }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const rows = levels.length;
  const cols = levels[0]?.length ?? 0;

  const chars = useMemo(() => text.replace(/\s+/g, ""), [text]);
  const pre = useMemo(() => {
    let k = 0;
    return levels.map((r) => r.map((v) => (v === 0 ? " " : chars[k++ % chars.length])).join("")).join("\n");
  }, [levels, chars]);

  useEffect(() => {
    const el = wrap.current;
    const cv = canvas.current;
    if (!el || !cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const glyphOf: string[] = [];
    {
      let k = 0;
      for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) glyphOf.push(levels[j][i] ? chars[k++ % chars.length] : "");
    }
    const heat = new Float32Array(rows * cols);
    let palette: string[] = [];
    let accent = "";
    let invert = false; // on light paper the ramp runs dark to light, so the faint cells are the bright ones
    let w = 0, h = 0, cw = 0, ch = 0, sx = 1, dpr = 1;
    let start = 0;
    let raf = 0;
    // Pictures below the fold start finished and resolve the first time they enter the view.
    let resolved = true;
    let played = reduce;
    let visible = false;

    const readColors = () => {
      const cs = getComputedStyle(el);
      palette = Array.from({ length: 8 }, (_, i) => cs.getPropertyValue(`--glyph-${i}`).trim());
      accent = cs.getPropertyValue("--color-accent").trim();
      invert = cs.getPropertyValue("--glyph-invert").trim() === "1";
    };

    const size = () => {
      const r = el.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      cw = w / cols; ch = h / rows;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.font = `500 ${ch * 0.95}px "Martian Mono Variable", "Martian Mono", ui-monospace, monospace`;
      const m = ctx.measureText("M").width || ch * 0.6;
      sx = Math.min(1, (cw * 0.92) / m);
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h);
      const t = resolved ? 1 : Math.min(1, (now - start) / RESOLVE_MS);
      const doneRows = Math.floor(t * rows);
      let hot = false;
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const idx = j * cols + i;
          const lv = levels[j][i];
          if (!lv) continue;
          let g = glyphOf[idx];
          let colour = palette[lv - 1];
          const weight = invert ? 9 - lv : lv;
          let scale = weight <= 2 ? 0.62 : weight <= 4 ? 0.8 : 1;
          if (j >= doneRows) {
            if (Math.random() < 0.55) continue;
            g = chars[(Math.random() * chars.length) | 0];
            colour = palette[invert ? 7 : 0];
            scale = 0.62;
          }
          const x = (i + 0.5) * cw;
          const y = (j + 0.5) * ch;
          ctx.save();
          ctx.translate(x, y);
          ctx.scale(sx * scale, scale);
          ctx.fillStyle = colour;
          ctx.fillText(g, 0, 0);
          if (heat[idx] > 0.02) {
            ctx.globalAlpha = Math.min(1, heat[idx]);
            ctx.fillStyle = accent;
            ctx.fillText(g, 0, 0);
            heat[idx] *= FLARE_DECAY;
            hot = true;
          }
          ctx.restore();
        }
      }
      if (t >= 1) resolved = true;
      if ((!resolved || hot) && (visible || !resolved)) raf = requestAnimationFrame(draw);
      else raf = 0;
    };

    const kick = () => { if (!raf) raf = requestAnimationFrame(draw); };

    const onMove = (e: PointerEvent) => {
      if (reduce) return;
      const r = el.getBoundingClientRect();
      const ci = (e.clientX - r.left) / cw;
      const cj = (e.clientY - r.top) / ch;
      const rx = FLARE_RADIUS, ry = FLARE_RADIUS / CELL_ASPECT;
      for (let j = Math.max(0, Math.floor(cj - ry)); j <= Math.min(rows - 1, Math.ceil(cj + ry)); j++) {
        for (let i = Math.max(0, Math.floor(ci - rx)); i <= Math.min(cols - 1, Math.ceil(ci + rx)); i++) {
          const d = Math.hypot((i - ci) / rx, (j - cj) / ry);
          if (d < 1) heat[j * cols + i] = Math.max(heat[j * cols + i], 1 - d);
        }
      }
      kick();
    };

    readColors();
    size();
    el.classList.add("is-live");
    draw(performance.now());

    const ro = new ResizeObserver(() => { size(); kick(); });
    ro.observe(el);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !played) { played = true; resolved = false; start = performance.now(); }
      if (visible) kick();
    }, { threshold: 0.25 });
    io.observe(el);
    const mo = new MutationObserver(() => { readColors(); kick(); });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-mode"] });
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onScheme = () => { readColors(); kick(); };
    mq.addEventListener("change", onScheme);
    el.addEventListener("pointermove", onMove);
    document.fonts?.ready.then(() => { size(); kick(); });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect(); mo.disconnect();
      mq.removeEventListener("change", onScheme);
      el.removeEventListener("pointermove", onMove);
    };
  }, [levels, chars, rows, cols]);

  return (
    <figure className={`glyph ${className ?? ""}`} role="img" aria-label={label}>
      <div ref={wrap} className="glyph__art" style={{ aspectRatio: `${cols} / ${rows * CELL_ASPECT}` }}>
        <pre className="glyph__pre" aria-hidden="true" style={{ ["--cols" as string]: cols }}>{pre}</pre>
        <canvas ref={canvas} className="glyph__canvas" aria-hidden="true" />
      </div>
    </figure>
  );
}
