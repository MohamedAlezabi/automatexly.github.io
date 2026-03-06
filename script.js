/* Script for AutomateX OS: canvas network, division switcher, scrollytelling, gallery modals, configurator, micro-interactions */
(()=>{
  // Helpers
  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));

  document.addEventListener('DOMContentLoaded',()=>{
    // Year
    const y = $('#year'); if(y) y.textContent = new Date().getFullYear();

    // Division switcher
    const segs = $$('.division-switcher .seg');
    segs.forEach(btn=>btn.addEventListener('click', e=>{
      segs.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const d = btn.dataset.division;
      document.body.setAttribute('data-division', d);
      applyDivision(d);
    }));

    function applyDivision(div){
      // change CSS vars and hero copy
      const map = {
        'ax':{accent:'#6A00FF',accent2:'#4f00ff',title:$('.hero-title').dataset.ax, sub:$('.hero-sub').dataset.ax},
        'ax-media':{accent:'#ff0058',accent2:'#ff8a00',title:$('.hero-title').dataset['ax-media']||'Media pipelines that scale',sub:$('.hero-sub').dataset['ax-media']||''},
        'ax-training':{accent:'#00e5ff',accent2:'#6affc3',title:$('.hero-title').dataset['ax-training']||'Training that builds capability',sub:$('.hero-sub').dataset['ax-training']||''}
      };
      const info = map[div]||map['ax'];
      document.documentElement.style.setProperty('--accent', info.accent);
      document.documentElement.style.setProperty('--accent-2', info.accent2);
      const t = $('.hero-title'); if(t) t.textContent = info.title;
      const s = $('.hero-sub'); if(s) s.textContent = info.sub;
    }
    // initialize
    applyDivision(document.body.getAttribute('data-division')||'ax');

    // Canvas network
    initCanvasNetwork();

    // Scrollytelling: highlight left info as right steps enter
    const steps = $$('.os-step');
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(en=>{
        if(en.isIntersecting){
          steps.forEach(s=>s.classList.toggle('active', s===en.target));
          // animate console or HUD when step changes
        }
      });
    }, {threshold:0.6});
    steps.forEach(s=>io.observe(s));

    // Reveal on scroll (micro interactions)
    const reveals = $$('section, .tile, .case-card, .price-card');
    const revIO = new IntersectionObserver((e)=>{
      e.forEach(i=>{ if(i.isIntersecting) i.target.classList.add('reveal'); });
    }, {threshold:0.12});
    reveals.forEach(r=>revIO.observe(r));

    // Gallery modal with animated SVG diagram
    const modal = $('#modal'); const modalContent = $('#modal-content');
    $$('.gallery-grid .tile').forEach(tile=>{
      tile.addEventListener('click',()=>{
        const id = tile.dataset.system;
        openModalFor(id);
      });
      // 3D tilt
      tile.addEventListener('mousemove', e=>{
        const rect = tile.getBoundingClientRect();
        const mx = (e.clientX - rect.left) / rect.width - 0.5;
        const my = (e.clientY - rect.top) / rect.height - 0.5;
        tile.style.transform = `perspective(800px) rotateX(${ -my*6 }deg) rotateY(${ mx*8 }deg) translateZ(6px)`;
      });
      tile.addEventListener('mouseleave', ()=>{ tile.style.transform=''; });
    });

    $('#modal').addEventListener('click', e=>{ if(e.target.id==='modal' || e.target.classList.contains('modal-close')) closeModal(); });

    function openModalFor(id){
      modalContent.innerHTML = getModalMarkup(id);
      modal.setAttribute('aria-hidden','false');
      modal.classList.add('open');
      // animate SVG flow
      const svg = modalContent.querySelector('svg');
      if(svg){ svg.classList.add('animate'); }
    }
    function closeModal(){ modal.setAttribute('aria-hidden','true'); modal.classList.remove('open'); modalContent.innerHTML=''; }

    function getModalMarkup(id){
      // simple inline animated flow diagram SVG per system
      const title = id.replace(/-/g,' ');
      return `<h3>${title}</h3><div class="flow-wrap"><svg viewBox="0 0 600 160" preserveAspectRatio="xMidYMid meet" class="flow-svg" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g1"><stop offset="0" stop-color="var(--accent)"/><stop offset="1" stop-color="var(--accent-2)"/></linearGradient></defs><g stroke="url(#g1)" fill="none" stroke-width="2"><path class="flow-path" d="M30 80 C150 10,250 150,370 80 C470 30,550 130,570 80" stroke-linecap="round"/></g><g class="nodes" fill="currentColor"><circle cx="30" cy="80" r="8"/><circle cx="190" cy="40" r="8"/><circle cx="370" cy="80" r="8"/><circle cx="550" cy="80" r="8"/></g></svg><p class="muted">Animated mini-flow for <strong>${title}</strong></p></div>`;
    }

    // Configurator
    $('#cfg-generate').addEventListener('click', ()=>{
      const g = $('#cfg-goal').value; const c = $('#cfg-channel').value; const t = $('#cfg-tool').value;
      const blueprint = buildBlueprint(g,c,t);
      $('#cfg-output').innerHTML = `<div class="blueprint"><h4>Recommended system</h4><p>${blueprint.summary}</p><pre>${blueprint.steps.map(s=>'- '+s).join('\n')}</pre><a class="btn primary" href="mailto:hello@automatexly.com?subject=Blueprint%20Request">Book Call</a></div>`;
    });

    function buildBlueprint(goal,channel,tool){
      const steps = ['Intake via '+channel, 'Auto‑qualify with AI agent', 'Sync to '+tool, 'Notify team + dashboard'];
      const summary = `${goal} system using ${channel} and ${tool} to automate intake, qualification and tracking.`;
      return {summary,steps};
    }

    // Pricing toggle
    $$('.ptoggle').forEach(btn=>btn.addEventListener('click',()=>{
      $$('.ptoggle').forEach(b=>b.classList.remove('active')); btn.classList.add('active');
      const period = btn.dataset.period;
      $$('.price').forEach(p=>{ p.textContent = p.dataset[period]; });
    }));

    // Smooth anchors
    $$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
      const href = a.getAttribute('href'); if(href.length>1){ const el=document.querySelector(href); if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth',block:'start'}); }}
    }));
  });

  /* Canvas network implementation */
  function initCanvasNetwork(){
    const canvas = document.getElementById('hero-canvas'); if(!canvas) return;
    const ctx = canvas.getContext('2d');
    let w=canvas.width=canvas.clientWidth, h=canvas.height=canvas.clientHeight, dpr=window.devicePixelRatio||1; canvas.width = w*dpr; canvas.height = h*dpr; ctx.scale(dpr,dpr);
    const maxNodes = Math.max(12, Math.floor((w*h)/90000));
    const nodes = [];
    for(let i=0;i<maxNodes;i++){ nodes.push({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-0.5)*0.3,vy:(Math.random()-0.5)*0.3,r:2+Math.random()*3}); }
    let mouse = {x:-9999,y:-9999};
    canvas.addEventListener('mousemove', e=>{ const r=canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
    canvas.addEventListener('mouseleave', ()=>{ mouse.x=-9999; mouse.y=-9999; });

    function step(){
      ctx.clearRect(0,0,w,h);
      // update
      for(let i=0;i<nodes.length;i++){
        const n = nodes[i]; n.x += n.vx; n.y += n.vy;
        if(n.x<0||n.x>w) n.vx*=-1; if(n.y<0||n.y>h) n.vy*=-1;
        // mouse attraction
        const dx = mouse.x - n.x, dy = mouse.y - n.y; const dist = Math.hypot(dx,dy);
        if(dist<160){ n.vx += dx/dist*0.03; n.vy += dy/dist*0.03; }
      }
      // draw links
      for(let i=0;i<nodes.length;i++){
        for(let j=i+1;j<nodes.length;j++){
          const a=nodes[i], b=nodes[j]; const dx=a.x-b.x, dy=a.y-b.y; const dist=Math.hypot(dx,dy);
          if(dist<140){ ctx.strokeStyle = gradientLine(a,b); ctx.globalAlpha = 1 - dist/140; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke(); }
        }
      }
      // draw nodes
      nodes.forEach(n=>{ ctx.fillStyle='white'; ctx.beginPath(); ctx.globalAlpha=0.9; ctx.arc(n.x,n.y,n.r,0,Math.PI*2); ctx.fill();
        // pulses
        if(Math.random()<0.004) { ctx.save(); ctx.strokeStyle = 'rgba(106,0,255,0.12)'; ctx.globalAlpha=0.4; ctx.beginPath(); ctx.arc(n.x,n.y,n.r+8,0,Math.PI*2); ctx.stroke(); ctx.restore(); }
      });
      ctx.globalAlpha=1;
      requestAnimationFrame(step);
    }
    function gradientLine(a,b){ const g = ctx.createLinearGradient(a.x,a.y,b.x,b.y); g.addColorStop(0, getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()); g.addColorStop(1, getComputedStyle(document.documentElement).getPropertyValue('--accent-2').trim()); return g; }
    // Resize handling
    let resizeTimer;
    window.addEventListener('resize', ()=>{ clearTimeout(resizeTimer); resizeTimer=setTimeout(()=>{ w=canvas.clientWidth; h=canvas.clientHeight; const dpr=window.devicePixelRatio||1; canvas.width=w*dpr; canvas.height=h*dpr; ctx.setTransform(dpr,0,0,dpr,0,0); },200); });
    requestAnimationFrame(step);
  }
})();
