import React from "react";
import { useContext } from "react";
import "./App.css";
import ThemeButton from "./ThemeButton";
import { ThemeContext } from "./ThemeContext";

function App() {
  const { darkMode } = useContext(ThemeContext);
  const [State, setState] = React.useState("");
  const [details, setdetails] = React.useState([]);
  const [lat, setlat] = React.useState("");
  const [lon, setlon] = React.useState("");
  const [whether, setwhether] = React.useState([]);

  function updateValue() {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${State}&limit=1&appid=f96401f776de2236d9a5461dbfbf8414`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setdetails(data);
        setlat(data[0].lat);
        setlon(data[0].lon);
      });

    console.log(lat);
    console.log(lon);

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f96401f776de2236d9a5461dbfbf8414&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        setwhether(data);
        console.log(data);
      });
  }

  return (
    <div className="App">
      <header className= {darkMode ? "App-header-dark" : "App-header"}>
        <div className="heading">
          <h2 className="display-1">
            <i className={darkMode ? "fa-solid fa-cloud-moon moon-logo" : "fa-solid fa-cloud-sun sun-logo"}></i>
              Weather App
          </h2>
        </div>
        <div className="input-box">
          <input
            id="CName"
            className="form-control form-control-lg"
            type="text"
            onChange={(event) => setState(event.target.value)}
            placeholder="Enter City Name"
            aria-label=".form-control-lg example"
          ></input>
          <button
            onClick={() => updateValue()}
            type="button"
            className= {darkMode? "btn btn-dark": "btn btn-info"}
          >
            Search
          </button>
        </div>

        {whether.main != undefined ? (
          <div className="info">
            <h4>Weather Details</h4>
            <h5>
              <i className="fa-solid fa-location-dot"></i>
              {` ${whether.name}`}
            </h5>
            <h5>
              <i className="fa-solid fa-temperature-half"></i> Temperature:
              {`  ${whether.main.temp}`}
              <sup>o</sup> C
            </h5>
            <img
              src={`https://openweathermap.org/img/wn/${whether.weather[0].icon}@2x.png`}
              alt=""
            />
            <h5>{`${whether.weather[0].main}`}</h5>
            <h6>
              <span className="spandiv">
                H: {`${whether.main.temp_max}`}
                <sup>o</sup> C{" "}
              </span>{" "}
              <span className="spandiv">
                L: {`${whether.main.temp_min}`}
                <sup>o</sup> C{" "}
              </span>{" "}
            </h6>
            <h6>
              <span className="spandiv">
                <i className="fa-solid fa-wind"></i> Wind Speed:{" "}
                {`${whether.wind.speed}`} m/s
              </span>
            </h6>
          </div>
        ) : (
          <h2></h2>
        )}
      </header>
      <footer>
        <div className= {darkMode ? "footer-div-dark" : "footer-div"}>
          <p>Change Theme <span><ThemeButton /></span></p>
        </div>
      </footer>
    </div>
  );
}

export default App;
