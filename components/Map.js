import { useState } from 'react';
import ReactMapGL , {Marker, Popup} from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';

function Map({ searchResults }) {

    const [selectedLocaion, setSelectedLocaion] = useState({});

    //Transform the serach resulta object into the {lat : long:} object

    const cordinates = searchResults.map(result => ({
        longitude: result.long,
        latitude: result.lat,
    }));

    const center = getCenter(cordinates);

    console.log(center)

    const [viewport , setViewport] = useState({

        width: "100%",
        height: "100%",
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 12,

    });


    return (
        <ReactMapGL 
            mapStyle= 'mapbox://styles/kusal1215/ckt05aq9a01ns18o47m5566sa'
            mapboxApiAccessToken={process.env.mapbox_key}
            {...viewport}
            onViewportChange = {(nextViewport) => setViewport(nextViewport)}
        >
          {searchResults.map(result => (
              <div key={result.long}>
                <Marker
                    longitude ={result.long}
                    latitude = {result.lat}
                    offsetLeft = {-20}
                    offsetTop = {-10}
                >
                    <p 
                        role="img"
                        onClick={() =>  setSelectedLocaion(result)}
                        className="cursor-pointer text-2xl animate-bounce"
                        aria-label="push-pin"
                    >
                        📍
                    </p>
                </Marker>

                {/* the popup that show idf we click on the marker */}
                {selectedLocaion.long === result.long ? (
                    <Popup
                        onClose={() => setSelectedLocaion({})}
                        closeOnClick ={true}
                        latitude={result.lat}
                        longitude= {result.long}
                    >
                        {result.title}
                    </Popup>
                ):(
                    false
                )}

              </div>
          ))}  
        </ReactMapGL>
    )
}

export default Map
