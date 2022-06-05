// Depreciated
const className = "topDiv";
const toggleClass = "z-1";
const addClass = "z10";
function CheckTopDiv() {
  let mb = document.getElementById("topDiv");
  let vh = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );
  let showPt = 1.5 * vh;
  let scrollFromTop = GetScrollFromTop();
  if (scrollFromTop > showPt) {
    if (mb.classList.contains(toggleClass)) {
      mb.classList.remove(toggleClass);
      mb.classList.add(addClass);
    }
  } else if (!mb.classList.contains(toggleClass)) {
    mb.classList.add(toggleClass);
    mb.classList.remove(addClass);
  }
}

function GetScrollFromTop() {
  if (window.pageYOffset !== undefined) {
    return window.pageYOffset;
  } else {
    return (
      document.documentElement || document.body.parentNode || document.body
    );
  }
}

// ===================================================
// --- Funtions to be called on scroll ----------------
// ===================================================
window.onscroll = function () {
  CheckTopDiv();
};
