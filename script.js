// Vivant Vintage — own design interactions
const hasGsap = typeof gsap!=='undefined'; if(hasGsap && typeof ScrollTrigger!=='undefined') gsap.registerPlugin(ScrollTrigger);
if(hasGsap) gsap.from(".hero-copy > *",{y:34,opacity:0,stagger:.09,duration:.8,ease:"power3.out"});
if(hasGsap) document.querySelectorAll("section .head, .floor-card, .bin, .card, .tl, .perk, .j-card, .store").forEach(el=>{
  gsap.from(el,{y:36,opacity:0,duration:.7,ease:"power2.out",scrollTrigger:{trigger:el,start:"top 88%"}});
});
// Swinging hang tag — follows pointer a little
const tag=document.getElementById('hangTag');let swing;
tag.addEventListener('pointermove',e=>{const r=tag.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;hasGsap&&gsap.to(tag,{rotation:x*18,duration:.4})});
tag.addEventListener('pointerleave',()=>{hasGsap&&gsap.to(tag,{rotation:0,duration:.8,ease:"elastic.out(1,.4)"})});
if(hasGsap) gsap.to(tag,{rotation:3,duration:1.6,yoyo:true,repeat:-1,ease:"sine.inOut"});

// Floor switcher
const floors={
 1:{img:"assets/floor1.jpg",title:"Floor 1 — The Curated Racks",text:"Hand-picked vintage sorted by era, size and style. Band tees, denim, dresses, workwear — and a real plus-size section, not an afterthought. Fully ADA-accessible floor.",list:["✓ Plus sizes, properly racked","✓ Vintage tees by decade","✓ ADA-accessible throughout"],price:"Curated picks • new drops weekly"},
 0:{img:"assets/basement.jpg",title:"Basement — The Bargain Dive",text:"Downstairs is the hunt. Bins at $5–$10, fresh stock hitting the floor, and the finds people brag about on Instagram. 3,500 sq ft across both floors — give yourself time.",list:["✓ Everything in bins $5–$10","✓ New stock all week","✓ Student Wednesdays apply"],price:"$5–$10 bins • dig, find, keep"}
};
document.querySelectorAll('.floor-btn').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.floor-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
  const f=floors[btn.dataset.floor];
  hasGsap&&gsap.fromTo('#floorCard',{opacity:.3,y:12},{opacity:1,y:0,duration:.45});
  document.getElementById('floorImg').src=f.img;document.getElementById('floorTitle').textContent=f.title;
  document.getElementById('floorText').textContent=f.text;document.getElementById('floorPrice').textContent=f.price;
  document.getElementById('floorList').innerHTML=f.list.map(x=>`<li>${x}</li>`).join('');
}));

// Bin Dive game
const binData=[
 [{n:"'94 single-stitch band tee",p:10},{n:"Boston souvenir tee",p:5},{n:"Faded college sweatshirt",p:10}],
 [{n:"Levi's 501s — your size",p:10},{n:"Workwear carpenter jeans",p:10},{n:"Cut-off shorts",p:5}],
 [{n:"Leather belt, brass buckle",p:5},{n:"Silk scarf, 70s print",p:5},{n:"Deadstock cap",p:10}]
];
let found=new Set(),haul=0;
document.querySelectorAll('.bin').forEach(bin=>{
  let idx=0;const bi=+bin.dataset.bin;
  bin.addEventListener('click',()=>{
    if(idx>=3){bin.querySelector('.find').textContent="Bin cleared — nice digging!";return}
    const item=binData[bi][idx++];const key=bi+'-'+idx;if(!found.has(key)){found.add(key);haul+=item.p}
    bin.querySelector('.find').textContent=`FOUND: ${item.n} — $${item.p}`;
    hasGsap&&gsap.fromTo(bin,{scale:.97},{scale:1,duration:.35,ease:"back.out(2)"});
    document.getElementById('findCount').textContent=`${found.size} / 9`;
    document.getElementById('haulTotal').textContent=`$${haul}`;
    if(found.size===9)document.getElementById('binNote').textContent="Full haul cleared for $"+haul+" — that's the basement. Imagine the real bins.";
  });
});
document.getElementById('resetBins').addEventListener('click',()=>{found.clear();haul=0;document.getElementById('findCount').textContent="0 / 9";document.getElementById('haulTotal').textContent="$0";document.querySelectorAll('.find').forEach(f=>f.textContent="");document.getElementById('binNote').textContent="Bins restocked. Dig again.";location.hash='#bins'});

// Rack filter + drag
document.querySelectorAll('.chip').forEach(ch=>ch.addEventListener('click',()=>{
  document.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));ch.classList.add('active');
  const f=ch.dataset.filter;
  document.querySelectorAll('.card').forEach(card=>{card.style.display=(f==='all'||card.dataset.cat.includes(f))?'':'none'});
}));
const rack=document.getElementById('rack');let down=false,startX=0,scrollL=0;
rack.addEventListener('pointerdown',e=>{down=true;startX=e.clientX;scrollL=rack.scrollLeft});
window.addEventListener('pointerup',()=>down=false);
window.addEventListener('pointermove',e=>{if(down)rack.scrollLeft=scrollL-(e.clientX-startX)});

// Journal modal
const articles={
 tees:{t:"The Vintage T-Shirt Guide",b:"A real vintage tee tells on itself.\n\n• Single-stitch hems point to pre-mid-90s blanks.\n• Tags matter: paper-thin, faded, and era-correct brands beat a perfect reprint.\n• The fade should be uneven — sun, wash and wear don't fade in straight lines.\n\nAt Vivant, tees are racked by decade on Floor 1, and the basement bins hide the $5–$10 legends for diggers."},
 care:{t:"Care For Clothes That Last",b:"Vintage has already survived decades. Help it survive you.\n\n• Wash less, wash cold, turn graphic tees inside out.\n• Skip the hot dryer — air-dry denim and knits.\n• Store folded, not hung, for heavy sweaters.\n• Repair first: a loose seam is a 10-minute fix, not a goodbye.\n\nGood care is why a 30-year-old tee can outlive a brand-new one."}
};
const modal=document.getElementById('modal');
document.querySelectorAll('.j-card').forEach(c=>c.addEventListener('click',()=>{const a=articles[c.dataset.article];document.getElementById('modalTitle').textContent=a.t;document.getElementById('modalBody').textContent=a.b;modal.hidden=false}));
document.getElementById('modalClose').addEventListener('click',()=>modal.hidden=true);
modal.addEventListener('click',e=>{if(e.target===modal)modal.hidden=true});
