document.addEventListener('DOMContentLoaded', function() {
   const ratingBlocks = document.querySelectorAll('.first-block-content__blockItemBlockRating');

   if (ratingBlocks.length) {
       ratingBlocks.forEach(block => {
           // Получаем элемент для отображения рейтинга
           const ratingElement = block.querySelector('.rating-number');
           // Получаем звезды рейтинга
           const stars = block.querySelector('.rating-stars');

           // Проверяем, существует ли элемент с классом rating-stars перед доступом к его атрибуту
           if (stars) {
               // Получаем значение рейтинга из атрибута data-rating
               const ratingValue = stars.getAttribute('data-rating');

               // Проверяем, существует ли элемент и устанавливаем значение рейтинга
               if (ratingElement && ratingValue) {
                  ratingElement.textContent = ratingValue; // Добавляем значение рейтинга в элемент
               }

               const rating = parseFloat(ratingValue); // Преобразуем значение в число
               const filledStars = Math.floor(rating); // Количество полностью заполненных звезд
               const hasHalfStar = rating % 1 !== 0; // Проверка на наличие половинной звезды
               const starElements = stars.querySelectorAll('.star'); // Получаем все звезды

               // Заполняем звезды в зависимости от рейтинга
               starElements.forEach((star, index) => {
                  if (index < filledStars) {
                     star.setAttribute('fill', '#FFD93D'); // Заполненная звезда
                  } else if (index === filledStars && hasHalfStar) {
                     star.setAttribute('fill', '#FFD93D'); // Половина звезды
                     star.style.clipPath = 'inset(0 50% 0 0)'; // Обрезаем половинку
                  } else {
                     star.setAttribute('fill', '#E4E4E4'); // Пустая звезда
                  }
               });
           }
       });
   }
});