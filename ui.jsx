/* ===== Krugolf — primitives, icons, data ===== */

/* ---------- Icons (simple functional strokes) ---------- */
function Icon({ name, size = 22, stroke = 1.8, color = 'currentColor', style }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
    stroke: color, strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round', style };
  const paths = {
    play:   <polygon points="6 4 20 12 6 20 6 4" fill={color} stroke="none" />,
    arrow:  <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="13 6 19 12 13 18"/></>,
    arrowL: <><line x1="19" y1="12" x2="5" y2="12"/><polyline points="11 6 5 12 11 18"/></>,
    check:  <polyline points="20 6 9 17 4 12"/>,
    clock:  <><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15.5 14"/></>,
    star:   <polygon points="12 3 14.6 8.8 21 9.5 16.2 13.8 17.6 20 12 16.7 6.4 20 7.8 13.8 3 9.5 9.4 8.8" fill={color} stroke="none"/>,
    users:  <><path d="M16 19v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="3.2"/><path d="M22 19v-2a4 4 0 0 0-3-3.85"/><path d="M16 4.15A4 4 0 0 1 16 11.7"/></>,
    book:   <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 5.5V20.5"/></>,
    grid:   <><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></>,
    search: <><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    menu:   <><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></>,
    close:  <><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></>,
    lock:   <><rect x="4.5" y="10.5" width="15" height="10" rx="2"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/></>,
    code:   <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>,
    spark:  <><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/></>,
    chevD:  <polyline points="6 9 12 15 18 9"/>,
    chevR:  <polyline points="9 6 15 12 9 18"/>,
    cert:   <><circle cx="12" cy="9" r="5.5"/><path d="M8.5 13.5 7 21l5-2.5L17 21l-1.5-7.5"/></>,
    bolt:   <polygon points="13 2 4 14 11 14 10 22 19 9 12 9 13 2" fill={color} stroke="none"/>,
    heart:  <path d="M12 20S4 14.5 4 9a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 5.5-8 11-8 11z"/>,
    list:   <><line x1="8" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="8" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1" fill={color}/><circle cx="4" cy="12" r="1" fill={color}/><circle cx="4" cy="18" r="1" fill={color}/></>,
    globe:  <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18"/></>,
    shield: <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6z"/>,
    robot:  <><rect x="5" y="8" width="14" height="11" rx="2.5"/><path d="M12 4v4M9 13h.01M15 13h.01"/><circle cx="12" cy="3.5" r="1.3" fill={color}/><path d="M9 16.5h6"/></>,
  };
  return <svg {...p}>{paths[name] || null}</svg>;
}

/* ---------- Logo ---------- */
function Logo({ size = 30, onClick }) {
  return (
    <button onClick={onClick} style={{ display:'flex', alignItems:'center', gap:11 }} aria-label="Krugolf">
      <span style={{
        width:size, height:size, borderRadius:9, background:'var(--ink)',
        display:'grid', placeItems:'center', flex:'0 0 auto',
        boxShadow:'2px 2px 0 var(--coral)'
      }}>
        <Icon name="code" size={size*0.56} color="var(--surface)" stroke={2.2}/>
      </span>
      <span style={{ fontFamily:'var(--loop)', fontWeight:700, fontSize:size*0.66, letterSpacing:'-0.02em' }}>
        ครู<span style={{ color:'var(--coral)' }}>กอล์ฟ</span>
      </span>
    </button>
  );
}

/* ---------- Reusable bits ---------- */
function Badge({ children, color = 'var(--ink)', bg = 'var(--surface-2)' }) {
  return <span className="badge" style={{ background:bg, color }}>{children}</span>;
}

function Stat({ value, label }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
      <span style={{ fontFamily:'var(--loop)', fontWeight:700, fontSize:30, lineHeight:1 }}>{value}</span>
      <span style={{ fontSize:13.5, color:'var(--muted)' }}>{label}</span>
    </div>
  );
}

function Progress({ value, color = 'var(--grass)', h = 8 }) {
  return (
    <div style={{ background:'var(--line)', borderRadius:99, height:h, overflow:'hidden', width:'100%' }}>
      <div style={{ width:`${value}%`, height:'100%', background:color, borderRadius:99, transition:'width .5s cubic-bezier(.2,.8,.2,1)' }}/>
    </div>
  );
}

/* decorative motif tile for course art (simple shapes only) */
function Motif({ kind, c1, c2 }) {
  const common = { position:'absolute', inset:0, width:'100%', height:'100%' };
  return (
    <svg {...{style:common}} viewBox="0 0 200 130" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="200" height="130" fill={c1}/>
      {kind===0 && <>
        <circle cx="150" cy="30" r="58" fill={c2} opacity="0.55"/>
        <circle cx="55" cy="105" r="40" fill="#fff" opacity="0.18"/>
        <rect x="20" y="22" width="34" height="34" rx="9" fill="#fff" opacity="0.85"/>
      </>}
      {kind===1 && <>
        <rect x="92" y="-20" width="80" height="80" rx="14" transform="rotate(28 132 20)" fill={c2} opacity="0.6"/>
        <circle cx="40" cy="40" r="26" fill="#fff" opacity="0.85"/>
        <rect x="24" y="86" width="120" height="14" rx="7" fill="#fff" opacity="0.25"/>
      </>}
      {kind===2 && <>
        <polygon points="150,8 196,60 150,112 104,60" fill={c2} opacity="0.6"/>
        <circle cx="46" cy="90" r="34" fill="#fff" opacity="0.16"/>
        <circle cx="50" cy="44" r="16" fill="#fff" opacity="0.9"/>
      </>}
      {kind===3 && <>
        <circle cx="120" cy="65" r="62" fill={c2} opacity="0.5"/>
        <rect x="-10" y="70" width="90" height="90" rx="20" transform="rotate(18 35 115)" fill="#fff" opacity="0.16"/>
        <rect x="150" y="84" width="30" height="30" rx="8" fill="#fff" opacity="0.85"/>
      </>}
    </svg>
  );
}

/* ---------- Course data ---------- */
const ACCENTS = {
  coral:  { c:'var(--coral)',  soft:'var(--coral-soft)',  c2:'oklch(0.80 0.13 50)' },
  tanger: { c:'var(--tanger)', soft:'var(--tanger-soft)', c2:'oklch(0.83 0.12 78)' },
  sun:    { c:'var(--sun)',    soft:'var(--sun-soft)',    c2:'oklch(0.86 0.11 110)' },
  grass:  { c:'var(--grass)',  soft:'var(--grass-soft)',  c2:'oklch(0.82 0.11 168)' },
  sky:    { c:'var(--sky)',    soft:'var(--sky-soft)',    c2:'oklch(0.80 0.10 250)' },
  grape:  { c:'var(--grape)',  soft:'var(--grape-soft)',  c2:'oklch(0.74 0.12 320)' },
};

const COURSES = [
  {
    id:'scratch', title:'Scratch: สร้างเกมแรกของหนู', cat:'พื้นฐานเขียนโปรแกรม',
    level:'ประถม', age:'อายุ 8–12 ปี', accent:'coral', icon:'spark', motif:0,
    lessons:18, hours:6, students:2840, rating:4.9, price:'ฟรี',
    tagline:'ลากบล็อกต่อโค้ด สร้างเกมและการ์ตูนเคลื่อนไหวได้ในวันแรก',
    desc:'เริ่มต้นโลกของการเขียนโปรแกรมด้วย Scratch แบบลากบล็อก ไม่ต้องพิมพ์โค้ดให้ปวดหัว น้อง ๆ จะได้สร้างเกม เล่าเรื่อง และทำแอนิเมชันของตัวเองตั้งแต่บทเรียนแรก',
    skills:['ลำดับการคิด (Sequencing)', 'การวนซ้ำ (Loops)', 'เงื่อนไข (If/Else)', 'ออกแบบเกมง่าย ๆ'],
  },
  {
    id:'python', title:'Python สำหรับเด็กยุคใหม่', cat:'เขียนโปรแกรมจริงจัง',
    level:'มัธยมต้น', age:'อายุ 12–15 ปี', accent:'sky', icon:'code', motif:1,
    lessons:24, hours:10, students:1920, rating:4.8, price:'฿1,290',
    tagline:'ก้าวจากบล็อกสู่โค้ดจริง เขียน Python สร้างโปรแกรมและเกมข้อความ',
    desc:'พาน้องข้ามจากการลากบล็อกสู่การพิมพ์โค้ดจริงด้วยภาษา Python ภาษาที่ใช้กันทั่วโลก เรียนรู้ผ่านโปรเจกต์สนุก ๆ ทีละขั้น พร้อมเครื่องมือรันโค้ดในเบราว์เซอร์',
    skills:['ตัวแปรและชนิดข้อมูล', 'ฟังก์ชัน', 'ลิสต์และลูป', 'สร้างโปรแกรมโต้ตอบ'],
  },
  {
    id:'web', title:'ออกแบบเว็บไซต์ HTML & CSS', cat:'สร้างเว็บไซต์',
    level:'มัธยม', age:'อายุ 13–18 ปี', accent:'grape', icon:'globe', motif:2,
    lessons:20, hours:8, students:1560, rating:4.9, price:'฿1,290',
    tagline:'สร้างเว็บไซต์ของตัวเองตั้งแต่ศูนย์ พร้อมเผยแพร่ออนไลน์ได้จริง',
    desc:'เรียนรู้การสร้างเว็บไซต์ด้วย HTML และ CSS ตั้งแต่โครงสร้างหน้าเว็บ การจัดวาง สีสัน ไปจนถึงทำให้สวยบนมือถือ จบคอร์สมีเว็บไซต์พอร์ตโฟลิโอเป็นของตัวเอง',
    skills:['โครงสร้าง HTML', 'จัดสไตล์ด้วย CSS', 'Responsive Design', 'เผยแพร่เว็บจริง'],
  },
  {
    id:'microbit', title:'หุ่นยนต์ & Micro:bit', cat:'IoT และหุ่นยนต์',
    level:'มัธยมต้น', age:'อายุ 10–15 ปี', accent:'grass', icon:'robot', motif:3,
    lessons:16, hours:7, students:980, rating:4.7, price:'฿1,490',
    tagline:'เขียนโค้ดสั่งงานบอร์ดจริง ไฟกระพริบ เซ็นเซอร์ และหุ่นยนต์',
    desc:'เชื่อมโลกโค้ดกับโลกจริงผ่านบอร์ด Micro:bit น้อง ๆ จะได้เขียนโปรแกรมควบคุมไฟ เซ็นเซอร์ และสร้างสิ่งประดิษฐ์อัจฉริยะด้วยตัวเอง (มีโหมดจำลองในเบราว์เซอร์)',
    skills:['อ่านค่าเซ็นเซอร์', 'ควบคุม LED', 'Event-driven', 'สร้างโปรเจกต์ IoT'],
  },
  {
    id:'safety', title:'พลเมืองดิจิทัล & ปลอดภัยออนไลน์', cat:'ทักษะดิจิทัล',
    level:'ประถม–มัธยม', age:'ทุกระดับ', accent:'tanger', icon:'shield', motif:0,
    lessons:12, hours:4, students:3210, rating:4.9, price:'ฟรี',
    tagline:'รู้ทันภัยออนไลน์ ใช้อินเทอร์เน็ตอย่างปลอดภัยและมีความรับผิดชอบ',
    desc:'ทักษะที่เด็กยุคนี้ต้องมี! เรียนรู้การตั้งรหัสผ่านที่ปลอดภัย รู้ทันข่าวปลอม การกลั่นแกล้งออนไลน์ และการดูแลรอยเท้าดิจิทัลของตัวเอง',
    skills:['ความปลอดภัยของรหัสผ่าน', 'รู้ทันข่าวปลอม', 'มารยาทออนไลน์', 'ความเป็นส่วนตัว'],
  },
  {
    id:'ai', title:'AI & การคิดเชิงคำนวณ', cat:'ปัญญาประดิษฐ์',
    level:'มัธยม', age:'อายุ 13–18 ปี', accent:'sun', icon:'bolt', motif:1,
    lessons:22, hours:9, students:1240, rating:4.8, price:'฿1,590',
    tagline:'เข้าใจว่า AI ทำงานอย่างไร และฝึกสอน AI ของตัวเองแบบไม่ต้องโค้ดยาก',
    desc:'ทำความรู้จัก AI แบบจับต้องได้ ตั้งแต่หลักการทำงาน การฝึกโมเดลจดจำภาพและเสียง ไปจนถึงจริยธรรมของ AI ผ่านกิจกรรมและเครื่องมือสำหรับเยาวชนโดยเฉพาะ',
    skills:['การคิดเชิงคำนวณ', 'ฝึกโมเดล AI', 'จดจำภาพ/เสียง', 'จริยธรรม AI'],
  },
];

/* generic curriculum builder per course */
function buildCurriculum(course) {
  const base = [
    { t:'ปฐมนิเทศและเตรียมเครื่องมือ', lessons:['ยินดีต้อนรับสู่คอร์ส', 'เตรียมเครื่องมือให้พร้อม', 'ทัวร์หน้าจอการเรียน'] },
    { t:'แนวคิดพื้นฐานที่ต้องรู้', lessons:['ภาพรวมแนวคิดหลัก', 'ลองทำตามทีละขั้น', 'แบบฝึกหัดสนุก ๆ', 'สรุปบทเรียน'] },
    { t:'ลงมือทำโปรเจกต์แรก', lessons:['วางแผนโปรเจกต์', 'สร้างชิ้นงานทีละส่วน', 'ตกแต่งและปรับแต่ง', 'ทดสอบและแก้บั๊ก'] },
    { t:'โปรเจกต์ใหญ่ส่งท้าย & เกียรติบัตร', lessons:['โจทย์ท้าทายขั้นสุดท้าย', 'นำเสนอผลงาน', 'รับเกียรติบัตร'] },
  ];
  return base;
}

Object.assign(window, { Icon, Logo, Badge, Stat, Progress, Motif, ACCENTS, COURSES, buildCurriculum });
