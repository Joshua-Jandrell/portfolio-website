// constants
const elementName = "import-html";
const attributeName = "href";
const nestedClass = "importTarget";
const nestedImportId = "elem-id";
const loadEventName = "html-imported";

// ===============================================================
// Script run
customElements.define(
  elementName,
  class extends HTMLElement {
    constructor() {
      super();
      let path = this.getAttribute(attributeName);
      LoadSingleContent(path, this);
    }
  }
);
// ===============================================================
// Async funtions
async function LoadSingleContent(path, element) {
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
      let html = doc.body.innerHTML;
      let parent = element.parentElement;
      parent.innerHTML = html;
      return parent;
    })
    .then((elem) => {
      let loadEvent = MakeLoadEvent(elem);
      element.dispatchEvent(loadEvent);
    });
}
// ===============================================================
// Events
function MakeLoadEvent(elemHTML) {
  return new CustomEvent(loadEventName, {
    detail: { elem: elemHTML },
  });
}
