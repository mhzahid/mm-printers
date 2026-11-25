import type { ArtKind } from "@/data/types";

/**
 * Studio illustrations used until real product photography is supplied.
 * Each is drawn on a 400×400 canvas, centred, with a transparent background
 * so it can sit on the stone trim card or on ink.
 *
 * These are deliberately illustrations, not photo-real — they must never be
 * mistaken for photographs of MM Printers products.
 */

const C = {
  ink: "#171A1C",
  inkSoft: "#2A2E31",
  paper: "#F6F4EF",
  white: "#FFFFFF",
  stone: "#DCD8CE",
  signal: "#F36B35",
  kraft: "#C9B597",
  kraftDeep: "#A8916E",
  leather: "#8A5A3B",
  leatherDeep: "#6B4329",
  horn: "#4A3528",
};

function Lines({ x, y, w, n, gap = 12, color = C.ink, op = 0.55, h = 4 }: { x: number; y: number; w: number; n: number; gap?: number; color?: string; op?: number; h?: number }) {
  return (
    <g fill={color} opacity={op}>
      {Array.from({ length: n }).map((_, i) => (
        <rect key={i} x={x} y={y + i * gap} width={i === n - 1 ? w * 0.6 : w} height={h} rx={h / 2} />
      ))}
    </g>
  );
}

function Barcode({ x, y, w, h, color = C.ink }: { x: number; y: number; w: number; h: number; color?: string }) {
  const pattern = [2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 1, 3, 2, 1, 2, 1, 1, 3, 1, 2, 1, 1, 2, 3, 1, 1, 2];
  const unit = w / pattern.reduce((a, b) => a + b + 1, 0);
  let cx = x;
  return (
    <g fill={color}>
      {pattern.map((p, i) => {
        const r = <rect key={i} x={cx} y={y} width={p * unit} height={h} />;
        cx += (p + 1) * unit;
        return r;
      })}
    </g>
  );
}

function Button({ cx, cy, r, fill, rim, holes = 4, hole = C.ink, grain }: { cx: number; cy: number; r: number; fill: string; rim: string; holes?: 2 | 4; hole?: string; grain?: boolean }) {
  const d = r * 0.2;
  const hr = r * 0.085;
  const pts = holes === 4 ? [[-d, -d], [d, -d], [-d, d], [d, d]] : [[-d, 0], [d, 0]];
  return (
    <g>
      <circle cx={cx} cy={cy + 6} r={r} fill={C.ink} opacity={0.08} />
      <circle cx={cx} cy={cy} r={r} fill={fill} />
      {grain && (
        <g opacity={0.35} fill="none" stroke="#D9B58C" strokeWidth={2} strokeLinecap="round">
          <path d={`M${cx - r * 0.8} ${cy - r * 0.3} q ${r * 0.5} ${-r * 0.25} ${r * 1.5} ${r * 0.1}`} />
          <path d={`M${cx - r * 0.7} ${cy + r * 0.35} q ${r * 0.6} ${-r * 0.2} ${r * 1.4} ${r * 0.05}`} />
          <path d={`M${cx - r * 0.5} ${cy + r * 0.62} q ${r * 0.5} ${-r * 0.1} ${r * 1.0} ${0}`} opacity={0.6} />
        </g>
      )}
      <circle cx={cx} cy={cy} r={r * 0.78} fill="none" stroke={rim} strokeWidth={r * 0.07} />
      <circle cx={cx} cy={cy} r={r * 0.62} fill={rim} opacity={0.18} />
      {pts.map(([dx, dy], i) => (
        <circle key={i} cx={cx + dx} cy={cy + dy} r={hr} fill={hole} opacity={0.85} />
      ))}
    </g>
  );
}

/** A halftone patch: dot size follows a soft diagonal, like a printed photograph seen close up. */
function Halftone({ x, y, w, h, step = 12, colors }: { x: number; y: number; w: number; h: number; step?: number; colors: string[] }) {
  const dots = [];
  for (let j = 0; j * step < h; j++) {
    for (let i = 0; i * step < w; i++) {
      const t = (i / (w / step) + j / (h / step)) / 2;
      const r = step * 0.5 * (0.35 + 0.6 * Math.abs(Math.sin(t * 3.1 + j * 0.15)));
      dots.push(<circle key={`${i}-${j}`} cx={x + i * step + step / 2} cy={y + j * step + step / 2} r={r} fill={colors[(i + j * 2) % colors.length]} />);
    }
  }
  return <g>{dots}</g>;
}

/** Fabric swatch with a fine rib, used under transfers. */
function Fabric({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={3} fill={C.ink} opacity={0.08} transform="translate(5 8)" />
      <rect x={x} y={y} width={w} height={h} rx={3} fill="#E6E1D6" />
      <g stroke={C.ink} strokeWidth={1} opacity={0.07}>
        {Array.from({ length: Math.floor(w / 6) }).map((_, i) => (
          <line key={i} x1={x + 3 + i * 6} y1={y} x2={x + 3 + i * 6} y2={y + h} />
        ))}
      </g>
    </g>
  );
}

function art(kind: ArtKind) {
  switch (kind) {
    case "hang-tag":
      return (
        <g>
          <path d="M214 92 C 250 40, 320 60, 300 18" fill="none" stroke={C.ink} strokeWidth={3} strokeLinecap="round" />
          <g transform="rotate(-9 200 220)">
            <path d="M138 110 L170 82 H230 L262 110 V340 a8 8 0 0 1 -8 8 H146 a8 8 0 0 1 -8 -8 Z" fill={C.ink} opacity={0.08} transform="translate(6 8)" />
            <path d="M138 110 L170 82 H230 L262 110 V340 a8 8 0 0 1 -8 8 H146 a8 8 0 0 1 -8 -8 Z" fill={C.kraft} />
            <circle cx={200} cy={110} r={11} fill={C.paper} stroke={C.kraftDeep} strokeWidth={4} />
            <rect x={160} y={150} width={80} height={60} rx={2} fill={C.ink} />
            <rect x={174} y={170} width={52} height={6} rx={3} fill={C.paper} />
            <rect x={184} y={184} width={32} height={4} rx={2} fill={C.signal} />
            <Lines x={160} y={232} w={80} n={3} />
            <rect x={156} y={286} width={88} height={40} fill={C.paper} />
            <Barcode x={164} y={292} w={72} h={24} />
          </g>
          <path d="M214 92 C 205 100, 204 108, 202 110" fill="none" stroke={C.ink} strokeWidth={3} strokeLinecap="round" transform="rotate(-9 200 220)" />
        </g>
      );
    case "photo-inlay":
      // A printed insert card: header band, halftone product photograph, copy lines and barcode.
      return (
        <g>
          <rect x={156} y={74} width={176} height={250} rx={3} fill={C.white} transform="rotate(7 244 200)" opacity={0.85} />
          <g transform="rotate(-4 200 200)">
            <rect x={98} y={70} width={196} height={272} rx={3} fill={C.ink} opacity={0.08} transform="translate(6 8)" />
            <rect x={98} y={70} width={196} height={272} rx={3} fill={C.white} />
            <rect x={98} y={70} width={196} height={34} rx={3} fill={C.ink} />
            <rect x={114} y={84} width={70} height={7} rx={3.5} fill={C.paper} />
            <circle cx={274} cy={87} r={5} fill={C.signal} />
            <rect x={114} y={118} width={164} height={128} fill={C.paper} />
            <Halftone x={118} y={122} w={156} h={120} step={12} colors={[C.ink, C.kraftDeep, C.ink, C.signal]} />
            <Lines x={114} y={262} w={120} n={3} gap={13} />
            <Barcode x={226} y={300} w={52} h={26} />
          </g>
        </g>
      );
    case "photo-box":
      // Printed retail box with a die-cut window showing the folded garment inside.
      return (
        <g>
          <ellipse cx={200} cy={330} rx={140} ry={18} fill={C.ink} opacity={0.08} />
          <path d="M80 150 L200 112 L320 150 L200 190 Z" fill={C.paper} stroke={C.stone} strokeWidth={2} />
          <path d="M80 150 L200 190 V320 L80 280 Z" fill={C.white} />
          <path d="M320 150 L200 190 V320 L320 280 Z" fill={C.stone} />
          <path d="M80 150 L200 190 V214 L80 174 Z" fill={C.ink} />
          <path d="M104 196 L178 221 V286 L104 261 Z" fill={C.kraft} />
          <path d="M126 204 L141 223 L156 213" fill="none" stroke={C.kraftDeep} strokeWidth={4} strokeLinejoin="round" />
          <path d="M141 223 V272" stroke={C.kraftDeep} strokeWidth={2} opacity={0.6} />
          <path d="M104 196 L178 221 V286 L104 261 Z" fill="none" stroke={C.ink} strokeWidth={2} opacity={0.35} />
          <circle cx={190} cy={204} r={4} fill={C.signal} />
          <path d="M218 206 L300 178" stroke={C.ink} strokeWidth={5} opacity={0.5} strokeLinecap="round" />
          <path d="M218 222 L280 201" stroke={C.ink} strokeWidth={5} opacity={0.3} strokeLinecap="round" />
        </g>
      );
    case "sticker":
      // Size stickers as they are supplied: a run of printed labels on a backing liner, one lifting off.
      return (
        <g style={{ fontFamily: "var(--font-display), sans-serif" }}>
          <rect x={60} y={160} width={280} height={86} rx={6} fill={C.ink} opacity={0.08} transform="translate(5 8)" />
          <rect x={60} y={160} width={280} height={86} rx={6} fill={C.white} />
          <line x1={60} y1={203} x2={340} y2={203} stroke={C.ink} strokeWidth={1} strokeDasharray="3 5" opacity={0.18} />
          {["S", "M", "L"].map((size, i) => (
            <g key={size}>
              <circle cx={104 + i * 64} cy={203} r={26} fill={C.paper} stroke={C.ink} strokeWidth={2} opacity={0.95} />
              <text x={104 + i * 64} y={212} textAnchor="middle" fontWeight={800} fontSize={24} fill={C.ink}>
                {size}
              </text>
            </g>
          ))}
          <circle cx={296} cy={203} r={27} fill="none" stroke={C.ink} strokeWidth={1.5} strokeDasharray="3 4" opacity={0.3} />
          <g transform="rotate(-18 300 150)">
            <circle cx={300} cy={142} r={27} fill={C.ink} opacity={0.12} transform="translate(4 7)" />
            <circle cx={300} cy={142} r={27} fill={C.signal} />
            <text x={300} y={151} textAnchor="middle" fontWeight={800} fontSize={22} fill={C.ink}>
              XL
            </text>
          </g>
        </g>
      );
    case "heat-transfer":
      // A neck label pressed onto fabric, with the transfer's clear carrier peeling back from the corner.
      return (
        <g>
          <Fabric x={78} y={92} w={244} h={216} />
          <g fill={C.ink}>
            <rect x={142} y={150} width={116} height={14} rx={2} />
            <rect x={164} y={174} width={72} height={6} rx={3} opacity={0.7} />
            <rect x={182} y={196} width={36} height={36} rx={4} fill="none" stroke={C.ink} strokeWidth={4} />
            <rect x={190} y={208} width={20} height={12} rx={2} />
            <rect x={150} y={246} width={100} height={5} rx={2.5} opacity={0.5} />
            <rect x={166} y={258} width={68} height={5} rx={2.5} opacity={0.35} />
          </g>
          <circle cx={200} cy={136} r={4} fill={C.signal} />
          <path d="M226 92 H322 V196 C 300 172, 262 150, 226 92 Z" fill={C.white} opacity={0.55} />
          <path d="M226 92 C 262 150, 300 172, 322 196 C 296 150, 280 112, 288 74 C 262 86, 240 88, 226 92 Z" fill={C.white} stroke={C.stone} strokeWidth={2} />
          <path d="M240 96 C 266 138, 290 158, 312 176" fill="none" stroke={C.ink} strokeWidth={1.5} opacity={0.12} />
        </g>
      );
    case "photo-transfer":
      // A full-colour image transferred onto fabric (printed as halftone), carrier peeling back.
      return (
        <g>
          <Fabric x={78} y={92} w={244} h={216} />
          <rect x={120} y={128} width={160} height={144} rx={4} fill={C.paper} />
          <Halftone x={124} y={132} w={152} h={136} step={11} colors={[C.ink, C.signal, C.kraftDeep, C.ink, C.kraft]} />
          <path d="M226 92 H322 V196 C 300 172, 262 150, 226 92 Z" fill={C.white} opacity={0.55} />
          <path d="M226 92 C 262 150, 300 172, 322 196 C 296 150, 280 112, 288 74 C 262 86, 240 88, 226 92 Z" fill={C.white} stroke={C.stone} strokeWidth={2} />
        </g>
      );
    case "thermal-sticker":
      return (
        <g>
          <ellipse cx={200} cy={334} rx={150} ry={14} fill={C.ink} opacity={0.07} />
          <circle cx={120} cy={230} r={86} fill={C.white} />
          <circle cx={120} cy={230} r={86} fill="none" stroke={C.stone} strokeWidth={14} opacity={0.7} />
          <circle cx={120} cy={230} r={34} fill={C.stone} />
          <circle cx={120} cy={230} r={22} fill={C.paper} />
          <path d="M120 316 H350 V256 H170" fill="none" />
          <rect x={150} y={256} width={200} height={60} fill={C.white} />
          <rect x={164} y={264} width={80} height={44} rx={4} fill={C.paper} stroke={C.stone} />
          <Barcode x={172} y={270} w={64} h={24} />
          <rect x={256} y={264} width={80} height={44} rx={4} fill={C.paper} stroke={C.stone} />
          <Barcode x={264} y={270} w={64} h={24} />
          <rect x={172} y={298} width={40} height={4} rx={2} fill={C.ink} opacity={0.5} />
          <rect x={264} y={298} width={40} height={4} rx={2} fill={C.ink} opacity={0.5} />
        </g>
      );
    case "back-board":
      return (
        <g>
          <rect x={120} y={64} width={190} height={270} rx={2} fill={C.kraft} transform="rotate(5 215 199)" />
          <rect x={96} y={76} width={190} height={270} rx={2} fill={C.ink} opacity={0.08} transform="translate(6 8)" />
          <rect x={96} y={76} width={190} height={270} rx={2} fill={C.white} />
          <path d="M96 128 H286 M96 300 H286" stroke={C.stone} strokeWidth={2} strokeDasharray="6 6" />
          <path d="M150 76 L191 108 L232 76" fill="none" stroke={C.stone} strokeWidth={3} />
          <rect x={160} y={190} width={62} height={34} rx={2} fill={C.ink} />
          <rect x={172} y={204} width={38} height={6} rx={3} fill={C.paper} />
        </g>
      );
    case "collar-band":
      return (
        <g>
          <ellipse cx={200} cy={300} rx={130} ry={20} fill={C.ink} opacity={0.07} />
          <ellipse cx={200} cy={200} rx={130} ry={56} fill="none" stroke={C.white} strokeWidth={50} opacity={0.75} />
          <path d="M70 200 A130 56 0 0 0 330 200" fill="none" stroke={C.white} strokeWidth={50} />
          <path d="M70 200 A130 56 0 0 0 330 200" fill="none" stroke={C.stone} strokeWidth={2} transform="translate(0 25)" />
          <path d="M70 200 A130 56 0 0 0 330 200" fill="none" stroke={C.stone} strokeWidth={2} transform="translate(0 -25)" />
          <rect x={170} y={242} width={60} height={18} rx={2} fill={C.ink} />
          <rect x={182} y={249} width={36} height={4} rx={2} fill={C.signal} />
        </g>
      );
    case "care-label":
      return (
        <g>
          <path d="M150 52 h100 v300 h-100 z" fill={C.ink} opacity={0.08} transform="translate(6 8)" />
          <path d="M150 52 h100 v300 h-100 z" fill={C.white} />
          <path d="M150 52 h100 v34 h-100 z" fill={C.stone} opacity={0.6} />
          <path d="M150 86 h100" stroke={C.ink} strokeWidth={1} strokeDasharray="3 4" opacity={0.4} />
          <Lines x={166} y={104} w={68} n={4} gap={13} op={0.6} />
          <g fill="none" stroke={C.ink} strokeWidth={3} strokeLinejoin="round" opacity={0.85}>
            <path d="M166 178 l4 18 h22 l4 -18" />
            <path d="M166 182 q8 -6 15 0 t15 0" />
            <path d="M212 196 l12 -20 l12 20 z" />
            <rect x={166} y={210} width={26} height={22} />
            <circle cx={179} cy={221} r={7} />
            <path d="M212 230 h26 l-4 -16 h-14 z" />
            <circle cx={225} cy={222} r={2} fill={C.ink} />
          </g>
          <Lines x={166} y={250} w={68} n={6} gap={13} op={0.45} />
        </g>
      );
    case "woven-label":
      return (
        <g>
          <path d="M70 150 h260 v100 h-260 z" fill={C.ink} opacity={0.1} transform="translate(6 8)" />
          <path d="M70 150 h260 v100 h-260 z" fill={C.ink} />
          <path d="M70 150 l-14 8 v84 l14 8 z" fill={C.inkSoft} />
          <path d="M330 150 l14 8 v84 l-14 8 z" fill={C.inkSoft} />
          <g stroke={C.paper} opacity={0.06}>
            {Array.from({ length: 24 }).map((_, i) => (
              <path key={i} d={`M70 ${154 + i * 4} H330`} />
            ))}
          </g>
          <rect x={150} y={180} width={100} height={14} rx={2} fill={C.paper} />
          <rect x={170} y={204} width={60} height={6} rx={3} fill={C.paper} opacity={0.65} />
          <rect x={194} y={220} width={12} height={12} rx={6} fill={C.signal} />
          <path d="M82 150 v100 M318 150 v100" stroke={C.paper} strokeWidth={1.5} strokeDasharray="4 4" opacity={0.35} />
        </g>
      );
    case "satin-label":
      return (
        <g>
          <defs>
            <linearGradient id="mm-sheen" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#FFFFFF" />
              <stop offset="0.45" stopColor="#EFECE5" />
              <stop offset="0.55" stopColor="#FFFFFF" />
              <stop offset="1" stopColor="#E7E3DA" />
            </linearGradient>
          </defs>
          <g transform="rotate(-6 200 200)">
            <path d="M100 110 h200 v180 h-200 z" fill={C.ink} opacity={0.08} transform="translate(6 8)" />
            <path d="M100 110 h200 v180 h-200 z" fill="url(#mm-sheen)" />
            <path d="M100 110 h200 v24 h-200 z" fill={C.stone} opacity={0.5} />
            <rect x={140} y={158} width={120} height={10} rx={5} fill={C.ink} />
            <Lines x={140} y={186} w={120} n={5} gap={14} op={0.45} />
            <rect x={140} y={260} width={20} height={4} rx={2} fill={C.signal} />
          </g>
        </g>
      );
    case "leather-patch":
      return (
        <g>
          <rect x={80} y={120} width={240} height={160} rx={22} fill={C.ink} opacity={0.1} transform="translate(6 8)" />
          <rect x={80} y={120} width={240} height={160} rx={22} fill={C.leather} />
          <rect x={94} y={134} width={212} height={132} rx={14} fill="none" stroke="#E7CBA8" strokeWidth={2.5} strokeDasharray="7 6" opacity={0.75} />
          <ellipse cx={200} cy={200} rx={66} ry={40} fill={C.leatherDeep} />
          <ellipse cx={200} cy={198} rx={66} ry={40} fill="none" stroke="#A97553" strokeWidth={2} />
          <rect x={160} y={190} width={80} height={12} rx={3} fill="#A97553" />
          <rect x={176} y={208} width={48} height={5} rx={2.5} fill="#A97553" opacity={0.7} />
        </g>
      );
    case "rubber-patch":
      // Moulded rubber patch: raised rim, raised emblem and lettering catching light on their top edges.
      return (
        <g>
          <rect x={92} y={112} width={216} height={176} rx={30} fill={C.ink} opacity={0.12} transform="translate(6 10)" />
          <rect x={92} y={112} width={216} height={176} rx={30} fill={C.inkSoft} />
          <rect x={104} y={124} width={192} height={152} rx={22} fill="none" stroke="#474E54" strokeWidth={7} />
          <rect x={104} y={122} width={192} height={152} rx={22} fill="none" stroke="#5E666C" strokeWidth={2} opacity={0.6} />
          <g transform="translate(200 182)">
            <path d="M-42 18 L0 -26 L42 18 L26 18 L0 -8 L-26 18 Z" fill="#11141A" transform="translate(0 4)" />
            <path d="M-42 18 L0 -26 L42 18 L26 18 L0 -8 L-26 18 Z" fill={C.signal} />
            <path d="M-42 18 L0 -26 L42 18" fill="none" stroke="#FF9A70" strokeWidth={2} opacity={0.7} />
          </g>
          <rect x={146} y={226} width={108} height={12} rx={3} fill="#11141A" transform="translate(0 3)" />
          <rect x={146} y={226} width={108} height={12} rx={3} fill="#5E666C" />
          <rect x={168} y={248} width={64} height={7} rx={2} fill="#4C545A" />
        </g>
      );
    case "butterfly":
      return (
        <g>
          <ellipse cx={200} cy={318} rx={140} ry={14} fill={C.ink} opacity={0.07} />
          <path d="M200 200 L92 120 Q74 200 92 280 Z" fill={C.white} opacity={0.9} stroke={C.stone} strokeWidth={3} strokeLinejoin="round" />
          <path d="M200 200 L308 120 Q326 200 308 280 Z" fill={C.white} opacity={0.9} stroke={C.stone} strokeWidth={3} strokeLinejoin="round" />
          <rect x={186} y={170} width={28} height={60} rx={6} fill={C.signal} />
          <path d="M70 330 Q200 290 330 330" fill="none" stroke={C.white} strokeWidth={22} strokeLinecap="round" opacity={0.85} />
          <path d="M70 330 Q200 290 330 330" fill="none" stroke={C.stone} strokeWidth={2} strokeLinecap="round" transform="translate(0 -11)" />
        </g>
      );
    case "string":
      return (
        <g fill="none" strokeLinecap="round">
          <ellipse cx={200} cy={322} rx={130} ry={14} fill={C.ink} opacity={0.07} stroke="none" />
          <g stroke={C.ink} strokeWidth={4}>
            <ellipse cx={170} cy={200} rx={90} ry={54} />
            <ellipse cx={176} cy={206} rx={84} ry={50} />
            <ellipse cx={164} cy={196} rx={92} ry={58} opacity={0.7} />
          </g>
          <path d="M256 210 C 290 240, 300 280, 330 300" stroke={C.ink} strokeWidth={4} />
          <circle cx={330} cy={300} r={9} fill={C.signal} stroke="none" />
          <path d="M80 190 C 60 160, 70 120, 100 100" stroke={C.ink} strokeWidth={4} />
          <circle cx={100} cy={100} r={9} fill={C.signal} stroke="none" />
        </g>
      );
    case "lace":
      return (
        <g>
          <path d="M40 150 H360 V230 H40 Z" fill={C.white} opacity={0.9} />
          <path
            d={`M40 230 ${Array.from({ length: 10 }).map(() => `a16 16 0 0 0 32 0`).join(" ")} V230`}
            fill={C.white}
            opacity={0.9}
          />
          <g fill={C.stone}>
            {Array.from({ length: 10 }).map((_, i) => (
              <g key={i}>
                <circle cx={56 + i * 32} cy={190} r={9} />
                <circle cx={56 + i * 32} cy={232} r={5} />
                <path d={`M${56 + i * 32 - 4} 166 h8 l-4 10 z`} />
              </g>
            ))}
          </g>
          <path d="M40 158 H360" stroke={C.stone} strokeWidth={2} strokeDasharray="3 5" />
        </g>
      );
    case "plastic-button":
      return (
        <g>
          <Button cx={150} cy={170} r={72} fill={C.ink} rim={C.inkSoft} hole={C.paper} />
          <Button cx={268} cy={232} r={54} fill={C.white} rim={C.stone} />
          <Button cx={184} cy={292} r={36} fill={C.signal} rim="#D65A27" />
        </g>
      );
    case "horn-button":
      return (
        <g>
          <Button cx={160} cy={180} r={80} fill={C.horn} rim="#5C4434" hole={C.paper} grain />
          <Button cx={276} cy={262} r={50} fill="#6A4E3B" rim="#7D5F4A" hole={C.paper} grain />
        </g>
      );
    case "chalk-button":
      return (
        <g>
          <Button cx={160} cy={190} r={76} fill="#EFECE4" rim={C.stone} holes={2} />
          <Button cx={278} cy={250} r={46} fill="#E6E2D8" rim="#D2CDC1" holes={2} />
          <Button cx={250} cy={128} r={30} fill="#F3F1EB" rim={C.stone} holes={2} />
        </g>
      );
    case "drawcord":
      return (
        <g fill="none" strokeLinecap="round">
          <ellipse cx={200} cy={330} rx={150} ry={12} fill={C.ink} opacity={0.07} stroke="none" />
          <path d="M70 110 C 160 120, 120 220, 200 220 S 270 300, 340 300" stroke={C.ink} strokeWidth={16} />
          <path d="M70 110 C 160 120, 120 220, 200 220 S 270 300, 340 300" stroke={C.paper} strokeWidth={16} strokeDasharray="2 9" opacity={0.35} />
          <path d="M50 104 L76 112" stroke={C.signal} strokeWidth={18} strokeLinecap="butt" />
          <path d="M336 298 L364 306" stroke={C.signal} strokeWidth={18} strokeLinecap="butt" />
        </g>
      );
    case "tag-pin":
      return (
        <g>
          <rect x={90} y={120} width={220} height={16} rx={3} fill={C.white} />
          {Array.from({ length: 10 }).map((_, i) => {
            const x = 104 + i * 21;
            return (
              <g key={i}>
                <path d={`M${x} 136 V270`} stroke={C.ink} strokeWidth={2} opacity={0.75} />
                <path d={`M${x - 8} 270 H${x + 8}`} stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
              </g>
            );
          })}
          <path d="M90 128 H310" stroke={C.stone} strokeWidth={2} />
        </g>
      );
    case "lock-cord":
      return (
        <g fill="none" strokeLinecap="round">
          <ellipse cx={200} cy={330} rx={130} ry={12} fill={C.ink} opacity={0.07} stroke="none" />
          <path d="M200 280 C 60 260, 70 70, 200 80 C 330 70, 340 260, 230 276" stroke={C.ink} strokeWidth={5} />
          <rect x={176} y={262} width={64} height={38} rx={10} fill={C.signal} stroke="none" />
          <rect x={186} y={272} width={30} height={6} rx={3} fill={C.ink} stroke="none" opacity={0.5} />
          <path d="M240 281 l20 -8 v16 z" fill={C.ink} stroke="none" />
        </g>
      );
    case "jacquard-elastic":
      return (
        <g>
          <g transform="rotate(-8 200 200)">
            <rect x={20} y={146} width={360} height={108} fill={C.ink} opacity={0.1} transform="translate(0 8)" />
            <rect x={20} y={146} width={360} height={108} fill={C.ink} />
            <rect x={20} y={146} width={360} height={10} fill={C.signal} />
            <rect x={20} y={244} width={360} height={10} fill={C.signal} />
            <g fill={C.paper}>
              {Array.from({ length: 7 }).map((_, i) => (
                <g key={i} transform={`translate(${36 + i * 52} 0)`}>
                  <rect x={0} y={186} width={34} height={6} rx={1} />
                  <rect x={0} y={200} width={20} height={6} rx={1} opacity={0.7} />
                  <rect x={0} y={214} width={34} height={6} rx={1} />
                </g>
              ))}
            </g>
            <path d="M20 168 H380 M20 232 H380" stroke={C.paper} strokeDasharray="2 4" opacity={0.3} />
          </g>
        </g>
      );
    case "hole-elastic":
      return (
        <g>
          <g transform="rotate(-6 200 200)">
            <rect x={30} y={164} width={340} height={72} fill={C.ink} opacity={0.08} transform="translate(0 8)" />
            <rect x={30} y={164} width={340} height={72} fill={C.white} />
            <g stroke={C.stone} strokeWidth={1}>
              {Array.from({ length: 16 }).map((_, i) => (
                <path key={i} d={`M30 ${168 + i * 4.3} H370`} />
              ))}
            </g>
            {Array.from({ length: 8 }).map((_, i) => (
              <g key={i}>
                <rect x={52 + i * 40} y={192} width={22} height={16} rx={8} fill={C.ink} opacity={0.12} />
                <rect x={56 + i * 40} y={196} width={14} height={8} rx={4} fill={C.paper} stroke={C.ink} strokeWidth={1.5} />
              </g>
            ))}
          </g>
          <Button cx={322} cy={286} r={28} fill={C.ink} rim={C.inkSoft} hole={C.paper} />
        </g>
      );
    case "mobilon-tape":
      return (
        <g>
          <ellipse cx={200} cy={330} rx={150} ry={12} fill={C.ink} opacity={0.07} />
          <circle cx={150} cy={200} r={110} fill={C.white} opacity={0.55} />
          <circle cx={150} cy={200} r={110} fill="none" stroke={C.white} strokeWidth={3} />
          <circle cx={150} cy={200} r={92} fill="none" stroke={C.white} strokeWidth={1.5} opacity={0.8} />
          <circle cx={150} cy={200} r={74} fill="none" stroke={C.white} strokeWidth={1.5} opacity={0.8} />
          <circle cx={150} cy={200} r={50} fill={C.signal} />
          <circle cx={150} cy={200} r={30} fill={C.paper} />
          <path d="M150 310 H350 V290 H150" fill={C.white} opacity={0.6} stroke={C.white} strokeWidth={2} />
        </g>
      );
    case "poly-bag":
      return (
        <g>
          <rect x={96} y={70} width={208} height={272} rx={4} fill={C.ink} opacity={0.07} transform="translate(6 8)" />
          <rect x={96} y={70} width={208} height={272} rx={4} fill={C.white} opacity={0.62} />
          <rect x={96} y={70} width={208} height={272} rx={4} fill="none" stroke={C.white} strokeWidth={3} />
          <path d="M96 108 H304" stroke={C.signal} strokeWidth={4} />
          <path d="M96 116 H304" stroke={C.white} strokeWidth={2} />
          <path d="M130 70 L150 96 M270 70 L250 96" stroke={C.white} strokeWidth={2} opacity={0.8} />
          <rect x={140} y={150} width={120} height={140} rx={6} fill={C.ink} opacity={0.82} />
          <path d="M140 170 l26 -20 h68 l26 20" fill="none" stroke={C.paper} strokeWidth={3} opacity={0.4} />
          <Lines x={118} y={306} w={90} n={2} gap={11} op={0.45} />
          <circle cx={278} cy={308} r={5} fill={C.paper} stroke={C.stone} />
          <circle cx={278} cy={324} r={5} fill={C.paper} stroke={C.stone} />
          <path d="M110 84 L118 330" stroke={C.white} strokeWidth={6} opacity={0.6} strokeLinecap="round" />
        </g>
      );
    case "generic":
    default:
      return (
        <g>
          <rect x={110} y={110} width={180} height={180} rx={8} fill={C.white} />
          <path d="M150 200 H250 M200 150 V250" stroke={C.stone} strokeWidth={8} strokeLinecap="round" />
        </g>
      );
  }
}

/** Items supplied as swing tickets: their cards carry the punched hole, other cards are plain specimens. */
export const HUNG_ART: ReadonlySet<ArtKind> = new Set<ArtKind>(["hang-tag", "photo-inlay"]);

export function ProductArt({
  kind,
  label,
  className,
}: {
  kind: ArtKind;
  /** Accessible description. Omit when the art is decorative next to a visible name. */
  label?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label ? `${label} (illustration)` : undefined}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      {art(kind)}
    </svg>
  );
}
