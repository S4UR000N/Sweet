/* Vue.js Components */
Vue.component('forimg', {
  template: ``,
});
/* Vue.js Instance */
var vm = new Vue({ // vm - ViewModel from MVVM Pattern
  el: '.modal-body',
  data: {
    test: 'assets/imgs/coverimgMD.jpg',
    slides: 0,
    count: -1,
    basePath: 'assets/imgs/',
    slideshowImages: [
      'vision.jpg',
      'gradient01.jpg',
      'goalsMD.jpg'
    ],
    k: 3,
    f: 6,
    p: 10,
    kTitles: [],
    fTitles: [],
    pTitles: [],
  },
  computed: {},
  methods: {
    range : function (start, end) { /* extension that allows better for looping in Vue, Source: https://stackoverflow.com/questions/49715339/how-to-render-v-for-from-particular-index/49715374#49715374 */
      return Array(end - start + 1).fill().map((_, idx) => start + idx)
    },
    activate: function() {
      $('#onama').remove();
      $('#shBtns').css('display', 'block');
      $('.contentContainer').css('display', 'block');
      $('.slide1').addClass('active');
    },
    slide: function() {
      // Hide Current Slide
      $('.slideIteratable.active').css('display', 'none').removeClass('active');
      $('.nonContainer').css('display', 'none');

      // Show Requested Slide
      $('.slideIteratable').eq(this.count).css('display', 'block').addClass('active');
      if(this.count == 1) { $('.nonContainer.slide2').css('display', 'block'); }
    }
  },
  mounted: function() {
    window.addEventListener('resize', this.adjust);
    $('#myModal').on('shown.bs.modal', function() {
      vm.slides = (function() {
        var length = Object.keys(vm.slideshowImages).length;
        return length;
      })();
      //vm.createRow(0, vm.k, 'k', '#k');
    });
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

}); // end jQuery on load

$('#myModal').modal();
