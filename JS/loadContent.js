// constants
const elementName = "import-html";
const attributeName = "path";

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
      let html = doc.body.innerHTML;
      element.innerHTML = html;
    });
}
