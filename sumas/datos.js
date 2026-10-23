'use strict';
// Dos rutas académicas por mundo. Cada entrada contiene historia, expresión y comprobación.
const WORLDS=[
{title:'El bosque de las provisiones',topic:'Sumas y restas sin reagrupación',goal:'Alinear unidades, decenas y centenas; distinguir reunir y quitar.',palette:['#80c8bd','#c8e7a2','#245b48','#70a557'],enemy:'escarabajos de musgo',hint:'Alinea C, D y U. Reúne o retira en cada columna. En estos problemas no necesitas cambiar decenas ni centenas.',problems:[
['Balam reúne 24 frutos de un árbol y 13 de otro. ¿Cuántos lleva?',24,'+',13,12,'+',15,'frutos'],
['Había 58 semillas y se entregaron 23. ¿Cuántas quedan?',58,'-',23,36,'-',12,'semillas'],
['Una canasta tiene 132 vendas y otra 245. ¿Cuántas vendas hay?',132,'+',245,23,'+',14,'vendas'],
['De 486 ladrillos se usaron 152 para el puente. ¿Cuántos quedan?',486,'-',152,47,'-',25,'ladrillos'],
['Había 321 botellas y llegaron 146. ¿Cuántas hay ahora?',321,'+',146,32,'+',16,'botellas'],
['El almacén tenía 759 raciones y entregó 324. ¿Cuántas conserva?',759,'-',324,68,'-',34,'raciones']
]},
{title:'Las cascadas de las decenas',topic:'Sumas con transformación (llevar)',goal:'Cambiar 10 unidades por 1 decena y 10 decenas por 1 centena.',palette:['#68b6d4','#c8e6e9','#1f566a','#5e9a91'],enemy:'burbujas traviesas',hint:'Empieza por las unidades. Si reúnes 10 o más, cambia 10 unidades por 1 decena. Registra el cambio; no lo pierdas al sumar las decenas.',problems:[
['Balam tiene 28 gemas y encuentra 17. ¿Cuántas tiene?',28,'+',17,18,'+',15,'gemas'],
['Llegan 46 visitantes por un sendero y 38 por otro. ¿Cuántos llegan?',46,'+',38,27,'+',16,'visitantes'],
['Hay 157 botellas y se reciben 86 más. ¿Cuántas hay?',157,'+',86,48,'+',25,'botellas'],
['Se reunieron 358 semillas y después 265. ¿Cuántas hay en total?',358,'+',265,56,'+',28,'semillas'],
['Un equipo trae 476 ladrillos y otro 187. ¿Cuántos traen?',476,'+',187,67,'+',25,'ladrillos'],
['Para el refugio hay 687 raciones y llegan 258. ¿Cuántas hay?',687,'+',258,78,'+',35,'raciones']
]},
{title:'La mina de los intercambios',topic:'Restas con préstamo',goal:'Descomponer una decena o centena sin cambiar el valor total.',palette:['#80759d','#d6bd9b','#4b405d','#877051'],enemy:'rocas saltarinas',hint:'Si las unidades no alcanzan, cambia 1 decena por 10 unidades. La columna que presta disminuye en 1. Haz lo mismo con las centenas si hace falta.',problems:[
['Había 42 antorchas y Balam utilizó 18. ¿Cuántas quedan?',42,'-',18,32,'-',15,'antorchas'],
['De 73 cuerdas se entregaron 46. ¿Cuántas quedan?',73,'-',46,51,'-',24,'cuerdas'],
['Hay 152 cristales y se usan 78. ¿Cuántos quedan?',152,'-',78,64,'-',27,'cristales'],
['Balam tenía 432 monedas y paga 175. ¿Cuántas conserva?',432,'-',175,82,'-',46,'monedas'],
['De 621 bloques se usan 284. ¿Cuántos quedan?',621,'-',284,93,'-',58,'bloques'],
['El refugio tenía 853 raciones y entregó 467. ¿Cuántas conserva?',853,'-',467,71,'-',36,'raciones']
]},
{title:'El desierto de los ceros',topic:'Restas con ceros y comprobación',goal:'Reagrupar a través de ceros y comprobar la resta mediante una suma.',palette:['#edba8c','#f5dfae','#8a6245','#bd9358'],enemy:'escorpiones de arena',hint:'Busca una posición a la izquierda que pueda cambiarse. Por ejemplo, 100 = 9 decenas + 10 unidades. Después comprueba: resultado + lo que quitaste = cantidad inicial.',problems:[
['Hay 100 litros de agua y se consumen 47. ¿Cuántos quedan?',100,'-',47,100,'-',23,'litros'],
['De 200 vendas se entregan 86. ¿Cuántas quedan?',200,'-',86,100,'-',45,'vendas'],
['Balam paga 235 monedas de sus 500. ¿Cuántas conserva?',500,'-',235,100,'-',68,'monedas'],
['Había 704 semillas y se sembraron 286. ¿Cuántas quedan?',704,'-',286,200,'-',75,'semillas'],
['De 1 000 botellas se repartieron 468. ¿Cuántas quedan?',1000,'-',468,300,'-',146,'botellas'],
['En el depósito hay 1 002 raciones; se entregan 587. ¿Cuántas quedan?',1002,'-',587,400,'-',157,'raciones']
]},
{title:'La fortaleza de la pantera',topic:'Problemas de suma y resta en varios pasos',goal:'Elegir y ordenar operaciones, estimar y responder con la unidad correcta.',palette:['#676ba0','#b4b2d4','#353959','#697178'],enemy:'guardianes de sombra',hint:'Separa la historia en momentos. ¿Qué cantidad había? ¿Qué llegó? ¿Qué salió? Escribe una operación por paso y comprueba que tu respuesta conteste la pregunta.',mixed:true,problems:[
{story:'Balam reúne 125 frutos, recibe 48 y entrega 67 al refugio. ¿Cuántos conserva?',expr:[125,'+',48,'-',67],easy:[25,'+',18,'-',16],unit:'frutos'},
{story:'Llevas 250 monedas; compras una cuerda de 85 y una lámpara de 68. ¿Cuántas te quedan?',expr:[250,'-',85,'-',68],easy:[70,'-',25,'-',18],unit:'monedas'},
{story:'El huerto tiene 186 semillas y necesita 300. Recibe 57 más. ¿Cuántas faltan todavía?',expr:[300,'-','(',186,'+',57,')'],easy:[100,'-','(',42,'+',28,')'],unit:'semillas',missing:true},
{story:'Hay 84 litros en un depósito y 67 en otro. Se usan 95 para apagar un incendio. ¿Cuántos quedan?',expr:[84,'+',67,'-',95],easy:[35,'+',28,'-',24],unit:'litros'},
{story:'Balam recupera 475 gemas, pierde 168 y encuentra otras 94. ¿Cuántas lleva al castillo?',expr:[475,'-',168,'+',94],easy:[65,'-',28,'+',17],unit:'gemas'},
{story:'Para abrir el refugio se necesitan 500 ladrillos. Hay 238, llegan 175 y se rompen 46. ¿Cuántos faltan?',expr:[500,'-','(',238,'+',175,'-',46,')'],easy:[100,'-','(',48,'+',35,'-',16,')'],unit:'ladrillos',missing:true}
]}
];
function calc(tokens){let i=0;function part(){if(tokens[i]==='('){i++;const v=sum();if(tokens[i++]!==')')throw Error('Paréntesis');return v}const v=tokens[i++];if(!Number.isInteger(v))throw Error('Número');return v}function sum(){let v=part();while(i<tokens.length&&tokens[i]!==')'){const op=tokens[i++],n=part();if(op==='+')v+=n;else if(op==='-')v-=n;else throw Error('Operación')}return v}const result=sum();if(i!==tokens.length)throw Error('Expresión');return result}
function getProblem(world,index,route){const w=WORLDS[world],p=w.problems[index],easy=route==='apoyo';let expr,story,unit;if(w.mixed){expr=easy?p.easy:p.expr;unit=p.unit;story=p.story;if(easy){const n=expr.filter(Number.isInteger);const stories=[`Balam reúne ${n[0]} frutos, recibe ${n[1]} y entrega ${n[2]}. ¿Cuántos conserva?`,`Balam lleva ${n[0]} monedas y paga ${n[1]} y luego ${n[2]}. ¿Cuántas quedan?`,`Se necesitan ${n[0]} semillas; hay ${n[1]} y llegan ${n[2]}. ¿Cuántas faltan?`,`Hay ${n[0]} litros y llegan ${n[1]}; se usan ${n[2]}. ¿Cuántos quedan?`,`Balam lleva ${n[0]} gemas, pierde ${n[1]} y encuentra ${n[2]}. ¿Cuántas lleva ahora?`,`Se necesitan ${n[0]} ladrillos; hay ${n[1]}, llegan ${n[2]} y se rompen ${n[3]}. ¿Cuántos faltan?`];story=stories[index]}}else{expr=easy?[p[4],p[5],p[6]]:[p[1],p[2],p[3]];unit=p[7];story=easy?(expr[1]==='+'?`Balam tiene ${expr[0]} ${unit} y recibe ${expr[2]} más. ¿Cuántos tiene ahora?`:`Balam tiene ${expr[0]} ${unit} y utiliza ${expr[2]}. ¿Cuántos quedan?`):p[0]}
const answer=calc(expr);let check=world===3?answer+expr[2]:null;return{story,expr,answer,unit,check,hint:w.hint,explain:expr.join(' ')+' = '+answer+' '+unit+(check!==null?'. Comprobación: '+answer+' + '+expr[2]+' = '+check:'.'),code:'SR'+(world+1)+'-'+route[0].toUpperCase()+'-'+String(index+1).padStart(2,'0')}}
