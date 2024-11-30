import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { setKey, geocode, fromLatLng, setLanguage } from "react-geocode";
import LunchButton from "../../components/LunchButton/LunchButton";

const Home: React.FC = () => {
  const [location, setLocation] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({
    latitude: null,
    longitude: null,
  });

  setKey("AIzaSyBXF7D9rXMsUxWXnXkggYnIIjIQHsLTDvA");
  setLanguage("en");
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const handleButtonClick = () => {
    console.log(
      `Latitude:${location.latitude},Longitude:${location.longitude}`
    );
  };
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      console.log(error);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        setError(null);
      },
      (err) => setError(`Error:${err.message}`)
    );
  }, []);
  useEffect(() => {
    if (location.longitude && location.latitude) {
      fromLatLng(location.latitude || 0, location.longitude || 0)
        .then((response) => {
          const formattedAddress = response.results[0]?.formatted_address;
          setAddress(formattedAddress || "Address not found");
        })
        .catch((err) => {
          setError("Dailed to fetch address.");
        });
    }
  });
  return (
    <div>
      <h1>Where are you?</h1>
      <div>
        <p>Latitude:{location.latitude}</p>
        <p>Lonitude:{location.longitude}</p>
        <p>Address: {address}</p>
        <LunchButton
          label="Lunch Off"
          onClick={handleButtonClick}
        ></LunchButton>
      </div>
    </div>
  );
};

export default Home;
