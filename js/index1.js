
window.onload=()=>{
  displayCovid();
}


var map;
var markers = [];
var infoWindow;
function initMap() {

  var styledMapType=new google.maps.StyledMapType(
    [
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
    ],{name:'Styled Map'}
  )


var India = {
        lat:20.5937,
        lng:78.9629
      };

  map = new google.maps.Map(document.getElementById('map'), {
      center: India,
      zoom: 4,
      mapTypeControlOptions: {
        mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                'styled_map']
      }
    });




 //Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');
// ******************************************************
   infoWindow = new google.maps.InfoWindow();
    // displayCovid()
    // showCovidCountries();
    searchCountry();
    
  }


    function searchCountry(){
      var foundCovid=[];
      
      var country=document.getElementById('country-code-input').value;
      // console.log('country1'+country1)
      // console.log(covids)
      

      if(country){
      covids.forEach(function(covid){
       var countrydata=covid.country;


            if(countrydata == country){
                foundCovid.push(covid);
                // console.log('f')
            }
            // console.log('n')
        });

      }
          else{
        foundCovid=covids
      // console.log(covids)
      }
       
        console.log("*********************")
        console.log(foundCovid)
        console.log("*********************")

    clearLocations()
    displayCovid(foundCovid);
    showCovidCountries(foundCovid);
    setOnClickListener();

    }

function clearLocations() {
    infoWindow.close();
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers.length = 0;
}

function setOnClickListener() {
    var covidElements = document.querySelectorAll('.store-container');
    covidElements.forEach(function(elem, index){
        elem.addEventListener('click', function(){
            google.maps.event.trigger(markers[index], 'click');
        })
    });
}


 function displayCovid(covids) {
    var covidHtml='';
    // console.log(covids)
  covids.forEach(function(covid,index){
      var country=covid.country;
      var confirmed =covid.confirmed;
      var recovered =covid.recovered;
      var deaths =covid.deaths;

      covidHtml+=`
      <button id=index onclick="search(${index})">
            <div class="covid-container">
          <div class="covid-country">
               <h2><b><span></span></b>${country}</h2>   
                    <hr>
                    <div class="covid-confirmed">
                      <h2><b><span>Confirmed:-</span>${confirmed}</h2>  
                    </div>

                    <div class="covid-recovered">
                      <h2><b><span>Recovered:-</span>${recovered}</h2>  
                    </div>

                    <div class="covid-death">
                    <h2><b><span>Deaths:-</span>${deaths}</h2>  
                    </div>
            </div>

                        <div class="covid-number-container">
                            <div class="covid-number">
                               ${index+1}
                            </div>
                            
                        </div>
                    
                    </div>
                    </button>
                    <hr>
                    `

    });
                document.querySelector('.covid-list').innerHTML=covidHtml;

  }


  function  showCovidCountries(covids){
    console.log(covids)
        var bounds = new google.maps.LatLngBounds();

  covids.forEach(function (covid,index){
    var latlng = new google.maps.LatLng(
      covid.coordinates.latitude,
      covid.coordinates.longitude
  );

   var country=covid.country;
   var confirmed=covid.confirmed;
   var recovered=covid.recovered;
   var deaths=covid.deaths;

    bounds.extend(latlng);
    createMarker(latlng ,country,confirmed,recovered,deaths,index)
  })
    map.fitBounds(bounds);
}


function createMarker(latlng ,country,confirmed,recovered,deaths,index){
   var html=`
   <div class="covid-info-window">
            <div class="covid-info-country">
               <h1> ${country}<h1>
            </div>
            <div class="covid-info-confirmed">
               <h2>Confirmed- ${confirmed}</h2>
            </div>
            <div class="covid-info-recovered">
                <h2>Recovered-${recovered}</h2>
            </div>
            <div class="covid-info-deaths">
               <h2>Deaths- ${deaths}</h2>
            </div>
        </div>
        `
        ;
   var marker = new google.maps.Marker({
    map: map,
    position: latlng,
    // zoom:11,
      label: `${index+1}`,
     // draggable: true,

    animation: google.maps.Animation.DROP,
        
  });
google.maps.event.addListener(marker, 'click', function() {
      infoWindow.setContent(html);
      infoWindow.open(map, marker);
    });
    markers.push(marker);
    marker.addListener('click', toggleBounce);

}
function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}


 function search(index) {
  console.log(index)
  covids.forEach(function (covid,index1){
    var latlng = new google.maps.LatLng(
      covid.coordinates.latitude,
      covid.coordinates.longitude
      );

   var country=covid.country;
   var confirmed=covid.confirmed;
   var recovered=covid.recovered;
   var deaths=covid.deaths;
   if(index==index1){
        createMarker(latlng ,country,confirmed,recovered,deaths,index1)

   }
    
  })
       }