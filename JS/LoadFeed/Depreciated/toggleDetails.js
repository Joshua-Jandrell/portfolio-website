function closeDetails(detailsId) {
  let details = document.getElementById(detailsId);
  console.log(document.body.innerHTML);
  //details.removeAttribute("open");
}
function openDetails(detailsId) {
  let details = document.getElementById(detailsId);
  details.addAtribute("open", true);
}
