// Moonmelt Café — own design interactions
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

// Daypart switcher
const floors={
 1:{img:"assets/floor1.jpg",title:"Daypart 1 — The Dusk Lounge",text:"Golden-hour room for slow starts. Hot brews, fresh bakes and window seats — and a real sharing-board menu, not an afterthought. Fully step-free room.",list:["✓ Sharing boards, properly served","✓ Hot drinks by the hour","✓ Step-free throughout"],price:"Dusk picks • new bakes daily"},
 0:{img:"assets/basement.jpg",title:"Midnight — The Cellar",text:"Downstairs is the slow hours. Caddies at $6–$12, fresh bakes hitting the counter, and the specials people brag about on Instagram. 1,200 sq ft across both rooms — give yourself time.",list:["✓ Everything in caddies $6–$12","✓ New bakes all night","✓ Night-Owl Study applies"],price:"$6–$12 caddies • tap, taste, keep"}
};
document.querySelectorAll('.floor-btn').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.floor-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
  const f=floors[btn.dataset.floor];
  hasGsap&&gsap.fromTo('#floorCard',{opacity:.3,y:12},{opacity:1,y:0,duration:.45});
  document.getElementById('floorImg').src=f.img;document.getElementById('floorTitle').textContent=f.title;
  document.getElementById('floorText').textContent=f.text;document.getElementById('floorPrice').textContent=f.price;
  document.getElementById('floorList').innerHTML=f.list.map(x=>`<li>${x}</li>`).join('');
}));

// Melt Dive game
const binData=[
 [{n:"Single-origin filter, bottomless",p:6},{n:"Crescent sugar-dusted bake",p:9},{n:"Slow-steeped dusk tea",p:12}],
 [{n:"Midnight croissant, still warm",p:9},{n:"Burnt-honey butter toast",p:6},{n:"Cocoa cellar brownie",p:12}],
 [{n:"Moon-milk affogato shot",p:12},{n:"Star-anise soda float",p:9},{n:"Secret cellar cookie",p:6}]
];
let found=new Set(),haul=0;
document.querySelectorAll('.bin').forEach(bin=>{
  let idx=0;const bi=+bin.dataset.bin;
  bin.addEventListener('click',()=>{
    if(idx>=3){bin.querySelector('.find').textContent="Caddy cleared — nice tasting!";return}
    const item=binData[bi][idx++];const key=bi+'-'+idx;if(!found.has(key)){found.add(key);haul+=item.p}
    bin.querySelector('.find').textContent=`FOUND: ${item.n} — $${item.p}`;
    hasGsap&&gsap.fromTo(bin,{scale:.97},{scale:1,duration:.35,ease:"back.out(2)"});
    document.getElementById('findCount').textContent=`${found.size} / 9`;
    document.getElementById('haulTotal').textContent=`$${haul}`;
    if(found.size===9)document.getElementById('binNote').textContent="Full haul cleared for $"+haul+" — that's the cellar. Imagine the real caddies.";
  });
});
document.getElementById('resetBins').addEventListener('click',()=>{found.clear();haul=0;document.getElementById('findCount').textContent="0 / 9";document.getElementById('haulTotal').textContent="$0";document.querySelectorAll('.find').forEach(f=>f.textContent="");document.getElementById('binNote').textContent="Caddies restocked. Dig again.";location.hash='#bins'});

// Menu filter + drag
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
 tees:{t:"The Night Brew Guide",b:"A real night brew tells on itself.\n\n• Crema should be hazelnut-dark and unbroken.\n• Timing matters: 25–30 seconds beats a rushed shot every time.\n• Temperature: serve at once — a great espresso waits for no one.\n\nAt Moonmelt, hot drinks are poured by the hour in the Dusk Lounge, and the cellar caddies hide the $6–$12 legends for diggers."},
 care:{t:"Care For Beans That Last",b:"Good beans have already travelled far. Help them survive your shelf.\n\n• Grind fresh, only what you need.\n• Store dark, cool and sealed — never in the fridge.\n• Rest new beans a week before brewing.\n• Refresh first: a stale bean is a 10-minute cold-brew save, not a goodbye.\n\nGood care is why a bag opened tonight can still sing next week."}
};
const modal=document.getElementById('modal');
document.querySelectorAll('.j-card').forEach(c=>c.addEventListener('click',()=>{const a=articles[c.dataset.article];document.getElementById('modalTitle').textContent=a.t;document.getElementById('modalBody').textContent=a.b;modal.hidden=false}));
document.getElementById('modalClose').addEventListener('click',()=>modal.hidden=true);
modal.addEventListener('click',e=>{if(e.target===modal)modal.hidden=true});
