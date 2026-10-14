/* Pure, offline buyer-funnel rules. Property data supplied by V6 remains provisional. */
(function(root,factory){const api=factory(typeof module==='object'&&module.exports?require('./payment-core.js'):root.TRFinance);if(typeof module==='object'&&module.exports)module.exports=api;else root.TRBuyer=api;})(typeof globalThis!=='undefined'?globalThis:this,function(F){
 'use strict';
 const AGENT={name:'Luiz Lee',phone:'6589809229',displayPhone:'+65 8980 9229',email:'luizleesg@gmail.com',cea:'R057632A',agency:'Huttons Asia Pte Ltd',licence:'L3008899K',title:'Associate Senior Marketing Director'};
 const CONSENT_VERSION='v7-private-2026-10-10';
 const REQUEST_TEXT='I agree that Luiz Lee may use my contact details, preferences and shortlist to prepare this report and respond to this enquiry.';
 const MARKETING_TEXT='I would also like Luiz Lee to send me Thomson Reserve updates and follow-ups on WhatsApp. I can withdraw this optional consent at any time.';
 const number=v=>v!==''&&v!==null&&v!==undefined&&Number.isFinite(Number(v))?Number(v):null;
 const sgd=n=>n==null?'Not available':'S$'+Math.round(n).toLocaleString('en-SG');
 const label=u=>`Block ${u.block} #${String(u.level).padStart(2,'0')}-${String(u.stack).padStart(2,'0')} (${u.type})`;
 function estimate(u,c={}){
  const psf=number(c.psf),area=number(u.area),premium=number(c.floorPremium??0),base=number(c.baseFloor??2);
  if(psf==null||psf<=0||area==null||area<=0||premium==null||premium<0||base==null||base<1)return null;
  const total=(number(u.sqft)>0?Number(u.sqft):area*10.7639104167)*psf+Math.max(0,u.level-base)*premium;
  return Number.isFinite(total)?Math.round(total):null;
 }
 const category=u=>String(u.base||u.type||'').match(/^[A-Z]+/)?.[0]||'';
 const bedrooms=u=>({B:2,BP:2,BPS:2,C:3,CP:3,CPS:3,D:4,DP:4,DPS:4,E:5}[category(u)]||parseInt(u.beds,10)||null);
 const requiredBedrooms=p=>number(p.minBedrooms)>=2&&number(p.minBedrooms)<=5?Number(p.minBedrooms):p.family==='5+'?4:p.family==='3-4'?3:2;
 const floorFits=(u,p)=>p.floor==='high'?u.level>=18:p.floor==='low'?u.level<=8:p.floor==='mid'?u.level>=9&&u.level<=17:true;
 function priceScenario(u,c={}){
  const manual=c.psf!==''&&c.psf!==null&&c.psf!==undefined;
  if(manual)return {amount:estimate(u,c),basis:'manual',official:false,source:'Buyer-entered PSF and floor premium',asOf:null,detail:'Manual planning assumption; not a developer quote.'};
  if(c.catalog?.activeModel==='rtd'){
   const amount=F.rtdPrice(u),modelPsf=2850+15*(Number(u.level)-1);
   return {amount,basis:'rtd_psf',official:false,source:'Reference illustrative PSF model',sourceURL:'',asOf:'2026-10-13',baseFloor:1,basePsf:2850,psfIncrement:15,modelPsf,sqft:u.sqft,rounding:'nearest S$1,000',detail:'Reference model: (S$2,850 + S$15 × ('+u.level+' − 1)) × '+u.sqft+' sqft = '+sgd(modelPsf*u.sqft)+', rounded to nearest S$1,000: '+sgd(amount)+'. Estate-wide level-1 baseline; no block reset or facing premium. RTD illustration, not a developer quotation.'};
  }
  const row=c.catalog?.categories?.[category(u)],sqft=number(u.sqft);
  if(!row||!(number(row.entryPrice)>0)||!(number(row.referenceSqft)>0)||!(sqft>0))return {amount:null,basis:'unknown',official:false,detail:'No usable price evidence.'};
  const baseFloor=number(c.catalog.baseFloorByPlan?.[u.base||u.type]),premium=number(c.catalog.floorPremium),level=number(u.level);
  if(baseFloor===null||premium===null||premium<0||level===null||level<baseFloor)return {amount:null,basis:'unknown',official:false,detail:'Floor-price basis is missing or invalid.'};
  const baseAmount=Math.round(row.entryPrice*sqft/row.referenceSqft),floorUplift=(level-baseFloor)*premium;
  return {amount:baseAmount+floorUplift,basis:'category_entry_plus_floor',official:false,source:c.catalog.source||'User-supplied category entry estimates',asOf:c.catalog.asOf,categoryEntry:row.entryPrice,referenceSqft:row.referenceSqft,sqft,baseFloor,baseAmount,floorPremium:premium,floorUplift,floorRuleSource:c.catalog.floorRuleSource,detail:`Category entry ${sgd(row.entryPrice)} × ${sqft}/${row.referenceSqft} sqft = ${sgd(baseAmount)} at estate-wide starting level ${baseFloor} for ${u.base||u.type}. Add ${level-baseFloor} floors × ${sgd(premium)} = ${sgd(floorUplift)}. Includes patio/PES when finding the starting floor; no block reset. No facing adjustment.`};
 }
 function assessUnit(u,p={},pricing={}){
  const price=priceScenario(u,pricing),budget=number(p.budget),bedroomCount=bedrooms(u),minBedrooms=requiredBedrooms(p),hasBudget=budget>0;
  const budgetHeadroom=hasBudget&&price.amount!==null?budget-price.amount:null,roomFits=bedroomCount!==null&&bedroomCount>=minBedrooms,floorMatch=floorFits(u,p);
  const budgetStatus=!hasBudget?'not_set':price.amount===null?'unknown':budgetHeadroom>=0?'within_scenario':'over_budget';
  const reasons=[`${bedroomCount??'Unknown'} bedrooms; ${minBedrooms} requested. A study is not an extra bedroom.`,floorMatch?`Level ${u.level} is within your floor preference.`:`Level ${u.level} is outside your preferred floor band.`,price.amount===null?'Price unknown; cannot confirm a budget match.':`${sgd(price.amount)} estimated under ${price.basis==='manual'?'your manual assumptions':price.basis==='rtd_psf'?'the reference PSF model':'the earlier category-entry scenario'}.`,...(hasBudget&&budgetHeadroom!==null?[budgetHeadroom>=0?`${sgd(budgetHeadroom)} below your purchase-price cap in this scenario.`:`${sgd(-budgetHeadroom)} above your purchase-price cap; not a budget match.`]:[])];
  const tradeoffs=[...(!roomFits?[`Only ${bedroomCount??'unknown'} bedrooms, below your ${minBedrooms}-bedroom requirement.`]:[]),...(!floorMatch?['Outside your preferred floor band.']:[]),...(budgetStatus==='over_budget'?['Above your stated budget.']:[])];
  return {unit:u,price,estimate:price.amount,bedroomCount,minBedrooms,roomFits,floorMatch,budgetStatus,budgetHeadroom,reasons,tradeoffs,score:Math.abs((bedroomCount||0)-minBedrooms)*1000+(floorMatch?0:100)+(p.floor&&p.floor!=='flexible'?Math.abs(u.level-(p.floor==='high'?20:p.floor==='low'?6:12)):0)};
 }
 function recommend(units,p={},pricing={}){
  const budget=number(p.budget),budgetChecked=budget>0,invalidBudget=p.budget!==undefined&&p.budget!=='flexible'&&!budgetChecked;
  const all=units.map(u=>assessUnit(u,p,pricing));
  const eligible=all.filter(x=>x.bedroomCount&&x.unit.availability!=='sold'&&!invalidBudget&&(!budgetChecked||x.budgetStatus==='within_scenario'));
  const order=(a,b)=>a.score-b.score||(a.estimate??Infinity)-(b.estimate??Infinity)||a.unit.block-b.unit.block||a.unit.stack-b.unit.stack||a.unit.level-b.unit.level;
  function distinct(rows){const keys=new Set(),picked=[];for(const x of rows.sort(order)){const key=x.unit.block+'-'+x.unit.stack;if(!keys.has(key)){keys.add(key);picked.push(x)}if(picked.length===3)break;}return picked;}
  const suitable=all.filter(x=>x.roomFits&&x.floorMatch&&x.estimate!==null&&x.unit.availability!=='sold');
  const minimumSuitableEstimate=suitable.length?Math.min(...suitable.map(x=>x.estimate)):null;
  return {matches:distinct(eligible.filter(x=>x.roomFits&&x.floorMatch)),alternatives:distinct(eligible.filter(x=>!x.roomFits&&x.floorMatch)),budgetChecked,budget,minimumBedrooms:requiredBedrooms(p),minimumSuitableEstimate,budgetGap:budgetChecked&&minimumSuitableEstimate!==null?Math.max(0,minimumSuitableEstimate-budget):null,unknownPriceCount:all.filter(x=>x.price.amount===null).length,limitations:[
   'All price matches are conditional estimates, not confirmed affordable or available units. Purchase-price cap excludes taxes, fees, financing and renovation.',
   'The active price basis is an illustrative scenario. Alternative public estimates differ; ask Luiz for a dated unit-specific developer quote.',
   'Unit codes and approximate areas follow published drawing schedules; current developer revision and availability need confirmation.',
   'Sun orientation and shading are unverified; your sun preference is recorded for follow-up only.',
   'MRT walking routes by stack and privacy are unverified; these are not ranking factors.',
   'Minimum bedrooms is a space requirement, not a furniture-fit test or an investment-return prediction. The requested floor band filters matches; floor proximity and estimated outlay then order them; ties use stable unit order.'
  ]};
 }
 function reportSelection(units,p={},pricing={}){
  const complete=['purpose','budget','family','sun','floor','mrt'].every(k=>p[k])&&number(p.minBedrooms)>=2&&number(p.minBedrooms)<=5;
  if(!complete)return {status:'incomplete',matchedUnits:[],recommendations:null};
  const recommendations=recommend(units,p,pricing);
  return {status:recommendations.matches.length?'ready':'no_matches',matchedUnits:recommendations.matches.map(a=>({...a.unit,planningPrice:a.estimate,assessment:a})),recommendations};
 }
 function validateContact(v){
  const errors={},raw=String(v.phone||'').trim();let phone=raw.replace(/[\s()-]/g,'');
  if(/^[89]\d{7}$/.test(phone))phone='+65'+phone;
  if(!/^[+][1-9]\d{7,14}$/.test(phone)||(/^\+65/.test(phone)&&!/^\+65[89]\d{7}$/.test(phone)))errors.phone='Enter a mobile number with country code, such as +65 followed by 8 digits.';
  const email=String(v.email||'').trim();if(email.length>254||! /^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/.test(email))errors.email='Enter a valid email address.';
  if(v.requestConsent!==true)errors.consent='Please agree to the use of your details for this report and enquiry.';
  return {errors,contact:{phone,email,requestConsent:v.requestConsent===true,marketingConsent:v.marketingConsent===true}};
 }
 function whatsappURL(units=[],p={}){
  const chosen=units.slice(0,5).map(label).join('; ');
  let text='Hi Luiz, I am exploring Thomson Reserve.';
  if(chosen)text+=' My provisional shortlist is '+chosen+'. Please help me verify the plans, prices and availability.';
  if(p.purpose)text+=' I am considering '+(p.purpose==='investment'?'investment':'own stay')+'.';
  if(p.budget&&p.budget!=='flexible')text+=' My planning budget is up to '+sgd(Number(p.budget))+'.';
  return 'https://wa.me/'+AGENT.phone+'?text='+encodeURIComponent(text);
 }
 function answer(question,units){
  const q=String(question).slice(0,500).toLowerCase(),refs=['Published drawing schedules and website floor-plan library, retrieved 11 October 2026','V9 source and accuracy notes'];
  const compare=q.match(/(?:stack\s*)?(\d{1,2})\s*(?:vs\.?|versus|and|with)\s*(?:stack\s*)?(\d{1,2})/);
  if(compare){const found=compare.slice(1).map(s=>units.find(u=>u.stack===Number(s)&&!u.patio));
   if(found.some(x=>!x))return {text:'One of these stacks is not available in the provisional model. Please enter two stack numbers between 1 and 55.',refs};
   return {text:found.map(u=>`Stack ${u.stack}: Block ${u.block}, type ${u.type}, ${u.beds}, Published approximate area ${u.area??'unknown'} sqm.`).join('\n')+'\nThe type/area join follows the published drawing schedule; current developer revision is unconfirmed. Facing, privacy, balcony views, prices and availability cannot be compared reliably yet. Add units to your shortlist and ask Luiz to verify the differences.',refs};
  }
  if(/sun|morning|afternoon|shade|west|east/.test(q))return {text:'I cannot verify which stacks receive morning sun yet. True north, balcony bearings and surrounding geometry are unverified. The sun tool is a concept demonstration. I can record your preference and prepare the orientation questions for Luiz.',refs};
  if(/privacy|noise|quiet/.test(q))return {text:'Stack-level privacy and noise are unverified. We need window-to-window distances, balcony lines of sight, floor elevations and surrounding uses. A higher floor alone does not establish better privacy. Shortlist two units and ask Luiz to check those conditions.',refs};
  if(/invest|rental|yield|return/.test(q))return {text:'For an investment search, two-bedroom categories are a useful comparison starting point in this prototype. That is a heuristic, not a return recommendation. Compare total outlay, usable layout, carrying costs, rental evidence, vacancy assumptions and resale competition. Prices, rents, yields and availability are not verified. Use the quiz to create a provisional shortlist.',refs};
  if(/view|balcony/.test(q))return {text:'No verified balcony photograph is available for the selected unit. The supplied outlook is an artist’s impression. An actual view needs a licensed capture with camera position, elevation, heading and date; a reconstruction needs permitted terrain/buildings and calibrated unit geometry. Changing the floor cannot make this illustration a real view.',refs};
  if(/price|budget|cost|afford/.test(q))return {text:'Developer prices are not available in this model. The default reference model uses S$2,850 psf at level 1 plus S$15 psf per higher floor, rounded to S$1,000. Your budget is a firm filter under the active model. The earlier category + S$5,000/floor model and a manual override remain selectable. Payment estimates include standard stamp duties, but do not establish loan eligibility or affordability. Ask Luiz for a dated price list and seek a lender’s assessment.',refs};
  return {text:'This guided preview can compare two stack codes, explain the current sun/privacy/view limits, and help frame an investment or budget discussion. It is not connected to a live AI model. Try “Compare stack 18 vs stack 23”, or ask Luiz for information that is not available here.',refs};
 }
 return {AGENT,CONSENT_VERSION,REQUEST_TEXT,MARKETING_TEXT,estimate,priceScenario,assessUnit,category,bedrooms,requiredBedrooms,recommend,reportSelection,validateContact,whatsappURL,answer,label,sgd};
});
