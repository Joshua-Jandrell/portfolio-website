// This script is responsibale for updating elements with the given id when a spsific scroll target is reached.
// currently not compatable with idex.js due to similar html manamaplation features which may cause strange behaviour when wroking together

// costants
const offsetMult = 0.5; // how far down the window must a dive be for the scroll offset to trigger
const scrollMarkerGroups = [];
const markerIdNavSuffex = "-nav-elem";
// glabal scope varables
let currentMarker = "none"; // the id of the marker the user has currently scrolled to.

// Setup ===========================
function SetScrollPointMarkers(markerClass, addedClass, sameAsTarget = false) {
  let markerArray = Array.from(document.getElementsByClassName(markerClass));
  let markergroup = new MarkerGroup(markerArray, addedClass, sameAsTarget);
  scrollMarkerGroups.push(markergroup);
  window.addEventListener("scroll", (e) => markergroup.UpdateMarker());
}
// Useful Calsses =================
class MarkerGroup {
  constructor(markers, addedClass, sameAsTarget) {
    this.markers = markers;
    this.addedClass = addedClass;
    this.sameAsTarget = sameAsTarget;
    this.currentMarker = "none";
  }
  UpdateMarker() {
    let newCurrent = GetCurrentMarker(this.markers);
    if (newCurrent != this.currentMarker) {
      if (this.sameAsTarget) {
        ToggleClasses(newCurrent, this.currentMarker, this.addedClass);
      } else {
        ToggleNavClasses(newCurrent, this.currentMarker, this.addedClass);
      }
      this.currentMarker = newCurrent;
    }
  }
}
// CSS Class updating =================
function ToggleNavClasses(newElem, oldElem, togglClass) {
  let newNavId = GetMarkerNavId(newElem.id);
  let newNav = document.getElementById(newNavId);
  let oldNavId = GetMarkerNavId(oldElem.id);
  let oldNav = document.getElementById(oldNavId);
  ToggleClasses(newNav, oldNav, togglClass);
}
function ToggleClasses(newElem, oldElem, toggleClass) {
  AddClass(newElem, toggleClass);
  RemoveClass(oldElem, toggleClass);
}
function AddClass(elem, addedClass) {
  if (elem != "none" && elem != null) {
    if (!elem.classList.contains(addedClass)) {
      elem.classList.add(addedClass);
    }
  }
}
function RemoveClass(elem, classToRemove) {
  if (elem != "none" && elem != null) {
    if (elem.classList.contains(classToRemove)) {
      elem.classList.remove(classToRemove);
    }
  }
}
// Scroll position checking =================
function GetCurrentMarker(markers) {
  let currMarker = "none";
  markers.forEach((marker) => {
    if (IsVIsisble(marker)) {
      currMarker = marker;
    }
  });
  return currMarker;
}
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
