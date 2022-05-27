// constants
const elementName = "import-html";
const className = "import-root";
const attributeName = "href";
const nestedClass = "importTarget";
const nestedImportId = "elem-id";
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
      element.innerHTML = html;
    });
}
