let huidaAnim=0;
const esTemplo=()=>world===5;
function piramideAt(x){
 for(let i=0;i<7;i++){const w=248-i*29,y=FLOOR-(i+1)*26;rr(x+49-w/2,y,w,27,5,i%2?'#778679':'#a2ad90');rr(x+50-w/2,y,w-2,4,2,'#c2c7a6');}
 rr(x+16,FLOOR-228,66,48,5,'#839784');rr(x+33,FLOOR-218,30,35,5,'#173b34');
 ctx.fillStyle='#566f63';ctx.beginPath();ctx.moveTo(x+25,FLOOR-180);ctx.lineTo(x+74,FLOOR-180);ctx.lineTo(x+99,FLOOR);ctx.lineTo(x,FLOOR);ctx.fill();
 for(let i=0;i<13;i++)rr(x+25-i*2,FLOOR-179+i*14,49+i*4,3,1,'#bec3a0');
}
function interior(status=''){
 cancelAnimationFrame(huidaAnim);$('overlay').classList.remove('lavaOverlay');
 mode='temple';const i=st.done;
 if(i>=10){finTemplo();return;}
 if(i===9){show('<div class="templeScene papyrus"><div class="eyebrow">PAPIRO DEL SANTUARIO</div><h2>La pantera ya no está aquí</h2><p>Sigue buscando.</p><p class="gem">◆</p><p>Diamante: +1 en el examen si consigues escapar.</p><button class="gold" id="takeGem">Tomar diamante y correr</button><p id="templeStatus" role="status">'+esc(status)+'</p></div>','Papiro y diamante');$('takeGem').onclick=async()=>{if(busy)return;busy=true;$('takeGem').disabled=true;try{const duration=route==='apoyo'?24:route==='reto'?12:18;const ms=remote?await ClassroomLink.call('iniciarHuidaTemplo',[]):duration*1000;escenaRocas(i,performance.now()+ms);}catch(e){$('templeStatus').textContent=e.message;$('takeGem').disabled=false;}finally{busy=false}};return;}
 escenaRocas(i,0,status);
}
function lavaBoard(p,i){
 const cat='<svg viewBox="0 0 110 104" aria-hidden="true"><path d="M69 77 Q108 93 99 61" fill="none" stroke="#b76b33" stroke-width="11" stroke-linecap="round"/><ellipse cx="54" cy="74" rx="29" ry="24" fill="#d48b3f"/><path d="M27 78 Q16 89 27 96H43L48 78M77 78Q93 89 79 96H64L59 78" fill="#edab50" stroke="#713d2b" stroke-width="3"/><circle cx="25" cy="26" r="14" fill="#dc9544"/><circle cx="83" cy="26" r="14" fill="#dc9544"/><circle cx="25" cy="26" r="7" fill="#854d39"/><circle cx="83" cy="26" r="7" fill="#854d39"/><path d="M18 46Q18 18 54 19Q88 18 91 46Q96 70 54 77Q14 70 18 46" fill="#f5b85a" stroke="#693b2b" stroke-width="3"/><path d="M31 58Q42 47 54 55Q67 47 79 58Q75 72 54 73Q34 72 31 58" fill="#ffe3a9"/><path d="M47 54Q54 50 61 54L54 61Z" fill="#442821"/><g fill="#633622"><ellipse cx="38" cy="45" rx="4" ry="5"/><ellipse cx="70" cy="45" rx="4" ry="5"/><circle cx="29" cy="53" r="3"/><circle cx="79" cy="53" r="3"/><circle cx="45" cy="29" r="3"/><circle cx="63" cy="29" r="3"/></g></svg>';
 return '<div class="lavaGame"><header class="lavaHud"><strong>Río de lava</strong><span>Salto '+(i-4)+' de 4</span><span>◆ '+(i-5)+'/4</span></header><h2>'+esc(p.story)+'</h2><div class="lavaMap" aria-label="Tablero de rocas sobre lava"><div class="lavaWorld"><div class="lavaGoal" aria-hidden="true"><b>SANTUARIO</b><i></i></div>'+[[15,27],[34,18],[66,18],[85,27],[12,67],[88,67]].map(([x,y])=>'<i class="lavaStone sceneryRock" style="--x:'+x+'%;--y:'+y+'%" aria-hidden="true"></i>').join('')+'<i class="lavaStone homeRock" style="--x:50%;--y:80%" aria-hidden="true"></i>'+p.options.map((v,j)=>'<button class="lavaStone choiceRock" data-rock="'+j+'" style="--x:'+([26,50,74][j])+'%;--y:'+([58,41,58][j])+'%" aria-label="'+('ABC'[j])+': '+v+'"><small>'+('ABC'[j])+'</small><b>'+v+'</b></button>').join('')+'<div class="lavaCat" aria-label="Balam">'+cat+'</div></div></div><footer id="templeStatus" role="status">Elige una roca · también puedes usar A, B o C</footer></div>';
}

function escenaRocas(i,deadline,status=''){
 const p=retoPiramide(i,route),escape=i===9;
 if(!escape){
   show(lavaBoard(p,i),'Cruce de lava');$('overlay').classList.add('lavaOverlay');$('card').classList.add('lavaCard');
 }else show('<div class="templeScene '+(escape?'escape':'lava')+'"><div class="eyebrow">'+(escape?'HUIDA DEL TEMPLO':'RÍO DE LAVA · SALTO '+(i-4)+' / 4')+'</div><h2>'+esc(p.story)+'</h2><div class="trailStage"><span class="boulder" aria-hidden="true">●</span><span class="balamGlyph" aria-label="Balam">🐆</span><span aria-hidden="true">'+(escape?'▥':'⛰')+'</span></div><div class="rocks" aria-label="Elige la respuesta correcta">'+p.options.map((v,j)=>'<button data-rock="'+j+'">'+v+'</button>').join('')+'</div><p id="templeStatus" role="status">'+esc(status|| (escape?'Resuelve el sello antes de que llegue la roca.':'Elige una roca para que Balam salte.'))+'</p>'+(escape?'<progress id="escapeTime" aria-label="Tiempo restante" max="100" value="100"></progress>':'')+'</div>',escape?'Huida del templo':'Cruce de lava');
 const stage=$('card').querySelector(escape?'.templeScene':'.lavaGame'),buttons=[...stage.querySelectorAll('[data-rock]')],began=performance.now();
 if(!escape){
   stage.addEventListener('keydown',e=>{const j='abc'.indexOf(e.key.toLowerCase());if(j>=0&&e.key.length===1&&!e.repeat){e.preventDefault();buttons[j].click();}});
 }
 if(deadline){const tick=now=>{if(!stage.isConnected)return;const left=Math.max(0,(deadline-now)/(deadline-began));$('escapeTime').value=left*100;stage.style.setProperty('--roca',(1-left)*62+'%');if(!left&&!busy){interior('La roca llegó a la salida. Conservas tu avance; vuelve a intentar.');return}huidaAnim=requestAnimationFrame(tick)};huidaAnim=requestAnimationFrame(tick);}
 buttons.forEach((b,j)=>b.onclick=async()=>{if(busy||(deadline&&performance.now()>=deadline))return;busy=true;buttons.forEach(x=>x.disabled=true);
 try{const v=p.options[j];
 if(!escape){stage.style.setProperty('--dx',([26,50,74][j]-50)+'%');stage.style.setProperty('--dy',([58,41,58][j]-80)+'%');stage.classList.add('jumping');buttons[j].classList.add('selectedRock');}let ok;if(remote){const r=await ClassroomLink.answer(world,route,i,v,null);ok=r.correct;st=r.state;}else{ok=v===p.answer;if(!ok)st.pending.tries++;}
 if(!ok){stage.classList.remove('jumping');stage.classList.add('splash');$('templeStatus').textContent=escape?'Ese sello no abre la salida. Intenta otro.':'¡Lava! Balam vuelve a la roca segura. Intenta otra.';await new Promise(r=>setTimeout(r,380));stage.classList.remove('splash');buttons[j].classList.remove('selectedRock');return;}
 if(remote)st=await ClassroomLink.advance(world,route,i);else{st.records.push({code:p.code,tries:st.pending.tries,hints:0});st.done++;st.pending={tries:0,hints:0};if(escape)st.diamond=true;save();}
 cancelAnimationFrame(huidaAnim);stage.style.setProperty('--rock-choice',((j-1)*70+58)+'px');stage.classList.add('leap');$('templeStatus').textContent=escape?'¡Balam escapó!':'¡Roca firme!';if(!escape){await new Promise(r=>setTimeout(r,520));stage.classList.add('travel');}
 await new Promise(r=>setTimeout(r,430));if(stage.isConnected){hud();interior();}
 }catch(e){if(escape)interior(e.message);else {stage.classList.remove('jumping');buttons[j].classList.remove('selectedRock');$('templeStatus').textContent=e.message;}}finally{busy=false;buttons.forEach(x=>x.disabled=false);}});
}
function finTemplo(){
 mode='finish';
 show('<div class="templeScene papyrus"><div class="eyebrow">EXPEDICIÓN COMPLETADA</div><h2>'+(st.diamond?'¡Escapaste con el diamante!':'Templo de los números completado')+'</h2><p>'+ (st.diamond?'◆ +1 en el examen de valor posicional (máximo 10).':'Tu avance anterior se conserva.')+'</p><div class="actions">'+BalamRuta.botonSiguiente(world)+(st.teacherPreview?'<button id="replayTemple">Reiniciar mi vista docente</button>':'')+'<button id="templeMenu">Menú</button></div></div>','Salida del templo');$('templeMenu').onclick=menu;
 const replay=$('replayTemple');if(replay)replay.onclick=async()=>{if(busy)return;busy=true;replay.disabled=true;try{st=await ClassroomLink.call('reiniciarTemploDocente',[]);route=st.route;spawn();hud();resume();}catch(e){replay.textContent=e.message;replay.disabled=false;}finally{busy=false;}};
}
