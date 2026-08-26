const PIN = "2923";
let entered = "";
const pinScreen = document.getElementById("pinScreen");
const site = document.getElementById("site");
const pinDots = [...document.querySelectorAll("#pinDots span")];
const pinError = document.getElementById("pinError");
const song = document.getElementById("song");
const musicButton = document.getElementById("musicButton");
const musicText = document.getElementById("musicText");

function updateDots(){
  pinDots.forEach((d,i)=>d.classList.toggle("filled", i < entered.length));
}
function submitPin(){
  if(entered === PIN){
    pinScreen.classList.add("hidden");
    site.classList.remove("hidden");
    song.volume = .55;
    song.play().then(()=>setMusicState(true)).catch(()=>setMusicState(false));
    startHearts();
    window.scrollTo(0,0);
  } else if(entered.length === 4){
    pinError.textContent = "wrong pin ♡";
    entered = "";
    updateDots();
  }
}
document.getElementById("pinPad").addEventListener("click", e=>{
  const key = e.target.dataset.key;
  if(!key) return;
  if(key === "back") entered = entered.slice(0,-1);
  else if(entered.length < 4) entered += key;
  updateDots();
  if(entered.length === 4) setTimeout(submitPin, 120);
});

function setMusicState(playing){
  musicText.textContent = playing ? "Rocketeer • playing" : "Rocketeer • paused";
}
musicButton.addEventListener("click", async ()=>{
  if(song.paused){ await song.play(); setMusicState(true); }
  else { song.pause(); setMusicState(false); }
});

const popup = document.getElementById("giftPopup");
document.getElementById("gift").addEventListener("click", ()=>{
  popup.classList.remove("hidden");
  document.body.style.overflow = "hidden";
});
document.getElementById("closePopup").addEventListener("click", ()=>{
  popup.classList.add("hidden");
  document.body.style.overflow = "";
});

document.querySelectorAll("#bouquet button").forEach((flower,i)=>{
  flower.addEventListener("click",()=>{
    flower.animate(
      [{transform:"scale(1)"},{transform:"scale(1.4) rotate(-10deg)"},{transform:"scale(1) rotate(0)"}],
      {duration:550,easing:"ease-out"}
    );
  });
});

const photoModal = document.getElementById("photoModal");
document.getElementById("memoryPhoto").addEventListener("click",()=>photoModal.classList.remove("hidden"));
document.getElementById("closePhoto").addEventListener("click",()=>photoModal.classList.add("hidden"));
photoModal.addEventListener("click",e=>{if(e.target===photoModal) photoModal.classList.add("hidden")});

const note = document.getElementById("note");
document.getElementById("jar").addEventListener("click",()=>{
  const jar = document.getElementById("jar");
  jar.animate(
    [{transform:"rotate(0)"},{transform:"rotate(-5deg) scale(1.04)"},{transform:"rotate(5deg) scale(1.04)"},{transform:"rotate(0)"}],
    {duration:600}
  );
  setTimeout(()=>note.classList.remove("hidden"),300);
});
document.getElementById("closeNote").addEventListener("click",()=>note.classList.add("hidden"));
note.addEventListener("click",e=>{if(e.target===note) note.classList.add("hidden")});

function startHearts(){
  setInterval(()=>{
    if(document.hidden) return;
    const h=document.createElement("span");
    h.className="floating-heart";
    h.textContent=["♡","♥","✦","❀"][Math.floor(Math.random()*4)];
    h.style.left=(Math.random()*100)+"%";
    h.style.fontSize=(10+Math.random()*13)+"px";
    h.style.animationDuration=(6+Math.random()*5)+"s";
    document.getElementById("hearts").appendChild(h);
    setTimeout(()=>h.remove(),12000);
  },900);
}
