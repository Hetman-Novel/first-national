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
	const fsWrapper = document.getElementById('fs-wrapper-steps');
	let currentStep = 1;
	const totalSteps = 7; // Общее количество шагов

	// Функция для валидации текущего шага
	function validateStep(stepBlock) {
		if (!stepBlock) return false; // Если stepBlock не существует, возвращаем false

		let isValid = true;

		const inputs = stepBlock.querySelectorAll('input, select');

		inputs.forEach((input) => {
			if (input.tagName === 'SELECT') {
					if (!input.value) {
						isValid = false;
					}
			} else if (!input.value) {
					isValid = false;
			}

			// Дополнительная валидация для специфических полей
			if (input.id === 'f-email' && !isValidEmail(input.value)) {
					isValid = false;
			}

			if (input.id === 'f-phone' && !isValidPhone(input.value)) {
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
		const phoneRegex = /^[0-9+]*$/; // Разрешить только цифры и '+'
		return phoneRegex.test(phone);
	}

	// Функция для перехода на следующий шаг с проверкой валидации
	function goToNextStep(nextStep, stepBlock) {
		const isValid = validateStep(stepBlock); // Проверка валидации текущего блока

		if (isValid) {
			// Если шаг валиден и следующий шаг в пределах допустимого диапазона
			if (nextStep === currentStep + 1 && currentStep < totalSteps) {
					fsWrapper.classList.remove(`step-${currentStep}`);
					currentStep = nextStep;
					fsWrapper.classList.add(`step-${currentStep}`);
			}
		} else {
			stepBlock.classList.add('no-valid'); // Добавляем класс no-valid, если не валидно
		}
	}

	// Функция для перехода на предыдущий шаг
	function goToPrevStep(prevStep) {
		if (prevStep < currentStep && prevStep >= 1) {
			fsWrapper.classList.remove(`step-${currentStep}`);
			currentStep = prevStep;
			fsWrapper.classList.add(`step-${currentStep}`);
		}
	}

	// Обработчики кликов на кнопки "вперед"
	document.getElementById('fs-btn-next-2').addEventListener('click', () => {
		const stepBlock = document.querySelector('.step.step-2');
		goToNextStep(2, stepBlock);
	});
	document.getElementById('fs-btn-next-3').addEventListener('click', () => {
		const stepBlock = document.querySelector('.step.step-3');
		goToNextStep(3, stepBlock);
	});
	document.getElementById('fs-btn-next-4').addEventListener('click', () => {
		const stepBlock = document.querySelector('.step.step-4');
		goToNextStep(4, stepBlock);
	});
	document.getElementById('fs-btn-next-5').addEventListener('click', () => {
		const stepBlock = document.querySelector('.step.step-5');
		goToNextStep(5, stepBlock);
	});
	document.getElementById('fs-btn-next-6').addEventListener('click', () => {
		const stepBlock = document.querySelector('.step.step-6');
		goToNextStep(6, stepBlock);
	});

	// Обработчики кликов на кнопки "назад"
	document.getElementById('fs-btn-back-1').addEventListener('click', () => goToPrevStep(1));
	document.getElementById('fs-btn-back-2').addEventListener('click', () => goToPrevStep(2));
	document.getElementById('fs-btn-back-3').addEventListener('click', () => goToPrevStep(3));
	document.getElementById('fs-btn-back-4').addEventListener('click', () => goToPrevStep(4));
	document.getElementById('fs-btn-back-5').addEventListener('click', () => goToPrevStep(5));
	document.getElementById('fs-btn-back-6').addEventListener('click', () => goToPrevStep(6));

	// Изначально блокируем кнопку отправки
	const submitButton = document.getElementById('fs-btn-submit');
	submitButton.disabled = true; // Блокируем кнопку

	// Обработчик отправки формы
	submitButton.addEventListener('click', (event) => {
		const stepBlock = document.querySelector('.step.step-7');
		const phoneInput = stepBlock.querySelector('#f-phone');

		// Проверка валидности телефона перед отправкой
		if (!isValidPhone(phoneInput.value)) {
			event.preventDefault(); // Предотвращаем отправку формы, если телефон не валиден
			phoneInput.classList.add('no-valid'); // Добавляем класс no-valid, если не валидно
		} else {
			phoneInput.classList.remove('no-valid'); // Удаляем класс no-valid, если валидно
			// Здесь можно добавить логику отправки формы, если телефон валиден
			// Например, если форма отправляется через AJAX:
			// submitForm(); // Ваша функция для отправки формы
			console.log('Форма успешно отправлена!'); // Замените это своей логикой отправки формы
		}
	});

	// Обработчик событий DOMContentLoaded
	document.addEventListener('DOMContentLoaded', function () {
		const validationFields = document.querySelectorAll('.step');

		validationFields.forEach((stepBlock) => {
			const inputs = stepBlock.querySelectorAll('input, select');

			inputs.forEach((input) => {
					input.addEventListener('input', validateField);

					// Для поля телефона, чтобы исключить ввод всего, кроме цифр и символа +
					if (input.id === 'f-phone') {
						input.addEventListener('input', function () {
							this.value = this.value.replace(/[^0-9+]/g, '');
						});
					}

					if (input.value.trim() !== '') {
						stepBlock.classList.add('valid'); // Добавляем класс valid, если поле не пустое
					}
			});

			// Select2 integration for change event
			if ($(stepBlock).find('select').length) {
					$(stepBlock).find('select').select2().on('change', function () {
						validateField.call(this);
					});
			}

			const validationButton = stepBlock.querySelector('.used-for-validation');
			validationButton.addEventListener('click', function (event) {
					goToNextStep(currentStep + 1, stepBlock); // Переход к следующему шагу
			});
		});

		function validateField() {
			const stepBlock = this.closest('.step');
			const parent = stepBlock;
			const isValid = validateStep(stepBlock);

			if (this.id === 'f-email') {
					// Если поле email не валидно и не содержит '@', то добавляем no-valid
					if (!isValidEmail(this.value) && !this.value.includes('@')) {
						parent.classList.add('no-valid');
					} else if (isValidEmail(this.value) || this.value.includes('@')) {
						// Убираем no-valid, если email валиден или содержит '@'
						parent.classList.remove('no-valid');
					}
			} else {
					if (isValid) {
						stepBlock.classList.add('valid');
						parent.classList.remove('no-valid');
					} else {
						stepBlock.classList.remove('valid');
					}
			}

			// Проверка на пустое значение
			if (this.value === '') {
					parent.classList.add('no-valid');
			}

			// Проверка валидности телефона
			if (document.getElementById('f-phone').value !== '') {
					const phoneInput = document.getElementById('f-phone');
					if (isValidPhone(phoneInput.value)) {
						submitButton.disabled = false; // Разблокируем кнопку, если телефон валиден
					} else {
						submitButton.disabled = true; // Блокируем кнопку, если телефон не валиден
					}
			}
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
				} else if (!field2.value) {
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
			const phoneRegex2 = /^[0-9+]*$/; // Разрешить только цифры и '+'
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
				stepElement2.classList.add('no-valid'); // Добавляем класс no-valid, если не валидно
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
			const stepElement2 = document.querySelector('.step2.step2-7');
			const phoneField2 = stepElement2.querySelector('#get-matched-phone');
	
			// Проверка валидности телефона перед отправкой
			if (!isValidPhone2(phoneField2.value)) {
				event.preventDefault(); // Предотвращаем отправку формы, если телефон не валиден
				phoneField2.classList.add('no-valid'); // Добавляем класс no-valid, если не валидно
			} else {
				phoneField2.classList.remove('no-valid'); // Удаляем класс no-valid, если валидно
				// Здесь можно добавить логику отправки формы, если телефон валиден
				// Например, если форма отправляется через AJAX:
				// submitForm(); // Ваша функция для отправки формы
				console.log('Форма успешно отправлена!'); // Замените это своей логикой отправки формы
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
				validationButton2.addEventListener('click', function (event) {
					goToNextStep2(currentStepIndex2 + 1, stepElement2); // Переход к следующему шагу
				});
			});
	
			function validateInputField2() {
				const stepElement2 = this.closest('.step2');
				const parentElement2 = stepElement2;
				const isValid2 = validateCurrentStep2(stepElement2);
	
				if (this.id === 'get-matched-email') {
					// Если поле email не валидно и не содержит '@', то добавляем no-valid
					if (!isValidEmail2(this.value) && !this.value.includes('@')) {
							parentElement2.classList.add('no-valid');
					} else if (isValidEmail2(this.value) || this.value.includes('@')) {
							// Убираем no-valid, если email валиден или содержит '@'
							parentElement2.classList.remove('no-valid');
					}
				} else {
					if (isValid2) {
							stepElement2.classList.add('valid');
							parentElement2.classList.remove('no-valid');
					} else {
							stepElement2.classList.remove('valid');
					}
				}
	
				// Проверка на пустое значение
				if (this.value === '') {
					parentElement2.classList.add('no-valid');
				}
	
				// Проверка валидности телефона
				if (document.getElementById('get-matched-phone').value !== '') {
					const phoneField2 = document.getElementById('get-matched-phone');
					if (isValidPhone2(phoneField2.value)) {
							submitBtn2.disabled = false; // Разблокируем кнопку, если телефон валиден
					} else {
							submitBtn2.disabled = true; // Блокируем кнопку, если телефон не валиден
					}
				}
			}
	});
}