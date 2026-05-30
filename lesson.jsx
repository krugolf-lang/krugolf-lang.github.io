/* ===== Krugolf — Lesson / video player ===== */

function Lesson({ id, nav }) {
  const course = COURSES.find(c=>c.id===id) || COURSES[0];
  const a = ACCENTS[course.accent];
  const mods = buildCurriculum(course);

  // flatten lessons with module info
  const flat = React.useMemo(()=>{
    const arr = [];
    mods.forEach((m,mi)=> m.lessons.forEach((t,li)=> arr.push({ t, mod:m.t, mi, li, dur:`${3+li}:0${(li*2)%6}` })));
    return arr;
  }, [id]);

  const [cur, setCur] = React.useState(0);
  const [done, setDone] = React.useState(()=>new Set());
  const [playing, setPlaying] = React.useState(false);
  const [tab, setTab] = React.useState('about');

  React.useEffect(()=>{ setPlaying(false); }, [cur]);

  const pct = Math.round((done.size/flat.length)*100);
  const lesson = flat[cur];

  const complete = ()=>{
    setDone(prev=>{ const n=new Set(prev); n.add(cur); return n; });
    if(cur<flat.length-1) setTimeout(()=>setCur(cur+1), 350);
  };

  return (
    <main style={{ background:'var(--bg-deep)', minHeight:'calc(100vh - 76px)' }}>
      <div className="wrap" style={{ padding:'22px 32px 60px' }}>
        {/* breadcrumb */}
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20, flexWrap:'wrap' }}>
          <button onClick={()=>nav('detail',{id:course.id})} style={{ display:'inline-flex', alignItems:'center', gap:7, fontSize:14, color:'var(--muted)', fontWeight:500 }}>
            <Icon name="arrowL" size={17}/> {course.title}
          </button>
        </div>

        <div className="lesson-grid" style={{ display:'grid', gridTemplateColumns:'1fr 360px', gap:28, alignItems:'start' }}>
          {/* ---- player column ---- */}
          <div>
            <div className="card" style={{ padding:0, overflow:'hidden', boxShadow:'var(--shadow-md)' }}>
              {/* video stage */}
              <div style={{ position:'relative', aspectRatio:'16/9', background:'var(--ink)' }}>
                <div style={{ position:'absolute', inset:0, opacity:playing?1:0.5, transition:'opacity .3s' }}>
                  <Motif kind={course.motif} c1={a.c} c2={a.c2}/>
                  <div aria-hidden="true" style={{ position:'absolute', inset:0, background:'repeating-linear-gradient(135deg, transparent 0 26px, rgba(0,0,0,0.06) 26px 52px)' }}/>
                </div>
                {!playing && (
                  <button onClick={()=>setPlaying(true)} style={{ position:'absolute', inset:0, display:'grid', placeItems:'center' }} aria-label="เล่นวิดีโอ">
                    <span style={{ width:88, height:88, borderRadius:'50%', background:'rgba(255,255,255,0.95)', display:'grid', placeItems:'center', boxShadow:'var(--shadow-lg)', transition:'transform .2s' }}
                      onMouseEnter={e=>e.currentTarget.style.transform='scale(1.08)'}
                      onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}>
                      <Icon name="play" size={36} color={a.c}/>
                    </span>
                  </button>
                )}
                {playing && (
                  <div style={{ position:'absolute', top:16, left:16, display:'flex', alignItems:'center', gap:8, background:'rgba(0,0,0,0.5)', padding:'6px 13px', borderRadius:999, color:'#fff', fontSize:13, fontFamily:'var(--mono)' }}>
                    <span className="dot" style={{ background:'var(--coral)' }}/> กำลังเล่น
                  </div>
                )}
                <span style={{ position:'absolute', top:16, right:16 }} className="badge" >
                  <span style={{ background:'rgba(0,0,0,0.5)', color:'#fff', padding:'5px 11px', borderRadius:999, fontFamily:'var(--mono)', fontSize:12 }}>บทที่ {cur+1}/{flat.length}</span>
                </span>
                {/* fake controls bar */}
                <div style={{ position:'absolute', left:0, right:0, bottom:0, padding:'18px 18px 14px', background:'linear-gradient(transparent, rgba(0,0,0,0.55))' }}>
                  <div style={{ height:5, borderRadius:99, background:'rgba(255,255,255,0.3)', overflow:'hidden' }}>
                    <div style={{ width:playing?'38%':'0%', height:'100%', background:a.c, transition:'width 1.2s linear' }}/>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:14, marginTop:12, color:'#fff' }}>
                    <button onClick={()=>setPlaying(p=>!p)} aria-label="play/pause">
                      <Icon name={playing?'list':'play'} size={20} color="#fff"/>
                    </button>
                    <span style={{ fontFamily:'var(--mono)', fontSize:12.5 }}>{playing?'1:23':'0:00'} / {lesson.dur}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* lesson title + actions */}
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:18, margin:'24px 0 18px', flexWrap:'wrap' }}>
              <div>
                <span style={{ fontFamily:'var(--mono)', fontSize:12.5, color:a.c, fontWeight:600, letterSpacing:'0.06em' }}>{lesson.mod}</span>
                <h1 style={{ fontSize:'clamp(24px,3vw,34px)', marginTop:6 }}>{lesson.t}</h1>
              </div>
              <div style={{ display:'flex', gap:10, flexShrink:0 }}>
                <button className="btn btn-ghost btn-sm" onClick={()=>cur>0&&setCur(cur-1)} disabled={cur===0} style={{ opacity:cur===0?.4:1 }}>
                  <Icon name="arrowL" size={16}/> ก่อนหน้า
                </button>
                <button className="btn btn-accent btn-sm" onClick={complete}>
                  {done.has(cur)?'เรียนต่อ':'ทำเครื่องหมายเสร็จ'} <Icon name="check" size={16} color="#fff" stroke={2.6}/>
                </button>
              </div>
            </div>

            {/* tabs */}
            <div style={{ display:'flex', gap:4, borderBottom:'1.5px solid var(--line)', marginBottom:22 }}>
              {[['about','คำอธิบาย'],['transcript','ทรานสคริปต์'],['resources','ไฟล์ประกอบ']].map(([k,l])=>(
                <button key={k} onClick={()=>setTab(k)} style={{ padding:'12px 16px', fontSize:15, fontWeight:600, color:tab===k?'var(--ink)':'var(--muted)', borderBottom:tab===k?`2.5px solid ${a.c}`:'2.5px solid transparent', marginBottom:'-1.5px' }}>{l}</button>
              ))}
            </div>

            {tab==='about' && (
              <div className="rise" style={{ maxWidth:660 }}>
                <p style={{ fontSize:16.5, color:'var(--ink-2)', marginBottom:16 }}>
                  ในบทเรียนนี้ น้อง ๆ จะได้เรียนรู้ <b style={{ color:'var(--ink)' }}>{lesson.t}</b> แบบทีละขั้นตอน ครูกอล์ฟจะค่อย ๆ พาทำไปพร้อมกัน ลองหยุดวิดีโอแล้วทำตามในพื้นที่เขียนโค้ดด้านล่างได้เลยนะ
                </p>
                <div className="card" style={{ padding:20, background:a.soft, border:'none', display:'flex', gap:14, alignItems:'flex-start' }}>
                  <Icon name="spark" size={22} color={a.c}/>
                  <div>
                    <div style={{ fontWeight:600, marginBottom:4 }}>เคล็ดลับจากครูกอล์ฟ</div>
                    <p style={{ fontSize:14.5, color:'var(--ink-2)' }}>ถ้าติดตรงไหน ไม่ต้องกังวล! ลองย้อนกลับไปดูซ้ำได้ การเขียนโปรแกรมคือการลองผิดลองถูก</p>
                  </div>
                </div>
              </div>
            )}
            {tab==='transcript' && (
              <div className="rise" style={{ maxWidth:660, display:'flex', flexDirection:'column', gap:14 }}>
                {['สวัสดีครับนักเรียนทุกคน วันนี้เราจะมาเรียนเรื่องที่สนุกมาก ๆ กัน','ก่อนอื่นให้เปิดโปรแกรมขึ้นมาตามที่พี่บอกในบทที่แล้วนะครับ','เอาล่ะ มาเริ่มกันเลย ขั้นแรกเราจะ...'].map((t,i)=>(
                  <div key={i} style={{ display:'flex', gap:14 }}>
                    <span style={{ fontFamily:'var(--mono)', fontSize:13, color:'var(--muted)', flex:'0 0 auto', paddingTop:2 }}>0{i}:1{i*2}</span>
                    <p style={{ fontSize:15.5, color:'var(--ink-2)' }}>{t}</p>
                  </div>
                ))}
              </div>
            )}
            {tab==='resources' && (
              <div className="rise" style={{ maxWidth:660, display:'flex', flexDirection:'column', gap:12 }}>
                {[['ไฟล์โปรเจกต์เริ่มต้น','.zip · 240 KB'],['ใบงานประกอบบทเรียน','.pdf · 1.2 MB'],['สรุปคำสั่งที่ใช้บ่อย','.pdf · 480 KB']].map(([n,m])=>(
                  <div key={n} className="card" style={{ padding:'15px 18px', display:'flex', alignItems:'center', gap:13, boxShadow:'none' }}>
                    <span style={{ width:38, height:38, borderRadius:9, background:a.soft, display:'grid', placeItems:'center' }}><Icon name="book" size={18} color={a.c}/></span>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:600, fontSize:15 }}>{n}</div>
                      <div style={{ fontSize:13, color:'var(--muted)', fontFamily:'var(--mono)' }}>{m}</div>
                    </div>
                    <button className="btn btn-ghost btn-sm">ดาวน์โหลด</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ---- playlist sidebar ---- */}
          <aside className="card" style={{ padding:0, overflow:'hidden', position:'sticky', top:96 }}>
            <div style={{ padding:'20px 22px', borderBottom:'1px solid var(--line)' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
                <span style={{ fontWeight:700, fontSize:16 }}>เนื้อหาคอร์ส</span>
                <span style={{ fontFamily:'var(--mono)', fontSize:13, color:a.c, fontWeight:600 }}>{pct}%</span>
              </div>
              <Progress value={pct} color={a.c}/>
              <div style={{ fontSize:13, color:'var(--muted)', marginTop:9 }}>เรียนแล้ว {done.size} จาก {flat.length} บท</div>
            </div>
            <div style={{ maxHeight:'62vh', overflowY:'auto' }}>
              {mods.map((m,mi)=>(
                <div key={mi}>
                  <div style={{ padding:'14px 22px 8px', fontFamily:'var(--mono)', fontSize:12, letterSpacing:'0.05em', color:'var(--muted)', fontWeight:600, textTransform:'uppercase', background:'var(--surface-2)' }}>
                    {String(mi+1).padStart(2,'0')} · {m.t}
                  </div>
                  {m.lessons.map((t,li)=>{
                    const idx = flat.findIndex(f=>f.mi===mi&&f.li===li);
                    const isCur = idx===cur;
                    const isDone = done.has(idx);
                    return (
                      <button key={li} onClick={()=>setCur(idx)}
                        style={{ width:'100%', display:'flex', alignItems:'center', gap:12, padding:'12px 22px', textAlign:'left',
                          background:isCur?a.soft:'transparent', borderLeft:isCur?`3px solid ${a.c}`:'3px solid transparent', transition:'background .15s' }}>
                        <span style={{ width:26, height:26, borderRadius:'50%', flex:'0 0 auto', display:'grid', placeItems:'center',
                          background:isDone?'var(--grass)':(isCur?a.c:'var(--surface-2)'), border:isDone||isCur?'none':'1.5px solid var(--line-2)' }}>
                          {isDone ? <Icon name="check" size={14} color="#fff" stroke={3}/> : <Icon name="play" size={11} color={isCur?'#fff':'var(--muted)'}/>}
                        </span>
                        <span style={{ flex:1, fontSize:14.5, fontWeight:isCur?600:400, color:isCur?'var(--ink)':'var(--ink-2)' }}>{t}</span>
                        <span style={{ fontFamily:'var(--mono)', fontSize:12, color:'var(--muted)' }}>{flat[idx].dur}</span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

Object.assign(window, { Lesson });
