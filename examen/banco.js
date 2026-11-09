'use strict';
const BalamExamen = (() => {
  const TOTAL=12, duraciones=Object.freeze({apoyo:210,practica:150,reto:120});
  function banco(seed) {
    let n=seed>>>0;
    const pick=max=>{n=(Math.imul(n,1664525)+1013904223)>>>0;return (n>>>8)%max};
    const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=pick(i+1);[a[i],a[j]]=[a[j],a[i]]}return a};
    const names=['unidades','decenas','centenas'];
    return shuffle(names.flatMap((_,i)=>[0,1,2,3].map(type=>{
      let d=[1+pick(9),1+pick(9),1+pick(9)];while(new Set(d).size!==3)d=[1+pick(9),1+pick(9),1+pick(9)];
      const num=d[2]*100+d[1]*10+d[0], val=d[i]*10**i;
      const q=[
        ['¿Qué cifra está en las '+names[i]+' de '+num+'?',d[i],d],
        ['En '+num+', ¿cuánto vale el '+d[i]+'?',val,[d[i],d[i]*10,d[i]*100]],
        ['¿Qué número tiene '+d[2]+' C, '+d[1]+' D y '+d[0]+' U?',num,[num,d[0]*100+d[1]*10+d[2],d[1]*100+d[2]*10+d[0]]],
        ['¿Qué número es '+(i===0?'mayor':'menor')+'?',0,[num,num+10**i,num-10**i]]
      ][type];
      if(type===3)q[1]=i===0?Math.max(...q[2]):Math.min(...q[2]);
      return {texto:q[0],correcta:q[1],opciones:shuffle(q[2].slice())};
    })));
  }
  const nota=aciertos=>Math.round(aciertos/TOTAL*10000)/100;
  return {TOTAL,duraciones,banco,nota};
})();
if(typeof module==='object')module.exports=BalamExamen;
