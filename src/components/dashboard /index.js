import "../../css/dashboard/index.css";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ClimbingBoxLoader } from "react-spinners";
import { css } from "@emotion/react";
import Table from "./table";
import Menu from "./menu";
import Summary from "./summary";
import *as d3 from  'd3';

const Dashboard = (props) => {
  var time = new Date();


  const [futureData, setFutureData] = useState({});
  const [historicalData, setHistoricalData] = useState({});
  let [color, setColor] = useState("#50E3C2");
  const [searchParams] = useSearchParams();
  const [hours24, setHours24] = useState(time.getHours());


 

  let today = new Date().toISOString().split("T")[0];

  const past = new Date();
  past.setDate(past.getDate() - 10);
 
  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  function formatDate(date) {
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join("-");
  }


  const override = css`
    display: block;
    margin: 45vh 45vw;
    border-color: red;
    width:15vw
  `;

  useEffect(()=>{
    axios
    .get(
      `https://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=9feb1271cecb451e96171456222705&q=${searchParams.get(
        "loc"
      )}&date=${formatDate(past)}&enddate=${today}&format=json`
    )
    .then((res) => {
      setHistoricalData(res.data);
      console.log("res1.data", res.data);
    });  },[])

  useEffect(() => {axios
    .get(
      `https://api.worldweatheronline.com/premium/v1/weather.ashx?key=9feb1271cecb451e96171456222705&q=${searchParams.get(
        "loc"
      )}&format=json`
    )
    .then((res) => {
      setFutureData(res.data);
      console.log("res1.data", res.data);
    });}, []);

    useEffect(() => {
     
    
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
  
    
      rainChance();
      humidity();
    }, [futureData.data, hours24]);


  
  return (
    <div>
      {typeof futureData.data === "undefined" ||
      typeof historicalData.data === "undefined" ? (
        <ClimbingBoxLoader color={color} css={override} />
      ) : (
        <>
          <div className="dashboard-wrap">
           <Menu />
            <div className="left">
             <Summary futureData={futureData} historicalData={historicalData} />
             <Table historicalData={historicalData} futureData={futureData} />
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
