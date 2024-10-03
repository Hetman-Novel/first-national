function initMap() {
   var uluru = {
      lat: 46.6345791,
      lng: 32.6136564
   };
   var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: uluru
   });
   var marker = new google.maps.Marker({
      position: uluru,
      map: map
   });
}