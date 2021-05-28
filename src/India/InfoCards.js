import React from 'react'
import { Card, CardContent, Typography } from "@material-ui/core"

const InfoCards = (props) => {
    const data = props.data

    return (
        <>
            <Card className="infoBoxTotal">
                <CardContent>
                    <Typography color="textSecondary">Total Cases</Typography>
                    <h2>{data.totalCases}</h2>
                </CardContent>
            </Card>
            <Card className="infoBoxActive">
                <CardContent>
                    <Typography color="textSecondary">Active Cases</Typography>
                    <h2>{data.activeCases}</h2>
                </CardContent>
            </Card>
            <Card className="infoBoxDeaths">
                <CardContent>
                    <Typography color="textSecondary">Total Deaths</Typography>
                    <h2>{data.totalDeaths}</h2>
                </CardContent>
            </Card>
        </>
    )
}

export default InfoCards