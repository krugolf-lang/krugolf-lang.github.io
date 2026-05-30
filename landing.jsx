/* ===== Krugolf — Landing page ===== */
function Hero({ nav }) {
  return (
    <section style={{ position:'relative', overflow:'hidden' }}>
      {/* playful floating shapes */}
      <div aria-hidden="true" style={{ position:'absolute', inset:0, pointerEvents:'none' }}>
        <span style={{ position:'absolute', top:'12%', right:'7%', width:120, height:120, borderRadius:'50%', background:'var(--sun)', opacity:.5 }}/>
        <span style={{ position:'absolute', top:'42%', right:'22%', width:46, height:46, borderRadius:12, background:'var(--coral)', transform:'rotate(18deg)', opacity:.8 }}/>
        <span style={{ position:'absolute', bottom:'14%', left:'4%', width:70, height:70, borderRadius:'50%', border:'10px solid var(--sky)', opacity:.45 }}/>
      </div>

      <div className="wrap" style={{ paddingTop:64, paddingBottom:40, position:'relative' }}>
        <div className="hero-grid" style={{ display:'grid', gridTemplateColumns:'1.15fr 0.85fr', gap:48, alignItems:'center' }}>
          <div className="rise">
            <div style={{ display:'inline-flex', alignItems:'center', gap:9, padding:'8px 15px', background:'var(--surface)', borderRadius:999, border:'1px solid var(--line)', boxShadow:'var(--shadow-sm)', marginBottom:26 }}>
              <span className="dot" style={{ background:'var(--grass)' }}/>
              <span style={{ fontSize:13.5, fontWeight:500 }}>เปิดรับนักเรียนรุ่นใหม่ ภาคเรียนนี้</span>
            </div>
            <h1 style={{ fontSize:'clamp(40px, 5.6vw, 78px)', letterSpacing:'-0.03em' }}>
              เรียน<span style={{ color:'var(--coral)' }}>โค้ด</span> สนุก<br/>
              เหมือน<span style={{ color:'var(--sky)' }}>เล่นเกม</span>
            </h1>
            <p style={{ fontSize:'clamp(17px,1.5vw,21px)', color:'var(--ink-2)', marginTop:22, maxWidth:520 }}>
              แพลตฟอร์มเรียนเขียนโปรแกรมและทักษะดิจิทัลสำหรับเด็กไทย ออกแบบบทเรียนทีละขั้น เข้าใจง่าย ลงมือทำจริง โดยครูกอล์ฟและทีมผู้เชี่ยวชาญ
            </p>
            <div style={{ display:'flex', gap:14, marginTop:32, flexWrap:'wrap' }}>
              <button className="btn btn-accent btn-lg" onClick={()=>nav('catalog')}>
                เริ่มเรียนเลย <Icon name="arrow" size={20} color="#fff"/>
              </button>
              <button className="btn btn-ghost btn-lg" onClick={()=>nav('lesson',{id:'scratch'})}>
                <Icon name="play" size={16}/> ดูตัวอย่างบทเรียน
              </button>
            </div>
            <div style={{ display:'flex', gap:38, marginTop:42, flexWrap:'wrap' }}>
              <Stat value="12,000+" label="นักเรียนทั่วไทย"/>
              <Stat value="40+" label="บทเรียนคุณภาพ"/>
              <Stat value="4.9★" label="คะแนนความพึงพอใจ"/>
            </div>
          </div>

          {/* hero visual card */}
          <div className="rise" style={{ position:'relative', animationDelay:'.08s' }}>
            <div className="card" style={{ padding:0, overflow:'hidden', borderRadius:'var(--r-xl)', boxShadow:'var(--shadow-lg)' }}>
              <div className="ph" data-label="ภาพ: เด็กกำลังเรียนเขียนโค้ด" style={{ height:330, borderRadius:0 }}>
                <div aria-hidden="true" style={{ position:'absolute', inset:0, background:'repeating-linear-gradient(135deg, transparent 0 22px, rgba(33,27,20,0.035) 22px 44px)' }}/>
              </div>
              <div style={{ padding:'20px 22px', display:'flex', alignItems:'center', gap:14 }}>
                <span style={{ width:46, height:46, borderRadius:12, background:'var(--coral)', display:'grid', placeItems:'center', flex:'0 0 auto' }}>
                  <Icon name="play" size={18} color="#fff"/>
                </span>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:600, fontSize:15 }}>บทที่ 1 · สร้างเกมแรกของหนู</div>
                  <div style={{ fontSize:13, color:'var(--muted)' }}>Scratch เบื้องต้น · 4 นาที</div>
                </div>
                <Icon name="arrow" size={20} color="var(--muted)"/>
              </div>
            </div>
            {/* floating mini-badges */}
            <div style={{ position:'absolute', top:-18, left:-18, background:'var(--surface)', borderRadius:16, padding:'10px 14px', boxShadow:'var(--shadow-md)', display:'flex', alignItems:'center', gap:9 }}>
              <span style={{ width:30, height:30, borderRadius:8, background:'var(--sun-soft)', display:'grid', placeItems:'center' }}><Icon name="star" size={16} color="var(--tanger)"/></span>
              <span style={{ fontSize:13.5, fontWeight:600 }}>+50 แต้ม!</span>
            </div>
            <div style={{ position:'absolute', bottom:18, right:-20, background:'var(--surface)', borderRadius:16, padding:'10px 14px', boxShadow:'var(--shadow-md)', display:'flex', alignItems:'center', gap:9 }}>
              <span style={{ width:30, height:30, borderRadius:8, background:'var(--grass-soft)', display:'grid', placeItems:'center' }}><Icon name="check" size={16} color="var(--grass)" stroke={2.6}/></span>
              <span style={{ fontSize:13.5, fontWeight:600 }}>ทำสำเร็จ!</span>
            </div>
          </div>
        </div>

        {/* logos / trust strip */}
        <div style={{ marginTop:64, paddingTop:28, borderTop:'1px solid var(--line)', display:'flex', alignItems:'center', gap:30, flexWrap:'wrap', justifyContent:'space-between' }}>
          <span className="eyebrow">ใช้สอนในโรงเรียนชั้นนำกว่า 120 แห่ง</span>
          <div style={{ display:'flex', gap:34, flexWrap:'wrap', opacity:.55 }}>
            {['โรงเรียนสาธิต','สพฐ.','EduTech TH','CodeKids','Digital Youth'].map(n=>(
              <span key={n} style={{ fontFamily:'var(--mono)', fontWeight:600, fontSize:15 }}>{n}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n:'01', icon:'grid',  c:'var(--coral)', soft:'var(--coral-soft)', t:'เลือกเส้นทางของหนู', d:'เลือกคอร์สตามวัยและความสนใจ มีแบบทดสอบช่วยจัดระดับให้อัตโนมัติ' },
    { n:'02', icon:'play',  c:'var(--sky)',   soft:'var(--sky-soft)',   t:'ดูและลงมือทำตาม', d:'บทเรียนวิดีโอสั้น กระชับ พร้อมพื้นที่เขียนโค้ดในเบราว์เซอร์ทันที' },
    { n:'03', icon:'star',  c:'var(--sun)',   soft:'var(--sun-soft)',   t:'สะสมแต้มและเหรียญ', d:'ทำภารกิจสำเร็จเพื่อรับแต้ม ปลดล็อกเหรียญรางวัล สนุกเหมือนเล่นเกม' },
    { n:'04', icon:'cert',  c:'var(--grass)', soft:'var(--grass-soft)', t:'รับเกียรติบัตร', d:'จบคอร์สพร้อมผลงานจริงและเกียรติบัตรที่ใช้ในแฟ้มสะสมงานได้' },
  ];
  return (
    <section className="wrap" style={{ padding:'72px 32px' }}>
      <div style={{ textAlign:'center', maxWidth:620, margin:'0 auto 50px' }}>
        <span className="eyebrow">เรียนยังไง</span>
        <h2 style={{ fontSize:'clamp(30px,3.6vw,46px)', marginTop:14 }}>4 ขั้นตอนง่าย ๆ สู่การเป็นนักสร้างดิจิทัล</h2>
      </div>
      <div className="steps-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:22 }}>
        {steps.map((s,i)=>(
          <div key={s.n} className="card rise" style={{ padding:26, animationDelay:`${i*.06}s` }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:20 }}>
              <span style={{ width:52, height:52, borderRadius:14, background:s.soft, display:'grid', placeItems:'center' }}>
                <Icon name={s.icon} size={24} color={s.c}/>
              </span>
              <span style={{ fontFamily:'var(--mono)', fontSize:13, color:'var(--muted)', fontWeight:600 }}>{s.n}</span>
            </div>
            <h3 style={{ fontSize:21, marginBottom:8 }}>{s.t}</h3>
            <p style={{ fontSize:14.5, color:'var(--ink-2)' }}>{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturedCourses({ nav }) {
  const feat = COURSES.slice(0,3);
  return (
    <section style={{ background:'var(--bg-deep)', padding:'72px 0' }}>
      <div className="wrap">
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', gap:20, marginBottom:38, flexWrap:'wrap' }}>
          <div>
            <span className="eyebrow">คอร์สแนะนำ</span>
            <h2 style={{ fontSize:'clamp(30px,3.6vw,46px)', marginTop:14, maxWidth:560 }}>คอร์สยอดนิยมที่เด็ก ๆ หลงรัก</h2>
          </div>
          <button className="btn btn-ghost" onClick={()=>nav('catalog')}>ดูคอร์สทั้งหมด <Icon name="arrow" size={18}/></button>
        </div>
        <div className="course-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }}>
          {feat.map((c,i)=> <CourseCard key={c.id} course={c} nav={nav} delay={i*.06}/> )}
        </div>
      </div>
    </section>
  );
}

function CTA({ nav }) {
  return (
    <section className="wrap" style={{ padding:'80px 32px' }}>
      <div style={{ position:'relative', overflow:'hidden', borderRadius:'var(--r-xl)', background:'var(--ink)', color:'var(--surface)', padding:'64px 56px', boxShadow:'var(--shadow-lg)' }}>
        <div aria-hidden="true" style={{ position:'absolute', inset:0, pointerEvents:'none' }}>
          <span style={{ position:'absolute', top:-40, right:60, width:160, height:160, borderRadius:'50%', background:'var(--coral)', opacity:.85 }}/>
          <span style={{ position:'absolute', bottom:-50, right:-30, width:200, height:200, borderRadius:'50%', background:'var(--sky)', opacity:.5 }}/>
          <span style={{ position:'absolute', top:40, right:240, width:54, height:54, borderRadius:14, background:'var(--sun)', transform:'rotate(20deg)' }}/>
        </div>
        <div style={{ position:'relative', maxWidth:560 }}>
          <h2 style={{ fontSize:'clamp(30px,4vw,52px)', color:'var(--surface)' }}>พร้อมให้ลูกของคุณ<br/>เริ่มต้นแล้วหรือยัง?</h2>
          <p style={{ fontSize:18, color:'rgba(252,248,240,0.78)', marginTop:18 }}>
            ทดลองเรียนคอร์สเบื้องต้นฟรี ไม่ต้องใช้บัตรเครดิต เริ่มได้ทันทีในเบราว์เซอร์
          </p>
          <div style={{ display:'flex', gap:14, marginTop:30, flexWrap:'wrap' }}>
            <button className="btn btn-accent btn-lg" onClick={()=>nav('catalog')}>เริ่มเรียนฟรี <Icon name="arrow" size={20} color="#fff"/></button>
            <button className="btn btn-lg" style={{ background:'rgba(252,248,240,0.12)', color:'var(--surface)' }} onClick={()=>nav('catalog')}>
              ดูแพ็กเกจสำหรับโรงเรียน
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Landing({ nav }) {
  return (
    <main>
      <Hero nav={nav}/>
      <HowItWorks/>
      <FeaturedCourses nav={nav}/>
      <CTA nav={nav}/>
    </main>
  );
}

Object.assign(window, { Landing });
