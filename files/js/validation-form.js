$(document).ready(function() {
	// Обработчик для формы с ID fs-form
	$('#fs-form').on('submit', function(event) {
		event.preventDefault(); // Предотвращаем перезагрузку страницы

		// Логика отправки формы через AJAX
		console.log('Форма fs-form отправлена!');

		$('.first-screen__blockWrapForm').addClass('sent-successfully');
		setTimeout(function() {
			$('.first-screen__blockWrapForm').removeClass('sent-successfully');
		}, 3000);
		setTimeout(function() {
			//$('#fs-wrapper-steps').removeClass('step-7');
		  	//$('#fs-wrapper-steps').addClass('step-1');
		}, 600);

		// Сброс всех input и textarea в форме
		//$('#fs-form').find('input[type="text"], input[type="email"], textarea').val('');

		/*
		 setTimeout(function() {
			// Сброс Select2
			$('#fs-form').find('select').val(null).trigger('change').trigger('select2:unselect');
		}, 600);*/
	});

	// Обработчик для формы с ID get-matched-form
	$('#get-matched-form').on('submit', function(event) {
		 event.preventDefault(); // Предотвращаем перезагрузку страницы

		// Логика отправки формы через AJAX
		console.log('Форма get-matched-form отправлена!');
		
		$('.get-matched__blockWrapForm').addClass('sent-successfully');
		setTimeout(function() {
			$('.get-matched__blockWrapForm').removeClass('sent-successfully');
		}, 3000);
		setTimeout(function() {
			//$('#fs-wrapper-steps2').removeClass('step-7');
		  	//$('#fs-wrapper-steps2').addClass('step-1');
		}, 600);

		/*
		// Сброс всех input и textarea в форме
		$('#get-matched-form').find('input[type="text"], input[type="email"], textarea').val('');

		// Сброс Select2
		$('#get-matched-form').find('select').val(null).trigger('change').trigger('select2:unselect');
		*/

	});

});

// Форма в первом блоке
const fsForm = document.getElementById('fs-form');
if (fsForm) {
	const wizardWrapper = document.getElementById('fs-wrapper-steps');
	let currentStepIndex = 1;
	const totalStepsCount = 7; // Общее количество шагов

	// Функция для валидации текущего шага
	function validateCurrentStep(stepElement) {
		if (!stepElement) return false; // Если stepElement не существует, возвращаем false

		let isValid = true;
		const fields = stepElement.querySelectorAll('input, select');

		fields.forEach((field) => {
			if (field.tagName === 'SELECT') {
				if (!field.value) {
					isValid = false;
				}
			} else if (!field.value.trim()) { // Проверка на пустое значение
				isValid = false;
			}

			// Дополнительная валидация для специфических полей
			if (field.id === 'f-email' && !isValidEmail(field.value)) {
				isValid = false;
			}

			if (field.id === 'f-phone' && !isValidPhone(field.value)) {
				isValid = false;
			}
		});

		return isValid;
	}

	// Функция для проверки валидности email
	function isValidEmail(email) {
		const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|example\.com)$/; // Добавьте другие домены при необходимости
		return emailRegex.test(email);
	}

	// Функция для проверки валидности телефона
	function isValidPhone(phone) {
		const phoneRegex = /^\+?\d{4,}$/;
		return phoneRegex.test(phone);
	}

	// Функция для перехода на следующий шаг с проверкой валидации
	function goToNextStep(nextStepIndex, stepElement) {
		const isValid = validateCurrentStep(stepElement); // Проверка валидации текущего блока

		if (isValid) {
			// Если шаг валиден и следующий шаг в пределах допустимого диапазона
			if (nextStepIndex === currentStepIndex + 1 && currentStepIndex < totalStepsCount) {
				wizardWrapper.classList.remove(`step-${currentStepIndex}`);
				currentStepIndex = nextStepIndex;
				wizardWrapper.classList.add(`step-${currentStepIndex}`);
			}
		} else {
			if (stepElement) {
				stepElement.classList.add('no-valid'); // Добавляем класс no-valid, если не валидно
			}
		}
	}

	// Функция для перехода на предыдущий шаг
	function goToPreviousStep(previousStepIndex) {
		if (previousStepIndex < currentStepIndex && previousStepIndex >= 1) {
			wizardWrapper.classList.remove(`step-${currentStepIndex}`);
			currentStepIndex = previousStepIndex;
			wizardWrapper.classList.add(`step-${currentStepIndex}`);
		}
	}

	// Обработчики кликов на кнопки "вперед"
	document.getElementById('fs-btn-next-2').addEventListener('click', () => {
		const stepElement = document.querySelector('.step.step-2');
		goToNextStep(2, stepElement);
	});
	document.getElementById('fs-btn-next-3').addEventListener('click', () => {
		const stepElement = document.querySelector('.step.step-3');
		goToNextStep(3, stepElement);
	});
	document.getElementById('fs-btn-next-4').addEventListener('click', () => {
		const stepElement = document.querySelector('.step.step-4');
		goToNextStep(4, stepElement);
	});
	document.getElementById('fs-btn-next-5').addEventListener('click', () => {
		const stepElement = document.querySelector('.step.step-5');
		goToNextStep(5, stepElement);
	});
	document.getElementById('fs-btn-next-6').addEventListener('click', () => {
		const stepElement = document.querySelector('.step.step-6');
		goToNextStep(6, stepElement);
	});

	// Обработчики кликов на кнопки "назад"
	document.getElementById('fs-btn-back-1').addEventListener('click', () => goToPreviousStep(1));
	document.getElementById('fs-btn-back-2').addEventListener('click', () => goToPreviousStep(2));
	document.getElementById('fs-btn-back-3').addEventListener('click', () => goToPreviousStep(3));
	document.getElementById('fs-btn-back-4').addEventListener('click', () => goToPreviousStep(4));
	document.getElementById('fs-btn-back-5').addEventListener('click', () => goToPreviousStep(5));
	document.getElementById('fs-btn-back-6').addEventListener('click', () => goToPreviousStep(6));

	// Изначально блокируем кнопку отправки
	const submitBtn = document.getElementById('fs-btn-submit');
	submitBtn.disabled = true; // Блокируем кнопку

	// Обработчик отправки формы
	submitBtn.addEventListener('click', (event) => {
		const phoneField = document.getElementById('f-phone');
		const stepElement = document.querySelector('.step.step-7');

		// Проверка валидности телефона
		if (!phoneField.value.trim() || !isValidPhone(phoneField.value)) {
			event.preventDefault(); // Предотвращаем отправку формы, если телефон не валиден
			phoneField.closest('.step').classList.add('no-valid'); // Добавляем класс no-valid, если не валидно
		} else {
			phoneField.closest('.step').classList.remove('no-valid'); // Удаляем класс no-valid, если валидно
			phoneField.closest('.step').classList.add('valid'); // Добавляем класс valid при успешной валидации
			console.log('Форма успешно отправлена!'); // Замените это своей логикой отправки формы

			// Здесь можно добавить логику для отправки формы
			// Например, getMatchedForm.submit(); // Если вы хотите отправить форму
		}
	});

	// Обработчик событий DOMContentLoaded
	document.addEventListener('DOMContentLoaded', function () {
		const validationElements = document.querySelectorAll('.step');

		validationElements.forEach((stepElement) => {
			const fields = stepElement.querySelectorAll('input, select');

			fields.forEach((field) => {
				field.addEventListener('input', validateInputField);

				// Для поля телефона, чтобы исключить ввод всего, кроме цифр и символа +
				if (field.id === 'f-phone') {
					field.addEventListener('input', function () {
						this.value = this.value.replace(/[^0-9+]/g, '');
					});
				}

				if (field.value.trim() !== '') {
					stepElement.classList.add('valid'); // Добавляем класс valid, если поле не пустое
				}
			});

			// Select2 integration for change event
			if ($(stepElement).find('select').length) {
				$(stepElement).find('select').select2().on('change', function () {
					validateInputField.call(this);
				});
			}

			const validationButton = stepElement.querySelector('.used-for-validation');
			validationButton.addEventListener('click', function () {
				goToNextStep(currentStepIndex + 1, stepElement); // Переход к следующему шагу
			});
		});

		// Функция для валидации полей
		function validateInputField() {
			const stepElement = this.closest('.step');
			const parentElement = stepElement;
			const isValid = validateCurrentStep(stepElement);

			// Проверка email
			if (this.id === 'f-email') {
				if (!isValidEmail(this.value)) {
					parentElement.classList.remove('valid');
					parentElement.classList.add('no-valid');
				} else {
					parentElement.classList.remove('no-valid');
					parentElement.classList.add('valid');
				}
				return;
			}

			// Проверка телефона
			if (this.id === 'f-phone') {
				if (!this.value.trim()) {
					// Если поле пустое, удаляем класс valid и добавляем no-valid
					parentElement.classList.remove('valid');
					parentElement.classList.add('no-valid');
				} else if (!isValidPhone(this.value)) {
					// Если номер телефона не валиден, удаляем класс valid и добавляем no-valid
					parentElement.classList.remove('valid');
					parentElement.classList.add('no-valid');
				} else {
					// Если номер телефона валиден
					parentElement.classList.remove('no-valid');
					parentElement.classList.add('valid');
				}
				return;
			}

			// Проверка пустых значений для всех других полей
			if (!this.value.trim() && this.value.trim() === '') {
				parentElement.classList.remove('valid');
				parentElement.classList.add('no-valid');
			} else {
				parentElement.classList.remove('no-valid');
				parentElement.classList.add('valid');
			}

			// Проверка состояния кнопки отправки
			submitBtn.disabled = [...document.querySelectorAll('.step')].some(step => step.classList.contains('no-valid'));
		}
	});
}

// Вторая форма где-то в середине странице
const getMatchedForm = document.getElementById('get-matched-form');
if (getMatchedForm) {
	const wizardWrapper2 = document.getElementById('fs-wrapper-steps2');
	let currentStepIndex2 = 1;
	const totalStepsCount2 = 7; // Общее количество шагов

	// Функция для валидации текущего шага
	function validateCurrentStep2(stepElement2) {
		if (!stepElement2) return false; // Если stepElement не существует, возвращаем false

		let isValid2 = true;
		const fields2 = stepElement2.querySelectorAll('input, select');

		fields2.forEach((field2) => {
			if (field2.tagName === 'SELECT') {
				if (!field2.value) {
					isValid2 = false;
				}
			} else if (!field2.value.trim()) { // Проверка на пустое значение
				isValid2 = false;
			}

			// Дополнительная валидация для специфических полей
			if (field2.id === 'get-matched-email' && !isValidEmail2(field2.value)) {
				isValid2 = false;
			}

			if (field2.id === 'get-matched-phone' && !isValidPhone2(field2.value)) {
				isValid2 = false;
			}
		});

		return isValid2;
	}

	// Функция для проверки валидности email
	function isValidEmail2(email2) {
		const emailRegex2 = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|example\.com)$/; // Добавьте другие домены при необходимости
		return emailRegex2.test(email2);
	}

	// Функция для проверки валидности телефона
	function isValidPhone2(phone2) {
		const phoneRegex2 = /^\+?\d{4,}$/;
		return phoneRegex2.test(phone2);
	}

	// Функция для перехода на следующий шаг с проверкой валидации
	function goToNextStep2(nextStepIndex2, stepElement2) {
		const isValid2 = validateCurrentStep2(stepElement2); // Проверка валидации текущего блока

		if (isValid2) {
			// Если шаг валиден и следующий шаг в пределах допустимого диапазона
			if (nextStepIndex2 === currentStepIndex2 + 1 && currentStepIndex2 < totalStepsCount2) {
				wizardWrapper2.classList.remove(`step2-${currentStepIndex2}`);
				currentStepIndex2 = nextStepIndex2;
				wizardWrapper2.classList.add(`step2-${currentStepIndex2}`);
			}
		} else {
			if (stepElement2) {
				stepElement2.classList.add('no-valid'); // Добавляем класс no-valid, если не валидно
			}
		}
	}

	// Функция для перехода на предыдущий шаг
	function goToPreviousStep2(previousStepIndex2) {
		if (previousStepIndex2 < currentStepIndex2 && previousStepIndex2 >= 1) {
			wizardWrapper2.classList.remove(`step2-${currentStepIndex2}`);
			currentStepIndex2 = previousStepIndex2;
			wizardWrapper2.classList.add(`step2-${currentStepIndex2}`);
		}
	}

	// Обработчики кликов на кнопки "вперед"
	document.getElementById('get-matched-btn-next-2').addEventListener('click', () => {
		const stepElement2 = document.querySelector('.step2.step2-2');
		goToNextStep2(2, stepElement2);
	});
	document.getElementById('get-matched-btn-next-3').addEventListener('click', () => {
		const stepElement2 = document.querySelector('.step2.step2-3');
		goToNextStep2(3, stepElement2);
	});
	document.getElementById('get-matched-btn-next-4').addEventListener('click', () => {
		const stepElement2 = document.querySelector('.step2.step2-4');
		goToNextStep2(4, stepElement2);
	});
	document.getElementById('get-matched-btn-next-5').addEventListener('click', () => {
		const stepElement2 = document.querySelector('.step2.step2-5');
		goToNextStep2(5, stepElement2);
	});
	document.getElementById('get-matched-btn-next-6').addEventListener('click', () => {
		const stepElement2 = document.querySelector('.step2.step2-6');
		goToNextStep2(6, stepElement2);
	});

	// Обработчики кликов на кнопки "назад"
	document.getElementById('get-matched-btn-back-1').addEventListener('click', () => goToPreviousStep2(1));
	document.getElementById('get-matched-btn-back-2').addEventListener('click', () => goToPreviousStep2(2));
	document.getElementById('get-matched-btn-back-3').addEventListener('click', () => goToPreviousStep2(3));
	document.getElementById('get-matched-btn-back-4').addEventListener('click', () => goToPreviousStep2(4));
	document.getElementById('get-matched-btn-back-5').addEventListener('click', () => goToPreviousStep2(5));
	document.getElementById('get-matched-btn-back-6').addEventListener('click', () => goToPreviousStep2(6));

	// Изначально блокируем кнопку отправки
	const submitBtn2 = document.getElementById('get-matched-btn-submit');
	submitBtn2.disabled = true; // Блокируем кнопку

	// Обработчик отправки формы
	submitBtn2.addEventListener('click', (event) => {
		const phoneField2 = document.getElementById('get-matched-phone');
		const stepElement2 = document.querySelector('.step2.step2-7');

		// Проверка валидности телефона
		if (!phoneField2.value.trim() || !isValidPhone2(phoneField2.value)) {
			event.preventDefault(); // Предотвращаем отправку формы, если телефон не валиден
			phoneField2.closest('.step2').classList.add('no-valid'); // Добавляем класс no-valid, если не валидно
		} else {
			phoneField2.closest('.step2').classList.remove('no-valid'); // Удаляем класс no-valid, если валидно
			phoneField2.closest('.step2').classList.add('valid'); // Добавляем класс valid при успешной валидации
			console.log('Форма успешно отправлена!'); // Замените это своей логикой отправки формы

			// Здесь можно добавить логику для отправки формы
			// Например, getMatchedForm.submit(); // Если вы хотите отправить форму
		}
	});

	// Обработчик событий DOMContentLoaded
	document.addEventListener('DOMContentLoaded', function () {
		const validationElements2 = document.querySelectorAll('.step2');

		validationElements2.forEach((stepElement2) => {
			const fields2 = stepElement2.querySelectorAll('input, select');

			fields2.forEach((field2) => {
				field2.addEventListener('input', validateInputField2);

				// Для поля телефона, чтобы исключить ввод всего, кроме цифр и символа +
				if (field2.id === 'get-matched-phone') {
					field2.addEventListener('input', function () {
						this.value = this.value.replace(/[^0-9+]/g, '');
					});
				}

				if (field2.value.trim() !== '') {
					stepElement2.classList.add('valid'); // Добавляем класс valid, если поле не пустое
				}
			});

			// Select2 integration for change event
			if ($(stepElement2).find('select').length) {
				$(stepElement2).find('select').select2().on('change', function () {
					validateInputField2.call(this);
				});
			}

			const validationButton2 = stepElement2.querySelector('.used-for-validation');
			validationButton2.addEventListener('click', function () {
				goToNextStep2(currentStepIndex2 + 1, stepElement2); // Переход к следующему шагу
			});
		});

		// Функция для валидации полей
		function validateInputField2() {
			const stepElement2 = this.closest('.step2');
			const parentElement2 = stepElement2;
			const isValid2 = validateCurrentStep2(stepElement2);

			// Проверка email
			if (this.id === 'get-matched-email') {
				if (!isValidEmail2(this.value)) {
					parentElement2.classList.remove('valid');
					parentElement2.classList.add('no-valid');
				} else {
					parentElement2.classList.remove('no-valid');
					parentElement2.classList.add('valid');
				}
				return;
			}

			// Проверка телефона
			// Проверка телефона
			if (this.id === 'get-matched-phone') {
				if (!this.value.trim()) {
					// Если поле пустое, удаляем класс valid и добавляем no-valid
					parentElement2.classList.remove('valid');
					parentElement2.classList.add('no-valid');
				} else if (!isValidPhone2(this.value)) {
					// Если номер телефона не валиден, удаляем класс valid и добавляем no-valid
					parentElement2.classList.remove('valid');
					parentElement2.classList.add('no-valid');
				} else {
					// Если номер телефона валиден
					parentElement2.classList.remove('no-valid');
					parentElement2.classList.add('valid');
				}
				return;
			}

			// Проверка пустых значений для всех других полей
			if (!this.value.trim() && this.value.trim() === '') {
				parentElement2.classList.remove('valid');
				parentElement2.classList.add('no-valid');
			} else {
				parentElement2.classList.remove('no-valid');
				parentElement2.classList.add('valid');
			}

			// Проверка состояния кнопки отправки
			submitBtn2.disabled = [...document.querySelectorAll('.step2')].some(step => step.classList.contains('no-valid'));
		}
	});
}