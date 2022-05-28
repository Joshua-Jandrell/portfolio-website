// NB - this script only works if the load content script hs been added to the docuement
// Ideally this script should execute BEFORE loadContent.js to avoid any possible issues - however order shouldn't really matter

// constants
const templateNameClass = "p-name";
const templateLinkClass = "blog-nav";

const docIndexId = "log-index";
const templateId = "index-entry-template";

const closeButtonClass = "closeButton";

AddOnLoad("devlog-entry");

var indexElemIds = [];
// ===============================================================
// Setup events
function AddOnLoad(className) {
  let elemArray = Array.from(document.getElementsByClassName(className));
  elemArray.forEach((element) => {
    let elemId = element.id;
    //indexElemIds.push(elemId);
    let importer = element.getElementsByTagName("import-html")[0];
    importer.addEventListener("html-imported", (e) =>
      AddToIndex(e.detail.elem, elemId, docIndexId)
    );
  });
}
// ===============================================================
// Setup funtions
function AddToIndex(loadedElem, elemId, indexId) {
  if ("content" in document.createElement("template")) {
    let newEntry = MakeIndexEntry(loadedElem, elemId, indexId);
    let indexElem = document.getElementById(indexId);
    indexElem.appendChild(newEntry);
  } else {
    indexElem.innerHTML += "Template not supported :/";
  }
}

function MakeIndexEntry(loadedElem, elemId) {
  let template = document.getElementById(templateId);
  let newEntry = template.content.firstElementChild.cloneNode(true);
  SetClassContent(newEntry, loadedElem, templateNameClass);
  SetIndexLink(newEntry, templateLinkClass, elemId);
  return newEntry;
}
function SetClassContent(newEntry, loadedElem, className) {
  let loadElem = loadedElem.getElementsByClassName(className)[0];
  let newElem = newEntry.getElementsByClassName(className)[0];
  if (loadElem != null && newElem != null) {
    newElem.innerHTML = loadElem.innerHTML;
  }
}
function SetIndexLink(newEntry, linkClass, targetId) {
  links = newEntry.getElementsByTagName("a");
  Array.from(links).forEach((a) => {
    if (a.classList.contains(linkClass)) {
      SetHref(a, targetId);
      //AddOpenDetailsOnCLick(a, targetId);
      return;
    }
  });
}
function MakeIdHrefTxt(elemId) {
  return "#" + elemId;
}
function SetHref(a, targetId) {
  let hrefTxt = MakeIdHrefTxt(targetId);
  a.href = hrefTxt;
}

// ===============================================================
// Open/close details on click
function AddOpenDetailsOnCLick(a, targetId) {
  let target = document.getElementById(targetId);
  let logEntry = target.getElementsByTagName("log-template")[0];
  let shadow = logEntry.shadowRoot;
  if (shadow != null) {
    let details = shadow.querySelectorAll("details")[0];
    a.addEventListener("click", (e) => OpenDetails(details));

    let closeButtons = shadow.querySelectorAll(closeButtonClass);
    let newId = getPreviousIndex(id);
    Array.from(closeButtons).forEach((button) => {});
  }
}
function OpenDetails(details) {
  details.setAttribute("open", "true");
}

function getPreviousIndex(id) {
  let inds = indexElemIds;
  let prevId = null;
  inds.forEach((indexId) => {
    if (indexId == id) {
      return prevId;
    } else {
      prevId = indexId;
    }
  });
  return null;
}
