import React, { useEffect, useState } from 'react';
import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core"
import InfoBox from './InfoBox';
import Map from "./Map";
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('Worldwide');

  //https://disease.sh/v3/covid-19/countries

  // USEEFFECT = Runs a piece of code based on given conditiom 

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => (
            {
              name: country.country, //United States,United Kingdom
              value: country.countryInfo.iso2 // UK,USA,FR
            }));

          setCountries(countries);
        });
    };

    getCountriesData();

  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  }

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app_dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country} >
              <MenuItem value="Worldwide">Worldwide</MenuItem>
              {
                countries.map(country => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }

            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" cases={12000000} total={2000} />
          <InfoBox title="Recovered" cases={80000} total={3000} />
          <InfoBox title="Deaths" cases={20000} total={1000} />
        </div>

        <Map></Map>

      </div>
      
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
           {/* Table */}
           <h3>Worldwide New Cases</h3> 
          {/* Graph */}
        </CardContent>
         
      </Card>

    </div>





  );
}

export default App;
