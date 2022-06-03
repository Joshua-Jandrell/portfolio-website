// constants
const elementName = "import-html";
const attributeName = "href";
const nestedClass = "importTarget";
const nestedImportId = "elem-id";
const loadEventName = "html-imported";

const loadSockectName = "load-socket";

// ===============================================================
// Script run
customElements.define(
  elementName,
  class extends HTMLElement {
    constructor() {
      super();
      let path = this.getAttribute(attributeName);
      LoadContent(path, this);
    }
  }
);
// ===============================================================
// Async funtions
async function LoadContent(path, element) {
  fetch(path)
    .then((response) => {
      // When the page is loaded convert it to text
      return response.text();
    })
    .then((text) => {
      let parser = new DOMParser();
      return parser.parseFromString(text, "text/html");
    })
    .then((doc) => {
      FixHrefs(doc.body);
      FixSrcs(doc.body);
      let html = doc.body.innerHTML;
      let parent = element.parentElement;
      parent.innerHTML = html;
      return parent;
    })
    .then((elem) => {
      let loadEvent = MakeLoadEvent(elem);
      console.log("send event");
      element.dispatchEvent(loadEvent);
    });
}
// ===============================================================
// Events
function MakeLoadEvent(elemHTML) {
  return new CustomEvent(loadEventName, {
    detail: { elem: elemHTML },
    bubbles: true,
  });
}

// A hacky work around to let link pages in different directories from loaded content - regradless of where said content is loaded
function FixHrefs(loadedContent) {
  let hrefElems = loadedContent.querySelectorAll("[load-href]");
  Array.from(hrefElems).forEach((hrefElem) => {
    hrefElem.href = GetRootPath(hrefElem.getAttribute("load-href"));
  });
}
function FixSrcs(loadedContent) {
  let srcElems = loadedContent.querySelectorAll("[load-src]");
  Array.from(srcElems).forEach((srcElem) => {
    srcElem.scr = GetRootPath(srcElem.getAttribute("load-src"));
  });
}
// ===============================================================
// Automated importing
function LoadImports(hrefList, templateId, parentId) {
  let parent = document.getElementById(parentId);
  let template = document.getElementById(templateId);
  hrefList.forEach((href) => {
    MakeFromTemplate(href, template, parent);
  });
}
function MakeFromTemplate(href, temaplate, parent) {
  let clone = temaplate.content.firstElementChild.cloneNode(true);
  let loadSocket = clone.querySelectorAll(loadSockectName)[0];
  parent.appendChild(clone);
  console.log('gg');
  LoadContent(href, loadSocket);
  loadSocket.addEventListener("html-imported", (e) => {
    console.log("wtf");
  });
}
