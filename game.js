/* ===================== 픽셀 그래픽 ===================== */
const SPRITE = [
 "...kkkkkk...","..khhhhhhk..",".khhhhhhhhk.",".khsssssshk.",".kssksskssk.",".kssssssssk.",
 "..ksskkssk..","...kkkkkk...","..kcccccck..",".kcccccccck.","ksccccccccsk","kskccccccksk",
 ".kkppppppkk.","..kppkkppk..","..kppk.kppk.","..kkk..kkk.."];
const SPRITE_F = [ // 엄마: 긴 머리 + 원피스
 "...kkkkkk...","..khhhhhhk..",".khhhhhhhhk.","khhsssssshhk","khsskssksshk","khsssssssshk","khhssmmsshhk","khhhkkkkhhhk",
 ".khkcccckhk.",".kcccccccck.","ksccccccccsk","kskccccccksk",".kcccccccck.","kcccccccccck","..kssk.kssk.","..kkk..kkk.."];
const SPRITE2 = SPRITE.slice(0,13).concat(["..kppkkppk..",".kppk..kppk.",".kkk....kkk."]);
function drawSprite(rows, pal, scale, ctx, ox){
  rows.forEach((r,y)=>[...r].forEach((ch,x)=>{ if(ch==="."||!pal[ch])return; ctx.fillStyle=pal[ch]; ctx.fillRect(ox+x*scale,y*scale,scale,scale);}));
}
function spriteSheet(pal){
  const c=document.createElement("canvas"); c.width=24; c.height=16; const x=c.getContext("2d");
  drawSprite(SPRITE,pal,1,x,0); drawSprite(SPRITE2,pal,1,x,12); return c.toDataURL();
}
const KID=["..kkkk..",".khhhhk.","khsssshk","kskssksk","kssssssk",".kssssk.","..kkkk..",".kcccck.","kcccccck",".kppppk.",".kk..kk."];
function familyPortrait(c){
  const cv=document.createElement("canvas"); cv.width=36; cv.height=16; const x=cv.getContext("2d");
  drawSprite(SPRITE,{k:"#2a1c12",h:c.hair,s:"#f2c9a0",c:c.shirt,p:"#3d4a6b"},1,x,0);
  drawSprite(SPRITE_F,{k:"#2a1c12",h:"#6b3b1f",s:"#f5d2ad",c:"#ff8fb1",m:"#c0392b"},1,x,10); // 엄마
  [[21,"#ffc93c"],[28,"#7bd389"]].forEach(([ox,shirt])=>{ x.save(); x.translate(ox,5); drawSprite(KID,{k:"#2a1c12",h:c.hair,s:"#f5d2ad",c:shirt,p:"#3d4a6b"},1,x,0); x.restore(); });
  cv.setAttribute("aria-label","성인 2명, 아이 2명 가족"); return cv;
}
function portrait(pal){
  const c=document.createElement("canvas"); c.width=12; c.height=16;
  drawSprite(SPRITE,pal,1,c.getContext("2d"),0); return c;
}
const ICONS = { // 10x10
  bed:["..........","kkkkkkkkkk","kwwkbbbbbk","kwwkbbbbbk","kkkkkkkkkk","kbbbbbbbbk","kbbbbbbbbk","kkkkkkkkkk","k........k","k........k"],
  scale:["....kk....","....kk....","kkkkkkkkkk","k...kk...k","yy..kk..yy","yy..kk..yy","....kk....","....kk....","..kkkkkk..",".kkkkkkkk."],
  bag:["...kkkk...","..k....k..","..k....k..","kkkkkkkkkk","krrrrrrrrk","krrrrrrrrk","krrwrrrrrk","krrrrrrrrk","krrrrrrrrk","kkkkkkkkkk"],
  city:["...kkk....","...kbk....","...kbkkkk.","kkkkbkbbk.","kbbkbkbbk.","kbbkbkbbk.","kbbkbkbbk.","kbbkbkbbk.","kbbkbkbbk.","kkkkkkkkkk"],
  river:["..........","...yy.....","..yyyy....","...yy.....","..........","bbbbbbbbbb","bwwbbbwwbb","bbbbbbbbbb","bbwwbbbbwb","bbbbbbbbbb"],
  pool:["k.......k.","k.......k.","kkk.....kk","k.......k.","bbbbbbbbbb","bwbbbwbbbb","bbbbbbbbbb","bbbwbbbwbb","bbbbbbbbbb","bbbbbbbbbb"],
  palm:["..gg.gg...",".gggggggg.","gg..k..gg.","....k.....","....k.....","....k.....","....k.....","....k.....","yyyyyyyyyy","bbbbbbbbbb"],
  mountain:["..........","....kk....","...kwwk...","..kwggk...","..kggggk..",".kggggggk.",".kgggggggk","kggggggggk","gggggggggg","gggggggggg"],
  temple:["....yy....","....yy....","...yyyy...","...yyyy...","..yyyyyy..","..kkkkkk..",".yyyyyyyy.",".ykykykyk.",".ykykykyk.","kkkkkkkkkk"],
  boat:["....k.....","....kw....","....kww...","....kwww..","....k.....","kkkkkkkkkk",".krrrrrrk.","..kkkkkk..","bbbbbbbbbb","bwbbbbwbbb"],
  camera:["..........","..kkk.....","kkkkkkkkkk","kwwwwwwwwk","kwwkkkkwwk","kwkbbbbkwk","kwkbbbbkwk","kwwkkkkwwk","kwwwwwwwwk","kkkkkkkkkk"],
  bowl:["..w..w....","...w..w...","..w..w....","..........","kkkkkkkkkk","kyyyyyyyyk",".kyyyyyyk.",".kyyyyyyk.","..kkkkkk..","...kkkk..."],
  elephant:["..........",".kkkkk....","kgggggk...","kgkggggkk.","kggggggggk","kggggggggk",".kggggggk.",".kgk.kgk..",".kgk.kgk..",".kk..kk..."],
  spa:["..........","...g.g....","..gg.gg...","...ggg....","....k.....","kkkkkkkkkk","kbbbbbbbbk","kbwbbbbwbk",".kbbbbbbk.","..kkkkkk.."]
};
const ICON_PAL = {k:"#2a1c12",w:"#ffffff",b:"#3aa0e0",y:"#ffc93c",r:"#e5507c",g:"#4caf50"};
function iconCanvas(name){
  const c=document.createElement("canvas"); c.width=10; c.height=10; c.className="ic";
  drawSprite(ICONS[name]||ICONS.palm, ICON_PAL, 1, c.getContext("2d"), 0); return c;
}

/* ===================== 사운드 ===================== */
let sfxOn=true, actx=null;
function beep(f=660,d=.07,type="square",when=0){
  if(!sfxOn) return;
  try{
    actx = actx || new (window.AudioContext||window.webkitAudioContext)();
    const o=actx.createOscillator(), g=actx.createGain(), t=actx.currentTime+when;
    o.type=type; o.frequency.value=f; g.gain.setValueAtTime(.06,t); g.gain.exponentialRampToValueAtTime(.0001,t+d);
    o.connect(g).connect(actx.destination); o.start(t); o.stop(t+d+.02);
  }catch(e){}
}
const jingle = (notes)=>notes.forEach((n,i)=>beep(n,.1,"square",i*.09));


/* ===================== 최종 가족 장면 ===================== */
const FACES={ // 원래 얼굴 모양은 그대로, 입(빨강)과 볼터치로 표정만 바꿈
  s85:{6:"..kssmmssk.."},                                   // 살짝 미소
  s90:{6:"..kssmmssk.."},
  s95:{5:".krssssssrk.",6:"..ksmmmmsk.."},                  // 볼 빨간 미소
  s100:{5:".krssssssrk.",6:"..kmmmmmmk.."}                  // 입 벌리고 활짝
};
const FACES_F={
  s85:{6:"khhsmmmmshhk"},
  s90:{6:"khhsmmmmshhk"},
  s95:{5:"khrssssssrhk",6:"khhsmmmmshhk"},
  s100:{5:"khrssssssrhk",6:"khhmmmmmmhhk"}
};
function faceRows(mood,female){ const F=female?FACES_F:FACES, r=(female?SPRITE_F:SPRITE).slice(); if(F[mood]) Object.entries(F[mood]).forEach(([i,v])=>r[i]=v); return r; }
const MOOD_TEXT={s80:"음… 괜찮았어", s85:"나쁘지 않았어!", s90:"좋았어!", s95:"정말 즐거웠어!", s100:"최고의 여행이야!!"};
const FLOWER_COUNT={s80:0, s85:1, s90:3, s95:8, s100:20};
function familyCanvas(c, mood){
  const cv=document.createElement("canvas"); cv.width=226; cv.height=84; const x=cv.getContext("2d");
  const rows=faceRows(mood);
  const base={k:"#2a1c12", s:"#f2c9a0", p:"#3d4a6b", b:"#5ab0ff", r:"#ff8fa3", m:"#c0392b"};
  drawSprite(rows,{...base,h:c.hair,c:c.shirt},5,x,0);            // 어른 1
  drawSprite(faceRows(mood,true),{...base,h:"#6b3b1f",c:"#ff8fb1"},5,x,58); // 엄마
  [[120,"#ffc93c"],[172,"#7bd389"]].forEach(([ox,shirt])=>{ x.save(); x.translate(0,20); drawSprite(rows,{...base,h:c.hair,c:shirt},4,x,ox); x.restore(); }); // 아이 2
  cv.setAttribute("aria-label","가족 4명"); return cv;
}
let flowerURLs=null;
function flowers(){
  if(flowerURLs) return flowerURLs;
  const shape=["..p..",".ppp.","ppypp",".ppp.","..p.."];
  flowerURLs=["#ff7eb6","#ffffff","#ffb347","#c792ff"].map(col=>{ const c=document.createElement("canvas"); c.width=5; c.height=5;
    drawSprite(shape,{p:col,y:"#ffd23c"},1,c.getContext("2d"),0); return c.toDataURL(); });
  return flowerURLs;
}
function setMood(p, score){
  const sc=$("#scene"+p); if(!sc) return;
  const mood="s"+score, c=S.cust[p];
  sc.className="scene "+mood;
  sc.querySelector("canvas").replaceWith(familyCanvas(c,mood));
  const fx=sc.querySelector(".fx"); fx.innerHTML="";
  const f=flowers();
  for(let i=0;i<FLOWER_COUNT[mood];i++){
    const sp=document.createElement("span"); sp.className="flower";
    sp.style.left=(4+Math.random()*88)+"%"; sp.style.top=(6+Math.random()*58)+"%";
    sp.style.backgroundImage=`url(${f[i%f.length]})`;
    sp.style.setProperty("--d",(1.6+Math.random()*1.6)+"s"); sp.style.animationDelay=(-Math.random()*2)+"s";
    const z=14+Math.round(Math.random()*3)*4; sp.style.width=sp.style.height=z+"px";
    fx.appendChild(sp);
  }
  if(score>=100) jingle([784,988,1175,1568,1976]); else if(score>=95) jingle([659,784,1047]); else jingle([523,659]);
  const bub=sc.querySelector(".bubble"); bub.textContent=MOOD_TEXT[mood]; bub.hidden=false;
}


/* ===================== 걷기 ===================== */
/* 민섭: 래시가드 + 보드쇼츠 + 이마에 올린 스노클 마스크 + 오리발
   준희: 민소매 + 수영 튜브 + 이마에 올린 물안경 + 비치 샌들 */
const SWIM_A=[
 "...kkkkkk.t.",
 "..khhhhhhkt.",
 ".kmggmmggmkt",
 ".khsssssshkt",
 ".kssksskssk.",
 ".kssssssssk.",
 "..ksskkssk..",
 "...kkkkkk...",
 "..kcwcccck..",
 ".kcccccwcck.",
 "ksccwcccccsk",
 "kskccccwcksk",
 ".kpwppwppwk.",
 "..kppkkppk..",
 "..kssk.kssk.",
 ".kyyyk.kyyyk"];
const SWIM_A2=SWIM_A.slice(0,13).concat(["..kppkkppk..",".kssk..kssk.","kyyyk..kyyyk"]);
const SWIM_B=[
 "...kkkkkk...",
 "..kbbbbbbk..",
 ".kbggbbggbk.",
 ".khsssssshk.",
 ".kssksskssk.",
 ".kssssssssk.",
 "..ksskkssk..",
 "...kkkkkk...",
 "..kcccccck..",
 ".ksccccccsk.",
 "krrwwrrwwrrk",
 "krrwwrrwwrrk",
 ".kppppppppk.",
 "..kppkkppk..",
 "..kssk.kssk.",
 "..kyyk.kyyk."];
const SWIM_B2=SWIM_B.slice(0,13).concat(["..kppkkppk..",".kssk..kssk.",".kyyk..kyyk."]);
/* 겨울옷: 비니 + 목도리 + 패딩 + 장갑 + 부츠 (따뜻한 곳에 오면 수영복으로 갈아입음) */
const WINTER=[
 "....kwwk....",
 "...khhhhk...",
 "..khhhhhhk..",
 ".kmmmmmmmmk.",
 ".kssksskssk.",
 ".kssssssssk.",
 "..ksskkssk..",
 "...krrrrk...",
 "..krrcccck..",
 ".kccrccccck.",
 "kcccrcccccck",
 "kgccccccccgk",
 ".kppppppppk.",
 "..kppkkppk..",
 "..kbbk.kbbk.",
 "..kkkk.kkkk."];
const WINTER2=WINTER.slice(0,13).concat(["..kppkkppk..",".kbbk..kbbk.",".kkkk..kkkk."]);
const WALK_PAL=(()=>{
  const base={k:"#2a1c12", h:"#4a2c18", s:"#f2c9a0", w:"#ffffff"};
  return {
    winter:{ A:{...base, h:"#ffd23c", m:"#fff7e4", r:"#e5507c", c:"#2f86d6", g:"#ffd23c", p:"#3d4a6b", b:"#8a5a33"},
             B:{...base, h:"#7fd0f5", m:"#fff7e4", r:"#ffd23c", c:"#e5507c", g:"#7fd0f5", p:"#3d4a6b", b:"#6b3b1f"} },
    swim:  { A:{...base, c:"#2f86d6", m:"#1d4e89", g:"#a8eeff", t:"#ffd23c", p:"#ff9f43", y:"#18b4c4"},
             B:{...base, h:"#14110f", c:"#ffd23c", g:"#a8eeff", b:"#c2185b", r:"#ff4d6d", p:"#e5507c", y:"#8a5a33"} }
  };
})();
let outfit="";
function setWalkerColors(mode){
  if(mode===outfit) return; outfit=mode;
  PLAYERS.forEach(p=>$("#w"+p).style.backgroundImage=`url(${scaledSheet(mode,p)})`);
}
function scaledSheet(mode, who){
  const [f1,f2]= mode==="winter" ? [WINTER,WINTER2] : who==="B" ? [SWIM_B,SWIM_B2] : [SWIM_A,SWIM_A2];
  const c=document.createElement("canvas"); c.width=96; c.height=64; const x=c.getContext("2d");
  drawSprite(f1,WALK_PAL[mode][who],4,x,0); drawSprite(f2,WALK_PAL[mode][who],4,x,48); return c.toDataURL();
}
let walkT;
function walkTo(sec){
  const mark=$("[data-mark]",sec); if(!mark) return;
  const y = mark.getBoundingClientRect().top - $("#board").getBoundingClientRect().top + 12;
  const w=$("#walkers"); w.classList.add("walking");
  w.style.transform=`translate(-50%, ${y}px)`;
  clearTimeout(walkT); walkT=setTimeout(()=>w.classList.remove("walking"),1300);
}


/* =====================================================================
   겨울방학편 데이터 — 문구는 여기서 수정하세요.
   STAGES: 위에서 아래로 내려갈수록 추운 곳 → 따뜻한 곳. city·temp는 표지판과 하단 온도에 표시
   opts.s: 고르면 더해지는 점수 (golf 골프 / group 단체 / big 대가족 / learn 어학 / rest 휴양)
   ===================================================================== */
const PLAYERS=["A","B"], PNAME={A:"민섭 고객님",B:"준희 고객님"};
const APPLY_URL="#fair";   // "박람회 신청하러 가기" 버튼이 가는 곳 (박람회 페이지의 신청 폼 위치로 바꿔 주세요)
const START={city:"서울", temp:-8};

const STAGES=[
  { key:"who", no:"STAGE 1", city:"삿포로", temp:-6, title:"이번 겨울방학, 누구랑 떠나요?", opts:[
    {icon:"kids",     name:"우리 가족끼리",   desc:"아이와 함께하는 방학 여행",         s:{rest:2,learn:1}},
    {icon:"family",   name:"6인 이상 대가족", desc:"할머니·할아버지·친척까지 다 같이", s:{big:3}},
    {icon:"city",     name:"회사·모임 단체",  desc:"워크숍, 포상, 동호회 여행",         s:{group:3}},
    {icon:"heart",    name:"둘이서 오붓하게", desc:"부부·커플 여행",                    s:{rest:2,golf:1}} ]},
  { key:"want", no:"STAGE 2", city:"도쿄", temp:7, title:"이번 여행, 제일 하고 싶은 건?", opts:[
    {icon:"golf",     name:"골프 라운딩",       desc:"따뜻한 데서 마음껏 치고 싶어",   s:{golf:3}},
    {icon:"book",     name:"아이 영어 체험",    desc:"방학을 알차게 보내고 싶어",      s:{learn:3}},
    {icon:"palm",     name:"아무것도 안 하기",  desc:"바다 보면서 푹 쉬기",            s:{rest:3}},
    {icon:"camera",   name:"다 같이 추억 만들기", desc:"단체 일정, 행사, 파티",        s:{group:2,big:1}} ]},
  { key:"stay", no:"STAGE 3", city:"타이베이", temp:17, title:"숙소는 어떤 스타일?", opts:[
    {icon:"bed",      name:"넓은 콘도·풀빌라", desc:"여럿이 한 곳에서 편하게",          s:{big:2,group:1}},
    {icon:"pool",     name:"바다 앞 리조트",   desc:"창문 열면 바로 바다",              s:{rest:2}},
    {icon:"bag",      name:"시내 호텔",        desc:"학교·쇼핑·맛집 다니기 편하게",     s:{learn:2}},
    {icon:"golf",     name:"골프장 가까운 곳", desc:"아침 일찍 티오프",                 s:{golf:2}} ]},
  { key:"pace", no:"STAGE 4", city:"다낭", temp:23, title:"하루 일정은 어떻게 짤까요?", opts:[
    {icon:"spa",      name:"오전엔 놀고 오후엔 쉬고", desc:"적당히 놀고 적당히 쉬고",   s:{learn:1,golf:1,rest:1}},
    {icon:"bed",      name:"느긋하게 하루 하나",      desc:"늦잠은 필수",              s:{rest:2}},
    {icon:"mountain", name:"꽉 채워서 알차게",        desc:"갈 수 있는 데는 다 가기",   s:{group:1,learn:1}},
    {icon:"scale",    name:"전문가가 짜 준 대로",     desc:"우리 일정에 맞춘 단독 일정", s:{group:2,big:1}} ]},
  { key:"when", no:"STAGE 5", city:"하와이", temp:27, title:"언제 떠날까요?", opts:[
    {icon:"tree",     name:"12월 말",          desc:"방학 시작하자마자",   s:{}},
    {icon:"snowman",  name:"1월",              desc:"방학 한가운데",       s:{}},
    {icon:"plane",    name:"2월",              desc:"개학 전 마지막 여행", s:{}},
    {icon:"tag",      name:"특가 보고 정할래요", desc:"한 발 빠른 특가부터", s:{rest:1}} ]}
];
/* 박람회 이미지 하단 문구(의뢰서)의 상품 4개 */
const PRODUCTS=[
  {k:"golf",  icon:"golf",   t:"프로와 함께하는 하와이 골프여행"},
  {k:"group", icon:"city",   t:"기업 및 단체 여행 단독 행사"},
  {k:"big",   icon:"family", t:"6인 이상 대가족 여행"},
  {k:"learn", icon:"book",   t:"하와이 Learning Holiday 어학 프로그램"}
];
const TYPES={
  golf: {name:"따뜻한 라운딩파",       desc:"추운 겨울에도 클럽을 놓을 수 없어요. 프로와 함께 하와이 그린에서 방학을 보내요."},
  group:{name:"함께라서 신나는 단체파", desc:"여럿이 함께할 때 제일 즐거워요. 우리 팀만을 위한 단독 일정이 딱이에요."},
  big:  {name:"온 가족 총출동파",       desc:"할머니부터 막내까지 다 같이! 인원이 많아도 편한 숙소와 일정이 필요해요."},
  learn:{name:"방학을 알차게, 배움파",  desc:"놀면서 배우는 겨울방학. 하와이에서 영어도 쓰고 바다도 즐겨요."},
  rest: {name:"느긋한 휴양파",          desc:"이번 방학엔 푹 쉬는 게 목표! 한 발 빠른 특가로 따뜻한 바다 앞 리조트를 잡아요."}
};
const STEP_NAMES=["출발",...STAGES.map(s=>s.city),"취향 결과"];

ICONS.kids=["..kk..kk..",".kssk.kssk",".kssk.kssk","..kk..kk..",".kyyk.krrk","kyyyykrrrr","kyyyykrrrr",".kyyk.krrk",".k..k.k..k",".k..k.k..k"];
ICONS.family=[".kk.kk.kk.","kssksskssk","kssksskssk",".kk.kk.kk.","kbbkyykrrk","kbbkyykrrk","kbbkyykrrk",".kk.kk.kk.",".k..k..k..","..........",];
ICONS.plane=["..........","....kk....","....kk....","kkkkkkkkkk","wwwwkkwwww","....kk....","....kk....","...kkkk...","..........","bbbbbbbbbb"];
ICONS.heart=["..........",".kk...kk..","krrk.krrk.","krrrkrrrk.","krrrrrrrk.",".krrrrrk..","..krrrk...","...krk....","....k.....",".........."];
ICONS.golf=["....kr....","....krr...","....krrr..","....krr...","....kr....","....k.....","....k.....","..gggggg..",".gggkkggg.","gggggggggg"];
ICONS.book=["..........","kkkkkkkkkk","kbbbbkyyyk","kbwwbkywyk","kbbbbkyyyk","kbwwbkywyk","kbbbbkyyyk","kkkkkkkkkk",".k......k.",".........."];
ICONS.snowman=["...kkkk...","..kkkkkk..","..kwwwwk..","..kkwwkk..","..kwwyrk..","...rrrr...",".kwwwwwwk.",".kwwkwwwk.",".kwwwwwwk.","..kkkkkk.."];
ICONS.tree=["....y.....","....g.....","...ggg....","..ggrgg...","...ggg....","..ggggg...",".gggyggg..","ggggggggg.","....k.....","...kkk...."];
ICONS.tag=["......kk..",".....kyyk.","....kyyyyk","...kyykyk.","..kyyyyyk.",".kyyyyyk..","kyyyyyk...",".kyyyk....","..kyk.....","...k......"];

/* ===================== 상태 ===================== */
const $=(q,el=document)=>el.querySelector(q), $$=(q,el=document)=>[...el.querySelectorAll(q)];
let S;
const fresh=()=>({cust:{A:null,B:null}, pick:{A:{},B:{}}, cheered:false});
let toastT; function toast(m){ const t=$("#toast"); t.textContent=m; t.classList.add("on"); clearTimeout(toastT); toastT=setTimeout(()=>t.classList.remove("on"),1800); }
const fmtT=t=>(t<0?"−"+(-t):t)+"℃";
const stageDone=st=>PLAYERS.every(p=>S.pick[p][st.key]!=null);
const allDone=()=>STAGES.every(stageDone);

/* ===================== 스테이지 ===================== */
function stageShell(st){
  const sec=document.createElement("section"); sec.className="stage q"+(st.key==="final"?" final":""); sec.id="st-"+st.key;
  const sub= st.city ? `<span class="wx">${st.temp<10?"❄":st.temp<20?"☁":"☀"}</span> ${st.city} ${fmtT(st.temp)}` : "";
  sec.innerHTML=`<div class="sign"><div class="board-s px"><div class="no">${st.no}${sub?` · ${sub}`:""}</div><h2>${st.title}</h2></div><div class="post"></div></div>
  <div class="cols"><div class="pcol A"></div><div class="mid" data-mark></div><div class="pcol B"></div></div><div class="next"></div>`;
  return sec;
}
function setProgress(now){
  const nav=$("#progress"), st=STAGES[now-1], t= st ? st.temp : now>STAGES.length ? STAGES[STAGES.length-1].temp : START.temp;
  nav.innerHTML=`<div class="temp ${t>=20?"hot":t>=10?"mild":""}">${fmtT(t)}</div>`+
    STEP_NAMES.map((n,i)=>{ const done= i===0 || (STAGES[i-1] ? stageDone(STAGES[i-1]) : allDone());
      return (i?`<span class="ln ${done?"done":""}"></span>`:"")+`<div class="st ${i===now?"now":done?"done":""}"><i></i><span>${n}</span></div>`; }).join("");
}
function renderOpts(st,p){
  const col=$(`#st-${st.key} .pcol.${p}`), cur=S.pick[p][st.key];
  col.innerHTML=`<div class="ptag ${p} px"><span class="pn">${PNAME[p]}</span><span class="need">${cur!=null?"1/1 선택":"0/1 선택"}</span></div><div class="opts big"></div>`;
  const box=$(".opts",col);
  st.opts.forEach((o,i)=>{ const b=document.createElement("button"); b.type="button"; b.className="opt px"+(cur===i?" sel":"");
    b.appendChild(iconCanvas(o.icon)); b.insertAdjacentHTML("beforeend",`<span class="t">${o.name}</span><span class="d">${o.desc}</span>`);
    b.onclick=()=>pick(st,p,i);
    box.appendChild(b); });
}
function pick(st,p,i){
  const was=stageDone(st);
  S.pick[p][st.key]=i; beep(p==="A"?740:620,.06); renderOpts(st,p);
  setProgress(curIdx);
  if(allDone()) renderFinal(); else renderWait();
  if(!was && stageDone(st)){   // 두 분 다 고르면 다음 길로 내려감
    jingle([523,659,784]);
    const nx=$("#st-"+(STAGES[STAGES.indexOf(st)+1]||{key:"final"}).key);
    setTimeout(()=>scrollToSec(nx),450);
  }
}
function scrollToSec(sec){
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({top:sec.getBoundingClientRect().top+scrollY-24, behavior:reduce?"auto":"smooth"});
}

/* ===================== 결과 ===================== */
function tasteOf(p){
  const sc={golf:0,group:0,big:0,learn:0,rest:0};
  STAGES.forEach(st=>Object.entries(st.opts[S.pick[p][st.key]].s).forEach(([k,v])=>sc[k]+=v));
  return ["big","group","golf","learn","rest"].reduce((a,k)=>sc[k]>sc[a]?k:a,"big");   // 동점이면 앞쪽 우선
}
const FAMILY_LOOK={A:{hair:"#3b2416",shirt:"#2fb5a8"}, B:{hair:"#14110f",shirt:"#f08a24"}};
function renderWait(){
  const sec=$("#st-final"); S.cheered=false;
  const left=[]; STAGES.forEach((st,i)=>PLAYERS.forEach(p=>{ if(S.pick[p][st.key]==null) left.push(`<a href="#st-${st.key}">${PNAME[p]} · ${st.city}</a>`); }));
  $(".cols",sec).hidden=true;
  $(".next",sec).innerHTML=`<div class="waitbox px"><b>아직 고르지 않은 문항이 있어요!</b><p>${left.join("")}</p><small>모두 고르면 두 분의 맞춤 여행 취향이 나와요</small></div>`;
}
function renderFinal(){
  const sec=$("#st-final"); $(".cols",sec).hidden=false;
  PLAYERS.forEach(p=>{
    const k=tasteOf(p), ty=TYPES[k];
    $(`#st-final .pcol.${p}`).innerHTML=`<article class="fcard ${p} px">
      <div class="fh"><span class="pn">${PNAME[p]}</span><span class="cn">${ty.name}</span></div>
      <div class="scene" id="scene${p}"><div class="fx"></div><span class="bubble" hidden></span><canvas></canvas></div>
      <div class="fsec famtype big"><h3>맞춤 여행 취향</h3><p>'${ty.name}'<small>${ty.desc}</small></p></div>
      <div class="fsec"><h3>고른 답</h3><div class="conds">${STAGES.map(st=>`<span>${st.city} · ${st.opts[S.pick[p][st.key]].name}</span>`).join("")}</div></div>
      <div class="fsec"><h3>추천 상품</h3><div class="prods">${PRODUCTS.map(x=>`<div class="prod${x.k===k?" pick":""}" data-icon="${x.icon}"><span>${x.t}</span></div>`).join("")}</div>
        ${k==="rest"?`<p class="prod-note">한 발 빠른 특가 & 기간한정 휴양 상품을 추천해요</p>`:""}</div>
    </article>`;
    $$(`#st-final .pcol.${p} .prod`).forEach(d=>d.prepend(iconCanvas(d.dataset.icon)));
    $(`#scene${p} canvas`).replaceWith(familyCanvas(FAMILY_LOOK[p],"neutral"));
  });
  $(".next",sec).innerHTML=`<div class="apply px">
      <p class="ak">${PNAME.A} · ${PNAME.B}</p>
      <h3>이 취향 그대로, 박람회에서 상담 받아 볼까요?</h3>
      <p class="as">호텔엔투어로 미리 준비하는 겨울방학 · 특가 & 기간한정 상품</p>
      <div class="navrow"><a class="go px" id="apply" href="${APPLY_URL}">박람회 신청하러 가기 ▶</a></div>
      <small>자세한 내용은 호텔엔투어 맞춤여행 담당자께 확인하세요!</small>
    </div>
    <div class="navrow" style="margin-top:14px"><button class="go px backbtn" id="again" type="button">다시 고르기 ↺</button></div>`;
  $("#again").onclick=reset;
  $("#apply").onclick=()=>jingle([784,988,1175,1568]);
  S.cheered=false; if(curIdx>STAGES.length) cheer();
}
function cheer(){   // 결과 화면에 도착하면 가족이 활짝 웃음
  if(S.cheered || !allDone()) return; S.cheered=true;
  setTimeout(()=>{ PLAYERS.forEach((p,i)=>{ S.cust[p]=FAMILY_LOOK[p]; setMood(p,100); $(`#scene${p} .bubble`).textContent=["우리 취향 딱이야!","따뜻한 데로 가자!!"][i]; }); },500);
}

/* ===================== 스크롤: 문항이 하나씩 나타나고, 내려갈수록 따뜻해짐 ===================== */
let curIdx=-1;
const clamp=v=>Math.max(0,Math.min(1,v)), smooth=(a,b,v)=>{ const t=clamp((v-a)/(b-a)); return t*t*(3-2*t); };
function onScroll(){
  const vh=innerHeight, secs=[$("#st-draw"),...STAGES.map(st=>$("#st-"+st.key)),$("#st-final")];
  secs.forEach(s=>{ if(s.getBoundingClientRect().top<vh*.82) s.classList.add("in"); });
  // 0 = 첫 문항(눈밭) … 1 = 결과(라군)
  const y0=secs[1].getBoundingClientRect().top, y1=secs[secs.length-1].getBoundingClientRect().top;
  const t=clamp((vh*.5-y0)/(y1-y0));
  const body=document.body.style;
  body.setProperty("--snow",(1-smooth(.1,.4,t)).toFixed(3));
  body.setProperty("--green",(1-smooth(.5,.82,t)).toFixed(3));
  setWalkerColors(t>.66?"swim":"winter");
  let cur=0; secs.forEach((s,i)=>{ if(s.getBoundingClientRect().top<vh*.5) cur=i; });
  if(cur!==curIdx){ curIdx=cur; setProgress(cur); walkTo(secs[cur]); $("#progress").hidden=cur===0;
    if(cur===secs.length-1) cheer(); }
}
let ticking=false;
addEventListener("scroll",()=>{ if(!ticking){ ticking=true; requestAnimationFrame(()=>{ ticking=false; onScroll(); }); } },{passive:true});
addEventListener("resize",onScroll);

/* ===================== 시작 ===================== */
function reset(){
  S=fresh(); outfit="";
  $("#tripInfo").innerHTML=`<span>❄ ${START.city} ${fmtT(START.temp)} 출발</span><span>☀ ${STAGES[STAGES.length-1].city} ${fmtT(STAGES[STAGES.length-1].temp)} 도착</span><span>스크롤하며 <b>여행 취향</b> 고르기</span>`;
  const wrap=$("#stages"); wrap.innerHTML="";
  STAGES.forEach(st=>{ wrap.appendChild(stageShell(st)); PLAYERS.forEach(p=>renderOpts(st,p)); });
  wrap.appendChild(stageShell({key:"final", no:"GOAL", title:"두 분의 맞춤 여행 취향"}));
  renderWait();
  curIdx=-1; window.scrollTo({top:0});
  const w=$("#walkers"); w.style.transition="none";
  requestAnimationFrame(()=>{ onScroll(); requestAnimationFrame(()=>w.style.transition=""); });
}
$("#go-draw").onclick=()=>{ jingle([523,659,784]); scrollToSec($("#st-"+STAGES[0].key)); };
$("#restart").onclick=reset;
$("#sfx").onclick=()=>{ sfxOn=!sfxOn; $("#sfx").textContent=sfxOn?"SOUND ON":"SOUND OFF"; };
reset();

/* 눈 (픽셀) — 위쪽 추운 구간에서만 보임 */
(function(){
  const mk=(n,seed)=>{ const c=document.createElement("canvas"); c.width=96; c.height=96; const x=c.getContext("2d");
    const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
    for(let i=0;i<n;i++){ const s=rnd()<.3?2:1; x.fillStyle=rnd()<.5?"#ffffff":"#e6f2ff"; x.fillRect(Math.floor(rnd()*96),Math.floor(rnd()*96),s,s); }
    return `url(${c.toDataURL()})`; };
  document.body.style.setProperty("--flakes",`${mk(26,3)}, ${mk(14,29)}`);
  // 눈밭 바닥 무늬
  const c=document.createElement("canvas"); c.width=32; c.height=32; const x=c.getContext("2d");
  x.fillStyle="#eef5fc"; x.fillRect(0,0,32,32); x.fillStyle="#dde9f5"; x.fillRect(0,0,16,16); x.fillRect(16,16,16,16);
  x.fillStyle="#ffffff"; [[3,4],[20,7],[9,22],[27,25],[14,13]].forEach(([a,b])=>x.fillRect(a,b,2,1));
  document.body.style.setProperty("--snowfield",`url(${c.toDataURL()})`);
})();


/* 파도 무늬 (픽셀) */
(function(){
  const c=document.createElement("canvas"); c.width=48; c.height=32; const x=c.getContext("2d");
  const px=(a,b,col)=>{x.fillStyle=col;x.fillRect(a,b,1,1);};
  const crest=(ox,oy,w)=>{ for(let i=0;i<w;i++){ const y=oy+Math.round(Math.sin(i/w*Math.PI)*-2); px(ox+i,y,"#e9fbff"); px(ox+i,y+1,"#a6f3e3"); } px(ox+w-1,oy-1,"#ffffff"); };
  crest(2,6,14); crest(26,14,12); crest(10,24,16); crest(38,28,8);
  for(const [a,b] of [[20,3],[36,8],[6,17],[44,20],[30,26]]) px(a,b,"#ccfaef");
  document.querySelectorAll(".wave").forEach(w=>w.style.backgroundImage=`url(${c.toDataURL()})`);
})();

/* 라군 바닥(산호초·모래톱) 픽셀 무늬 */
(function(){
  const c=document.createElement("canvas"); c.width=64; c.height=64; const x=c.getContext("2d");
  let seed=7; const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
  for(let i=0;i<70;i++){ const a=Math.floor(rnd()*64), b=Math.floor(rnd()*64), w=1+Math.floor(rnd()*3);
    x.fillStyle= rnd()<.55 ? "rgba(20,110,120,.22)" : "rgba(255,255,255,.18)"; x.fillRect(a,b,w,1+Math.floor(rnd()*2)); }
  for(let i=0;i<6;i++){ const a=Math.floor(rnd()*56), b=Math.floor(rnd()*60); x.fillStyle="rgba(255,250,225,.16)"; x.fillRect(a,b,8,2); x.fillRect(a+2,b+2,5,1); }
  document.body.style.setProperty("--reef",`url(${c.toDataURL()})`);
  document.body.style.imageRendering="auto";
})();

/* 만타가오리가 화면 사이를 헤엄쳐요 */
(function(){
  if(matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const W0=60, H0=40;
  // 위에서 본 만타: 넓은 삼각 날개 + 머리 앞 두 개의 지느러미(뿔) + 가늘고 긴 꼬리. tip=날개 끝 높이(날갯짓)
  function frame(tip){
    const c=document.createElement("canvas"); c.width=W0; c.height=H0; const x=c.getContext("2d");
    const cx=W0/2, ty=17+tip, span=27-Math.abs(tip)*.7;
    x.fillStyle="#0e1b24"; x.beginPath();
    x.moveTo(cx-4,6);
    x.quadraticCurveTo(cx-17,3, cx-span,ty);            // 왼쪽 앞날개: 바깥으로 볼록
    x.quadraticCurveTo(cx-15,ty-5, cx-6,ty+5);          // 왼쪽 뒷날개: 안쪽으로 오목 → 날개 끝이 뒤로 뾰족
    x.quadraticCurveTo(cx-2,ty+7, cx,ty+7);
    x.quadraticCurveTo(cx+2,ty+7, cx+6,ty+5);
    x.quadraticCurveTo(cx+15,ty-5, cx+span,ty);
    x.quadraticCurveTo(cx+17,3, cx+4,6);
    x.lineTo(cx,7); x.closePath(); x.fill();
    x.fillRect(cx-6,2,3,6); x.fillRect(cx+3,2,3,6);     // 머리지느러미(뿔)
    x.fillRect(cx-1,ty+6,2,3); x.fillRect(cx,ty+9,1,H0-(ty+9)); // 꼬리
    x.fillStyle="#15252f"; x.beginPath(); x.ellipse(cx,ty-4,3,5,0,0,Math.PI*2); x.fill();
    // 픽셀 느낌: 반투명 가장자리를 없앰
    const d=x.getImageData(0,0,W0,H0); for(let i=3;i<d.data.length;i+=4) d.data[i]=d.data[i]>110?255:0; x.putImageData(d,0,0);
    return c;
  }
  const F=[frame(-4),frame(-1),frame(3),frame(-1)];   // 위로 → 가운데 → 아래로 → 가운데
  const sea=document.getElementById("sea");
  function swim(){
    const Wv=innerWidth, Hv=innerHeight, scale=2.4+Math.random()*1.4;
    const m=document.createElement("canvas"); m.className="manta"; m.width=W0; m.height=H0;
    m.style.width=W0*scale+"px"; m.style.height=H0*scale+"px"; sea.appendChild(m);
    const g=m.getContext("2d");
    const fromLeft=Math.random()<.5, y0=Hv*(.15+Math.random()*.7), y1=Hv*(.15+Math.random()*.7);
    const pad=W0*scale+40, x0=fromLeft?-pad:Wv+pad, x1=fromLeft?Wv+pad:-pad;
    const dur=16000+Math.random()*8000, amp=20+Math.random()*30, beat=260+Math.random()*120, t0=performance.now();
    let last=-1;
    (function step(now){
      const el=Math.max(0,now-t0), t=Math.min(1,el/dur), fi=Math.floor(el/beat)%4;
      if(fi!==last){ g.clearRect(0,0,W0,H0); g.drawImage(F[fi],0,0); last=fi; }
      const xx=x0+(x1-x0)*t, yy=y0+(y1-y0)*t+Math.sin(t*Math.PI*3)*amp;
      const dx=(x1-x0)/dur, dy=(y1-y0)/dur+Math.cos(t*Math.PI*3)*amp*Math.PI*3/dur, ang=Math.atan2(dy,dx)*180/Math.PI+90;
      m.style.transform=`translate(${xx-W0*scale/2}px,${yy-H0*scale/2}px) rotate(${ang}deg)`;
      if(t<1) requestAnimationFrame(step); else m.remove();
    })(t0);
  }
  setTimeout(swim,800); setTimeout(swim,5000);
  setInterval(()=>{ if(sea.children.length<3) swim(); },7000);
})();
