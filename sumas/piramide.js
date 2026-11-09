/* Interior del templo: las mismas preguntas se validan en el navegador y en el servidor. */
function retoPiramide(i,route){
 const sets={apoyo:[364,247,615,482,739],practica:[706,538,904,371,820],reto:[908,507,690,802,970]};
 const n=(sets[route]||sets.apoyo)[i-5], pos=[1,0,2,1,2][i-5], pow=10**pos, d=Math.floor(n/pow)%10;
 const story=i===8?'¿Qué número se forma con '+Math.floor(n/100)+' centenas, '+Math.floor(n/10)%10+' decenas y '+n%10+' unidades?':i===6?'¿Qué cifra ocupa las unidades de '+n+'?':'¿Cuánto valen las '+['unidades','decenas','centenas'][pos]+' de '+n+'?';
 const answer=i===8?n:i===6?d:d*pow;
 const wrong=i===8?[n+9,n-10]:i===6?[(d+1)%10,(d+2)%10]:d?[pos===2?d*10:d*100,pos===1?d:pos===2?d:d*10]:[pow,pow*2];
 const options=[answer,...wrong];for(let j=0;j<(n+i)%3;j++)options.push(options.shift());
 return {kind:'numeric',story,answer,options,check:null,code:'TEMPLO-'+(i-4),hint:'Separa el número en C, D y U.'};
}
