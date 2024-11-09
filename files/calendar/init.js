document.addEventListener('DOMContentLoaded', function() {

	/* for the calendar in the header -> */

	function getFormattedDate(date) {
		if (!(date instanceof Date) || isNaN(date)) {
			return '';
		}
		var day = String(date.getDate()).padStart(2, '0');
		var month = String(date.getMonth() + 1).padStart(2, '0');
		var year = date.getFullYear();
		return `${day}/${month}/${year}`;
  	}
  
  	// calendar
  	var calendarEl = document.getElementById('calendar');
  	if (calendarEl) {
		var dateInput = document.getElementById('f-date');
		var selectedDateEl = null;
  
		var calendar = new FullCalendar.Calendar(calendarEl, {
			 initialView: 'dayGridMonth',
			 selectable: true,
			 dateClick: function(info) {
				  if (selectedDateEl) {
						selectedDateEl.classList.remove('selected-date');
				  }

				  var clickedDateEl = info.dayEl;
				  clickedDateEl.classList.add('selected-date');
				  selectedDateEl = clickedDateEl;
  
				  var clickedDate = new Date(info.dateStr);
				  if (!isNaN(clickedDate)) {
						dateInput.value = getFormattedDate(clickedDate);
				  } else {
						console.error("Incorrect date: " + info.dateStr);
				  }
  
				  var stepDateParent = dateInput.closest('.step-date');
				  if (stepDateParent) {
						stepDateParent.classList.remove('date-field-in-focus');
						
						if (stepDateParent.classList.contains('no-valid')) {
							stepDateParent.classList.replace('no-valid', 'valid');
						} else {
							stepDateParent.classList.add('valid');
						}
				  }
  
				  dateInput.blur();
			 },
  
			 datesSet: function() {
				  // Do not add the current date to the field, only when selected
			 }
		});
  
		calendar.render();
   }

	/* <- for the calendar in the header */

	/* for calendar in content -> */

	function getFormattedDate(date) {
		if (!(date instanceof Date) || isNaN(date)) {
			 return ''; // Возвращаем пустую строку, если дата некорректна
		}
  
		var day = String(date.getDate()).padStart(2, '0'); // Добавляем ведущий ноль
		var month = String(date.getMonth() + 1).padStart(2, '0'); // Добавляем ведущий ноль
		var year = date.getFullYear();
		return `${day}/${month}/${year}`; // Возвращаем в формате dd/mm/yyyy
  }
  
   // calendar
   var calendarEl2 = document.getElementById('calendar2');
   if (calendarEl2) {
		var dateInput2 = document.getElementById('get-matched-date');
		var selectedDateEl2 = null;
  
		var calendar2 = new FullCalendar.Calendar(calendarEl2, {
			 initialView: 'dayGridMonth',
			 selectable: true,
			 dateClick: function(info) {
				  if (selectedDateEl2) {
						selectedDateEl2.classList.remove('selected-date');
				  }
				  var clickedDateEl2 = info.dayEl;
				  clickedDateEl2.classList.add('selected-date');
				  selectedDateEl2 = clickedDateEl2;
  
				  var clickedDate = new Date(info.dateStr);
				  if (!isNaN(clickedDate)) {
						dateInput2.value = getFormattedDate(clickedDate);
				  } else {
						console.error("Incorrect date: " + info.dateStr);
				  }
  
				  var stepDateParent2 = dateInput2.closest('.step2-date');
				  if (stepDateParent2) {
						if (stepDateParent2.classList.contains('no-valid')) {
							 stepDateParent2.classList.replace('no-valid', 'valid');
						} else {
							 stepDateParent2.classList.add('valid');
						}
				  }
			 },
  
			 datesSet: function() {
				  // Do not add the current date to the field, only when selected
			 }
		});
  
		calendar2.render();
   }
	/* <- for calendar in content */
});