const devlogPaths = [
  "./Articles/cssHeaddings.html", // put more
  "./Articles/re-re-reboot_0.html",
  "./Articles/back_button_0.html",
  "./Articles/pseudo-square-bracket_0.html",
  "./Articles/style_0.html",
  "./Articles/contact_wire_0.html",
  "./Articles/dev_wire_0.html",
  "./Articles/blog_wire_0.html",
  "./Articles/game_page_0.html",
  "./Articles/games_wire_0.html",
  "./Articles/about_wire_0.html",
  "./Articles/home_nav_0.html",
  "./Articles/land_on_homepage_0.html",
  "./Articles/what_is_this_0.html",
];

// This file contains basic funtion used by ther js scripts
function GetPathToRoot() {
  if (typeof pathToRoot === "undefined") {
    throw "pathToRoot undefined. This must be specifically declared in-inpage script";
  }
  return pathToRoot;
}
function GetRootPath(pathFromRoot) {
  return GetPathToRoot() + pathFromRoot;
}
