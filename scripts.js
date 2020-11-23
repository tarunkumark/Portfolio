
let navbar = document.getElementById("navbar");

let sticky = navbar.offsetTop;

function stickTheBar() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

window.onscroll = function() {stickTheBar()};

