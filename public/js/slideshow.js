const sec = 1000;
// const slideshow = document.querySelector('#show');
const title = document.querySelector('#slideshow h2');
const slides = document.querySelectorAll('#slideshow img');
// slides.forEach(slide => slide.style.display = 'block');
const timer = 10*sec; //30 Second timer
let slidePos = 0;

function nextSlide() {
  //Hide current slide
  slides[slidePos].style.opacity = '0';
  setTimeout(()=>{
    slides[slidePos].style.display = 'none';

    //Determine slide deck position
    if(slidePos == slides.length-1) {
      slidePos = 0;
    } else {
      ++slidePos;
    }

    //Apply block styling to the next slide
    slides[slidePos].style.display = 'block';
    setTimeout(()=>{slides[slidePos].style.opacity = '1';}, 10);
    title.innerHTML = slides[slidePos].getAttribute('alt');
  }, 300);
}
slides[slidePos].style.display = 'block';
slides[slidePos].style.opacity = '1';
title.innerHTML = slides[slidePos].getAttribute('alt');
setInterval(nextSlide, timer);