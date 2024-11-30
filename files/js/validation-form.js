document.addEventListener('DOMContentLoaded', () => {
	// Получаем все формы на странице
	const forms = document.querySelectorAll('form');
	
	// Основная логика валидации форм
	forms.forEach((form) => {
		 // Валидация при клике на кнопку
		 form.addEventListener('click', (event) => {
			  const button = event.target.closest('.js-validity-check');
			  if (button) {
					const parentStep = button.closest('.js-step');
					if (parentStep) {
						 validateStep(parentStep, form);
					}
			  }
		 });
	
		 // Валидация в реальном времени
		 form.querySelectorAll('input, select, textarea').forEach((field) => {
			  field.addEventListener('input', () => validateField(field, form));
	
			  // Для телефонов: удаляем недопустимые символы
			  if (field.classList.contains('js-phone')) {
					field.addEventListener('input', () => {
						 field.value = field.value.replace(/[^0-9+]/g, '');
					});
			  }
	
			  // Событие для select2
			  if (field.tagName === 'SELECT') {
					$(field).on('select2:select select2:unselect', () => {
						 validateField(field, form);
					});
			  }
	
			  // Событие для js-date
			  if (field.classList.contains('js-date')) {
					field.addEventListener('focus', () => {
						 field.parentNode.parentNode.classList.add('date-field-in-focus');
					});
	
					field.addEventListener('blur', () => {
						 field.parentNode.parentNode.classList.remove('date-field-in-focus');
						 validateField(field, form); // Валидация после завершения ввода
					});
			  }
		 });
	});
	
	/**
	 * Валидация одного блока (шаг формы).
	 * @param {HTMLElement} stepElement - Блок для проверки.
	 * @param {HTMLFormElement} form - Текущая форма.
	 */
	function validateStep(stepElement, form) {
		 let isStepValid = true;
		 const fields = stepElement.querySelectorAll('input, select, textarea');
		 fields.forEach((field) => {
			  if (!validateField(field, form)) {
					isStepValid = false;
			  }
		 });
	
		 // Обновляем состояние валидности шага
		 stepElement.classList.toggle('step-valid', isStepValid);
	}
	
	/**
	 * Валидация одного поля.
	 * @param {HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement} field - Поле для проверки.
	 * @param {HTMLFormElement} form - Текущая форма.
	 * @returns {boolean} - Валидно ли поле.
	 */
	function validateField(field, form) {
		 let isFieldValid = true;
	
		 // Проверка для select
		 if (field.tagName === 'SELECT' && !field.value) {
			  isFieldValid = false;
		 }
	
		 // Проверка для input
		 if (field.tagName === 'INPUT') {
			  if (!field.value.trim()) {
					isFieldValid = false;
			  }
	
			  // Проверка для email
			  if (field.classList.contains('js-email') && !isValidEmail(field.value)) {
					isFieldValid = false;
			  }
	
			  // Проверка для телефона
			  if (field.classList.contains('js-phone') && !isValidPhone(field.value)) {
					isFieldValid = false;
			  }
		 }
	
		 // Проверка для textarea
		 if (field.tagName === 'TEXTAREA' && !field.value.trim()) {
			  isFieldValid = false;
		 }
	
		 // Обновляем классы valid и no-valid
		 const parent = field.closest('.form-group') || field.parentNode; // Родительский элемент
		 if (parent) {
			  parent.classList.toggle('valid', isFieldValid);
			  parent.classList.toggle('no-valid', !isFieldValid);
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
	
	
	
	
	
	
	
	
	
	
	
	
	
	
		// Логика шагов формы (переключение шагов)
		forms.forEach((form) => {
			form.addEventListener('click', (event) => {
				const nextButton = event.target.closest('[data-step-button]');
				if (nextButton) {
					const stepBlockValue = nextButton.getAttribute('data-step-button');
					const parentStep = nextButton.closest('.js-step');
	
					// Если шаг валиден, переключаемся на следующий
					if (parentStep && parentStep.classList.contains('step-valid')) {
						handleStepChange(form, stepBlockValue, 'next');
					}
				}
	
				// Возврат на предыдущий шаг
				const backButton = event.target.closest('[data-step-back-button]');
				if (backButton) {
					const stepBlockValue = backButton.getAttribute('data-step-back-button');
					handleStepChange(form, stepBlockValue, 'back');
				}
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
const blocks = document.querySelectorAll('.js-block-date');
	
blocks.forEach((block) => {
	const dateInput = block.querySelector('.js-date');
	const calendarContainer = block.querySelector('.calendar-container');

	if (!dateInput || !calendarContainer) return;

	// Инициализация FullCalendar
	const calendar = new FullCalendar.Calendar(calendarContainer, {
		initialView: 'dayGridMonth',
		selectable: true,
		dateClick: (info) => {
			const clickedDate = new Date(info.dateStr);
			if (!isNaN(clickedDate)) {
				dateInput.value = getFormattedDate(clickedDate);

				// Успешная валидация при выборе даты
				block.classList.add('valid');
				block.classList.remove('no-valid');
			} else {
				console.error('Некорректная дата:', info.dateStr);
			}
			dateInput.blur(); // Снятие фокуса с поля
		},
	});

	calendar.render();

		/**
		 * Форматирование даты.
		 * @param {Date} date - Дата.
		 * @returns {string} - Форматированная дата.
		 */
		function getFormattedDate(date) {
			const day = String(date.getDate()).padStart(2, '0');
			const month = String(date.getMonth() + 1).padStart(2, '0');
			const year = date.getFullYear(4, '0');
			return `${day}/${month}/${year}`;
		}
});

/* <- Логика календаря */







		/* Валидация блока .js-step -> */
   // Получаем все блоки с классом .js-step
	const steps = document.querySelectorAll('.js-step');

	// Обрабатываем клик по кнопке внутри блока .js-step
	steps.forEach(step => {
		 const button = step.querySelector('button');  // Ищем кнопку в блоке

		 if (button) {
			  // Слушаем клик по кнопке
			  button.addEventListener('click', () => {
					validateStep(step);  // Проверяем валидность шага при клике на кнопку
			  });
		 }

		 // Слушаем изменение полей внутри блока .js-step
		 step.querySelectorAll('input, select, textarea').forEach(field => {
			  field.addEventListener('input', () => {
					validateStep(step);  // Проверка валидности при вводе
			  });

			  // Для select2 (если используется)
			  if (field.tagName === 'SELECT') {
					$(field).on('select2:select select2:unselect', () => {
						 validateStep(step);  // Проверка при изменении выбора
					});
			  }
		 });
	});

	/**
	 * Валидация всего шага.
	 * Проверяет все поля в шаге и обновляет классы на основе их валидности.
	 * @param {HTMLElement} stepElement - Шаг, который нужно проверить.
	 */
	function validateStep(stepElement) {
		 let isStepValid = true;
		 
		 // Получаем все поля в шаге для проверки
		 const fields = stepElement.querySelectorAll('input, select, textarea');
		 fields.forEach(field => {
			  if (!validateField(field)) {
					isStepValid = false;  // Если хотя бы одно поле не валидно
			  }
		 });

		 // Обновляем классы для шага
		 if (isStepValid) {
			  stepElement.classList.add('step-valid');
			  stepElement.classList.remove('step-no-valid');
		 } else {
			  stepElement.classList.add('step-no-valid');
			  stepElement.classList.remove('step-valid');
		 }
	}

	/**
	 * Валидация одного поля.
	 * Проверяет, является ли поле валидным.
	 * @param {HTMLElement} field - Поле для проверки.
	 * @returns {boolean} - Валиден ли элемент.
	 */
	function validateField(field) {
		 let isValid = true;

		 // Для текстовых полей и textarea проверяем, что они не пустые
		 if (field.tagName === 'INPUT' || field.tagName === 'TEXTAREA') {
			  if (!field.value.trim()) {
					isValid = false;
			  }
		 }

		 // Для select проверяем, что значение выбрано
		 if (field.tagName === 'SELECT' && !field.value) {
			  isValid = false;
		 }

		 // Дополнительные проверки для специфических классов
		 if (field.classList.contains('js-email') && !isValidEmail(field.value)) {
			  isValid = false;
		 }

		 if (field.classList.contains('js-phone') && !isValidPhone(field.value)) {
			  isValid = false;
		 }

		 // Добавляем классы для поля
		 const parent = field.closest('.form-group') || field.parentNode;  // Родительский элемент поля
		 if (parent) {
			  parent.classList.toggle('valid', isValid);
			  parent.classList.toggle('no-valid', !isValid);
		 }

		 return isValid;
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

		/* <- Валидация блока .js-step */











		/* Подсветить номер шага .js-step-number */
    // Получаем все блоки с классом js-steps-numbers на странице
   /* const stepsNumberBlocks = document.querySelectorAll('.js-steps-numbers');

    // Обрабатываем клик по кнопкам внутри каждого блока
    stepsNumberBlocks.forEach(block => {
        const stepButtons = block.querySelectorAll('[data-step-button]');
        
        stepButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Получаем номер шага из атрибута data-step-button
                const stepNumber = button.getAttribute('data-step-button').replace('step-', '');

                // Находим родительский блок с классом js-step, где происходит обработка
                const formBlock = block.closest('.js-form-step-container'); // Найдем контейнер с шагами

                // Обновляем классы для текущего шага в блоке js-steps-numbers
                updateStepNumbers(formBlock, stepNumber);

                // Проверяем состояние полей и обновляем классы active-number для шагов
                validateStepNumbers(formBlock);
            });
        });
    });

    /**
     * Обновление классов для js-step-number в блоке js-steps-numbers.
     * Добавляем класс active-number к элементу с номером шага.
     * @param {Element} formBlock - Родительский блок формы.
     * @param {string} stepNumber - Номер текущего шага.
     */
    /*function updateStepNumbers(formBlock, stepNumber) {
        // Получаем блок с классом js-steps-numbers в родительском блоке формы
        const stepsNumbers = formBlock.querySelector('.js-steps-numbers');

        if (stepsNumbers) {
            // Получаем все элементы с классом js-step-number в блоке
            const stepItems = stepsNumbers.querySelectorAll('.js-step-number');

            // Для каждого элемента js-step-number проверяем, нужно ли добавить класс active-number
            stepItems.forEach((stepItem, index) => {
                // Индекс элемента + 1, так как индексация начинается с 0, а шаги начинаются с 1
                if (index + 1 === parseInt(stepNumber)) {
                    stepItem.classList.add('active-number');
                } else {
                    stepItem.classList.remove('active-number');
                }
            });
        }
    }

    /**
     * Проверка валидности полей формы и обновление классов active-number для шагов.
     * @param {Element} formBlock - Родительский блок формы.
     */
   /* function validateStepNumbers(formBlock) {
        // Получаем все поля формы внутри блока
        const formFields = formBlock.querySelectorAll('select, select2, input, textarea');
        
        // Флаг для проверки всех полей
        let allValid = true;

        // Проходим по всем полям формы
        formFields.forEach(field => {
            if (!isFieldValid(field)) {
                allValid = false;
            }
        });

        // Получаем блок с классом js-steps-numbers в родительском блоке
        const stepsNumbers = formBlock.querySelector('.js-steps-numbers');
        if (stepsNumbers) {
            // Получаем все элементы с классом js-step-number в блоке
            const stepItems = stepsNumbers.querySelectorAll('.js-step-number');

            // Проверяем, нужно ли добавлять или удалять класс active-number для каждого шага
            stepItems.forEach((stepItem, index) => {
                if (allValid && index + 1 === parseInt(stepItems.length)) {
                    // Если все поля валидны, добавляем класс active-number
                    stepItem.classList.add('active-number');
                } else {
                    // Если хотя бы одно поле невалидно, удаляем класс active-number
                    stepItem.classList.remove('active-number');
                }
            });
        }
    }

    /**
     * Проверка состояния одного поля (валидность).
     * @param {Element} field - Поле формы.
     * @returns {boolean} - True, если поле валидно, иначе false.
     */
    /*function isFieldValid(field) {
        if (field.tagName === 'SELECT' || field.classList.contains('select2')) {
            return field.value !== ''; // Проверка для select и select2
        } else if (field.tagName === 'TEXTAREA' || field.tagName === 'INPUT') {
            return field.value.trim() !== ''; // Проверка для input и textarea
        }
        return true;
    }
	 */
		/* <- Подсветить номер шага .js-step-number */
	












		// Отключение отправки форм, если шаг не валиден
		forms.forEach((form) => {
			form.addEventListener('submit', (event) => {
				event.preventDefault();
				console.log('Форма отправлена');
			});
		});
	});