"use client"

import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';

interface GoogleMapProps {
    street: string;
    city: string;
    country: string;
    houseNumber: string;
    postalCode: string;
    shouldFetch: boolean;
}

const getGeoLocation = async (street: string, city: string, country: string, houseNumber: string, postalCode: string) => {
    const address = `${street} ${houseNumber}, ${city} ${postalCode}, ${country}`;
    const link = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(address)}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
    const geocodeResponse = await fetch(link);
    const geocodeData = await geocodeResponse.json();
    if (geocodeData.results.length > 0) {
        const { lat, lng } = geocodeData.results[0].geometry.location;
        return { lon: lng, lat };
    }
    return null;
} 

const GoogleMap = ({
    street,
    city,
    country,
    houseNumber,
    postalCode,
    shouldFetch
} : GoogleMapProps) => {
    const [location, setLocation] = useState<{ lat: number, lon: number } | null>(null);

    useEffect(() => {
        const fetchLocation = async () => {
           
                const newLocation = await getGeoLocation(street, city, country, houseNumber, postalCode);
                if (newLocation) {
                    setLocation(newLocation);
                }
            
        };
        if(shouldFetch) {
            fetchLocation();
    }
    }, [shouldFetch]);

    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
            <div className='ml-16 w-full shadow-lg rounded-3xl overflow-hidden'>
                <Map
                    defaultZoom={12}
                    center={location ? { lat: location.lat, lng: location.lon } : { lat: 52.241297079639075, lng: 21.008538680558885 }}
                >
                    {location && (
                        <Marker position={{ lat: location.lat, lng: location.lon }} />
                    )}
                </Map> 
            </div>
        </APIProvider>
    );
}

export default GoogleMap;
