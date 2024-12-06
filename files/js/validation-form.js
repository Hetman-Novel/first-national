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
		function updateSubmitButtonState() {
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
						field.value = field.value.replace(/[^0-9+]/g, '');
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
		
			if (!submitButton.disabled) {
				const form = event.target;
		
				console.log('Sent successfully');
				form.reset();
				updateSubmitButtonState(); // Your additional code

				// Add the active class to the last step
				const stepNumbers = document.querySelectorAll('.js-step-numbers [data-step-number]');
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

		// Initialize FullCalendar
		const calendar = new FullCalendar.Calendar(calendarContainer, {
			initialView: 'dayGridMonth',
			selectable: true,
			dateClick: function (info) {
				const clickedDate = new Date(info.dateStr); // Get date from calendar

				if (!isNaN(clickedDate)) {
					// Format the date in dd/mm/yyyy format
					const formattedDate = getFormattedDate(clickedDate);

					// Insert the date into the field and the value attribute
					dateInput.value = formattedDate; // Update the text value
					dateInput.setAttribute('value', formattedDate); // Update the value attribute

					// Валидация поля
					validateField(dateInput, block); // Validation after inserting date
				}

				// Remove focus from the field after selecting a date
				dateInput.blur();
			},
		});

		calendar.render();

		// Format date to dd/mm/yyyy format
		function getFormattedDate(date) {
			const day = String(date.getDate()).padStart(2, '0'); // Add a leading zero to the day
			const month = String(date.getMonth() + 1).padStart(2, '0'); // Add a leading zero to the month
			const year = date.getFullYear();
			return `${day}/${month}/${year}`;
		}

		// Focus and blur events for js-date field
		if (dateInput.classList.contains('js-date')) {
			dateInput.addEventListener('focus', () => {
				block.classList.add('date-field-in-focus');
			});

			dateInput.addEventListener('blur', () => {
				block.classList.remove('date-field-in-focus');
				validateField(dateInput, block); // Call validation
			});
		}

		// Field validation
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
		
		// Initially update the current step state on load
		updateStepState();
	});	 
	/* <- Validating the .js-step block */


	/* Highlight step number .js-step-numbers */
	document.querySelectorAll('[data-step-button]').forEach(button => {
		button.addEventListener('click', () => {
			const stepBlock = button.closest('.step-valid'); // Find the closest parent block with the step-valid class
			if (!stepBlock) return; // If the click is not inside a block with the step-valid class, do nothing
		
			const stepNumber = button.getAttribute('data-step-button'); // Get the current step from the data-step-button attribute
			const stepNumbers = document.querySelectorAll('.js-step-numbers [data-step-number]'); // Find all elements with data-step-number
		
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
			const stepNumbers = document.querySelectorAll('.js-step-numbers [data-step-number]'); // Find all elements with data-step-number
		
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
	/* <- Highlight step number .js-step-numbers */

});