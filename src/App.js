import { useState, useEffect } from "react";
import Main from "./components/main";
import "./App.css";
import Dashboard from "./components/dashboard ";
import axios from "axios";
import Cities from "./components/cities";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";
import { css } from "@emotion/react";

function App() {
  const [location, setLocation] = useState({});
  const [reload, setReload] = useState(false);
  const [lon, setLon] = useState();
  const [lat, setLat] = useState();
  const [backgroundImageUrl, setBackgroundImageUrl] = useState();
  const UNSPLASH_CLIENT_ID = "Wu__o7pfhamFtUVXsFJrNWdpUN1wsRjx1JxTk5lsAyk";
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const [weatherData, setWeatherData] = useState();
  const WEATHER_API_KEY = "9feb1271cecb451e96171456222705";
  let [color, setColor] = useState("#50E3C2");

  const override = css`
    display: block;
    margin: 50vh 45vw;
    border-color: red;
  `;

  const showError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
      default:
        alert("Error");
    }
  };

  const assignLocation = (position) => {
    setLocation((pre) => ({ ...pre, lat: position.coords.latitude }));
    setLocation((pre) => ({ ...pre, lon: position.coords.longitude }));
    setLat(position.coords.latitude);
    setLon(position.coords.longitude);
  };

  const getlocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(assignLocation, showError);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getlocation();

    typeof lat !== "undefined" &&
      axios
        .get(
          `https://api.worldweatheronline.com/premium/v1/weather.ashx?key=${WEATHER_API_KEY}&q=${lat},${lon}&format=json`
        )
        .then((res) => {
          setWeatherData(res.data);
        });

    typeof lat !== "undefined" &&
      axios
        .get(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
        )
        .then((res) => {
          setCity(res.data.city);
          setCountry(res.data.countryName);
        });
  }, [lat, lon]);
  useEffect(() => {
    typeof city !== "undefined" &&
      axios
        .get(
          `https://api.unsplash.com/photos/random?orientation=landscape&query=weather&client_id=${UNSPLASH_CLIENT_ID}`
        )
        .then((res) => {
          setBackgroundImageUrl(res.data.urls.full);
        });
  }, [city]);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                {typeof lat === "undefined" ? (
                  <ClimbingBoxLoader color={color} css={override} />
                ) : typeof lon === "undefined" ? (
                  <ClimbingBoxLoader css={override} color={color}/>
                ) : typeof city === "undefined" ? (
                  <ClimbingBoxLoader color={color} css={override} />
                ) : typeof backgroundImageUrl === "undefined" ? (
                  <ClimbingBoxLoader color={color} css={override}/>
                ) : (
                  <Main
                    backgroundImageUrl={backgroundImageUrl}
                    lat={location.lat}
                    lon={location.lon}
                    city={city}
                    country={country}
                    weatherData={weatherData}
                  />
                )}
           
                <Cities city={city} country={country} />

              </>
            }
          >
            {}
          </Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
