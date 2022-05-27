// =============================
// --- Useful constants --------
// =============================
// Find file path
const navDeetsId = "navDeets";
const pathToRootId = "root-path";
// public varables that hold importnat nav data
var pathToRoot;

// =============================
// --- Nav item entries -----------
// =============================
class NavItem {
  constructor(navName, navLink, description, imageLink = "") {
    this.navName = navName;
    this.navLink = navLink;
    this.description = description;
    this.imageLink = imageLink;
  }
}

// Lits of useful nav items
const blogNav = [
  new NavItem(
    "''As We May Think' at 65' at 12",
    "Pages/Blog/Posts/As-we-may-think-at-65-at-12.html",
    "A reletivly personal reflection on what we have done and where we have come as a society. How has exposure to technology changed the way in which we view technology? How should I while moving forward in a technical space."
  ),
];
