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
            $('form').submit();
        }
    }
});

document.getElementById("text")
    .addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("send").click();
        }
    });

var contentString = '<div id="content">' +
    '<div id="siteNotice">' +
    '</div>' +
    '<h1 id="firstHeading" class="firstHeading">Футбольне поле</h1>' +
    '<div id="bodyContent">' +
    '<p>Вулиця:<br>Тип поля:<br>Покриття поля:<br>Стан:добре/середнє/погано<br>Кількість гравців:0/11<br></p>' +
    '</div>' +
    '</div>';

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 14,
        width: 100
    });




    var infoWindow = new google.maps.InfoWindow({ map: map });



    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    var marker = new google.maps.Marker({
        position: { lat: 49.842560, lng: 24.035905 },
        map: map,
        title: 'Legalizuem.ru',
        icon: {
            url: "img//ball.svg",
            scaledSize: new google.maps.Size(32, 32)
        }
    });
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
}

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