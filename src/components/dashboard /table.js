import Row from "./row";
import '../../css/dashboard/table.css'


const Table = (props) => {
  return (
    <div className="table">
      {typeof props.historicalData.data === "undefined"
        ? ""
        : typeof props.futureData.data == "undefined"
        ? ""
        : props.historicalData.data.weather
            .slice(-3, -1)
            .concat(props.futureData.data.weather.slice(0, 5))
            .map((data, index) => {
              return <Row id={index} data={data} />;
            })}
    </div>
  );
};
export default Table;
