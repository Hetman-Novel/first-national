document.addEventListener('DOMContentLoaded', () => {
	// Get all forms on the page
	const forms = document.querySelectorAll('form');
	
	// Basic form validation logic
	forms.forEach((form) => {
		const submitButton = form.querySelector('[type="submit"]');
		const calculatorCheckbox = form.querySelector('#calculator-checkbox');
		
		// State for each field so that validation doesn't happen on page load
		const isFieldTouched = new Set();
	 
		/**
		 * Update the state of the submit button.
		 */
		let isInteracted = false; // Flag for tracking interactions
		
		function updateSubmitButtonState() {
			if (!isInteracted) return; // Do not execute logic if there was no interaction
			const isFormValid = Array.from(form.querySelectorAll('.validation-field')).every((validationBlock) => {
				return Array.from(validationBlock.querySelectorAll('input, textarea')).every((field) => validateField(field, validationBlock));
			});

			const isCheckboxChecked = calculatorCheckbox ? calculatorCheckbox.checked : true;
			submitButton.disabled = !(isFormValid && isCheckboxChecked);
		}
	 
		// Validation of fields in validation-field blocks
		form.querySelectorAll('.validation-field').forEach((validationBlock) => {
			validationBlock.querySelectorAll('input, textarea').forEach((field) => {
				/**
				 * Checks and updates the classes of the field and its block if a change has occurred.
				 */
				const validateAndUpdate = () => {
					if (isFieldTouched.has(field)) {
						// Check the field if it has already been changed
						validateField(field, validationBlock);
						updateSubmitButtonState();
					}
				};
		
				// Focus handler for the field
				field.addEventListener('focus', () => {
					isFieldTouched.add(field); // Mark the field as changed
				});
		
				// Обработчик ввода в поле
				field.addEventListener('input', () => {
					isFieldTouched.add(field); // Mark the field as changed
					validateAndUpdate();
				});
		
				// Field value change handler
				field.addEventListener('change', () => {
					isFieldTouched.add(field); // Mark the field as changed
					validateAndUpdate();
				});
		
				// Focus loss handler
				field.addEventListener('blur', () => {
					validateAndUpdate();
				});
		
				// For phones: remove invalid characters
				if (field.classList.contains('js-phone')) {
					field.addEventListener('input', () => {
						// Remove all invalid characters except numbers, plus, hyphens, brackets and spaces
						field.value = field.value.replace(/[^0-9+()\s-]/g, '');
			
						// Limit the string length to 16 characters
						if (field.value.length > 16) {
							field.value = field.value.slice(0, 16);
						}
			
						// Remove unnecessary repetitions of symbols + - ( ) and spaces
						field.value = field.value
							.replace(/\++/g, '+') // Only one "+" symbol
							.replace(/-+/g, '-') // Only one "-" symbol in a row
							.replace(/\(+/g, '(') // Only one character "("
							.replace(/\)+/g, ')') // Only one character ")"
							.replace(/\s+/g, ' '); // Only one space in a row
			
						// Remove the "+" symbol from anywhere except the beginning
						if (field.value.indexOf('+') > 0) {
							field.value = field.value.replace(/\+/g, '');
						}
			
						// Check the correctness of +1 at the beginning
						if (field.value.startsWith('+') && !field.value.startsWith('+1')) {
							field.value = field.value.replace(/^\+\d*/, '+1');
						}
			
						// Remove country code repetitions +1
						if (field.value.startsWith('+1') && field.value.slice(2).includes('+1')) {
							field.value = field.value.replace(/(?<=\+1).*?\+1/g, '');
						}
					});
			   }
		
				// Add a MutationObserver to track changes to the value attribute
				const observer = new MutationObserver(() => {
					if (field.value.trim() !== "") { // Check that the field is not empty
						isFieldTouched.add(field); // Mark the field as changed
						validateAndUpdate();
					}
				});
		
				// Setting up an observer for the value attribute
				observer.observe(field, {
					attributes: true,
					attributeFilter: ['value'],
				});
			});
		});
	 
		// Checkbox validation
		if (calculatorCheckbox) {
		  	calculatorCheckbox.addEventListener('change', updateSubmitButtonState);
		}
	 
		// Handle form submission
		form.addEventListener('submit', (event) => {
			event.preventDefault();

			// Final validation check before sending
			const isFormValid = Array.from(form.querySelectorAll('.validation-field')).every((validationBlock) => {
				return Array.from(validationBlock.querySelectorAll('input, textarea')).every((field) => {
					const isValid = validateField(field, validationBlock); // Check the field

					// Add class no-valid or valid
					if (isValid) {
						validationBlock.classList.add('valid');
						validationBlock.classList.remove('no-valid');
					} else {
						validationBlock.classList.add('no-valid');
						validationBlock.classList.remove('valid');
					}

					return isValid;
				});
			});

			// Example function for phone number validation
			function validatePhone(phoneField) {
				const phoneValue = phoneField.value.trim();

				// Example: Check that a phone number has at least 10 digits
				const phoneRegex = /^[0-9]{10,15}$/; // Regular expression for phone (can be adapted to the required format)
				
				return phoneRegex.test(phoneValue);
			}

			// Additional check for the field with class js-phone
			const phoneField = form.querySelector('.js-phone');
			if (phoneField && !validatePhone(phoneField)) {
				phoneField.classList.add('no-valid');
				phoneField.classList.remove('valid');
			} else {
				phoneField.classList.add('valid');
				phoneField.classList.remove('no-valid');
			}

			// Get the checkbox with id calculator-checkbox
			const calculatorCheckbox = form.querySelector('#calculator-checkbox');

			// Function to update the state of the parent element with class js-step
			function updateStepValidationState() {
				// We are looking for a parent block with the js-step class, closest to the checkbox
				const stepBlock = calculatorCheckbox.closest('.js-step'); 

				// If the element is found, update the classes
				if (stepBlock) {
					// If the checkbox is not active (not checked), add the step-no-valid class
					if (!calculatorCheckbox.checked) {
						stepBlock.classList.add('step-no-valid');
						stepBlock.classList.remove('step-valid');
					} else {
						// If the checkbox is active (checked), add the step-valid class
						stepBlock.classList.add('step-valid');
						stepBlock.classList.remove('step-no-valid');
					}
				}
			}

			// Checking the state of the checkbox at the time of page loading
			if (calculatorCheckbox) {
				updateStepValidationState(); // Check when loading the page

				// Add a change event handler to update the class when the checkbox state changes
				calculatorCheckbox.addEventListener('change', updateStepValidationState);
			}

			const isCheckboxChecked = calculatorCheckbox ? calculatorCheckbox.checked : true;

			if (!isFormValid || !isCheckboxChecked) {
				console.warn('The form did not pass validation.');
				return; // Abort submission if form is not valid
			}
		
			if (!submitButton.disabled) {
				const form = event.target;
		
				console.log('Sent successfully');

				form.reset();
				updateSubmitButtonState(); // Your additional code

				// Add the active class to the last step
				const stepNumbers = document.querySelectorAll('.js-calculator-form-step-numbers [data-step-number]');
				if (stepNumbers.length > 0) {
					const lastStep = stepNumbers[stepNumbers.length - 1]; // The last step
					lastStep.classList.add('active'); // Add the active class
				}

				// Hide the calculator form and show another block after submission
				let stepsCalculatorActive = document.querySelectorAll('.step-calculator-active');
				if (stepsCalculatorActive) {
					stepsCalculatorActive.forEach((stepCalculatorActive) => {
						if (stepCalculatorActive.classList.contains('show')) {
							stepCalculatorActive.classList.remove('show');
						} else {
							stepCalculatorActive.classList.add('show');
						}
					});
				}

				// Show notification and reset everything to default
				let firstScreenBlockWrapFormsSentSuccessfully = document.querySelectorAll('.first-screen__blockWrapForm-sent-successfully');

				if (firstScreenBlockWrapFormsSentSuccessfully) {
					firstScreenBlockWrapFormsSentSuccessfully.forEach((firstScreenBlockWrapFormSentSuccessfully) => {
						if (!firstScreenBlockWrapFormSentSuccessfully.classList.contains('show')) {
							// Add class 'show'
							firstScreenBlockWrapFormSentSuccessfully.classList.add('show');

							// Reset everything after 2000 ms
							setTimeout(() => {

								// Reset all form fields
								form.querySelectorAll('input, select, textarea, .js-block-date').forEach(field => {
									// Remove the 'valid' class from the block with the js-block-date class
									if (field.classList.contains('js-block-date')) {
										field.classList.remove('valid');
									} 
									// Reset fields with class js-date (e.g. date fields)
									if (field.classList.contains('js-date')) {
										field.value = ''; // Reset the field value
									} else if (field.type === 'text' || field.tagName === 'TEXTAREA') { // Reset regular text and textarea fields
										field.value = '';
									} else if (field.tagName === 'SELECT') { // For regular selects, reset the value
										field.value = '';
									} else if (field.type === 'hidden') { // For hidden fields, reset their value
										field.value = '';
									}
								});

								// Reset Select2 for each form
								document.querySelectorAll('.form').forEach((form) => {
									// Find all selects inside the form initialized with Select2
									$(form).find('select').each(function () {
										// Reset the value and call events to update the UI correctly
										$(this).val(null).trigger('change').trigger('select2:unselect');
									});
								});

								// Remove the 'valid' class from all blocks with the 'validation-field' class
								form.querySelectorAll('.validation-field').forEach(validationBlock => {
									validationBlock.classList.remove('valid');
								});

								// Remove the 'step-valid' class from all blocks with the 'js-step' class inside the form
								form.querySelectorAll('.js-step').forEach(stepBlock => {
									stepBlock.classList.remove('step-valid');
								});
			
								// Move the 'step-active' class to the block with data-step-block="step-1"
								const stepBlocks = document.querySelectorAll('[data-step-block]');
								stepBlocks.forEach(stepBlock => {
									if (stepBlock.getAttribute('data-step-block') === 'step-1') {
										stepBlock.classList.add('step-active');
									} else {
										stepBlock.classList.remove('step-active');
									}
								});
		
								// Remove the 'active' class from all data-step-numbers except those with the value 'step-1'
								const stepNumbers = document.querySelectorAll('[data-step-number]');
								stepNumbers.forEach(stepNumber => {
									if (stepNumber.getAttribute('data-step-number') === 'step-1') {
										stepNumber.classList.add('active');
									} else {
										stepNumber.classList.remove('active');
									}
								});		

							}, 2000);

							// Remove class after 3 seconds
							setTimeout(() => {
								firstScreenBlockWrapFormSentSuccessfully.classList.remove('show');
							}, 3000);
						}
					});
				}
			}
		});
	 
		// Initialize the submit button state
		updateSubmitButtonState();
	});
	 
	/**
	  * Validation of one field.
	  * @param {HTMLInputElement|HTMLTextAreaElement} field - Field for verification.
	  * @param {HTMLElement} validationBlock - The validation-field block containing the field.
	  * @returns {boolean} - Is the field valid?
	  */
	function validateField(field, validationBlock) {
		// Check if the field is hidden, skip its validation, but if it has a value, add the valid class
		if (field.offsetParent === null) {
			if (field.value.trim()) {
			  	validationBlock.classList.add('valid');
			  	validationBlock.classList.remove('no-valid');
			}
			return true;
		}

		let isFieldValid = true;
	 
		// Checking for fullness
		if (!field.value.trim()) {
		  	isFieldValid = false;
		}
	 
		// Additional checks for email and phone
		if (field.classList.contains('js-email') && !isValidEmail(field.value)) {
		  	isFieldValid = false;
		}
		if (field.classList.contains('js-phone') && !isValidPhone(field.value)) {
		  	isFieldValid = false;
		}
	 
		// Updating classes of the validation-field block
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
	  * Email validity check.
	  * @param {string} email - Email for verification.
	  * @returns {boolean} - Is the email valid?
	  */
	function isValidEmail(email) {
		return /^[a-zA-Z0-9._%+-]+@/.test(email);
	}
	 
	/**
	  * Phone validity check.
	  * @param {string} phone - Phone for verification.
	  * @returns {boolean} - Is this a valid phone number?
	  */
	function isValidPhone(phone) {
		const phoneRegex = /^\+?1?\s*\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}$/;
		return phoneRegex.test(phone.trim());
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
	 * Switch between form steps.
	 * @param {HTMLElement} form - Form.
	 * @param {string} stepBlockValue - The meaning of data-step-block.
	 * @param {string} direction - Switching direction (next/back).
	 */
	function handleStepChange(form, stepBlockValue, direction) {
		const currentBlock = form.querySelector(`[data-step-block="${stepBlockValue}"]`);
		if (!currentBlock) return;

		// Hide all steps and show the current one
		form.querySelectorAll('[data-step-block]').forEach((block) => block.classList.remove('step-active'));
		currentBlock.classList.add('step-active');
	}
	

	/* Calendar logic -> */
	document.querySelectorAll('.js-block-date').forEach((block) => {
		const dateInput = block.querySelector('.js-date'); // Date input field
		const calendarContainer = block.querySelector('.calendar-container'); // Calendar container

		if (!dateInput || !calendarContainer) return;

		let selectedDateEl = null; // To store the previously selected date

		// Initialize FullCalendar
		const calendar = new FullCalendar.Calendar(calendarContainer, {
			initialView: 'dayGridMonth',
			selectable: true,
			dateClick: function (info) {
				if (selectedDateEl) {
					selectedDateEl.classList.remove('selected-date');
				}

				const clickedDateEl = info.dayEl;
				clickedDateEl.classList.add('selected-date');
				selectedDateEl = clickedDateEl;

				const clickedDate = new Date(info.dateStr);
				if (!isNaN(clickedDate)) {
					dateInput.value = getFormattedDate(clickedDate);
					dateInput.setAttribute('value', getFormattedDate(clickedDate));
				} else {
					console.error("Incorrect date: " + info.dateStr);
				}

				// Remove the `date-field-in-focus` class after selecting a date
				block.classList.remove('date-field-in-focus');

				// Remove focus from the field after selecting a date
				dateInput.blur();

				// Field validation
				validateField(dateInput, block);
			},
		});

		calendar.render();

		// Format date in dd/mm/yyyy format
		function getFormattedDate(date) {
			const day = String(date.getDate()).padStart(2, '0');
			const month = String(date.getMonth() + 1).padStart(2, '0');
			const year = date.getFullYear();
			return `${day}/${month}/${year}`;
		}

		// Focus and blur events for js-date field
		if (dateInput.classList.contains('js-date')) {
			dateInput.addEventListener('focus', () => {
				block.classList.add('date-field-in-focus');
			});

			// Remove `date-field-in-focus` only if the calendar is not in focus (e.g. arrows)
			dateInput.addEventListener('blur', (event) => {
				const calendarToolbar = calendarContainer.querySelector('.fc-header-toolbar');
				if (!calendarToolbar.contains(event.relatedTarget)) {
					block.classList.remove('date-field-in-focus');
				}

				validateField(dateInput, block);
			});
		}

		// Field validation
		function validateField(field, parentBlock) {
			const currentDate = new Date(); // Current date
			currentDate.setHours(0, 0, 0, 0); // Remove time for comparison only by date
	  
			// Convert the field value to a date
			const fieldDateParts = field.value.trim().split('/');
			const fieldDate = new Date(
				parseInt(fieldDateParts[2], 10), // Year
				parseInt(fieldDateParts[1], 10) - 1, // Month (0-index)
				parseInt(fieldDateParts[0], 10) // Day
			);
	  
			if (field.value.trim() === '' || isNaN(fieldDate)) {
				// Field is empty or date is incorrect
				parentBlock.classList.add('no-valid');
				parentBlock.classList.remove('valid');
			} else if (fieldDate < currentDate) {
				// Date in the past
				parentBlock.classList.add('no-valid');
				parentBlock.classList.remove('valid');
				//console.error('The selected date cannot be in the past.');
			} else {
				// Date is correct
				parentBlock.classList.add('valid');
				parentBlock.classList.remove('no-valid');
			}
	   }
	});
	/* <- Calendar logic */

	
	/* Validating the .js-step block -> */
	document.querySelectorAll('.js-step').forEach((step) => {
		// Function to update the state of the current step
		const updateStepState = () => {
			// Get all blocks with fields for validation (validation-field and js-block-date)
			const validationBlocks = step.querySelectorAll('.validation-field');
			const dateBlocks = step.querySelectorAll('.js-block-date');
			
			// Check if all validation-field and js-block-date blocks have the valid class
			const allValidationValid = Array.from(validationBlocks).every(block => block.classList.contains('valid'));
			const allDateValid = Array.from(dateBlocks).every(block => block.classList.contains('valid'));
		
			// If all blocks are valid, add step-valid
			if (allValidationValid && allDateValid) {
				step.classList.add('step-valid');
				step.classList.remove('step-no-valid');
			} else {
				// If at least one block with class validation-field or js-block-date has no-valid
				if (isInteracted(validationBlocks, dateBlocks)) {
					step.classList.add('step-no-valid');
				}
				step.classList.remove('step-valid');
			}
		};
		
		// Function to check if there were changes in blocks
		const isInteracted = (validationBlocks, dateBlocks) => {
			return [...validationBlocks, ...dateBlocks].some(block => block.classList.contains('no-valid'));
		};
		
		// Add observers for class changes in the validation-field and js-block-date blocks
		const observeChanges = (block) => {
			const observer = new MutationObserver(updateStepState);
		
			observer.observe(block, {
				attributes: true,
				attributeFilter: ['class']
			});
		};
		
		// Watch all validation-field and js-block-date blocks in the current step
		step.querySelectorAll('.validation-field, .js-block-date').forEach((block) => {
			observeChanges(block);
		});
		updateStepState(); // Initially update the current step state on load

		// Logic for js-validity-check button
		document.querySelectorAll('.js-validity-check').forEach((button) => {
			button.addEventListener('click', () => {
				const step = button.closest('.js-step'); // Get the current step block
				if (!step) return; // If the button is not inside a step block, do nothing

				const validationBlocks = step.querySelectorAll('.validation-field');
				const dateBlocks = step.querySelectorAll('.js-block-date');

				// Add 'no-valid' or 'valid' class to each field
				validationBlocks.forEach((block) => {
					if (block.classList.contains('valid')) {
						block.classList.remove('no-valid');
						block.classList.add('valid');
					} else {
						block.classList.remove('valid');
						block.classList.add('no-valid');
					}
				});

				dateBlocks.forEach((block) => {
					if (block.classList.contains('valid')) {
						block.classList.remove('no-valid');
						block.classList.add('valid');
					} else {
						block.classList.remove('valid');
						block.classList.add('no-valid');
					}
				});

				// Determine the overall state of the step
				const allValidationValid = Array.from(validationBlocks).every(block => block.classList.contains('valid'));
				const allDateValid = Array.from(dateBlocks).every(block => block.classList.contains('valid'));

				if (!allValidationValid || !allDateValid) {
					step.classList.add('step-no-valid');
					step.classList.remove('step-valid');
				} else {
					step.classList.add('step-valid');
					step.classList.remove('step-no-valid');
				}
			});
		});

	});
	/* <- Validating the .js-step block */



	/* Highlight step number .js-step-numbers -> */
	let jsCalculatorFormStepNumbers = document.querySelectorAll('.js-calculator-form-step-numbers');
	if (jsCalculatorFormStepNumbers) {
		document.querySelectorAll('[data-step-button]').forEach(button => {
			button.addEventListener('click', () => {
				const stepBlock = button.closest('.step-valid'); // Find the closest parent block with the step-valid class
				if (!stepBlock) return; // If the click is not inside a block with the step-valid class, do nothing
			
				const stepNumber = button.getAttribute('data-step-button'); // Get the current step from the data-step-button attribute
				const stepNumbers = document.querySelectorAll('.js-calculator-form-step-numbers [data-step-number]'); // Find all elements with data-step-number
			
				// Remove the 'active' class from all steps before the current step
				stepNumbers.forEach(step => {
					const currentStepNumber = step.getAttribute('data-step-number');
					
					// If the step number is less than the current one, add the active class
					if (parseInt(currentStepNumber.replace('step-', '')) < parseInt(stepNumber.replace('step-', ''))) {
						step.classList.add('active');
					} else {
						step.classList.remove('active');
					}
				});
			});
		});
		// Handling buttons for reverse transition
		document.querySelectorAll('[data-step-back-button]').forEach(button => {
			button.addEventListener('click', () => {
				const stepNumber = button.getAttribute('data-step-back-button'); // Get the current step from the data-step-back-button attribute
				const stepNumbers = document.querySelectorAll('.js-calculator-form-step-numbers [data-step-number]'); // Find all elements with data-step-number
			
				// Remove the 'active' class from all steps, starting with the current one
				stepNumbers.forEach(step => {
					const currentStepNumber = step.getAttribute('data-step-number');
					
					// If the step number is greater than or equal to the current one, remove the active class
					if (parseInt(currentStepNumber.replace('step-', '')) >= parseInt(stepNumber.replace('step-', ''))) {
						step.classList.remove('active');
					}
				});
			});
		});
	}
	// Process each form with class js-block-form separately
	document.querySelectorAll('.js-block-form').forEach(formBlock => {
		const stepNumbers = formBlock.querySelectorAll('.js-step-numbers [data-step-number]'); // Numbering elements inside the form

		// Handling forward buttons
		formBlock.querySelectorAll('[data-step-button]').forEach(button => {
			button.addEventListener('click', () => {
				const stepBlock = button.closest('.step-valid'); // Check the step-valid class
				if (!stepBlock) return; // If there is no step-valid class, do nothing

				const stepNumber = button.getAttribute('data-step-button');

				// Check if the stepNumber value starts with "step-"
				if (!stepNumber.startsWith('step-')) {
					return; // If not, do nothing
				}

				// Add or remove the active class only for elements inside the current form
				stepNumbers.forEach(step => {
					const currentStepNumber = step.getAttribute('data-step-number');

					if (
						parseInt(currentStepNumber.replace('step-', '')) <= parseInt(stepNumber.replace('step-', ''))
					) {
						step.classList.add('active');
					} else {
						step.classList.remove('active');
					}
				});
			});
		});

		// Handling buttons for going back
		document.querySelectorAll('[data-step-back-button]').forEach(button => {
			button.addEventListener('click', () => {
				const stepNumber = button.getAttribute('data-step-back-button'); // Get the current step from the attribute
				const stepNumbers = document.querySelectorAll('.js-step-numbers [data-step-number]'); // All elements with data-step-number

				// Add or remove the 'active' class to navigate back
				stepNumbers.forEach(step => {
					const currentStepNumber = step.getAttribute('data-step-number');
					
					// Shift by 1: if the step number is less than the current one, add the active class
					if (parseInt(currentStepNumber.replace('step-', '')) < parseInt(stepNumber.replace('step-', '')) + 1) {
						step.classList.add('active');
					} else {
						step.classList.remove('active');
					}
				});
			});
		});

	});
	/* <- Highlight step number .js-step-numbers */

});