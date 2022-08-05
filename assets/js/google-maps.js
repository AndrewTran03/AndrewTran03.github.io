function initMap() {
    // Latitude and Longitude
    var myLatLng =  {lat: 37.2275, lng: -80.422}; // {lat: -6.207690, lng: 106.985270};

    var map = new google.maps.Map(document.getElementById('google-maps'), {
        zoom: 17,
        center: myLatLng
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Virginia Polytechnic Institute and State University, VA' // Title Location
    });
}