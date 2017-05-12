var styles = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8ec3b9"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1a3646"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#64779e"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#334e87"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6f9ba5"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3C7680"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#304a7d"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2c6675"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#255763"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#b0d5ce"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3a4762"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#0e1626"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#4e6d70"
      }
    ]
  }
];


// Intailazing the map
var myMap;

//my location
 var myLocation = { lat:30.7333 , lng:76.7794};

var markers = [];

var infowindow;

//we gonna fetch cinema

function markerContians( marker ) {
    for( var i in markers ) {
        if( markers[ i ].title == marker )
            return false;
    }
    return true;
}

function Problem(){
    myAppViewViewModel.isError(true);
    myAppViewViewModel.messageError('Cant Load the map');

}

function fetchCinema() {
    $.ajax({
        url : 'https://api.foursquare.com/v2/venues/search?v=20161016&ll=30.7333%2C%2076.7794&query=cinema&intent=checkin&client_id=WH3GKM1O1L1GEBHZJ35IZ0CFQCJH5B3RJ2KJQK1YGHHEPA5W&client_secret=QQF4CZ4VVOVYPDCMRBAT3YLRRGZIE3S3VT5DP4VCE41UU4OR',
        async : true,
    }).done( function( tempData ) {

        var bounds = new google.maps.LatLngBounds();
        var metadata = tempData.response.venues;

        for( var i in metadata ) {
            //console.log( metadata[ i ] );
            if( markerContians( metadata[ i ].name) )
            {
            var marker = new google.maps.Marker({
                position: {
                    lat : metadata[ i ].location.lat,
                    lng : metadata[ i ].location.lng,
                },
                title : metadata[ i ].name,
                map: myMap,
                animation : google.maps.Animation.DROP,
                address : metadata[ i ].location.address
            });
            bounds.extend( marker.position );

                markers.push( marker );
            marker.addListener('click' , function() {
                openInfoWindow( this , infowindow );
            });
        }
        }
        myMap.fitBounds( bounds );
        myAppViewViewModel.constructor();
    }).fail( function( response , status , error ){
         myAppViewViewModel.isError(true);
         myAppViewViewModel.messageError('Cant Load the locations');
    });
}

function openInfoWindow ( marker , infowindow ) {

    if( infowindow.marker != marker )
    {
        StopMarker();
    }
    infowindow.marker = marker;

    DanceMarker();

    var content = '<h2>' + marker.title+'</h2>';
    content += 'Adress : <i>'+ (marker.address == undefined ? 'Not Available' : marker.address)+'</i>';
    infowindow.setContent( content);
    infowindow.open( map ,marker);

    infowindow.addListener('closeclick' , function(){
        StopMarker();
    });
}


function StopMarker() {
    if( infowindow.marker !== undefined ) {
        infowindow.marker.setAnimation( null );
        infowindow.marker.setIcon( null );

    }
}

function DanceMarker() {
        infowindow.marker.setAnimation( google.maps.Animation.BOUNCE );
        infowindow.marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
}


function DefaultMap () {
    infowindow = new google.maps.InfoWindow();
    myMap = new google.maps.Map( document.getElementById('map') ,
    {
        styles : styles,
        center : myLocation,
        zoom : 14,
    });
    fetchCinema();
}


function selectCinema( title ) {
    for( var i in markers ) {
        if( markers[ i ].title == title )
        {
            openInfoWindow( markers[ i ] , infowindow );
            return;
        }
    }
}

var myAppViewViewModel = {
    isError : ko.observable(false),
    messageError : ko.observable(''),
    locationList : ko.observableArray(),
    query : ko.observable(''),
    constructor : function () {
        for( var i in markers )
        {
            myAppViewViewModel.locationList.push( markers[ i ].title );
        }
    },

    findQuery : function( text ){
        myAppViewViewModel.locationList.removeAll();
        for( var i in markers )
        {
            if( markers[ i ].title.toLowerCase().indexOf( text.toLowerCase() ) > -1 )
            {
                markers[ i ].setVisible( true );
                myAppViewViewModel.locationList.push( markers[ i ].title );
            }
            else
            {
                markers[ i ].setVisible( false );
            }
        }
    }

};
ko.applyBindings( myAppViewViewModel );
myAppViewViewModel.query.subscribe( myAppViewViewModel.findQuery );