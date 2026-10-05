(function(){
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const rp=n=>'Rp '+n.toLocaleString('id-ID');
const low=s=>s.toLowerCase();

/* ---------- icons ---------- */
const IC={
  search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
  paw:'<circle cx="6" cy="11" r="2"/><circle cx="10" cy="6.5" r="2"/><circle cx="14" cy="6.5" r="2"/><circle cx="18" cy="11" r="2"/><path d="M12 12.5c-3 0-5.5 3-5.5 5.2 0 1.6 1.4 2.3 3 2.3 1 0 1.6-.4 2.5-.4s1.5.4 2.5.4c1.6 0 3-.7 3-2.3 0-2.2-2.5-5.2-5.5-5.2z"/>',
  ruler:'<path d="M3 16 16 3l5 5L8 21z"/><path d="m7 12 2 2M10 9l2 2M13 6l2 2"/>',
  leaf:'<path d="M5 19C5 10 10 5 20 4c0 10-5 15-14 15z"/><path d="M5 19 13 11"/>',
  home:'<path d="M3 11 12 3l9 8"/><path d="M5 10v10h14V10"/>',
  tree:'<path d="M12 22v-6"/><path d="M12 16a5 5 0 0 1-4-8 4 4 0 0 1 8 0 5 5 0 0 1-4 8z"/>',
  gift:'<rect x="3" y="8" width="18" height="4"/><path d="M12 8v13M5 12v9h14v-9M12 8c-3 0-4-4-1.5-4S12 8 12 8zm0 0c3 0 4-4 1.5-4S12 8 12 8z"/>',
  truck:'<path d="M2 6h11v10H2zM13 9h4l4 4v3h-8"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
  book:'<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5"/>',
  users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18.5 14a6.5 6.5 0 0 1 3 6"/>',
  x:'<path d="M6 6l12 12M18 6 6 18"/>',
  chev:'<path d="m6 9 6 6 6-6"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  minus:'<path d="M5 12h14"/>',
  filter:'<path d="M3 5h18M6 12h12M10 19h4"/>',
  moon:'<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
  cloud:'<path d="M7 18a4 4 0 0 1-.5-8 5.5 5.5 0 0 1 10.7-1A4.5 4.5 0 0 1 17 18z"/>',
  cal:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  check:'<path d="m5 12 5 5 9-10"/>',
  chat:'<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>',
  send:'<path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4z"/>'
};
const ico=(n,s=18)=>`<svg class="ic" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[n]||''}</svg>`;

/* ---------- plant illustrations ---------- */
const LEAF={
  heart:'M0 0C-34 6-44-36-14-62C-6-70 6-70 14-62C44-36 34 6 0 0Z',
  oval:'M0 0C-17-8-18-42 0-58C18-42 17-8 0 0Z',
  round:'M0 0C-24-2-26-32 0-36C26-32 24-2 0 0Z',
  lyre:'M0 0C-14-6-26-30-14-58C-8-72 8-72 14-58C26-30 14-6 0 0Z'
};
function leafG(a,bg,x,y,rot,sc){
  let s=`<g transform="translate(${(+x).toFixed(1)} ${(+y).toFixed(1)}) rotate(${rot}) scale(${sc})"><path d="${LEAF[a.shape]}" fill="${a.c}"/>`;
  s+=`<path d="M0-2L0-50" stroke="${a.d}" stroke-width="1.6" fill="none" stroke-linecap="round"/>`;
  if(a.stripe)s+=`<path d="M0-10L-11-22M0-10L11-22M0-22L-12-34M0-22L12-34M0-34L-8-44M0-34L8-44" stroke="${a.stripe}" stroke-width="2" fill="none" stroke-linecap="round"/>`;
  if(a.slit)s+=`<path d="M-2-34L-30-40M-2-22L-32-20M2-34L30-40M2-22L32-20" stroke="${bg}" stroke-width="3.2" stroke-linecap="round"/>`;
  return s+'</g>';
}
function flower(x,y,r,c,kind){
  if(kind==='b')return `<circle cx="${x}" cy="${y}" r="${r*.6}" fill="${c}"/><circle cx="${x+r*.55}" cy="${y+r*.3}" r="${r*.5}" fill="${c}"/><circle cx="${x-r*.5}" cy="${y+r*.4}" r="${r*.5}" fill="${c}"/>`;
  let s='';for(let k=0;k<5;k++)s+=`<ellipse cx="${x}" cy="${y-r*.55}" rx="${r*.42}" ry="${r*.6}" fill="${c}" transform="rotate(${k*72} ${x} ${y})"/>`;
  return s+`<circle cx="${x}" cy="${y}" r="${r*.2}" fill="#F3C13A"/>`;
}
function stemLeaf(a,rot,len){
  const r=rot*Math.PI/180,x0=100,y0=160,x1=x0+Math.sin(r)*len,y1=y0-Math.cos(r)*len,cx=x0+Math.sin(r)*len*.25,cy=y0-len*.85;
  const pt=t=>[(1-t)*(1-t)*x0+2*(1-t)*t*cx+t*t*x1,(1-t)*(1-t)*y0+2*(1-t)*t*cy+t*t*y1];
  const dv=t=>[2*(1-t)*(cx-x0)+2*t*(x1-cx),2*(1-t)*(cy-y0)+2*t*(y1-cy)];
  let s=`<path d="M${x0} ${y0}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}" stroke="${a.d}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
  const [rx,ry,n,ang]=a.lf;
  for(let i=1;i<=n;i++){
    const t=.18+.82*i/n,[px,py]=pt(t),[dx,dy]=dv(t),ta=Math.atan2(dy,dx)*180/Math.PI;
    [-1,1].forEach(sg=>{
      const ph=(ta+sg*ang)*Math.PI/180;
      s+=`<ellipse rx="${rx}" ry="${ry}" fill="${a.c}" transform="translate(${(px+Math.cos(ph)*ry*.85).toFixed(1)} ${(py+Math.sin(ph)*ry*.85).toFixed(1)}) rotate(${(ta+sg*ang+90).toFixed(1)})"/>`;
    });
  }
  const [tx,ty]=[x1,y1],tang=Math.atan2(dv(1)[1],dv(1)[0])*180/Math.PI;
  return s+`<ellipse rx="${rx}" ry="${ry}" fill="${a.c}" transform="translate(${tx.toFixed(1)} ${ty.toFixed(1)}) rotate(${(tang+90).toFixed(1)})"/>`;
}
function art(p,o={}){
  const a=p.art;let g='';
  switch(a.k){
    case 'leafy':{
      if(a.trunk)g+=`<path d="M100 160L100 ${160-a.trunk}" stroke="${a.d}" stroke-width="6" stroke-linecap="round"/>`;
      a.leaves.forEach(([rot,len,sc,f=0])=>{
        const r=rot*Math.PI/180,sy=160-(a.trunk||0)*f,ex=100+Math.sin(r)*len,ey=sy-Math.cos(r)*len;
        g+=`<path d="M100 ${sy}L${ex.toFixed(1)} ${ey.toFixed(1)}" stroke="${a.d}" stroke-width="3" stroke-linecap="round"/>`+leafG(a,p.bg,ex,ey,rot,sc);
      });
      (a.flowers||[]).forEach(([x,y,r,c,k])=>g+=flower(x,y,r,c,k));
      break;}
    case 'rosette':{
      const d=a.wide?'M0 0C-15-8-14-28 0-38C14-28 15-8 0 0Z':'M0 0C-8-10-8-34 0-50C8-34 8-10 0 0Z';
      a.layers.forEach(([sc,from,to,step,col])=>{
        for(let ang=from;ang<=to;ang+=step){
          g+=`<g transform="translate(100 160) rotate(${ang}) scale(${(sc*a.s).toFixed(2)})"><path d="${d}" fill="${col?a.c2:a.c}"${a.edge?` stroke="${a.edge}" stroke-width="1.5"`:''}/>${a.bars?`<path d="M-3-12L3-12M-3-22L3-22M-2-32L2-32" stroke="${a.bars}" stroke-width="1.6" stroke-linecap="round"/>`:''}</g>`;
        }
      });
      break;}
    case 'blades':
      a.blades.forEach(([rot,sc])=>{
        g+=`<g transform="translate(${100+rot*.8} 164) rotate(${rot}) scale(1 ${sc})"><path d="M-9 0C-12-45-8-86 0-112C8-86 12-45 9 0Z" fill="${a.c}" stroke="${a.d}" stroke-width="2.4"/><path d="M-8-30C-3-34 3-34 8-30M-9-58C-3-62 3-62 9-58M-6-84C-2-87 2-87 6-84" stroke="${a.c2}" stroke-width="2" fill="none" stroke-linecap="round"/></g>`;
      });break;
    case 'arch':
      a.arcs.forEach(([ex,py])=>{
        const d=`M100 160Q${100+ex*.35} ${py} ${100+ex} ${148+Math.abs(ex)*.35}`;
        g+=`<path d="${d}" stroke="${a.c}" stroke-width="7" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${a.d}" stroke-width="2" fill="none" stroke-linecap="round"/>`;
      });break;
    case 'stems':
      a.stems.forEach(([rot,len])=>g+=stemLeaf(a,rot,len));break;
    case 'cactus':
      g+=`<circle cx="100" cy="128" r="36" fill="${a.c}"/>`;
      ['M100 92C84 108 84 148 100 164','M100 92C116 108 116 148 100 164','M100 92C92 110 92 146 100 164','M100 92C108 110 108 146 100 164'].forEach(d=>g+=`<path d="${d}" stroke="${a.d}" stroke-width="1.5" fill="none"/>`);
      [[88,112],[112,112],[80,130],[120,130],[92,140],[108,140],[100,122],[88,152],[112,152],[100,104],[100,142]].forEach(([x,y])=>g+=`<path d="M${x-3} ${y-3}l6 6M${x+3} ${y-3}l-6 6" stroke="#F4EBC8" stroke-width="1.3" stroke-linecap="round"/>`);
      g+=flower(100,92,15,a.flower);break;
    case 'lav':
      g+=`<path d="M100 160C82 142 70 132 60 118M100 160C118 142 132 132 142 118M100 160C92 140 88 130 84 116" stroke="${a.d}" stroke-width="3.4" fill="none" stroke-linecap="round"/>`;
      [-44,-28,-12,4,20,38].forEach(dx=>{
        const tx=100+dx,ty=70+Math.abs(dx)*.5;
        g+=`<path d="M${100+dx*.3} 160Q${100+dx*.2} 112 ${tx} ${ty}" stroke="${a.d}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
        for(let k=0;k<6;k++)g+=`<ellipse cx="${tx}" cy="${ty-k*7+4}" rx="${4-k*.25}" ry="5" fill="${a.c}"/>`;
      });break;
  }
  const pot=`<ellipse cx="100" cy="216" rx="54" ry="4" fill="rgba(0,0,0,.09)"/><path d="M62 172H138L130 212Q129 216 125 216H75Q71 216 70 212Z" fill="${a.pot}"/><rect x="55" y="158" width="90" height="16" rx="5" fill="${a.rim}"/>`;
  let after='';
  if(a.trail){
    after+=`<path d="M64 170C44 182 48 200 42 216M136 170C154 184 150 202 158 216" stroke="${a.d}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
    [[52,182,200],[46,198,170],[44,212,195],[149,186,160],[153,200,190],[157,212,165]].forEach(([x,y,r])=>after+=leafG(a,p.bg,x,y,r,.28));
  }
  const vb=o.zoom?'30 12 140 140':'0 0 200 220';
  return `<svg viewBox="${vb}" preserveAspectRatio="${o.zoom?'xMidYMid slice':'xMidYMax meet'}" role="img" aria-label="Ilustrasi ${esc(p.n)}" xmlns="http://www.w3.org/2000/svg">${g}${pot}${after}</svg>`;
}

/* ---------- data (sample) ---------- */
const BG={mint:'#DCEAD0',sky:'#D6E7EE',lilac:'#E4DCF0',butter:'#F4EAC0',blush:'#F3DADD',peach:'#F5DFCF',sage:'#D5E3D8'};
const L3=[[1,-80,80,20,0],[.85,-60,60,20,0],[.62,-30,30,20,1]];
const PL=[
 {id:'monstera',n:'Monstera',sci:'Monstera deliciosa',orig:'Hutan tropis Meksiko dan Amerika Tengah',price:185000,size:'Sedang',light:'Sedang',water:'Sedang',care:'Mudah',pet:false,place:'Indoor',type:'Tanaman hias daun',sold:98,nw:14,gift:false,bg:BG.mint,
  desc:'Daun besar berlubang yang jadi ikon ruang tamu modern. Tumbuh cepat dan memaafkan kesalahan perawatan.',tip:'Lap daun dengan kain lembap sebulan sekali agar debu tidak menghalangi cahaya. Beri tiang rambat jika ingin daun tumbuh lebih besar.',
  art:{k:'leafy',shape:'heart',c:'#2F7A4E',d:'#1D5A38',slit:1,pot:'#E9E2D0',rim:'#D8CFB8',leaves:[[-58,58,.8],[-25,88,.95],[8,70,1],[38,92,.9],[62,54,.75],[-8,42,.65]]}},
 {id:'sansevieria',n:'Sansevieria',sci:'Dracaena trifasciata',orig:'Afrika Barat',price:75000,size:'Sedang',light:'Rendah',water:'Jarang',care:'Mudah',pet:false,place:'Indoor',type:'Tanaman hias daun',sold:120,nw:5,gift:true,bg:BG.butter,
  desc:'Daun tegak berstrip kuning yang tahan cahaya minim dan sering lupa disiram. Cocok untuk kamar dan sudut kantor.',tip:'Kelebihan air lebih berbahaya daripada kekurangan. Pastikan tanah benar-benar kering sebelum menyiram lagi.',
  art:{k:'blades',c:'#2E6B45',d:'#C4D96B',c2:'#8FBF8E',pot:'#33403A',rim:'#26302B',blades:[[-28,.75],[-14,.95],[0,1.1],[13,.9],[27,.7],[-4,.6]]}},
 {id:'kaktus',n:'Kaktus Bulat Mini',sci:'Mammillaria sp.',orig:'Gurun Meksiko',price:25000,size:'Kecil',light:'Terang',water:'Jarang',care:'Mudah',pet:false,place:'Indoor',type:'Kaktus',sold:60,nw:10,gift:true,bg:BG.blush,
  desc:'Kaktus bulat mungil dengan bunga merah muda. Cocok untuk meja kerja yang kena matahari.',tip:'Berduri, jadi letakkan di tempat yang tidak terjangkau anak dan hewan. Siram sedikit saja saat tanah kering total.',
  art:{k:'cactus',c:'#5C9A5A',d:'#3E7A45',flower:'#F07AA0',pot:'#7FA8B8',rim:'#6B93A4'}},
 {id:'peperomia',n:'Peperomia Watermelon',sci:'Peperomia argyreia',orig:'Amerika Selatan (Brasil)',price:55000,size:'Kecil',light:'Sedang',water:'Sedang',care:'Mudah',pet:true,place:'Indoor',type:'Tanaman hias daun',sold:64,nw:12,gift:true,bg:BG.sky,
  desc:'Daun bulat bermotif seperti semangka. Ukurannya kompak dan tidak butuh banyak ruang.',tip:'Daunnya menyimpan air, jadi biarkan bagian atas tanah mengering sebelum menyiram.',
  art:{k:'leafy',shape:'round',c:'#5E9D6B',d:'#2F6B45',stripe:'#DDEBDD',pot:'#E8B8B0',rim:'#D9A39B',leaves:[[-70,34,.85],[-45,48,.9],[-15,52,1],[15,50,.95],[42,46,.9],[68,32,.8],[0,30,.7]]}},
 {id:'calathea',n:'Calathea Orbifolia',sci:'Goeppertia orbifolia',orig:'Bolivia',price:145000,size:'Sedang',light:'Sedang',water:'Rutin',care:'Sulit',pet:true,place:'Indoor',type:'Tanaman hias daun',sold:52,nw:8,gift:false,bg:BG.lilac,
  desc:'Daun lebar bermotif garis yang bergerak mengikuti cahaya. Cantik, tapi butuh kelembapan yang terjaga.',tip:'Gunakan air yang sudah diendapkan semalam. Ujung daun cokelat biasanya tanda udara terlalu kering.',
  art:{k:'leafy',shape:'oval',c:'#3E8A57',d:'#1E4F32',stripe:'#9BD0A4',pot:'#5A6E9C',rim:'#4A5C88',leaves:[[-50,60,1.1],[-20,80,1.2],[10,70,1.15],[40,60,1.1],[0,40,.9]]}},
 {id:'spider',n:'Spider Plant',sci:'Chlorophytum comosum',orig:'Afrika Selatan',price:45000,size:'Kecil',light:'Sedang',water:'Sedang',care:'Mudah',pet:true,place:'Indoor',type:'Tanaman gantung',sold:88,nw:6,gift:true,bg:BG.sage,
  desc:'Daun melengkung bergaris krem yang sering menumbuhkan anakan. Salah satu pilihan populer untuk pemula.',tip:'Anakan di ujung sulur bisa dipotong dan ditanam sebagai tanaman baru.',
  art:{k:'arch',c:'#6FB56B',d:'#E9F2C6',pot:'#F2D9A0',rim:'#E2C482',arcs:[[-80,70],[-62,58],[-44,50],[-22,44],[0,40],[22,44],[44,50],[62,58],[80,70]]}},
 {id:'pothos',n:'Pothos Emas',sci:'Epipremnum aureum',orig:'Kepulauan Society, Polinesia',price:40000,size:'Kecil',light:'Rendah',water:'Sedang',care:'Mudah',pet:false,place:'Indoor',type:'Tanaman gantung',sold:110,nw:2,gift:true,bg:BG.butter,
  desc:'Sulur menjuntai yang mudah diatur, di pot gantung atau di rak. Tahan cahaya redup.',tip:'Potong ujung sulur agar tumbuh lebih rimbun. Potongannya bisa diakarkan di air.',
  art:{k:'leafy',shape:'heart',c:'#4FA55E',d:'#2C7442',trail:1,pot:'#F0EDE6',rim:'#DDD8CC',leaves:[[-60,34,.55],[-32,50,.6],[-5,58,.65],[22,50,.6],[50,36,.55],[70,22,.5]]}},
 {id:'haworthia',n:'Haworthia Zebra',sci:'Haworthiopsis attenuata',orig:'Afrika Selatan',price:35000,size:'Kecil',light:'Sedang',water:'Jarang',care:'Mudah',pet:true,place:'Indoor',type:'Sukulen',sold:70,nw:9,gift:true,bg:BG.lilac,
  desc:'Sukulen mungil berdaun runcing dengan garis putih. Muat di meja belajar.',tip:'Hindari matahari langsung siang hari karena ujung daun bisa terbakar. Siram sedikit saat tanah kering total.',
  art:{k:'rosette',s:1.25,c:'#2F6B4B',c2:'#3E8560',bars:'#E9F1E4',layers:L3,pot:'#C7B7E0',rim:'#B5A2D2'}},
 {id:'echeveria',n:'Echeveria Mawar Batu',sci:'Echeveria elegans',orig:'Meksiko',price:30000,size:'Kecil',light:'Terang',water:'Jarang',care:'Mudah',pet:true,place:'Keduanya',type:'Sukulen',sold:95,nw:11,gift:true,bg:BG.peach,
  desc:'Sukulen berbentuk mawar dengan ujung daun kemerahan. Cocok sebagai hadiah kecil.',tip:'Butuh sinar matahari langsung beberapa jam agar bentuknya tetap padat dan tidak memanjang.',
  art:{k:'rosette',wide:1,s:1.75,c:'#8DBFAE',c2:'#B0D8C8',edge:'#E58FA8',layers:[[1,-90,90,20,0],[.85,-70,70,20,0],[.62,-40,40,20,1],[.4,-20,20,20,1]],pot:'#D9B08C',rim:'#C89C76'}},
 {id:'aloe',n:'Aloe Vera',sci:'Aloe vera',orig:'Jazirah Arab',price:50000,size:'Sedang',light:'Terang',water:'Jarang',care:'Mudah',pet:false,place:'Keduanya',type:'Sukulen',sold:105,nw:4,gift:false,bg:BG.mint,
  desc:'Daun tebal berisi gel yang biasa dipakai untuk merawat kulit. Tumbuh baik di tempat cerah.',tip:'Gunakan pot berlubang drainase dan media yang porous. Anakan bisa dipisah saat ganti pot.',
  art:{k:'rosette',s:2,c:'#5FA36B',c2:'#7DBB86',layers:[[1,-70,70,25,0],[.85,-50,50,25,0],[.6,-25,25,25,1]],pot:'#C8734F',rim:'#B5643F'}},
 {id:'pakis',n:'Pakis Boston',sci:'Nephrolepis exaltata',orig:'Daerah tropis di seluruh dunia',price:60000,size:'Sedang',light:'Sedang',water:'Rutin',care:'Sedang',pet:true,place:'Keduanya',type:'Pakis',sold:58,nw:7,gift:false,bg:BG.sage,
  desc:'Pakis dengan daun berjumbai lebat. Cocok digantung di teras yang teduh.',tip:'Jaga tanah tetap lembap dan semprot daun saat udara kering.',
  art:{k:'stems',c:'#4E9A54',d:'#2F6B3A',lf:[3.4,8,13,72],pot:'#8A6B58',rim:'#77594A',stems:[[-75,105],[-52,120],[-28,132],[0,135],[28,132],[52,120],[75,105]]}},
 {id:'lyrata',n:'Ficus Lyrata',sci:'Ficus lyrata',orig:'Afrika Barat',price:350000,size:'Besar',light:'Terang',water:'Sedang',care:'Sulit',pet:false,place:'Indoor',type:'Tanaman hias daun',sold:40,nw:13,gift:false,bg:BG.sky,
  desc:'Daun besar berbentuk biola yang jadi titik fokus ruangan. Butuh cahaya terang dan tempat yang tetap.',tip:'Tidak suka dipindah-pindah. Putar pot seperempat putaran tiap minggu agar tumbuh simetris.',
  art:{k:'leafy',shape:'lyre',c:'#3B8D4F',d:'#1F5C33',trunk:72,pot:'#2E3A34',rim:'#222D28',leaves:[[-60,26,1,.3],[60,26,1,.5],[-50,24,.95,.72],[52,22,.9,.9],[0,0,1.05,1]]}},
 {id:'zz',n:'ZZ Plant',sci:'Zamioculcas zamiifolia',orig:'Afrika Timur',price:120000,size:'Sedang',light:'Rendah',water:'Jarang',care:'Mudah',pet:false,place:'Indoor',type:'Tanaman hias daun',sold:82,nw:3,gift:true,bg:BG.blush,
  desc:'Daun mengilap dan batang tegar yang tahan lupa disiram. Cocok untuk kantor dan ruang minim cahaya.',tip:'Umbinya menyimpan air. Siram hanya ketika tanah benar-benar kering.',
  art:{k:'stems',c:'#2F7A45',d:'#1E5530',lf:[6,10,6,62],pot:'#9DC1BC',rim:'#88AEA9',stems:[[-42,105],[-22,125],[0,135],[22,125],[42,105],[-8,92]]}},
 {id:'kembang',n:'Kembang Sepatu',sci:'Hibiscus rosa-sinensis',orig:'Asia Timur',price:65000,size:'Sedang',light:'Terang',water:'Rutin',care:'Sedang',pet:true,place:'Outdoor',type:'Tanaman berbunga',sold:48,nw:15,gift:false,bg:BG.peach,
  desc:'Bunga besar berwarna merah yang mekar hampir sepanjang tahun di tempat cerah.',tip:'Butuh matahari langsung dan siraman rutin. Pangkas ringan agar bercabang dan berbunga lebih banyak.',
  art:{k:'leafy',shape:'oval',c:'#3F8F4E',d:'#2A6B37',pot:'#D7DDE3',rim:'#C2CAD2',leaves:[[-55,40,.6],[-25,60,.65],[10,68,.65],[40,55,.6],[65,36,.55]],flowers:[[72,88,17,'#E9425F'],[36,52,15,'#E9425F'],[-38,66,14,'#F27A8E']]}},
 {id:'lavender',n:'Lavender',sci:'Lavandula angustifolia',orig:'Kawasan Mediterania',price:70000,size:'Kecil',light:'Terang',water:'Sedang',care:'Sedang',pet:false,place:'Outdoor',type:'Tanaman berbunga',sold:45,nw:16,gift:true,bg:BG.lilac,
  desc:'Semak wangi berbunga ungu untuk teras dan balkon yang cerah.',tip:'Tidak tahan tanah becek. Gunakan media yang cepat kering dan letakkan di tempat berangin.',
  art:{k:'lav',c:'#8A78C8',d:'#7E9C86',pot:'#F0D0B8',rim:'#E0BC9F'}},
 {id:'bougenville',n:'Bougenville',sci:'Bougainvillea glabra',orig:'Brasil',price:90000,size:'Besar',light:'Terang',water:'Sedang',care:'Mudah',pet:false,place:'Outdoor',type:'Tanaman berbunga',sold:42,nw:1,gift:false,bg:BG.blush,
  desc:'Semak merambat dengan kelopak magenta yang mencolok. Tahan panas.',tip:'Justru berbunga lebih banyak saat agak kering. Kurangi penyiraman menjelang musim berbunga.',
  art:{k:'leafy',shape:'oval',c:'#4C9550',d:'#2F6B36',pot:'#B9C7A8',rim:'#A5B592',leaves:[[-60,44,.55],[-35,66,.6],[-8,78,.62],[22,68,.6],[48,52,.55],[68,34,.5]],flowers:[[54,66,16,'#D6336C','b'],[-26,60,16,'#D6336C','b'],[12,44,15,'#E0508A','b'],[-58,86,13,'#E0508A','b'],[74,96,13,'#D6336C','b']]}}
];
const byId=id=>PL.find(p=>p.id===id);
const CR={Mudah:0,Sedang:1,Sulit:2};
const SORT={terlaris:(a,b)=>b.sold-a.sold,terbaru:(a,b)=>b.nw-a.nw,mudah:(a,b)=>CR[a.care]-CR[b.care]||b.sold-a.sold,murah:(a,b)=>a.price-b.price,mahal:(a,b)=>b.price-a.price};
const SORTL={terlaris:'Terlaris',terbaru:'Terbaru',mudah:'Paling mudah dirawat',murah:'Harga terendah',mahal:'Harga tertinggi'};
const CATS={
  indoor:{n:'Indoor',ico:'home',d:'Untuk ruang tamu, kamar, dan meja kerja',set:{tempat:['Indoor']}},
  outdoor:{n:'Outdoor',ico:'tree',d:'Untuk teras, balkon, dan taman',set:{tempat:['Outdoor']}},
  mudah:{n:'Mudah dirawat',ico:'leaf',d:'Pilihan aman untuk pemula',set:{rawat:['Mudah']}},
  hewan:{n:'Aman untuk hewan',ico:'paw',d:'Tidak beracun bagi kucing dan anjing',set:{pet:true}},
  hadiah:{n:'Hadiah',ico:'gift',d:'Ukuran ringkas dan mudah dikirim',set:{gift:true}}
};

const LG={Rendah:'Tahan di sudut redup, jauh dari jendela. Hindari matahari langsung.',Sedang:'Taruh dekat jendela dengan cahaya terang tanpa sinar matahari langsung.',Terang:'Butuh sinar matahari langsung beberapa jam per hari, misalnya di balkon atau tepi jendela yang cerah.'};
const WG={Jarang:'Siram saat tanah sudah kering seluruhnya, kira-kira sekali per dua minggu.',Sedang:'Siram saat 2 sampai 3 cm tanah bagian atas terasa kering, kira-kira seminggu sekali.',Rutin:'Jaga tanah tetap lembap tapi tidak becek. Siram 2 sampai 3 kali per minggu.'};

/* ---------- filtering ---------- */
const MAXP=400000;
const mk=()=>({tempat:[],cahaya:[],siram:[],rawat:[],jenis:[],pet:false,gift:false,max:MAXP,q:'',urut:'terlaris',kat:null});
const presetF=k=>Object.assign(mk(),JSON.parse(JSON.stringify(CATS[k].set)),{kat:k});
function match(p,F){
  const has=(a,v)=>!a.length||a.includes(v);
  if(F.tempat.length&&!F.tempat.some(t=>p.place===t||p.place==='Keduanya'))return false;
  if(!has(F.cahaya,p.light)||!has(F.siram,p.water)||!has(F.rawat,p.care)||!has(F.jenis,p.type))return false;
  if(F.pet&&!p.pet)return false;
  if(F.gift&&!p.gift)return false;
  if(p.price>F.max)return false;
  if(F.q&&!(p.n+' '+p.sci+' '+p.type).toLowerCase().includes(low(F.q)))return false;
  return true;
}
function fromParams(P){
  const f=mk(),k=P.get('kat');
  if(k&&CATS[k])Object.assign(f,JSON.parse(JSON.stringify(CATS[k].set)),{kat:k});
  ['tempat','cahaya','siram','rawat','jenis'].forEach(n=>{if(P.has(n))f[n]=P.get(n).split(',').filter(Boolean)});
  if(P.get('pet')==='1')f.pet=true;
  if(P.get('gift')==='1')f.gift=true;
  const m=parseInt(P.get('max'),10);if(m>0&&m<=MAXP)f.max=m;
  f.q=(P.get('q')||'').slice(0,60);
  if(SORT[P.get('urut')])f.urut=P.get('urut');
  return f;
}
function toQuery(F){
  const u=new URLSearchParams();
  if(F.kat)u.set('kat',F.kat);
  else['tempat','cahaya','siram','rawat','jenis'].forEach(n=>{if(F[n].length)u.set(n,F[n].join(','))});
  if(F.pet&&!F.kat)u.set('pet','1');
  if(F.gift&&!F.kat)u.set('gift','1');
  if(F.max<MAXP)u.set('max',F.max);
  if(F.q)u.set('q',F.q);
  if(F.urut!=='terlaris')u.set('urut',F.urut);
  return u.toString();
}

/* ---------- cart ---------- */
let cart={};
try{const c=JSON.parse(localStorage.getItem('ls_cart')||'{}')||{};Object.keys(c).forEach(k=>{if(byId(k)&&c[k]>0)cart[k]=Math.min(20,c[k]|0)})}catch(e){cart={}}
const saveCart=()=>{try{localStorage.setItem('ls_cart',JSON.stringify(cart))}catch(e){}};
let toastT;
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('show'),2600)}
function addCart(id,n){const p=byId(id);if(!p)return;cart[id]=Math.min(20,(cart[id]||0)+n);saveCart();drawCart();toast(`${p.n} masuk ke keranjang`)}
function setQty(id,q){if(q<=0)delete cart[id];else cart[id]=Math.min(20,q);saveCart();drawCart()}
function drawCart(){
  const ids=Object.keys(cart),count=ids.reduce((s,k)=>s+cart[k],0);
  const b=$('#cartN');b.textContent=count;b.hidden=!count;
  const body=$('#dbody'),foot=$('#dfoot');
  if(!ids.length){
    body.innerHTML=`<div class="dempty"><h3>Keranjangmu masih kosong</h3><p>Pilih tanaman sendiri atau jawab 4 pertanyaan untuk dapat rekomendasi.</p><div class="cta"><a class="btn primary sm" href="#/tanaman" data-close>Lihat tanaman</a><a class="btn sm" href="#/kuis" data-close>Mulai kuis</a></div></div>`;
    foot.hidden=true;return;
  }
  foot.hidden=false;
  body.innerHTML=ids.map(id=>{const p=byId(id);return `<div class="ci"><div class="tile" style="background:${p.bg}">${art(p)}</div><div><button class="linkbtn rm" data-rm="${id}" aria-label="Hapus ${esc(p.n)} dari keranjang">Hapus</button><b>${esc(p.n)}</b><span class="meta">${rp(p.price)}</span><div class="qty"><button data-q="${id}:-1" aria-label="Kurangi jumlah ${esc(p.n)}">${ico('minus',16)}</button><output aria-live="polite">${cart[id]}</output><button data-q="${id}:1" aria-label="Tambah jumlah ${esc(p.n)}">${ico('plus',16)}</button></div></div></div>`}).join('');
  const total=ids.reduce((s,k)=>s+byId(k).price*cart[k],0);
  foot.innerHTML=`<div class="row"><span>Subtotal</span><span>${rp(total)}</span></div><button class="btn primary" id="checkout">Lanjut ke pembayaran</button>`;
}
function openCart(){$('#drawer').inert=false;$('#drawer').classList.add('open');$('#scrim').hidden=false;$('#cartClose').focus()}
function closeCart(){$('#drawer').classList.remove('open');$('#drawer').inert=true;$('#scrim').hidden=true}

/* ---------- product card ---------- */
const metaLine=p=>`Cahaya ${low(p.light)}, perawatan ${low(p.care)}`;
const card=p=>`<article class="card"><a href="#/tanaman/${p.id}"><div class="tile" style="background:${p.bg}">${art(p)}${p.pet?`<span class="pill">${ico('paw',14)}Aman untuk hewan</span>`:''}</div><h3>${esc(p.n)}</h3></a><div class="crow"><span class="price">${rp(p.price)}</span><button class="add" data-add="${p.id}" aria-label="Tambah ${esc(p.n)} ke keranjang">${ico('plus',18)}</button></div><p class="meta">${metaLine(p)}</p></article>`;

/* ---------- header: nav, mega, search ---------- */
const mobile=()=>matchMedia('(max-width:900px)').matches;
$('#nav').innerHTML=Object.keys(CATS).map(k=>`<a href="#/tanaman?kat=${k}" data-kat="${k}">${CATS[k].n}</a>`).join('')+`<a class="quiz" href="#/kuis">${ico('leaf',16)}Temukan tanaman</a>`;
$('#fcats').innerHTML=Object.keys(CATS).map(k=>`<li><a href="#/tanaman?kat=${k}">${CATS[k].n}</a></li>`).join('');
const mega=$('#mega');
function openMega(k){
  if(mobile())return;
  const list=PL.filter(p=>match(p,presetF(k))).sort(SORT.terlaris);
  const lights=['Rendah','Sedang','Terang'].map(l=>[l,list.filter(p=>p.light===l).length]).filter(x=>x[1]);
  const types=[...new Set(list.map(p=>p.type))].map(t=>[t,list.filter(p=>p.type===t).length]);
  const top=list[0];
  mega.innerHTML=`<div class="wrap mgrid"><div><h3>Berdasarkan cahaya</h3><ul>${lights.map(([l,n])=>`<li><a href="#/tanaman?kat=${k}&cahaya=${l}">Cahaya ${low(l)}<span>${n}</span></a></li>`).join('')}</ul></div><div><h3>Berdasarkan jenis</h3><ul>${types.map(([t,n])=>`<li><a href="#/tanaman?kat=${k}&jenis=${encodeURIComponent(t)}">${t}<span>${n}</span></a></li>`).join('')}</ul></div>${top?`<a class="mfeat" href="#/tanaman/${top.id}"><div class="tile" style="background:${top.bg}">${art(top)}</div><b>${esc(top.n)}</b><span class="meta">Paling banyak dibeli, ${rp(top.price)}</span></a>`:'<div></div>'}<a class="mall" href="#/tanaman?kat=${k}">Lihat semua ${low(CATS[k].n)} (${list.length})</a></div>`;
  mega.hidden=false;
  $$('.nav a[data-kat]').forEach(a=>a.classList.toggle('on',a.dataset.kat===k));
}
function closeMega(){mega.hidden=true;$$('.nav a[data-kat]').forEach(a=>a.classList.remove('on'))}
$$('.nav a[data-kat]').forEach(a=>{a.addEventListener('mouseenter',()=>openMega(a.dataset.kat));a.addEventListener('focus',()=>openMega(a.dataset.kat))});
$('#hd').addEventListener('mouseleave',closeMega);
$('#hd').addEventListener('focusout',e=>{if(!$('#hd').contains(e.relatedTarget))closeMega()});
mega.addEventListener('click',e=>{if(e.target.closest('a'))closeMega()});

const qEl=$('#q'),sg=$('#sugg');let sItems=[],sIdx=-1;
function closeSugg(){sg.hidden=true;qEl.setAttribute('aria-expanded','false');qEl.removeAttribute('aria-activedescendant');sIdx=-1}
function drawSugg(v){
  sItems=PL.filter(p=>(p.n+' '+p.sci+' '+p.type).toLowerCase().includes(low(v))).slice(0,6);
  sg.innerHTML=sItems.map((p,i)=>`<li role="option" id="so${i}" data-go="#/tanaman/${p.id}"><span class="thumb" style="background:${p.bg}">${art(p)}</span><span><b>${esc(p.n)}</b><small>${rp(p.price)}, cahaya ${low(p.light)}</small></span></li>`).join('')+`<li role="option" id="so${sItems.length}" class="all" data-go="#/tanaman?q=${encodeURIComponent(v)}">${sItems.length?'Lihat semua hasil':'Tidak ada tanaman yang cocok. Lihat hasil'} untuk “${esc(v)}”</li>`;
  sg.hidden=false;qEl.setAttribute('aria-expanded','true');sIdx=-1;
}
function pickSugg(i){const li=$('#so'+i);if(li){location.hash=li.dataset.go;closeSugg();qEl.blur()}}
qEl.addEventListener('input',()=>{const v=qEl.value.trim();v?drawSugg(v):closeSugg()});
qEl.addEventListener('keydown',e=>{
  const n=$$('li',sg).length;
  if(e.key==='ArrowDown'&&n){e.preventDefault();sIdx=(sIdx+1)%n}
  else if(e.key==='ArrowUp'&&n){e.preventDefault();sIdx=(sIdx-1+n)%n}
  else if(e.key==='Enter'){e.preventDefault();const v=qEl.value.trim();if(sIdx>=0)pickSugg(sIdx);else if(v){location.hash='#/tanaman?q='+encodeURIComponent(v);closeSugg();qEl.blur()}return}
  else return;
  $$('li',sg).forEach((li,i)=>li.setAttribute('aria-selected',i===sIdx));
  qEl.setAttribute('aria-activedescendant','so'+sIdx);
});
sg.addEventListener('mousedown',e=>{const li=e.target.closest('li');if(li){e.preventDefault();pickSugg(+li.id.slice(2))}});
qEl.addEventListener('blur',()=>setTimeout(closeSugg,120));

$('#cartBtn').addEventListener('click',openCart);
$('#cartClose').addEventListener('click',closeCart);
$('#scrim').addEventListener('click',closeCart);
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMega();closeCart();closeSugg()}});
document.addEventListener('click',e=>{
  const a=e.target.closest('[data-add]');if(a){addCart(a.dataset.add,1);return}
  const q=e.target.closest('[data-q]');if(q){const[id,d]=q.dataset.q.split(':');setQty(id,(cart[id]||0)+ +d);return}
  const r=e.target.closest('[data-rm]');if(r&&r.closest('#drawer')){setQty(r.dataset.rm,0);return}
  if(e.target.closest('[data-close]'))closeCart();
  if(e.target.closest('#checkout'))toast('Pembayaran belum tersedia di prototipe ini');
});

/* ---------- pages ---------- */
const app=$('#app');
let first=true;
function crumb(items){return `<nav class="crumb" aria-label="Breadcrumb">${items.map((it,i)=>(i?'<span aria-hidden="true">/</span>':'')+(it[1]?`<a href="${it[1]}">${it[0]}</a>`:`<span aria-current="page">${it[0]}</span>`)).join('')}</nav>`}

function home(){
  document.title='LittleSeed Plants | Toko tanaman hias online';
  const shelf=['sansevieria','spider','echeveria','peperomia','zz'].map(byId).map(p=>`<a class="sitem" href="#/tanaman/${p.id}"><div class="sart">${art(p)}</div><div class="slab"><b>${esc(p.n)}</b><span>Cahaya ${low(p.light)}</span><span>${p.pet?'Aman untuk hewan':'Siram '+low(p.water)}</span></div></a>`).join('');
  const cats=Object.keys(CATS).map(k=>{const n=PL.filter(p=>match(p,presetF(k))).length;return `<a class="cat" href="#/tanaman?kat=${k}">${ico(CATS[k].ico,26)}<b>${CATS[k].n}</b><span>${n} tanaman. ${CATS[k].d}.</span></a>`}).join('');
  const tips=[['Cek tanah sebelum menyiram','Tekan jari 2 sampai 3 cm ke dalam tanah. Jika masih lembap, tunda menyiram. Penyiraman berlebih adalah penyebab utama tanaman hias mati.'],['Baca cahaya ruanganmu','Jika kamu bisa membaca buku dengan nyaman tanpa lampu, cahayanya cukup untuk tanaman bercahaya sedang. Sudut yang lebih redup cocok untuk sansevieria dan ZZ.'],['Pilih pot berlubang drainase','Air yang menggenang membusukkan akar. Jika potmu tanpa lubang, pakai sebagai penutup dan tetap tanam di pot plastik berlubang.']].map(t=>`<div class="tip"><h3>${t[0]}</h3><p>${t[1]}</p></div>`).join('');
  app.innerHTML=`<div class="wrap">
  <section class="hero" aria-labelledby="h1"><div><h1 id="h1" tabindex="-1">Tanaman yang cocok untuk rumahmu</h1><p class="lead">Pilih berdasarkan cahaya, waktu untuk merawat, dan hewan peliharaan di rumah. Tidak perlu hafal nama ilmiah.</p><div class="cta"><a class="btn gold" href="#/kuis">Mulai kuis</a><a class="btn" href="#/tanaman">Lihat semua tanaman</a></div><small>4 pertanyaan, kurang dari satu menit.</small></div><div class="shelf" aria-label="Contoh tanaman dan kebutuhannya">${shelf}</div></section>
  <section class="sec" aria-labelledby="hc"><h2 id="hc">Belanja sesuai kebutuhan</h2><div class="cats">${cats}</div></section>
  <section class="sec" aria-labelledby="hp"><div class="sechead"><h2 id="hp">Tanaman pilihan</h2><div class="tabs" id="tabs">${['terlaris','terbaru','mudah'].map((k,i)=>`<button class="tab" data-tab="${k}" aria-pressed="${i===0}">${SORTL[k]}</button>`).join('')}</div></div><div class="grid" id="hgrid"></div><p style="margin-top:28px"><a class="btn" href="#/tanaman">Lihat semua tanaman</a></p></section>
  <section class="sec" aria-labelledby="ht"><h2 id="ht">Tips berkebun</h2><div class="tips">${tips}</div></section>
  <section class="sec"><div class="strip"><div>${ico('truck',26)}<p><b>Pengiriman aman</b><span>Tanaman dikemas khusus agar tiba dengan daun utuh.</span></p></div><div>${ico('book',26)}<p><b>Panduan perawatan</b><span>Setiap tanaman punya tips singkat yang bisa langsung dipraktikkan.</span></p></div><div>${ico('users',26)}<p><b>Komunitas</b><span>Ruang diskusi dengan sesama pecinta tanaman dan ahli akan segera hadir.</span></p></div></div></section></div>`;
  const draw=k=>{$('#hgrid').innerHTML=[...PL].sort(SORT[k]).slice(0,8).map(card).join('');$$('#tabs .tab').forEach(t=>t.setAttribute('aria-pressed',t.dataset.tab===k))};
  draw('terlaris');
  $('#tabs').addEventListener('click',e=>{const t=e.target.closest('.tab');if(t)draw(t.dataset.tab)});
}

function listing(P){
  let F=fromParams(P);
  const opt=(name,vals)=>vals.map(v=>`<label class="chk"><input type="checkbox" data-f="${name}" value="${esc(v)}">${esc(v)}</label>`).join('');
  const types=[...new Set(PL.map(p=>p.type))];
  app.innerHTML=`<div class="wrap">${crumb([['Beranda','#/'],['Tanaman',F.kat||F.q?'#/tanaman':null],...(F.kat?[[CATS[F.kat].n,null]]:[])])}
  <div class="lhead"><h1 id="h1" tabindex="-1"></h1><p id="sub"></p></div>
  <div class="lgrid"><form class="filters" id="filters" aria-label="Filter tanaman" onsubmit="return false">
   <fieldset><legend>Penempatan</legend>${opt('tempat',['Indoor','Outdoor'])}</fieldset>
   <fieldset><legend>Kebutuhan cahaya</legend>${opt('cahaya',['Rendah','Sedang','Terang'])}</fieldset>
   <fieldset><legend>Frekuensi siram</legend>${opt('siram',['Jarang','Sedang','Rutin'])}</fieldset>
   <fieldset><legend>Tingkat perawatan</legend>${opt('rawat',['Mudah','Sedang','Sulit'])}</fieldset>
   <fieldset><legend>Jenis tanaman</legend>${opt('jenis',types)}</fieldset>
   <fieldset><legend>Lainnya</legend><label class="chk"><input type="checkbox" data-t="pet">Aman untuk hewan</label><label class="chk"><input type="checkbox" data-t="gift">Cocok untuk hadiah</label></fieldset>
   <fieldset><legend>Harga maksimum</legend><input type="range" id="max" min="25000" max="${MAXP}" step="5000" aria-label="Harga maksimum"><p class="meta" id="maxl"></p></fieldset>
  </form>
  <section aria-label="Hasil"><div class="lbar"><div class="r"><button class="btn sm ftoggle" id="ftoggle" aria-expanded="false" aria-controls="filters">${ico('filter',16)}Filter<span id="fn"></span></button> <span id="count" aria-live="polite"></span></div><label class="meta">Urutkan <select id="sort" aria-label="Urutkan">${Object.keys(SORTL).map(k=>`<option value="${k}">${SORTL[k]}</option>`).join('')}</select></label></div>
  <div class="chips" id="chips"></div><div id="res"></div></section></div></div>`;
  const form=$('#filters');
  const LBL={tempat:v=>v,cahaya:v=>'Cahaya '+low(v),siram:v=>'Siram '+low(v),rawat:v=>'Perawatan '+low(v),jenis:v=>v};
  function sync(){
    $$('[data-f]',form).forEach(i=>i.checked=F[i.dataset.f].includes(i.value));
    $$('[data-t]',form).forEach(i=>i.checked=F[i.dataset.t]);
    $('#max').value=F.max;$('#maxl').textContent=F.max>=MAXP?'Semua harga':'Sampai '+rp(F.max);
    $('#sort').value=F.urut;
  }
  function draw(){
    const list=PL.filter(p=>match(p,F)).sort(SORT[F.urut]);
    const title=F.kat?CATS[F.kat].n:F.q?`Hasil untuk “${F.q}”`:'Semua tanaman';
    $('#h1').textContent=title;$('#sub').textContent=F.kat?CATS[F.kat].d:'Saring berdasarkan cahaya, perawatan, dan keamanan bagi hewan peliharaan.';
    document.title=title+' | LittleSeed Plants';
    const chips=[];
    ['tempat','cahaya','siram','rawat','jenis'].forEach(n=>F[n].forEach(v=>chips.push([n+':'+v,LBL[n](v)])));
    if(F.pet)chips.push(['pet','Aman untuk hewan']);
    if(F.gift)chips.push(['gift','Cocok untuk hadiah']);
    if(F.max<MAXP)chips.push(['max','Maks. '+rp(F.max)]);
    if(F.q)chips.push(['q','Pencarian: '+F.q]);
    $('#chips').innerHTML=chips.map(c=>`<button class="chip" data-x="${esc(c[0])}" aria-label="Hapus filter ${esc(c[1])}">${esc(c[1])}${ico('x',14)}</button>`).join('')+(chips.length>1?`<button class="linkbtn" data-clear>Hapus semua</button>`:'');
    $('#fn').textContent=chips.length?` (${chips.length})`:'';
    $('#count').textContent=`${list.length} tanaman ditemukan`;
    $('#res').innerHTML=list.length?`<div class="grid">${list.map(card).join('')}</div>`:`<div class="empty"><h3>Belum ada tanaman yang cocok</h3><p>Coba kurangi filter, atau jawab beberapa pertanyaan singkat agar kami yang memilihkan.</p><div class="cta"><button class="btn primary sm" data-clear>Hapus semua filter</button><a class="btn sm" href="#/kuis">Mulai kuis</a></div></div>`;
    history.replaceState(null,'','#/tanaman'+(toQuery(F)?'?'+toQuery(F):''));
  }
  const changed=()=>{F.kat=null;sync();draw()};
  form.addEventListener('change',e=>{
    const i=e.target;
    if(i.dataset.f){const a=F[i.dataset.f];i.checked?a.push(i.value):a.splice(a.indexOf(i.value),1)}
    else if(i.dataset.t)F[i.dataset.t]=i.checked;
    changed();
  });
  $('#max').addEventListener('input',e=>{F.max=+e.target.value;changed()});
  $('#sort').addEventListener('change',e=>{F.urut=e.target.value;draw()});
  $('#ftoggle').addEventListener('click',e=>{const o=form.classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',o)});
  app.firstElementChild.addEventListener('click',function(e){
    if(e.target.closest('[data-clear]')){F=mk();F.q='';changed();return}
    const x=e.target.closest('[data-x]');if(!x)return;
    const k=x.dataset.x;
    if(k==='pet'||k==='gift')F[k]=false;else if(k==='max')F.max=MAXP;else if(k==='q'){F.q='';qEl.value=''}
    else{const[n,v]=[k.slice(0,k.indexOf(':')),k.slice(k.indexOf(':')+1)];F[n]=F[n].filter(y=>y!==v)}
    changed();
  });
  sync();draw();
}

function detail(id){
  const p=byId(id);
  if(!p){notFound();return}
  document.title=p.n+' | LittleSeed Plants';
  const place=p.place==='Keduanya'?'Indoor dan outdoor':p.place;
  const facts=[['ruler','Ukuran',p.size],['sun','Cahaya',p.light],['drop','Siram',p.water],['leaf','Perawatan',p.care],['paw','Hewan peliharaan',p.pet?'Aman':'Tidak aman'],['home','Penempatan',place]];
  const sim=PL.filter(x=>x.id!==p.id).map(x=>({x,s:(x.type===p.type)*2+(x.light===p.light)+(x.care===p.care)+(x.pet===p.pet)+(x.place===p.place)})).sort((a,b)=>b.s-a.s||b.x.sold-a.x.sold).slice(0,4).map(o=>o.x);
  app.innerHTML=`<div class="wrap">${crumb([['Beranda','#/'],['Tanaman','#/tanaman'],[esc(p.n),null]])}
  <div class="dgrid"><div class="gal"><div class="tile" id="gmain" style="background:${p.bg}">${art(p)}</div><div class="thumbs" role="group" aria-label="Pilih tampilan foto"><button data-v="0" aria-pressed="true" aria-label="Tampilan penuh"><div class="tile" style="background:${p.bg}">${art(p)}</div></button><button data-v="1" aria-pressed="false" aria-label="Tampilan dekat"><div class="tile" style="background:${p.bg}">${art(p,{zoom:1})}</div></button><button data-v="2" aria-pressed="false" aria-label="Tampilan latar berbeda"><div class="tile" style="background:${BG.butter}">${art(p)}</div></button></div></div>
  <div class="info"><h1 id="h1" tabindex="-1">${esc(p.n)}</h1><p class="price">${rp(p.price)}</p><p class="lead">${esc(p.desc)}</p>
  <ul class="facts" aria-label="Info utama">${facts.map(f=>`<li class="${f[1]==='Hewan peliharaan'&&!p.pet?'bad':''}">${ico(f[0],22)}<small>${f[1]}</small><b>${f[2]}</b></li>`).join('')}</ul>
  <div class="buy"><div class="qty"><button id="dm" aria-label="Kurangi jumlah">${ico('minus',16)}</button><output id="dq" aria-live="polite">1</output><button id="dp" aria-label="Tambah jumlah">${ico('plus',16)}</button></div><button class="btn primary" id="dadd">Tambah ke keranjang</button></div>
  <p class="ask"><button class="btn sm" data-seller="${p.id}">${ico('chat',16)}Tanya penjual tentang tanaman ini</button></p>
  <details><summary>Info lengkap${ico('chev',18)}</summary><div class="body"><dl><dt>Nama ilmiah</dt><dd><i>${esc(p.sci)}</i></dd><dt>Asal</dt><dd>${esc(p.orig)}</dd><dt>Jenis</dt><dd>${esc(p.type)}</dd><dt>Ukuran ${low(p.size)}</dt><dd>${p.size==='Kecil'?'Sekitar 15 sampai 25 cm termasuk pot':p.size==='Sedang'?'Sekitar 30 sampai 50 cm termasuk pot':'Sekitar 60 sampai 100 cm termasuk pot'}</dd></dl></div></details>
  <details><summary>Panduan perawatan${ico('chev',18)}</summary><div class="body"><p><b>Cahaya.</b> ${LG[p.light]}</p><p><b>Penyiraman.</b> ${WG[p.water]}</p><p><b>Tips.</b> ${esc(p.tip)}</p></div></details>
  <details><summary>Pengiriman dan pengemasan${ico('chev',18)}</summary><div class="body"><p>Tanaman dikemas dengan pelindung daun dan pot yang distabilkan. Lama pengiriman bergantung pada kota tujuan.</p></div></details></div></div>
  <section class="sec" aria-labelledby="hs"><h2 id="hs">Tanaman serupa</h2><div class="grid">${sim.map(card).join('')}</div></section></div>`;
  let n=1;
  const dq=$('#dq');
  $('#dm').onclick=()=>{n=Math.max(1,n-1);dq.textContent=n};
  $('#dp').onclick=()=>{n=Math.min(20,n+1);dq.textContent=n};
  $('#dadd').onclick=()=>addCart(p.id,n);
  $('.thumbs').addEventListener('click',e=>{
    const b=e.target.closest('button');if(!b)return;
    $$('.thumbs button').forEach(x=>x.setAttribute('aria-pressed',x===b));
    const v=b.dataset.v;$('#gmain').style.background=v==='2'?BG.butter:p.bg;$('#gmain').innerHTML=art(p,{zoom:v==='1'});
  });
}

function quiz(){
  document.title='Kuis temukan tanaman | LittleSeed Plants';
  const Q=[
    {k:'tempat',q:'Di mana tanaman akan ditaruh?',o:[['Indoor','home','Di dalam rumah','Kamar, ruang tamu, atau meja kerja'],['Outdoor','tree','Di luar rumah','Teras, balkon, atau taman'],['Any','leaf','Belum tahu','Aku fleksibel']]},
    {k:'cahaya',q:'Seberapa banyak cahaya di tempat itu?',o:[['Rendah','moon','Redup','Jauh dari jendela'],['Sedang','cloud','Cukup terang','Dekat jendela, tanpa matahari langsung'],['Terang','sun','Sangat terang','Kena matahari langsung beberapa jam']]},
    {k:'pet',q:'Apakah kamu punya hewan peliharaan di rumah?',o:[['yes','paw','Ya','Tanaman harus aman bagi mereka'],['no','check','Tidak','Semua tanaman boleh']]},
    {k:'siram',q:'Seberapa sering kamu bisa menyiram?',o:[['Rutin','drop','Sering','2 sampai 3 kali seminggu'],['Sedang','cal','Seminggu sekali','Terjadwal tapi santai'],['Jarang','moon','Sesekali saja','Aku sering lupa']]}
  ];
  let step=0;const ans={};
  const LBLQ={tempat:{Indoor:'Indoor',Outdoor:'Outdoor',Any:'Indoor atau outdoor'},cahaya:{Rendah:'Cahaya redup',Sedang:'Cahaya cukup terang',Terang:'Cahaya sangat terang'},pet:{yes:'Punya hewan peliharaan',no:'Tanpa hewan peliharaan'},siram:{Rutin:'Siram sering',Sedang:'Siram seminggu sekali',Jarang:'Siram sesekali'}};
  function draw(){
    if(step>=Q.length)return result();
    const q=Q[step];
    app.innerHTML=`<div class="quiz"><h1 id="h1" tabindex="-1">Temukan tanaman yang cocok untukmu</h1><p class="step">Pertanyaan ${step+1} dari ${Q.length}</p><div class="progress" role="progressbar" aria-valuemin="1" aria-valuemax="${Q.length}" aria-valuenow="${step+1}" aria-label="Kemajuan kuis"><span style="width:${(step+1)/Q.length*100}%"></span></div>
    <fieldset><legend>${q.q}</legend><div class="opts">${q.o.map(o=>`<label class="opt"><input type="radio" name="${q.k}" value="${o[0]}"${ans[q.k]===o[0]?' checked':''}>${ico(o[1],24)}<div><b>${o[2]}</b><span>${o[3]}</span></div></label>`).join('')}</div></fieldset>
    <div class="qnav"><button class="btn" id="back"${step?'':' disabled'}>Kembali</button><button class="btn primary" id="next"${ans[q.k]?'':' disabled'}>${step===Q.length-1?'Lihat rekomendasi':'Lanjut'}</button></div></div>`;
    $$('input[name]').forEach(i=>i.addEventListener('change',()=>{ans[q.k]=i.value;$('#next').disabled=false}));
    $('#back').onclick=()=>{step--;draw()};
    $('#next').onclick=()=>{step++;draw();$('#h1').focus({preventScroll:true})};
  }
  function recommend(){
    const LV={Rendah:0,Sedang:1,Terang:2},WV={Jarang:0,Sedang:1,Rutin:2};
    return PL.map(p=>{
      if(ans.pet==='yes'&&!p.pet)return null;
      if(ans.tempat==='Indoor'&&p.place==='Outdoor')return null;
      if(ans.tempat==='Outdoor'&&p.place==='Indoor')return null;
      let s=p.sold*.01;const why=[];
      const dl=Math.abs(LV[p.light]-LV[ans.cahaya]);
      if(dl===0){s+=3;why.push('Cahaya '+low(p.light))}else if(dl===1)s+=1;else s-=2;
      const dw=Math.abs(WV[p.water]-WV[ans.siram]);
      if(dw===0){s+=2;why.push('Siram '+low(p.water))}else if(dw===1)s+=.5;else s-=2;
      if(ans.tempat!=='Any')s+=2;else s+=1;
      if(ans.pet==='yes')why.push('Aman untuk hewan');
      if(p.care==='Mudah'){s+=1;why.push('Perawatan mudah')}else if(p.care==='Sulit')s-=1;
      if(ans.tempat!=='Any')why.unshift(ans.tempat==='Indoor'?'Cocok indoor':'Cocok outdoor');
      return {p,s,why};
    }).filter(Boolean).sort((a,b)=>b.s-a.s).slice(0,3);
  }
  function result(){
    const recs=recommend();
    const u=new URLSearchParams();
    if(ans.tempat!=='Any')u.set('tempat',ans.tempat);
    u.set('cahaya',ans.cahaya);u.set('siram',ans.siram);if(ans.pet==='yes')u.set('pet','1');
    app.innerHTML=`<div class="quiz"><h1 id="h1" tabindex="-1">${recs.length?'Cocok untukmu':'Belum ada yang pas'}</h1><div class="answers">${Q.map(q=>`<span class="chip static">${LBLQ[q.k][ans[q.k]]}</span>`).join('')}</div>
    ${recs.length?recs.map(({p,why})=>`<div class="rec"><a class="tile" href="#/tanaman/${p.id}" style="background:${p.bg}" aria-label="Lihat ${esc(p.n)}">${art(p)}</a><div><h3>${esc(p.n)}</h3><p class="price">${rp(p.price)}</p><div class="why">${why.slice(0,4).map(w=>`<span class="chip static">${ico('check',14)}${w}</span>`).join('')}</div><div class="act"><a class="btn sm" href="#/tanaman/${p.id}">Lihat detail</a><button class="btn primary sm" data-add="${p.id}">Tambah ke keranjang</button></div></div></div>`).join(''):`<p class="meta" style="margin-bottom:16px">Tidak ada tanaman yang memenuhi semua jawabanmu. Coba ubah satu jawaban.</p>`}
    <div class="qnav" style="border-top:1px solid var(--line);padding-top:22px"><button class="btn" id="again">Ulangi kuis</button><a class="btn" href="#/tanaman?${u}">Lihat semua yang cocok</a></div></div>`;
    $('#again').onclick=()=>{step=0;Object.keys(ans).forEach(k=>delete ans[k]);draw();$('#h1').focus({preventScroll:true})};
  }
  draw();
}

function notFound(){
  document.title='Halaman tidak ditemukan | LittleSeed Plants';
  app.innerHTML=`<div class="wrap" style="padding:80px 20px"><div class="empty"><h1 id="h1" tabindex="-1" style="font-size:30px;margin-bottom:8px">Halaman tidak ditemukan</h1><p>Tanaman atau halaman yang kamu cari tidak ada. Coba lihat daftar tanaman.</p><div class="cta"><a class="btn primary sm" href="#/tanaman">Lihat semua tanaman</a><a class="btn sm" href="#/">Ke beranda</a></div></div></div>`;
}

/* ---------- chat assistant (rule-based, works offline) ---------- */
let curPlant=null;
const chat=$('#chat'),fab=$('#chatFab'),clog=$('#chatLog'),cin=$('#chatIn'),cq=$('#chatQ');
fab.innerHTML=ico('chat',22)+'<span>Tanya kami</span><i class="fabdot" id="fabDot" hidden></i>';
$('#chatSend').innerHTML=ico('send',18);
$('#chatClose').innerHTML=ico('x',18);
let chatStarted=false,chatBusy=false;
const norm=s=>low(s).replace(/[^a-z0-9\s]/g,' ').replace(/\s+/g,' ').trim();
const mini=p=>`<div class="cplant"><a class="tile" href="#/tanaman/${p.id}" style="background:${p.bg}" aria-label="Lihat ${esc(p.n)}">${art(p)}</a><div><a href="#/tanaman/${p.id}"><b>${esc(p.n)}</b></a><span class="meta">${rp(p.price)}, cahaya ${low(p.light)}${p.pet?', aman untuk hewan':''}</span><button class="btn primary sm" data-add="${p.id}">Tambah</button></div></div>`;
const ALIAS={sansevieria:['lidah mertua','snake plant'],pothos:['sirih gading'],aloe:['lidah buaya'],bougenville:['bunga kertas','bougainvillea'],lyrata:['fiddle leaf','biola'],kembang:['hibiscus'],zz:['zamioculcas'],pakis:['boston fern'],echeveria:['mawar batu'],haworthia:['zebra']};
function findPlant(t){
  const s=' '+t+' ';
  return PL.find(p=>[norm(p.n),norm(p.sci),p.id,norm(p.n).split(' ')[0]].concat(ALIAS[p.id]||[]).some(k=>k&&s.includes(' '+k+' ')))||null;
}
const FAQ=[
  [/(kuning|menguning)/,'Daun menguning paling sering karena terlalu sering disiram atau drainase buruk. Cek tanahnya: kalau masih basah, tunda menyiram dan pastikan pot punya lubang. Penyebab lain: kurang cahaya, atau daun tua yang memang gugur secara alami.'],
  [/(cokelat|coklat|ujung daun)/,'Ujung daun cokelat biasanya karena udara terlalu kering, penyiraman tidak teratur, atau air yang terlalu keras. Coba semprot daun, jaga tanah lembap merata, dan jauhkan dari hembusan AC atau kipas.'],
  [/(layu|lemas|terkulai|menunduk)/,'Tanaman layu bisa karena kurang air, tapi juga karena kelebihan air yang membusukkan akar. Cek kelembapan tanah dulu sebelum menyiram. Kalau tanah becek dan berbau, keluarkan tanaman dan periksa akarnya.'],
  [/(kutu|hama|ulat|bercak putih|jamur)/,'Bercak putih seperti kapas biasanya kutu putih. Pisahkan tanaman dari yang lain, lap dengan kapas berisi alkohol 70 persen (coba di satu daun dulu), lalu ulangi tiap beberapa hari. Kalau serangannya parah, gunakan sabun insektisida.'],
  [/(busuk|lembek|berbau)/,'Batang atau akar yang lunak dan berbau menandakan busuk akar. Potong bagian yang busuk, pindahkan ke media baru yang cepat kering, dan kurangi penyiraman.'],
  [/(pupuk|nutrisi)/,'Beri pupuk cair yang diencerkan sekitar sebulan sekali saat tanaman aktif tumbuh, dan hentikan saat pertumbuhannya melambat. Pupuk berlebih bisa membakar akar.'],
  [/(repot|ganti pot|pindah pot|akar keluar)/,'Ganti pot saat akar sudah keluar dari lubang drainase atau tanaman terlihat sesak, umumnya setiap satu sampai dua tahun. Pilih pot yang hanya satu ukuran lebih besar.']
];
function crit(t){
  const c={};
  if(/(kucing|anjing|hewan|peliharaan|kelinci|pet)/.test(t))c.pet=true;
  if(/(redup|gelap|minim cahaya|kurang cahaya|teduh|tanpa jendela|sedikit cahaya)/.test(t))c.light='Rendah';
  else if(/(terang|matahari|cerah|panas|berjemur|jemur)/.test(t))c.light='Terang';
  else if(/(dekat jendela|cahaya sedang)/.test(t))c.light='Sedang';
  if(/(pemula|mudah|malas|gampang|awam|tidak ribet)/.test(t))c.care='Mudah';
  if(/(lupa|sibuk|jarang disiram|jarang siram|tidak sempat)/.test(t)){c.water='Jarang';c.care=c.care||'Mudah'}
  if(/(outdoor|teras|balkon|taman|luar rumah|luar ruangan)/.test(t))c.place='Outdoor';
  else if(/(indoor|kamar|ruang tamu|meja|kantor|dalam rumah|dalam ruangan)/.test(t))c.place='Indoor';
  if(/(hadiah|kado|souvenir|oleh oleh)/.test(t))c.gift=true;
  if(/sukulen/.test(t))c.type='Sukulen';
  else if(/pakis/.test(t))c.type='Pakis';
  else if(/gantung/.test(t))c.type='Tanaman gantung';
  else if(/(berbunga|bunga)/.test(t))c.type='Tanaman berbunga';
  const m=t.match(/(?:di bawah|dibawah|kurang dari|maksimal|maks|budget|bawah|under)\s*(?:rp\s*)?(\d+)\s*(rb|ribu|k|jt|juta)?/);
  if(m){let n=+m[1];const u=m[2];if(u==='jt'||u==='juta')n*=1e6;else if(u||n<1000)n*=1000;c.max=n}
  return c;
}
function describe(c){
  const a=[];
  if(c.pet)a.push('aman untuk hewan');
  if(c.light)a.push('cahaya '+low(c.light));
  if(c.water)a.push('siram '+low(c.water));
  if(c.care)a.push('perawatan '+low(c.care));
  if(c.place)a.push(low(c.place));
  if(c.type)a.push(low(c.type));
  if(c.gift)a.push('cocok untuk hadiah');
  if(c.max)a.push('harga sampai '+rp(c.max));
  return a.join(', ');
}
const DROPL={max:'batas harga',light:'kebutuhan cahaya',water:'frekuensi siram',care:'tingkat perawatan',place:'penempatan',gift:'kriteria hadiah',type:'jenis tanaman'};
function recommend(c0){
  const c={...c0},dropped=[];
  const run=()=>PL.filter(p=>(!c.pet||p.pet)&&(!c.light||p.light===c.light)&&(!c.water||p.water===c.water)&&(!c.care||p.care===c.care)&&(!c.place||p.place===c.place||p.place==='Keduanya')&&(!c.gift||p.gift)&&(!c.type||p.type===c.type)&&(!c.max||p.price<=c.max)).sort(SORT.terlaris);
  let list=run();
  for(const k of ['max','light','water','care','place','gift','type']){
    if(list.length)break;
    if(k in c){dropped.push(DROPL[k]);delete c[k];list=run()}
  }
  if(c0.light&&!c.light){const LVv={Rendah:0,Sedang:1,Terang:2};list.sort((a,b)=>Math.abs(LVv[a.light]-LVv[c0.light])-Math.abs(LVv[b.light]-LVv[c0.light])||b.sold-a.sold)}
  if(!list.length)return {html:'<p>Belum ada tanaman di katalog yang cocok dengan kriteria itu. Coba ubah salah satunya, atau jawab kuis singkat kami.</p><a class="btn sm" href="#/kuis">Mulai kuis</a>'};
  const F=mk();
  if(c.place)F.tempat=[c.place];if(c.light)F.cahaya=[c.light];if(c.water)F.siram=[c.water];if(c.care)F.rawat=[c.care];if(c.type)F.jenis=[c.type];
  F.pet=!!c.pet;F.gift=!!c.gift;if(c.max)F.max=Math.min(c.max,MAXP);
  const q=toQuery(F);
  const intro=dropped.length?`Belum ada yang cocok persis dengan permintaanmu (${describe(c0)}). Ini yang paling mendekati, dengan ${dropped.join(' dan ')} yang aku longgarkan:`:`Sesuai permintaanmu (${describe(c0)}), ini pilihan yang cocok:`;
  return {html:`<p>${intro}</p>${list.slice(0,3).map(mini).join('')}${c0.pet?'<p>Status aman untuk hewan berdasarkan data katalog. Kalau ragu, tanyakan ke dokter hewan.</p>':''}<p><a href="#/tanaman${q?'?'+q:''}">Lihat semua yang cocok di daftar</a></p>`};
}
function plantReply(p,t){
  const w=/(siram|penyiraman|air)/.test(t),l=/(cahaya|matahari|terang|redup|jendela)/.test(t),pt=/(kucing|anjing|hewan|peliharaan|aman|beracun|racun)/.test(t),pr=/(harga|berapa|murah|mahal)/.test(t),cr=/(rawat|perawatan|tips|cara)/.test(t);
  const out=[];
  if(pt)out.push(p.pet?`${p.n} tercatat <b>aman</b> untuk hewan peliharaan di katalog kami. Tetap cegah hewan mengunyahnya berlebihan, dan tanyakan ke dokter hewan jika ragu.`:`${p.n} tercatat <b>tidak aman</b> untuk hewan peliharaan. Taruh di tempat yang tidak terjangkau kucing, anjing, dan anak kecil.`);
  if(w||(cr&&!l))out.push(`<b>Penyiraman.</b> ${WG[p.water]}`);
  if(l||(cr&&!w))out.push(`<b>Cahaya.</b> ${LG[p.light]}`);
  if(cr)out.push(`<b>Tips.</b> ${esc(p.tip)}`);
  if(pr)out.push(`${p.n} harganya ${rp(p.price)}.`);
  if(!out.length){out.push(esc(p.desc));out.push(`Cahaya ${low(p.light)}, siram ${low(p.water)}, perawatan ${low(p.care)}. Harga ${rp(p.price)}.`)}
  return `<p>${out.join('</p><p>')}</p>${mini(p)}`;
}
const CHIPS=['Tanaman untuk kamar redup','Aman untuk kucing dan anjing','Mudah untuk pemula','Hadiah di bawah 50 ribu','Daun tanamanku menguning'];
const chipsDefault=()=>curPlant?[`Cara merawat ${curPlant.n}`,`Apakah ${curPlant.n} aman untuk hewan?`,...CHIPS.slice(0,3)]:CHIPS;
function reply(raw){
  const t=norm(raw.replace(/(\d)\.(\d)/g,'$1$2'));
  if(/\b(makan|dimakan|memakan|termakan|gigit|digigit|mengunyah|dikunyah|keracunan|menelan|muntah)\b/.test(t)&&/\b(kucing|anjing|hewan|peliharaan|kelinci|anak|bayi|balita)\b/.test(t))
    return {html:'<p><b>Ini bisa darurat.</b> Segera hubungi dokter hewan atau klinik hewan terdekat (untuk anak kecil, hubungi tenaga medis atau layanan gawat darurat). Bawa nama atau foto tanamannya, dan jangan menunggu gejala muncul.</p><p>Aku hanya bot toko, jadi tidak bisa mendiagnosis atau menggantikan bantuan medis.</p>'};
  if(/^(halo|hai|hi|hello|hey|selamat (pagi|siang|sore|malam))\b/.test(t))return {html:'<p>Halo! Ceritakan kondisi rumahmu, misalnya cahaya, hewan peliharaan, atau seberapa sering bisa menyiram, dan aku carikan tanaman yang pas.</p>',chips:chipsDefault()};
  if(/(terima kasih|makasih|thanks|thx)/.test(t))return {html:'<p>Sama-sama! Kalau ada pertanyaan lain soal tanaman, tanya saja.</p>'};
  if(/\b(keranjang|checkout|bayar|pembayaran)\b/.test(t)){const n=Object.values(cart).reduce((a,b)=>a+b,0);return {html:`<p>${n?`Ada ${n} tanaman di keranjangmu.`:'Keranjangmu masih kosong.'} Pembayaran belum aktif di versi contoh ini.</p><button class="btn sm" data-opencart>Buka keranjang</button>`}}
  if(/\b(penjual|admin|cs|manusia)\b/.test(t))return {html:'<p>Tentu, kamu bisa langsung chat dengan penjual.</p><button class="btn primary sm" data-seller="'+(curPlant?curPlant.id:'')+'">Chat dengan penjual</button>'};
  if(/\bkuis\b/.test(t))return {html:'<p>Kuis kami cuma 4 pertanyaan dan hasilnya berupa 3 rekomendasi.</p><a class="btn primary sm" href="#/kuis">Mulai kuis</a>'};
  if(/(kirim|ongkir|pengiriman|dikemas)/.test(t))return {html:'<p>Tanaman dikemas dengan pelindung daun dan pot yang distabilkan. Lama dan biaya pengiriman bergantung pada kota tujuan. Tarif pasti belum tersedia di versi contoh ini.</p><button class="btn sm" data-seller="'+(curPlant?curPlant.id:'')+'">Tanya penjual soal pengiriman</button>'};
  let p=findPlant(t);
  if(!p&&curPlant&&(/\bini\b/.test(t)||(/(siram|cahaya|rawat|perawatan|hewan|kucing|anjing|harga|aman|beracun)/.test(t)&&!/(tanaman|rekomendasi|cari|carikan|ada)/.test(t))))p=curPlant;
  if(/\b(stok|ready|tersedia|foto asli|foto terbaru|nego|diskon|grosir|custom|garansi|retur|tukar|komplain)\b/.test(t))return {html:`<p>Pertanyaan seperti ini lebih tepat dijawab langsung oleh penjual.</p><button class="btn primary sm" data-seller="${p?p.id:''}">Chat dengan penjual</button>`};
  const faq=FAQ.find(f=>f[0].test(t));
  if(faq)return {html:`<p>${faq[1]}</p>${p?mini(p):''}`};
  if(p)return {html:plantReply(p,t)};
  if(/(siram|penyiraman|menyiram)/.test(t))return {html:'<p>Aturan paling aman: cek tanahnya dulu. Tekan jari 2 sampai 3 cm ke dalam tanah, dan kalau masih lembap, tunggu. Sukulen dan sansevieria butuh air lebih jarang, sedangkan calathea dan pakis lebih sering. Sebutkan nama tanamannya dan aku beri panduan khusus.</p>'};
  const c=crit(t);
  if(Object.keys(c).length)return recommend(c);
  if(/\bcahaya\b/.test(t))return {html:'<p>Cahaya redup artinya jauh dari jendela. Cukup terang artinya dekat jendela tanpa matahari langsung. Sangat terang artinya kena matahari langsung beberapa jam. Sebutkan kondisi ruanganmu dan aku carikan tanamannya.</p>'};
  if(/(rekomen|cari|carikan|butuh|mau|ingin|tanaman apa|pilih|saran)/.test(t))return {html:'<p>Boleh ceritakan sedikit? Misalnya: tanamannya ditaruh di mana (indoor atau outdoor), seberapa terang tempatnya, apakah ada kucing atau anjing, dan seberapa sering kamu bisa menyiram.</p>',chips:chipsDefault()};
  return {html:'<p>Maaf, aku belum paham. Coba tanya seperti “tanaman aman untuk kucing yang cocok di kamar redup”, “cara menyiram monstera”, atau “kenapa daun kuning?”.</p><p>Atau tanyakan langsung ke penjual.</p><button class="btn sm" data-seller="'+(curPlant?curPlant.id:'')+'">Chat dengan penjual</button>',chips:chipsDefault()};
}
function say(who,html){const d=document.createElement('div');d.className='msg '+who;d.innerHTML=html;clog.appendChild(d);clog.scrollTop=clog.scrollHeight;return d}
function setChips(a){cq.innerHTML=a.map(s=>`<button type="button" data-say="${esc(s)}">${esc(s)}</button>`).join('')}
function send(text){
  text=text.trim().slice(0,300);
  if(!text||chatBusy)return;
  say('me',esc(text));cin.value='';chatBusy=true;
  const ty=say('bot typing','<span></span><span></span><span></span>');
  setTimeout(()=>{ty.remove();const r=reply(text);say('bot',r.html);setChips(r.chips||chipsDefault());chatBusy=false},500);
}
function openChat(tab){
  tab=tab||lastTab;
  chat.hidden=false;fab.setAttribute('aria-expanded','true');
  if(!chatStarted){chatStarted=true;say('bot','<p>Halo! Aku asisten LittleSeed. Tanyakan tanaman yang cocok untuk rumahmu atau cara merawatnya.</p><p>Aku bot otomatis dan bukan pengganti dokter hewan.</p>')}
  setChips(chipsDefault());showTab(tab,true);updateDots();
}
function closeChat(){chat.hidden=true;fab.setAttribute('aria-expanded','false');fab.focus()}
fab.addEventListener('click',()=>chat.hidden?openChat():closeChat());
$('#chatClose').addEventListener('click',closeChat);
$('#chatForm').addEventListener('submit',e=>{e.preventDefault();send(cin.value)});
cq.addEventListener('click',e=>{const b=e.target.closest('[data-say]');if(b)send(b.dataset.say)});
clog.addEventListener('click',e=>{
  if(e.target.closest('[data-opencart]')){openCart();return}
  if(e.target.closest('a[href^="#/"]')&&mobile())closeChat();
});
chat.addEventListener('keydown',e=>{if(e.key==='Escape'){e.stopPropagation();closeChat()}});

/* ---------- seller chat (simulated, replies are automatic) ---------- */
const sIn=$('#sIn'),sLog=$('#sLog'),sQ=$('#sQ'),sCtxEl=$('#sCtx');
$('#sSend').innerHTML=ico('send',18);
let sellerCtx=null,sBusy=false,unread=false,lastTab='bot',SM=[];
try{const r=JSON.parse(localStorage.getItem('ls_seller_chat')||'[]');if(Array.isArray(r))SM=r.filter(m=>m&&(m.w==='me'||m.w==='seller')&&typeof m.t==='string'&&typeof m.at==='number').slice(-60).map(m=>({w:m.w,t:m.t.slice(0,500),p:m.p&&byId(m.p)?m.p:null,at:m.at}))}catch(e){SM=[]}
const saveS=()=>{try{localStorage.setItem('ls_seller_chat',JSON.stringify(SM.slice(-60)))}catch(e){}};
const SQ=['Apakah stoknya tersedia?','Berapa tinggi tanaman sekarang?','Bisa minta foto tambahan?','Bisa kirim ke kotaku?'];
function sBubble(m){
  const time=new Date(m.at).toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'}),p=m.p&&byId(m.p);
  return `<div class="msg ${m.w==='me'?'me':'seller'}">${p?`<span class="ctxtag">Tentang ${esc(p.n)}</span>`:''}${esc(m.t)}<small class="time">${time}</small>${m.w==='seller'?'<small class="sim">Balasan simulasi</small>':''}</div>`;
}
function renderSeller(){sLog.innerHTML=SM.map(sBubble).join('');sLog.scrollTop=sLog.scrollHeight}
function ensureSeed(){if(!SM.length){SM.push({w:'seller',t:'Halo! Aku dari tim LittleSeed. Tanyakan soal stok, kondisi tanaman, atau pengiriman. Kalau kamu membuka chat dari halaman tanaman, aku langsung tahu tanaman yang kamu maksud.',p:null,at:Date.now()});saveS()}}
function renderSCtx(){
  const p=sellerCtx&&byId(sellerCtx);
  sCtxEl.hidden=!p;
  sCtxEl.innerHTML=p?`<span>Menanyakan tentang <b>${esc(p.n)}</b></span><button type="button" id="sCtxX" aria-label="Hapus konteks tanaman">${ico('x',14)}</button>`:'';
}
function updateDots(){
  $('#sDot').hidden=!(unread&&$('#paneSeller').hidden);
  $('#fabDot').hidden=!(unread&&chat.hidden);
}
function showTab(which,focus){
  const s=which==='seller';lastTab=s?'seller':'bot';
  $('#tabBot').setAttribute('aria-selected',String(!s));$('#tabBot').tabIndex=s?-1:0;
  $('#tabSeller').setAttribute('aria-selected',String(s));$('#tabSeller').tabIndex=s?0:-1;
  $('#paneBot').hidden=s;$('#paneSeller').hidden=!s;
  if(s){ensureSeed();unread=false;renderSeller();renderSCtx();sQ.innerHTML=SQ.map(q=>`<button type="button" data-say="${esc(q)}">${esc(q)}</button>`).join('')}
  updateDots();
  if(focus)(s?sIn:cin).focus();
}
function sellerReply(text,pid){
  const n=norm(text),p=pid&&byId(pid),nm=p?p.n:'tanaman itu';
  if(/(stok|ready|tersedia)/.test(n))return `Soal stok ${nm}, pesanmu sudah diterima dan akan dicek oleh tim.`;
  if(/(foto|tinggi|ukuran|kondisi)/.test(n))return 'Permintaan foto dan ukuran terbaru sudah diterima. Tim akan mengirimkannya di chat ini.';
  if(/(kirim|ongkir|kota|alamat)/.test(n))return 'Pengiriman bergantung pada kota tujuan. Boleh sebutkan kotamu agar tim bisa mengecek opsinya?';
  if(/(harga|diskon|nego|grosir|custom|banyak)/.test(n))return 'Untuk permintaan harga khusus atau pembelian dalam jumlah banyak, tim akan menanggapinya langsung.';
  return 'Pesanmu sudah diterima. Tim akan membalas pada jam operasional.';
}
function pushS(m){m.at=Date.now();SM.push(m);saveS();sLog.insertAdjacentHTML('beforeend',sBubble(m));sLog.scrollTop=sLog.scrollHeight}
function sSend(text){
  text=text.trim().slice(0,500);
  if(!text||sBusy)return;
  const pid=sellerCtx;
  pushS({w:'me',t:text,p:pid});sIn.value='';sBusy=true;
  sLog.insertAdjacentHTML('beforeend','<div class="msg seller typing" id="sTyping" aria-label="Penjual sedang mengetik"><span></span><span></span><span></span></div>');
  sLog.scrollTop=sLog.scrollHeight;
  setTimeout(()=>{
    const ty=$('#sTyping');if(ty)ty.remove();
    pushS({w:'seller',t:sellerReply(text,pid),p:null});sBusy=false;
    if(chat.hidden||$('#paneSeller').hidden){unread=true;updateDots()}
  },1400);
}
$('#sForm').addEventListener('submit',e=>{e.preventDefault();sSend(sIn.value)});
sQ.addEventListener('click',e=>{const b=e.target.closest('[data-say]');if(b)sSend(b.dataset.say)});
sCtxEl.addEventListener('click',e=>{if(e.target.closest('#sCtxX')){sellerCtx=null;renderSCtx()}});
$('#sClear').addEventListener('click',()=>{SM=[];saveS();ensureSeed();renderSeller();toast('Percakapan dihapus')});
$('#tabBot').addEventListener('click',()=>showTab('bot',true));
$('#tabSeller').addEventListener('click',()=>showTab('seller',true));
$('.chat-tabs').addEventListener('keydown',e=>{
  if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();const s=lastTab==='bot';showTab(s?'seller':'bot',false);(s?$('#tabSeller'):$('#tabBot')).focus()}
});
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-seller]');
  if(!b)return;
  const id=b.dataset.seller;
  if(id&&byId(id))sellerCtx=id;
  openChat('seller');
});

/* ---------- router ---------- */
function route(){
  const h=location.hash.slice(1)||'/';
  const [path,qs='']=h.split('?');
  const parts=path.split('/').filter(Boolean);
  closeMega();closeSugg();closeCart();
  curPlant=parts[0]==='tanaman'&&parts[1]?byId(decodeURIComponent(parts[1]))||null:null;
  sellerCtx=curPlant?curPlant.id:null;
  if(!parts.length){home();qEl.value=''}
  else if(parts[0]==='tanaman'&&parts[1])detail(decodeURIComponent(parts[1]));
  else if(parts[0]==='tanaman'){const P=new URLSearchParams(qs);listing(P);qEl.value=P.get('q')||''}
  else if(parts[0]==='kuis')quiz();
  else notFound();
  window.scrollTo(0,0);
  if(!first){const t=$('#h1');if(t)t.focus({preventScroll:true})}
  first=false;
  if(!chat.hidden)setChips(chipsDefault());
  renderSCtx();
}
window.addEventListener('hashchange',route);
drawCart();
route();
})();
