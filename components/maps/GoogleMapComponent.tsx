import React, { useEffect, useState } from 'react';
import { GoogleMapReact} from 'google-map-react';
import { useSelector } from 'react-redux';
import { RootStateType } from '@/store/store';
import PropTypes from 'prop-types';


const getMapBounds = (map, maps, places ) => {
  const bounds = new maps.LatLngBounds();

  places.forEach((place) => {
    bounds.extend(new maps.LatLng(
      place.lat,
      place.lng,
    ));
  });
  return bounds;
};
// Re-center map when resizing the window
const bindResizeListener = (map, maps, bounds) => {
  maps.event.addDomListenerOnce(map, 'idle', () => {
    maps.event.addDomListener(window, 'resize', () => {
      map.fitBounds(bounds);
    });
  });
};

const GoogleMapAffich = ({children, ...props}) => {

return( <div className='flex justify-center items-center'>
    <GoogleMapReact  {...props}>
        {children}
    </GoogleMapReact>
</div>
    )

}

GoogleMapAffich.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

GoogleMapAffich.defaultProps = {
  children: null,
};

// -----------------------COMP 
export const GoogleMapComponent = () => {
 const {organisationsContext} = useSelector((state:RootStateType) => state.viewer)
const [coords, setCoords] = useState({
    latitude:41.3954,
    longitude:2.162
})

const [coordsState, setCoordsState] = useState([])
/* useEffect(() => {
  navigator.geolocation.getCurrentPosition(({coords:{latitude, longitude}}) => {
    setCoords({
        latitude, longitude
    })
  })
}, [])
 */
const [places, setPlaces] = useState([])
useEffect(() => {
    
  for(let org of organisationsContext)  {
    setPlaces((places )=>
        typeof places[0] !== 'undefined'? [...places, org.addressGeo]:[org.addressGeo] 
        )}
    for(let org of organisationsContext) {

        if(typeof coordsState !== 'undefined' && typeof coordsState[0] !== 'undefined' ) {
            setCoordsState([{lat:org.coords.lat, lng:org.coords.long}])
        }else {
            setCoordsState([...coordsState,{lat:org.coords.lat, lng:org.coords.long}])
        }
    }
    console.log({coordsState, places})
        }, [organisationsContext])

function apiIsLoaded(map, maps, places){
    const bounds = getMapBounds(map, maps, places);
  // Fit map to bounds
     map.fitBounds(bounds);
  // Bind the resize listener
    bindResizeListener(map, maps, bounds);
  
};
// Re-center map when resizing the window
 useEffect(() => {
   
        console.log({coordsState, places})

 
 }, [coordsState, places])
 
const yesIWantToUseGoogleMapApiInternals = true
    const mapStyles = {
        height: "20vh",
        width: "100%"
    };

    const defaultCenter = {
        lat: 41.3851, lng: 2.1734
    }



    
        return (
        <div className='flex flex-row justify-between items-center'> 
            <div className='flex flex-col justify-start items-center w-1/2'>
                { organisationsContext && organisationsContext.map((org, index)  => {
                    return (<div key={org.contact} className=' font-sans text-blue-400'>
                            {org.addressGeo}
                    </div>)
                })  
                }
                </div>
       
             < div className='flex flex-col justify-start items-center w-1/2'>  
            {/* <GoogleMapAffich 
                bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}}
                defaultCenter={[coords.latitude,coords.longitude]}
                defaultZoom={10}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => {({ map, maps }) => apiIsLoaded(map, maps, coordsState)}}
                 >
                    {
                        places.map((plce, index) => {
                            return (
                                <div key={index} className='text-sm text-blue-400 '>
                                    {plce}
                                </div>
                                )
                            })
                        }
        </GoogleMapAffich > */}
            </div>
    </div>
    )
}

