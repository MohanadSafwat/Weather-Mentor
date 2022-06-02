import worldCitiesFile from "../../worldcities.csv";
import "../../css/cities/index.css";
import { Link } from "react-router-dom";

const Cities = () => {
  const cities = [
    {
      cityName: "Cairo",
      loc: "30.0444,31.2358",
    },
    {
      cityName: "Giza",
      loc: "29.987,31.2118",
    },
    {
      cityName: "Alexandria",
      loc: "31.2,29.9167",
    },
    {
      cityName: "Shubra al Khaymah",
      loc: "30.1286,31.2422",
    },
    {
      cityName: "Al Mansurah",
      loc: "30.1286,31.2422",
    },
    {
      cityName: "Halwan",
      loc: "29.8419,31.3342",
    },
    {
      cityName: "Port Said",
      loc: "31.25,32.2833",
    },
    {
      cityName: "Suez",
      loc: "29.9667,32.5333",
    },
    {
      cityName: "Tanta",
      loc: "30.7833,31",
    },
    {
      cityName: "Asyut",
      loc: "27.1869,31.1714",
    },
    {
      cityName: "Al Fayyum",
      loc: "29.3,30.8333",
    },
    {
      cityName: "Az Zaqaziq",
      loc: "30.5833,31.5167",
    },
    {
      cityName: "Ismailia",
      loc: "30.5833,32.2667",
    },
    {
      cityName: "Aswan",
      loc: "24.0889,32.8997",
    },
    {
      cityName: "Damanhur",
      loc: "31.05,30.4667",
    },
    {
      cityName: "Al Minya",
      loc: "28.0833,30.75",
    }, {
      cityName: "Qina",
      loc: "26.1667,32.7167",
    }, {
      cityName: "Bani Suwayf",
      loc: "29.0667,31.0833",
    }, {
      cityName: "Luxor",
      loc: "25.6969,32.6422",
    }, {
      cityName: "Suhaj",
      loc: "26.5606,31.6917",
    }, {
      cityName: "Shibin al Kawm",
      loc: "30.55,31",
    }, {
      cityName: "Al `Arish",
      loc: "31.1249,33.8006"
    }, {
      cityName: "Banha",
      loc: "30.4628,31.1797",
    },{
      cityName: "Al Ghardaqah",
      loc: "27.2578,33.8117",
    },
    {
      cityName: "Kafr ash Shaykh",
      loc: "31.1,30.95",
    },
    {
      cityName: "Madinat as Sadis min Uktubar",
      loc: "29.9361,30.9269"
    },
  ];
  return (
    <div className="citiesWrap">
      <div className="cities">
        More Cities
        <ul>
          {cities.map((data) => {
            return (
              <Link to={`/dashboard?city=${data.cityName}&loc=${data.loc}`}>
                <li value={data.loc}>{data.cityName}</li>
              </Link>
            );
          })}

        </ul>
      </div>
    </div>
  );
};

export default Cities;
