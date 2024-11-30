document.addEventListener('DOMContentLoaded', function() {
   let infoListItemDropdown = document.querySelectorAll('.info__listItem.dropdown');
   if (infoListItemDropdown) {
      infoListItemDropdown.forEach(item => {
         const sublist = item.querySelector('.info__sublist');
         const firstLink = item.querySelector('a'); // Select the first link in the element

         // Blocking the transition to the first link
         if (firstLink) {
            firstLink.addEventListener('click', function(event) {
               event.preventDefault(); // Prevent following the link
            });
         }

         // Set the height of the submenu depending on the state
         if (item.classList.contains('open')) {
            const sublistHeight = sublist.scrollHeight;
            sublist.style.height = `${sublistHeight}px`;
         } else {
            sublist.style.height = '0';
         }

         // Handler for clicking on an element
         item.addEventListener('click', function(event) {
            if (event.target.closest('.info__sublist')) {
               return;
            }
            if (this.classList.contains('open')) {
               this.classList.remove('open');
               sublist.style.height = '0';
            } else {
               this.classList.add('open');
               const sublistHeight = sublist.scrollHeight;
               sublist.style.height = `${sublistHeight}px`;
            }
         });
      });
   }
});