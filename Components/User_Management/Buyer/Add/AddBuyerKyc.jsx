import React, { useState, useRef, useEffect } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const AddBuyerKyc = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [city, setCity] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const mapRef = useRef(null); // Ref for the map container element
  const map = useRef(null); // Ref for the Google Maps instance

  const handlePlaceSelect = async (place) => {
    setSelectedPlace(place);

    try {
      // Fetch additional place details using Google Places API
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.value.place_id}&fields=address_components,geometry`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      // Extract city information from address components
      const addressComponents = data.result.address_components;
      const cityComponent = addressComponents.find(
        (component) => component.types.includes('locality')
      );

      if (cityComponent) {
        setCity(cityComponent.long_name);
      }

      // Extract latitude and longitude
      const { lat, lng } = data.result.geometry.location;
      setLatitude(lat);
      setLongitude(lng);

      // Initialize the map if it's not already initialized
      if (!map.current) {
        map.current = new window.google.maps.Map(mapRef.current, {
          center: { lat: parseFloat(lat), lng: parseFloat(lng) },
          zoom: 15,
        });
      } else {
        // Update the map center if already initialized
        map.current.setCenter({ lat: parseFloat(lat), lng: parseFloat(lng) });
      }
    } catch (error) {
      console.error('Error fetching place details:', error);
    }
  };

  useEffect(() => {
    if (map.current && latitude && longitude) {
      // Update the map center if latitude and longitude change
      map.current.setCenter({ lat: parseFloat(latitude), lng: parseFloat(longitude) });
    }
  }, [latitude, longitude]);

  return (
    <div>
      <GooglePlacesAutocomplete
        apiKey="AIzaSyBQ8OY_ywbcak88FtstwOW61O1hUJ8xGCk"
        onSelect={handlePlaceSelect}
      />
      {selectedPlace && (
        <div>
          <p>Selected City: {city}</p>
          <label>
            Latitude:
            <input type="text" value={latitude} readOnly />
          </label>
          <label>
            Longitude:
            <input type="text" value={longitude} readOnly />
          </label>
          <div
            ref={mapRef}
            style={{ width: '100%', height: '400px', marginTop: '20px' }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default AddBuyerKyc;
