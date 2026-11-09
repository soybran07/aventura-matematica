'use strict';
(() => {
const $=id=>document.getElementById(id), cv=$('arena'), ctx=cv.getContext('2d'), rpc=window.BALAM_EXAMEN;
const remote=(method,...args)=>new Promise((ok,fail)=>google.script.run.withSuccessHandler(ok).withFailureHandler(fail)[method](...args));
const keys=new Set(), points=[{x:.22,y:.23},{x:.50,y:.76},{x:.78,y:.29}];
let w=1,h=1,heading=0,pos={x:0,y:0},target=null,trail=[],s=null,deltaClock=0,working=false,phase='menu',last=0,lastTrail=0,resize=true,scenery;
const place=()=>{pos={x:w*.5,y:h*.48};heading=0;trail=[];target=null;keys.clear()};
const clock=()=>Date.now()+deltaClock;
const label=t=>new Intl.NumberFormat('es-MX',{maximumFractionDigits:2}).format(t);
function drawLand(){
  scenery=document.createElement('canvas');scenery.width=Math.ceil(w);scenery.height=Math.ceil(h);const g=scenery.getContext('2d');
  const bg=g.createRadialGradient(w*.53,h*.48,5,w*.5,h*.46,Math.max(w,h)*.65);bg.addColorStop(0,'#254f37');bg.addColorStop(.7,'#173a2b');bg.addColorStop(1,'#0b2119');g.fillStyle=bg;g.fillRect(0,0,w,h);
  g.strokeStyle='#71997224';for(let x=16;x<w;x+=32)for(let y=16;y<h;y+=32){g.beginPath();g.arc(x,y,1.2,0,7);g.stroke()}
  for(let i=0;i<48;i++){const x=(i*.618033%1)*w,y=(i*.43785%1)*h;if(x>w*.12&&x<w*.88&&y>h*.14&&y<h*.87)continue;
  g.save();g.translate(x,y);g.rotate(i*2.4);for(let j=0;j<6;j++){g.rotate(1.047);g.fillStyle=['#42774d88','#28573b','#71925069'][j%3];g.beginPath();g.ellipse(10+i%12,0,12+i%10,4,0,0,7);g.fill()}g.restore()}
  g.strokeStyle='#6e9a675c';g.strokeRect(10,10,w-20,h-20);g.strokeStyle='#9eb3782f';g.strokeRect(15,15,w-30,h-30);
}
function dot(x,y,rx,ry,c){ctx.fillStyle=c;ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,7);ctx.fill()}
function jaguar(x,y,a,t){ctx.save();ctx.translate(x,y);ctx.rotate(a);dot(0,3,22,16,'#0006');dot(-10,0,15,12,'#bf7935');for(const side of [-1,1]){dot(-13+3*Math.sin(t/75)*side,side*11,6,4,'#efae50');dot(5-3*Math.sin(t/75)*side,side*11,6,4,'#efae50');dot(4,side*11,5,5,'#36271d');dot(5,side*10,3,3,'#ecad60')}dot(7,0,13,12,'#edac47');dot(16,0,7,8,'#ffdc91');dot(20,0,3.5,3,'#3b2924');for(const side of [-1,1]){dot(10,side*5,2.4,2,'#20392b');dot(11,side*5,1,1,'#eaffb9');dot(-8,side*5,3,2,'#5a3b26');dot(0,side*4,2,1.7,'#5a3b26')}ctx.restore()}
function draw(t){if(resize){const r=cv.getBoundingClientRect(),d=Math.min(2,devicePixelRatio||1);w=Math.max(1,r.width);h=Math.max(1,r.height);cv.width=Math.round(w*d);cv.height=Math.round(h*d);ctx.setTransform(d,0,0,d,0,0);drawLand();place();resize=false;}
ctx.drawImage(scenery,0,0);if(phase==='playing'&&s?.pregunta){const r=radius();points.forEach((p,i)=>{const x=p.x*w,y=p.y*h,g=ctx.createRadialGradient(x,y,3,x,y,r+18+Math.sin(t/450+i)*4);g.addColorStop(0,'#e4ca5f99');g.addColorStop(1,'#ffcf4600');ctx.fillStyle=g;ctx.fillRect(x-r-25,y-r-25,2*r+50,2*r+50);dot(x,y+4,r,r,'#0007');dot(x,y,r,r,'#f7d579');dot(x,y,r-4,r-4,'#2c563e');ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='#fff5cd';ctx.font='bold '+Math.round(r*.77)+'px system-ui';ctx.fillText(s.pregunta.opciones[i],x,y);ctx.fillStyle='#f7d579';ctx.font='bold 12px system-ui';ctx.fillText(String(i+1),x,y+r+9)})}
const size=s?.aciertos||0;for(let i=Math.min(trail.length-1,4+size*4);i>=0;i--){const p=trail[i],r=Math.max(3,11-i*.14);dot(p.x,p.y,r,r,'#df9b45');dot(p.x,p.y,r*.42,r*.36,'#674329')}
jaguar(pos.x,pos.y,heading,t);
}
const radius=()=>Math.max(22,Math.min(37,w*.075,h*.13));
function render(){
  $('marcador').hidden=phase==='menu';$('pregunta').hidden=phase!=='playing';$('panel').hidden=phase==='playing';$('inicio').hidden=phase!=='menu';$('final').hidden=phase!=='finished';
  if(!s)return;
  $('crece').value=s.aciertos;$('marca').textContent='Crecimiento '+s.aciertos+'/12';$('ronda').textContent='Reto '+Math.min(s.indice+1,12)+'/12';
  if(phase==='playing')$('pregunta').textContent=s.pregunta.texto;
  if(phase==='finished'){$('reloj').textContent='Fin';$('titulo').textContent='Resultado: '+label(s.nota/10)+' / 10';$('texto').textContent=s.aciertos+' de 12 aciertos · '+s.indice+' respondidos.';$('repetir').hidden=!!rpc;$('enviar').hidden=s.estado!=='pendiente';$('estado').textContent=s.estado==='enviado'?'Nota guardada en Classroom para revisión.':s.estado==='pendiente'?'Resultado guardado. Falta enviarlo a Classroom.':s.estado==='docente'?'Vista docente: no se envió ninguna nota.':'Práctica: no envía nota a Classroom.';if(s.siguiente){$('siguiente').href=s.siguiente;$('siguiente').hidden=false;}}
}
function adopt(next){s=next;deltaClock=(s.ahora||Date.now())-Date.now();phase=s.terminado?'finished':'playing';render();if(phase==='playing')cv.focus({preventScroll:true});}
let localBank;
function localState(ritmo){localBank=BalamExamen.banco(Date.now());return {indice:0,aciertos:0,limite:Date.now()+BalamExamen.duraciones[ritmo]*1000,pregunta:localBank[0]}}
function localAnswer(i){const p=localBank[s.indice],acierto=p.opciones[i]===p.correcta;return {...s,indice:s.indice+1,aciertos:s.aciertos+Number(acierto),pregunta:localBank[s.indice+1],acierto}}
function localFinish(next){try{localStorage.setItem('balam-examen-posicional-v1','completo')}catch{}return {...next,terminado:true,nota:BalamExamen.nota(next.aciertos),siguiente:'../sumas/?nivel=1'};}
async function start(){if(working)return;working=true;$('jugar').disabled=true;$('estado').textContent='Abriendo el examen…';try{const r=$('ritmo').value;place();adopt(rpc?await remote('iniciarExamenBalam',r):localState(r));}catch(e){$('estado').textContent=e.message||'No se pudo iniciar. Intenta de nuevo.';}finally{working=false;$('jugar').disabled=false;}}
async function answer(i){if(working||phase!=='playing'||clock()>=s.limite)return;working=true;
  try{const prev=s.indice;let next=rpc?await remote('responderExamenBalam',prev,i):localAnswer(i);if(!rpc&&next.indice===12)next=localFinish(next);if(typeof next.acierto==='boolean')$('respuesta').textContent=next.acierto?'¡Correcto! Balam creció.':'Esa opción no era. Sigue con el próximo reto.';adopt(next);target=null;if(phase==='playing'){pos={x:w*.5,y:h*.48};keys.clear();}}
  catch(e){$('respuesta').textContent=(e.message||'Sin conexión')+' · vuelve a intentar.';place();}finally{working=false;}}
let reintentoFin=0;
async function finish(){if(working||Date.now()<reintentoFin)return;working=true;try{adopt(rpc?await remote('cerrarExamenBalam'):localFinish(s));}catch(e){reintentoFin=Date.now()+4000;$('respuesta').textContent='Sin conexión. Reintentando guardar el resultado…';}finally{working=false;}}
function frame(t){const dt=Math.min(.04,(t-last)/1000||0);last=t;draw(t);if(phase==='playing'){
 const seg=Math.max(0,Math.ceil((s.limite-clock())/1000));$('reloj').textContent=Math.floor(seg/60)+':'+String(seg%60).padStart(2,'0');if(!seg)finish();
 if(seg&&!working){let dx=Number(keys.has('ArrowRight'))-Number(keys.has('ArrowLeft')),dy=Number(keys.has('ArrowDown'))-Number(keys.has('ArrowUp'));
 if(dx||dy)target=null;else if(target){dx=target.x-pos.x;dy=target.y-pos.y;}
 const d=Math.hypot(dx,dy);if(d>.5){heading=Math.atan2(dy,dx);const speed=Math.min(245,Math.max(125,w*.35));const step=target?Math.min(d,speed*dt):speed*dt;pos.x=Math.max(15,Math.min(w-15,pos.x+Math.cos(heading)*step));pos.y=Math.max(15,Math.min(h-15,pos.y+Math.sin(heading)*step));if(t-lastTrail>36){trail.unshift({...pos});trail.length=Math.min(trail.length,60);lastTrail=t;}}
 points.some((p,i)=>{if(Math.hypot(pos.x-p.x*w,pos.y-p.y*h)<radius()+5){answer(i);return true}return false});
 }}requestAnimationFrame(frame)}
function aim(e){if(phase!=='playing')return;const r=cv.getBoundingClientRect();target={x:e.clientX-r.left,y:e.clientY-r.top}}
cv.addEventListener('pointermove',aim);cv.addEventListener('pointerdown',aim);
window.addEventListener('keydown',e=>{if(phase!=='playing')return;if(e.key.startsWith('Arrow')){e.preventDefault();keys.add(e.key)}else if(/^[123]$/.test(e.key)&&!e.repeat){e.preventDefault();answer(Number(e.key)-1);}});window.addEventListener('keyup',e=>keys.delete(e.key));window.addEventListener('blur',()=>{keys.clear();target=null;});
new ResizeObserver(()=>resize=true).observe(cv);$('jugar').onclick=start;$('enviar').onclick=finish;$('repetir').onclick=()=>location.reload();
requestAnimationFrame(frame);
})();
