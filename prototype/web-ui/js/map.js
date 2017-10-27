var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: new google.maps.LatLng(49.839311, 24.026990),
        mapTypeId: 'roadmap'
    });

    var marker = new google.maps.Marker({
        position: { lat: 49.842401, lng: 24.03599 },
        map: map,
        icon: {
            url: "img/ball.svg",
            scaledSize: new google.maps.Size(32, 32)
        }
    });
    document.getElementById("text")
        .addEventListener("keyup", function(event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                document.getElementById("send").click();
            }
        });



    // Create markers.
    features.forEach(function(feature) {
        var marker = new google.maps.Marker({
            position: feature.position,
            icon: icons[feature.type].icon,
            map: map
        });
    });
}