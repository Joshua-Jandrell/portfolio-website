// This script is responsibale for updating elements with the given id when a spsific scroll target is reached.
// currently not compatable with idex.js due to similar html manamaplation features which may cause strange behaviour when wroking together

// costants
const offsetMult = 0.5; // how far down the window must a dive be for the scroll offset to trigger
const ScrollMarkrs = [];
const markerIdNavSuffex = "-nav-elem";
// glabal scope varables
let currentMarker = "none"; // the id of the marker the user has currently scrolled to.

function SetScrollPointMarkers(markerClass) {
  let markerArray = Array.from(document.getElementsByClassName(markerClass));
  markerArray.forEach((marker) => {
    ScrollMarkrs.push(marker);
  });
}

// Scroll position checking =================
function IsVIsisble(el) {
  let rect = el.getBoundingClientRect();
  pos = rect.top;
  return pos <= GetOffset();
}
// Get offset dynamically to accounted for window re-sizing
function GetOffset() {
  return window.innerHeight * offsetMult;
}
// id finding ==============================
function GetMarkerNavId(targetId) {
  return targetId + markerIdNavSuffex;
}
