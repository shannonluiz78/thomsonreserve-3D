(function(){'use strict';
const $=id=>document.getElementById(id),C=TRBuyer,L=TRUnitLibrary,images=TRFurnishedImages;
const pricing=()=>({catalog:L.pricing,psf:$('v7psf').value||null,floorPremium:$('v7premium').value||0,baseFloor:2});
function priceDisplay(){if(!selectedUnit)return;const p=C.priceScenario(selectedUnit,pricing());$('v9priceRange').textContent=p.amount===null?'Price unavailable':'Approx. '+C.sgd(p.amount);$('v9priceDetail').textContent=p.detail+' Purchase price only; taxes and fees excluded. Estimate, not a unit quotation.';$('v9entryPrice').textContent=`Separate, conflicting pricing-page scenario: ${C.sgd(selectedUnit.sqft*2700)}–${C.sgd(selectedUnit.sqft*3300)} (${selectedUnit.sqft} sqft × S$2,700–3,300). This is a sensitivity range, not this unit’s price band or proof of availability.`;$('v7planningPrice').textContent=p.amount===null?'Price unavailable':'Approx. '+C.sgd(p.amount)+(p.basis==='manual'?' · manual scenario':p.basis==='rtd_psf'?' · reference PSF model':' · earlier category model');}
function refresh(){const u=selectedUnit;if(!u)return;const imageKey=images[u.type]?u.type:u.base,p=images[imageKey],available=!!p&&(!u.patio||imageKey===u.type);
 $('v10planTitle').textContent='Type '+u.type;$('v10planFacts').textContent=`Block ${u.block} · ${u.id} · ${u.area} sqm / ${u.sqft} sqft (published area)`;
 $('v10variant').textContent=u.mirrored?'Mirrored unit: furnishing is reflected to match the schedule. The original drawing stays readable.':'Standard orientation. Proposed furnishing is illustrative; dimensions are unverified.';
 $('v10sourceImage').src=TRLibrary.image(u);$('v10sourceImage').alt='Original '+u.base+' type sheet';$('v10renderFigure').hidden=!available;
 $('v10renderUnavailable').hidden=available;$('v10renderUnavailable').textContent=u.patio?'This patio/PES variant has no matching furnished illustration yet. Refer to the original inset; the standard illustration is withheld.':'A ChatGPT furnishing illustration is not yet available for this type. The correct original drawing remains available.';
 $('v10renderZoom').disabled=!available;document.querySelector('[data-plan-view="render"]').disabled=!available;
 if(!available&&$('v10planPair').dataset.mode==='render')setMode('compare');
 if(available){$('v10renderImage').src=window.V9_FURNISHED_ASSETS?.[imageKey]||p.file;$('v10renderImage').classList.toggle('mirrored',!!u.mirrored);$('v10renderImage').alt='Proposed furnishing '+u.type+ (u.mirrored?' · mirrored':'');$('v10renderTitle').textContent='02 / Furnished '+u.type+' concept';$('v10renderNote').textContent=p.kind==='early_3d_study'?'Early 3D study · Detailed furnishing image pending':'Private AI furnishing concept · Geometry and dimensions need verification';$('v10renderLimits').textContent=p.corrected+' '+p.pending;}
 else $('v10renderLimits').textContent='Use the original source sheet for the selected type and variant. No substitute image is assigned.';
 $('v10planWhatsapp').href=C.whatsappURL([u]);priceDisplay();
}
function setMode(mode){$('v10planPair').dataset.mode=mode;document.querySelectorAll('[data-plan-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.planView===mode)));}
document.querySelectorAll('[data-plan-view]').forEach(b=>b.onclick=()=>setMode(b.dataset.planView));
for(const part of ['source','render'])$('v10'+part+'Zoom').onclick=()=>{const img=$('v10'+part+'Image');$('v10dialogImage').src=img.src;$('v10dialogImage').alt=img.alt;$('v10dialogImage').classList.toggle('mirrored',part==='render'&&selectedUnit.mirrored);$('v10dialogNote').textContent=part==='source'?'Original drawing · '+selectedUnit.type:'Proposed furnishing · '+selectedUnit.type+' · Dimensions unverified';$('v10planDialog').showModal();};
$('v10planDialog').addEventListener('click',e=>{if(e.target===$('v10planDialog'))$('v10planDialog').close();});
$('v10saveUnit').onclick=()=>addShortlist();
$('v6startRooms').onclick=()=>{renderSelectors(1,4,10);showTab('furnish');$('v10comparison').scrollIntoView({block:'start'});};
$('v9viewHome').onclick=()=>{showTab('furnish');$('v10comparison').scrollIntoView({block:'start'});};
const old=updateUnit;updateUnit=function(){const r=old.apply(this,arguments);refresh();return r;};
const oldTab=showTab;showTab=function(name){return oldTab(name==='panorama'?'plans':name);};
$('v10inventoryRows').innerHTML=Object.values(L.pricing.categories).map(c=>`<tr><th scope="row">${c.label}</th><td>${c.sizesSqft.join(' / ')}</td><td>${c.count.toLocaleString()}</td><td>~${C.sgd(c.entryPrice)}</td></tr>`).join('');
document.querySelector('.v9price h4').textContent='Selected estimate · reference checked 13 Oct 2026';
document.querySelector('.v9price details summary').textContent='Other public price assumptions';
document.querySelector('.v9price details p:last-child').textContent='The default follows the reference PSF model. The earlier category-plus-floor model and manual assumptions remain selectable. Budget matches are conditional on the chosen estimate; selling prices need confirmation.';
window.TRBuyerView={refreshPrices:priceDisplay,refresh,pricing};refresh();
})();
