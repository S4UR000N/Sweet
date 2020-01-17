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
  var section = parent; // Main container
  var images = []; // Images array
  var imagesData =
    [
      // Krofne
      ["CLASSIC DONUT", "6,25"],
      ["SWEET PLACE", "9,38"],
      ["KROFNILLA", "6,25"],
      // Fritule
      ["MORSKA VILA", "15,63"],
      ["SAY CHEESE", "15,63"],
      ["YOGI", "15,63"],
      ["SUA CHUA", "18,75"],
      ["LITTLE FRITTLE", "18,75"],
    	["BLACK MAGIC", "25,00"],
      // Palacinke
    	["MAMAREDO", "9,38"],
    	["LINOLINKE", "12,50"],
    	["JAMMY LOO", "9,38"],
    	["KOKONILA", "15,63"],
    	["PUFFY FLUFFY", "21,88"],
    	["PANNUKAKKU", "21,88"],
    	["ZOMBI", "18,75"],
    	["HEY HAM", "25,00"],
    	["ČUDESNI KIKI", "28,13"],
      ["ČOKO-ČINKE", "9,38"]
    ];

  for(var i = 0; i < imgCount; i++) { // Images
    // Create Elements
    var img = document.createElement("div");
    var imgInfo = document.createElement("i"); // <i class="fas fa-info-circle"></i>
    var imgInfoButton = document.createElement("button");

    // Set Attributes
    img.style = 'background-image: url('+basePath+baseName+'/'+baseName+(i+1)+'.jpg); background-size: 300px 300px';
    imgInfo.className="fas fa-info-circle";

    // Popover
    imgInfoButton.setAttribute("data-toggle", "popover");
    imgInfoButton.setAttribute("data-placement", "left");
    imgInfoButton.setAttribute("data-html", "true");
    imgInfoButton.setAttribute("title", imagesData[i][0]);
    imgInfoButton.setAttribute("data-content", "Cijena: "+imagesData[i][1]+"kn");

    // Merge
    imgInfoButton.appendChild(imgInfo);
    img.appendChild(imgInfoButton);

    // Store
    images.push(img);
  }
  for(var i = 0; i < (imgCount/rowLength); i++) { // Row containers
    var foodRow = document.createElement('div');
    foodRow.className = "row justify-content-around foodRow";
    for(var j = 0; j < rowLength; j++) { // append Images to Row Containers but check if image exist in array beforehand
      if(images[j+(i*rowLength)]) {
        foodRow.appendChild(images[j+(i*rowLength)]);
      }
    }
    section.appendChild(foodRow);
  }
}

// Click btn that opens Modal
$(document).ready(function() { // start jQuery on load
renderKatalogItems(document.getElementById("k"), 3, 3, 'assets/imgs/', 'k');
renderKatalogItems(document.getElementById("f"), 6, 3, 'assets/imgs/', 'f');
renderKatalogItems(document.getElementById("p"), 10, 3, 'assets/imgs/', 'p');
$("[data-toggle=popover]").popover(); // Initialize popovers

/* Slide Up/Down effect */
$('.foodTitle').each(function(index) {
  $('.foodTitle').eq(index).click(function(e) {
    var me = this;
    var isActive = $(me).hasClass('active');
    if(isActive) {
      $("[data-toggle=popover]").popover('hide'); // close popovers
    }
    if(!isActive) {
      $(me).addClass('active');
    }
    $('.foodTitle+.foodSection').eq(index).slideToggle('slow', function() {
      if($(this).hasClass('d-flex')) {
        $(this).removeClass('d-flex');
        $(me).removeClass('active');
      }
      else {
        $(this).addClass('d-flex');
      }
    });
  });
});


var modalHeaderButtons = document.querySelectorAll(".modalHeaderButtons");
var modalPages = document.querySelectorAll(".modalPages")
for(i = 0; i < modalHeaderButtons.length; i++) {
  modalHeaderButtons[i].addEventListener("click", switchButtonAndPage);
}

function switchButtonAndPage(event) {
  $("[data-toggle=popover]").popover('hide'); // hide active popovers /* From Page KATALOG */
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
