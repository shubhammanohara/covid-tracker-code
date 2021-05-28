import React, { useState, useEffect } from "react";
import { Box, Container, Paper } from "@material-ui/core"
import './App.css';
import Table from './table/table'
import InfoCards from './InfoCards'
import Graph from './Graph/Graph'


function World() {

  const [countryData, setCountryData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("USA");

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((data, index) => ({
            id: index,
            name: data.country,
            totalCases: data.cases,
            activeCases: data.active,
            totalDeaths: data.deaths,
            countryFlag: data.countryInfo.flag
          }))

          setCountryData(countries);
        })
    };


    getCountriesData();
  }, [])

  const getCountry = (countryName) => {
    setSelectedCountry(countryName)
    console.log(countryName)
  }


  return (
    <div className="App">
      <Container className="app__right">
        <h1>Covid-19 Tracker</h1>

        <Container>
          <h2>World-Wide Covid-19 Data</h2>
          <Box className="infoCard">
            <InfoCards title="Total Cases" data={selectedCountry} />
          </Box>
        </Container>


        <Paper className="graph" component={Box} >
          <h2 align="center">{selectedCountry}</h2>
          <Graph country={selectedCountry} />
        </Paper>

      </Container>

      <Container className="app__left">
        <Table tableData={countryData} country={getCountry}></Table>
      </Container>
    </div >

  );
}

export default World;
