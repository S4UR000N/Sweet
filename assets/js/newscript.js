// Click btn that opens Modal
$(document).ready(function() { // start jQuery on load
var modalHeaderButtons = document.querySelectorAll(".modalHeaderButtons");
var modalPages = document.querySelectorAll(".modalPages")
for(i = 0; i < modalHeaderButtons.length; i++) {
  modalHeaderButtons[i].addEventListener("click", switchButtonAndPage);
}

function switchButtonAndPage(event) {
  event.preventDefault();

  document.querySelector(".modalHeaderButtons.active").classList.remove("active");
  document.querySelector(".modalPages.active").classList.remove("active");

  var clickedButton = event.currentTarget;
  clickedButton.classList.add("active");

  var newPage = document.getElementById("pg"+clickedButton.id);
  newPage.classList.add("active");
}

}); // end jQuery on load

$('#myModal').modal();
