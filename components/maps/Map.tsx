'use client'
import { RootStateType } from '@/store/store';
import { GoogleMap, InfoWindowF, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';


const containerStyle = {
  width: '100%',
  height: '500px'
};
const options = {
    mapId: "c3ecb1eac5683d99",
     mapTypeControl:false,   
    streetViewControl:false   
}

function MyComponent() {
    
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY!
    })
    const {  orgCoords } = useSelector((state: RootStateType) => state.guest)
    const [infoWindowOpen, setInfoWindowOpen] = useState(false);
    const center = {
        lat:14.346076882072916, 
        lng:-16.408125736499372
        
    };
    
    const [map, setMap] = React.useState(null)

    
    const mapRef = useRef(null)
    const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        
        setMap(map)
        mapRef.current = map
    }, [])
    const handleMarkerClick = (event) => {
        setInfoWindowOpen((infoWindow)=> !infoWindow )
        console.log({event});
        
    }
    const handleClose = () => {
        setInfoWindowOpen(false )
        
    }
    const handleMarkerDrag = (event) => {
        console.log({event});
        
    }
    

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
      onClick={() => {
    setInfoWindowOpen((infoWindow)=> !infoWindow )}}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={0}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={options}
      >
        {orgCoords && orgCoords.map((coo, index) =>  <MarkerF key={`${index}_${coo.coords.lat}`} position={{lat:coo.coords.lat, lng:coo.coords.long}}
        cursor={'pointer'}
        label={{text:coo.addressGeo.substring(0, 11),
            className:'text-emerald-50 font-thin bg-slate-500 '}}
            onClick={handleMarkerClick }
            onDrag={handleMarkerDrag }
            >{infoWindowOpen &&
      <InfoWindowF onCloseClick={handleClose} position={{lat:coo.coords.lat, lng:coo.coords.long}}>
        <div className="flex justify-center w-10 h-10 items-center">
            {coo.addressGeo.substring(0, 11)}
            </div> 
        
        </InfoWindowF> }         
    
    </MarkerF>

    )
        }
      </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)