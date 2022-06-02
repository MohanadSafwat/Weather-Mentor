import { Link } from "react-router-dom";
import "../../css/main/weatherInfo.css";
import { ReactComponent as SunnySVG } from "../../svg/sunny.svg";
const WeatherInfo = (props) => {
    const data = props.weatherData

    function toMonthName(monthNumber) {
        const date = new Date();
        date.setMonth(monthNumber - 1);
      
        return date.toLocaleString('en-US', {
          month: 'long',
        });
      }

  return (
    <div className="wrapWeatherInfo">
      <div className="weatherBlocks">
        <div className="active">
          <div className="svg">
            <SunnySVG />
          </div>
          <div className="right">
            <div className="weatherDay">Today</div>
            <div className="temp">
              {typeof data !=="undefined" && data.data.current_condition[0].temp_C  }<sup>o</sup>
            </div>
          </div>
        </div>
        <div className="inActive">
          <div className="svg">
            <SunnySVG />
          </div>
          <div className="right">
            <div className="weatherDay">Tomorrow</div>
            <div className="temp">
            {typeof data !=="undefined" && data.data.weather[1].maxtempC  }<sup>o</sup>
            </div>
          </div>
        </div>
        <div className="inActive">
          <div className="svg">
            <SunnySVG />
          </div>
          <div className="right">
            <div className="weatherDay">{typeof data !=="undefined" && toMonthName(data.data.weather[2].date.split('-')[1]) } {typeof data !=="undefined" && data.data.weather[2].date.split('-')[2] }</div>
            <div className="temp">
            {typeof data !=="undefined" && data.data.weather[2].maxtempC  }<sup>o</sup>
            </div>
          </div>
        </div>
        <div className="inActive">
          <div className="svg">
            <SunnySVG />
          </div>
          <div className="right">
          <div className="weatherDay">{typeof data !=="undefined" && toMonthName(data.data.weather[3].date.split('-')[1]) } {typeof data !=="undefined" && data.data.weather[3].date.split('-')[2] }</div>
            <div className="temp">
            {typeof data !=="undefined" && data.data.weather[3].maxtempC  }<sup>o</sup>
            </div>
          </div>
        </div>
        <div className="inActive">
          <div className="svg">
            <SunnySVG />
          </div>
          <div className="right">
          <div className="weatherDay">{typeof data !=="undefined" && toMonthName(data.data.weather[4].date.split('-')[1]) } {typeof data !=="undefined" && data.data.weather[4].date.split('-')[2] }</div>
            <div className="temp">
            {typeof data !=="undefined" && data.data.weather[4].maxtempC  }<sup>o</sup>
            </div>
          </div>
        </div>
      </div>
      <div className="moreDetails">
        <Link to={`/dashboard?city=${props.city}&loc=${props.lat},${props.lon}`}  ><p> More Details</p></Link>
      </div>
    </div>
  );
};

export default WeatherInfo;
