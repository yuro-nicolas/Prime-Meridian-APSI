/* ---------------------------------------------------------
   Atom. House illustrations stand in for real photography.
   Same SVG per `style`, reused across every card, the detail
   page, and the About page portrait — a single component
   taking `style` as a prop instead of six near-duplicate blocks.
---------------------------------------------------------- */
const wall = "var(--sage-150)";
const roof = "var(--green-700)";
const trim = "var(--brass)";
const line = "var(--green-900)";

function Windows({ xs, y, w, h }) {
  return xs.map((x) => (
    <rect key={x} x={x} y={y} width={w} height={h} fill="var(--surface)" stroke={line} strokeWidth="1.5" />
  ));
}

const BODIES = {
  craftsman: (
    <>
      <polygon points="30,70 120,28 210,70" fill={roof} />
      <rect x="45" y="70" width="150" height="70" fill={wall} stroke={line} strokeWidth="1.5" />
      <Windows xs={[62, 148]} y={90} w={26} h={22} />
      <rect x="110" y="98" width="20" height="42" fill={trim} />
      <rect x="30" y="140" width="180" height="8" fill={line} />
      <line x1="55" y1="140" x2="55" y2="112" stroke={line} strokeWidth="4" />
      <line x1="185" y1="140" x2="185" y2="112" stroke={line} strokeWidth="4" />
    </>
  ),
  modern: (
    <>
      <rect x="30" y="55" width="180" height="10" fill={roof} />
      <rect x="40" y="65" width="160" height="75" fill={wall} stroke={line} strokeWidth="1.5" />
      <rect x="52" y="80" width="90" height="45" fill="var(--surface)" stroke={line} strokeWidth="1.5" />
      <rect x="160" y="95" width="26" height="30" fill={trim} />
      <rect x="30" y="140" width="180" height="8" fill={line} />
    </>
  ),
  farmhouse: (
    <>
      <polygon points="35,68 120,26 205,68" fill={roof} />
      <rect x="50" y="68" width="140" height="72" fill={wall} stroke={line} strokeWidth="1.5" />
      <Windows xs={[65, 100, 150]} y={88} w={20} h={18} />
      <rect x="108" y="104" width="22" height="36" fill={trim} />
      <rect x="42" y="122" width="156" height="10" fill="var(--sage-300)" stroke={line} strokeWidth="1.5" />
      <rect x="30" y="140" width="180" height="8" fill={line} />
    </>
  ),
  townhouse: (
    <>
      <rect x="45" y="50" width="150" height="8" fill={roof} />
      <rect x="52" y="58" width="45" height="82" fill={wall} stroke={line} strokeWidth="1.5" />
      <rect x="97" y="58" width="45" height="82" fill="var(--sage-300)" stroke={line} strokeWidth="1.5" />
      <rect x="142" y="58" width="45" height="82" fill={wall} stroke={line} strokeWidth="1.5" />
      <Windows xs={[62, 107, 152]} y={74} w={26} h={22} />
      <rect x="70" y="112" width="14" height="28" fill={trim} />
      <rect x="30" y="140" width="180" height="8" fill={line} />
    </>
  ),
  colonial: (
    <>
      <polygon points="35,62 120,24 205,62" fill={roof} />
      <rect x="48" y="62" width="144" height="78" fill={wall} stroke={line} strokeWidth="1.5" />
      <Windows xs={[62, 96]} y={76} w={20} h={18} />
      <Windows xs={[130, 164]} y={76} w={20} h={18} />
      <Windows xs={[62, 164]} y={108} w={20} h={18} />
      <rect x="108" y="100" width="24" height="40" fill={trim} />
      <polygon points="98,100 120,86 142,100" fill={roof} />
      <rect x="30" y="140" width="180" height="8" fill={line} />
    </>
  ),
  cottage: (
    <>
      <polygon points="40,72 120,20 200,72" fill={roof} />
      <rect x="58" y="72" width="124" height="68" fill={wall} stroke={line} strokeWidth="1.5" />
      <Windows xs={[72, 138]} y={92} w={24} h={20} />
      <rect x="110" y="102" width="20" height="38" fill={trim} />
      <rect x="150" y="30" width="10" height="26" fill={line} />
      <rect x="30" y="140" width="180" height="8" fill={line} />
    </>
  ),
};

export function HouseIllustration({ style }) {
  const body = BODIES[style] || BODIES.cottage;
  return (
    <svg viewBox="0 0 240 150" role="img" aria-label={`Illustration of a ${style} style house`}>
      {body}
    </svg>
  );
}
