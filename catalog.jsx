/* ===== Krugolf — CourseCard, Catalog, Course detail ===== */

function CourseCard({ course, nav, delay = 0 }) {
  const a = ACCENTS[course.accent];
  return (
    <button
      onClick={()=>nav('detail',{id:course.id})}
      className="card rise course-card"
      style={{ padding:0, overflow:'hidden', textAlign:'left', display:'flex', flexDirection:'column', animationDelay:`${delay}s`, cursor:'pointer' }}
    >
      <div style={{ position:'relative', height:148 }}>
        <Motif kind={course.motif} c1={a.c} c2={a.c2}/>
        <span style={{ position:'absolute', top:14, left:14, width:42, height:42, borderRadius:11, background:'rgba(255,255,255,0.92)', display:'grid', placeItems:'center', boxShadow:'var(--shadow-sm)' }}>
          <Icon name={course.icon} size={22} color={a.c}/>
        </span>
        <span className="badge" style={{ position:'absolute', top:16, right:14, background:'rgba(255,255,255,0.92)', color:'var(--ink)' }}>{course.level}</span>
        {course.price==='ฟรี' && (
          <span className="badge" style={{ position:'absolute', bottom:14, left:14, background:'var(--ink)', color:'#fff' }}>เรียนฟรี</span>
        )}
      </div>
      <div style={{ padding:'20px 22px 22px', display:'flex', flexDirection:'column', flex:1 }}>
        <span style={{ fontFamily:'var(--mono)', fontSize:11.5, letterSpacing:'0.08em', color:a.c, fontWeight:600, textTransform:'uppercase' }}>{course.cat}</span>
        <h3 style={{ fontSize:21, margin:'8px 0 10px', lineHeight:1.18 }}>{course.title}</h3>
        <p style={{ fontSize:14, color:'var(--ink-2)', flex:1 }}>{course.tagline}</p>
        <div style={{ display:'flex', alignItems:'center', gap:16, marginTop:18, paddingTop:16, borderTop:'1px solid var(--line)', fontSize:13, color:'var(--muted)' }}>
          <span style={{ display:'flex', alignItems:'center', gap:5 }}><Icon name="book" size={15}/>{course.lessons} บท</span>
          <span style={{ display:'flex', alignItems:'center', gap:5 }}><Icon name="clock" size={15}/>{course.hours} ชม.</span>
          <span style={{ display:'flex', alignItems:'center', gap:5, marginLeft:'auto', color:'var(--ink)', fontWeight:600 }}>
            <Icon name="star" size={15} color="var(--sun)"/>{course.rating}
          </span>
        </div>
      </div>
    </button>
  );
}

function Catalog({ nav }) {
  const [level, setLevel] = React.useState('ทั้งหมด');
  const [q, setQ] = React.useState('');
  const levels = ['ทั้งหมด','ประถม','มัธยมต้น','มัธยม'];
  const filtered = COURSES.filter(c=>{
    const okLvl = level==='ทั้งหมด' || c.level.includes(level==='มัธยม'?'มัธยม':level);
    const okLvl2 = level==='ทั้งหมด' ? true : (level==='มัธยม' ? c.level.includes('มัธยม') : c.level.includes(level));
    const okQ = !q || (c.title+c.cat+c.tagline).toLowerCase().includes(q.toLowerCase());
    return okLvl2 && okQ;
  });
  return (
    <main>
      {/* header band */}
      <section style={{ background:'var(--bg-deep)', paddingTop:56, paddingBottom:42 }}>
        <div className="wrap">
          <span className="eyebrow">คอร์สเรียนทั้งหมด</span>
          <h1 style={{ fontSize:'clamp(34px,4.4vw,58px)', marginTop:14, maxWidth:680 }}>
            เลือกเส้นทางการเรียนรู้<br/>ที่ใช่สำหรับน้อง
          </h1>
          <p style={{ fontSize:18, color:'var(--ink-2)', marginTop:16, maxWidth:540 }}>
            ทุกคอร์สออกแบบโดยครูผู้เชี่ยวชาญ เรียงลำดับจากง่ายไปยาก เรียนที่ไหนเมื่อไหร่ก็ได้
          </p>
        </div>
      </section>

      <div className="wrap" style={{ padding:'34px 32px 80px' }}>
        {/* controls */}
        <div style={{ display:'flex', justifyContent:'space-between', gap:18, flexWrap:'wrap', alignItems:'center', marginBottom:34 }}>
          <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
            {levels.map(l=>(
              <button key={l} className={'chip'+(level===l?' active':'')} onClick={()=>setLevel(l)}>{l}</button>
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:10, background:'var(--surface)', border:'1.5px solid var(--line)', borderRadius:999, padding:'10px 18px', minWidth:240 }}>
            <Icon name="search" size={18} color="var(--muted)"/>
            <input
              value={q} onChange={e=>setQ(e.target.value)} placeholder="ค้นหาคอร์ส..."
              style={{ border:'none', outline:'none', background:'transparent', font:'inherit', fontSize:15, width:'100%', color:'var(--ink)' }}
            />
          </div>
        </div>

        <div style={{ fontSize:14, color:'var(--muted)', marginBottom:20, fontFamily:'var(--mono)' }}>
          พบ {filtered.length} คอร์ส
        </div>

        <div className="course-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }}>
          {filtered.map((c,i)=> <CourseCard key={c.id} course={c} nav={nav} delay={i*.05}/> )}
        </div>
        {filtered.length===0 && (
          <div style={{ textAlign:'center', padding:'80px 0', color:'var(--muted)' }}>
            <Icon name="search" size={40} color="var(--line-2)"/>
            <p style={{ marginTop:16, fontSize:17 }}>ไม่พบคอร์สที่ค้นหา ลองคำอื่นดูนะ</p>
          </div>
        )}
      </div>
    </main>
  );
}

function CourseDetail({ id, nav }) {
  const course = COURSES.find(c=>c.id===id) || COURSES[0];
  const a = ACCENTS[course.accent];
  const curriculum = buildCurriculum(course);
  const [open, setOpen] = React.useState(0);
  let lessonCounter = 0;

  return (
    <main>
      {/* hero */}
      <section style={{ background:'var(--bg-deep)', paddingTop:30 }}>
        <div className="wrap">
          <button onClick={()=>nav('catalog')} style={{ display:'inline-flex', alignItems:'center', gap:7, fontSize:14, color:'var(--muted)', marginBottom:26, fontWeight:500 }}>
            <Icon name="arrowL" size={17}/> กลับไปหน้าคอร์สทั้งหมด
          </button>
          <div className="detail-hero" style={{ display:'grid', gridTemplateColumns:'1.1fr 0.9fr', gap:44, alignItems:'center', paddingBottom:48 }}>
            <div>
              <div style={{ display:'flex', gap:10, marginBottom:18, flexWrap:'wrap' }}>
                <span className="badge" style={{ background:a.soft, color:a.c }}>{course.cat}</span>
                <span className="badge" style={{ background:'var(--surface)', color:'var(--ink-2)' }}>{course.level} · {course.age}</span>
              </div>
              <h1 style={{ fontSize:'clamp(32px,4.2vw,54px)' }}>{course.title}</h1>
              <p style={{ fontSize:18.5, color:'var(--ink-2)', marginTop:18, maxWidth:560 }}>{course.desc}</p>
              <div style={{ display:'flex', gap:28, marginTop:28, flexWrap:'wrap', alignItems:'center' }}>
                <span style={{ display:'flex', alignItems:'center', gap:7, fontWeight:600 }}><Icon name="star" size={19} color="var(--sun)"/>{course.rating} <span style={{ color:'var(--muted)', fontWeight:400 }}>({course.students.toLocaleString()} ผู้เรียน)</span></span>
                <span style={{ display:'flex', alignItems:'center', gap:7, color:'var(--ink-2)' }}><Icon name="book" size={18}/>{course.lessons} บทเรียน</span>
                <span style={{ display:'flex', alignItems:'center', gap:7, color:'var(--ink-2)' }}><Icon name="clock" size={18}/>{course.hours} ชั่วโมง</span>
              </div>
            </div>

            {/* enroll card */}
            <div className="card" style={{ padding:0, overflow:'hidden', boxShadow:'var(--shadow-lg)', position:'relative' }}>
              <div style={{ position:'relative', height:170 }}>
                <Motif kind={course.motif} c1={a.c} c2={a.c2}/>
                <button onClick={()=>nav('lesson',{id:course.id})} style={{ position:'absolute', inset:0, display:'grid', placeItems:'center' }} aria-label="เล่นตัวอย่าง">
                  <span style={{ width:66, height:66, borderRadius:'50%', background:'rgba(255,255,255,0.95)', display:'grid', placeItems:'center', boxShadow:'var(--shadow-md)', transition:'transform .2s' }}
                    onMouseEnter={e=>e.currentTarget.style.transform='scale(1.08)'}
                    onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}>
                    <Icon name="play" size={26} color={a.c}/>
                  </span>
                </button>
              </div>
              <div style={{ padding:'24px 24px 26px' }}>
                <div style={{ display:'flex', alignItems:'baseline', gap:10, marginBottom:18 }}>
                  <span style={{ fontFamily:'var(--loop)', fontWeight:700, fontSize:34 }}>{course.price}</span>
                  {course.price!=='ฟรี' && <span style={{ color:'var(--muted)', textDecoration:'line-through', fontSize:17 }}>฿1,990</span>}
                </div>
                <button className="btn btn-accent" style={{ width:'100%', justifyContent:'center', marginBottom:11 }} onClick={()=>nav('lesson',{id:course.id})}>
                  เริ่มเรียนเลย <Icon name="arrow" size={19} color="#fff"/>
                </button>
                <button className="btn btn-ghost" style={{ width:'100%', justifyContent:'center' }}>
                  <Icon name="heart" size={17}/> บันทึกไว้เรียนทีหลัง
                </button>
                <div style={{ marginTop:20, display:'flex', flexDirection:'column', gap:11 }}>
                  {['เรียนได้ตลอดชีพ ทุกอุปกรณ์','เกียรติบัตรเมื่อเรียนจบ','พื้นที่เขียนโค้ดในเบราว์เซอร์'].map(t=>(
                    <div key={t} style={{ display:'flex', alignItems:'center', gap:10, fontSize:14.5 }}>
                      <Icon name="check" size={17} color="var(--grass)" stroke={2.4}/> {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* body */}
      <div className="wrap detail-body" style={{ padding:'56px 32px 80px', display:'grid', gridTemplateColumns:'1fr 320px', gap:56, alignItems:'start' }}>
        <div>
          {/* skills */}
          <h2 style={{ fontSize:28, marginBottom:20 }}>น้องจะได้เรียนรู้อะไรบ้าง</h2>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:48 }}>
            {course.skills.map(s=>(
              <div key={s} className="card" style={{ padding:'16px 18px', display:'flex', alignItems:'center', gap:12, boxShadow:'none' }}>
                <span style={{ width:34, height:34, borderRadius:9, background:a.soft, display:'grid', placeItems:'center', flex:'0 0 auto' }}>
                  <Icon name="check" size={18} color={a.c} stroke={2.6}/>
                </span>
                <span style={{ fontSize:15, fontWeight:500 }}>{s}</span>
              </div>
            ))}
          </div>

          {/* curriculum */}
          <h2 style={{ fontSize:28, marginBottom:6 }}>เนื้อหาบทเรียน</h2>
          <p style={{ color:'var(--muted)', marginBottom:22, fontSize:15 }}>{curriculum.length} หมวด · {course.lessons} บทเรียน · {course.hours} ชั่วโมง</p>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {curriculum.map((mod,mi)=>{
              const isOpen = open===mi;
              return (
                <div key={mi} className="card" style={{ padding:0, overflow:'hidden', boxShadow:'none' }}>
                  <button onClick={()=>setOpen(isOpen?-1:mi)} style={{ width:'100%', display:'flex', alignItems:'center', gap:14, padding:'18px 20px', textAlign:'left' }}>
                    <span style={{ fontFamily:'var(--mono)', fontSize:13, color:a.c, fontWeight:600 }}>{String(mi+1).padStart(2,'0')}</span>
                    <span style={{ fontWeight:600, fontSize:17, flex:1 }}>{mod.t}</span>
                    <span style={{ fontSize:13, color:'var(--muted)' }}>{mod.lessons.length} บท</span>
                    <Icon name="chevD" size={18} color="var(--muted)" style={{ transform:isOpen?'rotate(180deg)':'none', transition:'transform .22s' }}/>
                  </button>
                  {isOpen && (
                    <div style={{ borderTop:'1px solid var(--line)', padding:'6px 0' }}>
                      {mod.lessons.map((ls,li)=>{
                        lessonCounter++;
                        const locked = mi>1;
                        return (
                          <button key={li} onClick={()=>!locked && nav('lesson',{id:course.id})}
                            style={{ width:'100%', display:'flex', alignItems:'center', gap:13, padding:'13px 22px', textAlign:'left', opacity:locked?.55:1, cursor:locked?'default':'pointer' }}>
                            <span style={{ width:30, height:30, borderRadius:8, background:locked?'var(--surface-2)':a.soft, display:'grid', placeItems:'center', flex:'0 0 auto' }}>
                              <Icon name={locked?'lock':'play'} size={14} color={locked?'var(--muted)':a.c}/>
                            </span>
                            <span style={{ fontSize:15, flex:1 }}>{ls}</span>
                            <span style={{ fontSize:13, color:'var(--muted)', fontFamily:'var(--mono)' }}>{3+li} น.</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* sidebar: instructor */}
        <aside style={{ position:'sticky', top:96, display:'flex', flexDirection:'column', gap:18 }}>
          <div className="card" style={{ padding:24 }}>
            <span className="eyebrow">ผู้สอน</span>
            <div style={{ display:'flex', alignItems:'center', gap:14, marginTop:16 }}>
              <span className="ph" data-label="" style={{ width:60, height:60, borderRadius:'50%', flex:'0 0 auto', background:a.soft }}>
                <span style={{ fontFamily:'var(--loop)', fontWeight:700, fontSize:24, color:a.c }}>ก</span>
              </span>
              <div>
                <div style={{ fontWeight:700, fontSize:17 }}>ครูกอล์ฟ</div>
                <div style={{ fontSize:13.5, color:'var(--muted)' }}>นักการศึกษาด้านโค้ดดิ้ง</div>
              </div>
            </div>
            <p style={{ fontSize:14, color:'var(--ink-2)', marginTop:16 }}>
              ประสบการณ์สอนเด็กกว่า 10 ปี เชื่อว่าการเขียนโปรแกรมคือทักษะที่ทุกคนเรียนได้ ขอแค่สนุกไปกับมัน
            </p>
          </div>
          <div className="card" style={{ padding:24, background:a.soft, border:'none' }}>
            <Icon name="users" size={26} color={a.c}/>
            <p style={{ fontSize:15, marginTop:12, fontWeight:500, color:'var(--ink)' }}>เรียนเป็นกลุ่มกับเพื่อน ๆ พร้อมระบบช่วยเหลือจากพี่เลี้ยงตลอดคอร์ส</p>
          </div>
        </aside>
      </div>
    </main>
  );
}

Object.assign(window, { CourseCard, Catalog, CourseDetail });
