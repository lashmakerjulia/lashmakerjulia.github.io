document.documentElement.classList.add('js');
document.addEventListener('DOMContentLoaded',()=>{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const hd=$('.hd'),nav=$('#nav'),bg=$('.burger');
const sc=()=>hd.classList.toggle('sc',scrollY>30);addEventListener('scroll',sc,{passive:true});sc();
const tog=o=>{nav.classList.toggle('open',o);bg.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':''};
bg.onclick=()=>tog(!nav.classList.contains('open'));$$('nav a').forEach(a=>a.onclick=()=>tog(false));
const els=$$('.reveal');
if('IntersectionObserver' in window){const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.08});els.forEach(e=>io.observe(e))}else els.forEach(e=>e.classList.add('in'));
setTimeout(()=>els.forEach(e=>e.classList.add('in')),4000);
if(matchMedia('(pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
const g=$('.glow');addEventListener('pointermove',e=>{g.style.setProperty('--x',e.clientX+'px');g.style.setProperty('--y',e.clientY+'px')},{passive:true});
$$('.magnetic').forEach(m=>{m.addEventListener('pointermove',e=>{const r=m.getBoundingClientRect();m.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.22}px,${(e.clientY-r.top-r.height/2)*.3}px)`});m.addEventListener('pointerleave',()=>m.style.transform='')})}
const lb=$('#lb'),li=$('#li'),src=$$('[data-g]').map(e=>e.dataset.g);let i=0;
const show=n=>{i=(n+src.length)%src.length;li.src=src[i]};
const close=()=>{lb.hidden=true;document.body.style.overflow=''};
$$('.tile').forEach(t=>t.onclick=()=>{show(src.indexOf(t.dataset.g));lb.hidden=false;document.body.style.overflow='hidden'});
$('#lx').onclick=close;$('#lp').onclick=()=>show(i-1);$('#ln').onclick=()=>show(i+1);lb.onclick=e=>{if(e.target===lb)close()};
addEventListener('keydown',e=>{if(lb.hidden)return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(i-1);if(e.key==='ArrowRight')show(i+1)});
$('#year').textContent=new Date().getFullYear();
});
