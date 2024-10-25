import React, { useEffect, useState } from "react";
import useEvData from "./customhooks/evhooks";
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import icon from "leaflet/dist/images/marker-icon.png";
import L from "leaflet";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;
const GeoDistribution = () => {
    const { vehicleLocationsData } = useEvData();
    const position = [vehicleLocationsData[0].lat, vehicleLocationsData[0].lng]
    return (
        <MapContainer
        center={position} zoom={10} 
            scrollWheelZoom={false}
            style={{ height: '500px', width: '100%' }} // Set height and width
        >
            <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
   
    {vehicleLocationsData.map((location, index) => (
        <Marker key={index} position={[location.lat, location.lng]} >
            <Popup>
                VIN: {location.VIN}<br />
                Make: {location.make}<br />
                Model: {location.model}
            </Popup>
        </Marker>
    ))}
        </MapContainer>
    );
}

export default GeoDistribution;
