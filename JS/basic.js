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
