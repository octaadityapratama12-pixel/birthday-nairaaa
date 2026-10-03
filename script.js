const birthday = new Date("2026-10-28T00:00:00+07:00").getTime();

function updateCountdown(){
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");
  const countNoteEl = document.getElementById("countNote");

  // Halaman selain Home tidak memiliki countdown.
  if(!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  const now = new Date().getTime();
  let distance = birthday - now;

  if(distance <= 0){
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    if(countNoteEl) countNoteEl.textContent = "Happy Birthday, Naira! Hari ini adalah harimu. 🎂💗";
    return;
  }

  const days = Math.floor(distance / (1000*60*60*24));
  const hours = Math.floor((distance / (1000*60*60)) % 24);
  const minutes = Math.floor((distance / (1000*60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  daysEl.textContent = String(days).padStart(2,"0");
  hoursEl.textContent = String(hours).padStart(2,"0");
  minutesEl.textContent = String(minutes).padStart(2,"0");
  secondsEl.textContent = String(seconds).padStart(2,"0");
}
updateCountdown();
setInterval(updateCountdown,1000);

const hearts = document.getElementById("hearts");
function createHeart(){
  const h = document.createElement("span");
  h.className = "heart";
  h.textContent = Math.random() > .5 ? "♡" : "♥";
  h.style.left = Math.random()*100 + "vw";
  h.style.fontSize = (10 + Math.random()*18) + "px";
  h.style.animationDuration = (5 + Math.random()*5) + "s";
  hearts.appendChild(h);
  setTimeout(()=>h.remove(),10000);
}
setInterval(createHeart,700);

const modal = document.getElementById("modal");
const surpriseBtn = document.getElementById("surpriseBtn");
const closeModal = document.getElementById("closeModal");

// Kejutan hanya ada di halaman Harapan. Guard ini membuat script aman
// dipakai bersama oleh semua halaman.
if(surpriseBtn && modal){
  surpriseBtn.addEventListener("click",()=>{
    modal.classList.add("show");
    for(let i=0;i<18;i++) setTimeout(createHeart,i*80);
  });
}

if(closeModal && modal){
  closeModal.addEventListener("click",()=>modal.classList.remove("show"));
  modal.addEventListener("click",(e)=>{
    if(e.target === modal) modal.classList.remove("show");
  });
}

document.addEventListener("keydown",(e)=>{
  if(e.key === "Escape" && modal) modal.classList.remove("show");
});
