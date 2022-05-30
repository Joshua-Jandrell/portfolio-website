// NB - this script only works if other required scripts are loaded into the dcument
// These include:
// => loadContent.js
// => template.js + a desingated 'log-entry' template
// => udpatedBySection.js *not required for running but imporves funtionality
// Ideally this script should execute BEFORE loadContent.js to avoid any possible issues - however order shouldn't really matter

// constants
const templateNameClass = "p-name";
const templateLinkClass = "blog-nav";

const docIndexId = "log-index";
const templateId = "index-entry-template";
const articleHrefTag = "article-href";

const closeButtonClass = "close-button";
const openNextClass = "next-button";
const openPreButtonClass = "prev-button";
const indexElemIds = [];

const devIndexType = "dev";
const blogIndexType = "blog";
const devIndexHiddenClass = "noDisplay";

// ===============================================================
// Setup events
function AddOnLoad(className, indexType) {
  let elemArray = Array.from(document.getElementsByClassName(className));
  elemArray.forEach((element) => {
    let elemId = element.id;
    indexElemIds.push(elemId);
    let indexElem = MakeIndexEntry();
    let importer = element.getElementsByTagName("import-html")[0];
    importer.addEventListener("html-imported", (e) =>
      DoIndexSetup(e.detail.elem, elemId, indexElem, indexType)
    );
  });
}
// ===============================================================
// Setup funtions
function DoIndexSetup(loadedElem, targetId, indexElem, indexType) {
  if (indexType == devIndexType) {
    SetupDevIndex(loadedElem, targetId, indexElem);
  } else if (indexType == blogIndexType) {
    SetUpBlogIndex(loadedElem, targetId, indexElem);
  } else {
    console.log("Unknow index type: " + indexType);
  }
}
function SetupDevIndex(loadedElem, targetId, newEntry) {
  // set up and index where all items are in the same doc containe d by detail/summaery elements
  SetClassContent(newEntry, loadedElem, templateNameClass);
  SetIndexLink(newEntry, templateLinkClass, targetId);
  SetLinkedId(newEntry, targetId);
  CheckLinkLocation(targetId);
}
function SetUpBlogIndex(loadedElem, target, indexElem) {
  let a = indexElem.getElementsByTagName("a")[0];
  let hreftTxt = loadedElem.querySelectorAll(articleHrefTag)[0];
  console.log(hreftTxt.innerHTML);
  a.href = hreftTxt.innerHTML;
  //indexElem.innerHTML = "yeet";
}
// ===============================================================
// General Setup
function MakeIndexEntry() {
  let template = document.getElementById(templateId);
  let newEntry = template.content.firstElementChild.cloneNode(true);
  let navContainer = document.getElementById(docIndexId);
  navContainer.appendChild(newEntry);
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
      AddOpenDetailsOnCLick(a, targetId);
      return;
    }
  });
}
// ===============================================================
// Href and id managamnent
function MakeIdHrefTxt(targetId) {
  return "#" + targetId;
}
function SetHref(a, targetId) {
  let hrefTxt = MakeIdHrefTxt(targetId);
  a.href = hrefTxt;
}
function SetLinkedId(navElem, targetId) {
  // check to see if a marker linking funtion exisits.
  if (typeof (GetMarkerNavId === "function")) {
    let elemId = GetMarkerNavId(targetId);
    navElem.id = elemId;
  }
  // if not, there is no point in setting a linked ID
}
// ===============================================================
// Open/close details on click
function AddOpenDetailsOnCLick(a, targetId) {
  let shadow = GetLogArticleShadow(targetId);
  let details = shadow.querySelectorAll("details")[0];
  a.addEventListener("click", (e) => OpenDetails(details));
  let closeButtons = shadow.querySelectorAll("button");
  SubscribeToCloseButtons(closeButtons, details, targetId);
}
function SubscribeToCloseButtons(closeButtons, details, targetId) {
  Array.from(closeButtons).forEach((button) => {
    if (button.classList.contains(closeButtonClass)) {
      button.addEventListener("click", (e) => {
        CloseDetails(details);
        DoAttionalButtonActions(button, targetId);
      });
    }
  });
}
function DoAttionalButtonActions(button, targetId) {
  if (button.classList.contains(openNextClass)) {
    SetNextButton(targetId);
  } else if (button.classList.contains(openPreButtonClass)) {
    SetPrevButton(targetId);
  } else {
    GotoElemId(targetId);
  }
}
function SetNextButton(targetId) {
  let newId = GetIndexAbove(targetId);
  if (newId != null) {
    OpenLogEntry(newId);
  } else {
    GotoElemId(targetId);
  }
}
function SetPrevButton(targetId) {
  let newId = GetIndexBelow(targetId);
  if (newId != null) {
    OpenLogEntry(newId);
  } else {
    GotoElemId(targetId);
  }
}
function OpenLogEntry(id) {
  GotoElemId(id);
  let newShadow = GetLogArticleShadow(id);
  OpenDetails(newShadow.querySelectorAll("details")[0]);
}
function GotoElemId(id) {
  window.location = MakeIdHrefTxt(id);
}
function OpenDetails(details) {
  details.setAttribute("open", "true");
}
function CloseDetails(details) {
  details.removeAttribute("open");
}
function GetLogArticleShadow(id) {
  let target = document.getElementById(id);
  let logEntry = target.getElementsByTagName("log-template")[0];
  return logEntry.shadowRoot;
}
// opens the log item if there is a '#' in the hyperlink
function CheckLinkLocation(id) {
  if (window.location.hash === MakeIdHrefTxt(id)) {
    OpenLogEntry(id);
  }
}

function GetIndexAbove(id) {
  let prevId = null;
  let set = false;
  indexElemIds.forEach((indexId) => {
    set = indexId == id || set;
    if (!set) {
      prevId = indexId;
    }
  });
  return prevId;
}
function GetIndexBelow(id) {
  let lowerId = null;
  let found = false;
  indexElemIds.forEach((indexId) => {
    if (found) {
      // only set if the next found element exists
      lowerId = indexId;
    }
    found = indexId == id;
  });
  return lowerId;
}
