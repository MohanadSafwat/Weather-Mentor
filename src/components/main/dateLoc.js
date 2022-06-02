import { useEffect, useState } from "react";
import "../../css/main/dateLoc.css";

const DateLocation = (props) => {
  var time = new Date();

    const [minutes,setMinutes]=  useState(time.getMinutes())
    const [hours,setHours]=  useState(time.getHours() %12)
    const [amORpm,setAmOrPm]=  useState(time.getHours()>=12?'PM':'AM')
    const [date,setDate]=  useState(time.toDateString())
  function formatHoursTo12(date) {
    var hours = date.getHours()  
    if(hours>=12)
    setAmOrPm("PM")
    else 
    setAmOrPm('AM')
    return hours % 12 || 12;
  }
  useEffect(() => {
    const interval = setInterval(() => {
        var time = new Date();
        setDate(time.toDateString())
        setMinutes(time.getMinutes())
        setHours(formatHoursTo12(time))    }, 1000);
    return () => clearInterval(interval);
  }, []);
  

  return (
    <div className="wrap">
      <div className="date">
        <h1>
          {hours}:{minutes<10?"0"+minutes:minutes} <span>{amORpm}</span>
        </h1>
        <h2>{date}</h2>
      </div>
      <div className="location">
        <h1>{props.city}</h1>
        <h3>{props.country}</h3>
      </div>
    </div>
  );
};

export default DateLocation;
