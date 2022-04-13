
const className = "topDiv";
const toggleClass = "z-1";
window.onscroll = function () {
  let scrollFromTop =
    window.pageYOffset !== undefined
      ? window.pageYOffset
      : (document.documentElement || document.body.parentNode || document.body)
          .scrollTop;
  let mb = document.getElementById("topDiv");
  let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  let showPt = 1.5*vh;
  if (scrollFromTop > showPt) {
    if(mb.classList.contains(toggleClass)){
      mb.classList.remove(toggleClass);
      console.log("gone" + mb.style.zIndex);
    }
  }
  else if(!mb.classList.contains(toggleClass)){
    mb.classList.add(toggleClass);
    console.log("back");
  }
};
