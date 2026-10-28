// A waxing gibbous Moon reduced to a grid of brightness levels (0 = blank, 1..8 = lit),
// built deterministically so the server-rendered <pre> and the canvas draw the same picture.

export const MOON_COLS = 120;
export const CELL_ASPECT = 1.85; // a cell is 1.85 times as tall as it is wide
export const MOON_ROWS = Math.round(MOON_COLS / CELL_ASPECT);

// The text the Moon is printed in: the page's own words, in order.
export const MOON_TEXT =
  "evaluate before you trust the number. federated learning over lossy wireless links. ns-3. c++. pytorch. " +
  "slide-level splits. linear probes. grad-cam. adaptive upload staggering. yachay tech. urcuqui. ecuador. " +
  "vision and language. physics first. next.js. django. electron. esp32. des. ";

function rand(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Blob = { x: number; y: number; r: number; d: number };

// Maria, placed roughly where they sit on the near side.
const MARIA: Blob[] = [
  { x: -0.36, y: -0.36, r: 0.3, d: 0.5 }, // Imbrium
  { x: 0.1, y: -0.4, r: 0.18, d: 0.46 }, // Serenitatis
  { x: 0.26, y: -0.1, r: 0.22, d: 0.44 }, // Tranquillitatis
  { x: 0.56, y: -0.3, r: 0.12, d: 0.5 }, // Crisium
  { x: -0.64, y: 0.0, r: 0.34, d: 0.4 }, // Procellarum
  { x: -0.2, y: 0.24, r: 0.17, d: 0.36 }, // Nubium
  { x: 0.46, y: 0.16, r: 0.15, d: 0.38 }, // Fecunditatis
  { x: 0.2, y: 0.14, r: 0.12, d: 0.34 }, // Nectaris
  { x: -0.5, y: -0.62, r: 0.16, d: 0.36 }, // Frigoris
];

export function moonLevels(): number[][] {
  const r = rand(1307);
  const craters: Blob[] = [];
  for (let i = 0; i < 46; i++) {
    const a = r() * Math.PI * 2;
    const d = Math.sqrt(r()) * 0.95;
    craters.push({ x: Math.cos(a) * d, y: Math.sin(a) * d, r: 0.025 + r() * 0.07, d: 0.12 + r() * 0.16 });
  }
  // Tycho with its bright rim, low on the disc
  craters.push({ x: -0.12, y: 0.66, r: 0.05, d: -0.25 });

  const light = norm([-0.62, -0.16, 0.77]);
  const rows: number[][] = [];
  for (let j = 0; j < MOON_ROWS; j++) {
    const row: number[] = [];
    for (let i = 0; i < MOON_COLS; i++) {
      const x = ((i + 0.5) / MOON_COLS) * 2 - 1;
      const y = ((j + 0.5) / MOON_ROWS) * 2 - 1;
      const rr = x * x + y * y;
      if (rr > 1) { row.push(0); continue; }
      const z = Math.sqrt(1 - rr);
      const diffuse = Math.max(0, x * light[0] + y * light[1] + z * light[2]);
      let albedo = 1;
      for (const m of MARIA) albedo -= m.d * falloff(x, y, m);
      for (const c of craters) {
        const dist = Math.hypot(x - c.x, y - c.y) / c.r;
        if (dist < 1) albedo -= c.d * (1 - dist * dist) * 0.9;
        else if (dist < 1.35) albedo += Math.abs(c.d) * 0.35 * (1.35 - dist);
      }
      const lit = smooth(0.02, 0.32, diffuse); // a sharp terminator, a flat lit face
      const limb = 0.86 + 0.14 * z;
      const b = Math.min(1, Math.max(0, albedo * 0.8 * lit * limb + 0.03));
      row.push(b < 0.07 ? 0 : Math.min(8, Math.max(1, Math.ceil(Math.pow(b, 1.6) * 8))));
    }
    rows.push(row);
  }
  return rows;
}

function smooth(a: number, b: number, v: number) {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

function falloff(x: number, y: number, b: Blob) {
  const d = Math.hypot(x - b.x, y - b.y) / b.r;
  return d >= 1 ? 0 : (1 - d * d) * (1 - d * d);
}

function norm(v: number[]) {
  const l = Math.hypot(v[0], v[1], v[2]);
  return [v[0] / l, v[1] / l, v[2] / l];
}

// The static stand-in: each lit cell takes the next printable character of the text.
export function moonPre(levels: number[][], text: string): string {
  const chars = text.replace(/\s+/g, "");
  let k = 0;
  return levels
    .map((row) => row.map((lv) => (lv === 0 ? " " : chars[k++ % chars.length])).join(""))
    .join("\n");
}
