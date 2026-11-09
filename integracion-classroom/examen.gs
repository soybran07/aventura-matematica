/** Cada intento oficial tiene un solo plazo y se conserva por cuenta institucional. */
const EXAMEN_W=12;
const EXAMEN_TITULO='Juego 03 · Concretando lo aprendido — Examen';
const EXAMEN_DESC='Guía al jaguar Balam y recoge los números correctos. Examen de unidades, decenas y centenas: identifica cifras, calcula su valor, construye y compara números. Usa el cursor, las flechas o las teclas 1, 2 y 3.\n\nCada acierto hace crecer la estela. 12 de 12 = 10; la nota de Classroom es aciertos ÷ 12 × 100. Los errores y los retos sin responder no suman. Dificultad: Con apoyo 3:30, Normal 2:30, Reto 2:00. Solo hay un intento oficial por cuenta; al terminar se guarda la nota para revisión.\n\nEn el cuaderno: anota un número de tres cifras, descompónlo en centenas, decenas y unidades y explica el valor de una cifra.';
function examenTask_(){return JSON.parse(props_().getProperty('TASKS')||'{}')[EXAMEN_W]}
function publicarExamenPosicional(){owner_();const base='courses/'+BALAM_CONFIG.courseId+'/courseWork', tasks=JSON.parse(props_().getProperty('TASKS')||'{}');
 const link=MUL_APP_URL+'?nivel=13';
 const old=tasks[EXAMEN_W]?api_(base+'/'+tasks[EXAMEN_W]):list_(base,'courseWork').find(x=>x.title===EXAMEN_TITULO&&x.associatedWithDeveloper);
 if(old&&old.state==='PUBLISHED'){tasks[EXAMEN_W]=old.id;props_().setProperty('TASKS',JSON.stringify(tasks));console.log(old.alternateLink||old.id);return old.id;}
 const values={description:'ABRIR EXAMEN Y REGISTRAR CALIFICACIÓN: '+link+'\n\n'+EXAMEN_DESC,state:'PUBLISHED',materials:[{link:{url:link,title:'Jugar con la cuenta institucional'}}]};
 const task=old?api_(base+'/'+old.id+'?updateMask=state,description,materials','patch',values):api_(base,'post',{...values,title:EXAMEN_TITULO,maxPoints:100,workType:'ASSIGNMENT',topicId:'895575457961'});
 tasks[EXAMEN_W]=task.id;props_().setProperty('TASKS',JSON.stringify(tasks));console.log(task.alternateLink||task.id);return task.id;
}
function examenEstado_(who){const raw=props_().getProperty(stateKey_(who,EXAMEN_W));return raw?JSON.parse(raw):null}
function examenGuardar_(who,s){props_().setProperty(stateKey_(who,EXAMEN_W),JSON.stringify(s));}
function examenPublico_(who,s){const idx=s.respuestas.length, p=s.terminado?null:BalamExamen.banco(s.seed)[idx];return{
 indice:idx,aciertos:s.aciertos,ahora:Date.now(),limite:s.limite,terminado:s.terminado===true,
 pregunta:p?{texto:p.texto,opciones:p.opciones}:null,nota:s.grade??null,estado:s.estado||null,acierto:s.respuestas[idx-1],
 siguiente:s.terminado?MUL_APP_URL+'?nivel=1':null};}
function examenCerrar_(who,s){if(!s.terminado){s.terminado=true;s.grade=BalamExamen.nota(s.aciertos);s.estado=who.teacher?'docente':'pendiente';examenGuardar_(who,s);}
 if(s.estado==='pendiente'){try{syncGrade_(who,EXAMEN_W,s);s.estado='enviado';examenGuardar_(who,s);}catch(e){console.warn('No se pudo sincronizar el examen: '+e.message);}}
 return examenPublico_(who,s);
}
function iniciarExamenBalam(ritmo){return locked_(()=>{const who=identity_();comprobarRuta_(who,EXAMEN_W);if(!who.teacher&&!examenTask_())throw Error('La tarea del examen aún no está disponible.');
 let s=examenEstado_(who);if(!s){const seconds=Object.hasOwn(BalamExamen.duraciones,ritmo)?BalamExamen.duraciones[ritmo]:0;if(!seconds)throw Error('Elige una dificultad válida.');
 s={seed:Math.floor(Math.random()*0x100000000),ritmo,limite:Date.now()+seconds*1000,respuestas:[],aciertos:0};examenGuardar_(who,s);}
 if(s.terminado||Date.now()>=s.limite)return examenCerrar_(who,s);return examenPublico_(who,s);
});}
function responderExamenBalam(idx,op){return locked_(()=>{const who=identity_();comprobarRuta_(who,EXAMEN_W);const s=examenEstado_(who);if(!s)throw Error('Primero inicia el examen.');
 if(s.terminado||Date.now()>=s.limite)return examenCerrar_(who,s);
 if(!Number.isInteger(op)||op<0||op>2||!Number.isInteger(idx)||idx<0)throw Error('Opción inválida.');
 if(idx<s.respuestas.length)return examenPublico_(who,s);
 if(idx!==s.respuestas.length)throw Error('Actualiza para recuperar tu avance.');
 const p=BalamExamen.banco(s.seed)[idx],acierto=p.opciones[op]===p.correcta;
 s.respuestas.push(acierto);s.aciertos+=Number(acierto);examenGuardar_(who,s);
 return s.respuestas.length===BalamExamen.TOTAL?examenCerrar_(who,s):examenPublico_(who,s);
});}
function cerrarExamenBalam(){return locked_(()=>{const who=identity_();comprobarRuta_(who,EXAMEN_W);const s=examenEstado_(who);if(!s)throw Error('Primero inicia el examen.');if(!s.terminado&&Date.now()<s.limite&&s.respuestas.length<BalamExamen.TOTAL)return examenPublico_(who,s);return examenCerrar_(who,s);});}
function doGetExamen_(){return HtmlService.createHtmlOutput(EXAMEN_HTML).setTitle('Balam · Juego 03 · Examen').addMetaTag('viewport','width=device-width, initial-scale=1');}
