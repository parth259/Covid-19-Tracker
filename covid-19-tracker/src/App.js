import React, { useEffect, useState } from 'react';
import { MenuItem,FormControl,Select} from "@material-ui/core"
import InfoBox from './InfoBox';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('Worldwide');

  //https://disease.sh/v3/covid-19/countries

  // USEEFFECT = Runs a piece of code based on given conditiom 

  useEffect (() => {
    const getCountriesData = async () => {
      await fetch ("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const  countries = data.map((country) => (
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
        <InfoBox title="Coronavirus cases" />

        <InfoBox title="Recovered" />

        <InfoBox title="Deaths" />





      </div>
    </div>
  );
}

export default App;
 