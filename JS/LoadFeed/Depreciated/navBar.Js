// This script is used to load a single nave bar to the top of each page

// =================================
// Useful contant variables
// =================================
const deetsId = "navDeets";
const navSections = [
  new NavBarOption("Home", "home", "index.html", true),
  new NavBarOption("About", "about", "index.html#about", true),
  new NavBarOption("Games", "games", "index.html#games", true),
  new NavBarOption("Blog", "blog", ""),
];

class NavBarOption {
  constructor(displayName, tagName, filePath, inIndex) {
    this.displayName = displayName;
    this.tagName = tagName;
    this.filePath = filePath;
    this.inIndex = inIndex;
  }
}
// add the generic navbar html to the given element
function AddNavBar(elem) {
  elem.innerHTML = navBar;
}

// =================================
// Html elelments
// =================================
const navBar =
  '<nav class="nav-bar">' +
  '<label for="#main-bar" class="nav-lable">' +
  '<a href="." rel="home" class="title-link">' +
  "<h1>Joshua Jandrell</h1>";
("</a>");
("</label>");
('<ul class="nav-bar" id="main-bar"></ul>');
("</nav>");
const navItem =
  "<li>" +
  '<a href="#home" class="homeLink home" id="home-nav">' +
  '<div class="link-block">Home</div></a>' +
  "</li>";
