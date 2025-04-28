import React from "react";
import { useState, useEffect } from "react";
import "./ExternalAPIWeather.css";
import {ConvertMonth, ConvertDayOfWeek} from "./DateTimeUtil";

const debug_mode = false;

/*
* 1) Make call to weather.gov API based on user's coordinates /points/{latitude},{longitude}
* 2) Obtain the id and name of the closest weather observation station given in properties.observationStations
* 3) Make call to weather.gov API based on station: /stations/{stationId}/observations/latest
* 4) Extract some basic weather data from that JSON response
*/
function ExternalAPIWeather() {

    //const [location, setLocation] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentWeather, setCurrentWeather] = useState({});

    useEffect(() => {
        const fetchWeather = async () => {
            setIsLoading(true);
    
            //https://api.weather.gov/points/{latitude},{longitude}
                
            await fetch("https://api.weather.gov/stations")
                .then ((response) => {
                    if (!response.ok) {
                        throw new Error("Weather.gov API is not responding");
                    }

                    if ("geolocation" in navigator) {
                        navigator.geolocation.getCurrentPosition((position) => {
                            let lat, long;
        
                            lat = position.coords.latitude;
                            long = position.coords.longitude;
                
                            if (debug_mode)
                                console.log("Latitude: " + lat + " longitude: " + long);

                            fetch(`https://api.weather.gov/points/${lat},${long}`)
                                .then((response) => {
                                    if (!response.ok) {
                                        throw new Error(`Error while fetching Weather.gov API for coords: ${response.status}`);
                                    }
                                    return response.json();
                                }).then((data) => {
                    
                                    if (debug_mode) {
                                        console.log("Weather data: ");
                                        console.log(data);
                                    }
                                    
                                    //get list of closest weather stations
                                    let nearbyStationsListEndpoint = data.properties.observationStations;
                    
                                    if (debug_mode)
                                        console.log("nearby stations list: " + nearbyStationsListEndpoint);
                    
                                    return fetch(nearbyStationsListEndpoint);
                                }).then((response) => {
                                    if (!response.ok) {
                                        throw new Error("Error fetching station thru Weather.gov API");
                                    }
                                    return response.json();
                                }).then((data) => {
                    
                                    if (debug_mode) {
                                        console.log("Stations list data: ");
                                        console.log(data);
                                    }
                    
                                    //get id/name of the closest station (first one)
                    
                                    let nearestStationId = data.observationStations[0].slice(-4);
                    
                                    if (debug_mode)
                                        console.log("Nearest station ID: " + nearestStationId);
                    
                                    //call the endpoint
                                    return fetch(`https://api.weather.gov/stations/${nearestStationId}/observations/latest`);
                                }).then((response) => {
                                    if (!response.ok) {
                                        throw new Error("Error fetching weather data from station");
                                    }
                                    return response.json();
                                }).then((data) => {
                    
                                    if (debug_mode) {
                                        console.log("Observation data: ");
                                        console.log(data);
                                    }
                    
                                    //extract basic weather info
                                    //temperature and conditions right now.
                                    let weatherText = data.properties.textDescription;
                                    let temperature = data.properties.temperature.value; // Celsius
                                    let iconURL = data.properties.icon; // the URL for the icon representing the weather
                    
                                    const newWeather = {
                                        weather: weatherText,
                                        temperature: temperature,
                                        iconURL: iconURL, 
                                    }
                    
                                    setCurrentWeather(newWeather);
                                    setIsLoading(false);

                                    if (debug_mode) {
                                        console.log("Set weather data to: ");
                                        console.log(newWeather);
                                    }
                                        
                    
                                }).catch((error) => {
                                    window.alert("Error: " + error);
                                });
                        });
                    }
                }).catch((error) => {
                    window.alert("Weather.gov API error: " + error);
                });
        };

        fetchWeather();
    }, []);

    return (
        <div className="weather">
            {isLoading ? (<Loading />) : 
                <WeatherWidget weatherObj={currentWeather}/>
            }
        </div>
    );
}

function WeatherWidget({ weatherObj }) {

    if (debug_mode) {
        console.log("Weather Widget received: ");
        console.log(weatherObj);
    }

    const date = new Date();

    const today = {
        year: date.getFullYear(),
        month: ConvertMonth(date.getMonth()),
        date: date.getDate(),
        dayOfWeek: ConvertDayOfWeek(date.getDay()),
    }

    return(
        <div className="weather-widget">
            <h2 className="weather-header" aria-label="Today's Date">{today.dayOfWeek}, {today.month} {today.date}, {today.year}</h2>
            <img className="weather-icon" aria-label="Weather Icon" src={weatherObj.iconURL} />
            <p className="weather-text" aria-label="Today's Weather Condition">Today's weather is: {weatherObj.weather}</p>
            <p className="temperature-text" aria-label="Today's Temperature">Temperature: {weatherObj.temperature}&deg; C</p>
        </div>
    );
}

function Loading() {
    return (
        <div className="loading">
            <p>Loading...</p>
        </div>
    );
}

export {ExternalAPIWeather as Weather};