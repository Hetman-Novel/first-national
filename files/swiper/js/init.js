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