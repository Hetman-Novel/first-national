document.addEventListener('DOMContentLoaded', function() {

   // Функция для получения текущей даты в формате YYYY-MM-DD с учетом местного времени
   function getFormattedDate() {
     var today = new Date();
     var year = today.getFullYear();
     var month = String(today.getMonth() + 1).padStart(2, '0'); // Добавляем ведущий ноль
     var day = String(today.getDate()).padStart(2, '0'); // Добавляем ведущий ноль
     return `${year}-${month}-${day}`;
   }
   
   // calendar for first form
   var calendarEl = document.getElementById('calendar');
   if (calendarEl) {
     var dateInput = document.getElementById('fs-date');
     var selectedDateEl = null; // Сохраняем ссылку на предыдущую выбранную дату
   
     // Получаем текущую дату в формате YYYY-MM-DD с учетом местного времени
     var formattedToday = getFormattedDate();
   
     // Устанавливаем текущую дату в поле ввода
     dateInput.value = formattedToday;
   
     var calendar = new FullCalendar.Calendar(calendarEl, {
       initialView: 'dayGridMonth',
       selectable: true,
       dateClick: function(info) {
         // Убираем класс с предыдущей выбранной даты
         if (selectedDateEl) {
           selectedDateEl.classList.remove('selected-date');
         }
   
         // Добавляем класс к текущей выбранной дате
         var clickedDateEl = info.dayEl;
         clickedDateEl.classList.add('selected-date');
         selectedDateEl = clickedDateEl;
   
         // Добавляем выбранную дату в поле
         dateInput.value = info.dateStr;
       },
       // После рендеринга календаря добавляем класс к сегодняшней дате
       datesSet: function() {
         // Найдем элемент текущей даты
         var todayEl = calendarEl.querySelector('.fc-daygrid-day[data-date="' + formattedToday + '"]');
         if (todayEl) {
           todayEl.classList.add('selected-date');
           selectedDateEl = todayEl; // Сохраняем ссылку на текущую дату как выбранную
         }
       }
     });
   
     calendar.render();
   }
   
   // calendar for second form
   var calendarEl2 = document.getElementById('calendar2');
   if (calendarEl2) {
     var dateInput2 = document.getElementById('get-matched-date');
     var selectedDateEl2 = null; // Сохраняем ссылку на предыдущую выбранную дату
   
     // Получаем текущую дату в формате YYYY-MM-DD с учетом местного времени
     var formattedToday2 = getFormattedDate();
   
     // Устанавливаем текущую дату в поле ввода
     dateInput2.value = formattedToday2;
   
     var calendar2 = new FullCalendar.Calendar(calendarEl2, {
       initialView: 'dayGridMonth',
       selectable: true,
       dateClick: function(info) {
         // Убираем класс с предыдущей выбранной даты
         if (selectedDateEl2) {
           selectedDateEl2.classList.remove('selected-date');
         }
   
         // Добавляем класс к текущей выбранной дате
         var clickedDateEl2 = info.dayEl;
         clickedDateEl2.classList.add('selected-date');
         selectedDateEl2 = clickedDateEl2;
   
         // Добавляем выбранную дату в поле
         dateInput2.value = info.dateStr;
       },
       // После рендеринга календаря добавляем класс к сегодняшней дате
       datesSet: function() {
         // Найдем элемент текущей даты
         var todayEl2 = calendarEl2.querySelector('.fc-daygrid-day[data-date="' + formattedToday2 + '"]');
         if (todayEl2) {
           todayEl2.classList.add('selected-date');
           selectedDateEl2 = todayEl2; // Сохраняем ссылку на текущую дату как выбранную
         }
       }
     });
   
     calendar2.render();
   }
});