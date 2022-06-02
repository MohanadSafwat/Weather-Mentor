import "../../css/dashboard/index.css";
import { Icons } from "../../svg";
import Row from "./row";
import * as d3 from "d3";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";
import { css } from "@emotion/react";

const Dashboard = (props) => {
  const [futureData, setFutureData] = useState({});
  const [historicalData, setHistoricalData] = useState({});
  let [color, setColor] = useState("#50E3C2");

  const [searchParams] = useSearchParams();
  const override = css`
    display: block;
    margin: 45vh 45vw;
    border-color: red;
  `;

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

      typeof futureData.data === "undefined"
        ? console.log("load")
        : futureData.data.weather[0].hourly.map((data, index) => {
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

    const rainChance = () => {
      var svg = d3
        .select("#rain-chance")
        .select("svg")
        .append("g")
        .attr("transform", "translate(50,45)");

      const P = Math.PI * 2;

      var arc = d3
        .arc()
        .innerRadius(38)
        .outerRadius(45)
        .startAngle(0)
        .endAngle(P);

      svg
        .append("path")
        .attr("class", "arc")
        .attr("d", arc)
        .attr("fill", "#c6def3");

      var arc2 =
        typeof futureData.data === "undefined"
          ? d3.arc().innerRadius(38).outerRadius(45).startAngle(0).endAngle(0)
          : d3
              .arc()
              .innerRadius(38)
              .outerRadius(45)
              .startAngle(0)
              .endAngle(
                futureData.data.weather[0].hourly[Math.floor(hours24 / 3)]
                  .chanceofrain
              );

      svg
        .append("path")
        .attr("class", "arc")
        .attr("d", arc2)
        .attr("fill", "blue");
    };

    const humidity = () => {
      var svg = d3
        .select("#humidity")
        .select("svg")
        .append("g")
        .attr("transform", "translate(50,45)");

      const P = Math.PI * 2;

      var arc = d3
        .arc()
        .innerRadius(38)
        .outerRadius(45)
        .startAngle(0)
        .endAngle(P);

      svg
        .append("path")
        .attr("class", "arc")
        .attr("d", arc)
        .attr("fill", "#EA8F8F");

      var arc2 =
        typeof futureData.data === "undefined"
          ? d3.arc().innerRadius(38).outerRadius(45).startAngle(0).endAngle(0)
          : d3
              .arc()
              .innerRadius(38)
              .outerRadius(45)
              .startAngle(0)
              .endAngle(
                (futureData.data.current_condition[0].humidity * P) / 100
              );

      svg
        .append("path")
        .attr("class", "arc")
        .attr("d", arc2)
        .attr("fill", "#EE3B3B");
    };

    const circleMouseOver = (event, d) => {
      const circleNumber = event.target.classList[0].split("-")[1];
      d3.select(".info").style("visibility", "visible");

      typeof futureData.data === "undefined"
        ? console.log("load")
        : d3
            .select(".info")
            .select("h1")
            .text(futureData.data.weather[0].hourly[circleNumber].tempC);
      typeof futureData.data === "undefined"
        ? console.log("load")
        : d3
            .select(".info")
            .select("h2")
            .text(
              futureData.data.weather[0].hourly[circleNumber].weatherDesc[0]
                .value
            );
      typeof futureData.data === "undefined"
        ? console.log("load")
        : d3
            .select(".info")
            .select("p")
            .text(
              covertTime(futureData.data.weather[0].hourly[circleNumber].time)
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
    rainChance();
    humidity();
  }, [futureData]);

  var time = new Date();

  const [minutes, setMinutes] = useState();
  const [hours, setHours] = useState();
  const [hours24, setHours24] = useState(time.getHours());
  const [amORpm, setAmOrPm] = useState();
  const [date, setDate] = useState();
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
    axios
      .get(
        `https://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=9feb1271cecb451e96171456222705&q=${searchParams.get(
          "loc"
        )}&date=2022-5-31&enddate=2022-6-2&format=json`
      )
      .then((res) => {
        setHistoricalData(res.data);
        // console.log("res1.data", res.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://api.worldweatheronline.com/premium/v1/weather.ashx?key=9feb1271cecb451e96171456222705&q=${searchParams.get(
          "loc"
        )}&format=json`
      )
      .then((res) => {
        setFutureData(res.data);
        // console.log("res2.data", res.data);
      });
  }, []);

  return (
    <div>
      {typeof futureData.data === "undefined" ||
      typeof historicalData.data === "undefined" ? (
        <ClimbingBoxLoader color={color} css={override} />
      ) : (
        <>
          {" "}
          <div className="dashboard-wrap">
            <div className="menu">
              <div className="back">
                <Link to="/">
                  <Icons.Back />
                </Link>
              </div>
              <div className="appIcon">
                <Icons.AppIcon />
              </div>
              <h1>Weather App</h1>
            </div>
            <div className="left">
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
                      {typeof futureData.data === "undefined"
                        ? ""
                        : futureData.data.current_condition[0].temp_C}
                      <sup>o</sup>
                    </h1>
                    <p>
                      {typeof futureData.data === "undefined"
                        ? ""
                        : futureData.data.weather[0].hourly[
                            Math.floor(hours24 / 3)
                          ].weatherDesc[0].value}
                    </p>
                  </div>
                  <div className="wind-rain">
                    <div className="rain-chance">
                      <Icons.RainChance />
                      <p>
                        {typeof futureData.data === "undefined"
                          ? ""
                          : futureData.data.weather[0].hourly[
                              Math.floor(hours24 / 3)
                            ].chanceofrain}
                        %
                      </p>
                    </div>
                    <div className="wind">
                      <Icons.WindIcon />
                      <p>
                        {typeof futureData.data === "undefined"
                          ? ""
                          : futureData.data.current_condition[0].windspeedKmph}
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
              <div className="table">
                {typeof historicalData.data === "undefined"
                  ? ""
                  : typeof futureData.data == "undefined"
                  ? ""
                  : historicalData.data.weather
                      .slice(-3, -1)
                      .concat(futureData.data.weather.slice(0, 5))
                      .map((data, index) => {
                        return <Row id={index} data={data} />;
                      })}
              </div>
            </div>
            <div className="right-container" >
              <div className="sub-info">
                <div className="left">
                  <h1>Wind</h1>
                  <p>Today wind speed</p>
                  <h3>
                    {typeof futureData.data === "undefined"
                      ? ""
                      : futureData.data.current_condition[0].windspeedKmph}{" "}
                    km/h
                  </h3>
                </div>
                <div className="right"></div>
              </div>
              <div className="sub-info">
                <div className="left">
                  <h1>Rain Chance</h1>
                  <p>Today rain chance</p>
                  <h3>
                    {typeof futureData.data === "undefined"
                      ? ""
                      : futureData.data.weather[0].hourly[
                          Math.floor(hours24 / 3)
                        ].chanceofrain}
                    %
                  </h3>
                </div>
                <div className="right" id="rain-chance">
                  <svg></svg>
                </div>
              </div>
              <div className="sub-info">
                <div className="left">
                  <h1>Pressure</h1>
                  <p>Today pressure</p>
                  <h3>
                    {typeof futureData.data === "undefined"
                      ? ""
                      : futureData.data.current_condition[0].pressure}{" "}
                    hpa
                  </h3>
                </div>
                <div className="right"></div>
              </div>
              <div className="sub-info">
                <div className="left">
                  <h1>Humidity</h1>
                  <p>Today humidity</p>
                  <h3>
                    {typeof futureData.data === "undefined"
                      ? ""
                      : futureData.data.current_condition[0].humidity}{" "}
                    %
                  </h3>
                </div>
                <div className="right" id="humidity">
                  <svg></svg>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
