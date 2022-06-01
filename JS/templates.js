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

// Less powerful than shadow template - no automatic updatatng, slots or dark magic
// Read by web crawlers
// Main doccument css applied
function MakeLightTemplate(templateName) {
  customElements.define(
    templateName,
    class extends HTMLElement {
      constructor() {
        super();
        let template = document.getElementById(templateName);
        let templateContent = template.content;
        this.appendChild(templateContent.cloneNode(true));
      }
    }
  );
}

async function LoadCustomTemplates(href) {
  let rootHref = GetRootPath(href);
  fetch(rootHref)
    .then((response) => {
      return response.text();
    })
    .then((text) => {
      return ParseToHTML(text);
    })
    .then((doc) => {
      return MakeLoadedTemplates(doc.body);
    });
}

function ParseToHTML(text) {
  let parser = new DOMParser();
  return parser.parseFromString(text, "text/html");
}
function MakeLoadedTemplates(body) {
  let temps = body.querySelectorAll("template");
  Array.from(temps).forEach((template) => {
    document.body.appendChild(template);
    FixHrefs(template);
    MakeShadowTemplate(template.id);
  });

  function FixHrefs(template) {
    let hrefElems = template.content.querySelectorAll("[load-href]");
    Array.from(hrefElems).forEach((hrefElem) => {
      hrefElem.href = GetRootPath(hrefElem.getAttribute("load-href"));
    });
  }
}
