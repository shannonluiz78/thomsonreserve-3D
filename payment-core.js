/* Shared price and payment arithmetic; no network calls or customer data. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.TRFinance=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 const rates={sc1:0,sc2:20,sc3:30,pr1:5,pr2:30,pr3:35,foreigner:60};
 const stages=[['Booking / option',5],['Sale & purchase agreement',15],['Foundation',10],['Reinforced concrete framework',10],['Partition walls',5],['Roofing / ceiling',5],['Doors, windows, wiring & plumbing',5],['Car park, roads & drains',5],['Temporary Occupation Permit',25],['Completion / final instalments',15]];
 function rtdPrice(u){const s=Number(u.sqft),l=Number(u.level);return Number.isFinite(s)&&s>0&&Number.isInteger(l)&&l>=1?Math.round(s*(2850+15*(l-1))/1000)*1000:null;}
 function bsd(price){let left=price,tax=0;for(const [width,rate] of [[180000,.01],[180000,.02],[640000,.03],[500000,.04],[1500000,.05],[Infinity,.06]]){const n=Math.min(left,width);tax+=n*rate;left-=n;if(left<=0)break;}return Math.floor(tax+1e-7);}
 function monthly(loan,rate,months){if(!loan)return 0;const r=rate/1200;return r?loan*r/(1-Math.pow(1+r,-months)):loan/months;}
 function calculate(price,o={}){
  const ltv=Number(o.ltv),rate=Number(o.rate),term=Number(o.years);
  if(!Number.isFinite(price)||price<=0||!Number.isFinite(ltv)||ltv<0||ltv>75||!Number.isFinite(rate)||rate<0||rate>20||!Number.isInteger(term)||term<1||term>35||!(o.buyer in rates))return null;
  const loan=price*ltv/100,down=price-loan,tax=bsd(price),absd=Math.floor(price*rates[o.buyer]/100+1e-7),months=term*12,payment=monthly(loan,rate,months);
  let equityLeft=down,bankDrawn=0;const schedule=stages.map(([label,percent])=>{const amount=price*percent/100,equity=Math.min(equityLeft,amount);equityLeft-=equity;const bank=amount-equity;bankDrawn+=bank;return {label,percent,amount,equity,bank,drawn:bankDrawn,monthly:monthly(bankDrawn,rate,months)};});
  let balance=loan,interest=0;const years=[{year:0,balance,interest,principal:0}];for(let i=1;i<=months;i++){const due=balance*rate/1200;interest+=due;balance=Math.max(0,balance-(payment-due));if(i%12===0)years.push({year:i/12,balance:i===months?0:balance,interest,principal:loan-balance});}
  return {price,loan,down,bsd:tax,absd,absdRate:rates[o.buyer],upfront:down+tax+absd,monthly:payment,totalInterest:payment*months-loan,schedule,years,ltv,rate,term};
 }
 return {rtdPrice,bsd,monthly,calculate,rates};
});
