(function(root,factory){const api=factory();if(typeof module==='object')module.exports=api;else root.TRShadow=api;})(typeof window==='object'?window:globalThis,function(){
'use strict';
function offset(height,altitude,bearing){if(!Number.isFinite(height)||height<=0||!Number.isFinite(altitude)||altitude<=0)return null;const length=height/Math.tan(altitude),a=bearing*Math.PI/180,tidy=n=>Math.abs(n)<1e-10?0:Math.round(n*1e10)/1e10;return{x:tidy(-Math.sin(a)*length),z:tidy(Math.cos(a)*length)};}
// Opaque union of source, translated roof and EACH boundary sweep. Filling all
// oppositely wound quads as one path creates cancellation holes in concave traces.
function sweep(p,d){if(!d||p.length<3)return[];const shifted=p.map(v=>[v[0]+d.x,v[1]+d.z]);return[p,shifted,...p.map((a,i)=>[a,p[(i+1)%p.length],shifted[(i+1)%p.length],shifted[i]])];}
function inside(p,poly){let yes=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];if((a[1]>p[1])!==(b[1]>p[1])&&p[0]<(b[0]-a[0])*(p[1]-a[1])/(b[1]-a[1])+a[0])yes=!yes;}return yes;}
return{offset,sweep,inside};
});
