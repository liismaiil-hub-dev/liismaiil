import React, { Fragment } from 'react';
import { GoogleMap, LoadScript, Marker, useJsApiLoader } from '@react-google-maps/api';

const MapComponents = () => {

    const locations = [
        {
            name: "Location 1",
            location: {
                lat: 41.3954,
                lng: 2.162
            },
        },
        {
            name: "Location 2",
            location: {
                lat: 41.3917,
                lng: 2.1649
            },
        },
        {
            name: "Location 3",
            location: {
                lat: 41.3773,
                lng: 2.1585
            },
        },
        {
            name: "Location 4",
            location: {
                lat: 41.3797,
                lng: 2.1682
            },
        },
        {
            name: "Location 5",
            location: {
                lat: 41.4055,
                lng: 2.1915
            },
        }
    ];

    const mapStyles = {
        height: "20vh",
        width: "100%"
    };

    const defaultCenter = {
        lat: 41.3851, lng: 2.1734
    }
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY,
        libraries: ['geometry', 'drawing'],
    });
    if (isLoaded)
        return (
        
<div className=" h-1/2 w-fit m-auto flex justify-center items-center">

        <GoogleMap mapContainerStyle={mapStyles}
            zoom={13}
            center={defaultCenter} >
            {
                locations.map(item => {
                    return (
                        <Marker key={item.name} position={item.location} />
                        )
                    })
                }
        </GoogleMap >
                </div>
                
        )
}


export default MapComponents;