import React, { useState, useEffect } from "react";
import { Box, Container } from "@material-ui/core"
import InfoCards from './InfoCards'
import IndiaTable from './IndiaTable/IndiaTable'
import Graph from "./Graph"

const India = () => {

    const [stateData, setStateData] = useState([]);
    const [totalData, setTotalData] = useState({});

    useEffect(() => {
        const getData = async () => {
            await fetch("https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true")
                .then((response) => response.json())
                .then((data) => {
                    const currentData = {
                        totalCases: data.totalCases,
                        activeCases: data.activeCases,
                        totalDeaths: data.deaths,
                    }
                    const states = data.regionData.map(data => ({
                        name: data.region,
                        totalCases: data.totalInfected,
                        activeCases: data.activeCases,
                        totalDeaths: data.deceased,
                    }))

                    setStateData(states);
                    setTotalData(currentData);
                })
        }
        getData()
    }, []);

    return (
        <div className="App">
            <Container className="app__right">
                <h1>Covid-19 Tracker</h1>
                <Container>
                    <h2>IndiaCovid-19 Data</h2>
                    <Box className="infoCard">
                        <InfoCards title="Total Cases" data={totalData} />
                    </Box>
                </Container>
                <Container className="graph">
                    <Graph></Graph>
                </Container>
            </Container>

            <Container className="app__left">
                <IndiaTable tableData={stateData}></IndiaTable>
            </Container>
        </div>
    )
}

export default India
