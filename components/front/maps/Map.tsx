'use client'
import React, { useState, useMemo } from 'react'
import Map, {
    Marker,
    Popup,
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl
} from 'react-map-gl';

/* import ControlPanel from './control-panel'; */
import Pin from './pin';
// lat: 48.8678, long: 2.30473
export default function MapComponent({ long, lat, city }: { long: number, lat: number, city: string }) {
    const [popupInfo, setPopupInfo] = useState('');
    const pins = useMemo(() =>
        <Marker
            longitude={long}
            latitude={lat}
            anchor="bottom"
            onClick={e => {
                // If we let the click event propagates to the map, it will immediately close the popup
                // with `closeOnClick: true`
                e.originalEvent.stopPropagation();
                setPopupInfo(city);
            }}
        >
            <Pin />
        </Marker>
        ,
        [city, long, lat])


    return (
        <>
            <Map
                initialViewState={{
                    latitude: lat,
                    longitude: long,
                    zoom: 7,
                    bearing: 0,
                    pitch: 0
                }}

                mapStyle="mapbox://styles/mapbox/dark-v9"
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
            >
                {/*    <GeolocateControl position="top-left" />
                <FullscreenControl position="top-left" />
                <NavigationControl position="top-left" />
                <ScaleControl />

                {pins}

                {popupInfo && (
                    <Popup
                        anchor="top"
                        longitude={Number(long)}
                        latitude={Number(lat)}
                        onClose={() => setPopupInfo('no description')}
                    >
                        <div>
                            {city},
                        </div>
                    </Popup> 
                )}*/}
            </Map>
            {/*             <ControlPanel /> */}
        </>
    );
}

