document.addEventListener('DOMContentLoaded', function() {

   let calculatorForm = document.getElementById('calculator-form');
   if (calculatorForm) {

      // При переходе на другой этап
      document.addEventListener('click', (event) => {
         const button = event.target.closest('.step-valid button[data-step-button="step-2"]');
         if (button) {
            document.getElementById('step-block-column-two').classList.add('step-active');
         }
      });
  
      // Update when entering data into text fields
      const observeFieldChanges = (fieldId, targetClass) => {
         const inputField = document.getElementById(fieldId);
 
         if (inputField) {
            // Function to update elements
            const update = () => {
               updateElements(targetClass, inputField.value);
            };

            // Update on data entry
            inputField.addEventListener('input', update);

            // Watch for changes in value
            const observer = new MutationObserver(() => {
               update();
            });

            observer.observe(inputField, {
               attributes: true,
               attributeFilter: ['value'], // We only monitor changes to the value attribute
               subtree: false,
               childList: false
            });

            // Initial update on page load
            update();
         }
      };
 
      // Function to update the contents of all elements with a certain class
      const updateElements = (targetClass, value) => {
         document.querySelectorAll(targetClass).forEach(element => {
            element.textContent = value;
         });
      };
 
      // Set up tracking for each field
      observeFieldChanges('calculator-moving-from', '.calculator-moving-from'); // field id, element class where to insert
      observeFieldChanges('calculator-moving-to', '.calculator-moving-to'); // field id, element class where to insert
      observeFieldChanges('calculator-move-size', '.calculator-move-size'); // field id, element class where to insert
      observeFieldChanges('calculator-move-date', '.calculator-move-date'); // field id, element class where to insert

      const inputName = document.getElementById('calculator-name');
      const inputEmail = document.getElementById('calculator-email');
      const inputPhone = document.getElementById('calculator-phone');

      if (inputName) {
         inputName.addEventListener('input', () => {
            updateElements('.calculator-name', inputName.value);
         });
      }
      if (inputEmail) {
         inputEmail.addEventListener('input', () => {
            updateElements('.calculator-email', inputEmail.value);
         });
      }
      if (inputPhone) {
         inputPhone.addEventListener('input', () => {
            updateElements('.calculator-phone', inputPhone.value);
         });
      }

      // Variables for map and routes
      let map;
      let directionsService;
      let directionsRenderer;
      
      // Map initialization function
      function initMap() {
         map = new google.maps.Map(document.getElementById('calculator-form-map'), {
            zoom: 7,
            center: { lat: 37.7749, lng: -122.4194 }, // Central point of the map
            language: 'en', // Map language
            disableDefaultUI: true, // Remove standard elements
            zoomControl: true, // Enable zoom buttons
            fullscreenControl: false, // Disable the fullscreen button
         });
      
         directionsService = new google.maps.DirectionsService();
         directionsRenderer = new google.maps.DirectionsRenderer({ map });
      }
      
      // Function for constructing a route and outputting miles
      function calculateRoute() {
         const origin = document.getElementById('calculator-moving-from').value.trim();
         const destination = document.getElementById('calculator-moving-to').value.trim();
         
         if (!origin || !destination) return;
         
         directionsService.route(
            {
               origin, // Starting point
               destination, // End point
               travelMode: 'DRIVING', // Type of movement
            },
            (response, status) => {
               if (status === 'OK') {
                  directionsRenderer.setDirections(response); // Display the route on the map
            
                  // Extract the distance from the answer
                  const legs = response.routes[0].legs[0];
                  const distanceValue = legs.distance.value; // Distance in meters
                  const miles = (distanceValue / 1609.34).toFixed(2); // Convert to miles
            
                  // Output the number of miles to the element with the id number-miles
                  document.getElementById('number-miles').textContent = `${miles} miles`;
               } else {
                  //console.error('Failed to build route:', status);
                  document.getElementById('number-miles').textContent = 'Unable to calculate distance';
               }
            }
         );
      }
      
      // Function to track changes in values
      function observeFields() {
         const config = { attributes: true, childList: true, subtree: false, characterData: true };
         
         // Tracking for the "From" field
         const observerFrom = new MutationObserver(() => {
            calculateRoute();
         });
         observerFrom.observe(document.getElementById('calculator-moving-from'), config);
         
         // Tracking for the "Where" field
         const observerTo = new MutationObserver(() => {
            calculateRoute();
         });
         observerTo.observe(document.getElementById('calculator-moving-to'), config);
      }
      
      // Initialize the map and observers
      window.onload = () => {
         initMap();
         observeFields();
      };
   }
});