/**
 * Detects if two elements are colliding
 *
 * Credit goes to BC on Stack Overflow, cleaned up a little bit
 *
 * @link http://stackoverflow.com/questions/5419134/how-to-detect-if-two-divs-touch-with-jquery
 * @param $div1
 * @param $div2
 * @returns {boolean}
 */
var is_colliding = function( $div1, $div2 ) {
	// Div 1 data
	var d1_offset             = $div1.offset();
	var d1_height             = $div1.outerHeight( true );
	var d1_width              = $div1.outerWidth( true );
	var d1_distance_from_top  = d1_offset.top + d1_height;
	var d1_distance_from_left = d1_offset.left + d1_width;

	// Div 2 data
	var d2_offset             = $div2.offset();
	var d2_height             = $div2.outerHeight( true );
	var d2_width              = $div2.outerWidth( true );
	var d2_distance_from_top  = d2_offset.top + d2_height;
	var d2_distance_from_left = d2_offset.left + d2_width;

	var not_colliding = (
    d1_distance_from_top < d2_offset.top ||
    d1_offset.top > d2_distance_from_top ||
    d1_distance_from_left < d2_offset.left ||
    d1_offset.left > d2_distance_from_left
  );
  console.log(d1_distance_from_top < d2_offset.top);
  console.log(d1_offset.top > d2_distance_from_top);
  console.log(d1_distance_from_top < d2_offset.top);
  console.log(d1_offset.left > d2_distance_from_left);

	// Return whether it IS colliding
	return ! not_colliding;
};

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
  absoluteWrapper: { /* checkMinScreenReqs is class used on almost every positioning modifier in case that screen is too small */
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

      $(obj).css('top', elPosY);
    },
    elementLeftCenter: function(obj) {
      var midY = ($(obj).outerHeight() / 2);
      var conY = (pfms.coverimg.height() / 2);

      var elPosY = (conY-midY);

      $(obj).css({
        'position': 'relative',
        'top': elPosY
      });
    },
    elementRightCenter: function(obj) {
      var objX = $(obj).outerWidth();
      var midY = ($(obj).outerHeight() / 2);

      var conX = pfms.window.width();
      var conY = (pfms.coverimg.height() / 2);

      var elPosX = (conX-(2*objX));
      var elPosY = (conY-midY);

      $(obj).css({
        'position': 'relative',
        'left': elPosX,
        'top': elPosY
      });
    },
    bigBallTopRightCorner: function() {
      var obj = $('#bigball');
      var myX = obj.outerWidth();
      var myY = obj.outerHeight();

      var myPosX = '';
      var myPosY = '';

      $(obj).css({
      });
    },
    smallBallBottomLeftCorner: function() {}
  },
  coverimg: {
    height: function() { return (pfms.window.height() - pfms.header.height()); }
  },
  slideshow: {
    activate: function() {
      $('#onama, #coverimg').remove();
      $('.slideshow').css('display', 'block');
      $('[data-parent="0"]').css('display', 'block').addClass('active');
      $('.slideParent0').css('display', 'block');
    },
    slides: function() { return document.getElementsByClassName('slide').length; }
  },
  specialCases: {
    slide02: function() {
      // Select needed elements
      var img = $('#slide02img');
      var grad = $('#slide02gradient');
      var text = $('.slideText.slide1');

      // Pre calculation settings
      var textLength = 0;
      var winX = pfms.window.width();
      $(img).css('height', pfms.coverimg.height());

      // Get calculated data
      var imgX = img.outerWidth();
      var imgY = img.outerHeight();

      var gradX = grad.outerWidth();
      var gradY = grad.outerHeight();
      var gradP = (gradX*gradY);

      $(text).each(function(i, obj) { // $(obj) === $(this) || obj for pure js chaining
        textLength += ($(obj).innerWidth()*$(obj).innerHeight());
      });
      console.log(textLength);
      console.log(gradP);
      console.log("");

      if(gradP < textLength) {
        $(img).css({
          'visibility': 'hidden'
        });
        $(text).css({
          'padding-right': 0
        });
        $(grad).css({
          'width': winX,
          'height': imgY
        });
      }
      else {
        gradX = (winX - imgX);
        $(img).css({
          'visibility': 'visible',
          'left': gradX
        });
        $(text).css({
          'padding-right': imgX
        });
        $(grad).css({
          'width': gradX,
          'height': imgY
        });
      }
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
      $('.textCenter').each(function(i, obj) { // $(obj) === $(this) || obj for pure js chaining
        pfms.absoluteWrapper.textCenter(obj);
      });
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
