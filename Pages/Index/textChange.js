// Find vh

const hidePt = 100;
console.log("Im alive fool");
// make the into text box postion reletive insead of sticky
window.onscroll = function () {
  var scrollFromTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  if (scrollFromTop > hidePt) {
    console.log("gottem");
    var fb = document.getElementById('fib');
    fb.removeAttribute('class');
  }
  console.log("Lace scroll" + scrollFromTop);
};
