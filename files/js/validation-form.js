
// step-by-step connection for the form in the first block
// Получаем элемент, который будет менять классы
const fsWrapper = document.getElementById('fs-wrapper-steps');

// Определяем текущий шаг
let currentStep = 1;
const totalSteps = 7; // Общее количество шагов

// Функция для перехода на следующий шаг
function goToNextStep(nextStep) {
  if (nextStep === currentStep + 1) { // Можно перейти только на следующий шаг
    fsWrapper.classList.remove(`step-${currentStep}`);
    currentStep = nextStep;
    fsWrapper.classList.add(`step-${currentStep}`);
  }
}

// Функция для перехода на предыдущий шаг
function goToPrevStep(prevStep) {
  if (prevStep < currentStep && prevStep >= 1) { // Можно вернуться на любой предыдущий шаг
    fsWrapper.classList.remove(`step-${currentStep}`);
    currentStep = prevStep;
    fsWrapper.classList.add(`step-${currentStep}`);
  }
}

// Функция для перехода к определенному шагу с проверкой вперед-назад
function goToStep(step) {
  if (step > currentStep && step === currentStep + 1) {
    // Переход вперед только на следующий шаг
    fsWrapper.classList.remove(`step-${currentStep}`);
    currentStep = step;
    fsWrapper.classList.add(`step-${currentStep}`);
  } else if (step < currentStep) {
    // Можно вернуться на любой предыдущий шаг
    fsWrapper.classList.remove(`step-${currentStep}`);
    currentStep = step;
    fsWrapper.classList.add(`step-${currentStep}`);
  }
}

// Обработчики кликов на кнопки "вперед"
document.getElementById('fs-btn-next-2').addEventListener('click', () => goToNextStep(2));
document.getElementById('fs-btn-next-3').addEventListener('click', () => goToNextStep(3));
document.getElementById('fs-btn-next-4').addEventListener('click', () => goToNextStep(4));
document.getElementById('fs-btn-next-5').addEventListener('click', () => goToNextStep(5));
document.getElementById('fs-btn-next-6').addEventListener('click', () => goToNextStep(6));
document.getElementById('fs-btn-next-7').addEventListener('click', () => goToNextStep(7));

// Обработчики кликов на кнопки "назад"
document.getElementById('fs-btn-back-1').addEventListener('click', () => goToPrevStep(1));
document.getElementById('fs-btn-back-2').addEventListener('click', () => goToPrevStep(2));
document.getElementById('fs-btn-back-3').addEventListener('click', () => goToPrevStep(3));
document.getElementById('fs-btn-back-4').addEventListener('click', () => goToPrevStep(4));
document.getElementById('fs-btn-back-5').addEventListener('click', () => goToPrevStep(5));
document.getElementById('fs-btn-back-6').addEventListener('click', () => goToPrevStep(6));

// Обработчики для кнопок "fs-btn-step-X" с проверкой на последовательность
document.getElementById('fs-btn-step-1').addEventListener('click', () => goToStep(1));
document.getElementById('fs-btn-step-2').addEventListener('click', () => goToStep(2));
document.getElementById('fs-btn-step-3').addEventListener('click', () => goToStep(3));
document.getElementById('fs-btn-step-4').addEventListener('click', () => goToStep(4));
document.getElementById('fs-btn-step-5').addEventListener('click', () => goToStep(5));
document.getElementById('fs-btn-step-6').addEventListener('click', () => goToStep(6));
document.getElementById('fs-btn-step-7').addEventListener('click', () => goToStep(7));


/* demo -> */
document.getElementById('fs-btn-submit').addEventListener('click', () => {
   document.querySelector('.first-screen__blockWrapForm').classList.add('sent-successfully');
   setTimeout(function() {
      document.querySelector('.first-screen__blockWrapForm').classList.remove('sent-successfully');
   }, 3000);
   setTimeout(function() {
      fsWrapper.classList.remove('step-7');
      fsWrapper.classList.add('step-1');
   }, 600);
});
/* <- demo */