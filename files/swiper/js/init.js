const lazyImages = document.querySelectorAll('img[loading="lazy"]'); // Get all images with the loading="lazy" attribute
function addLoadedClass(image) { // Function to add class to image parent after it is loaded
   const parentElement = image.parentElement;
   if (image.complete) { // Check if the image is loaded
      parentElement.classList.add('loaded');
   } else {
      image.addEventListener('load', function() { // Add a load event to add the class after the image has loaded
         parentElement.classList.add('loaded');
      });
   }
}
lazyImages.forEach(addLoadedClass); // Loop through all the images and call the addLoadedClass function for each one

/* === */

/* Links to projects -> */

let swiperInstances = []; // Array to store all Swiper instances

// Function for initializing sliders
function initSliders() {
   const sliders = document.querySelectorAll('.links-to-projects-slider');

   sliders.forEach(slider => {
      const wrapper = slider.querySelector('.links-to-projects__logos');
      const slides = slider.querySelectorAll('.links-to-projects__blockLogo');

      // Add classes for Swiper
      if (wrapper && !wrapper.classList.contains('swiper-wrapper')) {
         wrapper.classList.add('swiper-wrapper');
      }

      slides.forEach(slide => {
         if (!slide.classList.contains('swiper-slide')) {
            slide.classList.add('swiper-slide');
         }
      });

      // Check if the instance already exists
      const existingInstance = swiperInstances.find(instance => instance.el === slider);
      if (!existingInstance) {
         const newSwiper = new Swiper(slider, {
            pagination: {
               el: '.links-to-projects-pagination',
               clickable: true,
            },
            watchOverflow: true,
            spaceBetween: 40,
            loop: true,
            speed: 800,
            effect: 'fade',
            slidesPerView: 1,
            autoplay: {
               delay: 8000,
               stopOnLastSlide: false,
               disableOnInteraction: false,
            },
         });

         swiperInstances.push(newSwiper);
      }
   });
}

// Function to destroy sliders and remove classes
function destroySliders() {
   swiperInstances.forEach(swiper => {
      swiper.destroy(true, true);
   });
   swiperInstances = []; // Clear the sliders array

   const sliders = document.querySelectorAll('.links-to-projects-slider');

   sliders.forEach(slider => {
      const wrapper = slider.querySelector('.links-to-projects__logos');
      const slides = slider.querySelectorAll('.links-to-projects__blockLogo');

      // Remove Swiper classes
      if (wrapper && wrapper.classList.contains('swiper-wrapper')) {
         wrapper.classList.remove('swiper-wrapper');
      }

      slides.forEach(slide => {
         if (slide.classList.contains('swiper-slide')) {
            slide.classList.remove('swiper-slide');
         }
      });
   });
}

// Function to control sliders depending on screen width
function toggleSliders() {
   if (window.innerWidth <= 480) {
      initSliders();
   } else {
      destroySliders();
   }
}

// Launch on page load
toggleSliders();

// Track window size changes
window.addEventListener('resize', toggleSliders);

// Track screen orientation changes
window.addEventListener('orientationchange', toggleSliders);

/* <- Links to projects */

/* Gallery -> */
let galleryBigSlider = document.querySelector('.gallery-big-slider')
if (galleryBigSlider) {
   var swiper = new Swiper(".gallery-small-slider", {
      loop: true,
      spaceBetween: 24,
      slidesPerView: 3,
      watchSlidesProgress: true,
      direction: 'vertical',
      breakpoints: {
         0: {
            spaceBetween: 12,
         },
         721: {
            spaceBetween: 24,
         }
      },
   });
   var swiper2 = new Swiper(galleryBigSlider, {
      loop: true,
      spaceBetween: 10,
      slidesPerView: 1,
      initialSlide: 1,
      effect: 'fade',
      fadeEffect: {
         crossFade: true
      },
      autoplay: {
         delay: 6000,
         stopOnLastSlide: true,
         disableOnInteraction: false,
      },
      thumbs: {
         swiper: swiper,
      },
      pagination: {
         el: '.gallery-big-slider__pagination',
         clickable: true,
      }
   });
}
/* <- Gallery */

/* Reviews -> */

let swiperInstances2 = []; // Array to store all Swiper instances

// Function for initializing sliders
function initSliders2() {
   const reviewsSlider = document.querySelectorAll('.reviews-slider');

   reviewsSlider.forEach(slider => {
      const wrapper2 = slider.querySelector('.say-about__reviews');
      const slides2 = slider.querySelectorAll('.say-about__review');

      // Add classes for Swiper
      if (wrapper2 && !wrapper2.classList.contains('swiper-wrapper')) {
         wrapper2.classList.add('swiper-wrapper');
      }

      slides2.forEach(slide => {
         if (!slide.classList.contains('swiper-slide')) {
            slide.classList.add('swiper-slide');
         }
      });

      // Check if the instance already exists
      const existingInstance = swiperInstances2.find(instance => instance.el === slider);
      if (!existingInstance) {
         const newSwiper2 = new Swiper(slider, {
            pagination: {
               el: '.reviews-slider-pagination',
               clickable: true,
            },
            watchOverflow: true,
            spaceBetween: 40,
            loop: true,
            speed: 800,
            autoHeight: true,
            effect: 'fade',
            slidesPerView: 1,
            autoplay: {
               delay: 8000,
               stopOnLastSlide: false,
               disableOnInteraction: false,
            },
         });

         swiperInstances2.push(newSwiper2);
      }
   });
}

// Function to destroy sliders and remove classes
function destroySliders2() {
   swiperInstances2.forEach(swiper => {
      swiper.destroy(true, true);
   });
   swiperInstances2 = []; // Clear the sliders array

   const reviewsSlider = document.querySelectorAll('.reviews-slider');

   reviewsSlider.forEach(slider => {
      const wrapper2 = slider.querySelector('.say-about__reviews');
      const slides2 = slider.querySelectorAll('.say-about__review');

      // Remove Swiper classes
      if (wrapper2 && wrapper2.classList.contains('swiper-wrapper')) {
         wrapper2.classList.remove('swiper-wrapper');
      }

      slides2.forEach(slide => {
         if (slide.classList.contains('swiper-slide')) {
            slide.classList.remove('swiper-slide');
         }
      });
   });
}

// Function to control sliders depending on screen width
function toggleSliders2() {
   if (window.innerWidth <= 575) {
      initSliders2();
   } else {
      destroySliders2();
   }
}

// Launch on page load
toggleSliders2();

// Unified event handling
function handleResizeAndOrientation() {
   toggleSliders();
   toggleSliders2();
}

window.addEventListener('resize', handleResizeAndOrientation);
window.addEventListener('orientationchange', handleResizeAndOrientation);

/* <- Reviews */