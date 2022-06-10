const selectedClass = "select";
const backId = "u-back";
let currNavSection = null;
SelectSection();
function SelectSection() {
  SelectNavSection(GetSectId());
}

function SelectNavSection(sectionId) {
  let shadowRoot = GetNavBarShadow();
  sectElem = shadowRoot.getElementById(sectionId);
  if (sectElem != null) {
    sectElem.classList.add(selectedClass);
    if (currNavSection != null) {
      currNavSection.classList.remove(selectedClass);
    }
    currNavSection = sectElem;
  }
}

function GetSectId() {
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
