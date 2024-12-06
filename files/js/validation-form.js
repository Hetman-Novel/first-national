document.addEventListener('DOMContentLoaded', () => {
	// Get all forms on the page
	const forms = document.querySelectorAll('form');
	
	// Основная логика валидации форм
	forms.forEach((form) => {
		const submitButton = form.querySelector('[type="submit"]');
		const calculatorCheckbox = form.querySelector('#calculator-checkbox');
		
		// Состояние для каждого поля, чтобы валидация не происходила при загрузке страницы
		const isFieldTouched = new Set();
	 
		/**
		 * Обновление состояния кнопки submit.
		 */
		function updateSubmitButtonState() {
		  const isFormValid = Array.from(form.querySelectorAll('.validation-field'))
			 .every((validationBlock) => {
				return Array.from(validationBlock.querySelectorAll('input, textarea'))
				  .every((field) => validateField(field, validationBlock));
			 });
	 
		  const isCheckboxChecked = calculatorCheckbox ? calculatorCheckbox.checked : true;
		  submitButton.disabled = !(isFormValid && isCheckboxChecked);
		}
	 
		// Валидация полей в блоках validation-field
		form.querySelectorAll('.validation-field').forEach((validationBlock) => {
		  validationBlock.querySelectorAll('input, textarea').forEach((field) => {
			 /**
			  * Проверяет и обновляет классы поля и его блока, если произошло изменение.
			  */
			 const validateAndUpdate = () => {
				if (isFieldTouched.has(field)) {
				  // Проверяем поле, если оно уже было изменено
				  validateField(field, validationBlock);
				  updateSubmitButtonState();
				}
			 };
	 
			 // Обработчик фокуса для поля
			 field.addEventListener('focus', () => {
				isFieldTouched.add(field);  // Помечаем поле как изменённое
			 });
	 
			 // Обработчик ввода в поле
			 field.addEventListener('input', () => {
				isFieldTouched.add(field);  // Помечаем поле как изменённое
				validateAndUpdate();
			 });
	 
			 // Обработчик изменения значения поля
			 field.addEventListener('change', () => {
				isFieldTouched.add(field);  // Помечаем поле как изменённое
				validateAndUpdate();
			 });
	 
			 // Обработчик потери фокуса
			 field.addEventListener('blur', () => {
				validateAndUpdate();
			 });
	 
			 // Для телефонов: удаляем недопустимые символы
			 if (field.classList.contains('js-phone')) {
				field.addEventListener('input', () => {
				  field.value = field.value.replace(/[^0-9+]/g, '');
				});
			 }
	 
			 // Добавляем MutationObserver для отслеживания изменений атрибута value
			 const observer = new MutationObserver(() => {
				if (field.value.trim() !== "") {  // Проверяем, что поле не пустое
				  isFieldTouched.add(field);  // Помечаем поле как изменённое
				  validateAndUpdate();
				}
			 });
	 
			 // Настройка наблюдателя за атрибутом value
			 observer.observe(field, {
				attributes: true,
				attributeFilter: ['value'],
			 });
		  });
		});
	 
		// Валидация чекбокса
		if (calculatorCheckbox) {
		  calculatorCheckbox.addEventListener('change', updateSubmitButtonState);
		}
	 
		// Обработка отправки формы
		form.addEventListener('submit', (event) => {
		  event.preventDefault();
	 
		  if (!submitButton.disabled) {
			 const form = event.target;
	 
			 fetch(window.location.href, {
				method: 'POST',
				body: new FormData(form),
			 })
				.then((response) => {
				  if (response.ok) {
					 return response.text();
				  } else {
					 throw new Error('Ошибка при отправке формы');
				  }
				})
				.then((html) => {
				  console.log('Форма успешно отправлена');
				  form.reset();
				  updateSubmitButtonState();
				  console.log('Ответ сервера:', html);
				})
				.catch((error) => {
				  console.error('Произошла ошибка:', error);
				});
		  }
		});
	 
		// Инициализация состояния кнопки submit
		updateSubmitButtonState();
	 });
	 
	 /**
	  * Валидация одного поля.
	  * @param {HTMLInputElement|HTMLTextAreaElement} field - Поле для проверки.
	  * @param {HTMLElement} validationBlock - Блок validation-field, содержащий поле.
	  * @returns {boolean} - Валидно ли поле.
	  */
	 function validateField(field, validationBlock) {
		// Проверяем, если поле скрыто, пропускаем его валидацию, но если в нем есть значение, добавляем класс valid
		if (field.offsetParent === null) {
			if (field.value.trim()) {
			  validationBlock.classList.add('valid');
			  validationBlock.classList.remove('no-valid');
			}
			return true;
		 }

		let isFieldValid = true;
	 
		// Проверка заполненности
		if (!field.value.trim()) {
		  isFieldValid = false;
		}
	 
		// Дополнительные проверки для email и телефона
		if (field.classList.contains('js-email') && !isValidEmail(field.value)) {
		  isFieldValid = false;
		}
	 
		if (field.classList.contains('js-phone') && !isValidPhone(field.value)) {
		  isFieldValid = false;
		}
	 
		// Обновление классов у блока validation-field
		if (isFieldValid) {
		  validationBlock.classList.add('valid');
		  validationBlock.classList.remove('no-valid');
		} else {
		  validationBlock.classList.add('no-valid');
		  validationBlock.classList.remove('valid');
		}
	 
		return isFieldValid;
	 }
	 
	 /**
	  * Проверка валидности email.
	  * @param {string} email - Email для проверки.
	  * @returns {boolean} - Валиден ли email.
	  */
	 function isValidEmail(email) {
		return /^[a-zA-Z0-9._%+-]+@/.test(email);
	 }
	 
	 /**
	  * Проверка валидности телефона.
	  * @param {string} phone - Телефон для проверки.
	  * @returns {boolean} - Валиден ли телефон.
	  */
	 function isValidPhone(phone) {
		return /^\+?\d{4,}$/.test(phone);
	 }
  
  
	
	
	
	
	
	
	
	
	
	
	
	
	
	// Logic of form steps (step switching)
	forms.forEach((form) => {
		form.addEventListener('click', (event) => {
			const nextButton = event.target.closest('[data-step-button]');
			if (nextButton) {
				const stepBlockValue = nextButton.getAttribute('data-step-button');
				const parentStep = nextButton.closest('.js-step');

				// If the step is valid, switch to the next one
				if (parentStep && parentStep.classList.contains('step-valid')) {
					handleStepChange(form, stepBlockValue, 'next');
				}
			}

			// Return to the previous step
			document.addEventListener('click', function (event) {
				// Check if the event is related to the back button
				const backButton = event.target.closest('[data-step-back-button]');
				if (backButton) {
					// Get the value of the data-step-back-button attribute
					const stepBlockValue = backButton.getAttribute('data-step-back-button');
					
					// Make sure the attribute value is not empty
					if (stepBlockValue) {
						handleStepChange(form, stepBlockValue, 'back');
					} else {
						//console.error('Missing value in attribute data-step-back-button');
					}
				}
			});
		});
	});

	/**
	 * Переключение между шагами формы.
	 * @param {HTMLElement} form - Форма.
	 * @param {string} stepBlockValue - Значение data-step-block.
	 * @param {string} direction - Направление переключения (next/back).
	 */
	function handleStepChange(form, stepBlockValue, direction) {
		const currentBlock = form.querySelector(`[data-step-block="${stepBlockValue}"]`);
		if (!currentBlock) return;

		// Скрываем все шаги и показываем текущий
		form.querySelectorAll('[data-step-block]').forEach((block) => block.classList.remove('step-active'));
		currentBlock.classList.add('step-active');
	}
	






	/* Логика календаря -> */

	document.querySelectorAll('.js-block-date').forEach((block) => {
		const dateInput = block.querySelector('.js-date'); // Поле для ввода даты
		const calendarContainer = block.querySelector('.calendar-container'); // Контейнер календаря

		if (!dateInput || !calendarContainer) return;

		// Инициализация FullCalendar
		const calendar = new FullCalendar.Calendar(calendarContainer, {
			initialView: 'dayGridMonth',
			selectable: true,
			dateClick: function (info) {
				const clickedDate = new Date(info.dateStr); // Получаем дату из календаря

				if (!isNaN(clickedDate)) {
						// Форматируем дату в формате dd/mm/yyyy
						const formattedDate = getFormattedDate(clickedDate);

						// Вставляем дату в поле и атрибут value
						dateInput.value = formattedDate; // Обновляем текстовое значение
						dateInput.setAttribute('value', formattedDate); // Обновляем атрибут value

						// Валидация поля
						validateField(dateInput, block); // Валидация после вставки даты
				}

				// Снимаем фокус с поля после выбора даты
				dateInput.blur();
			},
		});

		calendar.render();

		// Форматирование даты в формат dd/mm/yyyy
		function getFormattedDate(date) {
			const day = String(date.getDate()).padStart(2, '0'); // Добавляем ведущий ноль к дню
			const month = String(date.getMonth() + 1).padStart(2, '0'); // Добавляем ведущий ноль к месяцу
			const year = date.getFullYear();
			return `${day}/${month}/${year}`;
		}

		// События focus и blur для поля js-date
		if (dateInput.classList.contains('js-date')) {
			dateInput.addEventListener('focus', () => {
					block.classList.add('date-field-in-focus');
			});

			dateInput.addEventListener('blur', () => {
					block.classList.remove('date-field-in-focus');
					validateField(dateInput, block); // Вызываем валидацию
			});
		}

		// Валидация поля
		function validateField(field, parentBlock) {
			if (field.value.trim() === '') {
				parentBlock.classList.add('no-valid');
				parentBlock.classList.remove('valid');
			} else {
				parentBlock.classList.add('valid');
				parentBlock.classList.remove('no-valid');
			}
		}
	});

	/* <- Логика календаря */

	
	/* Валидация блока .js-step -> */
	document.querySelectorAll('.js-step').forEach((step) => {
		// Функция для обновления состояния текущего шага
		const updateStepState = () => {
			// Получаем все блоки с полями для валидации (validation-field и js-block-date)
			const validationBlocks = step.querySelectorAll('.validation-field');
			const dateBlocks = step.querySelectorAll('.js-block-date');
			
			// Проверяем, все ли блоки validation-field и js-block-date имеют класс valid
			const allValidationValid = Array.from(validationBlocks).every(block => block.classList.contains('valid'));
			const allDateValid = Array.from(dateBlocks).every(block => block.classList.contains('valid'));
		
			// Если все блоки valid, добавляем step-valid
			if (allValidationValid && allDateValid) {
				step.classList.add('step-valid');
				step.classList.remove('step-no-valid');
			} else {
				// Если хотя бы один блок с классом validation-field или js-block-date имеет no-valid
				if (isInteracted(validationBlocks, dateBlocks)) {
				step.classList.add('step-no-valid');
				}
				step.classList.remove('step-valid');
			}
		};
		
		// Функция для проверки, были ли изменения в блоках
		const isInteracted = (validationBlocks, dateBlocks) => {
			return [...validationBlocks, ...dateBlocks].some(block => block.classList.contains('no-valid'));
		};
		
		// Добавляем наблюдателей за изменениями классов в блоках validation-field и js-block-date
		const observeChanges = (block) => {
			const observer = new MutationObserver(updateStepState);
		
			observer.observe(block, {
				attributes: true,
				attributeFilter: ['class']
			});
		};
		
		// Наблюдаем за всеми блоками validation-field и js-block-date в текущем шаге
		step.querySelectorAll('.validation-field, .js-block-date').forEach((block) => {
			observeChanges(block);
		});
		
		// Изначально обновляем состояние текущего шага при загрузке
		updateStepState();
	});	 
	/* <- Валидация блока .js-step */


	/* Подсветить номер шага .js-step-numbers */
	 document.querySelectorAll('[data-step-button]').forEach(button => {
		button.addEventListener('click', () => {
		  const stepBlock = button.closest('.step-valid'); // Находим ближайший родительский блок с классом step-valid
		  if (!stepBlock) return; // Если клик не внутри блока с классом step-valid, ничего не делаем
	 
		  const stepNumber = button.getAttribute('data-step-button'); // Получаем текущий шаг из атрибута data-step-button
		  const stepNumbers = document.querySelectorAll('.js-step-numbers [data-step-number]'); // Находим все элементы с data-step-number
	 
		  // Удаляем класс 'active' у всех шагов перед текущим шагом
		  stepNumbers.forEach(step => {
			 const currentStepNumber = step.getAttribute('data-step-number');
			 
			 // Если номер шага меньше текущего, добавляем класс active
			 if (parseInt(currentStepNumber.replace('step-', '')) < parseInt(stepNumber.replace('step-', ''))) {
				step.classList.add('active');
			 } else {
				step.classList.remove('active');
			 }
		  });
		});
	 });
	 
	 // Обработка кнопок для обратного перехода
	 document.querySelectorAll('[data-step-back-button]').forEach(button => {
		button.addEventListener('click', () => {
		  const stepNumber = button.getAttribute('data-step-back-button'); // Получаем текущий шаг из атрибута data-step-back-button
		  const stepNumbers = document.querySelectorAll('.js-step-numbers [data-step-number]'); // Находим все элементы с data-step-number
	 
		  // Удаляем класс 'active' у всех шагов, начиная с текущего
		  stepNumbers.forEach(step => {
			 const currentStepNumber = step.getAttribute('data-step-number');
			 
			 // Если номер шага больше или равен текущему, удаляем класс active
			 if (parseInt(currentStepNumber.replace('step-', '')) >= parseInt(stepNumber.replace('step-', ''))) {
				step.classList.remove('active');
			 }
		  });
		});
	 });
	 
	 

	/* <- Подсветить номер шага .js-step-numbers */

});