/* pre-formulated measurements */
var pfms = {
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
    elementCenter: function(obj) {
      var midX = ($(obj).outerWidth() / 2);
      var midY = ($(obj).outerHeight() / 2);

      var conX = pfms.window.width();
      var conY = $(obj).parent('.absoluteWrapper').outerHeight();

      var elPosX = (conX/2-midX);
      var elPosY = (conY/2-midY);

      $(obj).css({
        'position': 'relative',
        'left': elPosX,
        'top': elPosY
      });
    },
    textCenter: function(obj) {
      var midY = ($(obj).outerHeight() / 2);
      var conY = (pfms.coverimg.height() / 2);

      var elPosY = (conY-midY-52);

      $(obj).css({
        'position': 'relative',
        'top': elPosY
      });
    },
    elementLeftCenter: function(obj) {
      var midY = ($(obj).outerHeight() / 2);
      var conY = $(obj).parents('.absoluteWrapper').outerHeight();
      var elPosY = (conY/2-midY);

      $(obj).css({
        'position': 'relative',
        'top': elPosY
      });
    },
    elementRightCenter: function(obj) {
      var objX = $(obj).outerWidth();
      var midY = ($(obj).outerHeight() / 2);

      var conX = pfms.window.width();
      var conY = $(obj).parents('.absoluteWrapper').outerHeight();

      var elPosX = (conX-(2*objX));
      var elPosY = (conY/2-midY);

      $(obj).css({
        'position': 'relative',
        'left': elPosX,
        'top': elPosY
      });
    },
  },
  coverimg: {
    height: function() { return (pfms.window.height() - pfms.header.height()); }
  },
  slideshow: {
    activate: function() {
      $('#onama, #coverimg').remove();
      $('.slideshow').css('display', 'block');
      $('.slideText.slide0').css('display', 'block');
      $('[data-parent="0"]').eq(0).css('display', 'block').addClass('active');
    },
    slides: function() { return document.getElementsByClassName('slide').length; }
  },
  specialCases: {
    slide02: function() {
      var img = $('#slide02img');
      var grad = $('#slide02gradient');
      var text = $('.slideText.slide1');

      $(img).css('height', pfms.coverimg.height());
      var imgX = img.outerWidth();
      var imgY = img.outerHeight();

      $(text).css('padding-right', imgX);

      var gradX = (pfms.window.width() - imgX);

      $(img).css({
        'left': gradX
      });
      $(grad).css({
        'width': gradX,
        'height': imgY,
      });
    }
  }
};

/* Vue Componenets */
// Button Slide Back
//Vue.component('button-slide', {});

/* Vue.js Instance */
var vm = new Vue({ // vm - ViewModel from MVVM Pattern
  el: '.modal',
  data: {
    count: 0,
    slides: ''
  },
  computed: {
  },
  methods: {
    adjust: function() {
      $('.coverimg').css("height", pfms.coverimg.height());
      $('.absoluteWrapper').css("height", pfms.coverimg.height());
      $('.textCenter').each(function(i, obj) { // $(obj) === $(this) || obj for pure js chaining
        pfms.absoluteWrapper.textCenter(obj);
      });
      $('.elementCenter').each(function(i, obj) { // $(obj) === $(this) || obj for pure js chaining
        pfms.absoluteWrapper.elementCenter(obj);
      });
      $('.elementLeftCenter').each(function(i, obj) { // $(obj) === $(this) || obj for pure js chaining
        pfms.absoluteWrapper.elementLeftCenter(obj);
      });
      $('.elementRightCenter').each(function(i, obj) { // $(obj) === $(this) || obj for pure js chaining
        pfms.absoluteWrapper.elementRightCenter(obj);
      });
      pfms.specialCases.slide02();
    },
    slide: function() {
      // Hide Current Slide
      var parentIndex = $('.slide.active').attr('data-parent');
      $('[data-myParent="'+parentIndex+'"]').css('display', 'none');
      $('.slide.active').css('display', 'none');
      $('.slide.active').removeClass('active');

      // Show Requested Slide
      var newParentIndex = $('.slide').eq(this.count).attr('data-parent');
      $('.slide').eq(this.count).css('display', 'block').addClass('active');
      $('[data-myParent="'+newParentIndex+'"]').css('display', 'block');
    }
  },
  mounted: function() {
    window.addEventListener('resize', this.adjust);
    $('#myModal').on('shown.bs.modal', function() {
      vm.adjust();
      $('#onama').css('display', 'block'); /* Fix Loading Problem where Button Appears in Top L corner */
      vm.slides = pfms.slideshow.slides();
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

$('#myModal').modal();
