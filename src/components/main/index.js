// import axios from "axios";
// import { useState, useEffect } from "react";
import "../../css/main/main.css";
import DateLocation from "./dateLoc";
import WeatherInfo from "./weatherInfo";


const Main = (props) => {


 
const backgroundImages = ['../../images/davies-designs-studio-G-6kwVnClsE-unsplash.jpg','../../images/joshua-reddekopp-7Oq9r2CiTLg-unsplash.jpg','../../images/wolfgang-hasselmann-bR_-gllg7Bs-unsplash.jpg']

  return (
    <div
      className="main"
      style={{ backgroundImage: `url(${props.backgroundImageUrl === "undefined" ? backgroundImages[Math.floor(Math.random()*(2-0+1)+0)]: props.backgroundImageUrl})` }}
    >
      <DateLocation city={props.city} country={props.country} />
      <WeatherInfo weatherData={props.weatherData} city={props.city} lat={props.lat} lon={props.lon} />
    </div>
  );
};

export default Main;
