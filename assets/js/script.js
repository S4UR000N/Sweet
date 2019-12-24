/* pre-formulated measurements */
var pcms = {
  window: {
    width: function() { return $(window).width(); },
    height: function() { return $(window).height(); }
  },
  header: {
    height: function() { return $('.modal-header').eq(0).outerHeight(); }
  },
  modalBody: {
    width: function() { return $('.modal-body').eq(0).outerWidth(); },
    height: function() { return $('.modal-body').eq(0).outerHeight(); }
  },
  absoluteWrapper: {
    elementCenter: function() {

    }
  },
  coverimg: {
    height: function() { return (pcms.modalBody.height() - pcms.header.height()); }
  }
};

// Vue.js Instance
var vm = new Vue({ // vm - ViewModel from MVVM Pattern
  el: '.modal',
  data: {
    // computed measurements
    coverimgStyleObject: {},
    onamaStyleObject: {

    }
  },
  computed: {

  },
  methods: {
  }
});

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

$('#copyBtn').click(function() {
  var text = $("#copied").get(0)
  var selection = window.getSelection();
  var range = document.createRange();
  range.selectNodeContents(text);
  selection.removeAllRanges();
  selection.addRange(range);
  //add to clipboard.
  document.execCommand('copy');
});

}); // end jQuery on load

$('#myModal').on('shown.bs.modal', function() {
  console.log(pcms.modalBody.height());
  console.log(pcms.header.height());
  console.log(pcms.coverimg.height());
});
$(window).resize(function() { /* hmm */ });
$('#myModal').modal();

/* Strapped.js */
function Strapped() {
  this.positioning = {
    spanel: {},
    divel: {},
    imgel: {}
  }
};

// Strapped.js Instance
var st = new Strapped();
