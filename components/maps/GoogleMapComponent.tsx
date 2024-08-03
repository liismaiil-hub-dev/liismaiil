import { RootStateType } from '@/store/store';
import {APIProvider, Map, useMap,   Marker,
  useMarkerRef} from '@vis.gl/react-google-maps';
import { useRef } from 'react';
import { useSelector } from 'react-redux';

const options = {
    mapId: "c3ecb1eac5683d99",
     mapTypeControl:false,   
    streetViewControl:false   
}

const center = {
    lat:14.346076882072916, 
    lng:-16.408125736499372
    
};
const GoogleMapComponent = () => {
  const markerRef  = useRef(null);
  
 const map = useMap();

const { orgCoords } = useSelector((state: RootStateType) => state.guest)
console.log({orgCoords});

return( <APIProvider apiKey={ process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY!}>
    <Map
      style={{width: '100vh', height: '50vh'}}
      defaultCenter={center}
      defaultZoom={2}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
    />
{orgCoords && orgCoords.map((coor, index) =>{
  const { lat, long} = coor.coords
return <Marker key={`${index}_${coor.coords.lat}`}ref={markerRef} position={{lat , lng: long}} />
}) 
}  </APIProvider>)
  }
export default GoogleMapComponent 