import { CollaboratorProfileType } from '@/store/slices/profileSlice';
import { RootStateType } from '@/store/store';
import {
  APIProvider, Map,
  Marker,
  useMap
} from '@vis.gl/react-google-maps';
import { useRef } from 'react';
import { useSelector } from 'react-redux';

const options = {
  mapId: "c3ecb1eac5683d99",
  mapTypeControl: false,
  streetViewControl: false
}

const center = {
  lat: 14.346076882072916,
  lng: -16.408125736499372

};
const GoogleMapComponent = () => {
  const markerRef = useRef(null);
 const { collaboratorProfiles } = useSelector((state: RootStateType) => state.profile)

  return (<APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY!}>
    <Map
      style={{ width: '100vh', height: '50vh' }}
      defaultCenter={center}
      defaultZoom={2}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
    />
    {collaboratorProfiles && collaboratorProfiles.map((coll: CollaboratorProfileType, index) => {
      const { lat, long } = coll?.coords ? coll?.coords! : { lat: 0, long: 0 }
      return <Marker key={`${index}_${coll.tokenId}`} ref={markerRef} position={{ lat, lng: long }} />
    })
    }  </APIProvider>)
}
export default GoogleMapComponent 