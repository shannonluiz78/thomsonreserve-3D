/* Local quiz and shortlist. No report, contact form or lead transport. */
(function(){
 'use strict';
 const C=window.TRBuyer,by=id=>document.getElementById(id),escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const questions=[
  {key:'purpose',title:'What are you buying for?',note:'We will tailor the starting comparison to your intention.',options:[['own','Own stay'],['investment','Investment']]},
  {key:'budget',title:'What is your planning budget?',note:'Firm purchase-price cap in S$, excluding taxes, fees and renovation. Matches use the active estimate, not official quotes.',options:[['1800000','Up to $1.8 million'],['2200000','Up to $2.2 million'],['2800000','Up to $2.8 million'],['3500000','Up to $3.5 million'],['flexible','Flexible / discuss with Luiz']]},
  {key:'family',title:'How many people is the home for?',note:'Choose household size, then confirm the minimum sleeping rooms you need. A study is not another bedroom.',options:[['1-2','1–2 people'],['3-4','3–4 people'],['5+','5 or more'],['rental','Future tenants / unsure']]},
  {key:'sun',title:'What sunlight would you prefer?',note:'We record this for follow-up. Stack orientation and shading are unverified.',options:[['morning','Morning light'],['avoid-afternoon','Less afternoon sun'],['bright','Bright throughout the day'],['flexible','No strong preference']]},
  {key:'floor',title:'Which floor range appeals to you?',note:'These bands apply to the provisional model. A higher floor does not guarantee a better view.',options:[['low','Lower • levels 1–8'],['mid','Middle • levels 9–17'],['high','Higher • level 18 and above'],['flexible','Open to all floors']]},
  {key:'mrt',title:'How important is the MRT walk?',note:'Walking routes from individual stacks are not verified.',options:[['essential','A top priority'],['helpful','Helpful, with other trade-offs'],['flexible','Not a deciding factor']]}
 ];
 const profile={},events=[];let step=0,result=null,lastShortlistState='[]',allUnits=[];
 for(const b of BLOCKS)for(let s=b.start;s<b.start+b.types.length;s++)for(let l=1;l<=b.max;l++){const u=getUnit(b,s,l);if(u)allUnits.push(u);}
 const pricing=()=>({catalog:window.TRUnitLibrary.pricing,psf:by('v7psf').value||null,floorPremium:by('v7premium').value||0,baseFloor:2});
 const criteriaSelection=()=>C.reportSelection(allUnits,profile,pricing());
 const track=(event,detail={})=>{const allowed=['quiz_started','quiz_completed','recommendation_opened','shortlist_changed','whatsapp_opened','concierge_question'];if(allowed.includes(event)){events.push({event,at:new Date().toISOString(),...detail});if(events.length>200)events.shift()}};
 function saveShortlist(){try{localStorage.setItem('tr-v7-shortlist',JSON.stringify(shortlist.map(u=>u.key)))}catch{}}
 function loadShortlist(){try{const keys=JSON.parse(localStorage.getItem('tr-v7-shortlist')||'[]');if(Array.isArray(keys))shortlist=[...new Set(keys)].slice(0,5).map(k=>allUnits.find(u=>u.key===k)).filter(Boolean);}catch{}}
 function updateLinks(){
  document.querySelectorAll('[data-wa]').forEach(a=>a.href=C.whatsappURL(a.dataset.wa==='general'?[]:a.dataset.wa==='matches'?criteriaSelection().matchedUnits:shortlist.length?shortlist:selectedUnit?[selectedUnit]:[],profile));
  by('v7unitWhatsapp').href=C.whatsappURL(selectedUnit?[selectedUnit]:[],profile);
 }
 function refresh(){
  updateLinks();by('v7dockCount').textContent=shortlist.length?`(${shortlist.length})`:'';
  const estimate=C.priceScenario(selectedUnit,pricing()).amount;by('v7planningPrice').textContent=estimate==null?'Price unavailable':'Approx. '+C.sgd(estimate)+' · scenario estimate';window.TRBuyerView?.refreshPrices();

 }
 function renderQuestion(focus=false){
  const q=questions[step];by('v7quizForm').hidden=false;by('v7quizResults').hidden=true;
  by('v7quizProgress').innerHTML=`<strong>Question ${step+1} of 6</strong><progress value="${step+1}" max="6" aria-label="Quiz progress"></progress>`;
  by('v7question').innerHTML=`<fieldset><legend tabindex="-1">${q.title}</legend><p class="v7questionNote">${q.note}</p><div class="v7options">${q.options.map(([value,text])=>`<label class="v7choice"><input type="radio" name="v7answer" value="${value}" ${profile[q.key]===value?'checked':''}><span>${text}</span></label>`).join('')}</div></fieldset>`;
  if(step===2){
   const chosen=C.requiredBedrooms(profile);by('v7question').insertAdjacentHTML('beforeend',`<label class="v10roomRequirement" for="v10minBedrooms">Minimum bedrooms to consider<select id="v10minBedrooms">${[2,3,4,5].map(n=>`<option value="${n}" ${n===chosen?'selected':''}>${n} bedrooms</option>`).join('')}</select><small>We suggest a starting number from household size. Please adjust it; people count alone cannot establish room needs.</small></label>`);
   by('v7question').querySelectorAll('input').forEach(r=>r.addEventListener('change',()=>{if(!profile.minBedrooms)by('v10minBedrooms').value=r.value==='5+'?'4':r.value==='3-4'?'3':'2';}));
  }
  by('v7quizBack').disabled=step===0;by('v7quizNext').textContent=step===5?'See my starting matches':'Continue';by('v7quizError').textContent='';if(focus)by('v7question').querySelector('legend').focus();
 }
 function renderMatches(){
  result=C.recommend(allUnits,profile,pricing());by('v7quizForm').hidden=true;by('v7quizResults').hidden=false;by('v7quizProgress').innerHTML='<strong>Your budget and layout check</strong><progress value="6" max="6" aria-label="Quiz complete"></progress>';
  const cards=(rows,list)=>rows.map((r,i)=>`<article class="v7match"><div><h3>${escape(C.label(r.unit))}</h3><p>${r.bedroomCount} bedrooms · ${r.unit.sqft} sqft</p><p><b>${r.estimate===null?'Price unavailable':'Approx. '+escape(C.sgd(r.estimate))}</b> · ${r.price.basis==='manual'?'manual':r.price.basis==='rtd_psf'?'reference PSF':'earlier category'} scenario</p><ul class="v10reasons">${r.reasons.map(t=>`<li>${escape(t)}</li>`).join('')}</ul>${r.tradeoffs.length?`<p><b>Trade-off:</b> ${escape(r.tradeoffs.join(' '))}</p>`:''}</div><div class="v7actions"><button class="v7button" data-match="${i}" data-match-list="${list}">Explore</button><button class="v7button v7primary" data-save-match="${i}" data-match-list="${list}">Shortlist</button></div></article>`).join('');
  const gap=result.budgetGap>0?`The lowest priced ${result.minimumBedrooms}-bedroom-or-larger home in your floor band in this scenario is ${C.sgd(result.minimumSuitableEstimate)}: ${C.sgd(result.budgetGap)} above your cap.`:'No priced home satisfies the current requirements. Edit your answers or ask Luiz to verify a price.';
  by('v7quizResults').innerHTML='<h3 tabindex="-1">'+(result.matches.length?'Conditional matches within your criteria':'No match within your budget, bedrooms and floor band')+'</h3><p class="v7micro">These are scenario matches, not confirmed available units or affordability approvals.</p>'+(result.matches.length?cards(result.matches,'matches'):`<div class="v10empty">${escape(gap)} We have not increased your budget or reduced your bedroom requirement.</div>`)+(result.alternatives.length?`<details class="v10compromises"><summary>Show within-budget options with fewer bedrooms</summary><p>These do not meet your sleeping-room requirement. Consider them only if you are comfortable changing that requirement; a study is not another bedroom.</p>${cards(result.alternatives,'alternatives')}</details>`:'')+`<details class="v10matchMethod"><summary>How your six answers are used</summary><p>Budget, minimum bedrooms and floor band filter first. Proximity to the middle of your chosen floor band then orders the eligible homes; price and stable unit order break ties. Purpose tailors viewing questions, not promised returns. Sun and MRT preferences are recorded but cannot rank stacks until verified. Up to three distinct stacks are shown; we never add unsuitable units to fill the list.</p><p>Default reference price = (S$2,850 + S$15 × (floor − 1)) × printed sqft, rounded to the nearest S$1,000. No block reset or facing premium. The earlier category + S$5,000/floor model is an optional separate scenario. Manual PSF inputs override the chosen model. The active basis is shown in every match; no estimate is an official quote.</p></details><div class="v7resultsFoot"><p class="v7source">${result.budgetChecked?'Your purchase-price cap is enforced using the active scenario.':'No budget cap was provided.'} Prices and availability still require a dated quote. Sun, privacy and MRT routes are unverified.</p><div class="v7actions"><a id="v7matchesWhatsapp" class="v7button v7wa" data-wa="matches" data-placement="quiz-matches" target="_blank" rel="noopener noreferrer">Discuss my criteria on WhatsApp</a><button class="v7textButton" id="v7restartQuiz">Edit answers</button></div><p id="v7matchStatus" class="v7micro" role="status"></p></div>`;
  by('v7quizResults').querySelector('h3').focus();refresh();
 }
 function jump(id){
  if(id==='v7quiz'){step=0;renderQuestion();track('quiz_started');}
  by(id)?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
 }
 function showAnswer(q){
  const answer=C.answer(q,allUnits),box=by('v7answer');box.replaceChildren();const b=document.createElement('b');b.textContent=q;const p=document.createElement('p');p.textContent=answer.text;const small=document.createElement('small');small.textContent='Basis: '+answer.refs.join('; ');box.append(b,p,small);track('concierge_question');
 }
 by('v7quizForm').onsubmit=e=>{e.preventDefault();const chosen=by('v7quizForm').querySelector('input:checked');if(!chosen){by('v7quizError').textContent='Choose one option to continue.';return;}profile[questions[step].key]=chosen.value;if(step===2)profile.minBedrooms=Number(by('v10minBedrooms').value);refresh();if(step<5){step++;renderQuestion(true)}else{renderMatches();track('quiz_completed',{purpose:profile.purpose,floor:profile.floor});}};
 by('v7quizBack').onclick=()=>{step=Math.max(0,step-1);renderQuestion(true)};
 document.addEventListener('click',e=>{
  const jumpButton=e.target.closest('[data-jump]');if(jumpButton){jump(jumpButton.dataset.jump);return;}
  if(e.target.closest('#v7restartQuiz')){step=0;renderQuestion(true);return;}
  const match=e.target.closest('[data-match],[data-save-match]');if(match){const r=result[match.dataset.matchList||'matches'][Number(match.dataset.match??match.dataset.saveMatch)];renderSelectors(r.unit.block,r.unit.stack,r.unit.level);if(match.dataset.saveMatch!==undefined){addShortlist();by('v7matchStatus').textContent=by('shortStatus').textContent;}else{by('v7explore').scrollIntoView({block:'start'});showTab('plans');track('recommendation_opened',{stack:r.unit.stack});}return;}
  const question=e.target.closest('[data-question]');if(question){by('v7ask').value=question.dataset.question;showAnswer(question.dataset.question);return;}
  const wa=e.target.closest('a[href^="https://wa.me/"]');if(wa)track('whatsapp_opened',{placement:wa.dataset.placement||wa.id||'other'});
 });
 by('v7askForm').onsubmit=e=>{e.preventDefault();const q=by('v7ask').value.trim();if(q)showAnswer(q)};
 by('v7privacyOpen').onclick=()=>by('v7privacy').showModal();
 by('v7showComparison').onclick=()=>{showTab('compare');by('tab-compare').scrollIntoView({block:'start'});};
 for(const id of ['v7psf','v7premium'])by(id).addEventListener('input',()=>{const valid=by('v7psf').checkValidity()&&by('v7premium').checkValidity();by('v7priceError').textContent=valid?'':'Enter a positive PSF and a non-negative floor premium.';refresh();renderPlan();window.TRBuyerView?.refreshPrices();if(result)renderMatches()});
 const originalUpdate=updateUnit;updateUnit=function(){originalUpdate();refresh()};
 const originalCompare=renderCompare;renderCompare=function(){originalCompare();saveShortlist();refresh();const state=JSON.stringify(shortlist.map(u=>u.key));if(state!==lastShortlistState){track('shortlist_changed',{unitCount:shortlist.length});lastShortlistState=state;}};
 const originalDescription=describeCell;describeCell=function(cell){const text=originalDescription(cell);if(!cell)return text;const b=BLOCKS.find(x=>x.id===cell.block),u=getUnit(b,cell.stack,cell.level),price=u&&C.priceScenario(u,pricing()).amount;return text+(price!=null?' · Approx. '+C.sgd(price)+' scenario estimate':' · Price unverified')};
 loadShortlist();lastShortlistState=JSON.stringify(shortlist.map(u=>u.key));renderCompare();renderQuestion();refresh();
})();
