// Отключаем автоматическую прокрутку при обновлении страницы
if ('scrollRestoration' in history) {
   history.scrollRestoration = 'manual';
}

window.addEventListener('beforeunload', function() {
   // Сохраняем текущую позицию прокрутки
   localStorage.setItem('scrollPosition', window.scrollY);
});

window.addEventListener('load', function() {
   // Восстанавливаем позицию прокрутки после загрузки
   const scrollPosition = localStorage.getItem('scrollPosition');
   if (scrollPosition) {
      window.scrollTo(0, scrollPosition);
   }
});
