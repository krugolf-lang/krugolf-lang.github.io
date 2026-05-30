/* ===== Krugolf — app shell, nav, footer, router ===== */

function Nav({ route, nav }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  React.useEffect(()=>{
    const onScroll = ()=> setScrolled(window.scrollY>10);
    window.addEventListener('scroll', onScroll); return ()=>window.removeEventListener('scroll', onScroll);
  },[]);
  const links = [['catalog','คอร์สเรียน'],['home','วิธีเรียน'],['home','สำหรับโรงเรียน'],['home','เกี่ยวกับเรา']];
  return (
    <header style={{ position:'sticky', top:0, zIndex:50, background:scrolled?'rgba(241,232,215,0.85)':'transparent',
      backdropFilter:scrolled?'blur(14px)':'none', borderBottom:scrolled?'1px solid var(--line)':'1px solid transparent', transition:'all .25s' }}>
      <div className="wrap" style={{ height:76, display:'flex', alignItems:'center', justifyContent:'space-between', gap:20 }}>
        <Logo onClick={()=>nav('home')}/>
        <nav className="nav-links" style={{ display:'flex', alignItems:'center', gap:6 }}>
          {links.map(([r,l],i)=>(
            <button key={i} onClick={()=>nav(r)} style={{ padding:'9px 15px', fontSize:15, fontWeight:500, color:'var(--ink-2)', borderRadius:999, transition:'background .15s' }}
              onMouseEnter={e=>e.currentTarget.style.background='var(--surface)'}
              onMouseLeave={e=>e.currentTarget.style.background='transparent'}>{l}</button>
          ))}
        </nav>
        <div className="nav-cta" style={{ display:'flex', alignItems:'center', gap:12 }}>
          <button onClick={()=>nav('catalog')} style={{ fontSize:15, fontWeight:600, color:'var(--ink)' }}>เข้าสู่ระบบ</button>
          <button className="btn btn-primary btn-sm" onClick={()=>nav('catalog')}>สมัครเรียน</button>
        </div>
        <button className="nav-burger" onClick={()=>setMobileOpen(o=>!o)} style={{ display:'none' }} aria-label="menu">
          <Icon name={mobileOpen?'close':'menu'} size={26}/>
        </button>
      </div>
      {mobileOpen && (
        <div className="wrap" style={{ paddingBottom:18, display:'flex', flexDirection:'column', gap:4 }}>
          {links.map(([r,l],i)=>(
            <button key={i} onClick={()=>{nav(r);setMobileOpen(false);}} style={{ textAlign:'left', padding:'12px 8px', fontSize:16, fontWeight:500, borderBottom:'1px solid var(--line)' }}>{l}</button>
          ))}
          <button className="btn btn-primary" style={{ marginTop:10, justifyContent:'center' }} onClick={()=>{nav('catalog');setMobileOpen(false);}}>สมัครเรียน</button>
        </div>
      )}
    </header>
  );
}

function Footer({ nav }) {
  const cols = [
    ['คอร์สเรียน',['Scratch สำหรับเด็ก','Python เบื้องต้น','สร้างเว็บไซต์','AI & หุ่นยนต์']],
    ['ครูกอล์ฟ',['เกี่ยวกับเรา','ทีมผู้สอน','รีวิวจากผู้ปกครอง','ร่วมงานกับเรา']],
    ['ช่วยเหลือ',['คำถามที่พบบ่อย','ติดต่อเรา','สำหรับโรงเรียน','นโยบายความเป็นส่วนตัว']],
  ];
  return (
    <footer style={{ background:'var(--ink)', color:'var(--surface)', paddingTop:60 }}>
      <div className="wrap" style={{ display:'grid', gridTemplateColumns:'1.4fr repeat(3,1fr)', gap:40, paddingBottom:48 }}>
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:11, marginBottom:18 }}>
            <span style={{ width:34, height:34, borderRadius:9, background:'var(--surface)', display:'grid', placeItems:'center', boxShadow:'2px 2px 0 var(--coral)' }}>
              <Icon name="code" size={18} color="var(--ink)" stroke={2.2}/>
            </span>
            <span style={{ fontFamily:'var(--loop)', fontWeight:700, fontSize:22 }}>ครู<span style={{ color:'var(--coral)' }}>กอล์ฟ</span></span>
          </div>
          <p style={{ fontSize:14.5, color:'rgba(252,248,240,0.6)', maxWidth:300 }}>
            แพลตฟอร์มเรียนเขียนโปรแกรมและทักษะดิจิทัลสำหรับเด็กไทย เรียนสนุก ลงมือทำจริง พร้อมก้าวสู่อนาคต
          </p>
          <div style={{ display:'flex', gap:10, marginTop:22 }}>
            {['coral','sun','grass','sky'].map(c=>(
              <span key={c} style={{ width:36, height:36, borderRadius:10, background:`var(--${c})`, display:'grid', placeItems:'center', cursor:'pointer' }}>
                <Icon name="globe" size={18} color="rgba(0,0,0,0.55)"/>
              </span>
            ))}
          </div>
        </div>
        {cols.map(([h,items])=>(
          <div key={h}>
            <div style={{ fontWeight:600, fontSize:15, marginBottom:16 }}>{h}</div>
            <div style={{ display:'flex', flexDirection:'column', gap:11 }}>
              {items.map(it=>(
                <button key={it} onClick={()=>nav('catalog')} style={{ textAlign:'left', fontSize:14, color:'rgba(252,248,240,0.62)' }}
                  onMouseEnter={e=>e.currentTarget.style.color='var(--surface)'}
                  onMouseLeave={e=>e.currentTarget.style.color='rgba(252,248,240,0.62)'}>{it}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="wrap" style={{ borderTop:'1px solid rgba(252,248,240,0.12)', padding:'22px 32px', display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
        <span style={{ fontSize:13.5, color:'rgba(252,248,240,0.5)', fontFamily:'var(--mono)' }}>© 2026 KRUGOLF · สงวนลิขสิทธิ์</span>
        <span style={{ fontSize:13.5, color:'rgba(252,248,240,0.5)' }}>สร้างด้วย ❤ เพื่อเด็กไทย</span>
      </div>
    </footer>
  );
}

function App() {
  const [route, setRoute] = React.useState({ view:'home', params:{} });
  const nav = (view, params={})=>{ setRoute({ view, params }); window.scrollTo({ top:0, behavior:'instant' in window ? 'instant' : 'auto' }); };
  const isLesson = route.view==='lesson';
  return (
    <>
      <Nav route={route} nav={nav}/>
      {route.view==='home' && <Landing nav={nav}/>}
      {route.view==='catalog' && <Catalog nav={nav}/>}
      {route.view==='detail' && <CourseDetail id={route.params.id} nav={nav}/>}
      {route.view==='lesson' && <Lesson id={route.params.id} nav={nav}/>}
      {!isLesson && <Footer nav={nav}/>}
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
