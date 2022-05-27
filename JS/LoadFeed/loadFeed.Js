// preload object class
class LoadComtainer {
  constructor(element, path, template) {
    this.element = element;
    this.path = path;
    this.template = template;
  }
}

// Make Load container objects for all elemnets with the 'h-load' class name
function FindLoadContainers() {
  const loadClass = "h-load";
  const pathClass = "u-path";
  const templateIDClass = "h-templateID";

  let containers = document.getElementsByClassName(loadClass);
  let loadContainers = [];

  Array.from(containers).forEach((container) => {
    let path = GetInnerHTML(container, pathClass);
    let templateID = GetInnerHTML(container, templateIDClass);
    let template = document.getElementById(templateID);
    let loadContainer = new LoadComtainer(container, path, template);
    loadContainers.push(loadContainer);
  });

  return loadContainers;
}

// Find the inner html of a container within the given html element
function GetInnerHTML(parentElement, className) {
  let container = parentElement.getElementsByClassName(className)[0];
  if (container != null) {
    return container.innerHTML;
  } else {
    console.log("ERROR! - " + className + " not found in " + parentElement);
  }
}

// ====================================
// --- Fetch html from another page
// ====================================
// fecth funtion adapted from one found on stack exchange: https://stackoverflow.com/questions/36631762/returning-html-with-fetch
// I made sure to understand what it was doing before using it :)
async function FetchDoc(path) {
  var html;
  let doc;
  fetch(path)
    .then(function (response) {
      // When the page is loaded convert it to text
      return response.text();
    })
    .then(function (text) {
      var parser = new DOMParser();
      doc = parser.parseFromString(text, "text/html");
      html = doc.body;
      console.log(doc); // --> works
    });
    console.log(doc); // --> broken
    console.log(html);

  return html;
}

window.onload = function () {
  console.log("loaded");
  let loadContainers = FindLoadContainers();

  let d = FetchDoc("index.html");
  // console.log(d);
};
