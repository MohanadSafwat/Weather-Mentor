import * as d3 from "d3";
import { useEffect } from "react";
import "../../css/dashboard/row.css";
import { Icons } from "../../svg";

const Row = (props) => {
  useEffect(() => {
    const svg = d3
      .select(".row-" + props.id)
      .select("#mainSVG")
      .attr("id", "line" + props.id)
      .attr("class", "main-svg");

    // const svg = d3.selectAll(".row")._groups[0][props.id-1]
    svg
      .append("line")
      .attr("x1", 20)
      .attr("y1", 1)
      .attr("x2", 2000)
      .attr("y2", 1)
      .attr("stroke", "#2D4059")
      .attr("stroke-width", 1);
  }, []);

  const toMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString("en-US", {
      month: "short",
    });
  };

  const getDayName = (date) => {
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var d = new Date(date);

    let today = new Date().toISOString().split("T")[0];
    if (today === date) return "Today";

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);


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

    if (formatDate(yesterday) === date) return "Yesterday";


    if (formatDate(tomorrow) === date) return "Tomorrow";

    return days[d.getDay()];
  };

  return (
    <div className={"row row-" + props.id}>
      <div className="data">
        <div className="date">
          <h1>{getDayName(props.data.date)}</h1>
          <p>
            {toMonthName(props.data.date.split("-")[1])}{" "}
            {props.data.date.split("-")[2]}
          </p>
        </div>
        <div className="max">
          <Icons.Max />
          <p>
            {props.data.maxtempC}
            <sup>o</sup>
          </p>
        </div>
        <div className="min">
          <Icons.Min />
          <p>
            {props.data.mintempC}
            <sup>o</sup>
          </p>
        </div>
        <div className="sunrise">
          <Icons.Sunrise1 />
          <p> {props.data.astronomy[0].sunrise}</p>
        </div>
        <div className="sunrise">
          <Icons.Sunset2 />
          <p>{props.data.astronomy[0].sunset}</p>
        </div>
      </div>
      <svg id="mainSVG"></svg>

    </div>
  );
};

export default Row;
