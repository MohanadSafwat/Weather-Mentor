import * as d3 from "d3";
import { useEffect, useState } from "react";
import { Icons } from "../../svg";
import { useSearchParams } from "react-router-dom";
import '../../css/dashboard/summary.css'

const Summary = (props) => {
  var time = new Date();

  const [minutes, setMinutes] = useState();
  const [hours, setHours] = useState();
  const [hours24, setHours24] = useState(time.getHours());
  const [amORpm, setAmOrPm] = useState();
  const [date, setDate] = useState();
  const [searchParams] = useSearchParams();

  function formatHoursTo12(date) {
    var hours = date.getHours();
    if (hours >= 12) setAmOrPm("PM");
    else setAmOrPm("AM");
    return hours % 12 || 12;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      var time = new Date();
      setDate(time.toDateString());
      setMinutes(time.getMinutes());
      setHours24(time.getHours());
      setHours(formatHoursTo12(time));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const hourlyTempSVG = () => {
      const hourly = d3.select(".hourly-temp").select("svg");
      hourly
        .append("line")
        .attr("x1", 10)
        .attr("y1", 165)
        .attr("x2", 300)
        .attr("y2", 165)
        .attr("stroke", "white")
        .attr("stroke-width", 1);

      typeof props.futureData.data === "undefined"
        ? console.log("load")
        : props.futureData.data.weather[0].hourly.map((data, index) => {
            hourly
              .append("line")
              .attr("x1", 25 + index * 25)
              .attr("y1", 165)
              .attr("x2", 25 + index * 25)
              .attr("y2", 170)
              .attr("stroke", "white")
              .attr("stroke-width", 1);

            hourly
              .append("circle")
              .attr("class", "circle-" + index + " tooltip")
              .attr("cx", 25 + index * 25)
              .attr("cy", 110 - data.tempC * 2)
              .attr("r", 4)
              .attr("fill", "white")
              .on("mouseover", circleMouseOver);
          });
    };

 

    const circleMouseOver = (event, d) => {
      const circleNumber = event.target.classList[0].split("-")[1];
      d3.select(".info").style("visibility", "visible");

      typeof props.futureData.data === "undefined"
        ? console.log("load")
        : d3
            .select(".info")
            .select("h1")
            .text(props.futureData.data.weather[0].hourly[circleNumber].tempC);
      typeof props.futureData.data === "undefined"
        ? console.log("load")
        : d3
            .select(".info")
            .select("h2")
            .text(
              props.futureData.data.weather[0].hourly[circleNumber]
                .weatherDesc[0].value
            );
      typeof props.futureData.data === "undefined"
        ? console.log("load")
        : d3
            .select(".info")
            .select("p")
            .text(
              covertTime(
                props.futureData.data.weather[0].hourly[circleNumber].time
              )
            );
    };
    const covertTime = (time) => {
      var time12 = time / 100;
      const amOrPm = time12 >= 12 ? " PM" : " AM";
      time12 = time12 % 12;

      if (time12 === 0) {
        time12 = 12;
      }
      return time12 + amOrPm;
    };

    hourlyTempSVG();

  }, [props.futureData.data, hours24]);

  return (
    <div className="summary">
      <div className="left">
        <div className="date-loc">
          <h1>{searchParams.get("city")}</h1>
          <h2>
            Today {hours}:{minutes} {amORpm}
          </h2>
        </div>
        <div className="temp">
          <h1>
            {typeof props.futureData.data === "undefined"
              ? ""
              : props.futureData.data.current_condition[0].temp_C}
            <sup>o</sup>
          </h1>
          <p>
            {typeof props.futureData.data === "undefined"
              ? ""
              : props.futureData.data.weather[0].hourly[Math.floor(hours24 / 3)]
                  .weatherDesc[0].value}
          </p>
        </div>
        <div className="wind-rain">
          <div className="rain-chance">
            <Icons.RainChance />
            <p>
              {typeof props.futureData.data === "undefined"
                ? ""
                : props.futureData.data.weather[0].hourly[Math.floor(hours24 / 3)]
                    .chanceofrain}
              %
            </p>
          </div>
          <div className="wind">
            <Icons.WindIcon />
            <p>
              {typeof props.futureData.data === "undefined"
                ? ""
                : props.futureData.data.current_condition[0].windspeedKmph}
              {" km/h"}
            </p>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="hourly-temp">
          <div className="info">
            <h1></h1>
            <h2></h2>
            <p></p>
          </div>

          <svg></svg>
        </div>
      </div>
    </div>
  );
};

export default Summary;
