var map;

function getCaret(el) {
    if (el.selectionStart) {
        return el.selectionStart;
    } else if (document.selection) {
        el.focus();
        var r = document.selection.createRange();
        if (r == null) {
            return 0;
        }
        var re = el.createTextRange(),
            rc = re.duplicate();
        re.moveToBookmark(r.getBookmark());
        rc.setEndPoint('EndToStart', re);
        return rc.text.length;
    }
    return 0;
}

$('textarea').keyup(function(event) {
    if (event.keyCode == 13) {
        var content = this.value;
        var caret = getCaret(this);
        if (event.shiftKey) {
            this.value = content.substring(0, caret - 1) + "\n" + content.substring(caret, content.length);
            event.stopPropagation();
        } else {
            this.value = content.substring(0, caret - 1) + content.substring(caret, content.length);
            document.getElementById("send").click();
        }
    }
});


function initMap() {

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: { lat: 49.837505, lng: 24.032027 },
        styles: [{
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
                "color": "#1c4f54"
            }]
        }, {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [{
                "color": "#436775"
            }]
        }, {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{
                "color": "#318c94"
            }, {
                "lightness": -37
            }]
        }, {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
                "color": "#49717f"
            }]
        }, {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [{
                "color": "#49717f"
            }]
        }, {
            "elementType": "labels.text.stroke",
            "stylers": [{
                "visibility": "on"
            }, {
                "color": "#226166"
            }, {
                "weight": 2
            }, {
                "gamma": 0.84
            }]
        }, {
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#ffffff"
            }]
        }, {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [{
                "weight": 0.6
            }, {
                "color": "#1c4f54"
            }]
        }, {
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [{
                "color": "#436775"
            }]
        }, {
            "featureType": "administrative.locality",
            "elementType": "labels",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "administrative.neighborhood",
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "administrative.land_parcel",
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
            }]
        }, {}],
    });


    // Create an array of alphabetical characters used to label the markers.
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1 id="firstHeading" class="firstHeading">Футбольне поле</h1>' +
        '<div id="bodyContent">' +
        '<p>Вулиця:<br>Тип поля:<br>Покриття поля:<br>Стан:добре/середнє/погано<br>Кількість гравців:0/11<br></p>' +
        '</div>' +
        '</div>';
    var infowindow = new google.maps.InfoWindow({
        content: contentString

    });
    // Add some markers to the map.
    // Note: The code uses the JavaScript Array.prototype.map() method to
    // create an array of markers based on a given "locations" array.
    // The map() method here has nothing to do with the Google Maps API.
    var markers = locations.map(function(location, i) {
        var marker = new google.maps.Marker({
            position: location,
            icon: {
                url: "img//foot.png",
                scaledSize: new google.maps.Size(48, 48)
            }
        });
        google.maps.event.addListener(marker, 'click', function(evt) {
            infowindow.setContent(location.info);
            infowindow.open(map, marker);
        })
        return marker;
    });



    // Add a marker clusterer to manage the markers.
    var markerCluster = new MarkerClusterer(map, markers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
}
var locations = [{
        lat: 49.827678,
        lng: 24.009748,
        info: '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h1 id="firstHeading" class="firstHeading">Футбольне поле</h1>' +
            '<div id="bodyContent">' +
            '<p>Вулиця:<br>Тип поля:<br>Покриття поля:<br>Стан:добре/середнє/погано<br>Кількість гравців:0/11<br></p>' +
            '</div>' +
            '</div>'
    },
    {
        lat: 49.828094,
        lng: 24.024636,
        info: '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h1 id="firstHeading" class="firstHeading">Футбольне поле</h1>' +
            '<div id="bodyContent">' +
            '<p>Вулиця:<br>Тип поля:<br>Покриття поля:<br>Стан:добре/середнє/погано<br>Кількість гравців:0/11<br></p>' +
            '</div>' +
            '</div>'
    },
    {
        lat: 49.822882,
        lng: 24.030011,
        info: '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h1 id="firstHeading" class="firstHeading">Футбольне поле</h1>' +
            '<div id="bodyContent">' +
            '<p>Вулиця:<br>Тип поля:<br>Покриття поля:<br>Стан:добре/середнє/погано<br>Кількість гравців:0/11<br></p>' +
            '</div>' +
            '</div>'
    },
    {
        lat: 49.829729,
        lng: 24.035933,
        info: '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h1 id="firstHeading" class="firstHeading">Футбольне поле</h1>' +
            '<div id="bodyContent">' +
            '<p>Вулиця:<br>Тип поля:<br>Покриття поля:<br>Стан:добре/середнє/погано<br>Кількість гравців:0/11<br></p>' +
            '</div>' +
            '</div>'
    },
    {
        lat: 49.829016,
        lng: 24.040664,
        info: '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h1 id="firstHeading" class="firstHeading">Футбольне поле</h1>' +
            '<div id="bodyContent">' +
            '<p>Вулиця:<br>Тип поля:<br>Покриття поля:<br>Стан:добре/середнє/погано<br>Кількість гравців:0/11<br></p>' +
            '</div>' +
            '</div>'
    },
    {
        lat: 49.836154,
        lng: 24.045871,
        info: '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h1 id="firstHeading" class="firstHeading">Футбольне поле</h1>' +
            '<div id="bodyContent">' +
            '<p>Вулиця:<br>Тип поля:<br>Покриття поля:<br>Стан:добре/середнє/погано<br>Кількість гравців:0/11<br></p>' +
            '</div>' +
            '</div>'
    },
    {
        lat: 49.835228,
        lng: 24.051481,
        info: '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h1 id="firstHeading" class="firstHeading">Футбольне поле</h1>' +
            '<div id="bodyContent">' +
            '<p>Вулиця:<br>Тип поля:<br>Покриття поля:<br>Стан:добре/середнє/погано<br>Кількість гравців:0/11<br></p>' +
            '</div>' +
            '</div>',
    },
    {
        lat: 49.842313,
        lng: 24.042909,
        info: '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h1 id="firstHeading" class="firstHeading">Футбольне поле</h1>' +
            '<div id="bodyContent">' +
            '<p>Вулиця:<br>Тип поля:<br>Покриття поля:<br>Стан:добре/середнє/погано<br>Кількість гравців:0/11<br></p>' +
            '</div>' +
            '</div>'
    },
    {
        lat: 49.841194,
        lng: 24.049651,
        info: '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h1 id="firstHeading" class="firstHeading">Футбольне поле</h1>' +
            '<div id="bodyContent">' +
            '<p>Вулиця:<br>Тип поля:<br>Покриття поля:<br>Стан:добре/середнє/погано<br>Кількість гравців:0/11<br></p>' +
            '</div>' +
            '</div>'
    },
    {
        lat: 49.840892,
        lng: 24.041287,
        info: '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h1 id="firstHeading" class="firstHeading">Футбольне поле</h1>' +
            '<div id="bodyContent">' +
            '<p>Вулиця:<br>Тип поля:<br>Покриття поля:<br>Стан:добре/середнє/погано<br>Кількість гравців:0/11<br></p>' +
            '</div>' +
            '</div>'
    },

    {
        lat: 49.838630,
        lng: 24.015074,
        info: '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h1 id="firstHeading" class="firstHeading">Футбольне поле</h1>' +
            '<div id="bodyContent">' +
            '<p>Вулиця:<br>Тип поля:<br>Покриття поля:<br>Стан:добре/середнє/погано<br>Кількість гравців:0/11<br></p>' +
            '</div>' +
            '</div>'
    },
    {
        lat: 49.829556,
        lng: 24.003957,
        info: '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h1 id="firstHeading" class="firstHeading">Футбольне поле</h1>' +
            '<div id="bodyContent">' +
            '<p>Вулиця:<br>Тип поля:<br>Покриття поля:<br>Стан:добре/середнє/погано<br>Кількість гравців:0/11<br></p>' +
            '</div>' +
            '</div>'
    },
    {
        lat: 49.824094,
        lng: 24.004540,
        info: '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h1 id="firstHeading" class="firstHeading">Футбольне поле</h1>' +
            '<div id="bodyContent">' +
            '<p>Вулиця:<br>Тип поля:<br>Покриття поля:<br>Стан:добре/середнє/погано<br>Кількість гравців:0/11<br></p>' +
            '</div>' +
            '</div>'
    },
    {
        lat: 49.813748,
        lng: 24.010828,
        info: '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h1 id="firstHeading" class="firstHeading">Футбольне поле</h1>' +
            '<div id="bodyContent">' +
            '<p>Вулиця:<br>Тип поля:<br>Покриття поля:<br>Стан:добре/середнє/погано<br>Кількість гравців:0/11<br></p>' +
            '</div>' +
            '</div>'
    },
    {
        lat: 49.819312,
        lng: 24.048137,
        info: '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h1 id="firstHeading" class="firstHeading">Футбольне поле</h1>' +
            '<div id="bodyContent">' +
            '<p>Вулиця:<br>Тип поля:<br>Покриття поля:<br>Стан:добре/середнє/погано<br>Кількість гравців:0/11<br></p>' +
            '</div>' +
            '</div>'
    },
    {
        lat: 49.810714,
        lng: 24.072403,
        info: '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h1 id="firstHeading" class="firstHeading">Футбольне поле</h1>' +
            '<div id="bodyContent">' +
            '<p>Вулиця:<br>Тип поля:<br>Покриття поля:<br>Стан:добре/середнє/погано<br>Кількість гравців:0/11<br></p>' +
            '</div>' +
            '</div>'
    },
    {
        lat: 49.798473,
        lng: 24.059443,
        info: '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h1 id="firstHeading" class="firstHeading">Футбольне поле</h1>' +
            '<div id="bodyContent">' +
            '<p>Вулиця:<br>Тип поля:<br>Покриття поля:<br>Стан:добре/середнє/погано<br>Кількість гравців:0/11<br></p>' +
            '</div>' +
            '</div>'
    },

]


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');



    // Create markers.
    features.forEach(function(feature) {
        var marker = new google.maps.Marker({
            position: feature.position,
            icon: icons[feature.type].icon,
            map: map
        });
    });
}