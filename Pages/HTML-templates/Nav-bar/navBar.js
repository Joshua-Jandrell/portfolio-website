const selectedClass = "select";
const backId = "u-back";
selectSection();
function selectSection() {
  let shadowRoot = GetNavBarShadow();
  sectElem = shadowRoot.getElementById(getSectId());
  if (sectElem != null) {
    sectElem.classList.add(selectedClass);
  }
}

function getSectId() {
  if (typeof selectId !== "undefined") {
    return selectId;
  } else return "";
}

// find nav bar elements shadow root - elements indised cannot be accessed from the documnet
function GetNavBarShadow() {
  let navBar = document.getElementsByTagName("nav-bar")[0];
  return navBar.shadowRoot;
}

// go back to the previous pags
function GoBack() {
  window.history.back();
  return false;
}
