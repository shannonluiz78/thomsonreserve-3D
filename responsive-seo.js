(function(){'use strict';
const layout=document.querySelector('.layout'),workspace=document.querySelector('.workspace');if(layout&&workspace&&workspace.parentElement!==layout)layout.appendChild(workspace);
document.querySelectorAll('input[type=number]').forEach(el=>el.setAttribute('inputmode','decimal'));
document.querySelectorAll('.v96scroll,.v10tableScroll').forEach(el=>{el.tabIndex=0;el.setAttribute('role','region');el.setAttribute('aria-label','Scrollable comparison table');});
const tabs=[...document.querySelectorAll('.tabs .tab')];
function sync(){tabs.forEach(b=>{b.setAttribute('aria-pressed',String(b.classList.contains('active')));b.setAttribute('aria-controls','tab-'+b.dataset.tab);});}
const previous=window.showTab;
if(typeof previous==='function'){window.showTab=function(name){const r=previous.apply(this,arguments);sync();return r;};}
sync();
})();
