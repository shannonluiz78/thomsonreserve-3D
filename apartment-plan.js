/* Normalised 2048px plan coordinates; original embedded drawing is 2664x1499.
   No architectural scale is asserted. Furniture and heights are design assumptions. */
(function(root,factory){const api=factory();if(typeof module==='object')module.exports=api;else root.TRApartmentPlan=api;})(typeof window==='object'?window:globalThis,function(){
return {type:'BPS1',geometryStatus:'image_trace_not_dimensioned',sourceId:'V5-EMBEDDED-BPS1',decorSourceId:'SRC-DECOR-20261010',pixelsPerSceneUnit:64,origin:[925,640],wallHeight:2.65,
 outline:[[649,402],[834,402],[834,287],[1200,287],[1200,780],[937,780],[937,1030],[816,1030],[816,1008],[796,1008],[796,958],[788,958],[788,905],[694,905],[694,780],[649,780]],
 rooms:[{id:'balcony',name:'Balcony',bounds:[837,290,169,107],material:'deck'},{id:'study',name:'Study',bounds:[1020,290,177,113],material:'oak'},{id:'bedroom2',name:'Bedroom 2',bounds:[654,409,158,207],material:'oak'},{id:'living',name:'Living',bounds:[831,411,170,211],material:'stone'},{id:'master',name:'Master bedroom',bounds:[1020,411,176,230],material:'oak'},{id:'bath2',name:'Bath 2',bounds:[655,637,158,91],material:'bath'},{id:'masterbath',name:'Master bath',bounds:[1020,657,175,113],material:'bath'},{id:'kitchen',name:'Kitchen',bounds:[704,741,117,151],material:'stone'},{id:'dining',name:'Dining',bounds:[829,642,176,128],material:'stone'}],
 serviceZones:[{id:'acledge',name:'AC ledge · non-habitable',bounds:[650,313,176,82],habitable:false},{id:'rcledge',name:'RC ledge',bounds:[822,239,374,41],habitable:false}],
 // x1,z1,x2,z2. Open door gaps are omitted; windows receive low sills and glazing.
 walls:[[645,304,645,778],[645,778,694,778],[694,778,694,902],[694,902,789,902],[789,902,789,957],[789,957,797,957],[797,957,797,1007],[797,1007,817,1007],[936,781,936,1029],[936,781,1205,781],[1205,239,1205,781],[650,399,833,399],[650,621,749,621],[801,621,818,621],[817,405,817,557],[1011,396,1011,578],[1011,642,1011,780],[1088,649,1197,649],[652,732,820,732],[820,688,820,732],[709,638,709,706],[709,706,760,706],[709,399,649,399]],
 windows:[[657,399,800,399],[840,285,1197,285],[833,292,833,385]],
 doors:[[757,620,801,620],[1011,579,1011,640],[1013,652,1087,652],[763,630,814,630],[852,1007,922,1007],[1008,336,1008,393]],
 furniture:[
 {id:'sofa',kind:'sofa',room:'living',x:974,z:487,w:40,d:120,rotation:0},{id:'coffee',kind:'coffee',room:'living',x:909,z:489,w:48,d:66},
 {id:'tv',kind:'tv',room:'living',x:842,z:478,w:12,d:104},{id:'livingrug',kind:'rug',room:'living',x:918,z:486,w:137,d:162},
 {id:'masterbed',kind:'bed',room:'master',x:1110,z:492,w:93,d:131,rotation:-Math.PI/2},{id:'secondbed',kind:'bed',room:'bedroom2',x:725,z:485,w:90,d:127,rotation:Math.PI/2},
 {id:'masterrobe',kind:'wardrobe',room:'master',x:1145,z:622,w:92,d:32},{id:'secondrobe',kind:'wardrobe',room:'bedroom2',x:697,z:594,w:84,d:34},
 {id:'studydesk',kind:'desk',room:'study',x:1168,z:344,w:98,d:32,rotation:Math.PI/2},{id:'studychair',kind:'chair',room:'study',x:1114,z:353,w:28,d:28,rotation:Math.PI/2},
 {id:'diningtable',kind:'dining',room:'dining',x:960,z:711,w:68,d:50},
 {id:'counter',kind:'counter',room:'kitchen',x:763,z:759,w:114,d:38},{id:'fridge',kind:'fridge',room:'kitchen',x:725,z:874,w:37,d:42},{id:'kitchencab',kind:'cabinet',room:'kitchen',x:783,z:873,w:69,d:40},
 {id:'vanity2',kind:'vanity',room:'bath2',x:787,z:708,w:47,d:28},{id:'wc2',kind:'wc',room:'bath2',x:738,z:690,w:25,d:37},{id:'shower2',kind:'shower',room:'bath2',x:681,z:666,w:46,d:57},
 {id:'vanity1',kind:'vanity',room:'masterbath',x:1048,z:750,w:45,d:28},{id:'wc1',kind:'wc',room:'masterbath',x:1105,z:734,w:28,d:38},{id:'shower1',kind:'shower',room:'masterbath',x:1160,z:695,w:63,d:73},
 {id:'balconytable',kind:'roundtable',room:'balcony',x:916,z:342,w:32,d:32},{id:'balconychair1',kind:'chair',room:'balcony',x:873,z:341,w:31,d:32,rotation:-Math.PI/2},{id:'balconychair2',kind:'chair',room:'balcony',x:956,z:341,w:31,d:32,rotation:Math.PI/2},
 {id:'plant1',kind:'plant',room:'balcony',x:853,z:307,w:18,d:18},{id:'plant2',kind:'plant',room:'balcony',x:982,z:307,w:18,d:18},{id:'plant3',kind:'plant',room:'living',x:864,z:579,w:19,d:19}
 ],
 supports:u=>!!u&&u.base==='BPS1'&&!u.patio
};});
