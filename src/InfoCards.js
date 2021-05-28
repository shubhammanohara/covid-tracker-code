import React, { useEffect, useState } from 'react'
import { Card, CardContent, Typography } from "@material-ui/core"

const InfoCards = () => {
    const [worldData, setWorldData] = useState([])

    useEffect(() => {
        const getWorldData = async () => {
            await fetch(`https://disease.sh/v3/covid-19/all`)
                .then(response => response.json())
                .then((data) => {
                    const world = (
                        {
                            cases: data.cases,
                            deaths: data.deaths,
                            active: data.active
                        }
                    )


                    setWorldData(world)
                })
        }
        getWorldData();
    }, [])

    return (
        <>
            <Card className="infoBoxTotal">
                <CardContent>
                    <Typography color="textSecondary">Total Cases</Typography>
                    <h2>{worldData.cases}</h2>
                </CardContent>
            </Card>
            <Card className="infoBoxActive">
                <CardContent>
                    <Typography color="textSecondary">Active Cases</Typography>
                    <h2>{worldData.active}</h2>
                </CardContent>
            </Card>
            <Card className="infoBoxDeaths">
                <CardContent>
                    <Typography color="textSecondary">Total Deaths</Typography>
                    <h2>{worldData.deaths}</h2>
                </CardContent>
            </Card>
        </>
    )
}

export default InfoCards
