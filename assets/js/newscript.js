/* Vue.js Components */ /* I ll leave this useless component here in memory of great suffering */
Vue.component('v-for-images', {
  props: {
    imgCount: '',
    rowLength: '',
    basePath: '',
    baseName: ''
  },
  render: function(h) {
    return h(
      'div',   // tag name
      {},      // attributes
      Array.apply(null, { length: (this.imgCount/this.rowLength) }).map((element, index, array) => {   // conventional example: [h('h1', 'header')]
          // Helper Function, turn HTML to string
          document.getHTML= function(who, deep) {
            if(!who || !who.tagName) return '';
            var txt, ax, el= document.createElement("div");
            el.appendChild(who.cloneNode(false));
            txt= el.innerHTML;
            if(deep){
                ax= txt.indexOf('>')+1;
                txt= txt.substring(0, ax)+who.innerHTML+ txt.substring(ax);
            }
          el= null;
          return txt;
          }

          var content = '';
          for(var i = 0; i < array.length; i++) {
            var container = document.createElement('div');
            container.className = "row d-flex justify-content-around";
            for(var j = 1; j <= this.rowLength; j++) {
              var img = document.createElement("img");
              img.src = this.basePath+this.baseName+'/'+this.baseName+j+'.jpg';
              container.appendChild(img);
            }
            return document.getHTML(container, true);
          }
      })
    )
  }
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

/* Vanilla JS functions */
function renderKatalogItems(parent, imgCount, rowLength, basePath, baseName) {
  var content = parent; // Main container
  var images = []; // Images array

  for(var i = 0; i < imgCount; i++) { // Images
    var img = document.createElement("img");
    img.src = basePath+baseName+'/'+baseName+(i+1)+'.jpg';
    images.push(img);
  }
  for(var i = 0; i < (imgCount/rowLength); i++) { // Row containers
    console.log("container");
    var container = document.createElement('div');
    container.className = "row d-flex justify-content-around foodRow";
    for(var j = 0; j < rowLength; j++) { // append Images to Row Containers but check if image exist in array beforehand
      if(images[j+(i*rowLength)]) {
        container.appendChild(images[j+(i*rowLength)]);
      }
    }
    content.appendChild(container);
  }
}

// Click btn that opens Modal
$(document).ready(function() { // start jQuery on load
//renderKatalogItems(document.getElementById("f"), 6, 3, 'assets/imgs/', 'f');
//renderKatalogItems(document.getElementById("p"), 10, 3, 'assets/imgs/', 'p');



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
