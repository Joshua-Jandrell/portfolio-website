// NB: This script must be deffereed in ordered to work.

// constants
const ignoreClass = "not-automated"; // this class must be added to a template for it not to be automatically created

// ===============================================================
// ===============================================================
// Making temaplates
function MakeAllTemplates() {
  let templates = document.getElementsByTagName("template");
  Array.from(templates).forEach((template) => {
    let templateId = template.id;
    // make a class if template should not be automated
    if (!template.classList.contains(ignoreClass)) {
      MakeShadowTemplate(templateId);
    }
  });
}

function MakeShadowTemplate(templateName) {
  customElements.define(
    templateName,
    class extends HTMLElement {
      constructor() {
        super();
        let template = document.getElementById(templateName);
        let templateContent = template.content;

        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(templateContent.cloneNode(true));
      }
    }
  );
}

function LoadCustomTemplates(href) {
  fetch(href)
    .then((response) => {
      return response.text();
    })
    .then((text) => {
      let parser = new DOMParser();
      return parser.parseFromString(text, "text/html");
    })
    .then((doc) => {
      return doc.body;
    })
    .then((body) => {
      let temps = body.querySelectorAll("template");
      Array.from(temps).forEach((template) => {
        document.body.appendChild(template);
        MakeShadowTemplate(template.id);
        FixHref(template);
      });
    });
}
// accounts for links not being at the route directory
function FixLinks(template) {
  let links = template.querySelectorAll("link");
  Array.from(links).forEach((link) => {
    link.rel = GetRootPath(link.rel);
  });
}

function FixHref(template) {
  let test = template.content;
  console.log("looking in " + test);
  let as = test.querySelectorAll("a");
  console.log(as);
  Array.from(as).forEach((a) => {
    console.log("a");
  });
}
