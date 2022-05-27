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
// --- Check if user is scrolling up or down ---------
// ===================================================
let prevScroll;
let scrollUp = true;

document.onscroll += function CheckScrollUp() {
  let yPos = GetScrollFromTop();
  scrollUp = yPos < prevScroll;
  prevScroll = yPos;
};
// ===================================================
// --- Check if an element is onscreen ---------------
// ===================================================
function isVIsisble(el) {
  let rect = el.getBoundingClientRect();
  pos = rect.top;
  return pos <= offset;
}
// ===================================================
// --- Show and collapse element ---------------------
// ===================================================
const vertCollapseClass = "vert-collapsed";
// ===================================================
// --- Update nav bar based on scroll postion --------
// ===================================================
const sectIds = ["home", "about", "games", "blog", "devlog", "contact"];
const navSuffex = "-nav";
const selectedClass = "select";
const offset = window.innerHeight * 0.5;
let currId = "none";
let currIndex = -1;

function CheckPointerMarkers() {
  let setId = currId;
  sectIds.forEach((id) => {
    let el = document.getElementById(id);
    let rect = el.getBoundingClientRect();
    pos = rect.top;
    if (pos <= offset) {
      setId = id;
    }
  });

  if (setId != currId) {
    // Remove class from old currID
    if (currId != "none") {
      let navId = currId + navSuffex;
      let navlink = document.getElementById(navId);
      navlink.classList.remove(selectedClass);
    }

    currId = setId;

    // Add class to new currId
    navId = currId + navSuffex;
    navlink = document.getElementById(navId);
    navlink.classList.add(selectedClass);
    //console.log(currId);
  }
}
// ===================================================
// -------------- Animate headding on appeare --------
// ===================================================
const mainh_name = "main-h";
let mainhs;
function FindMainH1s() {
  mainhs = document.getElementsByClassName(mainh_name);
  CheckHs();
}

function CheckHs() {
  for (i = 0; i < mainhs.length; i++) {
    let h = mainhs[i];
    if (h && isVIsisble(h)) {
      CollapseElement(h);
    }
  }
}

function CollapseElement(el) {
  el.innerHTML = "";
}

// ===================================================
// --- Funtions to run ater load ---------------------
// ===================================================
window.onload = function () {
  FindMainH1s();
};

// ===================================================
// --- Funtions to be called on scroll ----------------
// ===================================================
window.onscroll = function () {
  CheckTopDiv();
  CheckPointerMarkers();
};
