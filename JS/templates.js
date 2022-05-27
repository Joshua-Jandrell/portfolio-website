// NB: This script must be deffereed in ordered to work.

// constants
const ignoreClass = "not-automated"; // this class must be added to a template for it not to be automatically created

// ===============================================================
// funtions called
MakeAllTemplates();
// ===============================================================
// Making temaplates
function MakeAllTemplates() {
  let templates = document.getElementsByTagName("template");
  Array.from(templates).forEach((template) => {
    let templateId = template.id;
    // make a class if template should not be automated
    if (!template.classList.contains(ignoreClass)) {
      MakeShaddowTemplate(templateId);
    }
  });
}
/* Depreciated 
function MakeTemplate(templateName) {
  customElements.define(
    templateName,
    class extends HTMLElement {
      constructor() {
        super();
        let template = document.getElementById(templateName);
        let templateContent = template.content;

        const root = template.content.firstElementChild.cloneNode(true);
        //this.innerHTML = "";
        this.appendChild(templateContent.cloneNode(true));
      }
    }
  );
}*/

function MakeShaddowTemplate(templateName) {
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
