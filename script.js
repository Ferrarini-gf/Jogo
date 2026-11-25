const C=document.getElementById('c'),X=C.getContext('2d'),$=i=>document.getElementById(i);
let P=[[0,80],[620,80],[620,200],[160,200],[160,330],[640,330],[640,430],[800,430]];
let L,TOT;function calc(){L=[0];for(let i=1;i<P.length;i++)L.push(L[i-1]+Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]));TOT=L[L.length-1]}calc();
function pos(d){let i=1;while(i<P.length-1&&d>L[i])i++;const t=(d-L[i-1])/(L[i]-L[i-1]);return[P[i-1][0]+(P[i][0]-P[i-1][0])*t,P[i-1][1]+(P[i][1]-P[i-1][1])*t]}
function dseg(x,y,a,b){const dx=b[0]-a[0],dy=b[1]-a[1],t=Math.max(0,Math.min(1,((x-a[0])*dx+(y-a[1])*dy)/(dx*dx+dy*dy)));return Math.hypot(x-a[0]-dx*t,y-a[1]-dy*t)}
let OB=[[300,140,18],[480,260,18],[80,420,26],[400,400,22],[720,150,18],[60,140,16],[250,270,16]];
const T={
b:{n:'Bulbasaur',fc:'#6fdc5a',p:[.2,.3,.4],pn:'Vine Trap (prende)',st:[{n:'Bulbasaur',a:'Vine Whip',d:30,r:15,c:1.5,aoe:30},{n:'Ivysaur',a:'Energy Ball',d:55,r:16,c:1.4,aoe:40},{n:'Venusaur',a:'Solar Beam',d:95,r:17,c:1.3,aoe:55}]},
c:{n:'Charmander',fc:'#ff7a2a',p:[.3,.45,.6],pn:'Burn (queima)',st:[{n:'Charmander',a:'Fire Fang',d:65,r:9,c:2.5,aoe:0},{n:'Charmeleon',a:'Flare Blitz',d:120,r:9.5,c:2.3,aoe:0},{n:'Charizard',a:'Flamethrower',d:200,r:10,c:2.1,aoe:45}]},
s:{n:'Squirtle',fc:'#4aa8ff',p:[.35,.5,.65],pn:'Wet (molhado +15% dano)',st:[{n:'Squirtle',a:'Bubble',d:15,r:23,c:.6,aoe:0},{n:'Wartortle',a:'Aqua Tail',d:28,r:24,c:.55,aoe:0},{n:'Blastoise',a:'Hydro Cannon',d:48,r:26,c:.5,aoe:25}]}};
T.p={n:'Pikachu',fc:'#ffe033',p:[.25,.4],pn:'Paralisar (imobiliza)',st:[{n:'Pikachu',a:'Thunder Shock',d:24,r:17,c:.9,aoe:0},{n:'Raichu',a:'Thunderbolt',d:60,r:18,c:.8,aoe:40}]};T.h={n:'Chespin',fc:'#7ac943',p:[.2,.3,.4],pn:'Espinhos (prende)',st:[{n:'Chespin',a:'Pin Missile',d:40,r:12,c:1.8,aoe:0},{n:'Quilladin',a:'Seed Bomb',d:70,r:13,c:1.7,aoe:25},{n:'Chesnaught',a:'Wood Hammer',d:115,r:14,c:1.6,aoe:40}]};
T.f={n:'Fennekin',fc:'#ff9a3c',p:[.35,.5,.65],pn:'Burn (queima)',st:[{n:'Fennekin',a:'Ember',d:38,r:14,c:1.6,aoe:0},{n:'Braixen',a:'Flame Charge',d:72,r:15,c:1.5,aoe:20},{n:'Delphox',a:'Mystical Fire',d:125,r:16,c:1.4,aoe:40}]};
T.w={n:'Froakie',fc:'#55c0ff',p:[.35,.5,.65],pn:'Wet (molhado)',st:[{n:'Froakie',a:'Water Pulse',d:14,r:21,c:.55,aoe:0},{n:'Frogadier',a:'Water Shuriken',d:26,r:22,c:.5,aoe:0},{n:'Greninja',a:'Hydro Pump',d:46,r:24,c:.45,aoe:22}]};
const TY={b:'g',c:'f',s:'w',p:'e',h:'g',f:'f',w:'w'},TN={g:'Planta',f:'Fogo',w:'Água',e:'Elétrico'};const COST=100,EVO=[0,150,300];
const ED={rat:{n:'Rattata',hp:40,sp:55,rw:7},bird:{n:'Pidgey',hp:30,sp:80,rw:8,fly:1},rock:{n:'Geodude',hp:110,sp:38,rw:12,ar:6},bat:{n:'Zubat',hp:45,sp:95,rw:9,fly:1}};
const BOSS={5:['Golem',9],10:['Pidgeot',4],15:['Golbat',6],20:['Mewtwo',10]};
let coins,lives,wave,towers,E,PR,FX,Q,speed,over,place,sel,mouse={x:-9,y:-9},tm=0,running;
function spr(g,k,s,x,y,z,f){g.save();g.translate(x,y);g.scale((f||1)*z,z);
const o=(c,a,b,rx,ry)=>{g.fillStyle=c;g.beginPath();g.ellipse(a,b,rx,ry,0,0,7);g.fill()};
const eye=()=>{o('#fff',9,-6,2,1.7);o('#c22',9.4,-6,1,1)};
if(k=='b'){o('#3f8f7a',-5,8,3,2.5);o('#3f8f7a',5,8,3,2.5);o('#6cc3a5',0,0,10,8);o('#6cc3a5',7,-5,6,5);o('#3f8f7a',2,-2,2,1.5);eye();
if(s==0)o('#4caf50',-3,-9,5,4);else if(s==1){o('#4caf50',-3,-10,5,4);o('#e85d9a',-3,-14,4,4)}else{for(let i=0;i<5;i++){const a=i*1.26;o('#e85d9a',-3+Math.cos(a)*6,-15+Math.sin(a)*5,3.5,3.5)}o('#ffd54f',-3,-15,3,3);o('#2e7d32',-3,-9,7,3)}}
else if(k=='c'){const col=['#f08030','#d8452b','#e8793a'][s];
if(s==2){g.fillStyle='#4a8fb5';g.beginPath();g.moveTo(-4,-4);g.lineTo(-14,-18);g.lineTo(2,-6);g.fill();g.beginPath();g.moveTo(0,-4);g.lineTo(-4,-19);g.lineTo(6,-5);g.fill()}
o(col,-12,2,4,2.5);o('#ff5722',-15,-4,3.5,5);o('#ffd54f',-15,-3,1.8,3);o(col,-5,8,3,2.5);o(col,5,8,3,2.5);o(col,0,0,10,8);o('#f8d078',2,3,6,5);o(col,7,-5,6,5);eye();
if(s==1){g.fillStyle='#eee';g.beginPath();g.moveTo(5,-9);g.lineTo(8,-17);g.lineTo(10,-9);g.fill()}}
else{o('#3b8fc4',-5,8,3,2.5);o('#3b8fc4',5,8,3,2.5);
if(s==2){g.fillStyle='#999';g.fillRect(-9,-14,4,9);g.fillRect(-2,-14,4,9)}
o('#9a6a3a',-3,0,8,7);o('#7a5028',-3,0,3,3);o('#5bb3e8',0,0,8,7);o('#f3e2a9',2,3,5,4);o('#5bb3e8',7,-5,6,5);eye();
if(s>0){o('#fff',3,-10,2.5,3.5);o('#fff',-13,-3,4,2.5)}else o('#5bb3e8',-12,-2,3,2)}
g.restore()}
function en(g,e,z){const o=(c,a,b,rx,ry)=>{g.fillStyle=c;g.beginPath();g.ellipse(a,b,rx,ry,0,0,7);g.fill()};
g.save();g.translate(e.x,e.y);g.scale(z||1,z||1);const w=Math.sin(tm*14+e.id)*5;
if(e.boss){g.scale(1.9,1.9);o(e.col,0,0,11,10);o('#fff',-4,-3,2.5,3);o('#fff',4,-3,2.5,3);o('#222',-4,-3,1,1.5);o('#222',4,-3,1,1.5);g.fillStyle='#ffd54f';g.beginPath();g.moveTo(-6,-9);g.lineTo(-3,-15);g.lineTo(0,-9);g.lineTo(3,-15);g.lineTo(6,-9);g.fill();o('#0004',0,12,9,2)}
else if(e.t=='rat'){o('#8e6bb8',0,0,9,6);o('#8e6bb8',7,-2,5,4);o('#f0e6c8',9,0,3,2);o('#8e6bb8',4,-7,3,3);o('#c22',9,-3,1,1);o('#d9a',-10,0,5,1)}
else if(e.t=='bird'){o('#b5834f',0,0,8,6);o('#f2dcb0',1,3,5,3);o('#b5834f',7,-4,4,4);o('#e8a317',11,-4,2,1);o('#9b6a3a',-2,-3,7,3+Math.abs(w))}
else if(e.t=='rock'){o('#8d8d8d',0,0,10,9);o('#6d6d6d',-4,-3,3,2);o('#8d8d8d',-11,3,3,5);o('#8d8d8d',11,3,3,5);o('#fff',-3,-2,2,2);o('#fff',3,-2,2,2);o('#222',-3,-2,1,1);o('#222',3,-2,1,1)}
else{o('#5470c0',0,0,6,5);o('#3a4f95',-8,-2,9,3+Math.abs(w));o('#3a4f95',8,-2,9,3+Math.abs(w));o('#c22',-2,-1,1,1);o('#c22',2,-1,1,1)}
g.restore()}
const PTU=["assets/spr_dbe9b085.png", "assets/spr_e49987d3.png", "assets/spr_378ae7a4.png", "assets/spr_5186a6f0.png", "assets/spr_7960cbb3.png", "assets/spr_0ca28213.png", "assets/spr_1fd80207.png", "assets/spr_b02a49fd.png", "assets/spr_0d889556.png"];const PT={};'bcs'.split('').forEach((k,j)=>PT[k]=[0,1,2].map(s=>{const i=new Image();i.src=PTU[j*3+s];return i}));
function badge(g,k,s,x,y,z){const r=(19+3*s)*(z||1);g.save();g.imageSmoothingEnabled=false;g.fillStyle=T[k].fc;g.beginPath();g.arc(x,y,r+3,0,7);g.fill();g.beginPath();g.arc(x,y,r,0,7);g.clip();const im=PT[k][s];if(im.complete)g.drawImage(im,x-r,y-r,r*2,r*2);else{g.fillStyle='#ccc';g.fillRect(x-r,y-r,r*2,r*2)}g.restore();g.strokeStyle='#fff';g.lineWidth=2;g.beginPath();g.arc(x,y,r+3,0,7);g.stroke()}
const ATD=[{"i":"assets/spr_ba0a540c.png","iw":32,"ih":40,"id":[40,6,6],"a":"assets/spr_89dab916.png","aw":32,"ah":32,"ad":[12,4,4,4,2,2]},{"i":"assets/spr_4f2f9a7e.png","iw":32,"ih":32,"id":[40,12,12,12],"a":"assets/spr_7466c2aa.png","aw":32,"ah":40,"ad":[12,4,4,4,2,2]},{"i":"assets/spr_14fc6058.png","iw":32,"ih":32,"id":[30,16,12,16],"a":"assets/spr_ace59a2e.png","aw":40,"ah":40,"ad":[12,4,4,4,2,2]},{"i":"assets/spr_3ce897f7.png","iw":32,"ih":40,"id":[12,8,8,8],"a":"assets/spr_22a48290.png","aw":64,"ah":64,"ad":[2,2,4,2,2,2,2,2,2,2,2]},{"i":"assets/spr_f5d0f18c.png","iw":32,"ih":56,"id":[40,2,3,3,3,2],"a":"assets/spr_113b19f8.png","aw":48,"ah":48,"ad":[2,2,4,1,1,2,2,2,2,2,2,2]},{"i":"assets/spr_0a34c392.png","iw":40,"ih":48,"id":[15,15,15,15],"a":"assets/spr_aa557a81.png","aw":56,"ah":56,"ad":[4,6,2,2,2,2,2,2,2,2,2]},{"i":"assets/spr_3ae60b93.png","iw":32,"ih":32,"id":[30,2,2,4,4,4,2,2],"a":"assets/spr_5a500d60.png","aw":40,"ah":32,"ad":[2,6,2,2,2,2,2,2,2,2,2]},{"i":"assets/spr_af84ecee.png","iw":24,"ih":40,"id":[40,2,2,2],"a":"assets/spr_aedc31bb.png","aw":32,"ah":40,"ad":[2,8,2,2,2,2,2,2,2]},{"i":"assets/spr_e8325c48.png","iw":40,"ih":40,"id":[32,12,4,4,4,4,4,8],"a":"assets/spr_6caaf0f4.png","aw":48,"ah":56,"ad":[4,2,6,2,2,4]}];const AI={b:0,c:3,s:6,p:9,h:11,f:14,w:17};const AT=ATD.map(o=>{const a=new Image(),b=new Image();a.src=o.i;b.src=o.a;o.ia=a;o.ib=b;o.it=o.id.reduce((x,y)=>x+y,0);o.at=o.ad.reduce((x,y)=>x+y,0);return o});
function fr(d,e){let t=e%d.reduce((a,b)=>a+b,0),i=0;while(t>=d[i]){t-=d[i];i++}return i}
function atl(g,k,s,x,y,sc,dir,e,att){const o=AT[AI[k]+s],im=att?o.ib:o.ia,w=att?o.aw:o.iw,h=att?o.ah:o.ih,d=att?o.ad:o.id;if(!im.complete)return;const f=fr(d,e);g.imageSmoothingEnabled=false;g.drawImage(im,f*w,dir*h,w,h,Math.round(x-w*sc/2),Math.round(y-h*sc/2-6),w*sc,h*sc)}
let auto=0;const ATX=[{"i":"assets/spr_5c619636.png","iw":40,"ih":56,"id":[40,2,3,3,3,2],"a":"assets/spr_c1c04350.png","aw":40,"ah":56,"ad":[1,2,6,2,2,2,2,2,2,2,2]},{"i":"assets/spr_496e57ee.png","iw":40,"ih":56,"id":[40,2,4,4,4,2],"a":"assets/spr_0d7604cb.png","aw":40,"ah":56,"ad":[1,2,6,2,2,2,2,2,2,2,2]}],ENL=[{"i":"assets/spr_cdbf95a7.png","w":48,"h":40,"d":[6,4,4,4,4,4,4]},{"i":"assets/spr_773b742a.png","w":40,"h":48,"d":[4,6,4,4,4,4]},{"i":"assets/spr_8b73e1f8.png","w":32,"h":32,"d":[6,4,4,4,4]},{"i":"assets/spr_d0b42ddb.png","w":32,"h":40,"d":[6,10,6,10]},{"i":"assets/spr_3d2554ee.png","w":32,"h":40,"d":[8,12,8,12]},{"i":"assets/spr_bc1c19ee.png","w":32,"h":56,"d":[6,6,6,6,6,6,6,6]},{"i":"assets/spr_f7afd4ea.png","w":40,"h":64,"d":[6,6,6,6,6,6,6,6]},{"i":"assets/spr_bd2f3f47.png","w":32,"h":32,"d":[8,10,8,10]},{"i":"assets/spr_f1880d37.png","w":32,"h":48,"d":[6,10,6,10]},{"i":"assets/spr_2101cbcf.png","w":32,"h":40,"d":[8,12,8,12]}];
ATX.forEach(o=>{const a=new Image(),b=new Image();a.src=o.i;b.src=o.a;o.ia=a;o.ib=b;o.at=o.ad.reduce((x,y)=>x+y,0);AT.push(o)});
PTU.push(...["assets/spr_21a51e36.png","assets/spr_9b2edb50.png"]);PT.p=[9,10].map(i=>{const m=new Image();m.src=PTU[i];return m});
ENL.push({"i":"assets/spr_a7c61fa6.png","w":48,"h":56,"d":[12,6,6,12,6,6]});const EN=ENL.map(o=>{const m=new Image();m.src=o.i;o.im=m;return o});
const EI={rat:[0,1],bird:[2,3,4],bat:[5,6],rock:[7,8,9]};
const sg=t=>t=='rat'?(wave>=10?1:0):t=='bird'?(wave>=12?2:wave>=6?1:0):t=='bat'?(wave>=8?1:0):(wave>=13?2:wave>=7?1:0);
function eatl(g,e){const o=EN[e.ei];if(!o.im.complete)return;const a=pos(Math.min(e.d+4,TOT)),b=pos(Math.max(e.d-4,0)),k=Math.round(Math.atan2(a[1]-b[1],a[0]-b[0])/(Math.PI/4)),dir=(2-k+16)%8,f=fr(o.d,(e.root>0||e.par>0)?0:tm*60+e.id*10),sc=e.boss?2.8:1.7;g.imageSmoothingEnabled=false;g.drawImage(o.im,f*o.w,dir*o.h,o.w,o.h,Math.round(e.x-o.w*sc/2),Math.round(e.y-o.h*sc/2-4),o.w*sc,o.h*sc)}
const ATY=[{"i":"assets/spr_65103e10.png","iw":24,"ih":40,"id":[40,2,4,4,4,2],"a":"assets/spr_3511537f.png","aw":32,"ah":40,"ad":[2,2,6,1,2,2,2,2,2,2,2,2]},{"i":"assets/spr_9042c82e.png","iw":32,"ih":48,"id":[40,2,4,2],"a":"assets/spr_7768651e.png","aw":40,"ah":48,"ad":[2,2,6,1,2,2,2,2,2,2,2,2]},{"i":"assets/spr_455adb60.png","iw":40,"ih":56,"id":[40,20,2,2,2,2,2,20],"a":"assets/spr_00418a76.png","aw":48,"ah":56,"ad":[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]},{"i":"assets/spr_f1d20b5c.png","iw":40,"ih":32,"id":[36,12,12,12],"a":"assets/spr_f9ae1ba1.png","aw":40,"ah":40,"ad":[2,2,2,2,2,2,2,2,2,2]},{"i":"assets/spr_5c5f8186.png","iw":32,"ih":48,"id":[60,10,2,2,2,2,2,2,2,2,2,2,2,10],"a":"assets/spr_ca9920be.png","aw":72,"ah":80,"ad":[2,4,1,1,1,2,2,2,2,2]},{"i":"assets/spr_93a8c210.png","iw":32,"ih":48,"id":[30,16,8,16],"a":"assets/spr_90b1846f.png","aw":32,"ah":48,"ad":[1,6,1,3,4,3,4,3]},{"i":"assets/spr_e5cf3bd9.png","iw":24,"ih":40,"id":[38,2,2,5,3,3,2],"a":"assets/spr_31259b5a.png","aw":32,"ah":40,"ad":[2,3,4,2,6,2,2,2,2,2,2]},{"i":"assets/spr_5d608498.png","iw":40,"ih":40,"id":[5,5,5,5,5,5,5,5,5,5,2,3,4,3,2],"a":"assets/spr_34c318a3.png","aw":48,"ah":48,"ad":[2,2,8,1,2,2,2,2,2,2,2,2]},{"i":"assets/spr_9cd355cc.png","iw":32,"ih":56,"id":[40,12,2,3,6,2,4],"a":"assets/spr_bd816e77.png","aw":40,"ah":56,"ad":[2,2,6,1,2,2,2,2,2,2,2,2]}];ATY.forEach(o=>{const a=new Image(),b=new Image();a.src=o.i;b.src=o.a;o.ia=a;o.ib=b;o.at=o.ad.reduce((x,y)=>x+y,0);AT.push(o)});
PTU.push(...["assets/spr_95a7d66d.png","assets/spr_3135672c.png","assets/spr_12191349.png","assets/spr_2b8a3004.png","assets/spr_9b6ae78b.png","assets/spr_e31680d3.png","assets/spr_da94beab.png","assets/spr_f0d04079.png","assets/spr_fa389a6f.png"]);[['h',11],['f',14],['w',17]].forEach(([k,i])=>PT[k]=[0,1,2].map(j=>{const m=new Image();m.src=PTU[i+j];return m}));
// mapa pré-renderizado
const OB2=[[80,300,20,'t'],[280,250,20,'t'],[470,160,22,'t'],[470,420,20,'t'],[300,420,18,'t'],[620,200,20,'t'],[620,390,16,'b'],[100,90,22,'t'],[260,40,16,'b'],[760,240,16,'b'],[460,50,14,'k'],[60,190,14,'k'],[290,180,13,'k'],[640,300,14,'k']];
const MAPS=[{id:0,n:'Vila Pokémon',dif:'Normal',P:P,OB:OB,hp:1,rw:1,d:'Caminho em zigue-zague pela vila, com lago e árvores.'},{id:1,n:'Floresta de Viridian',dif:'Difícil',P:[[0,400],[180,400],[180,120],[380,120],[380,300],[560,300],[560,60],[700,60],[700,420],[800,420]],OB:OB2,hp:1.3,rw:1.15,d:'Trilha de terra cheia de curvas. Inimigos 30% mais resistentes, recompensas +15%.'}];
function mkBG(m){const c=document.createElement('canvas');c.width=800;c.height=480;const g=c.getContext('2d'),F=(col,x,y,rx,ry)=>{g.fillStyle=col;g.beginPath();g.ellipse(x,y,rx,ry,0,0,7);g.fill()};
const path=(w,col)=>{g.strokeStyle=col;g.lineWidth=w;g.lineJoin='round';g.beginPath();m.P.forEach((p,i)=>i?g.lineTo(...p):g.moveTo(...p));g.stroke()};
if(m.id==0){g.fillStyle='#7ec86a';g.fillRect(0,0,800,480);g.fillStyle='#74be60';for(let i=0;i<20;i++)g.fillRect(i*40,0,20,480);path(58,'#b89d5c');path(48,'#e3d29a');
for(const[x,y,r]of m.OB){if(r>=25){F('#4a9fd8',x,y,r+14,r);F('#8fcbf0',x-6,y-6,10,5)}else{g.fillStyle='#6b4a2a';g.fillRect(x-3,y,6,r*.7);F('#2e7d32',x,y-4,r,r);F('#43a047',x-4,y-8,r*.5,r*.5)}}}
else{g.fillStyle='#3d7a37';g.fillRect(0,0,800,480);let s=7;const R=()=>(s=(s*16807)%2147483647)/2147483647;
for(let i=0;i<260;i++)F(R()<.5?'#356f30':'#47893f',R()*800,R()*480,10+R()*18,6+R()*10);path(56,'#6d4f2c');path(46,'#a8814f');
for(const[x,y]of[[100,340],[240,330],[320,60],[430,220],[500,360],[660,120],[740,350],[120,200],[600,250],[40,440],[420,440]])for(let j=0;j<14;j++){g.strokeStyle=j%2?'#2e9a3c':'#1f7a2e';g.lineWidth=2;const a=x+R()*36-18,b=y+R()*20-10;g.beginPath();g.moveTo(a,b+8);g.lineTo(a+R()*6-3,b-8);g.stroke()}
for(const[x,y,r,t]of m.OB){if(t=='t'){F('#0003',x,y+r*.8,r,r*.4);g.fillStyle='#5a3b1f';g.fillRect(x-3,y,6,r*.9);F('#1b5a2a',x,y-4,r,r);F('#2c7a38',x-r*.3,y-r*.5,r*.6,r*.6)}else if(t=='b'){F('#2e8a3a',x,y,r,r*.8);F('#4cae50',x-3,y-3,r*.5,r*.4)}else{F('#0003',x,y+r*.6,r,r*.4);F('#8a8a8a',x,y,r,r*.8);F('#aaa',x-3,y-3,r*.5,r*.35)}}}
const e=m.P[m.P.length-1],b=m.P[0];g.fillStyle='#fff';g.strokeStyle='#000';g.lineWidth=3;g.font='bold 12px sans-serif';g.strokeText('ENTRADA ▶',b[0]+6,b[1]-30);g.fillText('ENTRADA ▶',b[0]+6,b[1]-30);g.strokeText('◀ SAÍDA',e[0]-62,e[1]-30);g.fillText('◀ SAÍDA',e[0]-62,e[1]-30);return c}
MAPS.forEach(m=>m.bg=mkBG(m));let MP=MAPS[0],BG=MAPS[0].bg;

// áudio e configurações
let AC;const LS={g(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},s(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const CD={vol:.8,music:.5,sfx:.8,mute:0,q:2,fx:1,anim:1,spd:1,dmg:1,rng:1,tips:1};
let cfg={...CD,...LS.g('ptd_cfg',{})},TEAM=LS.g('ptd_team',['b','c','s','p','f']).filter(k=>T[k]).slice(0,5),QK=1,paused=0,MI=0,tip='';if(!TEAM.length)TEAM=['b','c','s','p','f'];
const TIPS=['Posicione Pokémon perto das curvas do caminho para acertar mais inimigos.','Raízes, queimadura, molhado e paralisia são efeitos reais: combine-os!','Chefes chegam nas ondas 5, 10, 15 e 20.','Evolua seus Pokémon quando chegarem ao nível máximo do estágio.'];
function applyCfg(){QK=[.6,.8,1][cfg.q];C.width=Math.round(800*QK);C.height=Math.round(480*QK)}
function ac(){try{AC=AC||new AudioContext();if(AC.state=='suspended')AC.resume()}catch(e){}return AC}
function tone(f,d,ty,v){try{if(!(v>0)||!ac())return;const o=AC.createOscillator(),g=AC.createGain();o.type=ty||'square';o.frequency.value=f;g.gain.value=v;g.gain.exponentialRampToValueAtTime(.001,AC.currentTime+d);o.connect(g);g.connect(AC.destination);o.start();o.stop(AC.currentTime+d)}catch(e){}}
function beep(f,d,ty,v){tone(f,d,ty,cfg.mute?0:(v||.04)*cfg.vol*cfg.sfx*2)}
let mt,mi=0;const SC=[262,294,330,392,440,523,440,392];
function music(){clearInterval(mt);mt=setInterval(()=>{if(!AC||cfg.mute||paused)return;tone(SC[mi++%8]*(Math.floor(mi/8)%2?1:.75),.4,'triangle',cfg.vol*cfg.music*.07)},380)}
function reset(){coins=500;lives=20;wave=0;towers=[];E=[];PR=[];FX=[];Q=[];speed=cfg.spd;over=0;paused=0;place=null;sel=null;running=0;tip=TIPS[Math.floor(Math.random()*TIPS.length)];$('ov').hidden=1;ui()}
function valid(x,y){if(x<20||x>780||y<20||y>460)return 0;for(let i=1;i<P.length;i++)if(dseg(x,y,P[i-1],P[i])<36)return 0;for(const[a,b,r]of OB)if(Math.hypot(x-a,y-b)<r+(r>=25?22:14))return 0;return!towers.some(t=>Math.hypot(t.x-x,t.y-y)<32)}
function stt(t){const d=T[t.k].st[t.s];return{d:d.d*(1+.08*(t.l-1)),r:d.r*8,c:d.c*Math.pow(.98,t.l-1),aoe:d.aoe,ch:Math.min(.9,T[t.k].p[t.s]+.01*(t.l-1)),def:d}}
const upc=t=>30+15*t.l,maxL=t=>t.k=='p'?(t.s?10:5):[3,6,9][t.s];

function setH(el,h){if(el._h!==h){el._h=h;el.innerHTML=h}}
function ui(){$('co').textContent=coins;$('li').textContent=lives;$('wv').textContent=wave;$('en').textContent=E.length+Q.length;
$('go').disabled=!!(running||over);$('go').textContent=running?'Onda em andamento':'▶ Onda '+(wave+1);$('sp').textContent='⏩ x'+speed;$('au').textContent='🔁 '+(auto?'ON':'OFF');$('ps').textContent=paused?'▶':'⏸';
setH($('lp'),TEAM.map(k=>{const d=T[k].st[0];return`<div class="pc${place==k?' on':''}${coins>=COST?'':' no'}" data-k="${k}"><img src="${PTU[AI[k]]}"><div><b>${d.n}</b><br>${COST} 🔴</div></div>`}).join(''));
let h;if(sel){const t=sel,s=stt(t),T0=T[t.k],can=t.l<maxL(t),last=t.s>=T0.st.length-1;
h=`<div class="pi"><img src="${PTU[AI[t.k]+t.s]}"><div><b>${s.def.n}</b><br>Nv ${t.l}/${maxL(t)} · ${TN[TY[t.k]]}</div></div>⚔ Dano <b>${s.d.toFixed(0)}</b><br>🎯 Alcance <b>${(s.r/8).toFixed(1)}</b><br>⏱ Vel. <b>${s.c.toFixed(2)}s</b><br>✨ ${s.def.a}<br>🧬 ${T0.st.map((x,i)=>i==t.s?'<b>'+x.n+'</b>':x.n).join(' → ')}<br>Passiva: ${T0.pn} <b>${(s.ch*100).toFixed(0)}%</b><br>`+
(can?`<button data-act="up" ${coins<upc(t)?'disabled':''}>⬆ Melhorar (${upc(t)}🔴)</button>`:!last?`<button data-act="ev" ${coins<EVO[t.s+1]?'disabled':''}>✨ Evoluir (${EVO[t.s+1]}🔴)</button>`:'<i>Nível máximo</i> ')+`<button data-act="sl">Vender (+${Math.floor(t.inv*.6)})</button>`}
else h=place?'Toque no mapa para posicionar <b>'+T[place].n+'</b>.':'Escolha um Pokémon da equipe à esquerda e toque no mapa. Toque num Pokémon posicionado para melhorar ou evoluir.'+(cfg.tips?'<br><br>💡 '+tip:'');
setH($('rp'),h)}
function hit(t,e,s){const k=t.k,tg=s.aoe>0?E.filter(q=>!q.dead&&Math.hypot(q.x-e.x,q.y-e.y)<=s.aoe):[e];
for(const q of tg){let d=q===e?s.d:s.d*.6;if(q.wet>0)d*=1.15;d=Math.max(d-(q.ar||0),d*.25);q.hp-=d;if(cfg.dmg)FX.push({k:'txt',x:q.x+Math.random()*12-6,y:q.y-24,s:''+Math.round(d),t:.5,m:.5,sm:1});
if(Math.random()<s.ch){if(TY[k]=='g'){q.root=Math.max(q.root,(1+t.s*.5)*(q.boss?.5:1));FX.push({k:'txt',x:q.x,y:q.y-20,s:'🌿',t:.6,m:.6})}else if(TY[k]=='f'){q.burn=3+t.s;q.bd=s.d*.12}else if(TY[k]=='w')q.wet=4;else{q.par=Math.max(q.par||0,(.8+t.s*.5)*(q.boss?.5:1));FX.push({k:'txt',x:q.x,y:q.y-22,s:'⚡',t:.5,m:.5})}}}
if(s.aoe)FX.push({k:'ring',x:e.x,y:e.y,r:5,col:T[k].fc,t:.3,m:.3,g:s.aoe*3});
beep(k=='c'?180:k=='b'?400:800,.07,k=='c'?'sawtooth':'sine',.03)}
function fire(t,e){const s=stt(t);t.an=AT[AI[t.k]+t.s].at/60;t.dir=(2-Math.round(Math.atan2(e.y-t.y,e.x-t.x)/(Math.PI/4))+16)%8;
if((t.s==2&&TY[t.k]!='w')||(t.k=='p'&&t.s==1)){FX.push({k:'beam',x1:t.x,y1:t.y,x2:e.x,y2:e.y,col:T[t.k].fc,t:.25,m:.25,w:t.k=='b'?10:16});hit(t,e,s)}
else PR.push({x:t.x,y:t.y,e,t,s,k:t.k,st:t.s,sp:t.k=='c'&&t.s==0?520:t.k=='c'?300:t.k=='s'?420:340})}
function step(dt){tm+=dt;
if(Q.length){Q[0].w-=dt;if(Q[0].w<=0){const q=Q.shift();const[x,y]=pos(0);E.push({...q.e,x,y,d:0,id:Math.random()*9,root:0,burn:0,bd:0,wet:0,max:q.e.hp})}}
for(const e of E){if(e.dead)continue;if(e.burn>0){e.burn-=dt;e.hp-=e.bd*dt}e.wet-=dt;e.root-=dt;e.par-=dt;
let sp=e.sp*(e.boss&&e.hp<e.max/2?1.4:1);if(e.root>0)sp*=e.fly?.5:0;if(e.par>0)sp=0;e.d+=sp*dt;[e.x,e.y]=pos(Math.min(e.d,TOT));
if(e.hp<=0){e.dead=1;coins+=e.rw;beep(1200,.08,'sine');for(let i=0;i<(e.boss?6:2);i++)FX.push({k:'coin',x:e.x,y:e.y,t:.7,m:.7,o:i*.08});ui()}
else if(e.d>=TOT){e.dead=1;lives-=e.boss?5:1;beep(120,.3,'sawtooth');if(lives<=0)end(0);ui()}}
E=E.filter(e=>!e.dead);
for(const t of towers){t.cd-=dt;t.an=Math.max(0,(t.an||0)-dt);if(t.cd>0)continue;const s=stt(t);let b=null;
for(const e of E)if(Math.hypot(e.x-t.x,e.y-t.y)<=s.r&&(!b||e.d>b.d))b=e;if(b){fire(t,b);t.cd=s.c}}
for(const p of PR){if(p.e.dead||!E.includes(p.e)){p.x=1e4;continue}const dx=p.e.x-p.x,dy=p.e.y-p.y,d=Math.hypot(dx,dy),m=p.sp*dt;
if(d<=m+6){hit(p.t,p.e,p.s);p.x=1e4}else{p.x+=dx/d*m;p.y+=dy/d*m}}
PR=PR.filter(p=>p.x<9999);
for(const f of FX){f.t-=dt;if(f.o>0){f.o-=dt;f.t+=dt}}FX=FX.filter(f=>f.t>0);
if(running&&!Q.length&&!E.length&&!over){running=0;const b=40+5*wave;coins+=b;FX.push({k:'txt',x:400,y:240,s:'Onda '+wave+' completa! +'+b,t:1.5,m:1.5,big:1});ui();if(wave>=20)end(1);else if(auto)setTimeout(startWave,1500)}}

function end(w){over=1;$('ov').hidden=0;$('ov').innerHTML=`<div>${w?'🏆 Vitória! Você defendeu todas as ondas!':'💀 Derrota na onda '+wave}<br><br><button id="rs">Jogar de novo</button> <button id="rm">Menu</button></div>`;$('rs').onclick=()=>startGame(MI);$('rm').onclick=()=>{$('ov').hidden=1;show('menu')}}
function startWave(){if(running||over)return;wave++;running=1;const sc=1+.22*wave+.01*wave*wave,rs=1+.05*wave,pool=['rat'];if(wave>=2)pool.push('bird');if(wave>=3)pool.push('rock');if(wave>=4)pool.push('bat');
const n=5+wave*2,gap=Math.max(.4,.95-.03*wave);Q=[];
for(let i=0;i<n;i++){const t=pool[Math.floor(Math.random()*pool.length)],b=ED[t],g=sg(t);Q.push({w:gap,e:{t,ei:EI[t][g],hp:b.hp*sc*(1+.35*g)*MP.hp,sp:b.sp,rw:Math.round(b.rw*rs*(1+.2*g)*MP.rw),fly:b.fly,ar:b.ar}})}
if(BOSS[wave])Q.push({w:2,e:{t:'boss',boss:1,ei:BOSS[wave][1],fly:wave==10||wave==15||wave==20,hp:1500*(1+.2*wave)*MP.hp*(wave==20?1.6:1),sp:28,rw:Math.round((120+10*wave)*MP.rw),ar:8}});
FX.push({k:'txt',x:400,y:240,s:BOSS[wave]?'⚠ CHEFE: '+BOSS[wave][0]+'!':'Onda '+wave,t:1.5,m:1.5,big:1});beep(440,.2,'triangle');ui()}
function draw(){X.setTransform(QK,0,0,QK,0,0);X.drawImage(BG,0,0,800,480);
const sh=(x,y,r)=>{if(cfg.q<1)return;X.fillStyle='#0003';X.beginPath();X.ellipse(x,y+8,r,r*.4,0,0,7);X.fill()};
if(sel&&cfg.rng){X.strokeStyle='#fff';X.fillStyle='#ffffff30';X.lineWidth=2;X.beginPath();X.arc(sel.x,sel.y,stt(sel).r,0,7);X.fill();X.stroke()}
for(const t of towers){sh(t.x,t.y,12);const z=1.1+.2*t.s,b=t.an>0?-3:0;{const o=AT[AI[t.k]+t.s],at=t.an>0;atl(X,t.k,t.s,t.x,t.y,1.7,t.dir||0,at?o.at-t.an*60:(cfg.anim?tm*60:0),at)}X.fillStyle='#fff';X.font='bold 10px sans-serif';X.textAlign='center';X.strokeStyle='#000';X.lineWidth=3;X.strokeText('Nv'+t.l,t.x,t.y+32);X.fillText('Nv'+t.l,t.x,t.y+32);if(t===sel){X.strokeStyle='#ffd54f';X.lineWidth=2;X.beginPath();X.arc(t.x,t.y,20,0,7);X.stroke()}}
for(const e of E){sh(e.x,e.y+(e.fly?12:4),e.boss?22:11);eatl(X,e);const w=e.boss?44:24,y=e.y-(e.boss?58:EN[e.ei].h*.85+6);X.fillStyle='#000a';X.fillRect(e.x-w/2,y,w,4);X.fillStyle=e.hp/e.max>.5?'#4c4':'#e44';X.fillRect(e.x-w/2,y,w*Math.max(0,e.hp/e.max),4);
let ix=e.x-8;if(e.root>0){X.fillStyle='#4caf50';X.fillRect(ix,y-6,5,5);ix+=7}if(e.burn>0){X.fillStyle='#ff6a00';X.fillRect(ix,y-6,5,5);ix+=7}if(e.wet>0){X.fillStyle='#4aa8ff';X.fillRect(ix,y-6,5,5);ix+=7}if(e.par>0){X.fillStyle='#ffe033';X.fillRect(ix,y-6,5,5)}}
for(const p of PR){const c=T[p.k].fc,r=3+p.st*2;X.fillStyle=c;X.strokeStyle='#fff';X.lineWidth=1.5;X.beginPath();
if(TY[p.k]=='g'){X.ellipse(p.x,p.y,r+3,r,tm*20,0,7)}else X.arc(p.x,p.y,r+(p.k=='c'?1:0),0,7);X.fill();if(p.k=='s')X.stroke()}
for(const f of FX){const a=Math.max(0,f.t/f.m);X.globalAlpha=Math.min(1,a*1.5);
if(f.k=='ring'){if(!cfg.fx){X.globalAlpha=1;continue}X.strokeStyle=f.col;X.lineWidth=4;X.beginPath();X.arc(f.x,f.y,f.r+(1-a)*f.g,0,7);X.stroke()}
else if(f.k=='beam'){X.strokeStyle=f.col;X.lineWidth=f.w*a+2;X.lineCap='round';X.beginPath();X.moveTo(f.x1,f.y1);X.lineTo(f.x2,f.y2);X.stroke();X.strokeStyle='#fff';X.lineWidth=2;X.stroke()}
else if(f.k=='txt'){X.fillStyle='#fff';X.strokeStyle='#000';X.lineWidth=3;X.textAlign='center';X.font=(f.big?'bold 26px':f.sm?'bold 12px':'16px')+' sans-serif';X.strokeText(f.s,f.x,f.y-(1-a)*20);X.fillText(f.s,f.x,f.y-(1-a)*20)}
else if(f.k=='coin'&&cfg.anim&&!(f.o>0)){const u=1-a,x=f.x+(26-f.x)*u,y=f.y+(8-f.y)*u;X.fillStyle='#e33';X.beginPath();X.arc(x,y,6,0,7);X.fill();X.fillStyle='#fff';X.beginPath();X.arc(x,y,6,0,Math.PI);X.fill();X.strokeStyle='#222';X.lineWidth=1.5;X.stroke();if(f.t<.05&&!f.p){f.p=1;$('cb').classList.remove('pulse');void $('cb').offsetWidth;$('cb').classList.add('pulse')}}
X.globalAlpha=1}
if(place){const ok=valid(mouse.x,mouse.y),r=cfg.rng?T[place].st[0].r*8:14;X.fillStyle=ok?'#4f48':'#f444';X.strokeStyle=ok?'#fff':'#f00';X.lineWidth=2;X.beginPath();X.arc(mouse.x,mouse.y,r,0,7);X.fill();X.stroke();atl(X,place,0,mouse.x,mouse.y,1.7,0,tm*60,0)}}
function xy(ev){const r=C.getBoundingClientRect(),s=Math.min(r.width/800,r.height/480),ox=(r.width-800*s)/2,oy=(r.height-480*s)/2;return{x:(ev.clientX-r.left-ox)/s,y:(ev.clientY-r.top-oy)/s}}
C.addEventListener('pointermove',e=>mouse=xy(e));
C.addEventListener('pointerdown',e=>{mouse=xy(e);try{AC=AC||new AudioContext()}catch(_){}if(over)return;
const t=towers.find(q=>Math.hypot(q.x-mouse.x,q.y-mouse.y)<20);
if(t){sel=t;place=null}else if(place){if(coins>=COST&&valid(mouse.x,mouse.y)){coins-=COST;const nt={k:place,s:0,l:1,x:mouse.x,y:mouse.y,cd:0,inv:COST,f:1};towers.push(nt);FX.push({k:'ring',x:nt.x,y:nt.y,r:6,col:'#fff',t:.4,m:.4,g:30});beep(600,.1,'triangle');if(coins<COST)place=null}else beep(150,.15,'square')}else sel=null;ui()});

const CS=[['Áudio',[['vol','Volume geral','r'],['music','Volume da música','r'],['sfx','Volume dos efeitos','r'],['mute','Silenciar tudo','c']]],['Gráficos',[['q','Qualidade gráfica','s',[['Baixa',0],['Média',1],['Alta',2]]],['fx','Efeitos visuais','c'],['anim','Animações adicionais','c']]],['Jogabilidade',[['spd','Velocidade padrão','s',[['1x',1],['2x',2]]],['dmg','Números de dano','c'],['rng','Mostrar alcance','c'],['tips','Dicas durante o jogo','c']]]];
let dr=[],tsel='b',tt;
function toast(m){const t=$('toast');t.textContent=m;t.style.opacity=1;clearTimeout(tt);tt=setTimeout(()=>t.style.opacity=0,1800)}
function show(id){document.querySelectorAll('.scr').forEach(s=>s.classList.toggle('on',s.id==id));if(id=='team'){dr=TEAM.slice();tsel=dr[0]||'b';rTeam()}if(id=='maps')rMaps();if(id=='cfg')rCfg();if(id!='game')paused=1;$('ov').hidden=1}
function startGame(i){MI=i;MP=MAPS[i];P=MP.P;OB=MP.OB;calc();BG=MP.bg;reset();show('game');paused=0;ui()}
function rTeam(){$('tc').textContent=dr.length;$('slots').innerHTML=[0,1,2,3,4].map(i=>{const k=dr[i];return k?`<div class="slot f" data-rm="${k}"><img src="${PTU[AI[k]]}">${T[k].n}</div>`:'<div class="slot">vazio</div>'}).join('');
$('coll').innerHTML=Object.keys(T).map(k=>`<div class="card${dr.includes(k)?' on':''}" data-k="${k}"><img src="${PTU[AI[k]]}"><br><b>${T[k].n}</b><br>${TN[TY[k]]}</div>`).join('');
const t=T[tsel],d=t.st[0];$('tdet').innerHTML=`<b>${t.n}</b> · Tipo ${TN[TY[tsel]]}<br>Dano ${d.d} · Alcance ${d.r} · Vel. ${d.c}s<br>Passiva: ${t.pn} (${(t.p[0]*100)|0}%)<br>Linha evolutiva: ${t.st.map(x=>x.n).join(' → ')}<br>Ataque atual: ${d.a}`}
function rMaps(){$('mapl').innerHTML=MAPS.map((m,i)=>`<div class="card mc"><canvas width="240" height="144" data-th="${i}"></canvas><br><b>${m.n}</b><br>Dificuldade: ${m.dif}<br>20 ondas · chefes nas ondas 5, 10, 15 e 20<br>Recompensas: ${m.rw>1?'+15%':'padrão'}<br><small>${m.d}</small><br><button class="big" style="font-size:14px;padding:8px;margin-top:6px" data-m="${i}">SELECIONAR E INICIAR</button></div>`).join('');document.querySelectorAll('[data-th]').forEach(c=>c.getContext('2d').drawImage(MAPS[c.dataset.th].bg,0,0,240,144))}
function rCfg(){$('cfgl').innerHTML=CS.map(([t,it])=>`<h3>${t}</h3>`+it.map(([k,l,ty,o])=>`<div class="cl"><span>${l}</span>`+(ty=='r'?`<input type="range" min="0" max="1" step=".05" value="${cfg[k]}" data-c="${k}">`:ty=='c'?`<input type="checkbox" ${cfg[k]?'checked':''} data-c="${k}">`:`<select data-c="${k}">${o.map(([n,v])=>`<option value="${v}" ${cfg[k]==v?'selected':''}>${n}</option>`).join('')}</select>`)+'</div>').join('')).join('')}
document.addEventListener('click',e=>{const b=e.target.closest('[data-go]');if(b)show(b.dataset.go);if(e.target.closest('button'))beep(660,.08,'triangle')});
$('team').onclick=e=>{const rm=e.target.closest('[data-rm]');if(rm){dr=dr.filter(x=>x!=rm.dataset.rm);rTeam();return}const c=e.target.closest('.card');if(c){const k=c.dataset.k;tsel=k;if(dr.includes(k))dr=dr.filter(x=>x!=k);else if(dr.length<5)dr.push(k);else toast('Equipe cheia! Máximo de 5 Pokémon.');rTeam()}};
$('tsave').onclick=()=>{if(!dr.length)return toast('Escolha pelo menos 1 Pokémon!');TEAM=dr.slice();LS.s('ptd_team',TEAM);toast('Equipe salva!')};
$('mapl').onclick=e=>{const b=e.target.closest('[data-m]');if(b)startGame(+b.dataset.m)};
$('cfgl').oninput=$('cfgl').onchange=e=>{const i=e.target,k=i.dataset.c;if(!k)return;cfg[k]=i.type=='checkbox'?+i.checked:+i.value;LS.s('ptd_cfg',cfg);applyCfg()};
$('cdef').onclick=()=>{cfg={...CD};LS.s('ptd_cfg',cfg);applyCfg();rCfg();toast('Configurações restauradas')};
$('lp').onclick=e=>{const c=e.target.closest('.pc');if(c){place=place==c.dataset.k?null:c.dataset.k;sel=null;ui()}};
$('rp').onclick=e=>{const a=e.target.closest('[data-act]');if(!a||!sel)return;const t=sel,x=a.dataset.act;
if(x=='up'&&t.l<maxL(t)&&coins>=upc(t)){coins-=upc(t);t.inv+=upc(t);t.l++;beep(700,.1,'sine')}
else if(x=='ev'&&t.s<T[t.k].st.length-1&&coins>=EVO[t.s+1]){const c=EVO[t.s+1];coins-=c;t.inv+=c;t.s++;t.l++;FX.push({k:'ring',x:t.x,y:t.y,r:10,col:'#ffd54f',t:.6,m:.6,g:80});beep(500,.4,'triangle');beep(900,.4,'triangle')}
else if(x=='sl'){coins+=Math.floor(t.inv*.6);towers=towers.filter(q=>q!=t);sel=null}
ui()};
$('go').onclick=startWave;$('sp').onclick=()=>{speed=speed%3+1;ui()};$('au').onclick=()=>{auto=!auto;ui()};$('ps').onclick=()=>{paused=!paused;ui()};$('mn').onclick=()=>show('menu');
const BC=$('bgc'),BX=BC.getContext('2d');function rsz(){BC.width=innerWidth;BC.height=innerHeight}addEventListener('resize',rsz);rsz();
function menuBG(){const w=BC.width,h=BC.height,g=BX,gr=g.createLinearGradient(0,0,0,h);gr.addColorStop(0,'#4aa8ff');gr.addColorStop(.7,'#c4ecff');gr.addColorStop(.7,'#7ed36a');gr.addColorStop(1,'#4f9f45');g.fillStyle=gr;g.fillRect(0,0,w,h);
g.fillStyle='#fffc';for(let i=0;i<6;i++){const x=((tm*18*(1+i*.25)+i*230)%(w+260))-130,y=30+i*38;for(const[dx,dy,r]of[[0,0,26],[28,6,20],[-28,8,18],[10,-12,18]]){g.beginPath();g.ellipse(x+dx,y+dy,r*1.4,r*.8,0,0,7);g.fill()}}
g.fillStyle='#69c35a';g.beginPath();g.ellipse(w*.2,h*.72,w*.4,h*.12,0,0,7);g.fill();g.beginPath();g.ellipse(w*.85,h*.74,w*.4,h*.13,0,0,7);g.fill();
const sc=Math.max(2,Math.min(4,w/240));['b','c','s'].forEach((k,i)=>{const x=w*(.22+i*.28),y=h*.88+Math.sin(tm*2.5+i*2)*4;g.fillStyle='#0003';g.beginPath();g.ellipse(x,y+14,22*sc/2,6,0,0,7);g.fill();atl(g,k,0,x,y-10*sc,sc,0,tm*60,0)})}
let last=0;function loop(t){const dt=Math.min(.05,(t-last)/1000);last=t;if($('game').classList.contains('on')){if(!over&&!paused)for(let i=0;i<speed;i++)step(dt);draw();$('en').textContent=E.length+Q.length}else{tm+=dt;menuBG()}requestAnimationFrame(loop)}
applyCfg();reset();music();requestAnimationFrame(loop);