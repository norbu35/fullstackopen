import axios from "axios";
import React, { useState, useEffect } from "react";

const App = () => {
  const apiKey = process.env.REACT_APP_API_KEY;

  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState();
  const [weather, setWeather] = useState();

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((resp) => setCountries(resp.data));
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${country?.capitalInfo?.latlng[0]}&lon=${country?.capitalInfo?.latlng[1]}&appid=${apiKey}`
      )
      .then((resp) => setWeather(resp.data));
  }, [country, apiKey]);

  const handleQuery = (event) => {
    setQuery(event.target.value);
  };

  const handleShowSingleCountry = (country) => setQuery(country);

  const listCountries = (key) => {
    const countryList = filterCountries(key).map((country) => (
      <li key={country.flag}>
        {country.name.common}{" "}
        <button onClick={() => handleShowSingleCountry(country.name.common)}>
          show
        </button>
      </li>
    ));

    if (countryList.length > 10)
      return <div>Too many matches, speficy another filter</div>;
    if (countryList.length < 10 && countryList.length > 1)
      return <ul style={{ listStyleType: "none" }}>{countryList}</ul>;
    if (countryList.length === 1) return listSingleCountry(key);
  };

  const listSingleCountry = (key) => {
    const country = filterCountries(key)[0];
    // setCountry(country) <- Does not update selected country;
    return (
      <>
        <h3>{country.name.common}</h3>
        <p>Capital: {country.capital[0]}</p>
        Languages:
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language[0]}>{language}</li>
          ))}
        </ul>
        <div style={{ fontSize: 150 }}>{country.flag}</div>
        <p>
          <b>Weather in {country.capital[0]}</b>
          <div>{weather?.weather[0].main}</div>
        </p>
      </>
    );
  };

  const filterCountries = (key) => {
    return countries.filter((country) =>
      country.name.common.toLowerCase().includes(key.toLowerCase())
    );
  };

  return (
    <>
      <div>
        find countries: <input value={query} onChange={handleQuery} />
      </div>
      <div>{listCountries(query)}</div>
    </>
  );
};

export default App;
