var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
} 

//
const infiniteScroll = (wrapperEl, moreBtn) => {
  let items = document.querySelector(wrapperEl).children;
  let moreBtnDOM = document.querySelector(moreBtn);

  let itemsNum = items.length;
  let currentShowNum = 0;
  let lastShowNum = 0;

  const SHOW_NUM = 14;
  const INTERVAL = 5;

  showItems();

  moreBtnDOM.addEventListener('click', () => {
      showItems();
  });

  function showItems() {
      currentShowNum += SHOW_NUM;

      if(currentShowNum > itemsNum) {
          for(let i = lastShowNum; i < itemsNum; i++){
              setTimeout(() => {
                  items[i].classList.add('show');
              }, INTERVAL * (i - lastShowNum));
          }

      } else {
          for(let i = lastShowNum; i < currentShowNum; i++){
              setTimeout(() => {
                  items[i].classList.add('show');
              }, INTERVAL * (i - lastShowNum));
          }
      }

      lastShowNum = currentShowNum;
  }
};

infiniteScroll('#infinite-scroll-list', '#more-btn');
